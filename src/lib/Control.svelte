<script lang="ts">
    import { TextField, RangeField, ExpansionPanel, Field, Card } from "svelte-ux"
    import Radar from "$lib/Radar.svelte"
    import NodeCard from "$lib/NodeCard.svelte"
    import ColorPicker from 'svelte-awesome-color-picker'
    import type { Node } from "$lib/types"
    import EvalList from "$lib/EvalList.svelte";
  
    let currentNode : Node | null = $state(null)
  
    // Reactive statement to update sections array when sectionText changes
    let sectionText = $state('alpha, beta, gamma')
    let sections = $derived(sectionText.split(',').map(s => s.trim()))
  
    let sectionRadiuses = $state([])
  
  
    let divisionText = $state('adopt, trial, assess, hold')
    let divisions = $derived(divisionText.split(','))
  
    let divisionRadiuses = $state([])
  
    let labelScale : number= $state(1.1)
    let radius : number= $state(300)
    
    let defaultColor : string = $state("blue")
    let defaultRadius : number = $state(20)
  
    let labelOffsetX : number = $state(36)
    let labelOffsetY : number = $state(0)
  
    let width = $derived(radius * 2 * 1.2)
    let height = $derived(width * 1.1)
  
      // Define an array of nodes with their initial positions
    let nodes : Array<Node> = $state([
        { id: 0, x: 100, y: 100, radius : 10, color : "blue", title : 'One', contents : 'is the lonliest number' },
        { id: 1, x: 200, y: 150, radius : 20, color : "blue", title : 'Two', contents : "'s compliment" },
        { id: 2, x: 150, y: 200, radius : 10, color : "red", title : 'Three', contents : 'is a crowd' }
    ])
  
  
    const onUpdateNodes = (newNodes :Node[]) => nodes = newNodes
  
    const onNodeSelected = (node :Node) => currentNode = node
    const onDelete = (node :Node | null) => {
      currentNode = null
      console.log(`deleting ${node?.id} from ${nodes.map((i) => i.id)}`)
      const newNodes = nodes.filter((n) => n.id != node?.id).map((n, index) => ({...n, id: index}))
      onUpdateNodes(newNodes)
    }
    const onUpdate = (node :Node) => {
      currentNode = node
      onUpdateNodes(nodes.map(n => n.id === node.id ? node : n))
    }
  
    function updateSection(e : Event, i : number) {
        const target = e.target as HTMLInputElement
        const sliderValue = Number(target.value)
        console.log(`Slider value changed to: ${sliderValue}`)
        console.log(`${sections[i]} updated with ${sliderValue}`)
        sectionRadiuses[i] = sliderValue
    }
  
  </script>
  
  <ExpansionPanel>
      <div slot="trigger" class="flex-1 p-3">Settings</div>
      <TextField label="Sections" placeholder="Comma-Separated Radar Sections" bind:value={sectionText} />
      
      <Card title="Radar Offsets">
        <div slot="contents">
            {#each divisions as d, i}
            {d}: 
            <input
                type="range"
                min="10"
                max="1000"
                value={sectionRadiuses[i]}
                oninput={(e) => updateSection(e, i)}
                />
            <!-- <RangeField bind:value={sectionRadiuses[i]} on:input={(e) => updateSection(e, i)} min={0} max={500} step={1}  /> -->
        {/each}</div>
      </Card>

      <Card title="Label Offsets">
        <div slot="contents">
            {#each divisions as d, i}
            {d}: 
            <input
                type="range"
                min="10"
                max="1000"
                value={divisionRadiuses[i]}
                oninput={(e) => updateSection(e, i)}
                />
            <!-- <RangeField bind:value={sectionRadiuses[i]} on:input={(e) => updateSection(e, i)} min={0} max={500} step={1}  /> -->
        {/each}</div>
      </Card>

      <TextField label="Divisions" placeholder="Comma-Separated Divisions" bind:value={divisionText} />
      Labels:
      <RangeField bind:value={labelScale} min={0.1} max={3} step={0.05} format="decimal" />
      Canvas Size:
      <RangeField bind:value={radius} min={50} max={1000} step={50}  />
      Label Offsets:
      <RangeField bind:value={labelOffsetX} min={-50} max={50} step={1}  /> 
      <RangeField bind:value={labelOffsetY} min={-50} max={50} step={1}  />
      Default Node Color:
      <ColorPicker
            bind:hex={defaultColor}
            position="responsive"
          />
      
      <Field label="Default Node Radius:" let:id>
        <input
          {id}
          type="number"
          min={3}
          max={30}
          step={1}
          bind:value={defaultRadius}
          class="w-full outline-none bg-surface-100"
        />
      </Field>
  </ExpansionPanel>
  
  sectionRadiuses:{sectionRadiuses.join(", ")}
  {#key nodes}
  <Radar 
    width={width}
    height={height}
    labelOffsetX={labelOffsetX}
    labelOffsetY={labelOffsetY}
    radarNodes={nodes} 
    radius={radius} 
    sections={sections} 
    sectionRadiuses={sectionRadiuses}
    divisions={divisions} 
    divisionRadiuses={divisionRadiuses}
    scaleMultiplier={labelScale} 
    defaultColor={defaultColor}
    defaultRadius={defaultRadius}
    onNodeSelected={onNodeSelected} 
    onUpdateNodes={onUpdateNodes}/>
  
  <EvalList 
    centerX={width / 2}
    centerY={height / 2}
    divisions={divisions} 
    sections={sections} 
    nodes={nodes} 
    onUpdate={onUpdate}
    onDelete={onDelete}/>
  {/key}