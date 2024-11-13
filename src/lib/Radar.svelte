<script lang="ts">
    import { onMount } from 'svelte'

    type Node = {
        id : number,
        x : number,
        y : number,
        radius : number,
        color : string
    }
    // Define an array of nodes with their initial positions
    let nodes : Array<Node> = $state([
        { id: 1, x: 100, y: 100, radius : 10, color : "blue" },
        { id: 2, x: 200, y: 150, radius : 20, color : "blue" },
        { id: 3, x: 150, y: 200, radius : 10, color : "red" }
    ])

    let isDragging = false
    let currentNode : Node | null = $state(null)

    // Function to handle mouse down on a node
    function handleMouseDown(event, node : Node) {
        isDragging = true
        currentNode = node

        // originalX = node.x
        // originalY = node.y
        mouseOffsetX = event.clientX
        mouseOffsetY = event.clientY

        // take a snapshot
        nodeBeforeDrag = { ...node }

        event.preventDefault() // Prevent text selection
    }

    
    // a snapshot (copy) of the node before the user drags it
    let nodeBeforeDrag : Node | null = null

    // a snapshot of the mouse coords before they move
    let mouseOffsetX = 0
    let mouseOffsetY = 0

    // Function to handle mouse move for dragging nodes
    function handleMouseMove(event) {
        if (isDragging && currentNode) {
            const offsetX = event.clientX - mouseOffsetX
            const offsetY = event.clientY - mouseOffsetY

            currentNode.x = nodeBeforeDrag!.x + offsetX
            currentNode.y = nodeBeforeDrag!.y + offsetY
        }
    }

    // Function to handle mouse up to stop dragging
    function handleMouseUp() {
        isDragging = false;
        currentNode = null;
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

    let svgRef: SVGSVGElement;

    // Function to download the SVG content as a file
    function downloadSVG() {
        if (!svgRef) return;

        // Serialize the SVG content
        const serializer = new XMLSerializer();
        const svgContent = serializer.serializeToString(svgRef);

        // Create a Blob from the SVG content
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        // Create a temporary link to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'radar.svg';
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
</script>

<style>
    svg {
        border: 1px solid #ccc;
        width: 100%;
        height: 400px;
    }
    circle {
        cursor: pointer;
        stroke-width: 2;
    }
</style>

<div>
<svg bind:this={svgRef}>
    {#each nodes as node (node.id)}
    {#key node.id}
        <circle
            cx={node.x}
            cy={node.y}
            role="button"
            tabindex={node.id}
            onmousedown={(event) => handleMouseDown(event, node)}
            fill={node.color}
            stroke={node.color}
            r={node.radius}
        />
    {/key}
    {/each}
</svg>


    <!-- Download Button -->
    <button onclick={downloadSVG}>Download SVG</button>
</div>