<script lang="ts">
    import Points from "$lib/Points.svelte"
    import NodeCard from "$lib/NodeCard.svelte"
    import Labels from "$lib/Labels.svelte"
    import type { RadarProps } from './types.d.ts' 
    import { Button, Dialog, Field, TextField, Toggle } from 'svelte-ux'
    import type { Node, EvalProps } from "$lib/types.d.ts"

    let { nodes, sections, divisions } : EvalProps = $props()


</script>

{#each nodes as node, i }

    <NodeCard currentNode={node}/>
{/each}