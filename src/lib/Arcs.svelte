<script lang="ts">
  import { onMount } from 'svelte'
  import { TextField } from "svelte-ux"

  // Bound textarea input value
  let sectionText = $state('')
  
  // Configurable gap between sections in degrees
  const gapDegrees = 2;

  // Reactive statement to update sections array when sectionText changes
  let sections = $derived(sectionText.split(',').map(s => s.trim()))

  // Calculate arc properties based on section count
  const radius = 100
  const labelRadius = radius + 20
  const centerX = 150
  const centerY = 150
  const totalDegrees = 360
  const gapRadians = (gapDegrees * Math.PI) / 180

  // Function to convert degrees to radians
  const degToRad = (degrees) => (degrees * Math.PI) / 180;


  function createLabelPathForIndex(index :number) {
    const sectionAngle = (totalDegrees / sections.length) * (Math.PI / 180)
    const startAngle = index * sectionAngle + index * gapRadians
    const endAngle = (index + 1) * sectionAngle - gapRadians + index * gapRadians

    return createLabelPath(startAngle, endAngle, labelRadius)
  }
  // Function to generate a curved path for labels
  function createLabelPath(startAngle, endAngle, radius) {
    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)

    return `M ${x1},${y1} A ${radius},${radius} 0 0 1 ${x2},${y2}`;
  }

  // Function to generate SVG arc path
  function createArcPathForIndex(index : number) {
    const sectionAngle = (totalDegrees / sections.length) * (Math.PI / 180)
    const startAngle = index * sectionAngle + index * gapRadians
    const endAngle = (index + 1) * sectionAngle - gapRadians + index * gapRadians
      
    return createArcPath(startAngle, endAngle, radius)
  }
  
  function createArcPath(startAngle, endAngle, radius) {
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    return `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  }
</script>

<style>
  svg {
    border: 1px solid #ddd;
    background-color: #f5f5f5;
  }
</style>

<TextField placeholder="Comma-Separated Radar Sections" bind:value={sectionText} />

Parsed: {JSON.stringify(sections)}
<!-- SVG rendering of sections -->
<svg width="300" height="300" viewBox="0 0 300 300">
  {#each sections as section, index}
    {#if sections.length}
      
      <!-- Render the arc path for each section -->
      <path
        d={createArcPathForIndex(index)}
        fill={`hsl(${index * 40}, 70%, 60%)`}
        stroke="#333"
        stroke-width="1"
      />

        <!-- Define path for the label text -->
        <path
        id="label-path-{index}"
        d={createLabelPathForIndex(index)}
        fill="none"
        stroke="none"
      />

      <!-- Render the label centered along the arc -->
      <text class="label">
        <textPath href={`#label-path-${index}`} startOffset="50%">
          {section}
        </textPath>
      </text>
      
    {/if}
  {/each}
</svg>
