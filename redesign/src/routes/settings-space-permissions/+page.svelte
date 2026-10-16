<!--
Copyright 2026 Black Candle Technologies

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
-->
<script lang="ts">
    import SettingsSurface from "#lib/components/SettingsSurface.svelte";
    import { settingsPages } from "#lib/settings";
</script>

<SettingsSurface page={settingsPages.find((page) => page.path === "/settings-space-permissions")!} />
