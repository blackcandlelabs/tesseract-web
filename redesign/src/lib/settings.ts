/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

/** A designed settings row. Trust is explicit, never inferred from a positive status. */
export interface SettingsRow {
    label: string;
    help: string;
    value?: string;
    trust?: boolean;
    mono?: boolean;
    action?: string;
    toggle?: boolean;
    select?: boolean;
}

/** Content blocks preserve the shared spacing of the eight Figma settings frames. */
export type SettingsBlock =
    | { kind: "section"; title: string; rows: SettingsRow[] }
    | { kind: "note"; text: string }
    | { kind: "actions"; labels: string[]; primary?: boolean }
    | { kind: "identity"; name: string; initials: string; detail: string; mono?: boolean }
    | { kind: "field"; label: string; value: string; multiline?: boolean }
    | { kind: "level" };

/** Static design fixture, not a live account or security assertion. */
export interface SettingsPage {
    path: string;
    name: string;
    scope: "User" | "Room" | "Space";
    title: string;
    description: string;
    blocks: SettingsBlock[];
}

const section = (title: string, rows: SettingsRow[]): SettingsBlock => ({ kind: "section", title, rows });
const note = (text: string): SettingsBlock => ({ kind: "note", text });
const actions = (labels = ["Save changes", "Cancel"], primary = true): SettingsBlock => ({
    kind: "actions",
    labels,
    primary,
});
const field = (label: string, value: string, multiline = false): SettingsBlock => ({
    kind: "field",
    label,
    value,
    multiline,
});
const identity = (name: string, initials: string, detail: string, mono = false): SettingsBlock => ({
    kind: "identity",
    name,
    initials,
    detail,
    mono,
});

/** Gallery routes and exact product copy from Wave 3 — Settings, page 40:2. */
export const settingsPages: SettingsPage[] = [
    {
        path: "/settings-user",
        name: "User Settings — Profile",
        scope: "User",
        title: "Profile",
        description: "Your profile across rooms and conversations.",
        blocks: [
            identity("Alice Thompson", "AT", "@alice:blackcandle.tech", true),
            field("Display name", "Alice Thompson"),
            section("Account", [
                { label: "Black Candle ID", help: "Signed in with Black Candle ID", action: "Manage account" },
                { label: "Matrix ID", help: "@alice:blackcandle.tech", mono: true, action: "Copy ID" },
            ]),
            note("Your Matrix ID stays the same when you change your display name."),
            actions(),
        ],
    },
    {
        path: "/settings-security",
        name: "User Settings — Security & Privacy",
        scope: "User",
        title: "Security & Privacy",
        description: "Manage encryption, recovery and the devices signed in to your account.",
        blocks: [
            section("Encryption & recovery", [
                {
                    label: "Cross-signing",
                    help: "Your identity is trusted on this device.",
                    value: "✓ Verified",
                    trust: true,
                },
                {
                    label: "Encrypted key backup",
                    help: "Up to date · Keep your recovery key somewhere safe.",
                    value: "✓ Backup enabled",
                    trust: true,
                },
            ]),
            section("Sessions & devices", [
                { label: "Desktop · macOS", help: "Current session · Last seen now", value: "✓ Verified", trust: true },
                { label: "Mobile · Android", help: "Last seen 2 hours ago", value: "✓ Verified", trust: true },
            ]),
            actions(["Verify a device", "Manage backup", "Sign out other sessions"], false),
            note("Before signing out, make sure your encrypted key backup is up to date."),
        ],
    },
    {
        path: "/settings-notifications",
        name: "User Settings — Notifications",
        scope: "User",
        title: "Notifications",
        description: "Choose when Tesseract gets your attention. Room overrides take priority.",
        blocks: [
            { kind: "level" },
            section("Notification rules", [
                { label: "Direct messages", help: "Notify for every message in a direct conversation.", toggle: true },
                { label: "Mentions of your name", help: "Notify when someone mentions you.", toggle: true },
                { label: "Room mentions", help: "Notify when someone uses @room.", toggle: false },
            ]),
            section("Push delivery", [
                {
                    label: "UnifiedPush",
                    help: "Android notifications · No Google services required",
                    value: "Configured",
                },
            ]),
            note("Manage the UnifiedPush distributor on your Android device."),
        ],
    },
    {
        path: "/settings-voice-video",
        name: "User Settings — Voice & Video",
        scope: "User",
        title: "Voice & Video",
        description: "Calls in Tesseract use Element Call.",
        blocks: [
            section("Devices", [
                {
                    label: "Default microphone",
                    help: "Used when you join an Element Call.",
                    value: "System default",
                    select: true,
                },
                {
                    label: "Default camera",
                    help: "Used when you turn on video.",
                    value: "System default",
                    select: true,
                },
            ]),
            section("Before joining", [
                { label: "Show call preview", help: "Review your camera and microphone before joining.", toggle: true },
            ]),
            section("Audio processing", [
                {
                    label: "Noise suppression",
                    help: "Reduce background noise where supported by your device.",
                    toggle: true,
                },
                {
                    label: "Echo cancellation",
                    help: "Reduce speaker feedback where supported by your device.",
                    toggle: true,
                },
            ]),
            note("Available devices and audio processing depend on browser and operating-system support."),
        ],
    },
    {
        path: "/settings-room",
        name: "Room Settings — General",
        scope: "Room",
        title: "General",
        description: "Room details for Engineering in Black Candle.",
        blocks: [
            identity("Engineering", "EN", "4 members · Invite-only"),
            field("Room name", "Engineering"),
            field(
                "Topic",
                "Build, review and ship Tesseract. Decisions and release coordination for the founding team.",
                true,
            ),
            section("Room access", [
                { label: "Join rule", help: "Only invited people can join this room.", value: "Invite-only" },
            ]),
            actions(),
        ],
    },
    {
        path: "/settings-room-security",
        name: "Room Settings — Security",
        scope: "Room",
        title: "Security",
        description: "Encryption and access controls for Engineering.",
        blocks: [
            section("Encryption", [
                {
                    label: "End-to-end encryption",
                    help: "Messages are encrypted before they leave your device.",
                    value: "✓ Enabled",
                    trust: true,
                },
            ]),
            note("Encryption cannot be turned off for this room."),
            section("Access & history", [
                { label: "Room access", help: "People must be invited before joining.", value: "Invite-only" },
                {
                    label: "History visibility",
                    help: "Messages are visible to members from when they join.",
                    value: "Joined members",
                },
                { label: "Room version", help: "The Matrix room version used by this room.", value: "10" },
            ]),
            note("Reading encrypted history also requires the corresponding message keys."),
        ],
    },
    {
        path: "/settings-space",
        name: "Space Settings — General",
        scope: "Space",
        title: "General",
        description: "Organize the rooms in Black Candle.",
        blocks: [
            identity("Black Candle", "BC", "3 rooms · Invite-only"),
            field("Space name", "Black Candle"),
            field("Topic", "The founding team’s workspace for building and shipping Tesseract."),
            section("Rooms in this space · 3", [
                { label: "General", help: "Team updates and day-to-day coordination.", value: "Invite-only" },
                { label: "Engineering", help: "Build, review and ship Tesseract.", value: "Invite-only" },
                { label: "Design", help: "Product design and review.", value: "Invite-only" },
            ]),
            actions(),
        ],
    },
    {
        path: "/settings-space-permissions",
        name: "Space Settings — Permissions",
        scope: "Space",
        title: "Permissions",
        description: "Manage who can administer Black Candle and invite members.",
        blocks: [
            section("Space admins", [
                { label: "Alice Thompson · You", help: "@alice:blackcandle.tech", mono: true, value: "Admin · 100" },
                { label: "Bob Chen", help: "@bob:blackcandle.tech", mono: true, value: "Admin · 100" },
            ]),
            section("Permissions", [
                {
                    label: "Who can invite",
                    help: "Invite accounts on blackcandle.tech to this space.",
                    value: "Admins · 100",
                    select: true,
                },
                {
                    label: "Who can manage the space",
                    help: "Change space details and its rooms list.",
                    value: "Admins · 100",
                    select: true,
                },
            ]),
            note("Power levels apply to this space. Each room has its own membership and permissions."),
            actions(),
        ],
    },
];

/** Shell navigation includes only the designed routes; other tabs remain explicitly unavailable. */
export function settingsNavigation(scope: SettingsPage["scope"]): { label: string; path?: string }[] {
    const labels =
        scope === "User"
            ? [
                  "Profile",
                  "Account",
                  "Appearance",
                  "Notifications",
                  "Preferences",
                  "Voice & Video",
                  "Security & Privacy",
                  "Keyboard",
                  "Labs",
                  "Help & About",
              ]
            : scope === "Room"
              ? ["General", "Security", "Permissions", "Advanced"]
              : ["General", "Permissions", "Members"];
    return labels.map((label) => ({
        label,
        path: settingsPages.find((page) => page.scope === scope && page.title === label)?.path,
    }));
}
