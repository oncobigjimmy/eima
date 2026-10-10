<script lang="ts">
  import { onMount } from 'svelte';
  import PatientQuoteLines from '$lib/components/PatientQuoteLines.svelte';
  import CloseIcon from '$lib/components/CloseIcon.svelte';
  import { watchReducedMotion } from '$lib/motion';
  import { dialog } from '$lib/actions/dialog';
  import type { PatientResponse } from '$lib/data/patient-responses';

  export let items: PatientResponse[];
  export let id: string;
  export let previousLabel: string;
  export let nextLabel: string;
  export let positionLabel: string;
  export let expandLabel: string;
  export let closeLabel: string;

  let position = 0;
  let target = 0;
  let settled = false;
  let filled = false;
  let nearby = false;
  let reduced = false;
  let stage: HTMLDivElement;
  let stageWidth = 1072;
  let desktop = false;
  let frame = 0;
  let pointer: { id: number; x: number; y: number; start: number; horizontal: boolean } | null = null;
  let dragging = false;
  let suppressClick = false;
  let enlarged: PatientResponse | null = null;

  const wrap = (value: number) => ((value % items.length) + items.length) % items.length;
  $: looping = items.length >= 4;
  $: activeIndex = items.length ? wrap(Math.round(target)) : 0;
  $: active = items[activeIndex];
  $: cardWidth = desktop ? Math.min(320, stageWidth * .225) : Math.min(230, stageWidth * .52);
  // Reserve the tallest rendered screenshot in this row, independently of the
  // active slide. Shorter captures then fit without changing the carousel height.
  $: imageHeightLimit = desktop ? 320 : Math.max(220, Math.min(260, stageWidth * 2 / 3));
  $: rowImageHeight = Math.max(0, ...items.map(item => Math.min(imageHeightLimit, cardWidth * item.height / item.width)));
  $: rowStageHeight = Math.ceil(rowImageHeight * 1.045 + cardWidth * .022 + (desktop ? 40 : 32));
  // Seven visual slots give desktop three neighbours on each side. The outer
  // slots can repeat the start/end of a short circular list; the data stays unique.
  $: radius = desktop && looping ? 3 : Math.floor((Math.min(items.length, 7) - 1) / 2);
  $: slots = looping
    ? Array.from({ length: radius * 2 + 1 }, (_, i) => Math.round(position) + i - radius)
    : items.map((_, i) => i);

  function scaleAt(distance: number) {
    return distance < 1 ? 1 - distance * .24 : Math.max(.54, .76 - (distance - 1) * .06);
  }

  // Integrate each scaled card's width, so spacing stays natural during movement.
  function offsetAt(distance: number, width: number) {
    const amount = Math.abs(distance);
    let offset = 0;
    for (let k = 0; k < amount; k++) {
      const step = (scaleAt(k) + scaleAt(k + 1)) * width / 2 + width * (desktop ? .10 : .08);
      offset += step * Math.min(1, amount - k);
    }
    return Math.sign(distance) * offset;
  }

  function slotStyle(slot: number, currentPosition: number, width: number) {
    const distance = slot - currentPosition;
    const amount = Math.abs(distance);
    return `width:${width}px;transform:translate(calc(-50% + ${offsetAt(distance, width)}px),calc(-50% + ${Math.min(amount, 2) * 7}px)) scale(${scaleAt(amount)});opacity:${Math.max(0, 1 - amount * .2)};filter:blur(${Math.min(6, Math.max(0, amount - .35) * 2.2)}px);z-index:${Math.round(100 - amount * 10)};`;
  }

  function finish() {
    position = target;
    settled = true;
    filled = reduced;
    frame = 0;
  }

  function go(next: number) {
    if (!items.length) return;
    // Explicit navigation needs the images even before the visibility callback.
    nearby = true;
    if (frame) cancelAnimationFrame(frame);
    target = looping ? Math.round(next) : Math.max(0, Math.min(items.length - 1, Math.round(next)));
    settled = false;
    filled = false;
    if (reduced || !nearby) { finish(); return; }
    const from = position;
    const start = performance.now();
    const duration = 450;
    function step(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      position = from + (target - from) * (1 - Math.pow(1 - progress, 4));
      if (progress < 1) frame = requestAnimationFrame(step);
      else finish();
    }
    frame = requestAnimationFrame(step);
  }

  function keydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      go(target + (event.key === 'ArrowRight' ? 1 : -1));
    } else if (!looping && (event.key === 'Home' || event.key === 'End')) {
      event.preventDefault();
      go(event.key === 'Home' ? 0 : items.length - 1);
    }
  }

  function pointerDown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0 || items.length < 2) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, start: position, horizontal: false };
    suppressClick = false;
  }

  function pointerMove(event: PointerEvent) {
    if (!pointer || event.pointerId !== pointer.id) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (!pointer.horizontal) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { pointer = null; return; }
      if (Math.abs(dx) < 8) return;
      pointer.horizontal = true;
      stage.setPointerCapture(event.pointerId);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      settled = false;
      filled = false;
      dragging = true;
      suppressClick = true;
    }
    const next = pointer.start - dx / (cardWidth * .9);
    position = looping ? next : Math.max(-.2, Math.min(items.length - .8, next));
  }

  function pointerEnd(event: PointerEvent, cancel = false) {
    if (!pointer || event.pointerId !== pointer.id) return;
    const { horizontal, start, x } = pointer;
    pointer = null;
    dragging = false;
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    if (!horizontal) return;
    const dx = event.clientX - x;
    const next = cancel ? Math.round(start) : Math.abs(dx) > 40
      ? Math.round(position === start ? start : position) === Math.round(start)
        ? Math.round(start) - Math.sign(dx) : Math.round(position)
      : Math.round(start);
    go(next);
  }

  function select(slot: number) {
    if (suppressClick) { suppressClick = false; return; }
    if (slot !== target) go(slot);
    else if (settled) enlarged = active;
  }

  onMount(() => {
    const stopMotion = watchReducedMotion(value => {
      reduced = value;
      if (value && frame) { cancelAnimationFrame(frame); finish(); }
      if (value) filled = true;
    });
    const breakpoint = window.matchMedia('(min-width: 768px)');
    const updateBreakpoint = () => { desktop = breakpoint.matches; };
    updateBreakpoint();
    breakpoint.addEventListener('change', updateBreakpoint);
    const resize = new ResizeObserver(([entry]) => { stageWidth = entry.contentRect.width; });
    resize.observe(stage);
    const intersection = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { nearby = true; settled = true; intersection.disconnect(); }
    }, { rootMargin: '160px' });
    intersection.observe(stage);
    return () => { stopMotion(); breakpoint.removeEventListener('change', updateBreakpoint); resize.disconnect(); intersection.disconnect(); if (frame) cancelAnimationFrame(frame); };
  });
</script>

<div class="response-carousel" style={`--row-image-height:${rowImageHeight}px;--row-stage-height:${rowStageHeight}px`} role="region" aria-roledescription="carousel" aria-labelledby={`${id}-title`}>
  <div class="carousel-controls">
    <button type="button" class="carousel-arrow" data-direction="previous" aria-label={previousLabel} aria-controls={`${id}-stage`} disabled={items.length < 2 || (!looping && target === 0)} on:click={() => go(target - 1)} on:keydown={keydown}>
      <span class="arrow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5m6-6-6 6 6 6" /></svg><svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5m6-6-6 6 6 6" /></svg></span>
    </button>
    <span class="carousel-position" aria-live="polite" aria-atomic="true">{activeIndex + 1} {positionLabel} {items.length}</span>
    <button type="button" class="carousel-arrow" data-direction="next" aria-label={nextLabel} aria-controls={`${id}-stage`} disabled={items.length < 2 || (!looping && target === items.length - 1)} on:click={() => go(target + 1)} on:keydown={keydown}>
      <span class="arrow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
    </button>
  </div>
  <div class="carousel-window">
    <div id={`${id}-stage`} class="carousel-stage" class:dragging bind:this={stage} role="group" aria-label={active?.alt} on:pointerdown={pointerDown} on:pointermove={pointerMove} on:pointerup={(event) => pointerEnd(event)} on:pointercancel={(event) => pointerEnd(event, true)}>
      {#each slots as slot (slot)}
        {@const item = items[wrap(slot)]}
        <button type="button" class="response-slot" style={slotStyle(slot, position, cardWidth)} aria-label={slot === target ? `${item.alt}. ${expandLabel}` : item.alt} aria-haspopup={slot === target ? 'dialog' : undefined} aria-current={slot === target ? 'true' : undefined} tabindex={slot === target ? 0 : -1} on:click={() => select(slot)} on:keydown={keydown}>
          <span class="response-card" class:centered={settled && slot === target}>
            {#if nearby && item.image}
              <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading={Math.abs(slot - position) <= 1 ? 'eager' : 'lazy'} fetchpriority={slot === target ? 'high' : 'auto'} decoding="async" draggable="false" />
            {:else}
              <span class="image-placeholder" style={`aspect-ratio:${item.width}/${item.height}`} aria-hidden="true"></span>
            {/if}
          </span>
        </button>
      {/each}
    </div>
  </div>
  <div class="highlight-space" aria-live="polite" aria-atomic="true">
    {#if active && nearby}
      {#key `${active.id}-${active.highlight}-${settled}`}
        <blockquote class="response-highlight" class:filled class:pending={!settled} aria-hidden={!settled}>
          <span class="highlight-base"><PatientQuoteLines text={`“${active.highlight}”`} /></span>
          <span class="highlight-fill" aria-hidden="true" on:animationend={() => { filled = true; }}>“{active.highlight}”</span>
        </blockquote>
      {/key}
    {/if}
  </div>
</div>

{#if enlarged}
  <div class="response-modal" role="presentation" on:click={() => { enlarged = null; }}>
    <div class="response-modal-panel" use:dialog={{ close: () => { enlarged = null; } }} role="dialog" aria-modal="true" aria-label={expandLabel} tabindex="-1" on:click|stopPropagation on:keydown|stopPropagation>
      <button class="response-modal-close eima-close" type="button" aria-label={closeLabel} on:click={() => { enlarged = null; }}><CloseIcon /></button>
      <img src={enlarged.image} alt={enlarged.alt} width={enlarged.width} height={enlarged.height} />
    </div>
  </div>
{/if}

<style>
  .response-carousel { --quote-color: var(--color-brand-soft); --quote-neutral: #233f4e; }
  .carousel-controls { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 0 auto .25rem; }
  .carousel-arrow { display: grid; place-items: center; width: 52px; height: 52px; border: 1px solid color-mix(in srgb, var(--color-brand-soft) 40%, transparent); border-radius: var(--radius-pill); color: var(--color-brand-soft); background: color-mix(in srgb, var(--color-inverse) 65%, transparent); transition: background 250ms ease, box-shadow 250ms ease; }
  .carousel-arrow svg { width: 25px; height: 25px; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
  .arrow-icon { display: grid; place-items: center; }
  .arrow-icon svg:last-child { display: none; }
  .carousel-arrow:hover:not(:disabled) { background: var(--color-brand-accent); box-shadow: 0 4px 16px #233f4e1f; }
  .carousel-arrow:disabled { opacity: .45; }
  .carousel-arrow:focus-visible, .response-slot:focus-visible { outline: 2px solid var(--quote-color); outline-offset: 5px; }
  .carousel-position { min-width: 4rem; text-align: center; color: var(--quote-neutral); font-size: 13px; font-variant-numeric: tabular-nums; }
  .carousel-window { overflow: hidden; padding: 0; mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
  .carousel-stage { isolation: isolate; position: relative; width: 100%; height: 305px; touch-action: pan-y pinch-zoom; user-select: none; cursor: grab; }
  .carousel-stage.dragging { cursor: grabbing; }
  .response-slot { position: absolute; left: 50%; top: 50%; border: 0; padding: 0; background: transparent; transform-origin: center; }
  .response-card { display: block; padding: 10px; border: 1px solid color-mix(in srgb, var(--color-brand) 10%, transparent); border-radius: var(--radius-card); background: var(--color-inverse); box-shadow: 0 10px 28px #233f4e1f; transition: transform 650ms cubic-bezier(.3,.9,.3,1), box-shadow 650ms ease, border-color 650ms ease; }
  .response-card.centered { transform: rotate(1.2deg) scale(1.045); border-color: var(--eima-card-hover-border); box-shadow: 0 18px 36px #233f4e26, 0 0 22px #8cd0d64d; }
  .response-card img { display: block; width: auto; height: auto; max-width: 100%; max-height: 245px; margin: auto; border-radius: calc(var(--radius-card) - 3px); pointer-events: none; }
  .image-placeholder { display: block; width: 100%; max-height: 245px; border-radius: calc(var(--radius-card) - 3px); background: color-mix(in srgb, var(--color-brand-accent) 18%, var(--color-surface)); }
  .highlight-space { display: grid; place-items: start center; min-height: 4rem; padding: 0 1.5rem; }
  .response-highlight { display: grid; margin: 0 auto; max-width: 720px; text-align: center; font-size: clamp(1.05rem, 1.7vw, 1.3rem); font-weight: 400; line-height: 1.55; text-wrap: balance; animation: quote-appear 450ms ease both; }
  .highlight-base, .highlight-fill { grid-area: 1 / 1; }
  .highlight-base { color: var(--quote-neutral); }
  .highlight-fill { color: var(--quote-color); clip-path: inset(100% 0 0); animation: quote-fill 1050ms 220ms cubic-bezier(.25,.6,.3,1) forwards; }
  .response-highlight.filled { font-weight: 700; }
  .response-highlight.pending { visibility: hidden; animation: none; }
  .response-modal { position: fixed; z-index: 300; inset: 0; display: grid; align-items: start; justify-items: center; overflow-y: auto; background: #071a25a3; -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); padding: 4rem 1rem 2rem; }
  .response-modal-panel { position: relative; width: min(720px, 100%); padding: 12px; border-radius: var(--radius-card); background: var(--color-inverse); }
  .response-modal-panel img { display: block; width: 100%; height: auto; border-radius: calc(var(--radius-card) - 3px); }
  .response-modal-close { position: sticky; top: 0; z-index: 1; display: block; width: 44px; height: 44px; margin: -2px 0 10px auto; border-radius: var(--radius-pill); background: var(--color-brand); color: var(--color-inverse); font-size: 30px; line-height: 1; }
  .response-modal-close:focus-visible { outline: 2px solid var(--color-brand-soft); outline-offset: 4px; }
  @keyframes quote-fill { to { clip-path: inset(0); } }
  @keyframes quote-appear { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
  :global(.patient-row--dark) .response-carousel { --quote-color: var(--color-brand-accent); --quote-neutral: #e8e8f6; }
  :global(.patient-row--dark) .carousel-arrow { color: var(--color-brand-accent); border-color: #8cd0d670; background: #ffffff08; }
  :global(.patient-row--dark) .carousel-arrow:hover:not(:disabled) { color: var(--color-brand); background: var(--color-brand-accent); }
  :global(.patient-row--dark) .response-card { background: var(--eima-card-hover-background); border-color: #ffffff20; }
  :global(.patient-row--dark) .response-card.centered { border-color: var(--eima-card-hover-border); box-shadow: var(--eima-card-hover-shadow); }
    .carousel-controls { gap: 12px; margin-bottom: 0; }
    .carousel-arrow { width: 48px; height: 48px; color: #233f4e; border: 0; background: #8cd0d6; transition: background 250ms ease, border-color 250ms ease, border-width 250ms ease, transform 250ms ease, box-shadow 300ms ease-out; }
    .carousel-position { min-width: 48px; font-size: 14px; }
    .carousel-arrow:hover:not(:disabled), .carousel-arrow:focus-visible:not(:disabled) { color: #ffffff; background: #4083a7; border: 0; box-shadow: 0 10px 24px #233f4e24; transform: translateY(-2px); }
    .carousel-arrow:active:not(:disabled) { transform: translateY(0) scale(.96); }
    .arrow-icon { position: relative; display: block; width: 21px; height: 21px; overflow: hidden; }
    .arrow-icon svg, .arrow-icon svg:last-child { display: block; position: absolute; inset: 0; width: 21px; height: 21px; stroke-width: 1.5; transition: transform 450ms cubic-bezier(.3,.9,.3,1); }
    .carousel-arrow[data-direction='next'] .arrow-icon svg:last-child { transform: translateX(-150%); }
    .carousel-arrow[data-direction='previous'] .arrow-icon svg:last-child { transform: translateX(150%); }
    .carousel-arrow[data-direction='next']:is(:hover, :focus-visible) .arrow-icon svg:first-child { transform: translateX(150%); }
    .carousel-arrow[data-direction='previous']:is(:hover, :focus-visible) .arrow-icon svg:first-child { transform: translateX(-150%); }
    .carousel-arrow:is(:hover, :focus-visible) .arrow-icon svg:last-child { transform: translateX(0); }
    .carousel-arrow:is(:hover, :focus-visible) .arrow-icon svg { stroke-width: 2.25; }
    /* Horizontal clipping belongs to the whole section. Keeping this window
       open lets the image's shadow fade naturally above the caption. */
    .carousel-window { overflow: visible; mask-image: none; }
    .carousel-stage { height: var(--row-stage-height); }
    .response-slot { top: 50%; }
    .response-card { display: flex; align-items: center; justify-content: center; width: 100%; height: var(--row-image-height); padding: 0; border: 0; background: transparent; box-shadow: none; filter: drop-shadow(0 18px 24px #233f4e12); transition: transform 650ms cubic-bezier(.3,.9,.3,1), filter 650ms ease; }
    .response-card.centered { border: 0; box-shadow: none; filter: drop-shadow(0 24px 30px #233f4e1c) drop-shadow(0 12px 32px #8cd0d613); }
    .response-card img { width: auto; height: auto; max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 10px; }
    .image-placeholder { width: 100%; height: 100%; max-height: none; background: transparent; }
    .response-highlight { max-width: none; font-family: 'Fraunces', Georgia, serif; font-size: 18px; font-weight: 300; animation: desktop-quote-appear 400ms cubic-bezier(.25,.6,.3,1) both; }
    .response-highlight.filled { font-weight: 300; }
    .highlight-base { min-width: 0; font-family: inherit; color: var(--quote-color); }
    .highlight-fill { display: none; }
    .highlight-space { min-height: 0; padding-top: 8px; }
    :global(.patient-row--dark) .carousel-arrow { color: #233f4e; border: 0; background: #8cd0d6; }
    :global(.patient-row--dark) .carousel-arrow:hover:not(:disabled), :global(.patient-row--dark) .carousel-arrow:focus-visible:not(:disabled) { background: #4083a7; color: #ffffff; border: 0; box-shadow: 0 10px 24px #ffffff24; }
    :global(.patient-row--dark) .response-card { background: transparent; border: 0; filter: drop-shadow(0 22px 30px #071a252d); }
    :global(.patient-row--dark) .response-card.centered { border: 0; box-shadow: none; filter: drop-shadow(0 24px 34px #071a2538) drop-shadow(0 0 24px #ffffff1c) drop-shadow(0 12px 32px #8cd0d623); }
    .response-modal { align-items: center; overflow: hidden; padding: 4rem 2rem 2rem; }
    .response-modal-panel { width: fit-content; max-width: 90vw; padding: 0; background: transparent; }
    .response-modal-panel img { width: auto; max-width: min(720px, 86vw); max-height: calc(100dvh - 140px); object-fit: contain; box-shadow: 0 20px 50px #071a2560; }
    .response-modal-close { position: absolute; top: -54px; right: 0; margin: 0; }
  @keyframes desktop-quote-appear { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @media (min-width: 768px) {
    .response-highlight { font-size: clamp(13.5px, 1.758vw, 18px); white-space: nowrap; text-wrap: nowrap; }
  }
  @media (max-width: 767px) {
    .response-highlight { width: 100%; height: 3.1em; font-size: 16px; white-space: normal; text-wrap: balance; }
    .highlight-space { padding: 8px 1.25rem 0; }
    .response-modal { padding: 4rem 1.25rem 1.5rem; }
    .response-modal-panel { max-width: 100%; }
    .response-modal-panel img { max-width: calc(100vw - 2.5rem); max-height: calc(100dvh - 120px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .response-card, .carousel-arrow { transition: none; }
    .response-card.centered { transform: none; }
    .response-highlight, .highlight-fill { animation: none; }
    .highlight-fill { clip-path: none; }
    .arrow-icon svg, .arrow-icon svg:last-child { transition: none; }
  }
</style>
