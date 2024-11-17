<script lang="ts">
	import {
		AppBar,
		AppLayout,
		Button,
		Tooltip,
		settings,
		ThemeInit,
		ThemeSelect,
		NavItem,
		Icon
	} from 'svelte-ux'

	import {
		mdiWeb,
		mdiRadar,
		mdiPencil,
		mdiDelete,
		mdiContentDuplicate
	} from '@mdi/js'

	import { nodeNames, idFromPath, deleteNodeName, copyNode } from '$lib'
	import '../app.postcss'
	import { onMount } from 'svelte';
	import { page } from '$app/stores'
    let pageName : string = $derived($page.url.pathname)
	let id = $derived(idFromPath(pageName))

	settings({
		components: {
			AppBar: {
				classes: 'bg-primary text-white shadow-md'
			},
			AppLayout: {
				classes: {
					nav: 'bg-neutral-800 py-2'
				}
			},
			NavItem: {
				classes: {
					root: 'text-sm text-gray-400 pl-6 py-2 hover:text-white hover:bg-gray-300/10 [&:where(.is-active)]:text-sky-400 [&:where(.is-active)]:bg-gray-500/10'
				}
			}
		}
	})

	let nodes : string[] = $state([])

	let expansionState: Record<string, boolean> = $state({})

	const toggleExpansion = async (sheetName: string) => {
		expansionState[sheetName] = !expansionState[sheetName]
	}

	const onEditRadar = (name :string) => {
		
	}

	const onDeleteRadar = (n :string) => deleteNodeName(n, nodes)

	const onCopyRadar = (name :string) => copyNode(name, nodes)
	
	onMount(() => {
		nodeNames.subscribe((names) => {
			nodes = names
		})
	})
</script>

<ThemeInit />
<meta http-equiv="content-security-policy" content="script-src 'self' 'unsafe-eval';" />
<AppLayout>
	<svelte:fragment slot="nav">
		<div class="grid">
			<div class="self-start ml-2 text-white">
				{#each nodes as name}


				<div class="relative border-gray-300 cursor-pointer group">
					
					<div class="self-start">

						<NavItem path="/{name}" currentUrl={$page.url} >
							<span>
								<span 
									role="button" 

									onclick={e => toggleExpansion(name)} 
									onkeydown={(e) => e.key === 'Enter' && toggleExpansion(name)}
									tabindex="0" class="arrow "><Icon data={mdiRadar} class="inline-block mr-1" /></span>
									
									<span>{name}</span>
							</span>
						</NavItem>
					</div>
					<Button
						icon={mdiPencil}
						class="absolute top-1/2 right-20 transform -translate-y-1/2 bg-blue-500 text-white py-1 rounded hidden group-hover:block"
						onclick={(e : MouseEvent) => onEditRadar(name)}
					></Button>

					<Button
						icon={mdiDelete}
						class="absolute top-1/2 right-10 transform -translate-y-1/2 bg-blue-500 text-white py-1 rounded hidden group-hover:block"
						on:click={(e) => onDeleteRadar(name)}
					></Button>
					<Button
						icon={mdiContentDuplicate}
						class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white py-1 rounded hidden group-hover:block"
						on:click={(e) => onCopyRadar(name)}
					></Button>
				</div>


					<!-- {#if id == name}
						<a href={name} class="font-bold text-lg"><div class="m-1 p-2 bg-gray-700">{name}</div></a>
					{:else}
						<a href={name} style="color: rgba(255, 255, 255, 0.9);"><div class="m-1 p-2 ">{name}</div></a>
					{/if} -->
				{/each}
			</div>
		</div>
	</svelte:fragment>

	<AppBar title="Evaluation Radar">
		<div slot="actions" class="flex gap-3">

			<Tooltip title="Kind" placement="left" offset={2}>
				<Button icon={mdiWeb} href="https://kindservices.co.uk" class="p-2" target="_blank" />
			</Tooltip>

			<ThemeSelect />

			<Tooltip title="View repository" placement="left" offset={2}>
				<Button
					icon="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
					href="https://github.com/aaronp/eval-radar"
					class="p-2"
					target="_blank"
				/>
			</Tooltip>
		</div>
	</AppBar>

	<main class="p-2">
		<slot />
	</main>
</AppLayout>

<style>
	.arrow {
		cursor: pointer;
		display: inline-block;
	}
</style>