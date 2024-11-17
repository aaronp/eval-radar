<script lang="ts">
    import { Button, Icon, Card, Dialog, Toggle } from 'svelte-ux';
    import { mdiPencil, mdiContentSave, mdiDelete } from '@mdi/js'
    import SvelteMarkdown from 'svelte-markdown'
    import EditNode from './EditNode.svelte'
    import type { Node } from "$lib/types"


    type Props = {
      node : Node
      sections : string[]
      divisions : string[]
      centerX : number,
      centerY : number,
      onDelete : (n : Node) => void
      onUpdate : (n : Node) => void
    }

    let  { node, onDelete, onUpdate } : Props = $props()

    let currentNode = $state({...node})

    let isEditing = $state(false)
  
    $effect(() => {
        if (inputRef) {
            inputRef.focus()
        }
    })

    // Focus the input field when it becomes visible
    let inputRef : any | null = $state(null);

    const toggleOff = () => isEditing = false

    const onEdit = (_event: any) => isEditing = !isEditing

    function doAddNewNode(event: MouseEvent) {
      isEditing = false
      onSaveEdit(currentNode)
    }

    const onSaveEdit = (n : Node) => {
      currentNode = n
      onUpdate(currentNode)
    }

  </script>
  
  <style>
  </style>
  
  <div class="bg-light-blue-500">

    <div class="p-2 my-2 bg-gray-100 dark:bg-gray-800 font-bold text-2xl ">
      {currentNode.id + 1}: {currentNode.title}
    </div>
    <div class="p-2 my-2 bg-gray-50 dark:bg-gray-900 font-bold text-2xl text-sendary">
      <div class="prose max-w-none">
        <SvelteMarkdown source={currentNode.contents}/>
      </div>

      <span class="my-2">
        <Button onclick={onEdit}><Icon data={mdiPencil}/>Edit</Button>
        <Button onclick={() => onDelete(currentNode)}><Icon data={mdiDelete}/>Delete</Button>
      </span>
    </div>
</div>


<!-- the new node dialogue -->
<Toggle on={isEditing} >
  <Dialog open={isEditing} on:close={toggleOff}>
      <div slot="title">New Entry</div>
      <div class="p-2">
      <EditNode node={currentNode} onEditNode={onSaveEdit}/>
      </div>
      <div slot="actions">
      <Button variant="fill" color="primary" onclick={doAddNewNode}>OK</Button>
      <Button>Cancel</Button>
      </div>
  </Dialog>
</Toggle>
