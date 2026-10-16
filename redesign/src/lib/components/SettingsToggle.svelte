<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    /** Accessible preview switch using the original 44 × 24 Figma assets. */
    let { label, checked = $bindable(false), onchange }: {
        label: string; checked?: boolean; onchange?: () => void;
    } = $props();
</script>

<button type="button" role="switch" aria-label={label} aria-checked={checked}
    onclick={() => { checked = !checked; onchange?.(); }}>
    <img src="/settings/toggle-{checked ? 'on' : 'off'}.svg" alt="" width="44" height="24" />
    <span aria-hidden="true">{checked ? "On" : "Off"}</span>
</button>

<style>
    button { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); color: inherit; }
    img { display: block; }
    button:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 4px; }
</style>
