<!--
@component
Used to display tabs and associated component content panels

#### Usage
```tsx
	<Tabs tabs={[
		{ id: 'overview', title: 'Overview', component: OverviewComponent },
		{ id: 'details', title: 'Details', component: DetailsComponent }
	]} />
```
-->
<script lang="ts">
	type TabItem = {
		id: string;
		title: string;
		component: ConstructorOfATypedSvelteComponent;
	};

	export let tabs: TabItem[] = [];

	$: tabsNameUID = `tabs-${(Math.random() + 1).toString(36).substring(7)}`;
</script>

<section id={tabsNameUID}>
	{#each tabs as tab, i}
		<input id="{tab.id}-tab-trigger" type="radio" name={tabsNameUID} checked={i === 0 ? true : null} />
		<label for="{tab.id}-tab-trigger"> {tab.title} </label>
	{/each}

	{#each tabs as tab}
		<div class="tab" id="{tab.id}-tab">
			<svelte:component this={tab.component} />
		</div>
	{/each}
</section>

<style>
	section {
		padding: 1.25rem 0;
	}

	input {
		display: none;
	}

	input:checked + label {
		background: var(--c-background-4);
		color: var(--c-text-default);
	}

	label {
		border-radius: 1.25rem;
		color: var(--c-text-extra-light);
		cursor: pointer;
		padding: 1rem;
		font: var(--f-ui-lg-medium);
	}

	input:nth-of-type(1):checked ~ .tab:not(:nth-of-type(1)) {
		display: none !important;
	}

	input:nth-of-type(2):checked ~ .tab:not(:nth-of-type(2)) {
		display: none !important;
	}
</style>
