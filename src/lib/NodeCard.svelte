<script lang="ts">
    import { Button, Icon, Card } from 'svelte-ux';
    import { mdiPencil, mdiContentSave, mdiDelete } from '@mdi/js'
    import SvelteMarkdown from 'svelte-markdown'
    import EditNode from './EditNode.svelte'
    import type { Node } from "$lib/types"
    import  { arcForIndex } from "$lib"

    type Props = {
      // onUpdateText: (newText : string) => void
      node : Node
      sections : string[]
      divisions : string[]
      onDelete : (n : Node) => void
      onUpdate : (n : Node) => void
    }

    let  { node, sections, divisions, onDelete, onUpdate } : Props = $props()

    let currentNode = $state({...node})

    let isMouseOver = $state(false)
    let isEditing = $state(false)
  
    $effect(() => {
        if (inputRef) {
            inputRef.focus()
        }
    })

    // Focus the input field when it becomes visible
    let inputRef : any | null = $state(null);
  
    const onEdit = (_event: any) => isEditing = !isEditing

    const onSaveEdit = (n : Node) => {
      currentNode = n
      onUpdate(currentNode)
    }
  </script>
  
  <style>
    .editable-container {
      display: inline-block
    }
  </style>
  
  <Card title={currentNode.title} actions="edit">
    <div slot="contents">
      id: {currentNode.id}
      <!-- svelte-ignore a11y_mouse_events_have_key_events -->
      <div class="editable-container" role="button" tabindex={1} onmouseover={_e => isMouseOver = true} onmouseout={_e => isMouseOver = false}>
    
        {#if isEditing}
          <EditNode node={currentNode} onEditNode={onSaveEdit} />
        {:else}
          <div class="prose max-w-none">
            <SvelteMarkdown source={currentNode.contents}/>
          </div>
        {/if}

        <span class="m-2">
          <Button onclick={onEdit}><Icon data={isEditing ? mdiContentSave : mdiPencil}/>{isEditing ? "Save" : "Edit"}</Button>
          <Button onclick={() => onDelete(currentNode)}><Icon data={mdiDelete}/>Delete</Button>
        </span>

      </div>
      
      
    </div>
  </Card>
