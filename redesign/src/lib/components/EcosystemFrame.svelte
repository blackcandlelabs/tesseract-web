<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import type { Snippet } from "svelte";
    import RoomShell from "../../routes/room-shell/+page.svelte";

    /** Panel title and content, rendered alongside the unchanged Wave 1 room shell. */
    let { title, children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head><title>{title} — Tesseract</title></svelte:head>
<div class="ecosystem-frame">
    <div class="room-context"><RoomShell /></div>
    <aside aria-label={title}>
        <header><h1>{title}</h1><a href="/room-shell" aria-label="Close panel">×</a></header>
        <div class="panel-content">{@render children()}</div>
    </aside>
</div>

<style>
    .ecosystem-frame { display: grid; grid-template-columns: minmax(0, 1fr) 380px; height: 100dvh; }
    .room-context { min-width: 0; overflow: hidden; }
    aside { border-left: 1px solid var(--color-border); overflow-y: auto; background: var(--color-bg-white); }
    header { height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 var(--space-6); border-bottom: 1px solid var(--color-border-light); }
    h1 { font-size: var(--text-lg); font-weight: 600; }
    header a { font-size: var(--text-2xl); color: var(--color-text-secondary); padding: var(--space-2); }
    .panel-content { padding: var(--space-6); }
    @media (max-width: 760px) { .ecosystem-frame { grid-template-columns: 1fr; } .room-context { display: none; } aside { border: 0; } }
</style>
