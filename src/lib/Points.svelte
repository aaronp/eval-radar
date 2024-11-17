<script lang="ts">
    import { onMount } from 'svelte'

    import type { Node } from './types.d.ts' 

    type Props = {
        nodes: Node[]
        onNodeSelected : (node : Node) => void
        onNodeUpdated : (node : Node) => void
    }

    let { nodes, onNodeSelected, onNodeUpdated } : Props = $props()
    // Define an array of nodes with their initial positions
    // let nodeArray : Array<Node> = $state(nodes)

    let isDragging = false
    let currentNode : Node | null = $state(null)

    // Function to handle mouse down on a node
    function handleMouseDown(event : MouseEvent, node : Node) {
        isDragging = true
        currentNode = node

        // originalX = node.x
        // originalY = node.y
        mouseOffsetX = event.clientX
        mouseOffsetY = event.clientY

        // take a snapshot
        nodeBeforeDrag = { ...node }

        onNodeSelected(node)

        event.preventDefault() // Prevent text selection
    }

    
    // a snapshot (copy) of the node before the user drags it
    let nodeBeforeDrag : Node | null = null

    // a snapshot of the mouse coords before they move
    let mouseOffsetX = 0
    let mouseOffsetY = 0

    // Function to handle mouse move for dragging nodes
    function handleMouseMove(event : MouseEvent) {
        if (isDragging && currentNode) {
            const offsetX = event.clientX - mouseOffsetX
            const offsetY = event.clientY - mouseOffsetY

            currentNode.x = nodeBeforeDrag!.x + offsetX
            currentNode.y = nodeBeforeDrag!.y + offsetY
        }
    }

    // Function to handle mouse up to stop dragging
    function handleMouseUp() {
        if (isDragging && currentNode) {
            onNodeUpdated(currentNode)
        }
        isDragging = false
        currentNode = null
    }

    // Attach event listeners to the window for mousemove and mouseup
    onMount(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        };
    });

</script>

<style>
    circle {
        cursor: pointer;
        stroke-width: 2;
    }

  .label {
    cursor: pointer;
    font-weight: bold;
  }
</style>


{#each nodes as node (node.id)}
{#key node.id}
    <circle
        cx={node.x}
        cy={node.y}
        role="button"
        tabindex={node.id * 2}
        onmousedown={(event) => handleMouseDown(event, node)}
        fill={node.color}
        stroke={node.color}
        r={node.radius}
        aria-label={node.title}
        data-contents={node.contents}
        data-title={node.title}
    ><title>{node.title}</title></circle>
    <!-- the text ID within the circle-->
    <text x={node.x} 
          y={node.y} 
          class="label" 
          text-anchor="middle" 
          dominant-baseline="central" 
          tabindex={node.id * 2 + 1} 
          role="button" 
          fill="white"
          font-size={1.4 * node.radius}
          onmousedown={(event) => handleMouseDown(event, node)} 
          aria-label={node.title}>{node.id + 1}
        <title>{node.title}</title>
    </text>
{/key}
{/each}
