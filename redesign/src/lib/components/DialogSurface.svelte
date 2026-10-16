<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import { onMount } from "svelte";
    import RoomShell from "../../routes/room-shell/+page.svelte";
    import Button from "./Button.svelte";
    import Avatar from "./Avatar.svelte";
    import { dialogPages, sasEmoji, invitePeople, roomId, roomLink } from "../dialogs";
    import "../dialogs.css";

    /** The route selects a standalone dialog preview, never a live server action. */
    let { kind }: { kind: string } = $props();
    const page = dialogPages.find((page) => page.id === kind)!;
    let modal: HTMLDialogElement;
    let name = $state("");
    let query = $state("");
    let selected = $state([invitePeople[0].id]);
    let filter = $state("Messages");
    let saved = $state(false);
    let reason = $state("Harassment or abuse");
    let feedback = $state("");
    let viewing = $state(false);
    let showQr = $state(false);
    const message = "Just pushed the encryption update. Ready for review.";
    const searchTerm = $derived(query.trim() || "encryption");
    const matchIndex = $derived(message.toLowerCase().indexOf(searchTerm.toLowerCase()));
    const recoveryKey = "DEMO ONLY · NOT A RECOVERY KEY";
    const results = $derived(invitePeople.filter((person) => `${person.name} ${person.id}`.toLowerCase().includes(query.toLowerCase())));
    onMount(() => modal.showModal());
    function close(): void { window.location.assign("/room-shell"); }
    function preview(action: string): void { feedback = `${action} preview only. No changes were made.`; }
    async function copy(value: string): Promise<void> {
        try { await navigator.clipboard.writeText(value); feedback = "Copied to clipboard."; }
        catch { feedback = "Could not copy. Select and copy the text manually."; }
    }
    function toggle(id: string): void {
        selected = selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id];
    }
</script>

<svelte:head><title>{page.name} — Tesseract</title></svelte:head>
<div class="dialog-host" inert><RoomShell /></div>
<div class="dialog-dimmer" aria-hidden="true"></div>
<dialog bind:this={modal} class="wave4-dialog" class:wide={kind === "spotlight" || kind === "media"} aria-labelledby="dialog-title" oncancel={close}>
    <header class="dialog-heading">
        <div><p class="eyebrow">TESSERACT · {kind === "verify-session" || kind === "secure-backup" ? "SECURITY" : "ENGINEERING"}</p><h1 id="dialog-title">{page.name}</h1></div>
        <button class="close" onclick={close} aria-label="Close dialog">×</button>
    </header>
    <div class="dialog-body">
        {#if kind === "create-room" || kind === "create-space"}
            <p class="muted">{kind === "create-room" ? "A private place for your team to talk." : "Bring your team’s rooms together in one place."}</p>
            {#if kind === "create-space"}<div class="avatar-placeholder" aria-label="Space avatar placeholder">＋</div><p class="small muted">Space avatar · Add after creating your space</p>{/if}
            <label class="field">Name<input bind:value={name} placeholder={kind === "create-room" ? "e.g. Release planning" : "e.g. Engineering"} /></label>
            <label class="field">Topic <span class="optional">Optional</span><textarea rows="2" placeholder={kind === "create-room" ? "What is this room for?" : "What is this space for?"}></textarea></label>
            <div class="info-row"><span class="row-icon">♙</span><div><strong>Invite-only</strong><p class="muted small">Only people you invite on this server can join.</p></div></div>
            {#if kind === "create-room"}<div class="trust info-row"><span>▣</span><div><strong>End-to-end encryption is on</strong><p class="small">Only room members can read messages. Encryption cannot be turned off.</p></div></div>{/if}
            <footer><Button compact variant="secondary" onclick={close}>Cancel</Button><Button compact disabled={!name.trim()} onclick={() => preview("Create")}>Create {kind === "create-room" ? "room" : "space"}</Button></footer>
        {:else if kind === "invite"}
            <p class="muted">Invite people on this server to <strong>#engineering</strong>.</p>
            <label class="field">Search people<input bind:value={query} placeholder="Name or Matrix ID" /></label>
            <div class="chips" aria-label="Selected people">{#each invitePeople.filter((person) => selected.includes(person.id)) as person}<button class="chip selected" onclick={() => toggle(person.id)} aria-label={`Remove ${person.name}`}>{person.name} ×</button>{/each}</div>
            <div class="people-list">{#each results as person}<label class="person"><Avatar name={person.name} size={36} /><span><strong>{person.name}</strong><code>{person.id}</code></span><input type="checkbox" checked={selected.includes(person.id)} onchange={() => toggle(person.id)} /></label>{/each}{#if !results.length}<p class="muted">No people found on this server.</p>{/if}</div>
            <div class="copy-row"><div><strong>Internal invite link</strong><code>{roomLink}</code></div><Button compact variant="secondary" onclick={() => copy(roomLink)}>Copy</Button></div>
            <p class="small muted">An invitation is still required to join this room.</p>
            <footer><Button compact variant="secondary" onclick={close}>Cancel</Button><Button compact disabled={!selected.length} onclick={() => preview("Invite")}>Invite {selected.length} {selected.length === 1 ? "person" : "people"}</Button></footer>
        {:else if kind === "spotlight"}
            <label class="field">Search your conversations<input bind:value={query} placeholder="Search messages, people and rooms" /></label>
            <div class="chips">{#each ["Messages", "People", "Rooms"] as item}<button class="chip" class:selected={filter === item} aria-pressed={filter === item} onclick={() => filter = item}>{item}</button>{/each}</div>
            <h2>Recent searches</h2><div class="chips">{#each ["encryption", "release planning"] as recent}<button class="chip" onclick={() => query = recent}>↶ {recent}</button>{/each}</div>
            <h2>{filter} · {query || "encryption"}</h2>
            {#if filter === "Messages"}
                {#if matchIndex >= 0}<button class="search-result" onclick={() => preview("Open result")}><span class="small muted">#engineering · Alice · 2:30 PM</span><p>{message.slice(0, matchIndex)}<mark>{message.slice(matchIndex, matchIndex + searchTerm.length)}</mark>{message.slice(matchIndex + searchTerm.length)}</p></button>
                {:else}<p class="muted">No matching messages.</p>{/if}
            {:else if filter === "People"}{#each results as person}<div class="person"><Avatar name={person.name} size={36} /><span><strong>{person.name}</strong><code>{person.id}</code></span></div>{/each}
            {:else}<a class="search-result" href="/room-shell"><strong>#engineering</strong><p class="muted small">Invite-only · 4 members</p></a>{/if}
            <p class="small muted">Search only the conversations you have access to.</p>
        {:else if kind === "verify-session"}
            <div class="trust info-row"><span>▣</span><div><strong>Compare with your other session</strong><p class="small">Keep both devices with you during verification.</p></div></div>
            <div class="info-row"><Avatar name="Desktop" size={40} /><div><strong>Tesseract Desktop</strong><p class="small muted">New session · Awaiting verification</p></div></div>
            <p>Check that all 7 emoji appear in the <strong>same order</strong> on both devices. If any differ, choose “They don’t match”.</p>
            <div class="emoji-set">{#each sasEmoji as [emoji, label]}<div><span role="img" aria-label={label}>{emoji}</span><p>{label}</p></div>{/each}</div>
            <p class="small muted">Illustrative comparison only. This preview does not verify a session.</p>
            <footer><Button compact variant="secondary" onclick={() => feedback = "Comparison rejected. Session remains unverified."}>They don’t match</Button><Button compact onclick={() => feedback = "Preview only. Session remains unverified; no cryptographic verification occurred."}>They match</Button></footer>
        {:else if kind === "secure-backup"}
            <p>Save a recovery key to restore your encrypted message history if you lose access to your devices.</p>
            <div class="trust info-row"><span>▣</span><div><strong>End-to-end encrypted backup</strong><p class="small">Your recovery key protects access to your backed-up room keys.</p></div></div>
            <div class="field">Recovery key · preview<code class="key-block">{recoveryKey}</code></div>
            <Button compact variant="secondary" onclick={() => copy(recoveryKey)}>Copy example key</Button>
            <p class="small muted">In the app, store your key in a password manager or another safe place. Never send it in a message. This example cannot recover messages.</p>
            <label class="check-row"><input type="checkbox" bind:checked={saved} />I have saved my recovery key somewhere safe</label>
            <footer><Button compact variant="secondary" onclick={close}>Cancel</Button><Button compact disabled={!saved} onclick={() => preview("Backup setup")}>Continue</Button></footer>
        {:else if kind === "leave-room"}
            <div class="info-row"><Avatar name="#engineering" size={44} /><div><strong>#engineering</strong><p class="small muted">Invite-only · 4 members</p></div></div>
            <p>Are you sure you want to leave <strong>#engineering</strong>?</p><div class="warning">You will stop receiving messages. You’ll need a new invitation to rejoin this room.</div>
            <footer><Button compact variant="secondary" onclick={close}>Cancel</Button><button class="danger" onclick={() => preview("Leave room")}>Leave room</button></footer>
        {:else if kind === "moderation"}
            <div class="person"><Avatar name="Charlie Davis" size={44} /><span><strong>Charlie Davis</strong><code>@charlie:tesseract.local</code></span></div>
            <label class="field">Reason <span class="optional">Optional</span><textarea rows="3" placeholder="Explain this moderation decision"></textarea></label>
            <div class="info-row"><div><strong>Kick from #engineering</strong><p class="small muted">Remove this member. They can be invited back.</p></div><Button compact variant="secondary" onclick={() => preview("Kick")}>Kick</Button></div>
            <div class="info-row"><div><strong>Ban from #engineering</strong><p class="small muted">Prevent rejoining until a room admin removes the ban.</p></div><button class="danger subtle" onclick={() => preview("Ban")}>Ban</button></div>
            <footer><Button compact variant="secondary" onclick={close}>Cancel</Button></footer>
        {:else if kind === "report"}
            <p>Help your room admins understand what happened.</p><fieldset><legend>Why are you reporting this content?</legend>{#each ["Harassment or abuse", "Spam", "Harmful or illegal content", "Sharing private information", "Something else"] as item}<label class="check-row"><input type="radio" bind:group={reason} value={item} />{item}</label>{/each}</fieldset>
            <label class="field">Additional details <span class="optional">Optional</span><textarea rows="3" placeholder="Add context for the room admins"></textarea></label>
            <p class="small muted">Your report goes to the room admins for review.</p><footer><Button compact variant="secondary" onclick={close}>Cancel</Button><Button compact onclick={() => preview("Report")}>Submit report</Button></footer>
        {:else if kind === "share"}
            <div class="info-row"><Avatar name="#engineering" size={44} /><div><strong>#engineering</strong><p class="small muted">Invite-only room</p></div></div>
            <div class="copy-row"><div><strong>Internal room link</strong><code>{roomLink}</code></div><Button compact variant="secondary" onclick={() => copy(roomLink)}>Copy link</Button></div>
            <div class="copy-row"><div><strong>Matrix room ID</strong><code>{roomId}</code></div><Button compact variant="secondary" onclick={() => copy(roomId)}>Copy ID</Button></div>
            <Button compact variant="secondary" aria-expanded={showQr} onclick={() => showQr = !showQr}>▦ {showQr ? "Hide" : "Show"} QR code</Button>
            {#if showQr}<img class="room-qr" src="/dialogs/room-qr.svg" alt="QR code for the internal engineering room link" width="144" height="144" />{/if}
            <p class="small muted">For people on this server. Sharing a link does not grant access; people still need an invitation.</p>
        {:else if kind === "media"}
            <div class="chips"><button class="chip" class:selected={!viewing} aria-pressed={!viewing} onclick={() => viewing = false}>Upload confirmation</button><button class="chip" class:selected={viewing} aria-pressed={viewing} onclick={() => viewing = true}>View image</button></div>
            <div class="media-image"><img src="/dialogs/release-plan.svg" alt="Release plan diagram: review, verify, deploy" /></div>
            {#if viewing}<div class="info-row"><Avatar name="Alice" size={36} /><div><strong>Alice</strong><p class="small muted">Today · 2:45 PM</p></div><a class="download" href="/dialogs/release-plan.svg" download="release-plan.svg">Download</a></div><footer><Button compact variant="secondary" onclick={close}>Close</Button></footer>
            {:else}<div class="info-row"><span class="row-icon">▧</span><div><strong>release-plan.svg</strong><p class="small muted">1.1 KB · Image</p></div></div><label class="field">Caption <span class="optional">Optional</span><textarea rows="2" placeholder="Add a message about this file"></textarea></label><footer><Button compact variant="secondary" onclick={close}>Cancel</Button><Button compact onclick={() => preview("Send file")}>Send</Button></footer>{/if}
        {/if}
        {#if feedback}<p class="feedback" role="status">{feedback}</p>{/if}
    </div>
</dialog>
