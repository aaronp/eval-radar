
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

    // hack to shift the labels:
    labelOffsetX : number,
    labelOffsetY: number,

    // the size of the radar
    radius : number,
    // the names of the sections (e.g. langauges, processes, tools)
    sections: string[],
    sectionRadiuses : number[],

    // the names of the stages (e.g. hold, assess, adopt)
    divisions : string[],
    divisionRadiuses : number[],

    // a hack - the multiplier to scale the division labels
    scaleMultiplier : number,

    // nodeHandler
    onNodeSelected : (node: Node) => void,

    onUpdateNodes : (nodes : Node[]) => void,

    radarNodes : Node[],

    // the default color for new nodes
    defaultColor: string, 

    // the default radius for new nodes
    defaultRadius : number
}