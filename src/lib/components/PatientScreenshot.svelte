<script lang="ts">
  import { onMount } from 'svelte';
  import { scrollContrast } from '$lib/actions/scrollContrast';
  import ResponseHighlights from '$lib/components/ResponseHighlights.svelte';
  import { watchReducedMotion } from '$lib/motion';
  import SearchIcon from '$lib/components/SearchIcon.svelte';
  import type { WrittenTestimonial } from '$lib/data/patient-responses';
  export let item: WrittenTestimonial;
  export let label: string;
  export let duplicate = false;
  export let open: (item: WrittenTestimonial) => void;
  let card: HTMLButtonElement;
  let active = false, reduced = false;
  let highlightsDone = false;
  onMount(() => {
    const observer = new MutationObserver(() => { active = card.classList.contains('scroll-active'); });
    observer.observe(card, { attributes: true, attributeFilter: ['class'] });
    active = card.classList.contains('scroll-active');
    const stop = watchReducedMotion(value => { reduced = value; });
    return () => { observer.disconnect(); stop(); };
  });
</script>

<button bind:this={card} use:scrollContrast={'.written-stories'} class="written-card" class:highlights-done={highlightsDone} type="button" tabindex={duplicate ? -1 : 0} aria-label={`${label}${item.alt ? ': ' + item.alt : ''}`} aria-haspopup="dialog" on:click={() => open(item)}>
  <span class="image-frame"><img src={item.image} alt={item.alt} style:filter={item.cleanBackground ? 'contrast(1.15)' : undefined} width={item.width || undefined} height={item.height || undefined} loading="lazy" draggable="false" /><ResponseHighlights lines={item.markers} {active} {reduced} bind:finished={highlightsDone} /></span>
  <span class="magnify" aria-hidden="true"><SearchIcon /></span>
</button>

<style>
  .written-card { position: relative; display: block; width: 100%; min-width: 44px; min-height: 44px; padding: 11px; border: 2px solid transparent; border-radius: 16px; background: #fff; box-shadow: 0 4px 10px #233f4e16; align-self: center; cursor: zoom-in; transition: filter var(--dur-estado) var(--ease-calma), opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma), box-shadow var(--dur-estado) var(--ease-calma), border-color var(--dur-estado) var(--ease-calma); }
  .image-frame { position: relative; display: block; width: 100%; } img { display: block; width: 100%; height: auto; border-radius: 5px; }
  .magnify { position: absolute; right: 16px; bottom: 16px; display: grid; place-items: center; width: 34px; height: 34px; border: 0; border-radius: 10px; background: #233f4e; color: #fff; box-shadow: 0 3px 12px #233f4e12; opacity: 0; transition: opacity var(--dur-estado) var(--ease-calma); }
  .magnify :global(svg) { filter: drop-shadow(0 1px 2px #071a2566); }
  .written-card:focus-visible { outline: 2px solid #4083a7; outline-offset: 4px; } .written-card:focus-visible .magnify { opacity: 1; }
  @media (min-width: 768px) and (hover: hover) and (pointer: fine) { .written-card:hover { transform: translateY(-4px) scale(1.035); background: #fff; border-color: #4083a740; box-shadow: 0 3px 12px #233f4e08; } .written-card:hover .magnify { opacity: 1; } }
  @media (max-width: 767px) {
    .written-card:global(.scroll-active) { border-color: transparent; box-shadow: 0 3px 12px #233f4e08; }
    .written-card:global(.scroll-active).highlights-done .magnify { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) { .written-card, .magnify { transition: none; } .written-card:hover { transform: none; } }
</style>
