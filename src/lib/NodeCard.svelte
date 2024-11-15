<script lang="ts">
    import { TextField, Button, Icon, Card, RangeField } from 'svelte-ux';
    import { mdiPencil, mdiContentSave, mdiDelete } from '@mdi/js'
    import SvelteMarkdown from 'svelte-markdown'
    import EditNode from './EditNode.svelte'
    import type { Node } from "$lib/types"

    type Props = {
      // onUpdateText: (newText : string) => void
      currentNode : Node
      onDelete : (n : Node) => void
    }

    let  { currentNode, onDelete } : Props = $props()

    // let { text, onUpdateText } : Props = $props()
    
    let isMouseOver = $state(false)
    let isEditing = $state(false)
    let editableText = $state(currentNode.contents)
  
    $effect(() => {
        if (inputRef) {
            inputRef.focus()
        }
    })


    $effect(() => {
        console.log(`editableText=${editableText}`)
        currentNode.contents = editableText
    })
    // Focus the input field when it becomes visible
    let inputRef : any | null = $state(null);
  
    const onEdit = (_event: any) => isEditing = !isEditing
  </script>
  
  <style>
    .editable-container {
      display: inline-block;
      /* cursor: pointer; */
    }
  </style>
  
  <Card title={currentNode.title} actions="edit">
    <div slot="contents">
      <!-- svelte-ignore a11y_mouse_events_have_key_events -->
      <div class="editable-container" role="button" tabindex={1} onmouseover={_e => isMouseOver = true} onmouseout={_e => isMouseOver = false}>
    
        {#if isEditing}
          <EditNode node={currentNode} />
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
