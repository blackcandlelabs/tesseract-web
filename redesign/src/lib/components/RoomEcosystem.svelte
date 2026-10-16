<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import EcosystemFrame from "./EcosystemFrame.svelte";
    import Avatar from "./Avatar.svelte";
    import Badge from "./Badge.svelte";
    import Button from "./Button.svelte";
    import { findMembers, wave2Pages } from "../wave2";
    import "../wave2.css";

    /** Selects the routed panel fixture; no Matrix operations are performed. */
    let { surface }: { surface: string } = $props();
    const title = $derived(wave2Pages.find((page) => page.path === `/${surface}`)?.name ?? "Room Info");
    let query = $state("");
    let verifiedOnly = $state(true);
    let draft = $state("");
    let replies = $state<string[]>([]);
    let notice = $state("");
    const filteredMembers = $derived(findMembers(query));
</script>

<EcosystemFrame {title}>
    <div class="wave2">
        {#if surface === "room-info"}
            <section class="summary">
                <Avatar name="#engineering" size={64} color="#16A34A" />
                <h2>#engineering</h2>
                <Badge variant="encrypted">⌑ End-to-end encrypted</Badge>
                <p>Build notes, release checks, and the details that keep our team in sync.</p>
                <span class="caption">Invite-only · 4 members</span>
            </section>
            <nav aria-label="Room details" class="rows">
                <a href="/member-list"><span>Members</span><span>4 →</span></a>
                <a href="/threads"><span>Threads</span><span>2 unread →</span></a>
                <a href="/files-pinned"><span>Files & pinned messages</span><span>→</span></a>
                <a href="/room-encryption"><span>Encryption</span><span class="secure">Enabled →</span></a>
            </nav>
            <section><h3>Room details</h3><dl><dt>Created by</dt><dd>Alice</dd><dt>Room version</dt><dd>11</dd><dt>Access</dt><dd>Invitation required</dd></dl></section>
            <button class="action danger" onclick={() => notice = "Leave room is unavailable in this render preview."}>Leave room</button>
        {:else if surface === "member-list"}
            <label class="search">Find a member<input bind:value={query} placeholder="Search name or Matrix ID" /></label>
            <p class="caption">4 members · 3 online</p>
            {#each ["Admin", "Member"] as role}
                <section><h3>{role === "Admin" ? "Admins" : "Members"} · {filteredMembers.filter((member) => member.role === role).length}</h3>
                    {#each filteredMembers.filter((member) => member.role === role) as member}
                        <a class="member" href={member.name === "Alice" ? "/member-info" : undefined}>
                            <Avatar name={member.name} color={member.color} size={40} />
                            <div class="grow"><strong>{member.name}</strong><span class="matrix-id">{member.id}</span><span class="caption"><span class:away={member.presence === "Away"} class="presence"></span>{member.presence}</span></div>
                            {#if member.verified}<span class="secure" aria-label="Verified">✓</span>{/if}
                        </a>
                    {/each}
                </section>
            {/each}
            {#if filteredMembers.length === 0}<p>No members found.</p>{/if}
        {:else if surface === "member-info"}
            <section class="summary">
                <Avatar name="Alice" size={80} color="#8B5CF6" />
                <h2>Alice</h2><span class="matrix-id">@alice:tesseract.internal</span>
                <span class="caption"><span class="presence"></span>Online</span>
                <Badge variant="verified">✓ Verified</Badge>
            </section>
            <section><h3>In this room</h3><dl><dt>Role</dt><dd>Admin</dd><dt>Room</dt><dd>#engineering</dd></dl></section>
            <section class="callout"><h3 class="secure">You have verified Alice</h3><p>Your devices have confirmed each other’s identity.</p></section>
            <div class="rows">
                <button onclick={() => notice = "Direct messages are unavailable in this render preview."}>Message Alice <span>→</span></button>
                <button onclick={() => notice = "Alice has two verified sessions: Desktop and Mobile."}>View devices <span>2 verified →</span></button>
                <button onclick={() => notice = "Member notifications muted for this preview."}>Mute notifications <span>→</span></button>
            </div>
        {:else if surface === "threads"}
            <p class="caption">Threads in #engineering</p>
            {#each [{ name: "Alice", time: "2:30 PM", text: "Key rotation fix is ready for verification.", reply: "Bob: Confirmed on desktop and mobile.", count: "3 replies", unread: "2 unread" }, { name: "Charlie", time: "11:15 AM", text: "Release checklist for the next deploy.", reply: "You: Backup recovery check is complete.", count: "2 replies", unread: "" }] as thread}
                <a class="thread-card" href="/thread-view">
                    <div class="inline"><Avatar name={thread.name} size={32} /><strong>{thread.name}</strong><time>{thread.time}</time></div>
                    <p>{thread.text}</p><p class="caption">{thread.reply}</p>
                    <div class="inline"><span class="secure">◉</span><span class="caption">Alice, Bob, you · {thread.count}</span></div>
                    {#if thread.unread}<span class="unread">{thread.unread}</span>{/if}
                </a>
            {/each}
        {:else if surface === "thread-view"}
            <a class="back" href="/threads">← All threads</a>
            <article class="thread-root"><div class="inline"><Avatar name="Alice" color="#8B5CF6" size={32} /><strong>Alice</strong><time>2:30 PM</time></div><p>Key rotation fix is ready for verification. Can you check desktop and mobile before we deploy?</p></article>
            <h3 class="reply-count">{3 + replies.length} replies</h3>
            {#each [{ name: "Bob", time: "2:35 PM", text: "Confirmed on desktop and mobile. New messages decrypt correctly." }, { name: "Charlie", time: "2:40 PM", text: "Recovery key check passed on my test device too." }, { name: "Alice", time: "2:45 PM", text: "Thanks both. Ready for review." }] as reply}
                <article class="reply"><div class="inline"><Avatar name={reply.name} size={28} /><strong>{reply.name}</strong><time>{reply.time}</time></div><p>{reply.text}</p></article>
            {/each}
            {#each replies as reply}<article class="reply"><strong>You</strong><p>{reply}</p></article>{/each}
            <form class="thread-composer" onsubmit={(event) => { event.preventDefault(); if (draft.trim()) { replies = [...replies, draft.trim()]; draft = ""; } }}>
                <label for="thread-draft">Reply in thread</label><textarea id="thread-draft" bind:value={draft} placeholder="Write a reply…"></textarea>
                <div class="inline"><span class="caption">⌑ Encrypted</span><Button type="submit">Send</Button></div>
            </form>
        {:else if surface === "files-pinned"}
            <section><h3>Files · 3</h3>
                {#each [{ name: "release-checklist.md", detail: "Alice · 4 KB · Today" }, { name: "key-rotation-notes.pdf", detail: "Bob · 128 KB · Today" }, { name: "desktop-verification.png", detail: "Charlie · 842 KB · Yesterday" }] as file}
                    <button class="file-row" onclick={() => notice = `${file.name} is a design fixture; no file is downloaded.`}><span class="file-icon">↧</span><span><strong>{file.name}</strong><span class="caption">{file.detail}</span></span></button>
                {/each}
            </section>
            <section><h3>Pinned messages · 2</h3>
                <article class="thread-card"><span class="caption">⌖ Pinned by Alice</span><div class="inline"><strong>Alice</strong><time>Today, 9:10 AM</time></div><p>Release checks: verify devices, test key recovery, then confirm in the deploy thread.</p><a class="back" href="/thread-view">View thread →</a></article>
                <article class="thread-card"><span class="caption">⌖ Pinned by Alice</span><strong>Bob</strong><p>Never share your recovery key in chat. Keep it in your password manager.</p></article>
            </section>
        {:else if surface === "room-encryption"}
            <section class="summary"><span class="encryption-mark">⌑</span><h2>End-to-end encrypted</h2><p>Only people in this conversation can read its messages. Encryption cannot be turned off.</p></section>
            <section><h3>Encryption details</h3><dl><dt>Algorithm</dt><dd class="matrix-id">m.megolm.v1.aes-sha2</dd><dt>Room encryption</dt><dd class="secure">Enabled</dd></dl></section>
            <section class="callout"><h3>Key backup</h3><strong class="secure">✓ Up to date</strong><p>Your message keys are backed up with encryption. Your recovery key is required to restore them.</p></section>
            <section><div class="inline"><label class="grow" for="verified-only"><strong>Only send to verified devices</strong></label><input id="verified-only" type="checkbox" role="switch" bind:checked={verifiedOnly} /></div><p class="caption">Unverified devices will not receive new message keys when this is enabled.</p><p class="caption">{verifiedOnly ? "Enabled on this device" : "Disabled on this device"} · Preview only</p></section>
            <a class="action" href="/member-list">Review member verification →</a>
        {/if}
        {#if notice}<p class="callout" role="status">{notice}</p>{/if}
    </div>
</EcosystemFrame>
