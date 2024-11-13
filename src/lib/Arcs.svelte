<script lang="ts">
  import { TextField } from "svelte-ux"

  // Bound textarea input value
  let sectionText = $state('alpha, beta, gamma')
  // Reactive statement to update sections array when sectionText changes
  let sections = $derived(sectionText.split(',').map(s => s.trim()))

  let divisionText = $state('hold, assess, trial, adopt')
  let divisions = $derived(divisionText.split(',').map(s => s.trim()))

  // Calculate arc properties based on section count
  const radius = 300
  const labelRadius = radius + 20
  const totalDegrees = 360

  let width = $derived(labelRadius * 2 * 1.2)
  let height = $derived(width)

  let centerX = $derived(width / 2)
  let centerY = $derived(height / 2)

  // Function to convert degrees to radians
  const degToRad = (degrees : number) => (degrees * Math.PI) / 180
  const radToDeg = (rad : number) => (rad * 180) / Math.PI

  // how far apart should the arcs be from the center?
  const explodeScale = 20

  type ArcCoords = {
    sectionAngle : number,
    startAngle : number,
    endAngle : number,
    
    x1 : number,
    y1 : number,
    x2 : number,
    y2 : number
  }

  const arcForIndex = (index :number, r : number) => {
    const sectionAngle = degToRad(totalDegrees / sections.length)
    const startAngle = index * sectionAngle
    const endAngle = (index + 1) * sectionAngle

    const x1 = centerX + r * Math.cos(startAngle)
    const y1 = centerY + r * Math.sin(startAngle)
    const x2 = centerX + r * Math.cos(endAngle)
    const y2 = centerY + r * Math.sin(endAngle)
    return {
      sectionAngle, startAngle, endAngle,
      x1, y1, x2, y2
    }
  }

  function translateForIndex(index : number) {
    const { startAngle, endAngle } = arcForIndex(index, labelRadius)
    const radians = startAngle + ((endAngle - startAngle) / 2)
    
    const translateX = explodeScale * Math.cos(radians)
    const translateY = explodeScale * Math.sin(radians)
    return `translate(${translateX}, ${translateY})`
  }

  function textFlipTransform(index :number) {
    const { x1, x2, y1, y2, startAngle, endAngle } = arcForIndex(index, labelRadius)
    const isBottomHalf = (startAngle + endAngle) / 2 > Math.PI  
    const x = x2 - x1
    const y = y2 - y1
    return isBottomHalf ? `rotate(90)` : ""
  }

  const sectionLabel = (label : string, index :number) => {
    // const { startAngle, endAngle } = arcForIndex(index, labelRadius)
    // const isBottomHalf = (startAngle + endAngle) / 2 > Math.PI  
    // const tx = isBottomHalf ? `rotate(180 ${centerX} ${centerY})` : ""
    return label
  }

  function createLabelPathForIndex(index :number) {
    const { x1, y1, x2, y2 } = arcForIndex(index, labelRadius)

    return `M ${x1},${y1} A ${labelRadius},${labelRadius} 0 0 1 ${x2},${y2}`;
  }

  function divisionArcPathForIndex(index : number, divisionIndex : number) {
    if (divisionIndex == 0 || divisions.length == 0) {
      return ""
    }

    const scaledRadius = radius * divisionIndex / divisions.length
    if (sections.length == 1) {
      return `M ${centerX + scaledRadius},${centerY} A ${scaledRadius},${scaledRadius} 0 1,1 ${centerX - scaledRadius},${centerY} A ${scaledRadius},${scaledRadius} 0 1,1 ${centerX + scaledRadius},${centerY}`
    }
    const { startAngle, endAngle, x1, y1, x2, y2 } = arcForIndex(index, scaledRadius)

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${x1},${y1} A ${scaledRadius},${scaledRadius} 0 ${largeArcFlag} 1 ${x2},${y2} M ${x1},${y1} `;
  }

  // Function to generate SVG arc path
  function createArcPathForIndex(index : number) {
    if (sections.length == 1) {
      return `M ${centerX + radius},${centerY} A ${radius},${radius} 0 1,1 ${centerX - radius},${centerY} A ${radius},${radius} 0 1,1 ${centerX + radius},${centerY}`
    }
    const { startAngle, endAngle, x1, y1, x2, y2 } = arcForIndex(index, radius)

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  }
</script>

<style>
  svg {
    border: 1px solid #ddd;
    background-color: #f5f5f5;
  }
</style>

<TextField label="Secions" placeholder="Comma-Separated Radar Sections" bind:value={sectionText} />
<TextField label="Divisions" placeholder="Comma-Separated Divisions" bind:value={divisionText} />

Parsed: {JSON.stringify(sections)}
<!-- SVG rendering of sections -->
<svg width={width} height={height} viewBox="0 0 {width} {height}">
  {#each sections as section, index}
    {#if sections.length}
      
    <g transform={translateForIndex(index)}>
      
      <!-- Render the arc path for each section -->
      <path
        d={createArcPathForIndex(index)}
        fill={`hsl(${index * 40}, 90%, 60%)`}
        fill-opacity="0.1"
        stroke="#333"
        stroke-width="1"
      />

      {#each divisions as division, divisionIndex}
        <path
          d={divisionArcPathForIndex(index, divisionIndex)}
          stroke="#333"
          stroke-width="1"
          fill="none"
        />
      {/each}


        <!-- Define path for the label text -->
        <path
        id="label-path-{index}"
        d={createLabelPathForIndex(index)}
        fill="none"
        stroke="none"
      />

      <!-- Render the label centered along the arc -->
      <text class="label">
        <textPath href={`#label-path-${index}`} startOffset="50%" text-anchor="middle" dominant-baseline="middle" transform={textFlipTransform(index)}>
          {sectionLabel(section, index)}
        </textPath>
      </text>
    </g>
    {/if}
  {/each}
</svg>
