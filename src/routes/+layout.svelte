<script lang="ts">
	import '../app.css';
	let { children } = $props();
	
	// This can be false if you're using a fallback (i.e. SPA mode)
	export const prerender = true;
</script>

{@render children()}
