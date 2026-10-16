<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
# Wave 4 — Dialogs

Built on `redesign-wave-3` (PR #6). Intended PR title: **Redesign wave 4 — Svelte renders (Dialogs)**; target: `develop`.

Routes, all linked from the gallery:

- `/dialog-create-room`
- `/dialog-create-space`
- `/dialog-invite`
- `/dialog-spotlight`
- `/dialog-verify-session`
- `/dialog-secure-backup`
- `/dialog-leave-room`
- `/dialog-moderation`
- `/dialog-report`
- `/dialog-share`
- `/dialog-media`

Uses the existing room shell as an inert, dimmed host, the established tokens, Button and Avatar, and a shared native dialog with focus containment and Escape/close navigation. Media has upload and lightbox tabs; sharing has a locally generated QR encoding the exact internal room link. Clipboard operations, selection, filters and saved-key gating are local interactions. Actions requiring a server report that no changes were made.

Security previews never generate recovery material, verify a real session or claim that setup succeeded. SAS has seven labelled emoji in order and a rejection path; the recovery block is explicitly nonfunctional example material. Invitation-only access applies throughout. Green is reserved for encryption/trust framing; destructive actions use red.

Figma lookup for `6LyoQKfdG5Lpm5DOLRlYNY` returned only an empty `Page 1` (`0:1`), not the concurrently authored Wave 4 page. Implementation therefore follows the supplied surface descriptions and existing redesign components. No Figma visual comparison was possible. No production Matrix integration is included in this render-only app.

Verification: `npm run build`, `npm run test:unit`, `npm run test:render`. Render tests check every emitted route and gallery link, modal semantics, invitation-only creation, encryption, SAS order, backup gating, internal IDs, search highlighting, destructive styling, reporting and media assets. Browser interaction and screenshot tests are not included.
