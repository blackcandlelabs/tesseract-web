/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { settingsPages } from "./settings.ts";

const escape = (value: string): string =>
    value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");

describe("Settings prerenders", () => {
    for (const page of settingsPages) {
        it(`should emit ${page.path} with its title, active navigation and every content block`, () => {
            const html = readFileSync(`build${page.path}.html`, "utf8");
            assert.ok(html.includes(`<title>${escape(page.name)} — Tesseract</title>`));
            assert.ok(html.includes(`href="${page.path}" aria-current="page"`));
            assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
            for (const block of page.blocks) {
                if (block.kind === "section") {
                    assert.ok(html.includes(escape(block.title)));
                    for (const row of block.rows) {
                        assert.ok(html.includes(escape(row.label)), row.label);
                        assert.ok(html.includes(escape(row.help)), row.help);
                        if (row.value) assert.ok(html.includes(escape(row.value)), row.value);
                        if (row.action) assert.ok(html.includes(row.action));
                    }
                } else if (block.kind === "note") assert.ok(html.includes(escape(block.text)));
                else if (block.kind === "field") assert.ok(html.includes(escape(block.value)));
                else if (block.kind === "identity") assert.ok(html.includes(block.initials));
                else if (block.kind === "actions") for (const label of block.labels) assert.ok(html.includes(label));
                else if (block.kind === "level") assert.ok(html.includes('aria-pressed="true"'));
            }
        });
    }
    it("should emit the designed toggle defaults and original local assets", () => {
        const notifications = readFileSync("build/settings-notifications.html", "utf8");
        const voice = readFileSync("build/settings-voice-video.html", "utf8");
        assert.equal((notifications.match(/aria-checked="true"/g) || []).length, 2);
        assert.equal((notifications.match(/aria-checked="false"/g) || []).length, 1);
        assert.equal((voice.match(/aria-checked="true"/g) || []).length, 3);
        for (const state of ["on", "off"]) {
            assert.ok(notifications.includes(`/settings/toggle-${state}.svg`));
            const svg = readFileSync(`build/settings/toggle-${state}.svg`, "utf8");
            assert.match(svg, /width="44" height="24"/);
        }
    });
    it("should link every new route from the gallery", () => {
        const html = readFileSync("build/index.html", "utf8");
        for (const page of settingsPages) assert.ok(html.includes(`href="${page.path}"`));
    });
});
