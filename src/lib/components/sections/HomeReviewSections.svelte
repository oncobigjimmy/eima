<script lang="ts">
  import { scrollContrast } from '$lib/actions/scrollContrast';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import type { Language } from '$lib/i18n/copy';
  import { homeSections } from '$lib/i18n/reviewed';
  import { getRoutePath } from '$lib/i18n/routes';
  import { homeVideoEs } from '$lib/data/home-es';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import BrandLogo from '$lib/components/BrandLogo.svelte';

  export let pageLanguage: Language = 'es';
  const ui = homeSections[pageLanguage];
  const homeCopy = getCopy(pageLanguage).home;
  const programmeBreak = { es: 'con cáncer', ca: 'amb càncer', en: 'with cancer' }[pageLanguage];
  const programmeLines = ui.programme.replace(` ${programmeBreak}`, `\n${programmeBreak}`).split('\n');
  const whatsappHref = getWhatsAppHref(pageLanguage, true);
  const note = pageLanguage === 'es'
    ? homeCopy.hero.note.replace(' si este acompañamiento', '\nsi este acompañamiento')
    : pageLanguage === 'en'
      ? homeCopy.hero.note.replace(' whether this support', '\nwhether this support')
      : homeCopy.hero.note;
  const goals = homeCopy.recovery.goals.map((goal, index) => index === 0
    ? { ...goal, body: ui.firstGoalBody }
    : index === 2 ? { ...goal, subtitle: ui.thirdGoalSubtitle, body: ui.thirdGoalBody } : goal);
  const situations = ui.situations.map((quote, index) => ({ letter: 'ABC'[index], quote }));
  let videoNearby = false;
  const videoReady = Boolean(homeVideoEs.src && homeVideoEs.captions);

  function nearVideo(node: HTMLElement) {
    if (!('IntersectionObserver' in window)) { videoNearby = true; return {}; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { videoNearby = true; observer.disconnect(); }
    }, { rootMargin: '200px' });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }

  function reveal(node: HTMLElement) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
    node.classList.add('will-reveal');
    let finishReveal = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        finishReveal = window.setTimeout(() => node.classList.remove('will-reveal'), 550 + Number.parseFloat(node.style.getPropertyValue('--delay') || '0'));
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return { destroy() { observer.disconnect(); window.clearTimeout(finishReveal); } };
  }

  function revealVsl(node: HTMLElement) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
    node.classList.add('will-reveal');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }

  function fillConcept(node: HTMLElement) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const height = window.innerHeight;
      const progress = reducedMotion.matches ? 1 : Math.max(0, Math.min(1, (height * .93 - rect.top) / (height * .73)));
      node.style.setProperty('--fill', `${progress * 100}%`);
      node.classList.toggle('is-active', window.innerWidth < 768 && rect.top < height * .65 && rect.bottom > height * .35);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    return { destroy() {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      if (frame) cancelAnimationFrame(frame);
    } };
  }

  function revealHighlight(node: HTMLElement) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
    node.classList.add('will-reveal');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }
</script>

<section class="vsl section-space" aria-labelledby="vsl-title">
  <div class="section-inner">
    <header class="section-heading">
      <p class="vsl-headline section-playfair-desktop">{ui.vslBefore} <span>Empenta</span>{ui.vslAfter}</p>
      <h1 id="vsl-title" class="mobile-copy-14" aria-label={ui.programme}>{#each programmeLines as line, index}{#if index > 0}{' '}{/if}<span class="programme-line">{line}</span>{/each}</h1>
    </header>
    <div class="video-frame" use:nearVideo use:revealVsl>
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
            <p class="poster-description">{@html ui.posterDescription}</p>
          </div>
          <div class="poster-phone" role="img" aria-label={ui.phoneAlt}>
            <img class="poster-phone-base" src="/vsl-harbiz-hand.webp" alt="" width="898" height="1751" loading="lazy" />
            <img class="poster-phone-screen" src="/harbiz-client-agenda.png" alt="" width="576" height="1280" loading="lazy" />
          </div>
          <a class="poster-play" href={getRoutePath('program', pageLanguage)} aria-label={ui.play}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.7a1 1 0 0 1 1.5-.86l9.2 6.3a1 1 0 0 1 0 1.72l-9.2 6.3A1 1 0 0 1 8 18.3V5.7Z" /></svg>
          </a>
        </div>
      {/if}
    </div>
    <div class="section-cta">
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={homeCopy.hero.cta} />
      <p class="cta-note mobile-copy-14">{note}</p>
    </div>
  </div>
</section>

<section class="situations section-space" aria-labelledby="situations-title">
  <div class="section-inner">
    <header class="section-heading">
      <h2 id="situations-title" class="section-playfair-desktop">{@html ui.situationTitle}</h2>
      <p class="mobile-copy-14">{@html ui.situationIntro}</p>
    </header>
    <div class="situations-grid hover-dim-group">
      {#each situations as situation, i}
        <article class="situation-card hover-dim-item" use:reveal use:scrollContrast style={`--delay: ${i * 80}ms`}>
          <span class="situation-letter" aria-hidden="true">{situation.letter}</span>
          <h3>{situation.quote}</h3>
        </article>
      {/each}
    </div>
    <div class="section-cta">
      <p class="situations-closing mobile-copy-14">{ui.situationClosing}</p>
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={homeCopy.hero.cta} />
    </div>
  </div>
</section>

<section class="recovery section-space" class:recovery--translated={pageLanguage !== 'es'} aria-labelledby="recovery-title">
  <div class="section-inner">
    <header class="section-heading">
      <h2 id="recovery-title" class="section-playfair-desktop">{@html ui.recoveryTitle}</h2>
      <p class="recovery-subtitle" use:revealHighlight>
        <span class="recovery-highlight">
          <span class="recovery-highlight__base" aria-hidden="true">{@html ui.recoverySubtitle}</span>
          <span class="recovery-highlight__paint">{@html ui.recoverySubtitle}</span>
        </span>
      </p>
    </header>
    <div class="recovery-grid">
      {#each goals as goal, i}
        <article class="recovery-column" use:fillConcept>
          <h3 class="recovery-word"><span class="recovery-initial">R</span>{goal.title.slice(1)}</h3>
          <p class="goal-subtitle">{goal.subtitle}</p>
          <p class="goal-body">{goal.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .section-space { padding: var(--home-section-start, 3.75rem) 1.5rem var(--home-section-end, 3.75rem); }
  .section-inner { max-width: 1072px; margin: 0 auto; }
  .vsl, .recovery { background: #f8f4f0; }
  .section-heading { text-align: center; max-width: 840px; margin: 0 auto 2.75rem; }
  h2, h2 :global(span) { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; }
  h2 { font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.12; color: #233f4e; text-wrap: balance; }
  h2 :global(span) { color: #4083a7; }
  .section-heading > p:not(.vsl-headline):not(.recovery-subtitle) { max-width: 750px; margin: 1.25rem auto 0; font-size: 1rem; line-height: 1.7; color: #4f6571; }
  .vsl-headline, .vsl-headline span { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; }
  .vsl-headline { font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.12; color: #233f4e; text-wrap: balance; }
  .vsl-headline span { color: #4083a7; }
  .vsl h1 { font-family: 'Inter', Arial, sans-serif; font-weight: 300; font-size: 16px; line-height: 1.7; color: #233f4e; margin: 1rem 0 0; }
  .video-frame:global(.will-reveal) { opacity: 0; transform: translateY(-30px); transition: opacity 700ms ease-out, transform 700ms ease-out; }
  .video-frame:global(.is-visible) { opacity: 1; transform: none; }
  .video-frame { max-width: 850px; margin: 0 auto; aspect-ratio: 16 / 9; border-radius: 12px; overflow: hidden; background: #e9eeee; box-shadow: -5px -5px 18px rgba(35, 63, 78, .11), 0 0 0 1px rgba(35, 63, 78, .06), 0 18px 45px rgba(35, 63, 78, .18), 0 4px 14px rgba(35, 63, 78, .1); }
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
  .poster-play { position: absolute; z-index: 3; top: 50%; left: 50%; display: grid; place-items: center; width: clamp(64px, 9vw, 82px); aspect-ratio: 1; border-radius: 50%; background: #8cd0d6; color: #fff; box-shadow: 0 16px 36px rgba(35, 63, 78, .34), 0 5px 14px rgba(35, 63, 78, .22); transform: translate(-50%, -50%); transition: transform 220ms ease, box-shadow 220ms ease; }
  .poster-play svg { width: 88%; height: 88%; filter: drop-shadow(0 2px 3px rgba(35, 63, 78, .4)); }
  .poster-play:hover, .poster-play:focus-visible { transform: translate(-50%, -50%) scale(1.04); box-shadow: 0 19px 40px rgba(35, 63, 78, .38), 0 0 0 5px rgba(140, 208, 214, .25); }
  .poster-play:focus-visible { outline: 2px solid #233f4e; outline-offset: 5px; }
  .section-cta { text-align: center; margin: 2.25rem auto 0; }
  .cta-note { max-width: 680px; margin: 1rem auto 0; font-size: 16px; line-height: 1.65; color: #233f4e; }
  :global(.desktop-only-break) { display: none; }
  @media (min-width: 768px) { .cta-note { white-space: pre-line; } :global(.desktop-only-break) { display: inline; } }
  .situations { background: #233f4e; }
  .situations .section-heading { max-width: 1072px; }
  .situations h2 { color: #fff; }
  .situations h2 :global(span) { color: #8cd0d6; }
  .situations .section-heading > p:not(.vsl-headline):not(.recovery-subtitle) { color: #e0e9ed; max-width: 1072px; font-size: 16px; }
  .situations-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
  .situation-card { position: relative; z-index: 0; border: 1px solid #8cd0d642; border-radius: 10px; background: #ffffff08; padding: 1.8rem 1.5rem 2rem; text-align: center; transform-origin: center; transition: opacity 280ms ease, filter 280ms ease, transform 280ms cubic-bezier(.22, 1, .36, 1), border-color 175ms ease, box-shadow 175ms ease, background-color 175ms ease; }
  .situation-letter { display: block; font-family: 'Playfair Display', Georgia, serif; font-weight: 400; font-size: 6rem; line-height: 1; color: #8cd0d6; margin-bottom: 1rem; text-align: center; }
  .situation-card h3 { font-family: 'Fraunces', Georgia, serif; font-weight: 400; font-size: clamp(1.3rem, 2vw, 22px); line-height: 1.32; color: #fff; text-wrap: pretty; }
  .situations-closing { color: #e0e9ed; line-height: 1.7; max-width: 660px; margin: 0 auto 1.5rem; }
  .recovery h2 { color: #233f4e; white-space: nowrap; }
  .section-heading > .recovery-subtitle { font-family: 'Fraunces', Georgia, serif; font-weight: 400; color: #233f4e; font-size: 26px; margin: 1.25rem auto 0; }
  .recovery-highlight { display: inline-grid; font-family: 'Fraunces', Georgia, serif; white-space: nowrap; }
  .recovery-highlight__base, .recovery-highlight__paint { grid-area: 1 / 1; padding: .18em .42em .23em; font-family: 'Fraunces', Georgia, serif; }
  .recovery-highlight__base { color: #233f4e; }
  .recovery-highlight__paint { position: relative; isolation: isolate; color: #f8f4f0; }
  .recovery-highlight__paint::before { position: absolute; z-index: -1; inset: .02em -.06em .01em; content: ''; background: #4083a7; border-radius: 10px 7px 9px 8px / 7px 9px 8px 10px; }
  .recovery-subtitle:global(.will-reveal) .recovery-highlight__paint { clip-path: inset(0 100% 0 0); transition: clip-path 1150ms cubic-bezier(.22, 1, .36, 1); }
  .recovery-subtitle:global(.is-visible) .recovery-highlight__paint { clip-path: inset(0 0 0 0); }
  .recovery-subtitle :global(strong) { font-family: 'Fraunces', Georgia, serif; font-weight: 500; }
  .recovery-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .recovery-column { padding: 1rem; border: 1px solid transparent; border-radius: 12px; transition: opacity 300ms ease, background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease; }
  .recovery-word, .goal-subtitle { width: max-content; max-width: 100%; }
  .recovery-word, .goal-subtitle, .goal-body { background: linear-gradient(to right, #4083a7 0 var(--fill, 0%), #233f4e var(--fill, 0%) 100%); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
  .recovery-word { font-family: 'Fraunces', Georgia, serif; font-weight: 400; font-size: 40px; line-height: 1; }
  .recovery-initial { font-family: 'Fraunces', Georgia, serif; font-weight: 400; font-size: 65px; line-height: .85; }
  .goal-subtitle { font-family: 'Fraunces', Georgia, serif; font-size: 17px; font-weight: 500; line-height: 1.4; margin-top: .15rem; }
  .goal-body { position: relative; font-family: 'Inter', Arial, sans-serif; font-size: .95rem; line-height: 1.7; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1.5px solid #233f4e; }
  .goal-body::before { content: ''; position: absolute; top: -1.5px; left: 0; width: var(--fill, 0%); height: 1.5px; background: #4083a7; }
  .situation-card:global(.will-reveal) { opacity: 0; transform: translateY(18px); transition: opacity 550ms ease, transform 550ms ease, border-color 175ms ease, box-shadow 175ms ease, background-color 175ms ease; transition-delay: var(--delay, 0ms); }
  .situation-card:global(.is-visible) { opacity: 1; transform: none; }
  @media (min-width: 768px) and (hover: hover) {
    .situations-grid .situation-card:global(.is-visible):hover { z-index: 1; transform: scale(1.035); border-color: #8cd0d6; background: #ffffff13; box-shadow: 0 18px 38px #071a2580, 0 0 0 1px #8cd0d680, 0 0 22px #8cd0d64d; }
    .situations-grid:has(> .situation-card:global(.is-visible):hover) > .situation-card:not(:hover):not(:global(.will-reveal)) { opacity: .42; filter: blur(1px); }
    .recovery-grid:hover .recovery-column:not(:hover) { opacity: .87; }
    .recovery-column:hover { background: #ffffff8a; border-color: #8cd0d680; box-shadow: 0 12px 28px #233f4e14; transform: translateY(-5px); }
  }
  @media (max-width: 767px) {
    .vsl h1 { margin-inline: -12px; }
    .vsl .section-heading { margin-bottom: 3rem; }
    .programme-line { display: block; white-space: nowrap; }
    .vsl .section-cta { margin-top: 3rem; display: grid; justify-items: center; }
    .situations-grid, .recovery-grid { grid-template-columns: 1fr; }
    .recovery-grid { grid-template-columns: minmax(0, 1fr); }
    .recovery-column { min-width: 0; }
    .video-frame { aspect-ratio: 16 / 9; container-type: inline-size; }
    .recovery h2 { white-space: normal; }
    .recovery-highlight { max-width: 100%; white-space: nowrap; }
    .section-heading > .recovery-subtitle { font-size: clamp(17px, 5.4vw, 26px); }
    .goal-subtitle { font-size: 14px; max-width: calc(100% + 8px); }
    .recovery-highlight__base, .recovery-highlight__paint { min-width: 0; }
    .situation-card { padding: 1.75rem 1.25rem; }
    .situation-letter { font-size: 5rem; margin-bottom: .8rem; }
    .recovery-grid { gap: 2.5rem; }
    .recovery-column { max-width: 460px; margin: 0 auto; width: 100%; }
    .recovery-column:global(.is-active) { background: #ffffff8a; border-color: #8cd0d680; box-shadow: 0 10px 24px #233f4e12; }
    .recovery-word { font-size: 32px; }
    .recovery-initial { font-size: 50px; }
    .poster-copy { width: 44%; height: 73%; padding: 4% 0 0 4%; }
    .video-poster { background: #fff; }
    .video-poster > img:first-child { right: 0; width: 74%; height: 100%; object-fit: cover; object-position: 54% center; }
    :global(.poster-brand) { width: 7%; top: 4%; right: 3%; }
    .poster-title { font-size: 4.7cqw; margin: 0; }
    .poster-description { font-size: 1.65cqw; line-height: 1.45; margin-top: 3.4cqw; white-space: nowrap; }
    :global(.poster-desktop-break) { display: initial; }
    .poster-phone { width: 18%; left: 5%; bottom: -13%; }
    .poster-play { width: 10%; min-width: 32px; left: 50%; top: 50%; }
    .situations-grid .situation-card:global(.scroll-active):not(:global(.will-reveal)) { z-index: 1; transform: scale(1.035); border-color: #8cd0d6; background: #ffffff13; box-shadow: 0 18px 38px #071a2580, 0 0 0 1px #8cd0d680, 0 0 22px #8cd0d64d; }
    .situations-grid:has(> .situation-card:global(.scroll-active):not(:global(.will-reveal))) > .situation-card:not(:global(.scroll-active)):not(:global(.will-reveal)) { opacity: .42; filter: blur(1px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .video-frame:global(.will-reveal), .situation-card:global(.will-reveal) { opacity: 1; transform: none; transition: none; }
    .situation-card { transition: none; }
    .recovery-column { transition: none; }
    .recovery-column:hover { transform: none; }
    .recovery-grid:hover .recovery-column:not(:hover) { opacity: 1; }
    .recovery-word, .goal-subtitle, .goal-body { background: none; color: #4083a7; -webkit-text-fill-color: #4083a7; }
    .recovery-subtitle:global(.will-reveal) .recovery-highlight__paint { clip-path: none; transition: none; }
    .situations-grid .situation-card:global(.is-visible):hover { transform: none; }
    .situations-grid .situation-card:global(.scroll-active):not(:global(.will-reveal)) { transform: none; }
  }
</style>
