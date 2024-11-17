
export type Node = {
    id : number,
    x : number,
    y : number,
    radius : number,
    color : string,
    title : string = '',
    contents : string = ''
}

export type ArcCoords = {
    sectionAngle : number,
    startAngle : number,
    endAngle : number,
    
    x1 : number,
    y1 : number,
    x2 : number,
    y2 : number
  }

export type Settings = {
    // the pie radius
    radius : number
    // the default circle radius
    defaultRadius : number
    // the default color
    defaultColor : string

    // distance for labels
    labelOffset : number

    labelGap : number

    // e.g. tech, process, etc
    sections : string[]

    // e.g. hold, trial, assess
    divisions : string[]

    // the distances for the division labels
    labelRadiuses: number[]

    // the distances for the section rings
    sectionRadiuses: number[]
}


export type EvalProps = {

    // needed to calculate which section each point falls into
    // by calculating the angle of the center of the circle to the point
    centerX : number,
    centerY : number,

    // the names of the sections (e.g. langauges, processes, tools)
    sections: string[],

    // the names of the stages (e.g. hold, assess, adopt)
    divisions : string[],

    // the nodes
    nodes : Node[],

    onDelete : (node :Node) => void

    onUpdate : (node :Node) => void
}

export type RadarProps = {
    // the size of the SVG
    width :number,
    height :number,

    // distance from the arc the section labels should be
    labelOffset : number,

    // the size of the spacing between pie pieces
    labelGap: number,

    // the size of the radar
    radius : number,
    // the names of the sections (e.g. langauges, processes, tools)
    sections: string[],

    // the names of the stages (e.g. hold, assess, adopt)
    divisions : string[],

    // matches the divisions size -- sets the label distances
    labelRadiuses : number[],

    // matches the divisions size - 1 -- sets the arc distances
    arcRadiuses : number[],
    

    // nodeHandler
    onNodeSelected : (node: Node) => void,

    onUpdateNodes : (nodes : Node[]) => void,

    radarNodes : Node[],

    // the default color for new nodes
    defaultColor: string, 

    // the default radius for new nodes
    defaultRadius : number
}