<script lang="ts">
  import { scrollContrast } from '$lib/actions/scrollContrast';
  import type { Language } from '$lib/i18n/copy';
  import { aboutSections } from '$lib/i18n/reviewed';
  import { getAboutCopy } from '$lib/i18n/about';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { getRoutePath } from '$lib/i18n/routes';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import ParallaxSloganSection from '$lib/components/sections/ParallaxSloganSection.svelte';

  export let pageLanguage: Language = 'es';
  const ui = aboutSections[pageLanguage];
  const copy = getAboutCopy(pageLanguage);
  const whatsappHref = getWhatsAppHref(pageLanguage);
  const storyPath = getRoutePath('story', pageLanguage);
  const closingParts = [copy.closing.prefix, copy.closing.accentOne, ` ${copy.closing.middle} `, copy.closing.accentTwo];
  const fullClosing = closingParts.join('');
  let closingWordStart = 0;
  const closingWords = fullClosing.split(' ').map((text) => {
    const word = {
      text,
      start: closingWordStart,
      accent: text === copy.closing.accentOne || text === copy.closing.accentTwo
    };
    closingWordStart += text.length + 1;
    return word;
  });
  const originCards = ui.cards;
  let typedClosing = '';
  let closingTyping = false;
  let closingCursorPulsing = false;
  let typedDefinitionOne = '';
  let typedDefinitionTwo = '';
  let dictionaryTyping = false;

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  function typeOnView(node: HTMLElement, kind: 'closing' | 'dictionary') {
    let cancelled = false;
    let started = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const complete = () => {
      if (kind === 'closing') typedClosing = fullClosing;
      if (kind === 'dictionary') { typedDefinitionOne = copy.dictionary.definitionOne; typedDefinitionTwo = copy.dictionary.definitionTwo; }
    };
    const start = async () => {
      if (started) return;
      started = true;
      if (reduced) { complete(); return; }
      if (kind === 'dictionary') {
        dictionaryTyping = true;
        await sleep(300);
        for (let i = 1; i <= copy.dictionary.definitionOne.length && !cancelled; i++) { typedDefinitionOne = copy.dictionary.definitionOne.slice(0, i); await sleep(42); }
        await sleep(350);
        for (let i = 1; i <= copy.dictionary.definitionTwo.length && !cancelled; i++) { typedDefinitionTwo = copy.dictionary.definitionTwo.slice(0, i); await sleep(38); }
        dictionaryTyping = false;
      } else {
        const text = fullClosing;
        closingTyping = true;
        await sleep(220);
        for (let i = 1; i <= text.length && !cancelled; i++) {
          typedClosing = text.slice(0, i);
          await sleep(44);
        }
        if (cancelled) return;
        closingTyping = false;
        closingCursorPulsing = true;
        await sleep(3000);
        closingCursorPulsing = false;
      }
    };
    if (!('IntersectionObserver' in window)) start();
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { observer?.disconnect(); start(); }
    }, { threshold: .3 }) : null;
    observer?.observe(node);
    return { destroy() { cancelled = true; observer?.disconnect(); } };
  }
  function reveal(node: HTMLElement) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
    node.classList.add('will-reveal');
    let settleTimer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
        settleTimer = setTimeout(() => node.classList.remove('will-reveal', 'is-visible'), 700);
      }
    }, { threshold: .12 });
    observer.observe(node);
    return { destroy() { observer.disconnect(); clearTimeout(settleTimer); } };
  }
  function revealIntro(node: HTMLElement) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
    node.classList.add('will-reveal');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.disconnect(); }
    }, { threshold: .12 });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }
</script>

<section id="about-us" class="about-intro" class:about-intro--translated={pageLanguage !== 'es'}>
  <div class="about-container">
    <h1 class="about-title">{#each ui.title as line, index}{#if index > 0}{' '}{/if}<span class="about-title__line">{@html pageLanguage === 'es' && index === 1 ? line.replace('forma de', 'forma<br class="about-mobile-break" /> de') : line}</span>{/each}</h1>
    <div class="about-intro-grid">
      <div class="team-block intro-reveal intro-reveal--left" use:revealIntro>
        <div class="team-photo">
          <img class="team-photo-person team-photo-person--left" src="/story-miquel-crop.png" alt="" aria-hidden="true" />
          <img class="team-photo-person team-photo-person--right" src="/story-jaume-crop.png" alt="" aria-hidden="true" />
          <a class="team-person team-person--left" href={`${storyPath}#miquel`} aria-label={`${ui.view} Miquel`}><span>Miquel</span></a>
          <a class="team-person team-person--right" href={`${storyPath}#jaume`} aria-label={`${ui.view} Jaume`}><span>Jaume</span></a>
        </div>
        <p class="team-hint">{@html pageLanguage === 'es' ? ui.hint.replace('para conocer', 'para<br class="about-mobile-break" /> conocer') : ui.hint}</p>
      </div>
      <div class="dictionary-wrap intro-reveal intro-reveal--right" use:revealIntro use:typeOnView={'dictionary'}>
        <div class="dictionary-card" use:scrollContrast>
          <div class="dictionary-card__inner">
          <p class="dictionary-word">eima</p>
          <p class="dictionary-meta">{copy.dictionary.phonetic} <span>·</span> <em>{copy.dictionary.gender}</em> <span>·</span> <strong>{copy.dictionary.region}</strong></p>
          <div class="dictionary-rule"></div>
          <div class="dictionary-definitions">
            <p><span>1.</span><span>{typedDefinitionOne}{#if dictionaryTyping && typedDefinitionOne.length < copy.dictionary.definitionOne.length}<i class="dictionary-cursor"></i>{/if}</span></p>
            <p><span>2.</span><span>{typedDefinitionTwo}{#if dictionaryTyping && typedDefinitionOne.length === copy.dictionary.definitionOne.length && typedDefinitionTwo.length < copy.dictionary.definitionTwo.length}<i class="dictionary-cursor"></i>{/if}</span></p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<ParallaxSloganSection
  image="/about-cala-banner.jpg"
  compact
  topHtml={ui.bannerTop}
  bottomHtml={ui.bannerBottom}
  mobileTopSize={15}
  desktopTopSize={24}
  mobileBottomSize={21.5}
  desktopBottomSize={33}
  sectionClass="about-banner-section"
/>

<section class="about-origin" aria-labelledby="origin-title">
  <div class="about-container origin-container">
    <h2 id="origin-title" class="section-playfair-desktop">{@html ui.originTitle}</h2>
    <p class="origin-intro origin-fade mobile-copy-14" use:reveal>{@html ui.intro}</p>
    <div class="origin-grid hover-dim-group">
      {#each originCards as card, index}
        <article class="origin-card hover-dim-item" use:reveal use:scrollContrast style={`--delay:${index < 3 ? index * 50 : 180 + (index - 3) * 50}ms`}>
          <div class="origin-card-header">
            <span class="origin-number" aria-hidden="true">0{index + 1}</span>
            <h3 class:origin-card-title--first={index === 0 && pageLanguage === 'es'}>{#each card.titleLines as line, lineIndex}{#if lineIndex > 0}{' '}{/if}<span class="origin-card-title-line">{@html index === 0 && pageLanguage === 'es' ? line.replace('hagas ejercicio', 'hagas<br class="about-mobile-break" /> ejercicio').replace('explican cómo', '<br class="about-mobile-break" />explican cómo') : line}</span>{/each}</h3>
          </div>
          <p>{@html card.body}</p>
        </article>
      {/each}
    </div>
    <p class="origin-conclusion origin-fade mobile-copy-14" use:reveal>{@html ui.conclusion}</p>
    <div class="origin-cta origin-fade" use:reveal>
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.closing.cta} />
    </div>
  </div>
</section>

<section id="closing-section" class="about-closing">
  <div class="closing-grid">
    <div class="closing-copy">
      <div class="closing-content">
        <h2 class="closing-title section-playfair-desktop" aria-label={fullClosing} use:typeOnView={'closing'}>
          <span class="closing-title__measure" aria-hidden="true">{#each closingWords as word, index}{#if index > 0}{' '}{/if}<span class="closing-word" class:about-blue={word.accent}>{word.text}</span>{/each}</span>
          <span class="closing-title__typing" aria-hidden="true">{#each closingWords as word, index}{#if index > 0}{' '}{/if}<span class="closing-word" class:about-blue={word.accent}><span class="closing-word__reserve">{word.text}</span><span class="closing-word__typed">{word.text.slice(0, Math.max(0, Math.min(word.text.length, typedClosing.length - word.start)))}{#if (closingTyping && typedClosing.length >= word.start && typedClosing.length <= word.start + word.text.length) || (closingCursorPulsing && word.start + word.text.length === fullClosing.length)}<i class="closing-cursor" class:closing-cursor--finish={closingCursorPulsing}></i>{/if}</span></span>{/each}</span>
        </h2>
        <div class="closing-paragraphs">
          {#each copy.closing.paragraphs as paragraph}
            <p>{@html paragraph}</p>
          {/each}
        </div>
        <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.closing.cta} class="closing-cta" />
      </div>
    </div>
    <img class="closing-photo" src="/about-closing-sunset.png" alt={ui.sunsetAlt} loading="lazy" decoding="async" />
  </div>
</section>

<style>
  .about-intro { background: #233f4e; padding: clamp(6rem, 9vw, 8rem) 1.5rem clamp(3rem, 5vw, 4.75rem); }
  @media (min-width: 1024px) { .about-intro { padding-top: 102px; } }
  .about-closing { background: #f8f4f0; }
  .about-container { max-width: 1120px; margin: auto; }
  .about-title, .about-origin h2, .closing-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; line-height: 1.1; }
  .about-title { position: relative; left: calc(50% + .5rem); width: max-content; transform: translateX(-50%); font-size: 60px; text-align: center; color: white; white-space: nowrap; }
  .about-title__line { display: block; }
  :global(.about-mobile-break) { display: none; }
  .about-title :global(span), .about-origin h2 :global(span), .closing-title span { font-family: inherit; }
  :global(.about-blue), .about-origin h2 :global(span) { color: #8cd0d6; }
  @keyframes blink { 50% { opacity: 0; } }
  .about-intro-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.06fr); align-items: center; gap: clamp(2rem, 4vw, 3rem); margin-top: 3rem; }
  .intro-reveal { transition: opacity 800ms ease-out, transform 800ms ease-out; }
  .intro-reveal--left { --intro-offset: -40px; }
  .intro-reveal--right { --intro-offset: 40px; transition-delay: 100ms; }
  .intro-reveal:global(.will-reveal) { opacity: 0; transform: translateX(var(--intro-offset)); }
  .intro-reveal:global(.is-visible) { opacity: 1; transform: none; }
  .team-block { position: relative; display: flex; flex-direction: column; align-items: center; }
  .team-photo { position: relative; width: min(100%, 490px); aspect-ratio: 1.2 / 1; overflow: hidden; border: 1px solid #ffffff30; border-radius: 10px; background: #f8f4f0; }
  .team-photo-person { position: absolute; bottom: 0; width: auto; height: 90%; max-width: none; object-fit: contain; object-position: bottom center; mix-blend-mode: multiply; transition: filter 240ms ease-out; }
  .team-photo-person--left { left: 2.5%; }
  .team-photo-person--right { right: 2.5%; }
  .team-person { position: absolute; z-index: 1; top: 0; bottom: 0; width: 50%; outline-offset: -4px; }
  .team-person:focus-visible { outline: 2px solid #8cd0d6; }
  .team-person--left { left: 0; }
  .team-person--right { right: 0; }
  .team-person span { position: absolute; z-index: 2; top: 10%; left: 50%; transform: translate(-50%, 8px); opacity: 0; padding: .4rem .75rem; border: 1px solid #8cd0d680; border-radius: 6px; color: white; background: #233f4ef0; box-shadow: 0 4px 12px #0e1d2659; transition: opacity 180ms ease, transform 180ms ease; }
  .team-person--left span { top: max(1px, calc(13.2% - 47px)); left: 54.2%; }
  .team-person--right span { top: max(1px, calc(13.1% - 47px)); left: 41.2%; }
  .team-person:hover span, .team-person:focus-visible span { opacity: 1; transform: translate(-50%, 0); }
  .team-photo:has(.team-person--left:hover, .team-person--left:focus-visible) .team-photo-person--right,
  .team-photo:has(.team-person--right:hover, .team-person--right:focus-visible) .team-photo-person--left { filter: blur(3.5px); }
  .team-hint { position: absolute; top: 100%; width: 100%; margin-top: .8rem; color: #e4edef; font-size: 14px; font-style: italic; text-align: center; }
  .dictionary-wrap { width: 100%; }
  .dictionary-card { overflow: hidden; background: #f8f4f0; border-radius: 10px; border: 1px solid #f8f4f080; padding: clamp(1.5rem, 2.5vw, 2rem); transition: background-color 380ms ease-out, border-color 380ms ease-out, box-shadow 380ms ease-out; }
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
  .origin-intro { max-width: 760px; margin: 1.5rem auto 0; color: #f3f7f8; font-size: 16px; font-weight: 300; line-height: 1.5; text-align: center; }
  .origin-intro :global(strong) { font-weight: 700; }
  :global(.origin-intro-break) { display: none; }
  .origin-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: 1fr; align-items: stretch; gap: 1rem; margin-top: var(--origin-surrounding-gap); }
  .origin-card { border: 1px solid #8cd0d63d; border-radius: 9px; padding: 1.25rem; background: #ffffff0a; text-shadow: 0 1px 3px #08121866; transition: opacity 175ms ease, filter 175ms ease-out, transform 360ms ease-out, background-color 260ms ease-out, border-color 260ms ease, box-shadow 260ms ease-out, text-shadow 260ms ease-out; }
  .origin-card-header { display: grid; grid-template-columns: 3.25rem minmax(0, 1fr); align-items: start; gap: 1.375rem; }
  .origin-number { color: #8cd0d6; font-family: 'Fraunces', Georgia, serif; font-size: 52px; font-weight: 400; line-height: .84; }
  .origin-card h3 { font-family: 'Fraunces', Georgia, serif; font-size: 18px; font-weight: 500; line-height: 1.25; color: white; }
  .origin-card-title-line { display: block; font-family: inherit; }
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
  .origin-card:global(.will-reveal) { opacity: 0; transform: translateY(14px); transition: opacity 360ms ease-out, filter 175ms ease-out, transform 360ms ease-out, background-color 260ms ease-out, border-color 260ms ease, box-shadow 260ms ease-out, text-shadow 260ms ease-out; transition-delay: var(--delay); }
  .origin-card:global(.is-visible) { opacity: 1; transform: none; }
  .origin-fade { transition: opacity 340ms ease-out; }
  .origin-fade:global(.will-reveal) { opacity: 0; }
  .origin-fade:global(.is-visible) { opacity: 1; }
  .origin-conclusion { max-width: 560px; margin: var(--origin-surrounding-gap) auto 0; color: #f3f7f8; font-size: 16px; font-weight: 300; line-height: 1.55; text-align: center; }
  .origin-conclusion :global(strong) { color: white; font-weight: 700; }
  .origin-cta { display: flex; justify-content: center; margin-top: 1.5rem; }
  .about-closing { overflow: hidden; }
  .closing-grid { display: grid; grid-template-columns: 1.1fr .9fr; max-width: 1280px; margin: auto; }
  .closing-copy { display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: clamp(2.25rem, 4vw, 3rem) clamp(1.5rem, 4vw, 4rem) clamp(2rem, 3vw, 3rem); }
  .closing-content { display: flex; width: 100%; max-width: 570px; flex-direction: column; align-items: stretch; }
  .closing-title { position: relative; max-width: 650px; font-size: clamp(2.5rem, 4.2vw, 3.6rem); color: #233f4e; }
  .closing-title__measure { display: block; visibility: hidden; }
  .closing-title__typing { position: absolute; inset: 0; display: block; }
  .closing-word { position: relative; display: inline-block; white-space: nowrap; }
  .closing-word__reserve { visibility: hidden; }
  .closing-word__typed { position: absolute; top: 0; left: 0; white-space: nowrap; }
  .closing-title .about-blue { color: #4083a7; }
  .closing-paragraphs { display: grid; gap: 1rem; max-width: 570px; margin-top: 2rem; color: #233f4e; font-size: 16px; line-height: 1.7; }
  .closing-paragraphs :global(strong) { font-weight: 700; }
  .closing-cursor { display: inline-block; width: 2px; height: .84em; margin-left: .06em; background: currentColor; animation: blink .8s steps(1) infinite; vertical-align: -.07em; }
  @keyframes closing-final-pulse { 0%, 49.9% { opacity: 1; } 50%, 100% { opacity: 0; } }
  .closing-cursor--finish { animation: closing-final-pulse 600ms linear 5 forwards; }
  :global(.closing-cta) { align-self: center; margin-top: 1.75rem; }
  .closing-photo { width: 100%; height: 100%; min-height: 400px; object-fit: cover; }
  @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
    .origin-card:hover { background: #f8f4f0; border-color: #4083a7; transform: translateY(-4px); box-shadow: 0 10px 24px #08121829, 0 3px 8px #0812181f; text-shadow: none; }
    .origin-card:hover .origin-number { color: #233f4e; }
    .origin-card:hover h3 { color: #245b7d; }
    .origin-card:hover p, .origin-card:hover :global(strong) { color: #245b7d; }
    .origin-grid:global(.hover-dim-group):has(> .origin-card:hover) > .origin-card:not(:hover):not(:global(.will-reveal)) { opacity: .8; filter: blur(.6px); }
  }
  @media (hover: none), (pointer: coarse) {
    .origin-grid:global(.hover-dim-group):has(> .origin-card:hover) > .origin-card:not(:hover):not(:global(.will-reveal)) { opacity: 1; filter: none; }
  }
  @media (min-width: 768px) and (hover: hover) { .dictionary-card:hover { background: var(--eima-card-hover-background); border-color: var(--eima-card-hover-border); box-shadow: var(--eima-card-hover-shadow); } .dictionary-card:hover .dictionary-card__inner { transform: scale(1.02); text-shadow: 0 1px 3px #071a2566, 0 4px 12px #071a2540; } .dictionary-card:hover .dictionary-word { color: #ffffff; } .dictionary-card:hover .dictionary-meta, .dictionary-card:hover .dictionary-definitions { color: white; } .dictionary-card:hover .dictionary-rule { background: #ffffffb3; } }
  @media (max-width: 1199px) { .origin-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 900px) { .about-title { left: auto; width: auto; transform: none; white-space: normal; } .about-intro-grid { grid-template-columns: 1fr; max-width: 640px; margin-inline: auto; } .closing-grid { grid-template-columns: 1fr; } .closing-photo { max-height: 440px; } }
  @media (min-width: 901px) and (max-width: 1199px) {
    .about-title { max-width: calc(100vw - 3rem); white-space: normal; }
    .about-intro--translated .about-title { left: auto; width: auto; max-width: 100%; transform: none; white-space: normal; }
  }
  @media (max-width: 767px) { .about-intro { padding-top: 7rem; } .about-title { font-size: clamp(2rem, 8vw, 2.7rem); } .team-hint { position: static; margin-top: .8rem; } .origin-grid { grid-template-columns: 1fr; grid-auto-rows: auto; } }
  @media (max-width: 767px) {
    .about-intro { overflow-x: clip; }
    :global(.about-mobile-break) { display: initial; }
    .about-intro:not(.about-intro--translated) .about-title { font-size: clamp(26px, 8vw, 43.2px); }
    .team-hint { font-size: clamp(11px, 3.3vw, 14px); }
    .origin-card h3.origin-card-title--first { font-size: clamp(12px, calc(8.5vw - 15px), 18px); }
    .origin-card-title--first .origin-card-title-line { display: inline; }
    .origin-card:global(.scroll-active) { background: #f8f4f0; border-color: #4083a7; transform: translateY(-4px); box-shadow: 0 10px 24px #08121829, 0 3px 8px #0812181f; text-shadow: none; }
    .origin-card:global(.scroll-active) .origin-number { color: #233f4e; }
    .origin-card:global(.scroll-active) h3, .origin-card:global(.scroll-active) p, .origin-card:global(.scroll-active) :global(strong) { color: #245b7d; }
    .dictionary-card:global(.scroll-active) { background: var(--eima-card-hover-background); border-color: var(--eima-card-hover-border); box-shadow: var(--eima-card-hover-shadow); }
    .dictionary-card:global(.scroll-active) .dictionary-card__inner { transform: scale(1.02); text-shadow: 0 1px 3px #071a2566, 0 4px 12px #071a2540; }
    .dictionary-card:global(.scroll-active) .dictionary-word, .dictionary-card:global(.scroll-active) .dictionary-meta, .dictionary-card:global(.scroll-active) .dictionary-definitions { color: white; }
    .dictionary-card:global(.scroll-active) .dictionary-rule { background: #ffffffb3; }
  }
  @media (prefers-reduced-motion: reduce) { .origin-card:global(.scroll-active), .dictionary-card:global(.scroll-active) .dictionary-card__inner { transform: none; } }
  @media (min-width: 1024px) { :global(.origin-intro-break) { display: inline; } }
  @media (prefers-reduced-motion: reduce) { .dictionary-cursor, .closing-cursor { animation: none; } .origin-card, .origin-number, .origin-card h3, .origin-card p, .origin-card :global(strong), .origin-fade, .team-person span, .dictionary-card, .dictionary-card__inner, .intro-reveal { transition: none; } .origin-card:global(.will-reveal), .origin-fade:global(.will-reveal), .intro-reveal:global(.will-reveal) { opacity: 1; transform: none; } .origin-card:hover, .dictionary-card:hover .dictionary-card__inner { transform: none; } }
</style>
