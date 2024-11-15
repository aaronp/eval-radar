<script lang="ts">
    import { TextField, Button, Icon, Card, RangeField } from 'svelte-ux';
    import { mdiPencil, mdiContentSave, mdiDelete } from '@mdi/js'
    import SvelteMarkdown from 'svelte-markdown'
    import type { Node } from "$lib/types"
	  import ColorPicker from 'svelte-awesome-color-picker'

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
          <TextField class="m-2" placeholder={currentNode.title} label="Title" bind:value={currentNode.title}/>
         
          <TextField
            debounceChange
            multiline
            class="bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-left text-lg m-2"
            classes={{ input: 'h-40 w-80', container: 'h-40 w-80' }}
            bind:value={editableText}
            
            bind:this={inputRef}
            
          />

          Size:
          <RangeField bind:value={currentNode.radius} min={2} max={50} step={1} />

          <ColorPicker
          bind:hex={currentNode.color}
          position="responsive"
        />
        {:else}
          <div class="prose max-w-none">
            <SvelteMarkdown source={currentNode.contents}/>
          </div>
        {/if}
    
        <!-- {#if isMouseOver}

        {/if} -->
        <span class="m-2">
          <Button onclick={onEdit}><Icon data={isEditing ? mdiContentSave : mdiPencil}/>{isEditing ? "Save" : "Edit"}</Button>
          <Button onclick={() => onDelete(currentNode)}><Icon data={mdiDelete}/>Delete</Button>
        </span>

      </div>
      
      
    </div>
  </Card>
