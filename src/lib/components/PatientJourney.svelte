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
  const chapterCounts = testimonialChapters.map(chapter => getFeaturedTestimonials(chapter).length);
  const chapterStarts = [0, chapterCounts[0] + 1, chapterCounts[0] + chapterCounts[1] + 2];
  function chapterFor(index: number) {
    return index >= chapterStarts[2] ? 2 : index >= chapterStarts[1] ? 1 : 0;
  }
  let current = 0, markerActive = true, mobile = false;
  let chapterProgress = [100 / chapterCounts[0], 0, 0];
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
    const mobileMedia = window.matchMedia('(max-width: 767px)');
    const sync = () => { mobile = mobileMedia.matches; step = mobile ? 262 : 350; };
    sync(); mobileMedia.addEventListener('change', sync);
    const stopMotion = watchReducedMotion(value => { reduced = value; if (value) dragOffset = 0; });
    return () => { mobileMedia.removeEventListener('change', sync); stopMotion(); };
  });
  $: copy = testimonialUi[pageLanguage];
  $: proofCopy = patientProofCopy[pageLanguage];
  $: whatsappHref = getWhatsAppHref(pageLanguage, false, $selectedSituation);
  $: chapter = chapterFor(current);
  function go(index: number) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === current) return;
    current = next; markerActive = false; clearTimeout(markerTimer);
    const activeChapter = chapterFor(current);
    chapterProgress = chapterProgress.map((progress, index) => index < activeChapter ? 100 : index === activeChapter ? Math.max(progress, Math.min(100, (current - chapterStarts[activeChapter] + 1) / chapterCounts[activeChapter] * 100)) : progress);
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
  // Crop only the unrelated first question from these previews; the dialog always shows the complete original.
  const previewTop: Record<string, number> = {
    'progress-2': .52, 'progress-3': .55,
    'difficult-day-1': .56, 'difficult-day-4': .52, 'difficult-day-5': .60, 'difficult-day-3': .67, 'difficult-day-2': .66
  };
  function previewBox(item: WrittenTestimonial) {
    const top = Math.round(item.height * (previewTop[item.id] ?? 0));
    const bottom = item.id === 'progress-12' ? Math.round(item.height * .49) : item.height;
    return `0 ${top} ${item.width} ${bottom - top}`;
  }
  // Halve the existing 320px card's empty top/bottom space at every width.
  function halfVerticalSpace(node: HTMLElement, enabled: boolean) {
    if (!enabled) return {};
    const media = window.matchMedia('(min-width: 768px)');
    const quote = node.querySelector<HTMLElement>('.key-phrase');
    const capture = node.querySelector<HTMLElement>('.capture-group');
    const update = () => {
      if (!quote || !capture) return;
      const content = quote.offsetHeight + capture.offsetHeight + parseFloat(getComputedStyle(node).rowGap);
      node.style.setProperty('--response-height', ((320 + content) / 2) + 'px');
      if (node.classList.contains('central')) node.parentElement?.style.setProperty('--active-response-height', ((320 + content) / 2) + 'px');
    };
    const observer = new ResizeObserver(update);
    const classes = new MutationObserver(update);
    classes.observe(node, { attributes: true, attributeFilter: ['class'] });
    if (quote) observer.observe(quote);
    if (capture) observer.observe(capture);
    media.addEventListener('change', update); update();
    return { destroy() { observer.disconnect(); classes.disconnect(); media.removeEventListener('change', update); } };
  }
  const spanishQuoteLines: Record<string, string> = {
    'difficult-day-5': '…Náuseas y muchos mareos. No tengo\nfuerzas para nada.',
    'eima-adaptation-1': 'Me encanta que sea un plan adaptable\nal día a día y así no me frustro.',
    'eima-adaptation-9': 'Me he sentido acompañada con\nlas llamadas telefónicas.',
    'eima-adaptation-2': 'Me gusta saber lo que tengo que hacer\nal día siguiente.',
    'eima-adaptation-7': 'El vídeo me ayudó a entender por dónde\nestoy y lo que me queda.'
  };
  const mobileRoutine = {
    es: { quote: 'He podido volver a seguir\nlas rutinas establecidas y\na sentirme «normal».', highlight: 'a sentirme «normal»' },
    ca: { quote: 'He pogut tornar a seguir\nles rutines establertes i\na sentir-me «normal».', highlight: 'a sentir-me «normal»' },
    en: { quote: 'I have been able to follow\nmy established routines again\nand feel “normal”.', highlight: 'and feel “normal”' }
  };
  const mobileSpanishQuotes: Record<string, string> = {
    'progress-2': '…puedo volver a la rutina\nde antes del cáncer.',
    'progress-9': 'Lograr salir a caminar todos\nlos días, a pesar del tratamiento\ny las inyecciones.',
    'difficult-day-1': 'Hemos ido a caminar pero\nestaba muy cansada. He\nhecho lo que he podido.',
    'difficult-day-mental-fog': 'Sigo con bastante\n“niebla” en la cabeza.',
    'difficult-day-2': 'Todo el día sin energía y\ncon asco y vómitos.',
    'eima-adaptation-1': 'Me encanta que sea un plan\nadaptable al día a día y así\nno me frustro.'
  };
  const mobileBridgeLines = {
    es: 'Lo importante es saber <strong>cómo adaptar<br />el ejercicio</strong> a cada momento,<br />sin exigirte de más.',
    ca: 'L’important és saber <strong>com adaptar<br />l’exercici</strong> a cada moment,<br />sense exigir-te de més.',
    en: 'What matters is knowing <strong>how to adapt<br />exercise</strong> at each stage,<br />without pushing yourself too hard.'
  };
  $: mobileBridgeSubtitle = proofCopy.rows[0].subtitle?.split('</span>')[0] + '</span><span class="subtitle-line">' + mobileBridgeLines[pageLanguage] + '</span>';
  $: mobileFinal = {
    es: ['Para que puedas', 'volver a hacer las', 'cosas que más', 'echas de menos.'],
    ca: ['Perquè puguis', 'tornar a fer les', 'coses que més', 'enyores.'],
    en: ['So you can', 'get back to doing', 'the things you', 'miss the most.']
  }[pageLanguage];
  function phrase(item: WrittenTestimonial, isMobile = mobile) {
    if (isMobile && item.id === 'progress-12') return mobileRoutine[pageLanguage].quote;
    if (isMobile && pageLanguage === 'es' && mobileSpanishQuotes[item.id]) return mobileSpanishQuotes[item.id];
    return (pageLanguage === 'es' && spanishQuoteLines[item.id]) || item.quote[pageLanguage] || item.caption[pageLanguage];
  }
  function phraseParts(item: WrittenTestimonial, isMobile = mobile) {
    const text = phrase(item, isMobile), searchable = text.replace(/\n/g, ' '), highlight = isMobile && item.id === 'progress-12' ? mobileRoutine[pageLanguage].highlight : item.highlight[pageLanguage];
    return highlight && searchable.includes(highlight) ? [text.slice(0, searchable.indexOf(highlight)), text.slice(searchable.indexOf(highlight), searchable.indexOf(highlight) + highlight.length), text.slice(searchable.indexOf(highlight) + highlight.length)] : [text, '', ''];
  }
  onDestroy(() => { clearTimeout(markerTimer); clearTimeout(clickTimer); });
</script>

<section class="patient-proof" aria-labelledby="patient-proof-title">
  <header use:standardEntry><h2 id="patient-proof-title">{#if pageLanguage === 'es'}Lo que nos cuentan<span class="heading-week"><br class="heading-mobile-break" /><span class="heading-desktop-space">{' '}</span>cada semana</span>{:else if pageLanguage === 'ca'}El que ens expliquen<span class="heading-week"><br class="heading-mobile-break" /><span class="heading-desktop-space">{' '}</span>cada setmana</span>{:else}What we hear<span class="heading-week"><br class="heading-mobile-break" /><span class="heading-desktop-space">{' '}</span>each week from</span>{/if}<br /><span>{copy.headingAccent}</span>{copy.headingAfter}</h2></header>
  <div class="chapter-bar">
    {#each testimonialChapters as key, index}
      <button type="button" class:active={chapter === index} aria-current={chapter === index ? 'step' : undefined} on:click={() => go(chapterStarts[index])}>
        <span class="chapter-track" aria-hidden="true"><span class="chapter-fill" class:striped={chapter === index} style={`width:${chapterProgress[index]}%`}></span></span>
        <span class="chapter-desktop">{copy.chapters[index]}</span><span class="chapter-mobile">{copy.shortChapters[index]}</span>
      </button>
    {/each}
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex a11y_no_noninteractive_element_interactions -->
  <div class="journey-carousel" role="region" aria-roledescription="carousel" aria-label={copy.eyebrow} tabindex="0" on:keydown={keyboard}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="journey-stage" class:response-active={slides[current].kind === 'response'} class:dragging bind:this={stage} role="presentation" use:seeJourney on:pointerdown={pointerDown} on:pointermove={pointerMove} on:pointerup={pointerUp} on:pointercancel={pointerCancel} on:click|capture={captureClick}>
      {#each slides as slide, index}
        {@const distance = index - current + dragOffset / step}
        {@const magnitude = Math.abs(distance)}
        <article use:halfVerticalSpace={slide.kind === 'response'} class="journey-card" class:blue-response={slide.kind === 'response'} class:bridge={slide.kind !== 'response'} class:first-bridge={slide.kind === 'bridge1'} class:final={slide.kind === 'final'} class:central={index === current} aria-hidden={index !== current} style:--distance={distance} style:--scale={magnitude <= 1 ? 1 - .14 * magnitude : Math.max(.74, .86 - .12 * (magnitude - 1))} style:--blur={`${Math.min(5, magnitude * 2.5)}px`} style:--opacity={magnitude <= 1 ? 1 - .4 * magnitude : Math.max(0, .6 - .32 * (magnitude - 1))} style:z-index={Math.round(100 - magnitude * 10)} style:visibility={magnitude > 2.2 ? 'hidden' : 'visible'}>
          {#if slide.kind === 'response'}
            {@const parts = phraseParts(slide.item, mobile)}
            <blockquote class="key-phrase"><button class="quote-open" class:quote-mobile-lines={mobile && (slide.item.id === 'progress-12' || (pageLanguage === 'es' && Boolean(mobileSpanishQuotes[slide.item.id])))} type="button" tabindex={index === current ? 0 : -1} aria-label={`${copy.expand}: ${phrase(slide.item)}`} aria-haspopup="dialog" on:click={() => { enlarged = slide.item; }}>“{parts[0]}<span class:marked={index === current && markerActive && sectionVisible}>{parts[1]}</span>{parts[2]}”</button></blockquote>
            {#if slide.item.initial}<span class="patient-initial">{slide.item.initial}</span>{/if}
            <div class="capture-group" class:compact={slide.item.chapter !== 'acompanamos'} class:hint-running={index === current && markerActive && sectionVisible}><button class="capture-action" type="button" tabindex={index === current ? 0 : -1} aria-label={copy.expand} aria-haspopup="dialog" on:click={() => { enlarged = slide.item; }}>
              <span class="capture-window">{#if magnitude <= 2.2}<svg class="capture-preview" viewBox={previewBox(slide.item)} role="img" aria-label={slide.item.alt} preserveAspectRatio="xMidYMid meet"><image href={slide.item.image} style:filter={slide.item.cleanBackground ? 'contrast(1.15)' : undefined} width={slide.item.width} height={slide.item.height} /></svg>{/if}</span>
              <span class="magnify" aria-hidden="true"><SearchIcon /></span>
            <span class="capture-hint" aria-hidden="true"><span class="hint-desktop">{copy.captureHint}</span><span class="hint-mobile">{pageLanguage === 'es' ? 'Pulsa para ampliar' : pageLanguage === 'ca' ? 'Toca per ampliar' : 'Tap to enlarge'}</span></span></button></div>
          {:else if slide.kind === 'bridge1'}
            <h3>{copy.bridge1}<span>{copy.bridge1Accent}</span></h3><p class="bridge-body">{@html mobile ? mobileBridgeSubtitle : proofCopy.rows[0].subtitle}</p>
          {:else if slide.kind === 'bridge2'}
            <h3>{copy.bridge2}<span>{copy.bridge2Accent}</span>{copy.bridge2End}</h3><p class="bridge-body">{@html proofCopy.rows[1].subtitle}</p>
          {:else}
            <h3>{#if mobile}{mobileFinal[0]}<br /><span>{mobileFinal[1]}<br />{mobileFinal[2]}</span><br />{mobileFinal[3]}{:else}{copy.final}<br /><span>{copy.finalAccent}</span><br />{copy.finalEnd}{/if}</h3>
            <div class="final-cta" inert={index !== current}><PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.cta} /></div>
          {/if}
          {#if index !== current && magnitude <= 2.2}<button class="side-select" type="button" tabindex="-1" aria-label={slide.kind === 'response' ? phrase(slide.item) : copy.chapters[chapterFor(index)]} on:click={() => go(index)}></button>{/if}
        </article>
      {/each}
    </div>
    <div class="restart-slot">{#if current === slides.length - 1}<button type="button" class="restart" on:click={() => go(0)}><span>{copy.restart}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 9M4 4v6h6" /></svg></button>{/if}</div>
    <div class="journey-navigation" class:response-active={slides[current].kind === 'response'}><CarouselControls {current} total={slides.length} previousLabel={copy.previous} nextLabel={copy.next} positionLabel={proofCopy.position} previous={() => go(current - 1)} next={() => go(current + 1)}>
    </CarouselControls></div>
  </div>
  <div class="proof-ctas"><PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.cta} /><a class="secondary-cta" href={`${getRoutePath('testimonials', pageLanguage)}?tab=escritas#historias`}>{copy.all}</a></div>
</section>
{#if enlarged}<ScreenshotModal item={enlarged} {pageLanguage} close={() => { enlarged = null; }} />{/if}

<style>
  .patient-proof { background: #f8f4f0; padding: var(--home-section-start, 3.75rem) 0 var(--home-section-end, 3.75rem); overflow: clip; color: #233f4e; }
  header { max-width: 1000px; margin: 0 auto; padding: 0 1.25rem; text-align: center; }
  h2 span { font: inherit; color: #4083a7; }
  h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 50px; font-weight: 500; line-height: 1.15; }
  .chapter-bar { width: min(720px, calc(100% - 40px)); margin: 2.5rem auto .15rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .chapter-bar button { display: flex; flex-direction: column; gap: 10px; min-height: 56px; padding: 0 0 8px; color: #55656f; font-size: 14px; font-weight: 400; text-align: center; }
  .chapter-bar button.active { color: #233f4e; font-weight: 600; }
  .chapter-track { display: block; width: 100%; height: 10px; background: #e8e8f6; border-radius: 999px; overflow: hidden; }
  .chapter-fill { display: block; height: 100%; background: #4083a7; border-radius: inherit; transition: width var(--dur-entrada) var(--ease-calma); }
  .striped { background-image: repeating-linear-gradient(-45deg, rgba(255,255,255,.28) 0 7px, transparent 7px 14px); background-size: 20px 20px; animation: chapter-stripes .9s linear infinite; }
  @keyframes chapter-stripes { from { background-position: 0 0; } to { background-position: 20px 0; } }
  .chapter-mobile { display: none; }
  .journey-carousel { position: relative; isolation: isolate; outline-offset: -4px; }
  .journey-stage { position: relative; height: 360px; touch-action: pan-y pinch-zoom; user-select: none; cursor: grab; }
  .journey-stage.dragging, .journey-stage.dragging .quote-open, .journey-stage.dragging .side-select { cursor: grabbing; }
  .journey-stage.dragging .journey-card { transition: none; }
  .journey-card { position: absolute; left: 50%; top: 20px; width: 390px; height: 320px; padding: 16px; display: flex; flex-direction: column; justify-content: center; gap: 8px; background: #fff; border-radius: 12px; box-shadow: 0 18px 38px #071a2524; transform: translateX(calc(-50% + var(--distance) * 350px)) scale(var(--scale)); filter: blur(var(--blur)); opacity: var(--opacity); transition: transform var(--dur-entrada) var(--ease-calma), filter var(--dur-entrada) var(--ease-calma), opacity var(--dur-entrada) var(--ease-calma); }
  .key-phrase { white-space: pre-line; font-family: 'Fraunces', Georgia, serif; font-size: 18px; line-height: 1.42; font-weight: 300; font-style: italic; min-height: 0; margin: 0; text-align: center; }
  .quote-open { display: block; width: 100%; min-height: 44px; padding: 0; border: 0; background: transparent; font: inherit; color: inherit; text-align: inherit; cursor: grab; }
  .key-phrase span { font: inherit; background: linear-gradient(rgba(64,131,167,.30), rgba(64,131,167,.30)) left center / 0% 84% no-repeat; padding-block: 0; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .key-phrase .marked { background-size: 100% 84%; transition: background-size 1100ms var(--ease-calma) 200ms; }
  .patient-initial { position: absolute; bottom: 12px; right: 18px; color: #fff; font: italic 400 19px/1.2 'Playfair Display', Georgia, serif; text-shadow: 0 1px 3px #071a2580; }
  .capture-group { position: relative; align-self: center; width: min(260px, 100%); padding-top: 8px; }
  .capture-action { display: grid; gap: 6px; width: 100%; padding: 0; border: 0; background: transparent; cursor: zoom-in; }
  .blue-response .capture-action:focus-visible { outline: none; }
  .capture-action:focus-visible .capture-window { outline: 2px solid #f8f4f0; outline-offset: 4px; }
  .capture-hint { display: block; text-align: center; font: italic 300 11px/16px Inter, sans-serif; color: #fff; text-shadow: 0 1px 2px #071a25aa, 0 0 5px #071a2540; opacity: 0; transform: translateY(12px); transition: opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma); }
  .capture-window { position: relative; display: block; align-self: center; width: 100%; height: 140px; min-height: 0; flex: 0 0 140px; overflow: visible; padding: 7px; border: 1px solid #ffffff75; background: #fff; border-radius: 12px; box-shadow: 0 8px 24px #071a2524; cursor: zoom-in; text-align: left; }
  .capture-group.compact .capture-window { height: 105px; flex-basis: 105px; }
  .capture-preview { display: block; width: 100%; height: 100%; border-radius: 5px; }
  .magnify { position: relative; z-index: 1; margin-inline: auto; opacity: 0; transform: translateY(12px); transition: opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma); width: 30px; height: 30px; display: grid; place-items: center; background: #233f4e; color: #fff; border: 0; border-radius: 10px; box-shadow: 0 3px 12px #233f4e12; }
  .magnify :global(svg) { filter: drop-shadow(0 1px 2px #071a2566); }
  .capture-action:focus-visible .magnify { opacity: 1; transform: translateY(0); }
  .hint-mobile { display: none; }
  /* Response cards share the blue testimonial treatment. */
  @media (min-width: 768px) { .blue-response { height: var(--response-height, 320px); top: 50%; margin-top: calc(var(--response-height, 320px) / -2); } }
  .blue-response { background: #4083a7; color: #fff; }
  .blue-response .key-phrase { color: #fff; }
  .blue-response .quote-open { text-shadow: 0 0 3px #071a2580, 0 0 5px #071a2533; }
  .blue-response .key-phrase span { background-image: linear-gradient(#233f4e, #233f4e); }
  .blue-response button:focus-visible { outline-color: #f8f4f0; }
  @media (hover: hover) and (pointer: fine) {
    .central.blue-response:is(:hover, :focus-within) .capture-hint { opacity: 1; transform: translateY(0); }
    .central.blue-response:is(:hover, :focus-within) .magnify { opacity: 1; transform: translateY(0); }
    .central.blue-response:is(:hover, :focus-within) { box-shadow: 0 18px 38px #071a2540, 0 0 28px #8cd0d673; }
    .central.blue-response:is(:hover, :focus-within) .capture-window { box-shadow: 0 8px 24px #071a2530, 0 0 20px #8cd0d680; }
    .journey-stage:has(.central:hover) .journey-card:not(.central) { filter: blur(calc(var(--blur) + 2px)); }
  }
  .bridge { top: 50%; height: 290px; margin-top: -145px; background: #233f4e; justify-content: center; align-items: center; text-align: center; }
  h3, h3 span { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; line-height: 1.25; }
  h3 { font-size: 30px; } .bridge h3 { color: #fff; } .bridge h3 span { color: #8cd0d6; }
  .first-bridge h3 span { font-weight: 600; }
  .final-cta { display: grid; place-items: center; width: 100%; }
  .bridge-body :global(strong) { font-weight: 600; }
  .heading-mobile-break { display: none; }
  .heading-week { color: inherit; }
  .bridge-body :global(.subtitle-line) { display: block; }
  .bridge-body :global(.subtitle-line + .subtitle-line) { margin-top: .5rem; }
  .bridge-body { font: 300 14px/1.65 Inter, sans-serif; color: #F4F4F8; margin-top: 1rem; }
  .final { height: 320px; margin-top: -160px; border: 1px solid #8cd0d640; justify-content: center; align-items: center; text-align: center; }
  .final h3 { font-size: 30px; margin-bottom: 2.5rem; } .final h3 span { color: #8cd0d6; }
  .restart-slot { position: absolute; top: 150px; left: calc(50% + 215px); width: 150px; }
  .restart { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-width: 44px; min-height: 58px; color: #233f4e; font-size: 13px; padding: 8px 12px; border: 1px solid transparent; border-radius: 12px; transition: background var(--dur-estado) var(--ease-calma), border-color var(--dur-estado) var(--ease-calma); }
  .restart svg { width: 22px; height: 22px; }
  @media (hover: hover) and (pointer: fine) { .restart:is(:hover, :focus-visible) { background: #fff; border-color: #8cd0d6; } }
  .side-select { position: absolute; inset: 0; width: 100%; border-radius: inherit; cursor: grab; }
  .proof-ctas { display: flex; justify-content: center; gap: 16px; padding: 0 1.25rem; margin-top: 2rem; }
  .secondary-cta { display: inline-flex; align-items: center; justify-content: center; border: 1.5px solid #233f4e; border-radius: 999px; padding: .75rem 1.5rem; min-height: 44px; font-size: 15px; font-weight: 500; transition: background var(--dur-estado) var(--ease-calma), color var(--dur-estado) var(--ease-calma); }
  button:focus-visible, a:focus-visible, .journey-carousel:focus-visible { outline: 2px solid #4083a7; outline-offset: 4px; }
  @media (hover: hover) and (pointer: fine) { .secondary-cta:hover { background: #233f4e; color: #fff; } }
  @media (max-width: 767px) {
    h2 { font-size: clamp(26px, 8vw, 30px); } .heading-mobile-break { display: block; } .heading-desktop-space { display: none; } .chapter-desktop { display: none; } .chapter-mobile { display: inline; }
    .chapter-bar { gap: 8px; margin-top: 2rem; margin-bottom: 0; } .chapter-bar button { font-size: 12px; }
    .journey-stage { height: 340px; }
    .journey-stage.response-active { height: calc(255px + var(--active-response-height, 274px) * .25); }
    .journey-card { width: 300px; height: 320px; padding: 16px; gap: 10px; transform: translateX(calc(-50% + var(--distance) * 262px)) scale(var(--scale)); }
    .blue-response { height: var(--response-height, 320px); top: 50%; margin-top: calc(var(--response-height, 320px) / -2); }
    .key-phrase { font-size: 18px; white-space: normal; }
    .key-phrase span { background-position: left calc(50% + 1px); }
    .quote-mobile-lines { white-space: pre-line; }
    .capture-group { width: min(224px, 100%); }
    .capture-window { height: 115px; flex-basis: 115px; }
    .capture-group.compact .capture-window { height: 100px; flex-basis: 100px; }
    .bridge { height: 310px; margin-top: -155px; }
    .final { height: 320px; margin-top: -160px; }
    h3 { font-size: 28px; } .final h3 { font-size: 26px; margin-bottom: 1rem; }
    .restart-slot { position: absolute; z-index: 110; top: 273px; left: calc(50% - 134px); width: 268px; display: flex; justify-content: center; height: 44px; margin: 0; }
    .restart { flex-direction: row; min-height: 44px; color: #F4F4F8; }
    .restart:is(:hover, :focus-visible) { color: #233f4e; background: #fff; }
    .final { padding-bottom: 56px; }
    .journey-navigation { margin-top: 20px; }
    .journey-navigation.response-active { margin-top: 15px; }
    .hint-desktop { display: none; } .hint-mobile { display: inline; }
    .hint-running .magnify, .hint-running .capture-hint { animation: mobile-capture-prompt 350ms var(--ease-calma) 2600ms both; }
    .proof-ctas { width: 300px; max-width: 100%; padding: 0; margin: 2rem auto 0; flex-direction: column; }
    .proof-ctas :global(.primary-cta), .secondary-cta { width: 100%; }
  }
  @keyframes mobile-capture-prompt { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { .striped { animation: none; } .key-phrase span { background-size: 100% 84%; } .chapter-fill, .journey-card, .key-phrase .marked, .secondary-cta, .magnify, .capture-hint { transition: none; } .hint-running .magnify, .hint-running .capture-hint { animation: none; opacity: 1; transform: none; } }
</style>
