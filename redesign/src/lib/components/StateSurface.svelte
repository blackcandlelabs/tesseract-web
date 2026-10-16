<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import Avatar from "./Avatar.svelte";
    import Message from "./Message.svelte";
    import Button from "./Button.svelte";
    import { statePages, messageActions, roomActions, memberActions } from "../states";
    import "../states.css";

    /** Selects a static state specimen; actions never mutate a real room. */
    let { kind }: { kind: string } = $props();
    const page = statePages.find((item) => item.id === kind)!;
    let feedback = $state("");
    let dismissed = $state(false);
    let sharing = $state(true);
    let duration = $state("1 hour");
    function preview(action: string): void { feedback = `${action} preview only. No changes were made.`; }
</script>

{#snippet menu(items: string[], label: string)}
    <div class="state-menu" aria-label={label}>
        {#each items as item}
            <button class:danger={["Delete", "Leave", "Kick", "Ban"].includes(item)} class:trust={item === "Verify"} onclick={() => preview(item)}>
                <span>{item === "Verify" ? "♢ " : ""}{item}</span><span aria-hidden="true">{["React", "Notifications"].includes(item) ? "›" : ""}</span>
            </button>
        {/each}
    </div>
{/snippet}

{#snippet map(live: boolean)}
    <div class="map-placeholder" role="img" aria-label="Illustrative map placeholder, not a live map">
        <span class="map-street">MARKET STREET</span><span class="map-pin">●</span><small>Map preview</small>
    </div>
    <div class="location-details"><strong>{live ? "Alice’s live location" : "Ferry Building"}</strong><p>{live ? "Updated just now · Sharing for 1 hour" : "1 Ferry Building, San Francisco, CA"}</p>
        {#if live}<span class="countdown">{sharing ? "Expires in 42:18 · Preview" : "Location sharing ended"}</span>
        {:else}<a href="https://www.openstreetmap.org/?mlat=37.7955&mlon=-122.3937#map=17/37.7955/-122.3937" target="_blank" rel="noreferrer">Open in maps ↗</a>{/if}
    </div>
{/snippet}

<svelte:head><title>{page.name} — Tesseract</title></svelte:head>
<div class="states-shell">
    <nav class="states-rooms" aria-label="Rooms">
        <header><strong>Tesseract</strong><a href="/" aria-label="Back to gallery">▦</a></header>
        <p class="overline">WORKSPACE</p><h2>Engineering</h2>
        {#if kind === "empty-states"}
            <div class="empty-list"><span class="empty-icon">◇</span><h3>No rooms yet</h3><p>Create a private room or join with an invitation.</p><a class="primary-link" href="/dialog-create-room">Create room</a><button onclick={() => preview("Join room")}>Join room</button></div>
        {:else}
            <p class="overline">ROOMS</p><a class="selected-room" href="/room-shell"># engineering <span>2</span></a><a class="room-link" href="/room-shell"># design</a><a class="room-link" href="/room-shell"># releases</a>
            {#if kind === "list-menus"}{@render menu(roomActions, "Room actions")}{/if}
            <p class="overline">DIRECT MESSAGES</p><a class="room-link" href="/member-info">Alice Chen</a><a class="room-link" href="/member-info">Bob Wilson</a>
        {/if}
        <div class="account"><Avatar name="You" size={28} color="#2970D1" /><span>You <small>@you:tesseract.local</small></span></div>
    </nav>
    <main class="states-conversation">
        <header class="states-header"><Avatar name="#engineering" size={36} color="#2970D1" /><div><h1>#engineering</h1><p class="trust">♢ End-to-end encrypted · 4 members</p></div><a href="/call-prejoin">Call</a></header>
        <div class="states-timeline">
            {#if kind === "incoming-call"}
                {#if !dismissed}<section class="incoming-panel"><p class="overline">ELEMENT CALL · INCOMING GROUP CALL</p><div class="banner"><Avatar name="Alice Chen" size={48} color="#8B5CF6" /><div><h2>#engineering</h2><p>Alice Chen is calling. Join when you’re ready.</p></div></div><div class="actions"><Button compact variant="secondary" onclick={() => dismissed = true}>Dismiss</Button><a class="primary-link" href="/call-prejoin">Join call</a></div></section>{/if}
                <div class="banner neutral"><span class="event-icon">▣</span><div><strong>Call in progress</strong><p>Alice and Bob are in the call</p></div><a href="/call-prejoin">Join →</a></div>
            {:else if kind === "connection"}
                <div class="connection-specimens">
                    <p class="overline">OFFLINE</p><div class="banner offline"><span>↯</span><div><strong>You’re offline</strong><p>Check your connection. New messages will arrive when you’re back online.</p></div></div>
                    <p class="overline">RECONNECTING / SYNCING</p><div class="banner neutral"><span class="spinner" aria-label="Syncing"></span><div><strong>Reconnecting…</strong><p>Catching up on your messages.</p></div></div>
                    <p class="overline">RESOLVED</p><div class="banner neutral"><span>✓</span><div><strong>Back online</strong><p>Your messages are up to date.</p></div></div>
                </div>
            {:else if kind === "e2ee-warnings"}
                <div class="banner warning"><span>△</span><div><strong>This session is unverified</strong><p>Verify this device to access your encrypted message history.</p></div><a href="/dialog-verify-session">Verify session</a></div>
            {:else if kind === "redacted"}
                <div class="banner neutral"><span>↗</span><div><strong>This room has been replaced</strong><p>Continue the conversation in the upgraded room.</p></div><button onclick={() => preview("Continue to upgraded room")}>Continue →</button></div>
            {:else if kind === "live-location"}
                <div class="banner neutral"><span>⌖</span><div><strong>{sharing ? "You’re sharing your live location" : "Live location sharing stopped"}</strong><p>{sharing ? "Visible to members of this encrypted room" : "Your location is no longer updating"}</p></div>{#if sharing}<button onclick={() => sharing = false}>Stop sharing</button>{/if}</div>
            {/if}

            {#if kind === "empty-room"}
                <section class="empty-conversation"><Avatar name="#engineering" size={64} color="#2970D1" /><h2>This is the start of the conversation</h2><p>A private place for your team to talk.</p><div class="encryption-notice trust">♢ Messages are end-to-end encrypted.<br /><span>Only people in this room can read them.</span></div><p>Bring your teammates into the conversation.</p><a class="primary-link" href="/dialog-invite">Invite people</a></section>
            {:else if kind === "empty-states"}
                <section class="empty-conversation"><p class="overline">SEARCH MESSAGES</p><code>release checklist</code><span class="empty-icon">⌕</span><h2>No results found</h2><p>No messages match <code>release checklist</code>.</p><p>Try a different phrase or check your spelling.</p><a href="/dialog-spotlight">Change search</a></section>
            {:else}
                <div class="date-divider">Today</div>
                <Message sender="Alice" time="2:30 PM" content={kind === "location" || kind === "live-location" ? "Let’s meet by the Ferry Building. I’ll share the location here." : "The release review is ready. Let’s catch up here before we ship."} color="#8B5CF6" />
                {#if kind === "message-menu"}
                    <div class="message-specimen"><div class="quick-actions" aria-label="Message quick actions">{#each ["React", "Reply", "Reply in Thread", "More"] as action}<button onclick={() => preview(action)}>{action}</button>{/each}</div><Message sender="You" time="2:32 PM" content="I’ve added the final checklist. Ready for review." color="#2970D1" />{@render menu(messageActions, "Message actions")}</div>
                {:else if kind === "list-menus"}
                    <Message sender="Bob" time="2:32 PM" content="I’ll check the desktop build while Alice reviews the release notes." color="#2970D1" />
                {:else if kind === "call-events"}
                    <div class="call-events">{#each [["▣", "Alice started a call", "2:31 PM · Element Call"], ["□", "Call ended", "2:49 PM · Duration 18 min 24 sec"], ["↙", "Missed call", "3:05 PM · You didn’t join"], ["↗", "Call declined", "3:12 PM · You declined the invitation"]] as [icon, title, detail]}<div class="call-event"><span class="event-icon">{icon}</span><div><strong>{title}</strong><p>{detail}</p></div></div>{/each}</div>
                {:else if kind === "location" || kind === "live-location"}
                    <div class="location-message"><div class="sender-line"><strong>Alice</strong><time>2:32 PM</time></div><article class="location-card">{@render map(kind === "live-location")}</article></div>
                    {#if kind === "live-location"}<section class="beacon-panel"><h2>Share live location</h2><p>Members of #engineering can see your location until sharing ends.</p><fieldset><legend>Share for</legend>{#each ["15 minutes", "1 hour", "8 hours"] as option}<label><input type="radio" bind:group={duration} value={option} />{option}</label>{/each}</fieldset><div class="actions"><Button compact variant="secondary" onclick={() => sharing = false}>Stop sharing</Button><Button compact onclick={() => preview(`Share for ${duration}`)}>Share location</Button></div><small>Preview only · No location is collected.</small></section>{/if}
                {:else if kind === "e2ee-warnings"}
                    <div class="error-event"><div class="sender-line"><strong>Bob</strong><time>2:34 PM</time></div><div class="call-event"><span class="event-icon">♢</span><div><strong>Unable to decrypt this message</strong><p>Waiting for the encryption key. This can take a moment.</p><p>Keep your other verified device online to help restore access.</p></div></div></div>
                {:else if kind === "redacted"}
                    <div class="redacted-event"><Avatar name="Bob" size={36} color="#2970D1" /><div><div class="sender-line"><strong>Bob</strong><time>2:34 PM</time></div><p>⊘ <i>Message deleted</i></p></div></div>
                {:else}
                    <Message sender="Bob" time="2:32 PM" content="Thanks, Alice. I’m reviewing the checklist now." color="#2970D1" />
                {/if}
            {/if}
        </div>
        {#if feedback}<p class="state-feedback" role="status">{feedback}</p>{/if}
        <form class="states-composer" onsubmit={(event) => { event.preventDefault(); preview("Send message"); }}><input aria-label="Message" placeholder={kind === "redacted" ? "This room is read-only" : "Type a message…"} disabled={kind === "redacted"} /><Button compact disabled={kind === "redacted"}>Send</Button></form>
    </main>
    {#if kind === "list-menus"}<aside class="states-members"><h2>Members · 4</h2><div class="member-anchor"><Avatar name="Alice Chen" size={36} color="#8B5CF6" /><div><strong>Alice Chen</strong><p>@alice:tesseract.local</p></div></div>{@render menu(memberActions, "Member actions")}<div class="member-anchor"><Avatar name="Bob Wilson" size={36} color="#2970D1" /><strong>Bob Wilson</strong></div></aside>{/if}
</div>
