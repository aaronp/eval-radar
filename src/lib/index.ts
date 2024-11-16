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

  return sections[section]
}

export const saveKeyForPage = (id : string) => `nodes-${id}`

/**
 * @returns a list of the saved node names
 */
export const nodeNames = () => {
  if (typeof localStorage !== "undefined") {
    const names = localStorage.getItem('node-names')
    return names ? names.split(',').map((s) => s.trim()) : []
  } else return []
}

/**
 * @returns the most recently saved node ID (so we can use that to easily copy)
 */
export const lastSavedNodeId = () => localStorage.getItem('last-saved-id')


/**
 * adds the graph id to the list of known graphs
 * @param id
 */
export const saveNodeName = (id : string) => {
  let nodeNamesArray = nodeNames()
  if (!nodeNamesArray.includes(id)) {
      nodeNamesArray.push(id)
      localStorage.setItem(`node-names`, nodeNamesArray.join(','))
      localStorage.setItem(`last-saved-id`, id)
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
  