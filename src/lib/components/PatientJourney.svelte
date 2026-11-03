<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { watchReducedMotion } from '$lib/motion';
  import { standardEntry } from '$lib/actions/standardEntry';
  import { getWhatsAppHref, type Language } from '$lib/i18n/copy';
  import { selectedSituation } from '$lib/data/situation';
  import { testimonialUi } from '$lib/data/testimonial-copy';
  import { testimonialChapters, getFeaturedTestimonials, patientProofCopy, type WrittenTestimonial } from '$lib/data/patient-responses';
  import { getRoutePath } from '$lib/i18n/routes';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import ScreenshotModal from '$lib/components/ScreenshotModal.svelte';
  import CarouselControls from '$lib/components/CarouselControls.svelte';
  import SearchIcon from '$lib/components/SearchIcon.svelte';
  export let pageLanguage: Language = 'es';
  type Slide = { kind: 'response'; item: WrittenTestimonial } | { kind: 'bridge1' | 'bridge2' | 'final' };
  const slides: Slide[] = [
    ...getFeaturedTestimonials('recupera').map(item => ({ kind: 'response' as const, item })), { kind: 'bridge1' },
    ...getFeaturedTestimonials('dificiles').map(item => ({ kind: 'response' as const, item })), { kind: 'bridge2' },
    ...getFeaturedTestimonials('acompanamos').map(item => ({ kind: 'response' as const, item })), { kind: 'final' }
  ];
  let current = 0, markerActive = true;
  let chapterProgress = [100 / 3, 0, 0];
  let sectionVisible = false;
  function seeJourney(node: HTMLElement) {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { sectionVisible = true; observer.disconnect(); } }, { threshold: .12 });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }
  let markerTimer: ReturnType<typeof setTimeout>;
  let enlarged: WrittenTestimonial | null = null;
  let startX = 0, startY = 0, swiping = false, suppressClick = false;
  let dragOffset = 0, dragging = false, step = 350, reduced = false;
  let pointerId: number | null = null;
  let stage: HTMLDivElement;
  let clickTimer: ReturnType<typeof setTimeout> | undefined;
  onMount(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const sync = () => { step = mobile.matches ? 262 : 350; };
    sync(); mobile.addEventListener('change', sync);
    const stopMotion = watchReducedMotion(value => { reduced = value; if (value) dragOffset = 0; });
    return () => { mobile.removeEventListener('change', sync); stopMotion(); };
  });
  $: copy = testimonialUi[pageLanguage];
  $: proofCopy = patientProofCopy[pageLanguage];
  $: whatsappHref = getWhatsAppHref(pageLanguage, false, $selectedSituation);
  $: chapter = Math.min(2, Math.floor(current / 4));
  function go(index: number) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === current) return;
    current = next; markerActive = false; clearTimeout(markerTimer);
    const activeChapter = Math.min(2, Math.floor(current / 4));
    chapterProgress = chapterProgress.map((progress, index) => index < activeChapter ? 100 : index === activeChapter ? Math.max(progress, Math.min(100, ((current % 4) + 1) / 3 * 100)) : progress);
    markerTimer = setTimeout(() => { markerActive = true; }, 0);
  }
  function keyboard(event: KeyboardEvent) {
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      event.preventDefault(); go(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }
  function pointerDown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0) return;
    clearTimeout(clickTimer);
    pointerId = event.pointerId;
    startX = event.clientX; startY = event.clientY;
    swiping = true; suppressClick = false;
  }
  function pointerMove(event: PointerEvent) {
    if (!swiping || pointerId !== event.pointerId) return;
    const dx = event.clientX - startX, dy = event.clientY - startY;
    if (!dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { swiping = false; pointerId = null; return; }
      if (Math.abs(dx) < 8) return;
      dragging = true; suppressClick = true;
      stage?.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    const minimum = -(slides.length - 1 - current) * step, maximum = current * step;
    const resisted = dx < minimum ? minimum + (dx - minimum) * .2 : dx > maximum ? maximum + (dx - maximum) * .2 : dx;
    dragOffset = reduced ? 0 : resisted;
  }
  function pointerUp(event: PointerEvent) {
    if (!swiping || pointerId !== event.pointerId) return;
    const dx = event.clientX - startX, dy = event.clientY - startY;
    swiping = false; dragging = false; dragOffset = 0; pointerId = null;
    if (stage?.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick = true;
      const steps = Math.max(1, Math.round(Math.abs(dx) / step));
      go(current + (dx < 0 ? steps : -steps));
    }
    clickTimer = setTimeout(() => { suppressClick = false; }, 0);
  }
  function pointerCancel(event: PointerEvent) {
    if (pointerId !== event.pointerId) return;
    swiping = false; dragging = false; dragOffset = 0; pointerId = null; suppressClick = false;
    if (stage?.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  }
  function captureClick(event: MouseEvent) {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
  }
  function phrase(item: WrittenTestimonial) { return item.quote[pageLanguage] ?? item.caption[pageLanguage]; }
  function phraseParts(item: WrittenTestimonial) {
    const text = phrase(item), highlight = item.highlight[pageLanguage];
    return highlight && text.includes(highlight) ? [text.slice(0, text.indexOf(highlight)), highlight, text.slice(text.indexOf(highlight) + highlight.length)] : [text, '', ''];
  }
  onDestroy(() => { clearTimeout(markerTimer); clearTimeout(clickTimer); });
</script>

<section class="patient-proof" aria-labelledby="patient-proof-title">
  <header use:standardEntry><h2 id="patient-proof-title">{copy.headingBefore}<span>{copy.headingAccent}</span>{copy.headingAfter}</h2></header>
  <div class="chapter-bar">
    {#each testimonialChapters as key, index}
      <button type="button" class:active={chapter === index} aria-current={chapter === index ? 'step' : undefined} on:click={() => go(index * 4)}>
        <span class="chapter-track" aria-hidden="true"><span class="chapter-fill" class:striped={chapter === index} style={`width:${chapterProgress[index]}%`}></span></span>
        <span class="chapter-desktop">{copy.chapters[index]}</span><span class="chapter-mobile">{copy.shortChapters[index]}</span>
      </button>
    {/each}
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex a11y_no_noninteractive_element_interactions -->
  <div class="journey-carousel" role="region" aria-roledescription="carousel" aria-label={copy.eyebrow} tabindex="0" on:keydown={keyboard}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="journey-stage" class:dragging bind:this={stage} role="presentation" use:seeJourney on:pointerdown={pointerDown} on:pointermove={pointerMove} on:pointerup={pointerUp} on:pointercancel={pointerCancel} on:click|capture={captureClick}>
      {#each slides as slide, index}
        {@const distance = index - current + dragOffset / step}
        {@const magnitude = Math.abs(distance)}
        <article class="journey-card" class:blue-response={slide.kind === 'response'} class:bridge={slide.kind !== 'response'} class:final={slide.kind === 'final'} class:central={index === current} aria-hidden={index !== current} style={`--distance:${distance};--scale:${magnitude <= 1 ? 1 - .14 * magnitude : Math.max(.74, .86 - .12 * (magnitude - 1))};--blur:${Math.min(5, magnitude * 2.5)}px;--opacity:${magnitude <= 1 ? 1 - .4 * magnitude : Math.max(0, .6 - .32 * (magnitude - 1))};z-index:${Math.round(100 - magnitude * 10)};visibility:${magnitude > 2.2 ? 'hidden' : 'visible'}`}>
          {#if slide.kind === 'response'}
            {@const parts = phraseParts(slide.item)}
            <blockquote class="key-phrase"><button class="quote-open" type="button" tabindex={index === current ? 0 : -1} aria-label={`${copy.expand}: ${phrase(slide.item)}`} aria-haspopup="dialog" on:click={() => { enlarged = slide.item; }}>{parts[0]}<span class:marked={index === current && markerActive && sectionVisible}>{parts[1]}</span>{parts[2]}</button></blockquote>
            <div class="patient-signature">{#if slide.item.initial}<span class="patient-initial">{slide.item.initial}</span>{/if}</div>
            <button class="capture-window" type="button" tabindex={index === current ? 0 : -1} aria-label={copy.expand} aria-haspopup="dialog" class:long-capture={slide.item.height / slide.item.width > 1.15} on:click={() => { enlarged = slide.item; }}>
              {#if magnitude <= 2.2}<img src={slide.item.image} alt={slide.item.alt} width={slide.item.width} height={slide.item.height} loading="lazy" draggable="false" />{/if}
              <span class="magnify" aria-hidden="true"><SearchIcon /></span>
            </button>
          {:else if slide.kind === 'bridge1'}
            <h3>{copy.bridge1}<span>{copy.bridge1Accent}</span></h3><p class="bridge-body">{@html proofCopy.rows[0].subtitle}</p>
          {:else if slide.kind === 'bridge2'}
            <h3>{copy.bridge2}<span>{copy.bridge2Accent}</span>{copy.bridge2End}</h3><p class="bridge-body">{@html proofCopy.rows[1].subtitle}</p>
          {:else}
            <h3>{copy.final}<span>{copy.finalAccent}</span>{copy.finalEnd}</h3>
            {#if index === current}<PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.cta} /><button type="button" class="restart" on:click={() => go(0)}><span>{copy.restart}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 9M4 4v6h6" /></svg></button>{/if}
          {/if}
          {#if index !== current && magnitude <= 2.2}<button class="side-select" type="button" tabindex="-1" aria-label={slide.kind === 'response' ? phrase(slide.item) : copy.chapters[Math.min(2, Math.floor(index / 4))]} on:click={() => go(index)}></button>{/if}
        </article>
      {/each}
    </div>
    <div class="journey-navigation"><CarouselControls {current} total={slides.length} previousLabel={copy.previous} nextLabel={copy.next} positionLabel={proofCopy.position} previous={() => go(current - 1)} next={() => go(current + 1)}>
    </CarouselControls></div>
  </div>
  <div class="proof-ctas"><PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.cta} /><a class="secondary-cta" href={`${getRoutePath('testimonials', pageLanguage)}?tab=escritas#historias`}>{copy.all}</a></div>
</section>
{#if enlarged}<ScreenshotModal item={enlarged} {pageLanguage} close={() => { enlarged = null; }} />{/if}

<style>
  .patient-proof { background: #f8f4f0; padding: 2rem 0 var(--home-section-end, 3.75rem); overflow: clip; color: #233f4e; }
  header { max-width: 1000px; margin: 0 auto; padding: 0 1.25rem; text-align: center; }
  h2 span { font: inherit; color: #4083a7; }
  h2 { font-family: 'Fraunces', Georgia, serif; font-size: 46px; font-weight: 500; line-height: 1.15; }
  .chapter-bar { width: min(720px, calc(100% - 40px)); margin: 2rem auto .5rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .chapter-bar button { display: flex; flex-direction: column; gap: 10px; min-height: 56px; padding: 0 0 8px; color: #55656f; font-size: 14px; font-weight: 400; text-align: center; }
  .chapter-bar button.active { color: #233f4e; font-weight: 600; }
  .chapter-track { display: block; width: 100%; height: 10px; background: rgba(35,63,78,.10); border-radius: 999px; overflow: hidden; }
  .chapter-fill { display: block; height: 100%; background: #4083a7; border-radius: inherit; transition: width var(--dur-entrada) var(--ease-calma); }
  .striped { background-image: repeating-linear-gradient(-45deg, rgba(255,255,255,.28) 0 7px, transparent 7px 14px); background-size: 20px 20px; animation: chapter-stripes .9s linear infinite; }
  @keyframes chapter-stripes { from { background-position: 0 0; } to { background-position: 20px 0; } }
  .chapter-mobile { display: none; }
  .journey-carousel { outline-offset: -4px; }
  .journey-stage { position: relative; height: 390px; touch-action: pan-y pinch-zoom; user-select: none; cursor: grab; }
  .journey-stage.dragging, .journey-stage.dragging .quote-open, .journey-stage.dragging .side-select { cursor: grabbing; }
  .journey-stage.dragging .journey-card { transition: none; }
  .journey-card { position: absolute; left: 50%; top: 20px; width: 390px; height: 350px; padding: 22px; display: flex; flex-direction: column; justify-content: center; gap: 12px; background: #fff; border-radius: 8px; box-shadow: 0 18px 38px #071a2524; transform: translateX(calc(-50% + var(--distance) * 350px)) scale(var(--scale)); filter: blur(var(--blur)); opacity: var(--opacity); transition: transform var(--dur-entrada) var(--ease-calma), filter var(--dur-entrada) var(--ease-calma), opacity var(--dur-entrada) var(--ease-calma); }
  .key-phrase { font-family: 'Fraunces', Georgia, serif; font-size: 20px; line-height: 1.42; font-weight: 400; min-height: 4.26em; margin: 0; text-align: center; }
  .quote-open { display: block; width: 100%; min-height: 44px; padding: 0; border: 0; background: transparent; font: inherit; color: inherit; text-align: inherit; cursor: grab; }
  .key-phrase span { font: inherit; background: linear-gradient(rgba(64,131,167,.30), rgba(64,131,167,.30)) left 90% / 0% 60% no-repeat; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .key-phrase .marked { background-size: 100% 60%; transition: background-size 800ms var(--ease-calma) 200ms; }
  .patient-signature { display: flex; justify-content: center; align-items: center; width: 100%; min-height: 1px; border-bottom: 1px solid #ffffff45; padding-bottom: 0; }
  .patient-initial { display: grid; place-items: center; width: 32px; height: 32px; margin-bottom: 8px; border-radius: 50%; background: #f8f4f0; color: #233f4e; font: 500 16px/1 Fraunces, Georgia, serif; }
  .capture-window { position: relative; display: block; align-self: center; width: min(220px, 100%); height: 110px; min-height: 0; flex: 0 0 110px; overflow: hidden; padding: 7px; border: 1px solid #ffffff75; background: #fff; border-radius: 12px; box-shadow: 0 8px 24px #071a2524; cursor: zoom-in; text-align: left; }
  .capture-window img { border-radius: 5px; width: 100%; height: 100%; object-fit: contain; object-position: center top; display: block; }
  .capture-window.long-capture img { height: auto; object-fit: initial; }
  .capture-window.long-capture::after { content: ''; position: absolute; inset: auto 0 0; height: 46px; background: linear-gradient(transparent, #fff); pointer-events: none; }
  .magnify { position: absolute; z-index: 1; right: 6px; bottom: 6px; width: 34px; height: 34px; display: grid; place-items: center; background: #f8f4f0ed; color: #4083a7; border: 1px solid #4083a738; border-radius: 10px; box-shadow: 0 3px 12px #233f4e12; }
  /* Response cards share the blue testimonial treatment. */
  .blue-response { background: #4083a7; color: #fff; }
  .blue-response .key-phrase { color: #fff; }
  .blue-response .key-phrase span { background-image: linear-gradient(#233f4e, #233f4e); }
  .blue-response .capture-window.long-capture::after { background: linear-gradient(transparent, #fff); }
  .blue-response button:focus-visible { outline-color: #f8f4f0; }
  @media (hover: hover) and (pointer: fine) {
    .central.blue-response:is(:hover, :focus-within) { box-shadow: 0 18px 38px #071a2540, 0 0 28px #8cd0d673; }
    .central.blue-response:is(:hover, :focus-within) .capture-window { box-shadow: 0 8px 24px #071a2530, 0 0 20px #8cd0d680; }
    .journey-stage:has(.central:hover) .journey-card:not(.central) { filter: blur(calc(var(--blur) + 2px)); }
  }
  .bridge { top: 50%; height: 320px; margin-top: -160px; background: #233f4e; justify-content: center; align-items: center; text-align: center; }
  h3, h3 span { font-family: 'Fraunces', Georgia, serif; font-weight: 400; line-height: 1.25; }
  h3 { font-size: 34px; } .bridge h3 { color: #fff; } .bridge h3 span { color: #8cd0d6; }
  .bridge-body { font: 400 15px/1.65 Inter, sans-serif; color: #e8e8f6; margin-top: 1rem; }
  .final { height: 360px; margin-top: -180px; border: 1px solid #8cd0d640; justify-content: center; align-items: center; text-align: center; }
  .final h3 { font-size: 32px; margin-bottom: 1rem; } .final h3 span { color: #8cd0d6; }
  .restart { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-width: 44px; min-height: 58px; color: #f8f4f0; font-size: 14px; padding: 8px 12px; border-radius: 12px; transition: background var(--dur-estado) var(--ease-calma); }
  .restart svg { width: 22px; height: 22px; }
  @media (hover: hover) and (pointer: fine) { .restart:hover { background: #ffffff12; } }
  .side-select { position: absolute; inset: 0; width: 100%; border-radius: inherit; cursor: grab; }
  .proof-ctas { display: flex; justify-content: center; gap: 16px; padding: 0 1.25rem; margin-top: 2rem; }
  .secondary-cta { display: inline-flex; align-items: center; justify-content: center; border: 1.5px solid #233f4e; border-radius: 999px; padding: .75rem 1.5rem; min-height: 44px; font-size: 15px; font-weight: 500; transition: background var(--dur-estado) var(--ease-calma), color var(--dur-estado) var(--ease-calma); }
  button:focus-visible, a:focus-visible, .journey-carousel:focus-visible { outline: 2px solid #4083a7; outline-offset: 4px; }
  @media (hover: hover) and (pointer: fine) { .secondary-cta:hover { background: #233f4e; color: #fff; } }
  @media (max-width: 767px) {
    h2 { font-size: 30px; } .chapter-desktop { display: none; } .chapter-mobile { display: inline; }
    .chapter-bar { gap: 8px; margin-top: 1.5rem; } .chapter-bar button { font-size: 12.5px; }
    .journey-stage { height: 380px; }
    .journey-card { width: 300px; height: 340px; padding: 18px; gap: 10px; transform: translateX(calc(-50% + var(--distance) * 262px)) scale(var(--scale)); }
    .key-phrase { font-size: 18px; }
    .capture-window { width: min(180px, 100%); height: 90px; flex-basis: 90px; }
    .bridge { height: 350px; margin-top: -175px; }
    .final { height: 340px; margin-top: -170px; }
    h3 { font-size: 28px; } .final h3 { font-size: 26px; }
    .journey-navigation { margin-top: 0; }
    .proof-ctas { width: 300px; max-width: 100%; padding: 0; margin: 2rem auto 0; flex-direction: column; }
    .proof-ctas :global(.primary-cta), .secondary-cta { width: 100%; }
  }
  @media (prefers-reduced-motion: reduce) { .striped { animation: none; } .key-phrase span { background-size: 100% 60%; } .chapter-fill, .journey-card, .key-phrase .marked, .secondary-cta { transition: none; } }
</style>
