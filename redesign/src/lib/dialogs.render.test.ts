/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dialogPages, sasEmoji, roomLink, roomId, invitePeople } from "./dialogs.ts";

const html = (id: string): string => readFileSync(`build/dialog-${id}.html`, "utf8");
const escape = (text: string): string => text.replaceAll("&", "&amp;");

describe("Wave 4 dialog renders", () => {
    for (const page of dialogPages) {
        it(`should prerender ${page.path} as a labelled dialog with inert host context`, () => {
            const output = html(page.id);
            assert.ok(output.includes(`<title>${escape(page.name)} — Tesseract</title>`));
            assert.match(output, /<dialog[^>]+aria-labelledby="dialog-title"/);
            assert.match(output, /class="dialog-host" inert/);
            assert.match(output, /aria-label="Close dialog"/);
            assert.ok(readFileSync("build/index.html", "utf8").includes(`href="${page.path}"`));
        });
    }
    it("should keep creation invite-only and encryption on", () => {
        for (const id of ["create-room", "create-space"]) {
            assert.match(html(id), /Invite-only/);
            assert.doesNotMatch(html(id), /Public room|Anyone can join|Federation/);
            assert.match(html(id), /disabled/);
        }
        assert.match(html("create-room"), /End-to-end encryption is on/);
        assert.match(html("create-room"), /Encryption cannot be turned off/);
    });
    it("should show seven named SAS emoji in order without claiming verification", () => {
        const output = html("verify-session");
        assert.equal(sasEmoji.length, 7);
        let previous = -1;
        for (const [, name] of sasEmoji) {
            const index = output.indexOf(`aria-label="${name}"`);
            assert.ok(index > previous);
            previous = index;
        }
        for (const text of ["same order", "They don’t match", "They match", "Awaiting verification", "does not verify a session"]) {
            assert.ok(output.includes(text));
        }
    });
    it("should distinguish example backup material and gate continuation", () => {
        assert.match(html("secure-backup"), /NOT A RECOVERY KEY/);
        assert.match(html("secure-backup"), /disabled[^>]*>(?:<!--.*?-->)*Continue/);
        assert.match(html("secure-backup"), /type="checkbox"/);
        assert.doesNotMatch(html("secure-backup"), /checked/);
    });
    it("should show internal identities and the selected invite chip", () => {
        for (const person of invitePeople) assert.ok(html("invite").includes(person.id));
        assert.match(html("invite"), /Remove Alice Chen/);
        assert.match(html("invite"), /Invite 1 person/);
        assert.ok(html("share").includes(roomLink));
        assert.ok(html("share").includes(roomId));
        assert.match(html("share"), /Sharing a link does not grant access/);
        assert.ok(readFileSync("build/dialogs/room-qr.svg", "utf8").includes("<svg"));
    });
    it("should render real search matches, restrained destructive actions and admin reporting", () => {
        assert.match(html("spotlight"), /<mark>encryption<\/mark>/);
        assert.match(html("leave-room"), /class="danger"/);
        assert.match(html("moderation"), /class="danger subtle"/);
        assert.equal((html("report").match(/type="radio"/g) || []).length, 5);
        assert.match(html("report"), /report goes to the room admins/);
    });
    it("should render media upload and expose the separate lightbox state", () => {
        assert.match(html("media"), /Upload confirmation/);
        assert.match(html("media"), /View image/);
        assert.match(html("media"), /release-plan.svg/);
        assert.match(html("media"), /Caption/);
        assert.match(readFileSync("build/dialogs/release-plan.svg", "utf8"), /01 · Review/);
    });
});
