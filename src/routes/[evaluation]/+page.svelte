<script lang="ts">
    import Load from "$lib/Load.svelte"
    
    import { idFromPath } from "$lib"
	import { page } from '$app/stores'
  
    let pageName : string = $derived($page.url.pathname)
	let id = $derived(idFromPath(pageName))

</script>

{#key id}
<Load id={id} />
{/key}