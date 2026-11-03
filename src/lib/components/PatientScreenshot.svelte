<script lang="ts">
  import { onMount } from 'svelte';
  import ResponseHighlights from '$lib/components/ResponseHighlights.svelte';
  import SearchIcon from '$lib/components/SearchIcon.svelte';
  import { watchReducedMotion } from '$lib/motion';
  import type { WrittenTestimonial } from '$lib/data/patient-responses';
  export let item: WrittenTestimonial;
  export let label: string;
  export let duplicate = false;
  export let open: (item: WrittenTestimonial) => void;
  let seen = false, hovering = false, reduced = true;
  onMount(() => watchReducedMotion(value => { reduced = value; }));
  function markOnView(node: HTMLElement) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= .5 && window.matchMedia('(max-width: 767px)').matches) { seen = true; observer.disconnect(); }
    }, { threshold: .5 });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }
</script>

<button class="written-card" type="button" tabindex={duplicate ? -1 : 0} aria-label={`${label}${item.alt ? ': ' + item.alt : ''}`} aria-haspopup="dialog" use:markOnView on:click={() => open(item)} on:pointerenter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) hovering = true; }} on:pointerleave={() => { hovering = false; }} on:focus={() => { hovering = true; }} on:blur={() => { hovering = false; }}>
  <span class="image-frame"><img src={item.image} alt={item.alt} width={item.width || undefined} height={item.height || undefined} loading="lazy" draggable="false" /><ResponseHighlights lines={item.markers} active={seen || hovering || reduced} {reduced} /></span>
  <span class="magnify" aria-hidden="true"><SearchIcon /></span>
</button>

<style>
  .written-card { position: relative; display: block; width: 100%; min-width: 44px; min-height: 44px; padding: 12px; border: 1px solid transparent; border-radius: 16px; background: #fff; box-shadow: 0 8px 24px #233f4e12; align-self: center; cursor: zoom-in; transition: filter var(--dur-estado) var(--ease-calma), opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma), box-shadow var(--dur-estado) var(--ease-calma), border-color var(--dur-estado) var(--ease-calma); }
  .image-frame { position: relative; display: block; width: 100%; } img { display: block; width: 100%; height: auto; border-radius: 5px; }
  .magnify { position: absolute; right: 16px; bottom: 16px; display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid #4083a738; border-radius: 10px; background: #f8f4f0f0; color: #4083a7; box-shadow: 0 3px 12px #233f4e12; opacity: 0; transition: opacity var(--dur-estado) var(--ease-calma); }
  .written-card:focus-visible { outline: 2px solid #4083a7; outline-offset: 4px; } .written-card:focus-visible .magnify { opacity: 1; }
  @media (hover: hover) and (pointer: fine) { .written-card:hover { transform: translateY(-4px) scale(1.035); border-color: #4083a7; box-shadow: 0 18px 38px #233f4e24; } .written-card:hover .magnify { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .written-card, .magnify { transition: none; } .written-card:hover { transform: none; } }
</style>
