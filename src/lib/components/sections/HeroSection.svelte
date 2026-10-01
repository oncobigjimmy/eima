<script>
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

  let phraseIndex = 0;
  let typedPhrase = '';
  let phrases = getCopy('es').home.hero.phrases;

  $: hero = getCopy($language).home.hero;
  $: whatsappHref = getWhatsAppHref($language, true);
  $: if (phrases !== hero.phrases) {
    phrases = hero.phrases;
    phraseIndex = 0;
    typedPhrase = reducedMotion ? phrases[0] : '';
  }

  onMount(() => {
    let cancelled = false;
    let generation = 0;

    /** @param {number} version */
    async function animate(version) {
      while (!cancelled && !reducedMotion && version === generation) {
        const phrase = phrases[phraseIndex];
        typedPhrase = '';

        for (let i = 1; i <= phrase.length && !cancelled && !reducedMotion && version === generation; i += 1) {
          typedPhrase = phrase.slice(0, i);
          await sleep(90);
        }

        await sleep(760);
        if (cancelled || reducedMotion || version !== generation) return;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const stopMotion = watchReducedMotion((reduced) => {
      reducedMotion = reduced;
      generation += 1;
      if (heroVideo) heroVideo.autoplay = !reduced;
      if (reduced) {
        phraseIndex = 0;
        typedPhrase = phrases[0];
        heroVideo?.pause();
      } else {
        animate(generation);
        heroVideo?.play().catch(() => {});
      }
    });

    return () => {
      cancelled = true;
      stopMotion();
    };
  });
</script>

<section class="relative w-full overflow-hidden" style="min-height: 92vh;">
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
  <div
    class="site-hero-overlay absolute inset-0"
    aria-hidden="true"
  ></div>

  <div class={`photo-text-contrast relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-20 md:px-10 md:pt-24 lg:pt-[111px]`}>
    <div class="max-w-3xl leading-[1.02] tracking-tight">

      <span class="block text-[2.1rem] font-normal text-white md:text-6xl">{hero.intro}</span>
      <span
        class="mt-1 block text-5xl font-bold text-white md:mt-2 md:text-[5rem]"
        class:review-typed={true}
        aria-label={phrases[phraseIndex]}
      >
        <span class="inline-block">{typedPhrase}</span>
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

    <div class="mt-10 flex flex-col items-center gap-4">
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={hero.cta} shadowless />

    </div>
  </div>
</section>

<style>
  .review-typed { min-height: 1.08em; font-size: clamp(2.5rem, 10vw, 5rem); }
  .hero-accent-line {
    font-weight: 300 !important;
  }

  .home-hero-accent { margin-top: .375rem; }
  .home-hero-copy { margin-top: 1.75rem; }
</style>




