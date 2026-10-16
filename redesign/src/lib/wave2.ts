/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

/** Gallery entries for the Room Ecosystem render fixtures. */
export const wave2Pages = [
    { name: "Room Info", path: "/room-info" },
    { name: "Member List", path: "/member-list" },
    { name: "Member Info", path: "/member-info" },
    { name: "Threads", path: "/threads" },
    { name: "Thread View", path: "/thread-view" },
    { name: "Files & Pinned", path: "/files-pinned" },
    { name: "Room Encryption", path: "/room-encryption" },
    { name: "Composer States", path: "/composer-states" },
    { name: "Room Preview & Upgrade Banners", path: "/room-preview" },
] as const;

/** Small, invite-only engineering team shared by the member surfaces. */
export const members = [
    { name: "Alice", id: "@alice:tesseract.internal", role: "Admin", presence: "Online", verified: true, color: "#8B5CF6" },
    { name: "Bob", id: "@bob:tesseract.internal", role: "Member", presence: "Online", verified: true, color: "#16A34A" },
    { name: "Charlie", id: "@charlie:tesseract.internal", role: "Member", presence: "Away", verified: false, color: "#F59E0B" },
    { name: "You", id: "@sam:tesseract.internal", role: "Member", presence: "Online", verified: true, color: "#2970D1" },
];

/** Match a member's display name or Matrix ID, ignoring case and surrounding spaces. */
export function findMembers(query: string) {
    const term = query.trim().toLowerCase();
    return members.filter((member) => `${member.name} ${member.id}`.toLowerCase().includes(term));
}
