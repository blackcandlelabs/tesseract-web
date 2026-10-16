/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
/** Final-wave gallery surfaces, rendered within their conversation context. */
export const statePages = [
    ["message-menu", "Message context menu"],
    ["list-menus", "Room and member menus"],
    ["incoming-call", "Incoming call"],
    ["call-events", "Call timeline events"],
    ["live-location", "Live location sharing"],
    ["location", "Location message"],
    ["empty-room", "Empty encrypted room"],
    ["empty-states", "Empty lists and search"],
    ["connection", "Connection states"],
    ["e2ee-warnings", "Encryption warnings"],
    ["redacted", "Deleted messages and room upgrade"],
].map(([id, name]) => ({ id, name, path: `/state-${id}` }));
/** Action labels shared by the contextual menu specimens. */
export const messageActions = ["React", "Reply", "Reply in Thread", "Edit", "Pin", "Copy Link", "Copy Text", "Report", "Delete"];
export const roomActions = ["Favourites", "Mark as Read", "Notifications", "Invite", "Room Settings", "Leave"];
export const memberActions = ["Mention", "Direct Message", "Verify", "Kick", "Ban"];
