/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

import React, { type JSX, useState } from "react";
import { type MatrixClient, type MatrixEvent } from "matrix-js-sdk/src/matrix";

import { getTesseractAuditDetails, type TesseractAgentBannerFacts } from "../../../tesseract/TesseractAgentRegistry";

/** Props for the Tesseract agent notice above an agent-authored message. */
interface TesseractAgentNoticeProps {
    /** Matrix client used to fetch audit facts. */
    client: MatrixClient;
    /** Event that the notice describes. */
    mxEvent: MatrixEvent;
    /** Validated agent banner facts. */
    facts: TesseractAgentBannerFacts;
}

/** Renders the distinct Tesseract agent notice and optional audit detail view. */
export function TesseractAgentNotice({ client, mxEvent, facts }: Readonly<TesseractAgentNoticeProps>): JSX.Element {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [auditDetails, setAuditDetails] = useState<unknown | undefined>();
    const eventId = mxEvent.getId() ?? "";

    const openDetails = async (): Promise<void> => {
        setOpen(true);
        if (!facts.auditAvailable || loading || auditDetails) return;

        setLoading(true);
        try {
            setAuditDetails(await getTesseractAuditDetails(client, eventId));
        } finally {
            setLoading(false);
        }
    };

    const noticeText = `(!) ${facts.apiKeyName} sent this message`;
    const details = (
        <div className="mx_TesseractAgentNotice_detail" role="dialog" aria-label="Tesseract agent message details">
            <div>Agent: {facts.agentMxid}</div>
            <div>Key name: {facts.apiKeyName}</div>
            <div>Event ID: {eventId}</div>
            {loading ? <div>Loading audit details…</div> : null}
            {auditDetails ? <pre>{JSON.stringify(auditDetails, null, 2)}</pre> : null}
        </div>
    );

    return (
        <div className="mx_TesseractAgentNotice">
            {facts.auditAvailable ? (
                <button type="button" className="mx_TesseractAgentNotice_button" onClick={openDetails}>
                    {noticeText}
                </button>
            ) : (
                <span>{noticeText}</span>
            )}
            {open ? details : null}
        </div>
    );
}
