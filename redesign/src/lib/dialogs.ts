/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
/** Routed, local-only dialog previews. No cryptographic or server operations are performed. */
export const dialogPages = [
    { id: "create-room", name: "Create Room" },
    { id: "create-space", name: "Create Space" },
    { id: "invite", name: "Invite to Room" },
    { id: "spotlight", name: "Search" },
    { id: "verify-session", name: "Verify Session" },
    { id: "secure-backup", name: "Set Up Secure Backup" },
    { id: "leave-room", name: "Leave Room" },
    { id: "moderation", name: "Manage Member" },
    { id: "report", name: "Report Content" },
    { id: "share", name: "Share internally" },
    { id: "media", name: "Upload & View Media" },
].map((page) => ({ ...page, path: `/dialog-${page.id}` }));

/** Fixed illustrative SAS, never used to verify a real session. */
export const sasEmoji = [
    ["🐶", "Dog"], ["🌳", "Tree"], ["🚀", "Rocket"], ["🎸", "Guitar"],
    ["🍎", "Apple"], ["🔑", "Key"], ["❤️", "Heart"],
];

/** Internal room identifiers used consistently in the preview. */
export const roomId = "!engineering:tesseract.local";
export const roomLink = `https://tesseract.local/#/room/${roomId}`;

/** Local directory fixtures, not a server directory. */
export const invitePeople = ["Alice Chen", "Bob Wilson", "Charlie Davis"].map((name) => ({
    name,
    id: `@${name.split(" ")[0].toLowerCase()}:tesseract.local`,
}));
