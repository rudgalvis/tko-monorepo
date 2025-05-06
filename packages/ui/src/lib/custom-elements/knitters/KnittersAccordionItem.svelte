<svelte:options customElement="knitter-accordion-item" />

<script lang="ts">
	import KnitterReviewsList from './KnitterReviewsList.svelte';
	import KnitterReviewForm from './KnitterReviewForm.svelte';
	import { onMount, getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import ArrowIcon from '../../components/icons/ArrowIcon.svelte';

	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let photo: string | undefined = undefined;
	export let avatar: string | undefined = undefined;

	let initialized = false;
	let isOpen = false;
	let isTransitioning = false;
	let contentEl: HTMLElement;
	let accordionEl: HTMLElement;
	let isLoadIn = false; // If accordion should be opened on load
	let isLoadInComplete = false; // If accordion open was completed

	const toggleAccordion = () => {
		isOpen = !isOpen;
	};

	const scrollToKnitter = (offset: number = 150) => {
		if (!accordionEl) return;

		const elementPosition = accordionEl.getBoundingClientRect().top + window.pageYOffset;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	};

	const onOpen = () => {
		isTransitioning = false;

		if (!contentEl) return;

		if (window.innerWidth >= 1024) scrollToKnitter(114);
		if (window.innerWidth < 1024) scrollToKnitter(52);

		contentEl.style.maxHeight = 'inherit';
		contentEl.removeEventListener('transitionend', onOpen);
	};

	const handleOpen = () => {
		if (!isOpen || !contentEl) return;

		isTransitioning = true;
		contentEl.addEventListener('transitionend', onOpen);

		setTimeout(() => {
			contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
			contentEl.style.transition = `max-height .3s ease`;
		});

		if (!initialized) initialized = true;
	};

	const handleClose = () => {
		if (isOpen || !contentEl) return console.warn('No content element');

		isTransitioning = true;

		// This is needed for max height to be transitioned, if not set, transition will be instant
		if (initialized) contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;

		setTimeout(() => {
			contentEl.style.maxHeight = '0px';
			contentEl.style.transition = `max-height .15s ease`;
		});

		if (!initialized) initialized = true;
	};

	$: if (isOpen) handleOpen();

	$: if (!isOpen) handleClose();

	const handleResize = () => undefined; //(isOpen ? handleOpen() : handleClose());

	const handleLoadInKnitter = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const { knitter } = Object.fromEntries(urlParams.entries());

		if (knitter === id) {
			isLoadIn = true;
			isOpen = true;
		}
	};

	onMount(() => {
		isOpen ? handleOpen() : handleClose();

		handleLoadInKnitter();
	});
</script>

<svelte:window on:resize={handleResize} />

<div class="accordion" bind:this={accordionEl}>
	<div class="header grid" on:click={toggleAccordion}>
		<img class="avatar" src={avatar} alt="Small picture of {name}" />
		<h3>{name}</h3>
		<div class="arrow" class:arrow---down={isOpen}><ArrowIcon /></div>
	</div>

	<div class="content grid" bind:this={contentEl}>
		<p class:fade-in={isOpen} class:fade-out={!isOpen}>{description}</p>

		<img
			class="photo"
			src={photo}
			alt="Picture of {name}"
			class:fade-in={isOpen}
			class:fade-out={!isOpen}
		/>

		{#if id}
			<div class="reviews" class:fade-in={isOpen} class:fade-out={!isOpen}>
				<KnitterReviewsList {id} isFetchBlock={!isOpen || isTransitioning} />
				<KnitterReviewForm {id} />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.accordion {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid black;
	}

	.fade-in {
		opacity: 1;
		transition: opacity 0.3s 0.3s linear;
	}

	.fade-out {
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.grid {
		display: grid;
		grid-template-columns: 65px 1fr 40px;
		align-items: center;
		gap: 25px;

		@media screen and (min-width: 1024px) {
			gap: 40px;
			grid-template-columns: 124px 5fr 3fr 40px;
		}
	}

	.header {
		width: 100%;
		grid-template-areas: 'avatar name arrow';
		cursor: pointer;
		user-select: none;
		position: relative;
		z-index: 1;
		padding: 12px 0;

		@media screen and (min-width: 1024px) {
			grid-template-areas: 'avatar name name arrow';
			padding: 24px 0;
		}
	}

	.content {
		grid-template-rows: auto;
		grid-template-areas:
			'description description description'
			'photo photo photo'
			'reviews reviews reviews';
		overflow: hidden;

		@media screen and (min-width: 1024px) {
			transform: translateY(-144px);
			grid-template-areas:
				'. description photo .'
				'. reviews reviews .';
		}
	}

	.avatar {
		grid-area: avatar;
		border-radius: 100%;
		width: 65px;
		aspect-ratio: 1/1;

		@media screen and (min-width: 1024px) {
			width: 124px;
		}
	}

	h3 {
		grid-area: name;
		font-family: Monument, sans-serif;
		color: black;
		text-transform: uppercase;
		font-weight: 300;
		font-size: 16px;
		letter-spacing: -0.19px;
		line-height: 16px;

		@media screen and (min-width: 1024px) {
			font-size: 28px;
		}
	}

	.arrow {
		justify-self: flex-end;
		font-size: 16px;
		transition: transform 0.3s ease;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		transform: rotate(-180deg);

		&---down {
			transform: rotate(0);
		}

		@media screen and (min-width: 1024px) {
			font-size: 24px;
		}
	}

	p {
		grid-area: description;
		font-family:
			Monument Regular,
			sans-serif;
		font-size: 14px;
		letter-spacing: -0.22px;
		line-height: 20px;
		font-weight: 400;
		max-width: 600px;
		margin: 16px auto 12px;
		color: black;
		transform: translateZ(1px);

		@media screen and (min-width: 1024px) {
			font-size: 20px;
			letter-spacing: -0.32px;
			line-height: 32px;
			padding-right: 40px;
			padding-top: 60px;
			padding-bottom: 60px;
			margin: 0px auto 18px;
		}
	}

	.photo {
		grid-area: photo;
		width: 100%;
		transform: translateZ(1px);
	}

	.reviews {
		grid-area: reviews;
		margin-bottom: 32px;
	}
</style>
