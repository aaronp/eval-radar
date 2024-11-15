<script lang="ts">
  import Control from "$lib/Control.svelte"

  let nodes = [
          { id: 0, x: 100, y: 100, radius : 10, color : "blue", title : 'One', contents : 'is the lonliest number' },
          { id: 1, x: 200, y: 150, radius : 20, color : "blue", title : 'Two', contents : "'s compliment" },
          { id: 2, x: 150, y: 200, radius : 10, color : "red", title : 'Three', contents : 'is a crowd' }
      ]
</script>

<Control initialNodes={nodes} />
