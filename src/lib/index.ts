import type { ArcCoords } from "./types"
// Function to convert degrees to radians
export const degToRad = (degrees : number) => (degrees * Math.PI) / 180


// Calculate arc properties based on section count
const totalDegrees = 360

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
