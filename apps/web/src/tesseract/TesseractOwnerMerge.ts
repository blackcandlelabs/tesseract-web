/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

import { type MatrixClient, type MatrixEvent, type Room } from "matrix-js-sdk/src/matrix";

import DMRoomMap from "../utils/DMRoomMap";
import { isTesseractAgentNamespaceMxid, type TesseractAgentDetails } from "./TesseractAgentRegistry";

/** Agent room merged into an owner's DM room. */
export interface TesseractMergedAgentRoom {
    /** Agent DM room to read merged events and badges from. */
    room: Room;
    /** Agent user ID present in the merged DM room. */
    agentMxid: string;
    /** Human counterparty shared by the owner's DM and the agent DM. */
    counterpartyMxid: string;
}

function getJoinedMemberIds(room: Room): string[] {
    return room
        .getJoinedMembers()
        .map((member) => member.userId)
        .filter((userId): userId is string => !!userId);
}

/** Returns the DM counterparty for a normal owner DM, if this room can be owner-merged. */
export function getTesseractOwnerDmCounterparty(
    client: MatrixClient,
    room: Room,
    registry: Map<string, TesseractAgentDetails>,
): string | undefined {
    const userId = client.getUserId() ?? undefined;
    const mappedCounterparty = DMRoomMap.shared()?.getUserIdForRoomId(room.roomId) ?? undefined;
    if (mappedCounterparty && mappedCounterparty !== userId && !registry.has(mappedCounterparty)) return mappedCounterparty;

    const counterparties = getJoinedMemberIds(room).filter((memberId) => memberId !== userId && !registry.has(memberId));
    return counterparties.length === 1 ? counterparties[0] : undefined;
}

/** Finds agent DM rooms that should be presented inside an owner's DM room. */
export function getTesseractMergedAgentRooms(
    client: MatrixClient,
    ownerRoom: Room,
    registry: Map<string, TesseractAgentDetails>,
): TesseractMergedAgentRoom[] {
    if (registry.size === 0) return [];

    const counterpartyMxid = getTesseractOwnerDmCounterparty(client, ownerRoom, registry);
    if (!counterpartyMxid) return [];

    const mergedRooms: TesseractMergedAgentRoom[] = [];
    for (const room of client.getRooms()) {
        if (room.roomId === ownerRoom.roomId) continue;

        const memberIds = new Set(getJoinedMemberIds(room));
        if (!memberIds.has(counterpartyMxid)) continue;

        const agentMxid = [...registry.keys()].find((mxid) => memberIds.has(mxid));
        if (agentMxid) mergedRooms.push({ room, agentMxid, counterpartyMxid });
    }

    return mergedRooms;
}

/** Interleaves owner timeline events with merged agent DM events by origin-server timestamp. */
export function interleaveTesseractOwnerMergeEvents(
    ownerEvents: MatrixEvent[],
    mergedAgentRooms: TesseractMergedAgentRoom[],
): MatrixEvent[] {
    if (mergedAgentRooms.length === 0) return ownerEvents;

    const eventIds = new Set<string>();
    const events: MatrixEvent[] = [];
    const addEvent = (event: MatrixEvent): void => {
        const key = event.getId() ?? `${event.getRoomId()}-${event.getTs()}-${events.length}`;
        if (eventIds.has(key)) return;
        eventIds.add(key);
        events.push(event);
    };

    ownerEvents.forEach(addEvent);
    for (const { room } of mergedAgentRooms) {
        room.getLiveTimeline().getEvents().forEach(addEvent);
    }

    return events.sort((left, right) => {
        const timestampDelta = left.getTs() - right.getTs();
        if (timestampDelta !== 0) return timestampDelta;
        return (left.getId() ?? "").localeCompare(right.getId() ?? "");
    });
}

/** Fresh messages stay in the owner room; replies route to the room that owns the replied-to event. */
export function getTesseractComposerTargetRoomId(ownerRoom: Room, replyToEvent?: MatrixEvent): string {
    if (isTesseractAgentNamespaceMxid(replyToEvent?.getSender())) return replyToEvent?.getRoomId() ?? ownerRoom.roomId;
    return ownerRoom.roomId;
}
