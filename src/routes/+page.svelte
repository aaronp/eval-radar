<script lang="ts">
  import { TextField, RangeField, ExpansionPanel, Field, Input } from "svelte-ux"
  import Radar from "$lib/Radar.svelte"
  import NodeCard from "$lib/NodeCard.svelte"
  import ColorPicker from 'svelte-awesome-color-picker'
  import type { Node } from "$lib/types"
	import EvalList from "$lib/EvalList.svelte";

  let currentNode : Node | null = $state(null)

  let sectionText = $state('alpha, beta, gamma')
  // Reactive statement to update sections array when sectionText changes
  let sections = $derived(sectionText.split(',').map(s => s.trim()))

  let divisionText = $state('adopt, trial, assess, hold')
  let divisions = $derived(divisionText.split(','))

  let labelScale : number= $state(1.1)
  let radius : number= $state(300)
  
  let defaultColor : string = $state("blue")
  let defaultRadius : number = $state(20)


  let width = $derived(radius * 2 * 1.2)
  let height = $derived(width)

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


</script>

<ExpansionPanel>
    <div slot="trigger" class="flex-1 p-3">Settings</div>
    <TextField label="Sections" placeholder="Comma-Separated Radar Sections" bind:value={sectionText} />
    <TextField label="Divisions" placeholder="Comma-Separated Divisions" bind:value={divisionText} />
    Labels:
    <RangeField bind:value={labelScale} min={0.1} max={3} step={0.05} format="decimal" />
    Radius:
    <RangeField bind:value={radius} min={50} max={1000} step={50}  />
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

{#key nodes}
<Radar 
  width={width}
  height={height}
  radarNodes={nodes} 
  radius={radius} 
  sections={sections} 
  divisions={divisions} 
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