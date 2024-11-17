<script lang="ts">
    import Control from "$lib/Control.svelte"
    
    import { saveKeyForPage, saveSettingsKeyForPage } from "$lib";
    import type { Node, Settings } from "$lib/types.d.ts"
  
    import { onMount } from 'svelte'

    type Props = {
        id : string
    }
    let { id } : Props = $props()

    let nodes : Node[] = $state([])

    const defaultSettings = () : Settings => {
        return {
            radius : 300,
            defaultRadius : 20,
            defaultColor : "blue",
            labelOffset : 20,
            labelGap : 20,
            sections : ['alpha', 'beta', 'gamma'],
            divisions : ['hold', 'assess', 'trial', 'adopt'],
            labelRadiuses : [],
            sectionRadiuses : []
        }
    }
    
    let settings : Settings = $state(defaultSettings())

    onMount(() => {
        const saved = localStorage.getItem(saveKeyForPage(id)) || '[]'
        nodes = JSON.parse(saved)

        const settingsJson = localStorage.getItem(saveSettingsKeyForPage(id))
        settings = settingsJson ? JSON.parse(settingsJson) : defaultSettings()
    })

</script>

{#key nodes}
    <Control initialNodes={nodes} initialSettings={settings}/>
{/key}