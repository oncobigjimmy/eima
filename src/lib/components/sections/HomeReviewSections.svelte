<script lang="ts">
  import { scrollContrast } from '$lib/actions/scrollContrast';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import type { Language } from '$lib/i18n/copy';
  import { homeSections } from '$lib/i18n/reviewed';
  import { getRoutePath } from '$lib/i18n/routes';
  import { homeVideoEs } from '$lib/data/home-es';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import BrandLogo from '$lib/components/BrandLogo.svelte';
  import PatientProofSection from '$lib/components/sections/PatientProofSection.svelte';
  import ParallaxSloganSection from '$lib/components/sections/ParallaxSloganSection.svelte';
  import { getProgramCopy } from '$lib/i18n/program';

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
  const captionText = ui.posterDescription.replace(/<br[^>]*>/g, '');

  function writeCaption(node: HTMLElement) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767.98px)');
    const ink = node.querySelector<HTMLElement>('.caption-typed');
    if (!ink || !('IntersectionObserver' in window) || reduced.matches) return {};
    let timer = 0;
    let started = false;
    if (mobile.matches) ink.textContent = '';
    const finish = () => {
      window.clearTimeout(timer);
      ink.textContent = captionText;
      ink.classList.remove('is-writing');
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || !mobile.matches || started) return;
      started = true;
      observer.disconnect();
      if (reduced.matches) { finish(); return; }
      let length = 0;
      ink.textContent = '';
      ink.classList.add('is-writing');
      const type = () => {
        length += 1;
        ink.textContent = captionText.slice(0, length);
        if (length < captionText.length) timer = window.setTimeout(type, 28);
        else finish();
      };
      type();
    }, { threshold: .6 });
    const changed = () => {
      if (reduced.matches || !mobile.matches) finish();
      else if (!started) ink.textContent = '';
    };
    observer.observe(node);
    reduced.addEventListener('change', changed);
    mobile.addEventListener('change', changed);
    return { destroy() {
      observer.disconnect();
      window.clearTimeout(timer);
      reduced.removeEventListener('change', changed);
      mobile.removeEventListener('change', changed);
    } };
  }

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

  function revealGoal(node: HTMLElement) {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || preference.matches) return {};
    node.classList.add('goal-pending');
    const show = () => { node.classList.add('goal-visible'); observer.disconnect(); };
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) show(); }, { threshold: 0.15 });
    const motionChanged = () => { if (preference.matches) show(); };
    preference.addEventListener('change', motionChanged);
    observer.observe(node);
    return { destroy() { observer.disconnect(); preference.removeEventListener('change', motionChanged); } };
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
            <p class="poster-description" class:poster-description--review={pageLanguage === 'es'}>{@html ui.posterDescription}</p>
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
    {#if pageLanguage === 'es'}
      <p class="mobile-video-caption" use:writeCaption>
        <span class="sr-only">{captionText}</span>
        <span class="caption-space" aria-hidden="true">{captionText}</span>
        <span class="caption-typed" aria-hidden="true">{captionText}</span>
      </p>
    {/if}
    <div class="section-cta">
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={homeCopy.hero.cta} />
      <p class="cta-note mobile-copy-14">{note}</p>
    </div>
  </div>
</section>

<ParallaxSloganSection
  image="/Gemini_Generated_Image_y50u8jy50u8jy50u-100.png"
  compact
  sectionClass="home-banner-section"
  topHtml={getProgramCopy(pageLanguage).slogan1.topHtml}
  bottomHtml={getProgramCopy(pageLanguage).slogan1.bottomHtml}
  mobileTopSize={15}
  desktopTopSize={22}
  mobileBottomSize={21.5}
  desktopBottomSize={35}
/>

<PatientProofSection {pageLanguage} />

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
      <p class="recovery-subtitle" use:revealGoal>
        <span class="recovery-brush">
          <svg class="brush-stroke" viewBox="0 0 500 70" preserveAspectRatio="none" aria-hidden="true">
            <path d="M18 13 Q126 6 248 11 T481 10 Q490 10 493 17 Q498 34 491 51 Q488 57 478 57 Q353 62 244 58 T18 60 Q9 59 7 51 Q3 34 9 21 Q12 15 18 13Z" />
          </svg>
          <span class="brush-label">{@html ui.recoverySubtitle}</span>
          <span class="brush-white" aria-hidden="true">{@html ui.recoverySubtitle}</span>
        </span>
      </p>
    </header>
    <div class="recovery-grid">
      {#each goals as goal, i}
        <article class="recovery-row" use:revealGoal>
          <svg class="recovery-symbol" viewBox="0 0 300 180" aria-hidden="true">
            {#if i < 2}
              <g transform={i === 0 ? 'translate(0 180) scale(1 -1)' : undefined}>
                <path d="M25 145 55 119 81 134 117 97 146 116 183 73 213 93 265 39" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="miter" />
                <path d="M242 34 290 17 277 66Z" fill="currentColor" />
              </g>
            {:else}
              <g transform="translate(60 0)" fill="none" stroke="currentColor" stroke-width="17" stroke-linecap="round" stroke-linejoin="round">
                <path d="M140 61A62 62 0 1 0 149 103 M140 25V63H102" />
              </g>
            {/if}
          </svg>
          <div class="recovery-concept">
            <h3 class="recovery-word">{goal.title}</h3>
          </div>
          <div class="goal-content">
            <p class="goal-subtitle">{goal.subtitle}</p>
            <p class="goal-body">{goal.body}</p>
          </div>
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
  .recovery h2 { color: #233f4e; }
  .section-heading > .recovery-subtitle { font-family: 'Fraunces', Georgia, serif; color: #233f4e; font-size: 26px; margin: 1.25rem auto 0; }
  .recovery-subtitle :global(strong) { font-family: inherit; font-weight: 500; }
  .recovery-brush { position: relative; display: inline-grid; isolation: isolate; font-family: 'Fraunces', Georgia, serif; padding: .3em .7em .35em; }
  .brush-stroke { position: absolute; z-index: -1; inset: 0; width: 100%; height: 100%; color: #245b7d; fill: currentColor; }
  .brush-label, .brush-white { grid-area: 1 / 1; font-family: inherit; }
  .brush-label { color: #233f4e; }
  .brush-white { color: #fff; }
  .recovery-subtitle:global(.goal-pending) .brush-stroke { clip-path: inset(0 100% 0 0); transition: clip-path 1000ms cubic-bezier(.22, 1, .36, 1); }
  .recovery-subtitle:global(.goal-pending) .brush-white { clip-path: inset(0 100% 0 0); transition: clip-path 1000ms cubic-bezier(.22, 1, .36, 1); }
  .recovery-subtitle:global(.goal-visible) .brush-stroke { clip-path: inset(0); }
  .recovery-subtitle:global(.goal-visible) .brush-white { clip-path: inset(0); }
  .recovery .section-heading { margin-bottom: 2.25rem; }
  .recovery-grid { display: grid; grid-template-columns: minmax(0, 1fr); }
  .recovery-row { position: relative; isolation: isolate; display: grid; grid-template-columns: minmax(0, .73fr) minmax(0, 2.12fr); align-items: start; gap: clamp(1rem, 2.5vw, 2.25rem); padding: 2rem 0; }
  .recovery-concept { position: relative; isolation: isolate; }
  .recovery-symbol { position: absolute; z-index: -1; width: 250px; height: 150px; left: 0; top: 50%; transform: translateY(-50%); color: #e8e8f6; opacity: .65; filter: blur(2px); pointer-events: none; }
  .recovery-row:global(.goal-pending) > .recovery-symbol { opacity: 0; transition: opacity 650ms ease; }
  .recovery-row:global(.goal-visible) > .recovery-symbol { opacity: .65; }
  .recovery-row + .recovery-row::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: #233f4e30; transform-origin: left; }
  .recovery-word { font-family: 'Fraunces', Georgia, serif; font-weight: 400; font-size: clamp(36px, 4vw, 52px); line-height: 1.1; color: #4083a7; }
  .goal-subtitle { font-family: 'Fraunces', Georgia, serif; font-size: 25px; font-weight: 500; line-height: 1.4; color: #233f4e; }
  .goal-body { font-family: 'Inter', Arial, sans-serif; font-size: 16px; line-height: 1.7; margin-top: .75rem; color: #233f4e; }
  .recovery-row:global(.goal-pending) > div { opacity: 0; transform: translateY(8px); transition: opacity 650ms ease, transform 650ms ease; }
  .recovery-row:global(.goal-visible) > div { opacity: 1; transform: none; }
  .recovery-row:global(.goal-pending)::before { transform: scaleX(0); transition: transform 800ms ease; }
  .recovery-row:global(.goal-visible)::before { transform: scaleX(1); }
  .mobile-video-caption { display: none; }
  @media (min-width: 768px) { .poster-description--review { font-size: 13px; max-width: none; white-space: nowrap; } }
  .situation-card:global(.will-reveal) { opacity: 0; transform: translateY(18px); transition: opacity 550ms ease, transform 550ms ease, border-color 175ms ease, box-shadow 175ms ease, background-color 175ms ease; transition-delay: var(--delay, 0ms); }
  .situation-card:global(.is-visible) { opacity: 1; transform: none; }
  @media (min-width: 768px) and (hover: hover) {
    .situations-grid .situation-card:global(.is-visible):hover { z-index: 1; transform: scale(1.035); border-color: #8cd0d6; background: #ffffff13; box-shadow: 0 18px 38px #071a2580, 0 0 0 1px #8cd0d680, 0 0 22px #8cd0d64d; }
    .situations-grid:has(> .situation-card:global(.is-visible):hover) > .situation-card:not(:hover):not(:global(.will-reveal)) { opacity: .88; filter: blur(.15px); }
  }
  @media (max-width: 767.98px) {
    .vsl h1 { margin-inline: -12px; }
    .vsl .section-heading { margin-bottom: 3rem; }
    .programme-line { display: block; white-space: nowrap; }
    .vsl .section-cta { margin-top: 3rem; display: grid; justify-items: center; }
    .situations-grid { grid-template-columns: 1fr; }
    .recovery-grid { grid-template-columns: minmax(0, 1fr); }
    .video-frame { aspect-ratio: 16 / 9; container-type: inline-size; }
    .recovery h2 { white-space: normal; }
    .section-heading > .recovery-subtitle { font-size: clamp(17px, 5.4vw, 26px); }
    .goal-subtitle { font-size: 18px; }
    .situation-card { padding: 1.75rem 1.25rem; }
    .situation-letter { font-size: 5rem; margin-bottom: .8rem; }
    .recovery-row { grid-template-columns: minmax(0, 1fr); gap: .75rem; padding: 1.75rem 0; }
    .recovery-symbol { width: 100%; height: calc(100% - 2rem); left: 0; top: 1rem; transform: none; filter: blur(3px); }
    .recovery-word { font-size: 32px; }
    .poster-copy { width: 44%; height: 73%; padding: 4% 0 0 4%; }
    .video-poster { background: #fff; }
    .video-poster > img:first-child { right: 0; width: 74%; height: 100%; object-fit: cover; object-position: 54% center; }
    :global(.poster-brand) { width: 7%; top: 4%; right: 3%; }
    .poster-title { font-size: clamp(16px, 4.7cqw, 17px); line-height: 1.18; margin: 0; }
    .poster-description { font-size: 1.65cqw; line-height: 1.45; margin-top: 3.4cqw; white-space: nowrap; }
    .poster-description--review { display: none; }
    .mobile-video-caption { position: relative; display: block; margin: 1rem auto 0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 1.45; text-align: center; color: #233f4e; }
    .caption-space { visibility: hidden; }
    .caption-typed { position: absolute; inset: 0; }
    .caption-typed:global(.is-writing)::after { content: ''; display: inline-block; width: 1px; height: .9em; margin-left: 2px; background: currentColor; opacity: .5; }
    :global(.poster-desktop-break) { display: initial; }
    .poster-phone { width: 18%; left: 5%; bottom: -13%; }
    .poster-play { width: 10%; min-width: 32px; left: 50%; top: 50%; }
    .situations-grid .situation-card:global(.scroll-active):not(:global(.will-reveal)) { z-index: 1; transform: scale(1.035); border-color: #8cd0d6; background: #ffffff13; box-shadow: 0 18px 38px #071a2580, 0 0 0 1px #8cd0d680, 0 0 22px #8cd0d64d; }
    .situations-grid:has(> .situation-card:global(.scroll-active):not(:global(.will-reveal))) > .situation-card:not(:global(.scroll-active)):not(:global(.will-reveal)) { opacity: .88; filter: blur(.15px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .video-frame:global(.will-reveal), .situation-card:global(.will-reveal) { opacity: 1; transform: none; transition: none; }
    .situation-card { transition: none; }
    .recovery-row:global(.goal-pending) > div { opacity: 1; transform: none; transition: none; }
    .recovery-row:global(.goal-pending)::before { transform: none; transition: none; }
    .recovery-row:global(.goal-pending) > .recovery-symbol { opacity: .65; transition: none; }
    .recovery-subtitle:global(.goal-pending) .brush-stroke { clip-path: none; transition: none; }
    .recovery-subtitle:global(.goal-pending) .brush-white { clip-path: none; transition: none; }
    .goal-body { color: #233f4e; -webkit-text-fill-color: #233f4e; }
    .situations-grid .situation-card:global(.is-visible):hover { transform: none; }
    .situations-grid .situation-card:global(.scroll-active):not(:global(.will-reveal)) { transform: none; }
  }
</style>
