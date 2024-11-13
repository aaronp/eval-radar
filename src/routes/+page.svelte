<script lang="ts">
import { TextField } from "svelte-ux"
import Radar from "$lib/Radar.svelte"
import Sections from "$lib/Sections.svelte"
import Arcs from "$lib/Arcs.svelte"


  // Bound textarea input value
  let sectionText = $state('alpha, beta, gamma')
  // Reactive statement to update sections array when sectionText changes
  let sections = $derived(sectionText.split(',').map(s => s.trim()))

  let divisionText = $state('hold, assess, trial, adopt')
  let divisions = $derived(divisionText.split(',').map(s => s.trim()))

    const radius = 500
</script>


<TextField label="Sections" placeholder="Comma-Separated Radar Sections" bind:value={sectionText} />
<TextField label="Divisions" placeholder="Comma-Separated Divisions" bind:value={divisionText} />

<Radar radius={radius} sections={sections} divisions={divisions} />
<!--
<Arcs radius={radius} sections={sections} divisions={divisions} />

-->