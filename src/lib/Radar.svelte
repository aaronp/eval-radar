<script lang="ts">
    import Points from "$lib/Points.svelte"
    import Arcs from "$lib/Arcs.svelte"
    import Labels from "$lib/Labels.svelte"
    import type { Node, RadarProps } from './types.d.ts' 
    import { Button } from 'svelte-ux'

    let { nodes, radius, sections, divisions, scaleMultiplier = 1, defaultColor, defaultRadius, onNodeSelected, onUpdateNodes} : RadarProps = $props()
    let width = $derived(radius * 2 * 1.2)
  
    let height = $derived(width)

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

    function onAddNewNode(event: MouseEvent) {
        const { offsetX, offsetY } = event
        nodes.push({ id: nodes.length, x: offsetX, y: offsetY, radius : defaultRadius, color : defaultColor, title : `Node ${nodes.length}`, contents : 'lorem ipsum...' })
        event.preventDefault() // Prevent text selection
        onUpdateNodes(nodes)
    }
</script>

<style>
    svg {
        border: 1px solid #ccc;
    }
</style>

<div>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<svg bind:this={svgRef} width={width} height={height} viewBox="0 0 {width} {height}"  ondblclick={onAddNewNode} role="img">

    <Arcs radius={radius} sections={sections} divisions={divisions} fontSize={30} labelOffset={30}/>

    <!-- the 32 x 32 transform is a weird font-alignment hack to center the labels -->
    <g transform="translate(36, 32)" >
        <Labels 
        scaleMultiplier={scaleMultiplier} 
        radius={radius} 
        centerX={width / 2} 
        centerY={height / 2} 
        labels={divisions} 
        numberSections={sections.length} 
        fontSize={20} />
    </g>

    <Points nodes={nodes} onNodeSelected={onNodeSelected}/>
</svg>

<!-- TODO - download the html, copy the SVG to clipboard, etc -->
    <Button class="my-8" variant="fill" color="primary" rounded onclick={downloadSVG}>Download SVG</Button>
</div>