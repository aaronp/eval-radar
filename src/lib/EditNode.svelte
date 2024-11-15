<script lang="ts" >
    import type { Node } from "$lib/types.d.ts"

    import { TextField, RangeField } from 'svelte-ux'
    import ColorPicker from 'svelte-awesome-color-picker'

    type Props = {
        node : Node
    }

    let { node } : Props = $props()

</script>

<TextField label="Name:" bind:value={node.title} autofocus />

<TextField
    label="About:"
    debounceChange
    multiline
    class="bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-left text-lg"
    classes={{ input: 'h-40 w-80', container: 'h-40 w-80' }}
    bind:value={node!.contents} />


Size:
<RangeField bind:value={node.radius} min={2} max={50} step={1} />

<ColorPicker
bind:hex={node.color}
position="responsive" />