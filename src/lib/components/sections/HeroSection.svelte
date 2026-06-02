<script>
  import { onMount } from 'svelte';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';

  /** @param {number} ms */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /** @param {string} html */
  function parseInlineHtml(html) {
    const segments = [];
    const pattern = /<(strong|span)(?: class="([^"]*)")?>(.*?)<\/\1>/g;
    let cursor = 0;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      if (match.index > cursor) {
        segments.push({ text: html.slice(cursor, match.index), tag: 'text' });
      }

      segments.push({ text: match[3], tag: match[1], className: match[2] });
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
  $: whatsappHref = getWhatsAppHref($language);
  $: if (phrases !== hero.phrases) {
    phrases = hero.phrases;
    phraseIndex = 0;
    typedPhrase = '';
  }

  onMount(() => {
    let cancelled = false;

    async function animate() {
      while (!cancelled) {
        const phrase = phrases[phraseIndex];
        typedPhrase = '';

        for (let i = 1; i <= phrase.length && !cancelled; i += 1) {
          typedPhrase = phrase.slice(0, i);
          await sleep(90);
        }

        await sleep(760);

        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    animate();

    return () => {
      cancelled = true;
    };
  });
</script>

<section class="relative w-full overflow-hidden" style="min-height: 92vh;">
  <video
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
    class="absolute inset-0"
    style="background: linear-gradient(90deg, rgba(20,38,49,0.92) 0%, rgba(20,38,49,0.78) 55%, rgba(20,38,49,0.55) 100%);"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-20 md:px-10 md:pt-24">
    <div class="max-w-3xl leading-[1.02] tracking-tight">
      <h1 class="mb-4 block max-w-xl text-[7px] font-light tracking-wide text-white/10 md:text-[7px]">
        {hero.eyebrow}
      </h1>
      <span class="block text-[2.1rem] font-normal text-white md:text-6xl">{hero.intro}</span>
      <span
        class="mt-1 block text-5xl font-bold text-white md:mt-2 md:text-[5rem]"
        aria-label={phrases[phraseIndex]}
      >
        <span class="inline-block min-w-[10ch]">{typedPhrase}</span>
      </span>
      <span
        class="hero-accent-line mt-3 block font-serif-italic text-3xl md:text-[3.2rem]"
        style="color: var(--color-brand-accent);"
      >
        {hero.fromHome}
      </span>
    </div>

    <div class="mt-10 max-w-lg text-[15px] font-light leading-relaxed text-white/90 md:text-base">
      {#each hero.mobileParagraphs as paragraph, index (paragraph)}
        <p class:mt-4={index > 0} class="md:hidden">
          {#each parseInlineHtml(paragraph) as segment}
            {#if segment.tag === 'strong'}
              <strong class={segment.className}>{segment.text}</strong>
            {:else if segment.tag === 'span'}
              <span class={segment.className}>{segment.text}</span>
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
              {:else}
                {segment.text}
              {/if}
            {/each}{#if lineIndex < paragraph.length - 1}<br />{/if}
          {/each}
        </p>
      {/each}
    </div>

    <div class="mt-10 flex flex-col items-center gap-4">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        class="hero-cta inline-flex w-fit items-center justify-center rounded-full border border-white/50 px-7 py-3.5 text-white font-light transition-[background-color,transform,font-weight] duration-300 ease-out hover:scale-[1.03] hover:bg-white/10 hover:font-bold"
      >
        {hero.cta}
      </a>
      <p class="max-w-md text-center text-xs font-light leading-relaxed text-white/75 md:text-sm">
        {hero.note}
      </p>
    </div>
  </div>
</section>

<style>
  .hero-cta {
    isolation: isolate;
    overflow: hidden;
    position: relative;
  }

  .hero-cta::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(-180%) skewX(-18deg);
    transition: transform 420ms ease-out;
    width: 44%;
    z-index: 0;
  }

  .hero-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .hero-cta :global(*) {
    position: relative;
    z-index: 1;
  }

  .hero-accent-line {
    font-weight: 300;
  }
</style>




