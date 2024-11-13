<script lang="ts">
import { TextField, RangeField } from "svelte-ux"
import Radar from "$lib/Radar.svelte"
import Sections from "$lib/Sections.svelte"
import Arcs from "$lib/Arcs.svelte"


  // Bound textarea input value
  let sectionText = $state('alpha, beta, gamma')
  // Reactive statement to update sections array when sectionText changes
  let sections = $derived(sectionText.split(',').map(s => s.trim()))

  let divisionText = $state('adopt, trial, assess, hold')
  let divisions = $derived(divisionText.split(','))

  let labelScale : number= $state(1.1)
  let radius : number= $state(300)
  
//   const radius = 500
</script>


<TextField label="Sections" placeholder="Comma-Separated Radar Sections" bind:value={sectionText} />
<TextField label="Divisions" placeholder="Comma-Separated Divisions" bind:value={divisionText} />
Labels:
<RangeField bind:value={labelScale} min={0.1} max={3} step={0.05} format="decimal" />
Radius:
<RangeField bind:value={radius} min={50} max={1000} step={50}  />
{labelScale}

<Radar radius={radius} sections={sections} divisions={divisions} scaleMultiplier={labelScale} />
