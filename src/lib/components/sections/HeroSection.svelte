<script>
  import { selectedSituation } from '$lib/data/situation';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { onMount } from 'svelte';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { watchReducedMotion } from '$lib/motion';
  let reducedMotion = false;
  /** @type {HTMLVideoElement} */
  let heroVideo;

  /** @param {number} ms */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /** @param {string} html */
  function parseInlineHtml(html) {
    const segments = [];
    const pattern = /<br\s*\/?>|<(strong|span)(?: class="([^"]*)")?>(.*?)<\/\1>/g;
    let cursor = 0;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      if (match.index > cursor) {
        segments.push({ text: html.slice(cursor, match.index), tag: 'text' });
      }

      if (match[0].startsWith('<br')) {
        segments.push({ tag: 'br' });
      } else {
        segments.push({ text: match[3], tag: match[1], className: match[2] });
      }
      cursor = pattern.lastIndex;
    }

    if (cursor < html.length) {
      segments.push({ text: html.slice(cursor), tag: 'text' });
    }

    return segments;
  }

  let typedPhrase = '';
  let complete = false;
  $: hero = getCopy($language).home.hero;
  $: whatsappHref = getWhatsAppHref($language, true, $selectedSituation);
  $: prefix = { es: 'Más ', ca: 'Més ', en: 'More ' }[$language];
  $: words = { es: ['energía.', 'salud.', 'vida.'], ca: ['energia.', 'salut.', 'vida.'], en: ['energy.', 'health.', 'life.'] }[$language];

  onMount(() => {
    let cancelled = false;
    let generation = 0;
    let hiddenAt = document.hidden ? performance.now() : null;
    let hiddenTime = 0;
    const visibilityChanged = () => {
      const now = performance.now();
      if (document.hidden) hiddenAt = now;
      else if (hiddenAt !== null) { hiddenTime += now - hiddenAt; hiddenAt = null; }
    };
    const activeNow = () => (hiddenAt ?? performance.now()) - hiddenTime;
    document.addEventListener('visibilitychange', visibilityChanged);
    /** Time advances only while the document is visible. @param {number} ms @param {number} version */
    async function wait(ms, version) {
      let remaining = ms;
      let previous = activeNow();
      while (remaining > 0 && !cancelled && version === generation) {
        await sleep(Math.min(25, remaining));
        const now = activeNow();
        remaining -= now - previous;
        previous = now;
      }
      while (document.hidden && !cancelled && version === generation) await sleep(50);
      return !cancelled && version === generation;
    }
    /** @param {number} version */
    async function animate(version) {
      complete = false;
      typedPhrase = '';
      for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
        const word = words[wordIndex];
        for (let length = 1; length <= word.length; length++) {
          if (!await wait(100, version)) return;
          typedPhrase = word.slice(0, length);
        }
        if (wordIndex === words.length - 1) break;
        if (!await wait(2000, version)) return;
        for (let length = word.length - 1; length >= 0; length--) {
          if (!await wait(50, version)) return;
          typedPhrase = word.slice(0, length);
        }
      }
      complete = true;
    }
    const stopMotion = watchReducedMotion(reduced => {
      reducedMotion = reduced;
      generation++;
      if (heroVideo) heroVideo.autoplay = !reduced;
      if (reduced) { typedPhrase = words[2]; complete = true; heroVideo?.pause(); }
      else { animate(generation); heroVideo?.play().catch(() => {}); }
    });
    return () => { cancelled = true; generation++; stopMotion(); document.removeEventListener('visibilitychange', visibilityChanged); };
  });
</script>

<section class="home-hero relative isolate w-full overflow-hidden" style="min-height: 92vh;">
  <video
    bind:this={heroVideo}
    class="absolute inset-0 h-full w-full object-cover"
    autoplay
    muted
    loop
    playsinline
    poster="/hero.jpg"
    aria-hidden="true"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>
  <div class="photo-tint" aria-hidden="true"></div>
  <div
    class="site-hero-overlay absolute inset-0"
    aria-hidden="true"
  ></div>

  <div class={`home-hero-content photo-text-contrast relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-20 md:px-10 md:pt-24 lg:pt-[111px]`}>
    <div class="max-w-3xl leading-[1.02] tracking-tight">

      <span class="block text-[2.1rem] font-normal text-white md:text-6xl">{hero.intro}</span>
      <span
        class="mt-1 block text-5xl font-bold text-white md:mt-2 md:text-[5rem]"
        class:review-typed={true}
        aria-label={prefix + words[2]}
      >
        <span aria-hidden="true">{prefix}</span><span class="typed-text" class:complete aria-hidden="true">{reducedMotion ? words[2] : typedPhrase}</span>
      </span>
      <span
        class="hero-accent-line mt-3 block font-serif-italic text-3xl md:text-[3.2rem]"
        class:home-hero-accent={true}
        style="color: var(--color-brand-accent);"
      >
        {hero.fromHome}
      </span>
    </div>

    <div class="mt-10 max-w-lg text-[15px] font-light leading-relaxed text-white/96 md:text-base" class:home-hero-copy={true}>
      {#each hero.mobileParagraphs as paragraph, index (paragraph)}
        <p class:mt-4={index > 0} class="md:hidden">
          {#each parseInlineHtml(paragraph) as segment}
            {#if segment.tag === 'strong'}
              <strong class={segment.className}>{segment.text}</strong>
            {:else if segment.tag === 'span'}
              <span class={segment.className}>{segment.text}</span>
            {:else if segment.tag === 'br'}
              <br />
            {:else}
              {segment.text}
            {/if}
          {/each}
        </p>
      {/each}
      {#each hero.desktopParagraphs as paragraph, index (paragraph.join('|'))}
        <p class:mt-4={index > 0} class="hidden md:block">
          {#each paragraph as line, lineIndex (line)}
            {#each parseInlineHtml(line) as segment}
              {#if segment.tag === 'strong'}
              <strong class={segment.className}>{segment.text}</strong>
            {:else if segment.tag === 'span'}
              <span class={segment.className}>{segment.text}</span>
            {:else if segment.tag === 'br'}
              <br />
            {:else}
              {segment.text}
            {/if}
            {/each}{#if lineIndex < paragraph.length - 1}<br />{/if}
          {/each}
        </p>
      {/each}
    </div>

    <div class="hero-cta mt-10 flex flex-col items-center gap-4">
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={hero.cta} shadowless />

    </div>
  </div>
</section>

<style>
  .review-typed { min-height: 1.08em; font-size: clamp(2.5rem, 10vw, 5rem); }
  .typed-text::after { content: ''; display: inline-block; width: 2px; height: .82em; margin-left: .08em; vertical-align: -.02em; background: currentColor; animation: hero-cursor 1200ms steps(1, end) infinite; }
  .typed-text.complete::after { animation: hero-cursor 1200ms steps(1, end) 3 forwards; }
  @keyframes hero-cursor { 0%, 55% { opacity: .65; } 56%, 100% { opacity: 0; } }
  @media (min-width: 768px) { .hero-cta { max-width: 32rem; } }
  @media (prefers-reduced-motion: reduce) { .typed-text::after { display: none; animation: none; } }
  .hero-accent-line {
    font-weight: 300 !important;
  }

  .home-hero-accent { margin-top: .375rem; }
  .home-hero-copy { margin-top: 1.75rem; }
  @media (max-width: 767.98px) {
    .home-hero-copy { font-size: 13.7px; font-weight: 400; line-height: 1.6; }
    .home-hero { min-height: 0 !important; }
    .home-hero-content { padding-bottom: 40px; padding-inline: 16px; }
  }
</style>




