<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/breadcrumb/Breadcrumbs.svelte';
	import { BlogPostTimestamp } from '$lib/components';
	import SocialMetaTags from '../SocialMetaTags.svelte';
	import SocialLinks from '../SocialLinks.svelte';
	import BlogPostContent from '../BlogPostContent.svelte';

	export let data: PageData;
</script>

<SocialMetaTags url={$page.url} post={data} />

<Breadcrumbs labels={{ [$page.params.slug]: data.title }} />

<article class="ds-container">
	<header>
		<SocialLinks layout="post" />
		<h1>{data.title}</h1>
		<BlogPostTimestamp publishedAt={data.published_at} />
		<img src={data.feature_image} alt={data.feature_image_alt} />
	</header>

	<BlogPostContent html={data.html} />
</article>

<style>
	article {
		--container-max-width: 720px;
		gap: 2rem;
	}

	header {
		margin-top: 1rem;
		display: grid;
		gap: 1.25rem;
	}

	h1 {
		font: var(--f-h2-medium);
		text-transform: capitalize;
	}

	article img {
		width: 100%;
		aspect-ratio: 1.5;
		min-height: 312px;
		max-height: 400px;
		object-fit: cover;
	}
</style>
