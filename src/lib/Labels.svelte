<script lang="ts">
    type Props = {
        radius : number,
        centerX : number,
        centerY : number,
        labels : Array<string>,
        numberSections :  number
    }
    let { radius, centerX, centerY, labels, numberSections } : Props = $props()
  
    // Function to calculate the rotation angle for each section
    const getRotationAngle = (index : number) => (360 / numberSections) * index
    
    const degToRad = (degrees : number) => (degrees * Math.PI) / 180

    const translateLabel = (index : number, divisionIndex : number) => {
        const divScale = radius / (labels.length + 1)
        const r = (divisionIndex + 1) * divScale
        const deg = getRotationAngle(index)
        const x = r * Math.cos(degToRad(deg))
        const y = r * Math.sin(degToRad(deg))
        return `translate(${x}, ${y})`
    }

    const rotateLabelFor = (sectionIndex : number) => {
        const angle = getRotationAngle(sectionIndex)
        if (angle > 90 && angle < 270) {
            return "180"
        }
        return "0"
    }

    const labelFor = (label : string, sectionIndex : number, divisionIndex :number) => {
        const angle = getRotationAngle(sectionIndex)
        return `${label} ${angle}`
    }
  </script>


{#each Array(numberSections).fill(0) as _, sectionIndex}
{#each labels as text, textIndex}

<g transform={`${translateLabel(sectionIndex, textIndex)} rotate(${getRotationAngle(sectionIndex)}, ${centerX}, ${centerY})`}>
  <g transform="rotate({rotateLabelFor(sectionIndex)}, {centerX}, {centerY})" >
  <text
    x={centerX}
    y={centerY}
    font-size="10"
    text-anchor="middle"
    dominant-baseline="central"
  >
    {labelFor(text, sectionIndex, textIndex)}
  </text>
</g>
</g>
{/each}
{/each}