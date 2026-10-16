/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { statePages, messageActions, roomActions, memberActions } from "./states.ts";

const html = (id: string): string => readFileSync(`build/state-${id}.html`, "utf8");
describe("Wave 5 state renders", () => {
    for (const page of statePages) {
        it(`prerenders ${page.path} in its host and links from the gallery`, () => {
            assert.ok(html(page.id).includes(`<title>${page.name} — Tesseract</title>`));
            assert.match(html(page.id), /aria-label="Rooms"/);
            assert.match(html(page.id), /states-conversation/);
            assert.ok(readFileSync("build/index.html", "utf8").includes(`href="${page.path}"`));
        });
    }
    it("renders complete contextual actions and restrained danger", () => {
        for (const action of messageActions) assert.ok(html("message-menu").includes(action));
        for (const action of [...roomActions, ...memberActions]) assert.ok(html("list-menus").includes(action));
        assert.match(html("message-menu"), /Message quick actions/);
        assert.match(html("message-menu"), /class="danger"/);
        assert.match(html("list-menus"), /class="trust"><span>♢ Verify/);
    });
    it("uses Element Call and provides all four quiet timeline states", () => {
        assert.match(html("incoming-call"), /ELEMENT CALL/);
        assert.match(html("incoming-call"), /href="\/call-prejoin"/);
        assert.match(html("incoming-call"), /Dismiss/);
        for (const text of ["started a call", "Call ended", "18 min 24 sec", "Missed call", "Call declined"]) {
            assert.ok(html("call-events").includes(text));
        }
        assert.doesNotMatch(html("incoming-call"), /dialpad|Legacy call/);
    });
    it("distinguishes static maps and neutral live sharing", () => {
        assert.match(html("location"), /Open in maps/);
        assert.match(html("location"), /1 Ferry Building, San Francisco/);
        assert.match(html("live-location"), /banner neutral/);
        assert.match(html("live-location"), /Expires in 42:18/);
        assert.equal((html("live-location").match(/type="radio"/g) || []).length, 3);
        assert.match(html("live-location"), /Stop sharing/);
        assert.match(html("live-location"), /No location is collected/);
    });
    it("provides honest empty, connection and encryption states", () => {
        assert.match(html("empty-room"), /start of the conversation/);
        assert.match(html("empty-room"), /encryption-notice trust/);
        assert.match(html("empty-room"), /Invite people/);
        assert.match(html("empty-states"), /No rooms yet/);
        assert.match(html("empty-states"), /No messages match <code>release checklist/);
        for (const text of ["You’re offline", "Reconnecting…", "Catching up", "Back online"]) {
            assert.ok(html("connection").includes(text));
        }
        assert.match(html("e2ee-warnings"), /banner warning/);
        assert.match(html("e2ee-warnings"), /Unable to decrypt this message/);
        assert.match(html("e2ee-warnings"), /Waiting for the encryption key/);
        assert.match(html("redacted"), /Bob<\/strong><time>2:34 PM/);
        assert.match(html("redacted"), /Message deleted/);
        assert.match(html("redacted"), /This room has been replaced/);
    });
});
