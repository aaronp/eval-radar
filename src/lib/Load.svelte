<script lang="ts">
    import Control from "$lib/Control.svelte"
    
    import { saveKeyForPage } from "$lib";
    import type { Node } from "$lib/types.d.ts"
  
    import { onMount } from 'svelte'

    type Props = {
        id : string
    }
    let { id } : Props = $props()

    let nodes : Node[] = $state([])
    let loading : boolean = $state(true)
    let message : string = $state("init")

    onMount(() => {
        message = "loading " + new Date()
        const key = saveKeyForPage(id)
        message = 'loading ' + key

        try {
            const saved = localStorage.getItem(key)
            nodes = JSON.parse(saved || '[]')
            message = 'loaded ' + nodes.length + ' nodes at' + new Date()
        } catch (e) {
            message = 'bang: ' + e
        }

        loading = false
    })

</script>

{#key nodes}
    <Control initialNodes={nodes} />
{/key}