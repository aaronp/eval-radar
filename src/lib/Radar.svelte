<script lang="ts">
    import Points from "$lib/Points.svelte"
    import Arcs from "$lib/Arcs.svelte"
    import Labels from "$lib/Labels.svelte"
    import EditNode from "$lib/EditNode.svelte"
    import type { RadarProps } from './types.d.ts' 
    import { Button, Dialog, Toggle } from 'svelte-ux'
    import type { Node } from "$lib/types.d.ts"
    import { idFromPath } from "$lib"

    let { 
        width,
        height,
        radarNodes, 
        radius, 
        sections, 
        labelRadiuses,
        divisions, 
        arcRadiuses,
        defaultColor, 
        defaultRadius, 
        labelOffset,
        labelGap,
        onNodeSelected, 
        onUpdateNodes} : RadarProps = $props()

    let nodes = $state(radarNodes.map(node => ({...node})))

    let _openDialog = $state(false)
    let _newNode : Node  = $state({ id: -1, x: 0, y: 0, radius : 0, color : "", title : "", contents : '' })

    let svgRef: SVGSVGElement;

    const onDownloadSVG = () => {
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

    const onUpdateNode = (n : Node) => {
        nodes = nodes.map(node => node.id === n.id ? n : node)
        onUpdateNodes(nodes)
    }

    const toggleOff = () => _openDialog = false

    function doAddNewNode(event: MouseEvent) {
        _openDialog = false
        _newNode.id = nodes.length
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
            title : `Node ${nodes.length + 1}`, 
            contents : 'lorem ipsum...' }
        event.preventDefault() 
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

    <Arcs 
    radius={radius} 
    sections={sections} 
    divisions={divisions} 
    arcRadiuses={arcRadiuses}
    fontSize={30} 
    labelOffset={labelOffset}
    labelGap={labelGap}
    centerX={width / 2}
    centerY={height / 2}
    />

    <!-- the 32 x 32 transform is a weird font-alignment hack to center the labels -->
    <Labels 
        labelRadiuses={labelRadiuses}
        radius={radius} 
        centerX={width / 2} 
        centerY={height / 2} 
        labels={divisions} 
        numberSections={sections.length} 
        fontSize={20} />

    <Points nodes={nodes} onNodeSelected={onNodeSelected} onNodeUpdated={onUpdateNode}/>
</svg>

    <Button class="my-8" variant="fill" color="secondary" rounded onclick={onDownloadSVG}>Download SVG</Button>
</div>

<!-- the new node dialogue -->
<Toggle on={_openDialog} >
    <Dialog open={_openDialog} on:close={toggleOff}>
      <div slot="title">New Entry</div>
      <div class="p-2">
        <EditNode node={_newNode} onEditNode={onUpdateNode}/>
      </div>
      <div slot="actions">
        <Button variant="fill" color="primary" onclick={doAddNewNode}>OK</Button>
        <Button>Cancel</Button>
      </div>
    </Dialog>
  </Toggle>
  