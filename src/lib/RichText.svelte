<script lang="ts">
    import { TextField } from 'svelte-ux';

    type Props = {
        text : string
        onUpdateText: (newText : string) => void
    }
    let { text, onUpdateText } : Props = $props()
    
  
    // Internal state
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

    const handleOnFocus = (event) => isEditing = true
    const handleMouseOut = (event) => isEditing = false
  </script>
  
  <style>
    .editable-container {
      display: inline-block;
      cursor: pointer;
    }
  </style>
  
  <div class="editable-container" role="button" onmouseover={handleOnFocus} onmouseout={handleMouseOut} tabindex={1} >
    {#if isEditing}
      <TextField
        debounceChange
        multiline
        class="bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-left text-lg"
        classes={{ input: 'h-40 w-3/4', container: 'h-40 w-7/8' }}
        bind:value={editableText}
        on:blur={handleBlur}
        bind:this={inputRef}
        
      />
    {:else}
      <pre>{text}</pre>
    {/if}
  </div>
  