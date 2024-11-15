
export type Node = {
    id : number,
    x : number,
    y : number,
    radius : number,
    color : string,
    title : string = '',
    contents : string = ''
}


export type EvalProps = {
    // the names of the sections (e.g. langauges, processes, tools)
    sections: string[],

    // the names of the stages (e.g. hold, assess, adopt)
    divisions : string[],

    // the nodes
    nodes : Node[],

    onDelete : (node :Node) => void
}

export type RadarProps = {
    // the size of the radar
    radius : number,
    // the names of the sections (e.g. langauges, processes, tools)
    sections: string[],
    // the names of the stages (e.g. hold, assess, adopt)
    divisions : string[],

    // a hack - the multiplier to scale the division labels
    scaleMultiplier : number,

    // nodeHandler
    onNodeSelected : (node: Node) => void,

    onUpdateNodes : (nodes : Node[]) => void,

    nodes : Node[],

    // the default color for new nodes
    defaultColor: string, 

    // the default radius for new nodes
    defaultRadius : number
}