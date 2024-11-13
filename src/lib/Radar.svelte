<script lang="ts">
    import Points from "$lib/Points.svelte"
    import Arcs from "$lib/Arcs.svelte"

    type Props = {
        radius : number,
        sections: string[],
        divisions : string[]
    }
    let { radius, sections, divisions } : Props = $props()

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
</style>

<div>
<svg bind:this={svgRef}>

    <Arcs radius={radius} sections={sections} divisions={divisions} />
    
    <Points />
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