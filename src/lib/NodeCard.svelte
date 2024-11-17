<script lang="ts">
    import { Button, Icon, Card } from 'svelte-ux';
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

    let  { node, sections, divisions, centerX, centerY, onDelete, onUpdate } : Props = $props()

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
    /* .editable-container {
      display: inline-block
    } */
  </style>
  
  <Card classes={{ content: 'w-80', root: 'h-40 w-full' }} class="w-96"  title="{currentNode.id}: {currentNode.title}" actions="edit">
    <div slot="contents" >
      
      <!-- svelte-ignore a11y_mouse_events_have_key_events -->
      <div class="w-full editable-container" role="button" tabindex={1} onmouseover={_e => isMouseOver = true} onmouseout={_e => isMouseOver = false}>
    
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
