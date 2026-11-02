<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { standardEntry } from '$lib/actions/standardEntry';
  import { draggableMarquee } from '$lib/actions/draggableMarquee';
  import { watchReducedMotion } from '$lib/motion';
  import type { Language } from '$lib/i18n/copy';
  import { writtenTestimonials, testimonialChapters, type WrittenTestimonial } from '$lib/data/patient-responses';
  import { testimonialUi } from '$lib/data/testimonial-copy';
  import PatientScreenshot from '$lib/components/PatientScreenshot.svelte';
  import ScreenshotModal from '$lib/components/ScreenshotModal.svelte';
  export let pageLanguage: Language = 'es';
  let mobile = false, reduced = true, paused = false, filter = 0, limit = 12, openFilter = false;
  let filterRoot: HTMLDivElement, filterButton: HTMLButtonElement;
  let enlarged: WrittenTestimonial | null = null;
  $: copy = testimonialUi[pageLanguage];
  $: filtered = filter === 0 ? writtenTestimonials : writtenTestimonials.filter(item => item.chapter === testimonialChapters[filter - 1]);
  $: marquee = filter === 0 && !mobile && !reduced;
  $: rows = testimonialChapters.map(chapter => writtenTestimonials.filter(item => item.chapter === chapter));
  $: displayed = filtered.slice(0, limit);
  onMount(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => { mobile = media.matches; limit = mobile ? 5 : 12; };
    sync(); media.addEventListener('change', sync);
    const stop = watchReducedMotion(value => { reduced = value; });
    return () => { media.removeEventListener('change', sync); stop(); };
  });
  function select(index: number) { filter = index; limit = mobile ? 5 : 12; openFilter = false; if (mobile) filterButton?.focus(); }
  function outside(event: PointerEvent) { if (openFilter && event.target instanceof Node && !filterRoot?.contains(event.target)) openFilter = false; }
  async function filterKey(event: KeyboardEvent, index = filter) {
    if (event.key === 'Escape') { openFilter = false; filterButton.focus(); return; }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); openFilter = true; await tick();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (index + (event.key === 'ArrowDown' ? 1 : -1) + 4) % 4;
    filterRoot.querySelectorAll<HTMLButtonElement>('[role="option"]')[next]?.focus();
  }
  function open(item: WrittenTestimonial) { enlarged = item; }
</script>

<svelte:window on:pointerdown={outside} />
<div class="written-stories">
  <div class="desktop-filters" aria-label={copy.filter} use:standardEntry>
    {#each copy.filters as label, index}<button type="button" class:active={filter === index} aria-pressed={filter === index} on:click={() => select(index)}>{label}</button>{/each}
  </div>
  <div class="mobile-filter" bind:this={filterRoot} use:standardEntry>
    <button class="filter-toggle" type="button" bind:this={filterButton} aria-haspopup="listbox" aria-expanded={openFilter} aria-controls="written-filter-options" on:click={() => { openFilter = !openFilter; }} on:keydown={event => filterKey(event)}>{copy.filter} {copy.filters[filter]} <span class:rotated={openFilter} aria-hidden="true">▾</span></button>
    {#if openFilter}<div class="filter-options" id="written-filter-options" role="listbox" aria-label={copy.filter}>
      {#each copy.filters as label, index}<button type="button" role="option" aria-selected={filter === index} tabindex={filter === index ? 0 : -1} on:click={() => select(index)} on:keydown={event => filterKey(event, index)}>{label}</button>{/each}
    </div>{/if}
  </div>
  {#if marquee}
    <div class="motion-control"><button type="button" aria-pressed={paused} on:click={() => { paused = !paused; }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{#if paused}<path d="m9 5 11 7-11 7Z" />{:else}<path d="M8 5v14M16 5v14" />{/if}</svg>{paused ? copy.resume : copy.pause}</button></div>
    <div class="marquee" class:paused>
      {#each rows as row, index}
        <!-- Arrow-key navigation is provided by draggableMarquee. -->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div class="marquee-window" role="region" aria-label={copy.filters[index + 1]} tabindex="0" use:standardEntry use:draggableMarquee={{ paused: paused || Boolean(enlarged), reverse: index % 2 === 1 }}><div class="marquee-track">
          {#each [false, true] as duplicate}<div class="marquee-copy" aria-hidden={duplicate}>
            {#each row as item (item.image)}<PatientScreenshot {item} label={copy.expand} {duplicate} {open} />{/each}
          </div>{/each}
        </div></div>
      {/each}
    </div>
  {:else}
    {#key filter}
      <div class="written-grid">
        {#each displayed as item, index (item.image)}<div use:standardEntry={index}><PatientScreenshot {item} label={copy.expand} {open} /></div>{/each}
      </div>
    {/key}
    {#if limit < filtered.length}<button class="more-stories" type="button" on:click={() => { limit += mobile ? 4 : 12; }}>{copy.more}</button>{/if}
  {/if}
</div>
{#if enlarged}<ScreenshotModal item={enlarged} {pageLanguage} close={() => { enlarged = null; }} />{/if}

<style>
  .written-stories { margin-top: 2rem; }
  .desktop-filters { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.5rem; }
  .desktop-filters button, .more-stories { min-height: 44px; padding: .65rem 1.25rem; border: 1px solid rgba(35,63,78,.25); border-radius: 999px; font-size: 14px; font-weight: 400; color: #233f4e; transition: background var(--dur-estado) var(--ease-calma), color var(--dur-estado) var(--ease-calma); }
  .desktop-filters .active { background: #233f4e; color: #fff; }
  .mobile-filter { display: none; }
  .written-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; align-items: start; }
  .more-stories { display: block; margin: 2rem auto 0; }
  .motion-control { display: flex; justify-content: flex-end; margin-bottom: .75rem; }
  .motion-control button { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: .6rem 1rem; font-size: 13px; font-weight: 500; border: 1px solid #4083a740; border-radius: 999px; background: #fff; color: #233f4e; box-shadow: 0 3px 12px #233f4e08; transition: background var(--dur-estado) var(--ease-calma), border-color var(--dur-estado) var(--ease-calma); }
  .motion-control svg { width: 18px; height: 18px; color: #4083a7; }
  .motion-control button[aria-pressed="true"] { background: #e8e8f6; border-color: #4083a7; }
  .marquee-window { overflow: hidden; padding: 20px 0 24px; cursor: grab; touch-action: pan-y; user-select: none; }
  .marquee-window:global(.is-dragging), .marquee-window:global(.is-dragging) :global(.written-card) { cursor: grabbing; }
  .marquee-window:focus-visible { outline: 2px solid #4083a7; outline-offset: 2px; }
  .marquee-track { display: flex; width: max-content; will-change: transform; }
  .marquee-copy { display: flex; gap: 24px; padding-right: 24px; align-items: start; }
  .marquee-copy :global(.written-card) { width: 260px; flex: 0 0 260px; }
  button:focus-visible { outline: 2px solid #4083a7; outline-offset: 4px; }
  @media (max-width: 767px) {
    .desktop-filters { display: none; }
    .mobile-filter { display: block; position: relative; z-index: 2; margin-bottom: 1.5rem; }
    .filter-toggle { display: flex; justify-content: space-between; align-items: center; width: 100%; min-height: 48px; padding: .5rem 1rem; border: 1px solid rgba(35,63,78,.25); border-radius: 12px; background: #fff; font-size: 15px; }
    .filter-toggle span { transition: transform var(--dur-estado) var(--ease-calma); } .filter-toggle span.rotated { transform: rotate(180deg); }
    .filter-options { position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: #fff; padding: 6px; border-radius: 12px; box-shadow: 0 12px 32px #233f4e26; }
    .filter-options button { display: block; width: 100%; text-align: left; min-height: 48px; padding: .5rem .75rem; border-radius: 8px; font-size: 15px; }
    .filter-options [aria-selected="true"] { background: #233f4e; color: #fff; }
    .written-grid { grid-template-columns: minmax(0, 1fr); }
  }
  @media (prefers-reduced-motion: reduce) { .filter-toggle span, .desktop-filters button, .more-stories, .motion-control button { transition: none; } }
</style>
