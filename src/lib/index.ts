import type { ArcCoords } from "./types"
// Function to convert degrees to radians
export const degToRad = (degrees : number) => (degrees * Math.PI) / 180


// Calculate arc properties based on section count
const totalDegrees = 360

export const sectionForPosition = (centerX : number, centerY : number, x : number, y : number, sections : string[]) : string => {
  const angleInDegrees = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI

  const sectionAngle = totalDegrees / sections.length
  let section = Math.floor((angleInDegrees + 360) % 360 / sectionAngle)
  if (section < 0) {
    section += sections.length
  }
  const found = sections[section]

  return found // `${found}: ${Math.floor(angleInDegrees)}`
}

export const saveKeyForPage = (id : string) => `nodes-${id}`

export const nodeNames = localStorage.getItem('node-names')

export const saveNodeName = (id : string) => {
  let nodeNamesArray = nodeNames ? nodeNames.split(',') : [];
  if (!nodeNamesArray.includes(id)) {
      nodeNamesArray.push(id)
      localStorage.setItem(`node-names`, nodeNamesArray.join(','))
  }
}

export const arcForIndex = (centerX : number, centerY : number, numSections :number, index :number, r : number) : ArcCoords => {
    const sectionAngle = degToRad(totalDegrees / numSections)
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

  export const idFromPath = (pathname: string) => {
    const parts = pathname.split('/').filter((p) => p.length > 0)
    if (parts.length < 1) {
      return ''
    } else {
      const id = parts.pop() ?? ''
      return id
    }
  }
  