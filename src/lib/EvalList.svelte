<script lang="ts">
    import NodeCard from "$lib/NodeCard.svelte"
    import type { Node, EvalProps } from "$lib/types.d.ts"

    import { sectionForPosition } from '$lib'

    
    let { nodes, sections, divisions, centerX, centerY, onDelete, onUpdate } : EvalProps = $props()
    
    const sectionNameForNode = (node : Node)  => sectionForPosition(centerX, centerY, node.x, node.y, sections)



</script>

{#each sections as sectionName }
<h1 class="text-2xl font-bold">{sectionName}</h1>
{#each nodes as node }
{#if (sectionName == sectionNameForNode(node))}
    <div class="m-2">
        <NodeCard 
            centerX={centerX}
            centerY={centerY}
            sections={sections} 
            divisions={divisions} 
            node={node} 
            onDelete={onDelete} 
            onUpdate={onUpdate}
        />
    </div>
{/if}

{/each}

{/each}
