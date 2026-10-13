/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

import { describe, expect, it } from "vitest";
import { MatrixEvent } from "matrix-js-sdk/src/matrix";

import {
    getTesseractComposerTargetRoomId,
    getTesseractMergedAgentRooms,
    interleaveTesseractOwnerMergeEvents,
} from "./TesseractOwnerMerge";
import { NotificationLevel } from "../stores/notifications/NotificationLevel";

function event(eventId: string, roomId: string, sender: string, ts: number): MatrixEvent {
    return new MatrixEvent({
        event_id: eventId,
        room_id: roomId,
        sender,
        origin_server_ts: ts,
        type: "m.room.message",
        content: { body: eventId, msgtype: "m.text" },
    });
}

function room(roomId: string, members: string[], events: MatrixEvent[] = []): any {
    return {
        roomId,
        getJoinedMembers: () => members.map((userId) => ({ userId })),
        getLiveTimeline: () => ({ getEvents: () => events }),
    };
}

function client(rooms: any[]): any {
    return {
        getUserId: () => "@owner:example.org",
        getRooms: () => rooms,
    };
}

describe("TesseractOwnerMerge", () => {
    const registry = new Map([["@scribe.riley.agent:example.org", { mxid: "@scribe.riley.agent:example.org" }]]);

    it("interleaves owner and agent DM room events by timestamp", () => {
        const ownerRoom = room("!owner", ["@owner:example.org", "@riley:example.org"], [
            event("$owner-1", "!owner", "@owner:example.org", 1000),
            event("$owner-2", "!owner", "@riley:example.org", 3000),
        ]);
        const agentRoom = room("!agent", ["@scribe.riley.agent:example.org", "@riley:example.org"], [
            event("$agent-1", "!agent", "@scribe.riley.agent:example.org", 2000),
        ]);

        const mergedRooms = getTesseractMergedAgentRooms(client([ownerRoom, agentRoom]), ownerRoom, registry);
        expect(interleaveTesseractOwnerMergeEvents(ownerRoom.getLiveTimeline().getEvents(), mergedRooms).map((ev) => ev.getId())).toEqual([
            "$owner-1",
            "$agent-1",
            "$owner-2",
        ]);
    });

    it("routes a reply to the room that owns the replied-to agent event", () => {
        const ownerRoom = room("!owner", ["@owner:example.org", "@riley:example.org"]);
        const agentEvent = event("$agent", "!agent", "@scribe.riley.agent:example.org", 1000);

        expect(getTesseractComposerTargetRoomId(ownerRoom, agentEvent)).toBe("!agent");
    });

    it("routes a fresh message to the owner room", () => {
        const ownerRoom = room("!owner", ["@owner:example.org", "@riley:example.org"]);

        expect(getTesseractComposerTargetRoomId(ownerRoom)).toBe("!owner");
    });

    it("sums owner and merged agent badge counts", () => {
        const ownerState = { count: 2, hasUnreadCount: true, level: NotificationLevel.Notification };
        const agentState = { count: 3, hasUnreadCount: true, level: NotificationLevel.Highlight };

        expect(ownerState.count + agentState.count).toBe(5);
        expect(Math.max(ownerState.level, agentState.level)).toBe(NotificationLevel.Highlight);
    });

    it("leaves users with no owned agents unchanged", () => {
        const ownerEvents = [event("$owner", "!owner", "@owner:example.org", 1000)];
        const ownerRoom = room("!owner", ["@owner:example.org", "@riley:example.org"], ownerEvents);

        expect(getTesseractMergedAgentRooms(client([ownerRoom]), ownerRoom, new Map())).toEqual([]);
        expect(interleaveTesseractOwnerMergeEvents(ownerEvents, [])).toBe(ownerEvents);
    });
});
