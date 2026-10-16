<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import Avatar from "./Avatar.svelte";
    import Badge from "./Badge.svelte";
    import Button from "./Button.svelte";
    import Message from "./Message.svelte";
    import "../wave2.css";

    let joined = $state(false);
    let upgraded = $state(false);
</script>

<svelte:head><title>Room Preview & Upgrade Banners — Tesseract</title></svelte:head>
<main class="wave2 previews">
    <h1>Room preview & upgrade banners</h1>
    <p class="caption">Invite-only rooms · Two room lifecycle states</p>
    <section class="room-example" aria-label="Room invitation preview">
        <header><Avatar name="#engineering" color="#16A34A" size={40} /><div><h2>#engineering</h2><Badge variant="encrypted">⌑ End-to-end encrypted</Badge></div><span class="caption">Room invitation</span></header>
        <div class="empty-preview"><Avatar name="#engineering" color="#16A34A" size={64} /><h2>{joined ? "You joined #engineering" : "Your team is waiting"}</h2><p>Alice invited you to #engineering.</p><p class="caption">Build notes, release checks, and the details that keep our team in sync.</p><span class="caption">4 members · Invitation required</span><p class="caption">{joined ? "Room history will appear after keys are shared with your device." : "Join to see messages shared with you. Encrypted history is not available in this preview."}</p></div>
        <div class="banner"><div><strong>{joined ? "Room joined" : "You’re invited to #engineering"}</strong><p class="caption">{joined ? "Preview state only — no membership changes were made." : "Messages are end-to-end encrypted."}</p></div><Button disabled={joined} onclick={() => joined = true}>{joined ? "Joined ✓" : "Join room"}</Button></div>
    </section>
    <section class="room-example" aria-label="Room upgrade banner">
        <header><Avatar name="#engineering" color="#16A34A" size={40} /><div><h2>#engineering</h2><Badge variant="encrypted">⌑ Encrypted · 4 members</Badge></div><span class="caption">{upgraded ? "Replacement room" : "Read-only room"}</span></header>
        <div class="upgrade-banner"><span class="upgrade-icon">↑</span><div><strong>{upgraded ? "You’re viewing the replacement room" : "This room has been upgraded"}</strong><p class="caption">{upgraded ? "New conversations continue here. Earlier messages remain in the previous room." : "Alice upgraded this room to version 11. Continue the conversation in the replacement room."}</p></div><Button variant="secondary" disabled={upgraded} onclick={() => upgraded = true}>{upgraded ? "Current room" : "Go to new room"}</Button></div>
        <div class="history"><Message sender="Alice" time="10:20 AM" color="#8B5CF6" content={upgraded ? "Welcome back. Let’s continue the release checks here." : "I’m upgrading the room. Our earlier messages will stay available here."} /></div>
        <div class="readonly"><span class="caption">{upgraded ? "⌑ This replacement room is end-to-end encrypted. Preview only." : "This room is read-only. Send new messages in the upgraded room."}</span></div>
    </section>
</main>

<style>
    .previews { max-width: 1120px; margin: auto; padding: var(--space-8) var(--space-6); }
    h1 { font-size: var(--text-2xl); } .room-example { margin-top: var(--space-8); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; }
    header { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4) var(--space-6); border-bottom: 1px solid var(--color-border-light); }
    header > span { margin-left: auto; }
    .empty-preview { display: flex; flex-direction: column; align-items: center; padding: var(--space-8); text-align: center; }
    .empty-preview h2 { margin-top: var(--space-4); } .empty-preview p { max-width: 440px; }
    .banner, .upgrade-banner { display: flex; gap: var(--space-4); align-items: center; padding: var(--space-4) var(--space-6); background: var(--color-bg-light-2); }
    .banner > div, .upgrade-banner > div { flex: 1; } .banner p, .upgrade-banner p { margin: var(--space-1) 0 0; }
    .upgrade-icon { color: var(--color-primary); font-size: var(--text-2xl); }
    .history { padding: var(--space-6) 0; min-height: 140px; }
    .readonly { text-align: center; padding: var(--space-4); border-top: 1px solid var(--color-border-light); }
    @media (max-width: 600px) { .banner, .upgrade-banner { flex-wrap: wrap; } header > span { display: none; } }
</style>
