<script lang="ts" >
    import type { Node } from "$lib/types.d.ts"

    import { TextField, RangeField, Button } from 'svelte-ux'
    import ColorPicker from 'svelte-awesome-color-picker'

    type Props = {
        node : Node,
        onEditNode : (node :Node) => void
    }

    let { node, onEditNode } : Props = $props()

    // TODO - this should really be a copy and use the callback
    let currentNode = $state(node)

</script>

<div>
<TextField label="Node Name:" bind:value={currentNode.title} autofocus />

<TextField
    label="About:"
    debounceChange
    multiline
    class="bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-left text-lg"
    classes={{ input: 'h-40 w-80', container: 'h-40 w-80' }}
    bind:value={currentNode.contents} />


Size:
<RangeField bind:value={currentNode.radius} min={2} max={50} step={1} />

<ColorPicker
bind:hex={currentNode.color}
position="responsive" />
</div>