/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { wave2Pages } from "./wave2.ts";

// Run after the production build: this verifies actual prerendered HTML, not source strings.
describe("Wave 2 static renders", () => {
    const expectations = [
        ["room-info", "Invitation required", "Leave room", "Encryption"],
        ["member-list", "Admins", "@alice:tesseract.internal", "Away", "Verified"],
        ["member-info", "You have verified Alice", "Admin", "2 verified"],
        ["threads", "2 unread", "3 replies", "Release checklist"],
        ["thread-view", "3 replies", "Reply in thread", "thread-draft"],
        ["files-pinned", "release-checklist.md", "Pinned messages", "Never share your recovery key"],
        ["room-encryption", "m.megolm.v1.aes-sha2", "Key backup", 'role="switch"', "checked"],
        ["composer-states", "Replying to Alice", "Editing your message", "Choose a reaction"],
        ["room-preview", "Join room", "This room has been upgraded", "Go to new room", "read-only"],
    ];
    for (const [route, ...content] of expectations) {
        it(`should emit /${route} with its designed state`, () => {
            const html = readFileSync(`build/${route}.html`, "utf8");
            assert.match(html, /<title>.*Tesseract<\/title>/);
            for (const text of content) assert.ok(html.includes(text), `${route} missing ${text}`);
            assert.ok(!html.includes("lorem ipsum"));
        });
    }
    it("should link every Wave 2 route from the emitted gallery", () => {
        const html = readFileSync("build/index.html", "utf8");
        for (const page of wave2Pages) assert.ok(html.includes(`href="${page.path}"`));
    });
});
