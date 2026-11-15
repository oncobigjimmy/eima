<script lang="ts">
  import { selectedSituation, situationCopy, type Situation } from '$lib/data/situation';
  import { standardEntry } from '$lib/actions/standardEntry';
  import { scrollContrast } from '$lib/actions/scrollContrast';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import type { Language } from '$lib/i18n/copy';
  import { homeSections } from '$lib/i18n/reviewed';
  import { getRoutePath, getProgramStepsHash } from '$lib/i18n/routes';
  import { homeVideoEs } from '$lib/data/home-es';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import SituationResponse from '$lib/components/SituationResponse.svelte';
  import BrandLogo from '$lib/components/BrandLogo.svelte';
  import PatientJourney from '$lib/components/PatientJourney.svelte';
  import ThreeRSection from './ThreeRSection.svelte';

  export let pageLanguage: Language = 'es';
  const ui = homeSections[pageLanguage];
  const homeCopy = getCopy(pageLanguage).home;
  const programmeBreak = { es: 'con cáncer', ca: 'amb càncer', en: 'with cancer' }[pageLanguage];
  const programmeLines = ui.programme.replace(` ${programmeBreak}`, `\n${programmeBreak}`).split('\n');
  $: whatsappHref = getWhatsAppHref(pageLanguage, true, $selectedSituation);
  const note = pageLanguage === 'es'
    ? homeCopy.hero.note.replace(' si este acompañamiento', '\nsi este acompañamiento')
    : pageLanguage === 'en'
      ? homeCopy.hero.note.replace(' whether this support', '\nwhether this support')
      : homeCopy.hero.note;
  const goals = homeCopy.recovery.goals.map((goal, index) => index === 0
    ? { ...goal, body: ui.firstGoalBody }
    : index === 2 ? { ...goal, subtitle: ui.thirdGoalSubtitle, body: ui.thirdGoalBody } : goal);
  const situations = ui.situations.map((quote, index) => ({ letter: 'ABCD'[index] as Situation, quote }));
  const selectionCopy = situationCopy[pageLanguage];
  let responseSituation: Situation | null = null;
  $: responseHref = getWhatsAppHref(pageLanguage, true, responseSituation);
  function selectSituation(situation: Situation) {
    selectedSituation.set(null);
    responseSituation = situation;
  }
  function confirmSituation() { selectedSituation.set(responseSituation); }
  function closeSituation() { responseSituation = null; }
  function pulsePrompt(node: HTMLElement) {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pill = node.querySelector('.selection-pill');
    let timer: ReturnType<typeof setTimeout>;
    function pulse() {
      if (preference.matches || !pill) return;
      clearTimeout(timer);
      pill.classList.remove('pulse-prompt');
      // Restart the cycle when returning before the previous three pulses finish.
      void (pill as HTMLElement).offsetWidth;
      pill.classList.add('pulse-prompt');
      timer = setTimeout(() => pill.classList.remove('pulse-prompt'), 2400);
    }
    node.addEventListener('pointerenter', pulse);
    node.addEventListener('focus', pulse);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .5 && window.matchMedia('(hover: none), (pointer: coarse)').matches) pulse();
    }, { threshold: .5 });
    observer.observe(node);
    return { destroy() {
      observer.disconnect(); clearTimeout(timer);
      node.removeEventListener('pointerenter', pulse);
      node.removeEventListener('focus', pulse);
    } };
  }
  let videoNearby = false;
  const videoReady = Boolean(homeVideoEs.src && homeVideoEs.captions);
  let videoNotice: HTMLDialogElement;
  let previousOverflow = '';
  const noticeCopy = {
    es: { title: 'Estamos actualizando el vídeo', body: 'En unos días volveremos a subir el vídeo debido a problemas técnicos. Disculpa las molestias.', cta: 'Ver los pasos de Empenta', close: 'Cerrar aviso' },
    ca: { title: 'Estam actualitzant el vídeo', body: 'D’aquí a uns dies tornarem a pujar el vídeo a causa de problemes tècnics. Disculpa les molèsties.', cta: 'Veure els passos d’Empenta', close: 'Tancar avís' },
    en: { title: 'We’re updating the video', body: 'We’ll upload the video again in a few days due to technical issues. Sorry for the inconvenience.', cta: 'See the Empenta steps', close: 'Close notice' }
  }[pageLanguage];
  function openVideoNotice() {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    videoNotice.showModal();
  }
  function restoreNoticeScroll() { document.body.style.overflow = previousOverflow; }
  function noticeLifecycle(node: HTMLDialogElement) {
    return { destroy() { if (node.open) restoreNoticeScroll(); } };
  }
  const captionText = ui.posterDescription.replace(/<br[^>]*>/g, '');

  function nearVideo(node: HTMLElement) {
    if (!('IntersectionObserver' in window)) { videoNearby = true; return {}; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { videoNearby = true; observer.disconnect(); }
    }, { rootMargin: '200px' });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }


</script>

<dialog class="video-notice" bind:this={videoNotice} use:noticeLifecycle on:close={restoreNoticeScroll} aria-labelledby="video-notice-title" aria-describedby="video-notice-description">
  <button class="video-notice-close" type="button" aria-label={noticeCopy.close} on:click={() => videoNotice.close()}>×</button>
  <h2 id="video-notice-title">{noticeCopy.title.slice(0, noticeCopy.title.lastIndexOf(pageLanguage === 'en' ? 'the video' : 'el vídeo'))}<span class="notice-video-accent">{pageLanguage === 'en' ? 'the video' : 'el vídeo'}</span></h2>
  <p id="video-notice-description">{#if pageLanguage === 'es'}En unos días volveremos a subir el vídeo<br class="notice-mobile-break" /> debido a<br class="notice-desktop-break" /> problemas técnicos.<br class="notice-mobile-break" /> Disculpa las molestias.{:else}{noticeCopy.body}{/if}</p>
  <PrimaryCta href={getRoutePath('program', pageLanguage) + '#' + getProgramStepsHash(pageLanguage)} label={noticeCopy.cta} />
</dialog>

<section class="vsl section-space" aria-labelledby="vsl-title">
  <div class="section-inner">
    <header class="section-heading">
      <p role="heading" aria-level="2" class="vsl-headline section-playfair-desktop">{ui.vslBefore} <span>Empenta</span>{ui.vslAfter}</p>
      <h1 id="vsl-title" class="mobile-copy-14" aria-label={ui.programme}>{#each programmeLines as line, index}{#if index > 0}{' '}{/if}<span class="programme-line">{line}</span>{/each}</h1>
    </header>
    <div class="video-frame" use:nearVideo use:standardEntry>
      {#if videoReady && videoNearby}
        <video controls playsinline preload="none" poster={homeVideoEs.poster} aria-label={ui.play}>
          <source src={homeVideoEs.src} type="video/mp4" />
          <track kind="captions" src={homeVideoEs.captions} srclang="es" label="Castellano" default />
        </video>
      {:else}
        <div class="video-poster">
          <img src={homeVideoEs.poster} alt={ui.peopleAlt} width="1080" height="631" loading="lazy" />
          <BrandLogo class="poster-brand" id="vsl-poster-logo" />
          <div class="poster-copy">
            <p class="poster-title"><span class="poster-title__first">{ui.posterFirst}</span><span class="poster-title__middle">{ui.posterMiddle}</span><span class="poster-title__last">Empenta</span></p>
            <p class="poster-description poster-description--review">{@html ui.posterDescription}</p>
          </div>
          <div class="poster-phone" role="img" aria-label={ui.phoneAlt}>
            <img class="poster-phone-base" src="/vsl-harbiz-hand.webp" alt="" width="898" height="1751" loading="lazy" />
            <img class="poster-phone-screen" src="/harbiz-client-agenda.png" alt="" width="576" height="1280" loading="lazy" />
          </div>
          <button type="button" class="poster-play" on:click={openVideoNotice} aria-label={ui.play} aria-haspopup="dialog">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.7a1 1 0 0 1 1.5-.86l9.2 6.3a1 1 0 0 1 0 1.72l-9.2 6.3A1 1 0 0 1 8 18.3V5.7Z" /></svg>
          </button>
        </div>
      {/if}
    </div>
      <p class="mobile-video-caption" use:standardEntry>{captionText}</p>
    <div class="section-cta">
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={homeCopy.hero.cta} />
      <p class="cta-note mobile-copy-14">{note}</p>
    </div>
  </div>
</section>

<PatientJourney {pageLanguage} />

<section class="situations section-space" aria-labelledby="situations-title">
  <div class="section-inner">
    <header class="section-heading">
      <h2 id="situations-title" class="section-playfair-desktop">{@html ui.situationTitle}</h2>
      <p class="mobile-copy-14">{@html ui.situationIntro}</p>
    </header>
    <p class="selection-instruction" data-newsreader-fixed><span class="instruction-desktop">{selectionCopy.choose}</span><span class="instruction-mobile">{pageLanguage === 'es' ? 'Pulsa la situación que más se parezca a la tuya' : pageLanguage === 'ca' ? 'Toca la situació que més s’assembli a la teva' : 'Tap the situation that feels closest to yours'}</span></p>
    <div class="situations-grid" class:has-selection={Boolean($selectedSituation || responseSituation)}>
      {#each situations as situation, i}
        <button type="button" class="situation-card" class:selected={($selectedSituation === situation.letter || responseSituation === situation.letter)} aria-pressed={($selectedSituation === situation.letter || responseSituation === situation.letter)} aria-haspopup="dialog" aria-label={`${situation.quote} ${selectionCopy.hint}`} on:click={() => selectSituation(situation.letter)} use:standardEntry={i} use:scrollContrast use:pulsePrompt>
          <span class="situation-letter" aria-hidden="true">{situation.letter}</span>
          <span class="situation-quote" aria-hidden="true">{#each ui.situationLines[i] as line}<span>{line}</span>{/each}</span>
          <span class="selection-control"><span class="selection-pill">{selectionCopy.hint}</span></span>
        </button>
      {/each}
    </div>
    <div class="section-cta">
      <p class="situations-closing mobile-copy-14">{ui.situationClosing}</p>
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={homeCopy.hero.cta} />
    </div>
  </div>
</section>

<ThreeRSection {pageLanguage} {goals} />

{#if responseSituation}<SituationResponse situation={responseSituation} {pageLanguage} href={responseHref} cta={homeCopy.hero.cta} confirm={confirmSituation} close={closeSituation} />{/if}

<style>
  .video-notice { position: fixed; inset: 0; margin: auto; height: fit-content; box-sizing: border-box; width: min(540px, calc(100% - 2rem)); max-height: calc(100dvh - 2rem); overflow-y: auto; border: 0; border-radius: 16px; padding: 3rem 2rem 2.25rem; background: #f8f4f0; color: #233f4e; text-align: center; box-shadow: 0 20px 70px #071a2540; }
  .video-notice::backdrop { background: #071a25a3; -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); }
  .video-notice h2 { font-family: 'Newsreader', Georgia, serif; font-size: 28px; font-weight: 500; line-height: 1.2; margin: 0; }
  .notice-desktop-break { display: none; }
  @media (min-width: 768px) { .notice-desktop-break { display: block; } }
  .video-notice h2 .notice-video-accent { font-family: inherit; color: #4083a7; }
  .notice-mobile-break { display: none; }
  .video-notice p { margin: 1.25rem 0 1.75rem; font-size: 16px; line-height: 1.65; }
  .video-notice-close { position: absolute; top: .4rem; right: .4rem; width: 44px; height: 44px; border: 0; background: transparent; color: #233f4e; font-size: 30px; cursor: pointer; border-radius: 50%; }
  .video-notice-close:focus-visible { outline: 2px solid #245b7d; outline-offset: -4px; }
  @media (max-width: 767px) { .video-notice { padding: 3rem 1.25rem 1.75rem; } .notice-mobile-break { display: block; } .video-notice h2 { font-size: 24px; } .video-notice p { font-size: 14px; } }

  .section-space { padding: var(--home-section-start, 3.75rem) 1.5rem var(--home-section-end, 3.75rem); }
  .section-inner { max-width: 1072px; margin: 0 auto; }
  .vsl { background: #f8f4f0; }
  .section-heading { text-align: center; max-width: 840px; margin: 0 auto 2.75rem; }
  h2, h2 :global(span) { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; }
  h2 { font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.12; color: #233f4e; text-wrap: balance; }
  h2 :global(span) { color: #4083a7; }
  .section-heading > p:not(.vsl-headline) { max-width: 750px; margin: 1.25rem auto 0; font-size: 1rem; line-height: 1.7; color: #4f6571; }
  .vsl-headline, .vsl-headline span { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; }
  .vsl-headline { font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.12; color: #233f4e; text-wrap: balance; }
  .vsl-headline span { color: #4083a7; }
  .vsl h1 { font-family: 'Inter', Arial, sans-serif; font-weight: 300; font-size: 16px; line-height: 1.7; color: #233f4e; margin: 1rem 0 0; }
  .video-frame { max-width: 850px; margin: 0 auto; aspect-ratio: 16 / 9; border-radius: 12px; overflow: hidden; background: #e9eeee; box-shadow: -5px -5px 18px rgba(35, 63, 78, .11), 0 0 0 1px rgba(35, 63, 78, .06), 0 18px 45px rgba(35, 63, 78, .18), 0 4px 14px rgba(35, 63, 78, .1), 0 0 24px #8cd0d626; }
  video, .video-poster { width: 100%; height: 100%; }
  video { display: block; }
  .video-poster { position: relative; background: #fff; }
  .video-poster > img:first-child { position: absolute; bottom: 0; right: 0; width: 74%; height: 100%; object-fit: cover; object-position: 54% center; }
  .video-poster::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(140, 208, 214, .22) 0%, rgba(140, 208, 214, .18) 14%, rgba(140, 208, 214, .11) 30%, rgba(140, 208, 214, .04) 47%, rgba(140, 208, 214, 0) 64%); }
  .poster-copy { position: absolute; z-index: 2; top: 0; left: 0; width: 44%; height: 73%; padding: 3.5% 0 0 4%; display: flex; flex-direction: column; align-items: flex-start; color: #233f4e; }
  :global(.poster-brand) { position: absolute; z-index: 2; top: 4%; right: 3%; width: 60px; height: auto; }
  .poster-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; font-size: 40px; line-height: 1.02; margin: 0; }
  .poster-title span { display: block; font-family: inherit; white-space: nowrap; }
  .poster-title__first { color: #233f4e; }
  .poster-title__middle { color: #245b7d; }
  .poster-title__last { color: #4083a7; }
  .poster-description { max-width: 300px; font-family: 'Inter', Arial, sans-serif; font-size: 14px; line-height: 1.45; margin: 1.8rem 0 0; }
  .poster-phone { position: absolute; z-index: 2; left: 5.5%; bottom: -16%; width: 19%; transform: rotate(-9deg); filter: drop-shadow(0 8px 10px rgba(35, 63, 78, .18)); pointer-events: none; }
  .poster-phone-base { display: block; width: 100%; height: auto; }
  .poster-phone-screen { position: absolute; top: 7.8%; left: 24.2%; width: 61.8%; height: 68.1%; object-fit: fill; border-radius: 10% 10% 8% 8% / 5% 5% 3% 3%; }
  .poster-play { border: 0; padding: 0; cursor: pointer; position: absolute; z-index: 3; top: 50%; left: 50%; display: grid; place-items: center; width: clamp(56px, 9vw, 82px); aspect-ratio: 1; border-radius: 50%; background: #8cd0d6; color: #fff; box-shadow: 0 16px 36px rgba(35, 63, 78, .34), 0 5px 14px rgba(35, 63, 78, .22); transform: translate(-50%, -50%); transition: transform var(--dur-estado) var(--ease-calma), box-shadow var(--dur-estado) var(--ease-calma); }
  .poster-play::before,.poster-play::after{content:"";position:absolute;pointer-events:none;inset:0;border-radius:50%;border:1px solid
  rgba(248,244,240,.75);animation:eima-video-breathe 6s cubic-bezier(.22,.61,.21,1) infinite}
  .poster-play::after{animation-delay:3s}
  @keyframes eima-video-breathe{0%{transform:scale(1);opacity:.85}75%,100%{transform:scale(2);opacity:0}}
  @media (prefers-reduced-motion: reduce) { .poster-play::before, .poster-play::after { display: none; } }
  .poster-play svg { width: 88%; height: 88%; filter: drop-shadow(0 2px 3px rgba(35, 63, 78, .4)); }
.poster-play:focus-visible { transform: translate(-50%, -50%) scale(1.04); box-shadow: 0 19px 40px rgba(35, 63, 78, .38), 0 0 0 5px rgba(140, 208, 214, .25); }
@media (hover: hover) and (pointer: fine) { .poster-play:hover { transform: translate(-50%, -50%) scale(1.04); box-shadow: 0 19px 40px rgba(35, 63, 78, .38), 0 0 0 5px rgba(140, 208, 214, .25); } }
  .poster-play:focus-visible { outline: 2px solid #233f4e; outline-offset: 5px; }
  .section-cta { text-align: center; margin: 2.25rem auto 0; }
  .cta-note { max-width: 680px; margin: 1rem auto 0; font-size: 16px; line-height: 1.65; color: #233f4e; }
  :global(.desktop-only-break) { display: none; }
  @media (min-width: 768px) { .cta-note { white-space: pre-line; } :global(.desktop-only-break) { display: inline; } }
  .situations { background: #233f4e; }
  .situations :is(h2, p) { text-shadow: var(--eima-dark-copy-shadow); }
  .situations .section-heading { max-width: 1072px; }
  .situations h2 { color: #fff; }
  .situations h2 :global(span) { color: #8cd0d6; }
  .situations .section-heading > p:not(.vsl-headline) { color: #e8f8e0; max-width: 1072px; font-size: 16px; }
  .situations-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4rem 1.25rem; }
  @media (min-width: 1100px) {
    .situations-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .situations-grid .situation-card { display: flex; flex-direction: column; align-items: center; padding: 1.5rem 1rem; }
    .situations-grid .situation-letter { font-size: 5rem; }
    .situations-grid .situation-card .situation-quote { font-size: 20px; min-height: 5.28em; }
  }
  .situation-quote > span { display: block; font: inherit; }
  .situation-card { position: relative; z-index: 0; border: 1px solid #8cd0d642; border-radius: 10px; background: #ffffff08; padding: 1.8rem 1.5rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; aspect-ratio: 1; min-height: 252px; transform-origin: center; transition: opacity var(--dur-estado) var(--ease-calma), filter var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma), border-color var(--dur-estado) var(--ease-calma), box-shadow var(--dur-estado) var(--ease-calma), background-color var(--dur-estado) var(--ease-calma); }
  .situation-letter { display: block; font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: 7.2rem; line-height: .8; transform: translateY(-6px); color: #8cd0d6; margin-bottom: 1rem; text-align: center; }
  .situation-card .situation-quote { display: block; font-family: 'Newsreader', Georgia, serif; font-weight: 400; font-size: clamp(1.3rem, 2vw, 22px); line-height: 1.32; color: #fff; text-wrap: pretty; }
  .situations-closing { color: #e8f8e0; line-height: 1.7; max-width: 660px; margin: 0 auto 1.5rem; }
  .mobile-video-caption { display: none; }
  @media (min-width: 768px) { .poster-description--review { font-size: 13px; max-width: none; white-space: nowrap; } }
  @media (min-width: 768px) and (hover: hover) {
  }
  @media (max-width: 767.98px) {
    .vsl h1 { margin-inline: -12px; }
    .vsl .section-heading { margin-bottom: 1.375rem; }
    .programme-line { display: block; white-space: nowrap; }
    .vsl .section-cta { margin-top: 1.375rem; display: grid; justify-items: center; }
    .situations-grid { grid-template-columns: 1fr; justify-items: center; row-gap: 1.625rem; }
    .video-frame { aspect-ratio: 16 / 9; container-type: inline-size; }
    .situations-grid .situation-card { width: min(264px, 100%); aspect-ratio: 1; min-height: 0; padding: 1rem; }
    .situation-card .situation-quote { font-size: 20px; line-height: 1.3; }
    .situation-letter { font-size: 5rem; line-height: .8; margin-bottom: 1.25rem; transform: translateY(-4px); }

    .poster-copy { width: 44%; height: 73%; padding: 4% 0 0 4%; }
    .video-poster { background: #fff; }
    .video-poster > img:first-child { right: 0; width: 74%; height: 100%; object-fit: cover; object-position: 54% center; }
    :global(.poster-brand) { width: 7%; top: 4%; right: 3%; }
    .poster-title { font-size: clamp(16px, 4.7cqw, 17px); line-height: 1.18; margin: 0; }
    .poster-description { font-size: 1.65cqw; line-height: 1.45; margin-top: 3.4cqw; white-space: nowrap; }
    .poster-description--review { display: none; }
    .mobile-video-caption { position: relative; display: block; margin: 1rem auto 0; font-family: 'Newsreader', Georgia, serif; font-style: italic; font-size: 14px; font-weight: 400; line-height: 1.45; text-align: center; color: #4083a7; }
    :global(.poster-desktop-break) { display: initial; }
    .poster-phone { width: 18%; left: 5%; bottom: -13%; }
    .poster-play { width: clamp(56px, 9vw, 82px); left: 50%; top: 50%; }
    .situations-grid .situation-card:global(.scroll-active):not(:global(.will-reveal)) { z-index: 1; transform: scale(1.035); border-color: #8cd0d6; background: #ffffff13; box-shadow: var(--eima-halo-dark); }
    .situations-grid:not(.has-selection):has(> .situation-card:global(.scroll-active):not(:global(.will-reveal))) > .situation-card:not(:global(.scroll-active)):not(:global(.will-reveal)) { opacity: .88; filter: blur(.15px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .video-frame .poster-play { transform: translate(-50%, -50%); }
    .situation-card { transition: none; }
    .situations-grid .situation-card:global(.scroll-active):not(:global(.will-reveal)) { transform: none; }
  }
@media (hover: none) and (prefers-reduced-motion: no-preference), (pointer: coarse) and (prefers-reduced-motion: no-preference) { .poster-play:active { transform: translate(-50%, -50%) scale(.97); transition-duration: 100ms; } }
@media (max-width: 767px) {
    .section-heading > p:not(.vsl-headline), .vsl h1, .cta-note, .situations-closing { font-size: 14px !important; font-weight: 400; line-height: 1.6; }
  }

  @media (max-width: 767px) {
    .vsl h1 { line-height: 1.3; }
    .vsl .cta-note { font-size: 13px !important; line-height: 1.4; max-width: none; margin-inline: -12px; text-wrap: balance; }
  }
  .situation-card { width: 100%; cursor: pointer; }
  .selection-instruction { font: italic 400 14px/1.35 'Newsreader', 'Iowan Old Style', Georgia, serif; color: #e8f8e0; text-align: center; margin: 0 0 1.25rem; }
  .selection-instruction span { font: inherit; }
  .instruction-mobile { display: none; }
  .situations .section-heading > p:not(.vsl-headline) { color: #f8f4f0; }
  .selection-instruction { color: #e8e8f8; }
  .selection-control { display: block; position: absolute; z-index: 4; top: calc(100% + 8px); left: 50%; white-space: nowrap; opacity: 0; visibility: hidden; transform: translate(-50%, 12px); transition: opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma), visibility var(--dur-estado); }
  .situation-card:focus-visible .selection-control, .situation-card.selected .selection-control { opacity: 1; visibility: visible; transform: translate(-50%, 0); }
  .situations .section-cta { margin-top: 4.5rem; }
  .selection-pill { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; border: 1px solid #8cd0d6; border-radius: 999px; min-height: 30px; padding: .25rem .75rem; color: #233f4e; font: 400 12px/1.2 Inter, sans-serif; background: #8CD0D6; box-shadow: 0 4px 12px #071a2520; transition: background var(--dur-estado) var(--ease-calma), color var(--dur-estado) var(--ease-calma); }
  .situations-grid .situation-card.selected { border-color: #8cd0d6; box-shadow: var(--eima-halo-dark); background: #ffffff13; opacity: 1; }
  .selected .selection-pill { background: #8cd0d6; color: #233f4e; }
  .situations-grid.has-selection > .situation-card:not(.selected):not(:global(.standard-entry-pending)) { opacity: .6; filter: none; }
  .situation-card:focus-visible { outline: 2px solid #8cd0d6; outline-offset: 5px; }
  @media (hover: hover) and (pointer: fine) {
    .situations .section-cta { margin-top: 4.5rem; }
    .situation-card:hover { z-index: 3; transform: scale(1.035); border-color: #8cd0d6; box-shadow: var(--eima-halo-dark); }
    .situation-card:hover .selection-control { opacity: 1; visibility: visible; transform: translate(-50%, 0); }
  }
  @media (prefers-reduced-motion: no-preference) { .selection-pill:global(.pulse-prompt) { animation: selection-pulse 800ms var(--ease-calma); animation-iteration-count: 3; } }
  @keyframes selection-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
@media (prefers-reduced-motion: reduce) { .situation-card:hover { transform: none; } }
@media (hover: none), (pointer: coarse) { .selection-control { opacity: 1; visibility: visible; transform: translate(-50%, 0); } }
@media (prefers-reduced-motion: reduce) { .selection-control { transition: none; transform: translate(-50%, 0); } }
@media (max-width: 767px) { .selection-instruction { font-size: 12px; white-space: nowrap; } }
  @media (max-width: 360px) { .vsl .cta-note { font-size: 11.5px !important; } }
  @media (max-width: 767px) {
    .instruction-desktop { display: none; }
    .selection-control { display: none; }
    .instruction-mobile { display: inline; }
    .vsl .cta-note { display: none; }
    .situations .section-cta { margin-top: 4rem; }
  }
</style>
