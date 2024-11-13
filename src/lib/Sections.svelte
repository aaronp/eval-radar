<script lang="ts">

    import { TextField } from "svelte-ux"
    let sectionsText : string = ""
</script>

Sections:

<TextField placeholder="Radar Sections" bind:value={sectionsText} />
