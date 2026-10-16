/*
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { findMembers, members, wave2Pages } from "./wave2.ts";

describe("Room Ecosystem fixtures", () => {
    it("should show the complete small team for an empty search", () => {
        assert.deepEqual(findMembers(""), members);
        assert.equal(members.filter((member) => member.role === "Admin").length, 1);
        assert.equal(members.filter((member) => member.presence === "Online").length, 3);
    });
    it("should search display names and Matrix IDs without case or whitespace sensitivity", () => {
        assert.deepEqual(findMembers(" ALICE ").map((member) => member.name), ["Alice"]);
        assert.deepEqual(findMembers("@bob:tesseract.internal").map((member) => member.name), ["Bob"]);
        assert.equal(findMembers("missing").length, 0);
        assert.equal(findMembers("tesseract.internal").length, 4);
    });
    it("should register nine unique gallery routes with source pages", () => {
        assert.equal(new Set(wave2Pages.map((page) => page.path)).size, 9);
        for (const page of wave2Pages) {
            assert.match(readFileSync(`src/routes${page.path}/+page.svelte`, "utf8"), /<script lang="ts">/);
        }
    });
});
