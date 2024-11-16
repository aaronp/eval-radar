<script lang="ts">
    import Load from "$lib/Load.svelte"
    
    import { saveKeyForPage, idFromPath } from "$lib"
	import { page } from '$app/stores'
  
    import { Notification } from 'svelte-ux'
    import { mdiCheckCircleOutline } from '@mdi/js'
    let pageName : string = $derived($page.url.pathname)
	let id = $derived(idFromPath(pageName))

    let loading : boolean = $state(true)

</script>

{#key id}
<Load id={id} />
{/key}