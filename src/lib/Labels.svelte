<script lang="ts">
    type Props = {
        radius : number,
        centerX : number,
        centerY : number,
        labels : Array<string>,
        numberSections :  number,
        fontSize: number,
        labelRadiuses: number[]
    }
    let { radius, centerX, centerY, labels, numberSections, fontSize = 20, labelRadiuses } : Props = $props()
  
    // Function to calculate the rotation angle for each section
    const getRotationAngle = (index : number) => (360 / numberSections) * index
    
    const degToRad = (degrees : number) => (degrees * Math.PI) / 180

    const translateLabel = (index : number, divisionIndex : number) => {
        const divScale = radius / (labels.length + 1)
        const r = (divisionIndex + 1) * divScale
        const deg = getRotationAngle(index)

        const scale = divisionIndex < labelRadiuses.length ? labelRadiuses[divisionIndex] : r

        const x = scale * Math.cos(degToRad(deg))
        const y = scale * Math.sin(degToRad(deg))
        return `translate(${x}, ${y})`
    }

    const rotateLabelFor = (sectionIndex : number) => {
        const angle = getRotationAngle(sectionIndex)
        if (angle > 90 && angle < 270) {
            return "180"
        }
        return "0"
    }

  </script>


{#each Array(numberSections).fill(0) as _, sectionIndex}
{#each labels as text, textIndex}

<!-- move the labels along the gaps -->
<g transform={`${translateLabel(sectionIndex, textIndex)} rotate(${getRotationAngle(sectionIndex)}, ${centerX}, ${centerY})`}>
  <!-- if the label would be upside down, we rotate it -->
  <g transform="rotate({rotateLabelFor(sectionIndex)}, {centerX}, {centerY})" >
  <text
    x={centerX}
    y={centerY}
    font-size={fontSize}
    text-anchor="middle"
    dominant-baseline="central"
  >
    {text}
  </text>
</g>
</g>
{/each}
{/each}