<script lang="ts">
    import Points from "$lib/Points.svelte"
    import Arcs from "$lib/Arcs.svelte"
    import Labels from "$lib/Labels.svelte"
    import type { Node, RadarProps } from './types.d.ts' 

    // Define an array of nodes with their initial positions
    let nodes : Array<Node> = $state([
        { id: 0, x: 100, y: 100, radius : 10, color : "blue" },
        { id: 1, x: 200, y: 150, radius : 20, color : "blue" },
        { id: 2, x: 150, y: 200, radius : 10, color : "red" }
    ])

    let { radius, sections, divisions, scaleMultiplier = 1, onNodeSelected } : RadarProps = $props()
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

    function handleDoubleClick(event: MouseEvent) {
        const { offsetX, offsetY } = event
        nodes.push({ id: nodes.length, x: offsetX, y: offsetY, radius : 10, color : "red" })
        event.preventDefault() // Prevent text selection
    }
</script>

<style>
    svg {
        border: 1px solid #ccc;
    }
</style>

<div>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<svg bind:this={svgRef} width={width} height={height} viewBox="0 0 {width} {height}"  ondblclick={handleDoubleClick} role="img">

    <Arcs radius={radius} sections={sections} divisions={divisions} fontSize={30} labelOffset={30}/>

    <g transform="translate(36, 32)" >
        <Labels scaleMultiplier={scaleMultiplier} radius={radius} centerX={width / 2} centerY={height / 2} labels={divisions} numberSections={sections.length} fontSize={20} />
    </g>

    <Points nodes={nodes} onNodeSelected={onNodeSelected}/>
  <!-- <style>
    .hidden { display: none; }
    .visible { display: block; }
    text { font-size: 16px; }
  </style>
  
  <circle id="toggle-button" cx="250" cy="50" r="130" fill="#3498db" cursor="pointer" />

  <text x="115" y="55" fill="#ffffff" font-size="16">Toggle Text</text>
  
  <text id="toggle-text" x="50" y="150" class="hidden">Hello! This text is toggled.</text>

  <script type="application/ecmascript">
    const button = document.getElementById('toggle-button');
    const textElement = document.getElementById('toggle-text');

    button.addEventListener('click', () => {
      textElement.classList.toggle('hidden');
      textElement.classList.toggle('visible');
    });
  </script> -->
</svg>


    <!-- Download Button -->
    <button onclick={downloadSVG}>Download SVG</button>
</div>