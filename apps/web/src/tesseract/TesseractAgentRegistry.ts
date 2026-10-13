/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

import { type MatrixClient, type MatrixEvent } from "matrix-js-sdk/src/matrix";
import { logger } from "matrix-js-sdk/src/logger";

export const TESSERACT_AGENT_FIELD = "com.blackcandletech.agent";

const AGENT_REGISTRY_TTL_MS = 5 * 60 * 1000;

/** Details known about a Tesseract agent sender. */
export interface TesseractAgentDetails {
    /** Agent Matrix user id. */
    mxid: string;
    /** Human-readable API key name from the registry, if available. */
    apiKeyName?: string;
}

interface CacheEntry {
    expiresAt: number;
    agents: Map<string, TesseractAgentDetails>;
}

let cache: CacheEntry | undefined;
let inFlight: Promise<Map<string, TesseractAgentDetails>> | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function normalizeAgentRecord(value: unknown): TesseractAgentDetails | undefined {
    if (!isRecord(value)) return undefined;

    const mxid = [value.mxid, value.user_id, value.agent_mxid, value.agent_id].find((candidate) => {
        return typeof candidate === "string" && candidate.startsWith("@");
    });
    if (typeof mxid !== "string") return undefined;

    const apiKeyName = [value.api_key_name, value.apiKeyName, value.key_name].find(
        (candidate) => typeof candidate === "string" && candidate.length > 0,
    );

    return {
        mxid,
        apiKeyName: typeof apiKeyName === "string" ? apiKeyName : undefined,
    };
}

function parseRegistryResponse(response: unknown): Map<string, TesseractAgentDetails> {
    const values = Array.isArray(response)
        ? response
        : isRecord(response) && Array.isArray(response.agents)
          ? response.agents
          : [];
    const agents = new Map<string, TesseractAgentDetails>();

    for (const value of values) {
        const agent = normalizeAgentRecord(value);
        if (agent) agents.set(agent.mxid, agent);
    }

    return agents;
}

function getAccessToken(client: MatrixClient): string | undefined {
    return client.getAccessToken() ?? undefined;
}

async function fetchAgentRegistry(client: MatrixClient): Promise<Map<string, TesseractAgentDetails>> {
    const accessToken = getAccessToken(client);
    if (!accessToken) return new Map();

    const homeserverUrl = client.getHomeserverUrl().replace(/\/$/, "");
    const response = await fetch(`${homeserverUrl}/_tesseract/agents`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });

    if (!response.ok) throw new Error(`Tesseract agent registry failed: ${response.status}`);
    return parseRegistryResponse(await response.json());
}

/** Clears the per-session registry cache. Intended for tests and logout reset paths. */
export function clearTesseractAgentRegistryCache(): void {
    cache = undefined;
    inFlight = undefined;
}

/** Returns the cached registry, fetching it at most once per TTL window. */
export async function getTesseractAgentRegistry(client: MatrixClient): Promise<Map<string, TesseractAgentDetails>> {
    const now = Date.now();
    if (cache && cache.expiresAt > now) return cache.agents;
    if (inFlight) return inFlight;

    inFlight = fetchAgentRegistry(client)
        .catch((error) => {
            logger.warn("Unable to fetch Tesseract agent registry", error);
            return new Map<string, TesseractAgentDetails>();
        })
        .then((agents) => {
            cache = { agents, expiresAt: Date.now() + AGENT_REGISTRY_TTL_MS };
            inFlight = undefined;
            return agents;
        });

    return inFlight;
}

/** True when the MXID is in the local agent namespace. */
export function isTesseractAgentNamespaceMxid(mxid: string | undefined): boolean {
    return mxid?.split(":", 1)[0].endsWith(".agent") ?? false;
}

/** Validated banner facts for an event sender. */
export interface TesseractAgentBannerFacts {
    /** Agent Matrix user id. */
    agentMxid: string;
    /** API key name to present to the user. */
    apiKeyName: string;
    /** Whether event content matched the sender and can be used for audit affordances. */
    auditAvailable: boolean;
}

/** Builds banner facts using sender identity first and event content only after sender cross-checks. */
export function getTesseractAgentBannerFacts(
    mxEvent: MatrixEvent,
    registry: Map<string, TesseractAgentDetails>,
): TesseractAgentBannerFacts | undefined {
    const sender = mxEvent.getSender();
    if (!sender) return undefined;

    const registryAgent = registry.get(sender);
    if (!isTesseractAgentNamespaceMxid(sender) && !registryAgent) return undefined;

    const field = mxEvent.getContent()[TESSERACT_AGENT_FIELD];
    const fieldMatchesSender = isRecord(field) && field.agent_id === sender;
    const fieldKeyName = fieldMatchesSender && typeof field.api_key_name === "string" ? field.api_key_name : undefined;
    const registryKeyName = registryAgent?.apiKeyName;
    const keyNameMatchesRegistry = !registryKeyName || !fieldKeyName || fieldKeyName === registryKeyName;
    const auditAvailable = !!fieldMatchesSender && keyNameMatchesRegistry;

    return {
        agentMxid: sender,
        apiKeyName: keyNameMatchesRegistry ? (fieldKeyName ?? registryKeyName ?? sender) : (registryKeyName ?? sender),
        auditAvailable,
    };
}

/** Fetches optional Tesseract audit details for an event. */
export async function getTesseractAuditDetails(client: MatrixClient, eventId: string): Promise<unknown | undefined> {
    const accessToken = getAccessToken(client);
    if (!accessToken) return undefined;

    const homeserverUrl = client.getHomeserverUrl().replace(/\/$/, "");
    const response = await fetch(`${homeserverUrl}/_tesseract/audit/${encodeURIComponent(eventId)}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });

    if (!response.ok) return undefined;
    return response.json();
}
