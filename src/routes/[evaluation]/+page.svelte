<script lang="ts">
    import Control from "$lib/Control.svelte"
    
    import { saveKeyForPage, idFromPath } from "$lib";
    import type { Node } from "$lib/types.d.ts"
	import { page } from '$app/stores'
  
    import { onMount } from 'svelte'
    let pageName : string = $derived($page.url.pathname)
	let id = $derived(idFromPath(pageName))

    let nodes : Node[] = $state([])
    onMount(() => {
        if (typeof localStorage !== 'undefined') {
            nodes = JSON.parse(localStorage.getItem(saveKeyForPage(id)) || '[]')
        }
    })
</script>

<Control initialNodes={nodes} />