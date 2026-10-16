<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import { untrack } from "svelte";
    import Button from "./Button.svelte";
    import Avatar from "./Avatar.svelte";
    import Input from "./Input.svelte";
    import SettingsToggle from "./SettingsToggle.svelte";
    import { settingsNavigation, type SettingsPage } from "../settings";
    import "../settings.css";

    /** The selected static design fixture. Edits stay local to this preview; no Matrix APIs are called. */
    let { page }: { page: SettingsPage } = $props();
    // Each route mounts its own surface; capture its fixture once for cancellable local edits.
    let blocks = $state(untrack(() => structuredClone(page.blocks)));
    let level = $state("Mentions only");
    let notice = $state("");

    function reset(): void {
        blocks = structuredClone(page.blocks);
        notice = "Preview changes discarded.";
    }

    async function action(label: string): Promise<void> {
        if (label === "Cancel") return reset();
        if (label === "Copy ID") {
            try {
                await navigator.clipboard.writeText("@alice:blackcandle.tech");
                notice = "Matrix ID copied.";
            } catch {
                notice = "Could not copy. Matrix ID: @alice:blackcandle.tech";
            }
            return;
        }
        notice = label === "Save changes"
            ? "Preview updated locally. No account, room or space settings were changed."
            : `${label} is unavailable in this design preview. No live account is connected.`;
    }
</script>

<svelte:head><title>{page.name} — Tesseract</title></svelte:head>

<div class="settings-surface">
    <header class="settings-topbar">
        <a class="settings-brand" href="/">Tesseract</a>
        <strong>{page.scope} Settings</strong>
        <a class="settings-close" href="/" aria-label="Close settings">Close ×</a>
    </header>
    <div class="settings-body">
        <nav class="settings-tabs" aria-label={`${page.scope} settings`}>
            <p>{page.scope === "User" ? "YOUR ACCOUNT" : page.scope === "Room" ? "ENGINEERING" : "BLACK CANDLE"}</p>
            {#each settingsNavigation(page.scope) as tab}
                {#if tab.path}
                    <a href={tab.path} aria-current={tab.path === page.path ? "page" : undefined}>{tab.label}</a>
                {:else}
                    <button type="button" aria-disabled="true" title="Not included in this design preview"
                        onclick={() => { notice = `${tab.label} is not included in this design preview.`; }}>{tab.label}</button>
                {/if}
            {/each}
        </nav>
        <main class="settings-pane">
            <div class="settings-heading"><h1>{page.title}</h1><p>{page.description}</p></div>
            {#each blocks as block, index}
                {#if block.kind === "identity"}
                    <div class="settings-identity">
                        <Avatar size={72} color="var(--color-bg-light-2)" name={block.name} initials={block.initials} square />
                        <div><h2>{block.name}</h2><p class:mono={block.mono}>{block.detail}</p></div>
                        <Button compact variant="secondary" onclick={() => action("Change avatar")}>Change avatar</Button>
                    </div>
                {:else if block.kind === "field"}
                    <div class="settings-field" class:multiline={block.multiline}>
                        <label for={`settings-field-${index}`}>{block.label}</label>
                        {#if block.multiline}
                            <textarea id={`settings-field-${index}`} bind:value={block.value}></textarea>
                        {:else}
                            <Input settings id={`settings-field-${index}`} bind:value={block.value} />
                        {/if}
                    </div>
                {:else if block.kind === "section"}
                    <section class="settings-section" aria-labelledby={`settings-section-${index}`}>
                        <h2 id={`settings-section-${index}`}>{block.title}</h2>
                        <div class="settings-rows">
                            {#each block.rows as row}
                                <div class="settings-row">
                                    <div class="settings-label"><h3>{row.label}</h3><p class:mono={row.mono}>{row.help}</p></div>
                                    <div class="settings-value" class:trust={row.trust}>
                                        {#if row.toggle !== undefined}
                                            <SettingsToggle label={row.label} bind:checked={row.toggle}
                                                onchange={() => { notice = "Preview only. Notification and call preferences are not saved to an account."; }} />
                                        {:else if row.action}
                                            <Button compact variant="secondary" onclick={() => action(row.action!)}>{row.action}</Button>
                                        {:else if row.select}
                                            <button class="settings-select" type="button" aria-label={row.label}
                                                onclick={() => { notice = `${row.label}: ${row.value}. Other options require a live account or device connection.`; }}>
                                                {row.value} <span aria-hidden="true">▾</span>
                                            </button>
                                        {:else}{row.value}{/if}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </section>
                {:else if block.kind === "level"}
                    <section class="settings-section" aria-label="Default notification level">
                        <h2>Default notification level</h2>
                        <div class="settings-level" role="group" aria-label="Default notification level">
                            {#each ["All messages", "Mentions only", "Mute"] as option}
                                <Button compact variant={level === option ? "primary" : "secondary"} aria-pressed={level === option}
                                    onclick={() => { level = option; notice = "Preview only. Notification preferences are not saved to an account."; }}>{option}</Button>
                            {/each}
                        </div>
                    </section>
                {:else if block.kind === "note"}
                    <p class="settings-note">{block.text}</p>
                {:else if block.kind === "actions"}
                    <div class="settings-actions">
                        {#each block.labels as label, i}
                            <Button compact variant={block.primary && i === 0 ? "primary" : "secondary"}
                                onclick={() => action(label)}>{label}</Button>
                        {/each}
                    </div>
                {/if}
            {/each}
            {#if notice}<p class="settings-notice" role="status">{notice}</p>{/if}
        </main>
    </div>
</div>
