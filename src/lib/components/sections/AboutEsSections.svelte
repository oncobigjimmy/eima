<script lang="ts">
  import { standardEntry } from '$lib/actions/standardEntry';
  import { selectedSituation } from '$lib/data/situation';
  import { scrollContrast } from '$lib/actions/scrollContrast';
  import type { Language } from '$lib/i18n/copy';
  import { aboutSections } from '$lib/i18n/reviewed';
  import { getAboutCopy } from '$lib/i18n/about';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { getRoutePath } from '$lib/i18n/routes';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';

  export let pageLanguage: Language = 'es';
  const ui = aboutSections[pageLanguage];
  const copy = getAboutCopy(pageLanguage);
  $: whatsappHref = getWhatsAppHref(pageLanguage, false, $selectedSituation);
  const storyPath = getRoutePath('story', pageLanguage);
  const originCards = ui.cards;
  const mobileTitleLines: Record<number, string[]> = pageLanguage === 'es' ? {
    1: ['Lo que te va bien hoy', 'puede cambiar mañana'],
    2: ['Las dudas no aparecen', 'solo en consulta'],
    3: ['El miedo a hacerte daño', 'te acaba frenando'],
    5: ['Sin apoyo, es fácil dejarlo', 'para otro día']
  } : {};
  let typedDefinitionOne = '';
  let typedDefinitionTwo = '';
  let dictionaryTyping = false;

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  function typeOnView(node: HTMLElement) {
    let cancelled = false;
    let started = false;
    const complete = () => { typedDefinitionOne = copy.dictionary.definitionOne; typedDefinitionTwo = copy.dictionary.definitionTwo; };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { complete(); return {}; }
    const start = async () => {
      if (started) return;
      started = true;
      dictionaryTyping = true;
      await sleep(300);
      for (let i = 1; i <= copy.dictionary.definitionOne.length && !cancelled; i++) { typedDefinitionOne = copy.dictionary.definitionOne.slice(0, i); await sleep(42); }
      await sleep(350);
      for (let i = 1; i <= copy.dictionary.definitionTwo.length && !cancelled; i++) { typedDefinitionTwo = copy.dictionary.definitionTwo.slice(0, i); await sleep(38); }
      dictionaryTyping = false;
    };
    if (!('IntersectionObserver' in window)) { complete(); return {}; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { observer.disconnect(); start(); } }, { threshold: .3 });
    observer.observe(node);
    return { destroy() { cancelled = true; observer.disconnect(); } };
  }
</script>

<section id="about-us" data-water-page-tone="deep" class="about-intro" class:about-intro--translated={pageLanguage !== 'es'}>
  <div class="about-container">
    <h1 class="about-title">{#each ui.title as line, index}{#if index > 0}{' '}{/if}<span class="about-title__line">{@html pageLanguage === 'es' && index === 1 ? line.replace('forma de', 'forma<br class="about-mobile-break" /> de') : line}</span>{/each}</h1>
    <div class="about-intro-grid">
      <div class="team-block intro-reveal intro-reveal--left" use:standardEntry>
        <div class="team-photo">
          <div class="team-photo-images">
          <img class="team-photo-person team-photo-person--left" src="/story-miquel-crop.png" alt="" aria-hidden="true" />
          <img class="team-photo-person team-photo-person--right" src="/story-jaume-crop.png" alt="" aria-hidden="true" />
          </div>
          <a class="team-person team-person--left" href={`${storyPath}#miquel`} aria-label={`${ui.view} Miquel`}><span>Miquel <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></span></a>
          <a class="team-person team-person--right" href={`${storyPath}#jaume`} aria-label={`${ui.view} Jaume`}><span>Jaume <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></span></a>
        </div>
        <p class="team-hint"><span class="team-hint-desktop">{@html ui.hint}</span><span class="team-hint-mobile">{pageLanguage === 'es' ? 'Pulsa en uno de nosotros para conocer su historia.' : pageLanguage === 'ca' ? 'Toca un de nosaltres per conèixer la seva història.' : 'Tap either of us to discover our story.'}</span></p>
      </div>
      <div class="dictionary-wrap intro-reveal intro-reveal--right" use:standardEntry use:typeOnView>
        <div class="dictionary-card" use:scrollContrast>
          <canvas class="dictionary-water" aria-hidden="true"></canvas>
          <div class="dictionary-card__inner">
          <p class="dictionary-word">eima</p>
          <p class="dictionary-meta">{copy.dictionary.phonetic} <span>·</span> <em>{copy.dictionary.gender}</em> <span>·</span> <strong>{copy.dictionary.region}</strong></p>
          <div class="dictionary-rule"></div>
          <div class="dictionary-definitions">
            <p><span>1.</span><span class="sr-only">{copy.dictionary.definitionOne}</span><span aria-hidden="true">{typedDefinitionOne}{#if dictionaryTyping && typedDefinitionOne.length < copy.dictionary.definitionOne.length}<i class="dictionary-cursor"></i>{/if}</span></p>
            <p><span>2.</span><span class="sr-only">{copy.dictionary.definitionTwo}</span><span aria-hidden="true">{typedDefinitionTwo}{#if dictionaryTyping && typedDefinitionOne.length === copy.dictionary.definitionOne.length && typedDefinitionTwo.length < copy.dictionary.definitionTwo.length}<i class="dictionary-cursor"></i>{/if}</span></p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="about-origin" aria-labelledby="origin-title">
  <div class="about-container origin-container">
    <h2 id="origin-title" class="section-playfair-desktop origin-title-mobile">{@html ui.originTitle}</h2>
    <p class="origin-intro origin-fade mobile-copy-14" use:standardEntry>{@html ui.intro}</p>
    <div class="origin-grid hover-dim-group">
      {#each originCards as card, index}
        <article class="origin-card hover-dim-item" use:standardEntry use:scrollContrast style={`--delay:${index < 3 ? index * 50 : 180 + (index - 3) * 50}ms`}>
          <div class="origin-card-header">
            <span class="origin-number" aria-hidden="true">0{index + 1}</span>
            <h3>
              <span class:origin-title-desktop={mobileTitleLines[index]}>
                {#each card.titleLines as line, lineIndex}{#if lineIndex > 0}{' '}{/if}<span class="origin-card-title-line">{@html line}</span>{/each}
              </span>
              {#if mobileTitleLines[index]}
                <span class="origin-title-mobile-lines">
                  {#each mobileTitleLines[index] as line, lineIndex}{#if lineIndex > 0}{' '}{/if}<span>{line}</span>{/each}
                </span>
              {/if}
            </h3>
          </div>
          <p>{@html card.body}</p>
        </article>
      {/each}
    </div>
    <p class="origin-conclusion origin-fade mobile-copy-14" use:standardEntry>{@html ui.conclusion}</p>
    <div class="origin-cta origin-fade" use:standardEntry>
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.closing.cta} />
    </div>
  </div>
</section>

<style>
  .about-intro { background: #233f4e; padding: clamp(6rem, 9vw, 8rem) 1.5rem clamp(3rem, 5vw, 4.75rem); }
  @media (min-width: 1024px) { .about-intro { padding-top: 102px; padding-bottom: calc(clamp(3rem, 5vw, 4.75rem) + 20px); } }
  .about-container { max-width: 1120px; margin: auto; }
  .about-title, .about-origin h2 { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; line-height: 1.1; }
  .about-title { position: relative; left: calc(50% + .5rem); width: max-content; transform: translateX(-50%); font-size: 60px; text-align: center; color: white; white-space: nowrap; text-shadow: var(--eima-dark-copy-shadow); }
  .team-hint, .about-origin h2, .origin-intro, .origin-conclusion { text-shadow: var(--eima-dark-copy-shadow); }
  .about-title__line { display: block; }
  :global(.about-mobile-break) { display: none; }
  .about-title :global(span), .about-origin h2 :global(span) { font-family: inherit; }
  :global(.about-blue), .about-origin h2 :global(span) { color: #8cd0d6; }
  @keyframes blink { 50% { opacity: 0; } }
  .about-intro-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.06fr); align-items: center; gap: clamp(2rem, 4vw, 3rem); margin-top: 3rem; }
  .team-block { position: relative; display: flex; flex-direction: column; align-items: center; }
  .team-photo { position: relative; width: min(100%, 490px); aspect-ratio: 1.3 / 1; overflow: visible; border: 1px solid #ffffff30; border-radius: 10px; background: #f8f4f0; }
  .team-photo-person { position: absolute; bottom: 0; width: auto; height: 90%; max-width: none; object-fit: contain; object-position: bottom center; mix-blend-mode: multiply; transition: filter 240ms ease-out; }
  .team-photo-person--left { left: 2.5%; }
  .team-photo-person--right { right: 2.5%; }
  .team-person { position: absolute; z-index: 1; top: 0; bottom: 0; width: 50%; outline-offset: -4px; }
  .team-person:focus-visible { outline: 2px solid #8cd0d6; }
  .team-person--left { left: 0; }
  .team-person--right { right: 0; }
  .team-photo:has(.team-person--left:hover, .team-person--left:focus-visible) .team-photo-person--right,
  .team-photo:has(.team-person--right:hover, .team-person--right:focus-visible) .team-photo-person--left { filter: blur(2.7px); }
  .team-hint { position: absolute; top: 100%; width: 100%; margin-top: .8rem; color: #e4edef; font-size: 14px; font-style: italic; text-align: center; }
  .dictionary-wrap { width: 100%; }
  .dictionary-card { position: relative; overflow: hidden; background: #f8f4f0; border-radius: 10px; border: 1px solid #f8f4f080; padding: clamp(1.5rem, 2.5vw, 2rem); transition: border-color 380ms ease-out, box-shadow 380ms ease-out; }
  .dictionary-water { position: absolute; inset: 0; width: 100%; height: 100%; background: var(--water-deep, #233f4e); opacity: 0; pointer-events: none; transition: opacity 380ms ease-out; }
  .dictionary-card__inner { transform: scale(1); transform-origin: center; transition: transform 180ms ease-out, text-shadow 380ms ease-out; }
  .dictionary-word { font-family: 'Playfair Display', Georgia, serif; font-size: 70px; font-weight: 500; line-height: .9; color: #233f4e; transition: color 380ms ease-out; }
  .dictionary-meta { margin-top: 1.1rem; font-size: 15px; color: #233f4e; transition: color 380ms ease-out; }
  .dictionary-meta span { margin: 0 .35rem; }
  .dictionary-rule { height: 1px; background: #233f4e; margin: 1.25rem 0; transition: background-color 380ms ease-out; }
  .dictionary-definitions { display: grid; gap: 1rem; color: #233f4e; font-size: 15px; line-height: 1.5; transition: color 380ms ease-out; }
  .dictionary-definitions p { display: grid; grid-template-columns: 1.2rem 1fr; gap: .55rem; }
  .dictionary-cursor { display: inline-block; width: 2px; height: 1em; background: currentColor; animation: blink .8s steps(1) infinite; vertical-align: -.15em; }
  .about-origin { --origin-surrounding-gap: 3rem; background: #233f4e; color: white; padding: clamp(2.75rem, 5vw, 4.75rem) 1.5rem calc(clamp(2rem, 3vw, 2.75rem) + 12px); }
  .origin-container { max-width: 1240px; }
  .about-origin h2 { color: white; font-size: clamp(2.3rem, 4vw, 3.25rem); text-align: center; }
  .about-origin h2 :global(span) { color: #8cd0d6; }
  .origin-intro { max-width: 760px; margin: 1.5rem auto 0; color: #f8f4f0; font-size: 16px; font-weight: 300; line-height: 1.5; text-align: center; }
  .origin-intro :global(strong) { font-weight: 700; }
  .origin-intro :global(.origin-keyword) { color: #8cd0d6; }
  :global(.origin-intro-break) { display: none; }
  .origin-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: 1fr; align-items: stretch; gap: 1rem; margin-top: var(--origin-surrounding-gap); }
  .origin-card { border: 1px solid #8cd0d63d; border-radius: 9px; padding: 1.25rem; background: #ffffff0a; text-shadow: var(--eima-dark-copy-shadow); transition: opacity 175ms ease, filter 175ms ease-out, transform 360ms ease-out, background-color 260ms ease-out, border-color 260ms ease, box-shadow 260ms ease-out, text-shadow 260ms ease-out; }
  .origin-card-header { display: grid; grid-template-columns: 3.25rem minmax(0, 1fr); align-items: start; gap: 1.375rem; }
  .origin-number { color: #8cd0d6; font-family: 'Newsreader', Georgia, serif; font-size: 52px; font-weight: 400; line-height: .84; }
  @media (min-width: 768px) {
    .origin-card-header { align-items: center; }
    .origin-number { transform: translateY(.095em); }
  }
  .origin-card h3 { font-family: 'Newsreader', Georgia, serif; font-size: 18px; font-weight: 700; line-height: 1.25; color: white; }
  .origin-card-title-line { display: block; }
  .origin-card h3 span { font-family: inherit; }
  .origin-title-mobile-lines { display: none; }
  .origin-card p { margin-top: .7rem; font-size: 15px; line-height: 1.55; color: #e4edef; }
  @media (min-width: 1024px) { .origin-card h3 { font-size: 17.8px; } .origin-card p { font-size: 13.3px; } }
  @media (min-width: 1024px) {
    .about-origin { --origin-surrounding-gap: 2.5rem; }
    .origin-grid { max-width: 1184px; margin: var(--origin-surrounding-gap) auto 0; gap: 1.5rem; }
  }
  @media (min-width: 1200px) and (max-width: 1279px) {
    .origin-card { padding-inline: clamp(1rem, calc(1rem + (100vw - 1200px) * .05), 1.25rem); }
  }
  .origin-card :global(strong) { color: white; font-weight: 700; }
  .origin-card :global(em) { font-style: italic; }
  .origin-number, .origin-card h3, .origin-card p, .origin-card :global(strong) { transition: color 260ms ease-out; }
  .origin-conclusion { max-width: 560px; margin: var(--origin-surrounding-gap) auto 0; color: #f8f4f0; font-size: 16px; font-weight: 300; line-height: 1.55; text-align: center; }
  .origin-conclusion :global(strong) { color: #f8f4f0; font-weight: 700; }
  .origin-conclusion :global(.origin-brand) { color: #8cd0d6; }
  .origin-cta { display: flex; justify-content: center; margin-top: 1.5rem; }
  @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
    .origin-card:hover { background: #f8f4f0; border-color: #4083a7; transform: translateY(-4px); box-shadow: 0 0 18px 3px #d9f7ff55, 0 10px 24px #8cd0d63d; text-shadow: none; }
    .origin-card:hover .origin-number { color: #245b7d; }
    .origin-card:hover h3 { color: #233f4e; }
    .origin-card:hover p, .origin-card:hover :global(strong) { color: #233f4e; }
    .origin-grid:global(.hover-dim-group):has(> .origin-card:hover) > .origin-card:not(:hover):not(:global(.will-reveal)) { opacity: .7; filter: none; }
  }
  @media (hover: none), (pointer: coarse) {
    .origin-grid:global(.hover-dim-group):has(> .origin-card:hover) > .origin-card:not(:hover):not(:global(.will-reveal)) { opacity: 1; filter: none; }
  }
  @media (min-width: 768px) and (hover: hover) { .dictionary-card:hover { border-color: var(--eima-card-hover-border); box-shadow: var(--eima-halo-dark); } .dictionary-card:hover .dictionary-water { opacity: 1; } .dictionary-card:hover .dictionary-card__inner { transform: scale(1.02); text-shadow: var(--eima-dark-copy-shadow); } .dictionary-card:hover .dictionary-word { color: #ffffff; } .dictionary-card:hover .dictionary-meta, .dictionary-card:hover .dictionary-definitions { color: white; } .dictionary-card:hover .dictionary-rule { background: #ffffffb3; } }
  @media (max-width: 1199px) { .origin-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 900px) { .about-title { left: auto; width: auto; transform: none; white-space: normal; } .about-intro-grid { grid-template-columns: 1fr; max-width: 640px; margin-inline: auto; } }
  @media (min-width: 901px) and (max-width: 1199px) {
    .about-title { max-width: calc(100vw - 3rem); white-space: normal; }
    .about-intro--translated .about-title { left: auto; width: auto; max-width: 100%; transform: none; white-space: normal; }
  }
  @media (max-width: 767px) { .about-intro { padding-top: 7rem; } .about-title { font-size: clamp(2rem, 8vw, 2.7rem); } .team-hint { position: static; margin-top: .8rem; } .origin-grid { grid-template-columns: 1fr; grid-auto-rows: auto; } }
  @media (max-width: 767px) {
    .about-intro { overflow-x: clip; }
    :global(.about-mobile-break) { display: initial; }
    .about-intro .about-title { font-size: 32px; }
    .origin-title-mobile :global(span) { display: block; }
    .team-hint { font-size: clamp(11px, 3.3vw, 14px); }
    .about-origin { padding-inline: 1rem; }
    .origin-card { padding-inline: .85rem; }
    .origin-card-header { grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: .5rem; }
    .origin-number { font-size: clamp(38px, 12vw, 49px); line-height: .9; transform: translateY(.095em); }
    .origin-card h3 { font-size: clamp(14px, 4.3vw, 16px); line-height: 1.18; }
    .origin-card-title-line { display: inline; }
    .origin-title-desktop { display: none; }
    .origin-title-mobile-lines, .origin-title-mobile-lines > span { display: block; }
    .origin-card:global(.scroll-active) { background: #f8f4f0; border-color: #4083a7; transform: translateY(-4px); box-shadow: 0 0 18px 3px #d9f7ff55, 0 10px 24px #8cd0d63d; text-shadow: none; }
    .origin-card:global(.scroll-active) .origin-number { color: #245b7d; }
    .origin-card:global(.scroll-active) h3, .origin-card:global(.scroll-active) p, .origin-card:global(.scroll-active) :global(strong) { color: #233f4e; }
    .dictionary-card:global(.scroll-active) { border-color: var(--eima-card-hover-border); box-shadow: var(--eima-halo-dark); }
    .dictionary-card:global(.scroll-active) .dictionary-water { opacity: 1; }
    .dictionary-card:global(.scroll-active) .dictionary-card__inner { transform: scale(1.02); text-shadow: var(--eima-dark-copy-shadow); }
    .dictionary-card:global(.scroll-active) .dictionary-word, .dictionary-card:global(.scroll-active) .dictionary-meta, .dictionary-card:global(.scroll-active) .dictionary-definitions { color: white; }
    .dictionary-card:global(.scroll-active) .dictionary-rule { background: #ffffffb3; }
  }
  @media (prefers-reduced-motion: reduce) { .origin-card:global(.scroll-active), .dictionary-card:global(.scroll-active) .dictionary-card__inner { transform: none; } .dictionary-water { transition: none; } }
  @media (min-width: 1024px) { :global(.origin-intro-break) { display: inline; } }
  @media (prefers-reduced-motion: reduce) { .dictionary-cursor { animation: none; } .origin-card, .origin-number, .origin-card h3, .origin-card p, .origin-card :global(strong), .origin-fade, .team-person span, .dictionary-card, .dictionary-card__inner, .intro-reveal { transition: none; } .origin-card:global(.will-reveal), .origin-fade:global(.will-reveal), .intro-reveal:global(.will-reveal) { opacity: 1; transform: none; } .origin-card:hover, .dictionary-card:hover .dictionary-card__inner { transform: none; } }
  .intro-reveal:global(.standard-entry-pending), .origin-card:global(.standard-entry-pending), .origin-fade:global(.standard-entry-pending) { opacity: 0; transform: translateY(16px); transition: opacity var(--dur-entrada) var(--ease-calma), transform var(--dur-entrada) var(--ease-calma); }
  .intro-reveal:global(.standard-entry-visible), .origin-card:global(.standard-entry-visible), .origin-fade:global(.standard-entry-visible) { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { .intro-reveal:global(.standard-entry-pending), .origin-card:global(.standard-entry-pending), .origin-fade:global(.standard-entry-pending) { opacity: 1; transform: none; transition: none; } }
  .team-person span { position: absolute; top: 0; bottom: auto; left: 50%; transform: translate(-50%, -50%); display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; min-height: 32px; padding: 0 14px; border-radius: 999px; background: #4083a7; color: #fff; text-shadow: 0 0 3px #071a2566; font: 600 15px/1 Inter, sans-serif; box-shadow: 0 8px 20px rgba(14,29,38,.18), 0 0 0 1px rgba(35,63,78,.08); transition: background var(--dur-micro) var(--ease-calma), color var(--dur-micro) var(--ease-calma), transform var(--dur-micro) var(--ease-calma); }
  @media (min-width: 1024px) { .team-person span { top: 6%; } .team-person--left span { left: 48%; } .team-person--right span { left: 52%; } }
  .team-person:focus-visible span { background: #4083a7; color: #fff; }
  @media (hover: hover) and (pointer: fine) { .team-person:hover span { background: #4083a7; color: #fff; } }
  @media (hover: none), (pointer: coarse) { .team-person:active span { background: #4083a7; color: #fff; transform: translate(-50%, -50%) scale(.97); } }
  @media (prefers-reduced-motion: reduce) { .team-person span { transition: none; } .team-person:active span { transform: translate(-50%, -50%); } }
  @media (min-width: 768px) { .dictionary-definitions { font-size: 16px; } }
  .team-photo-images { position: absolute; inset: 0; overflow: hidden; border-radius: inherit; }
  .team-hint-mobile { display: none; }
  /* TODO [CA-revisar]: revisar la indicació mòbil per triar una història. */
  @media (max-width: 767px) {
    .about-intro { padding-top: 5rem; }
    .about-intro-grid { margin-top: 2rem; gap: 1.5rem; }
    .team-photo { overflow: visible; }
    .team-person span { top: 0; bottom: auto; min-height: 32px; padding: 0 14px; transform: translate(-50%, -50%); background: #4083a7; color: #fff; }
    .team-hint { margin-top: .625rem; font-size: clamp(10px, 3.05vw, 12px); white-space: nowrap; }
    .team-hint-desktop { display: none; }
    .team-hint-mobile { display: inline; }
    .team-person:active span { transform: translate(-50%, -50%) scale(.97); }
  }
  @media (max-width: 767px) and (prefers-reduced-motion: reduce) { .team-person:active span { transform: translate(-50%, -50%); } }
  .team-person span svg { filter: drop-shadow(0 0 2px #071a2566); }

  @media (min-width: 1024px) {
    .about-intro { padding-bottom: 50px; }
    .about-origin { padding-top: 50px; padding-bottom: 50px; }
  }
</style>
