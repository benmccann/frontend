<script lang="ts">
	import { formatAmount } from '$lib/helpers/formatters';
	import { formatDistanceToNowStrict } from 'date-fns';

	export let title: string;
	export let count: number;
	export let timestamp: string | undefined;
</script>

<div class="tile">
	{#if timestamp}
		<time datetime={timestamp}>
			{formatDistanceToNowStrict(Date.parse(`${timestamp}Z`), { addSuffix: true })}
		</time>
	{/if}
	<h3>{formatAmount(count)}</h3>
	<div class="title">{title}</div>
</div>

<style lang="postcss">
	.tile {
		display: grid;
		align-content: center;
		justify-items: center;
		border-radius: 0.5rem;
		padding: 1.25rem;
		background: var(--c-background-1-v1);

		@media (--viewport-md-down) {
			align-content: end;
			justify-items: start;
		}
	}

	time {
		margin-bottom: 0.625rem;
		font: var(--f-ui-large-medium);
		color: var(--c-text-4-v1);

		@media (--viewport-md-down) {
			margin-bottom: 0.25rem;
			font: var(--f-ui-body-medium);
			letter-spacing: 0.01em;
			color: var(--c-text-1-v1);
		}
	}

	.tile h3 {
		font: var(--f-h3-bold);
		margin-bottom: 0.25rem;

		@media (--viewport-md-down) {
			font: var(--f-h4-bold);
			color: var(--c-text-2-v1);
		}
	}

	.title {
		font: var(--f-ui-lg-roman);
		letter-spacing: var(--f-ui-lg-spacing, normal);

		@media (--viewport-md-down) {
			font: var(--f-ui-small-medium);
		}
	}
</style>
