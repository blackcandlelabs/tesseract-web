<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import Avatar from "./Avatar.svelte";
    import Badge from "./Badge.svelte";
    import Button from "./Button.svelte";
    import "../wave2.css";

    let replying = $state(true);
    let editing = $state(true);
    let pickerOpen = $state(true);
    let reply = $state("Confirmed on mobile too.");
    let edit = $state("Recovery key check is complete on desktop and mobile.");
    let reaction = $state("");
    let status = $state("");
</script>

<svelte:head><title>Composer States — Tesseract</title></svelte:head>
<main class="wave2 composer-page">
    <header><Avatar name="#engineering" color="#16A34A" size={32} /><div><h1>#engineering</h1><Badge variant="encrypted">⌑ Encrypted · 4 members</Badge></div><a href="/room-info">Room info →</a></header>
    <div class="states">
        <h2>Composer states</h2><p class="caption">#engineering · Message interactions</p>
        <section><h3>Reply in progress</h3>
            <div class="composer">
                {#if replying}<div class="context"><div><strong>Replying to Alice</strong><p>Can you check desktop and mobile before we deploy?</p></div><Button variant="ghost" aria-label="Cancel reply" onclick={() => replying = false}>×</Button></div>{/if}
                <form onsubmit={(event) => { event.preventDefault(); if (reply.trim()) { status = "Reply added to this preview."; reply = ""; replying = false; } }}><label for="reply">Message</label><textarea id="reply" bind:value={reply}></textarea><footer><span class="caption">⌑ End-to-end encrypted</span><Button type="submit">Send</Button></footer></form>
            </div>
        </section>
        <section><h3>Editing a message</h3>
            <div class="composer">
                {#if editing}<div class="context"><div><strong>Editing your message</strong><p>Recovery key check is complete.</p></div><Button variant="ghost" aria-label="Cancel editing" onclick={() => editing = false}>×</Button></div>{/if}
                {#if editing}<form onsubmit={(event) => { event.preventDefault(); if (edit.trim()) { editing = false; status = "Message updated in this preview."; } }}><label for="edit">Edit message</label><textarea id="edit" bind:value={edit}></textarea><footer><Button variant="ghost" onclick={() => editing = false}>Cancel</Button><Button type="submit">Save changes</Button></footer></form>{:else}<p class="saved">{edit}</p><Button variant="ghost" onclick={() => editing = true}>Edit again</Button>{/if}
            </div>
        </section>
        <section><h3>Reaction picker open</h3>
            <div class="reaction-message"><Avatar name="Bob" color="#16A34A" size={40} /><div><strong>Bob <span class="caption">2:35 PM</span></strong><p>Confirmed on desktop and mobile. New messages decrypt correctly.</p><button class="reaction-trigger" aria-expanded={pickerOpen} onclick={() => pickerOpen = !pickerOpen}>{reaction || "Add reaction +"}</button></div></div>
            {#if pickerOpen}<div class="reaction-picker" role="group" aria-label="Choose a reaction"><h3>Quick reactions</h3><div>{#each [{ emoji: "👍", name: "Thumbs up" }, { emoji: "❤️", name: "Heart" }, { emoji: "🎉", name: "Celebrate" }, { emoji: "✅", name: "Check mark" }, { emoji: "👀", name: "Eyes" }, { emoji: "🚀", name: "Rocket" }] as item}<button aria-label={item.name} onclick={() => { reaction = `${item.emoji} 1`; pickerOpen = false; status = `${item.name} reaction added in this preview.`; }}>{item.emoji}</button>{/each}</div></div>{/if}
        </section>
        {#if status}<p role="status" class="callout">{status}</p>{/if}
    </div>
</main>

<style>
    .composer-page { min-height: 100dvh; background: var(--color-bg-white); }
    header { display: flex; gap: var(--space-3); align-items: center; height: 64px; padding: 0 var(--space-6); border-bottom: 1px solid var(--color-border-light); }
    header h1 { font-size: var(--text-xl); } header a { margin-left: auto; font-size: var(--text-sm); color: var(--color-primary); }
    .states { max-width: 800px; padding: var(--space-8) var(--space-6); margin: auto; }
    .states > section { margin-top: var(--space-8); }
    .composer { border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; }
    .context { border-left: 3px solid var(--color-primary); background: var(--color-bg-light-1); padding: var(--space-3) var(--space-4); display: flex; justify-content: space-between; font-size: var(--text-sm); }
    .context p { color: var(--color-text-secondary); margin: var(--space-1) 0; }
    form { padding: var(--space-4); } label { font-size: var(--text-xs); color: var(--color-text-secondary); }
    footer { display: flex; align-items: center; justify-content: space-between; margin-top: var(--space-3); }
    .saved { padding: var(--space-4); }
    .reaction-message { display: flex; gap: var(--space-3); font-size: var(--text-sm); }
    .reaction-trigger { padding: var(--space-1) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-full); color: var(--color-primary); }
    .reaction-picker { margin: var(--space-3) 0 0 var(--space-12); padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); width: fit-content; background: var(--color-bg-white); box-shadow: 0 4px 16px #0000000d; }
    .reaction-picker div { display: flex; flex-wrap: wrap; gap: var(--space-2); }
    .reaction-picker button { font-size: var(--text-2xl); padding: var(--space-1); border-radius: var(--radius-sm); }
    .reaction-picker button:hover { background: var(--color-bg-light-2); }
</style>
