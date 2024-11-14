<script lang="ts">
    import Points from "$lib/Points.svelte"
    import Arcs from "$lib/Arcs.svelte"
    import Labels from "$lib/Labels.svelte"
    import type { RadarProps } from './types.d.ts' 
    import { Button, Dialog, Field, TextField, Toggle } from 'svelte-ux'
    import type { Node } from "$lib/types.d.ts"

    let { nodes, radius, sections, divisions, scaleMultiplier = 1, defaultColor, defaultRadius, onNodeSelected, onUpdateNodes} : RadarProps = $props()

    let width = $derived(radius * 2 * 1.2)
    let height = $derived(width)

    let _openDialog = $state(false)
    let _newNode : Node  = $state({ id: -1, x: 0, y: 0, radius : 0, color : "", title : "", contents : '' })

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

    function doAddNewNode(event: MouseEvent) {
        _openDialog = false
        nodes.push(_newNode)
        onUpdateNodes(nodes)
    }

    function onAddNewNode(event: MouseEvent) {
        _openDialog = true
        const { offsetX, offsetY } = event
        _newNode = { id: nodes.length, 
            x: offsetX, 
            y: offsetY, 
            radius : defaultRadius, 
            color : defaultColor, 
            title : `Node ${nodes.length}`, 
            contents : 'lorem ipsum...' }
        nodes.push()
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

<Toggle on={_openDialog} let:toggle let:toggleOff>
    <Button on:click={toggle}>Show Dialog</Button>
    <Dialog open={_openDialog} on:close={toggleOff}>
      <div slot="title">New Entry</div>
      <div class="p-2">
        <TextField label="Name:" bind:value={_newNode!.title} autofocus />

        <TextField
            label="About:"
            debounceChange
            multiline
            class="bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-left text-lg"
            classes={{ input: 'h-40 w-80', container: 'h-40 w-80' }}
            bind:value={_newNode!.contents}        
            
            />
      </div>
      <div slot="actions">
        <Button variant="fill" color="primary" onclick={doAddNewNode}>OK</Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
  