/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { settingsPages, settingsNavigation } from "./settings.ts";

describe("Settings fixtures", () => {
    it("should expose eight distinct routes and select exactly one sidebar tab per route", () => {
        assert.equal(settingsPages.length, 8);
        assert.equal(new Set(settingsPages.map((page) => page.path)).size, 8);
        for (const page of settingsPages) {
            const tabs = settingsNavigation(page.scope);
            assert.equal(tabs.filter((tab) => tab.path === page.path).length, 1);
            for (const tab of tabs) {
                if (tab.path) assert.ok(settingsPages.some((candidate) => candidate.path === tab.path));
            }
        }
        assert.equal(settingsNavigation("User").length, 10);
        assert.equal(settingsNavigation("Room").length, 4);
        assert.equal(settingsNavigation("Space").length, 3);
    });
    it("should reserve trust styling for encryption and verified devices", () => {
        for (const page of settingsPages) {
            for (const block of page.blocks) {
                if (block.kind !== "section") continue;
                for (const row of block.rows) {
                    if (row.trust) {
                        assert.ok(["/settings-security", "/settings-room-security"].includes(page.path));
                        assert.match(row.value!, /^✓ /);
                    }
                    if (row.toggle !== undefined || row.select) assert.ok(!row.trust);
                }
            }
        }
    });
    it("should keep the product closed-world and calls on Element Call", () => {
        const copy = JSON.stringify(settingsPages);
        assert.doesNotMatch(copy, /world-readable|public room|Jitsi|legacy call|lorem ipsum/i);
        assert.match(copy, /No Google services required/);
        assert.match(copy, /Calls in Tesseract use Element Call/);
        assert.match(copy, /Messages are visible to members from when they join/);
        assert.match(copy, /Invite accounts on blackcandle.tech/);
    });
});
