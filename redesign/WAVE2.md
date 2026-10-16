<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
# Wave 2 — Room Ecosystem

These Svelte renders extend Wave 1 (PR #4, `redesign-wave-1`, base `9b5fc760`).
All nine routes are linked from the gallery:

- `/room-info`
- `/member-list`
- `/member-info`
- `/threads`
- `/thread-view`
- `/files-pinned`
- `/room-encryption`
- `/composer-states`
- `/room-preview`

The Figma file exposed only `Page 1` when inspected; the concurrent Wave 2 page
was not available. These renders use the existing Secure Signal variables,
Avatar, Badge, Button, Message, and Wave 1 room shell. Panels collapse to a
standalone view on narrow screens.

Interactions are local render fixtures, not Matrix operations. Member search,
thread replies, composer editing/reply/reaction controls, the verified-device
switch, and join/upgrade buttons demonstrate state changes. Device details and
unavailable actions explain their preview status; file controls do not download
fake files. Alice is the linked member-info fixture. Room invitation and upgrade
are shown as separate lifecycle examples; encrypted history is not exposed to
an unjoined user.

## Verification

From `redesign/`, with Node 22.18 or newer:

```sh
npm ci
npm run test:unit
npm run build
npm run test:render
```

The render checks inspect production HTML for all nine surfaces and gallery
links. The preview workflow runs both test suites. Browser interaction tests and
Figma visual diffs are not included in these checks.

## Human PR handoff

Repository instructions require a human to open the PR.

Title: **Redesign wave 2 — Svelte renders (Room Ecosystem)**

Base: `develop`. Head: `redesign-wave-2`.

Body: Stacks on PR #4 (`redesign-wave-1`). Adds the nine routes listed above,
reusing the Wave 1 shell and Secure Signal component system. Includes unit and
prerender checks. The concurrent Figma Wave 2 page was unavailable at inspection;
visual comparison remains pending.
