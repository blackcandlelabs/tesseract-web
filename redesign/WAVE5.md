<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
# Wave 5 — States & Calls

Stacks on PR #7 (`redesign-wave-4`). Intended PR base: `develop`.
Intended title: **Redesign wave 5 — Svelte renders (States & Calls)**.

Routes (all linked from the gallery):

- `/state-message-menu`
- `/state-list-menus`
- `/state-incoming-call`
- `/state-call-events`
- `/state-live-location`
- `/state-location`
- `/state-empty-room`
- `/state-empty-states`
- `/state-connection`
- `/state-e2ee-warnings`
- `/state-redacted`

Reuses the existing Avatar, Message and Button components and redesign tokens.
State specimens live inside a room-list/conversation shell, not standalone boards.
Call entry points lead to the existing Element Call pre-join surface. Location maps
are illustrative placeholders; no coordinates are collected. The expiry time is a
frozen, explicitly labelled preview. Connection variants are labelled specimens,
not claims about the browser's network state. Destructive menu actions only show
preview feedback. Dismiss and stop-sharing update local preview state.

Validation:

```sh
cd redesign
npm ci
npm run build
node --experimental-strip-types --test src/lib/states.render.test.ts
```

All 11 routes emitted; 15 render assertions passed. No changes outside `redesign/`.
Figma metadata lookup for `6LyoQKfdG5Lpm5DOLRlYNY` returned only `0:1: Page 1`,
not the concurrently designed Wave 5 page. Implementation follows the supplied
surface descriptions and established components; final Figma visual comparison
remains outstanding. No browser screenshot baselines were generated.

Repository agent instructions reserve PR creation for a human. No PR creation
was attempted; the title, base, stacking note and route list above are ready to use.
