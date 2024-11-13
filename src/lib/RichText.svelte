<script lang="ts">
    import { TextField, Button, Icon } from 'svelte-ux';
    import { mdiPencil, mdiContentSave } from '@mdi/js'
    import SvelteMarkdown from 'svelte-markdown'

    type Props = {
        text : string
        onUpdateText: (newText : string) => void
    }
    let { text, onUpdateText } : Props = $props()
    
    let isMouseOver = $state(false)
    let isEditing = $state(false)
    let editableText = $state(text)
  
    $effect(() => {
        if (inputRef) {
            inputRef.focus()
        }
    })


    $effect(() => {
        console.log(`editableText=${editableText}`)
        onUpdateText(editableText)
    })
    // Focus the input field when it becomes visible
    let inputRef : any | null = $state(null);
  
    // Handle when the text field loses focus or when Enter is pressed
    const handleBlur = () => {
      isEditing = false;
      text = editableText;
    }

    const onEdit = (event) => isEditing = !isEditing
  </script>
  
  <style>
    .editable-container {
      display: inline-block;
      cursor: pointer;
    }
  </style>
  
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <div class="editable-container" role="button" tabindex={1} onmouseover={e => isMouseOver = true}>
    
    {#if isEditing}
      <TextField
        debounceChange
        multiline
        class="bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-left text-lg"
        classes={{ input: 'h-40 w-80', container: 'h-40 w-80' }}
        bind:value={editableText}
        
        bind:this={inputRef}
        
      />
    {:else}
      <div class="prose max-w-none">
        <SvelteMarkdown source={text}/>
      </div>
    {/if}

    {#if isMouseOver}
      <div class="my-2"><Button onclick={onEdit}><Icon data={isEditing ? mdiContentSave : mdiPencil}/>{isEditing ? "Save" : "Edit"}</Button></div>
    {/if}
  </div>
  