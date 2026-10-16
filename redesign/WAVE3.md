<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->

# Wave 3 — Settings

Source: Figma `6LyoQKfdG5Lpm5DOLRlYNY`, page `40:2` (Wave 3 — Settings).

| Route                         | Frame    |
| ----------------------------- | -------- |
| `/settings-user`              | `40:16`  |
| `/settings-security`          | `40:81`  |
| `/settings-notifications`     | `40:147` |
| `/settings-voice-video`       | `40:225` |
| `/settings-room`              | `40:301` |
| `/settings-room-security`     | `40:350` |
| `/settings-space`             | `40:398` |
| `/settings-space-permissions` | `40:455` |

All eight routes are linked from the gallery. The shared shell follows the 1440 × 900 frames:
64px top bar, 264px sidebar, 48px pane padding, 1000px content, 24px block gaps, and 76px rows.
Smaller viewports reflow rather than clip. Wave 3 color refinements are scoped to this surface.
Existing Button, Avatar and Input components gain opt-in settings variants; their defaults are unchanged.
The original 44 × 24 Figma toggle SVGs are stored in `static/settings/`.

## Preview behavior

These are design renders, not live account settings. Inputs, notification levels and switches are locally
interactive. Cancel restores the fixture. Save explicitly reports that no live settings changed.
Copy ID uses the clipboard with an error fallback. Account, avatar, device, backup and session actions
explain that a live connection is required; they do not pretend to perform security operations.
Undesigned sidebar tabs are marked unavailable. Close returns to the gallery.

## Verification

From `redesign/`:

```sh
npm ci
npm run build
npm run test:unit
npm run test:render
```

The render tests require the production build and check all eight emitted pages, active tabs, content,
gallery links, switch defaults and local SVG dimensions. Unit tests cover navigation, closed-world copy,
and the trust-only use of green. Existing Wave 2 tests run alongside these tests.

All eight desktop renders were visually reviewed against the Figma screenshots. Browser smoke checks
also covered 390px layouts, navigation, cancel/reset, save disclosure, notification selection, switches,
asset loading and geometry, and absence of runtime errors. No screenshot baselines were changed.

## Human PR handoff

Repository instructions reserve PR creation for a human.

Title: **Redesign wave 3 — Svelte renders (Settings)**

Base: `develop`; head: `redesign-wave-3`.

Body: Stacks on PR #5 (`redesign-wave-2`). Adds the eight settings routes listed above, shared settings
primitives, gallery entries, and unit/prerender tests. Build and tests pass. No main application code changed.
