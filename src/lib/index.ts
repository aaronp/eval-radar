import type { ArcCoords } from "./types"
import { writable } from 'svelte/store'


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
export const saveSettingsKeyForPage = (id : string) => `settings-${id}`

/**
 * @returns a list of the saved node names
 */
export const loadNodeNames = () => {
  if (typeof localStorage !== "undefined") {
    const names = localStorage.getItem('node-names')
    return names ? names.split(',').map((s) => s.trim()) : []
  } else return []
}

// Define a writable store for a list of strings
export const nodeNames = writable<string[]>(loadNodeNames())

/**
 * @returns the most recently saved node ID (so we can use that to easily copy)
 */
export const lastSavedNodeId = () => localStorage.getItem('last-saved-id')


/**
 * adds the graph id to the list of known graphs
 * @param id
 */
export const saveNodeName = (id : string, nodeNamesArray : string[]) => {
  // let nodeNamesArray = nodeNames
  if (!nodeNamesArray.includes(id)) {
      console.log(`Saving new radar ${id} to ${nodeNamesArray}`)
      nodeNamesArray.push(id)
      localStorage.setItem(`node-names`, nodeNamesArray.join(','))
      localStorage.setItem(`last-saved-id`, id)
      
      nodeNames.set(nodeNamesArray)
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
  
  export async function downloadSvg(name : string, svgRef : SVGElement) {
        const serializer = new XMLSerializer()
        const svgContent = serializer.serializeToString(svgRef)

        // Create a Blob from the SVG content
        const blob = new Blob([svgContent], { type: 'image/svg+xml' })
        const url : string = URL.createObjectURL(blob)

        // Create a temporary link to download the file
        const a = document.createElement('a')
        a.href = url
        a.download = name
        document.body.appendChild(a)
        a.click()

        // Clean up
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
  }

  export async function downloadSvgAsPng(filename : string, svgElement : SVGElement) {
    // Get the SVG data as a string
    const svgData = new XMLSerializer().serializeToString(svgElement)

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) {
      console.error("Could not get canvas context")
      return
    }

    // Get the dimensions of the SVG element
    const { width, height } = svgElement.getBoundingClientRect()
    canvas.width = width
    canvas.height = height

    // Create an image element
    const img = new Image()
    img.onload = () => {
      // Draw the SVG image onto the canvas
      context.clearRect(0, 0, width, height)
      context.drawImage(img, 0, 0, width, height)

      // Convert the canvas to a PNG blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Create a download link
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download = filename
          link.click()

          // Clean up the object URL after the download
          URL.revokeObjectURL(link.href)
        } else {
          console.error("Failed to create PNG blob")
        }
      }, "image/png")
    }

    // Set the src of the image to the serialized SVG data
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

  export async function copySvgAsPng(svgElement : SVGElement) {

    // Get the SVG data as a string
    const svgData = new XMLSerializer().serializeToString(svgElement)

    // Create a temporary canvas
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) return;

    // Set canvas dimensions based on the SVG element
    const { width, height } = svgElement.getBoundingClientRect()
    canvas.width = width
    canvas.height = height

    // Create an image from the SVG data
    const img = new Image()
    img.onload = async () => {
      // Draw the image onto the canvas
      context.clearRect(0, 0, width, height)
      context.drawImage(img, 0, 0, width, height)

      // Convert canvas to Blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Copy the Blob as PNG to the clipboard
          try {
            const clipboardItem = new ClipboardItem({ "image/png": blob })
            await navigator.clipboard.write([clipboardItem])
          } catch (error) {
            console.error("Failed to copy PNG:", error)
            throw error
          }
        }
      }, "image/png")
    };

    // Set the src of the image to the SVG data
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

