<!--
@component
Display log messages as a scrollable panel
-->
<script lang="ts">
	import { fromUnixTime } from 'date-fns';

	type LogMessage = {
		timestamp: number;
		level: string;
		message: string;
	};

	export let logs: LogMessage[];

	// https://stackoverflow.com/questions/73987081/scroll-to-bottom-of-element-in-sveltekit
	function scrollToBottom(node: HTMLElement) {
		const scroll = () => node.scrollBy(0, node.scrollHeight);
		scroll();
		return { update: scroll };
	}
</script>

<div class="log-panel" use:scrollToBottom={logs}>
	{#each logs as log}
		{@const isoDate = fromUnixTime(log.timestamp).toISOString()}

		<div class="log log-{log.level}">
			<time datetime={isoDate}>
				<span>{isoDate.slice(0, 10)}</span>
				<span>{isoDate.slice(11, 19)}</span>
			</time>

			<span class="message">
				{log.message}
			</span>
		</div>
	{/each}
</div>

<style>
	.log-panel {
		background: black;
		max-height: 70vh;
		overflow-y: scroll;
		font: var(--f-mono-body-regular);
		letter-spacing: var(--f-mono-body-spacing);
		font-size: 12px;
		line-height: 1em;
	}

	.log {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.25rem;
		border-block: 1px solid #222;
		padding: 0.5rem 1rem;
		background: black;
		font-weight: bolder;
	}

	.log-info {
		color: lightgrey;
	}

	.log-trade {
		color: lightgreen;
	}

	.log-warning {
		color: lightyellow;
	}

	.log-error {
		color: lightcoral;
	}

	.log-critical {
		background: red;
		color: white;
	}

	time {
		display: flex;
		flex-direction: column;
		color: #888;
		text-align: right;
	}

	.message {
		white-space: pre-line;
	}
</style>
