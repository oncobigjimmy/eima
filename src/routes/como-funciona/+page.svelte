<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import ProgramStepsSection from '$lib/components/sections/ProgramStepsSection.svelte';
  import ProgramFitSection from '$lib/components/sections/ProgramFitSection.svelte';
  import ProgramFaqSection from '$lib/components/sections/ProgramFaqSection.svelte';
  import ParallaxSloganSection from '$lib/components/sections/ParallaxSloganSection.svelte';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getProgramCopy } from '$lib/i18n/program';
  import { getAbsoluteUrl, getAlternateLinks, getLanguageFromPath, getLocalizedPath } from '$lib/i18n/routes';

  let programCopy = getProgramCopy('es');
  let phrases = programCopy.hero.phrases;

  /** @param {number} ms */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let heroVideo;
  let phraseIndex = 0;
  let typedPhrase = '';
  let showUnderscore = false;

  /** @param {HTMLElement} node @param {string} value */
  function htmlContent(node, value) {
    node.innerHTML = value;

    return {
      /** @param {string} nextValue */
      update(nextValue) {
        node.innerHTML = nextValue;
      }
    };
  }

  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? $language;
  $: programCopy = getProgramCopy(pageLanguage);
  $: hero = programCopy.hero;
  $: meta = programCopy.meta;
  $: whatsappHref = getWhatsAppHref(pageLanguage);
  $: canonicalUrl = getAbsoluteUrl(getLocalizedPath($page.url.pathname, pageLanguage));
  $: alternateLinks = getAlternateLinks('program');
  $: if (phrases !== hero.phrases) {
    phrases = hero.phrases;
    phraseIndex = 0;
    typedPhrase = '';
    showUnderscore = false;
  }

  onMount(() => {
    let cancelled = false;

    async function animate() {
      while (!cancelled) {
        const phrase = phrases[phraseIndex];
        typedPhrase = '';
        showUnderscore = false;

        for (let i = 1; i <= phrase.length && !cancelled; i += 1) {
          typedPhrase = phrase.slice(0, i);
          await sleep(90);
        }

        if (phraseIndex < phrases.length - 1) {
          for (let pulse = 0; pulse < 2 && !cancelled; pulse += 1) {
            showUnderscore = true;
            await sleep(180);
            showUnderscore = false;
            await sleep(180);
          }
        } else {
          await sleep(420);
        }

        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const tryPlay = async () => {
      if (!heroVideo) return;
      try {
        heroVideo.load();
        await heroVideo.play();
      } catch {
        // Ignore autoplay failures in local preview.
      }
    };

    animate();
    tryPlay();

    return () => {
      cancelled = true;
    };
  });
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={canonicalUrl} />
  {#each alternateLinks as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta property="og:title" content={meta.ogTitle} />
  <meta property="og:description" content={meta.ogDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content="https://eimafisioterapia.es/og-image.png" />
  <meta property="og:image:alt" content={meta.imageAlt} />
  <meta name="twitter:title" content={meta.ogTitle} />
  <meta name="twitter:description" content={meta.ogDescription} />
  <meta name="twitter:image" content="https://eimafisioterapia.es/og-image.png" />
</svelte:head>

<section class="relative w-full overflow-hidden" style="min-height: 88vh;">
  <video
    bind:this={heroVideo}
    class="absolute inset-0 h-full w-full object-cover"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    poster="/hero.jpg"
    aria-hidden="true"
  >
    <source src="/videos/como-funciona-hero.mp4" type="video/mp4" />
  </video>

  <div
    class="absolute inset-0"
    style="background: linear-gradient(90deg, rgba(20,38,49,0.58) 0%, rgba(20,38,49,0.38) 55%, rgba(20,38,49,0.18) 100%);"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-22 md:px-10 md:pt-26">
    <h1 class="sr-only">
      {hero.srTitle}
    </h1>
    <div class="max-w-4xl leading-[1.02] tracking-tight" aria-hidden="true">
      <span class="mb-4 block max-w-xl text-[7px] font-light tracking-wide text-white/10 md:text-[7px]">
        {hero.eyebrow}
      </span>
      <span
        class="hero-typed-line mt-3 block text-[28px] md:mt-3 md:text-[50px]"
        style="color: var(--color-brand-accent);"
        aria-label={phrases[phraseIndex]}
      >
        <span class="inline-block min-w-[14ch]">
          {typedPhrase}{#if showUnderscore}<span class="typed-underscore">_</span>{/if}
        </span>
      </span>
      <span class="mt-2 block text-[35px] font-light text-white md:mt-1 md:text-[60px]">
        {hero.line1}
      </span>
      <span class="mt-1 block text-5xl font-bold text-white md:text-[5rem]">{hero.line2}</span>
    </div>

    <div class="mt-10 max-w-3xl text-[15px] font-light leading-relaxed text-white/92 md:text-[1.08rem]">
      <p class="hidden md:block">
        {#each hero.desktopParagraph as line, index}
          <span use:htmlContent={line}></span>
          {#if index < hero.desktopParagraph.length - 1}<br />{/if}
        {/each}
      </p>
      <p class="md:hidden" use:htmlContent={hero.mobileParagraph}></p>
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
    </div>
  </div>
</section>

<ProgramStepsSection />

<ParallaxSloganSection
  image="/Gemini_Generated_Image_y50u8jy50u8jy50u-100.png"
  topHtml={programCopy.slogan1.topHtml}
  bottomHtml={programCopy.slogan1.bottomHtml}
  mobileTopSize={15}
  desktopTopSize={22}
  mobileBottomSize={21.5}
  desktopBottomSize={33}
/>

<ProgramFitSection />

<section class="bg-[#f8f4f0] pb-12 pt-0 md:pb-16 md:pt-1">
  <div class="mx-auto max-w-6xl px-6 text-center md:px-10">
    <div class="flex flex-col items-center gap-4 md:gap-5">
      <p class="text-[16px] font-light leading-relaxed text-[#233F4E]">
        {programCopy.doubtCta.text}
      </p>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        class="final-cta inline-flex w-fit items-center justify-center rounded-full bg-[#8CD0D6] px-6 py-3 text-[15px] font-medium text-[#233F4E] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-[#4083A7] hover:font-bold hover:text-white hover:shadow-[0_10px_24px_rgba(64,131,167,0.28)]"
      >
        <span class="final-cta__label">{programCopy.doubtCta.cta}</span>
      </a>
    </div>
  </div>
</section>

<ParallaxSloganSection
  image="/Gemini_Generated_Image_bhw0rlbhw0rlbhw0-70.png"
  topHtml={programCopy.slogan2.topHtml}
  bottomHtml={programCopy.slogan2.bottomHtml}
  mobileTopSize={18}
  desktopTopSize={24}
  mobileBottomSize={20}
  desktopBottomSize={33}
/>

<ProgramFaqSection />

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

  .final-cta {
    isolation: isolate;
    overflow: hidden;
    position: relative;
  }

  .final-cta::before {
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

  .final-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .final-cta__label {
    position: relative;
    z-index: 1;
  }

  .hero-typed-line,
  .hero-typed-line * {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif !important;
    font-style: italic !important;
    font-weight: 300 !important;
  }

  .typed-underscore {
    display: inline-block;
    margin-left: 0.02em;
  }

</style>




