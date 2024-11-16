<script lang="ts">
    import { TextField, RangeField, ExpansionPanel, Field, Card } from "svelte-ux"
    import Radar from "$lib/Radar.svelte"
    import ColorPicker from 'svelte-awesome-color-picker'
    import type { Node } from "$lib/types"
    import EvalList from "$lib/EvalList.svelte";
    import { saveKeyForPage, idFromPath, saveNodeName } from "$lib";
	import { page } from '$app/stores'
    let pageName : string = $derived($page.url.pathname)
	let id = $derived(idFromPath(pageName))

    type Props = {
        initialNodes : Node[]
    }
    let { initialNodes } : Props = $props()
    

    let currentNode : Node | null = $state(null)
  
    // Reactive statement to update sections array when sectionText changes
    let sectionText = $state('alpha, beta, gamma')
    let sections = $derived(sectionText.split(',').map(s => s.trim()))
  
    let labelRadiuses : number[] = $state([])
  
    let divisionText = $state('adopt, trial, assess, hold')
    let divisions = $derived(divisionText.split(','))
  
    let arcRadiuses : number[] = $state([])
  
    let radius : number= $state(300)
    
    let defaultColor : string = $state("blue")
    let defaultRadius : number = $state(20)
  
    let labelOffset : number = $state(30)
    let labelGap : number = $state(30)
  
    let width = $derived(radius * 2 * 1.4)
    let height = $derived(width * 1.1)
      // Define an array of nodes with their initial positions
    let nodes : Array<Node> = $state(initialNodes)
  
    let _saved = false
    const savePages = () => {
        if (!_saved) {
            saveNodeName(id)
            _saved = true
        } 
    }
  
    const onUpdateNodes = (newNodes :Node[]) => {
        nodes = newNodes
        localStorage.setItem(saveKeyForPage(id), JSON.stringify(newNodes))
        savePages()
    }


  
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
  
    function updateLabel(e : Event, i : number) {
        const target = e.target as HTMLInputElement
        const sliderValue = Number(target.value)
        labelRadiuses[i] = sliderValue
    }
  
    function updateArc(e : Event, i : number) {
        const target = e.target as HTMLInputElement
        const sliderValue = Number(target.value)
        arcRadiuses[i] = sliderValue
    }
  </script>
  
  <ExpansionPanel>
      <div slot="trigger" class="flex-1 p-3">Settings</div>
      <TextField label="Sections" placeholder="Comma-Separated Radar Sections" bind:value={sectionText} />
      
      <Card title="Label Offsets">
        <div slot="contents">
            {#each divisions as d, i}
            {d}: 
            <input
            class="my-1"
                type="range"
                min="10"
                max="1000"
                value={labelRadiuses[i]}
                oninput={(e) => updateLabel(e, i)}
                />
            <!-- <RangeField bind:value={labelRadiuses[i]} on:input={(e) => updateSection(e, i)} min={0} max={500} step={1}  /> -->
        {/each}</div>
      </Card>

      <Card title="Arc Offsets">
        <div slot="contents">
            {#each divisions as d, i}
            {#if i > 0}
            {d}: 
            <input
                type="range"
                min="10"
                max="1000"
                value={arcRadiuses[i]}
                oninput={(e) => updateArc(e, i)}
                />
            {/if}
        {/each}</div>
      </Card>

      <TextField label="Divisions" placeholder="Comma-Separated Divisions" bind:value={divisionText} />
      <div class="m-2">
        Canvas Size:
        <RangeField bind:value={radius} min={50} max={1000} step={50}  />
      </div>
      <div class="m-2">
        Section Label Offset:
        <RangeField bind:value={labelOffset} min={0} max={50} step={1}  />
      </div>
      <div class="m-2">
        Pie Gap:
        <RangeField bind:value={labelGap} min={5} max={150} step={1}  />
      </div>
      <div class="m-2">
      Default Node Color:
      <ColorPicker
            bind:hex={defaultColor}
            position="responsive"
          />
    </div>
    <div class="m-2">
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
    </div>
  </ExpansionPanel>
  
  {#key nodes}
  <Radar 
    width={width}
    height={height}
    labelOffset={labelOffset}
    labelGap={labelGap}
    radarNodes={nodes} 
    radius={radius} 
    sections={sections} 
    labelRadiuses={labelRadiuses}
    divisions={divisions} 
    arcRadiuses={arcRadiuses}
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