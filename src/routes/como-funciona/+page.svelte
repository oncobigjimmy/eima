<script>
  import { site } from '$lib/site';
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
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { watchReducedMotion } from '$lib/motion';
  let reducedMotion = false;

  let programCopy = getProgramCopy('es');
  let phrases = programCopy.hero.phrases;

  /** @param {number} ms */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /** @type {HTMLVideoElement} */
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
    typedPhrase = reducedMotion ? phrases[0] : '';
    showUnderscore = false;
  }

  onMount(() => {
    let cancelled = false;
    let generation = 0;

    /** @param {number} version */
    async function animate(version) {
      while (!cancelled && !reducedMotion && version === generation) {
        const phrase = phrases[phraseIndex];
        typedPhrase = '';
        showUnderscore = false;

        for (let i = 1; i <= phrase.length && !cancelled && !reducedMotion && version === generation; i += 1) {
          typedPhrase = phrase.slice(0, i);
          await sleep(90);
        }

        if (cancelled || reducedMotion || version !== generation) return;
        if (phraseIndex < phrases.length - 1) {
          for (let pulse = 0; pulse < 2 && !cancelled && !reducedMotion && version === generation; pulse += 1) {
            showUnderscore = true;
            await sleep(180);
            showUnderscore = false;
            await sleep(180);
          }
        } else {
          await sleep(420);
        }

        if (cancelled || reducedMotion || version !== generation) return;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const tryPlay = async () => {
      if (!heroVideo) return;
      try {
        await heroVideo.play();
      } catch {
        // Ignore autoplay failures in local preview.
      }
    };

    const stopMotion = watchReducedMotion((reduced) => {
      reducedMotion = reduced;
      generation += 1;
      if (heroVideo) heroVideo.autoplay = !reduced;
      if (reduced) {
        phraseIndex = 0;
        typedPhrase = phrases[0];
        showUnderscore = false;
        heroVideo?.pause();
      } else {
        animate(generation);
        tryPlay();
      }
    });

    return () => {
      cancelled = true;
      stopMotion();
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
  <meta property="og:image" content={`${site.url}/og-image.png`} />
  <meta property="og:image:alt" content={meta.imageAlt} />
  <meta name="twitter:title" content={meta.ogTitle} />
  <meta name="twitter:description" content={meta.ogDescription} />
  <meta name="twitter:image" content={`${site.url}/og-image.png`} />
</svelte:head>

<div class:program-es-rhythm={true}>
<section class="program-hero relative w-full overflow-hidden">
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
    class="site-hero-overlay absolute inset-0"
    aria-hidden="true"
  ></div>

  <div class={`program-hero-content photo-text-contrast relative z-10 mx-auto max-w-7xl px-6 pb-10 md:px-10 pt-18 md:pt-22 lg:pt-[98px]`}>
    <h1 class="sr-only">
      {hero.srTitle}
    </h1>
    <div class="max-w-4xl leading-[1.02] tracking-tight" aria-hidden="true">
      {#if hero.eyebrow}
        <span class="mb-4 block max-w-xl text-[5px] font-light tracking-wide text-white/10 md:text-[5px]">
          {hero.eyebrow}
        </span>
      {/if}
      <span
        class="hero-typed-line mt-3 block text-[28px] md:mt-3 md:text-[50px]"
        style="color: var(--color-brand-accent);"
        aria-label={phrases[phraseIndex]}
      >
        <span class="inline-block min-w-[14ch]">
          {typedPhrase}{#if showUnderscore}<span class="typed-underscore">_</span>{/if}
        </span>
      </span>
      <span class={`block text-[35px] font-light text-white md:text-[60px] mt-3 md:mt-3`}>
        {hero.line1}
      </span>
      <span class="mt-1 block text-5xl font-bold text-white md:text-[5rem]">{hero.line2}</span>
    </div>

    <div class={`max-w-3xl text-[15px] font-light leading-relaxed text-white/96 md:text-[1.08rem] mt-8`}>
      <p class="hidden md:block">
        {#each hero.desktopParagraph as line, index}
          <span use:htmlContent={line}></span>
          {#if index < hero.desktopParagraph.length - 1}<br />{/if}
        {/each}
      </p>
      <p class="md:hidden" use:htmlContent={hero.mobileParagraph}></p>
    </div>

    <div class="mt-10 flex flex-col items-center gap-4">
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={hero.cta} shadowless />
    </div>
  </div>
</section>

<ProgramStepsSection />

<ParallaxSloganSection
  image="/Gemini_Generated_Image_y50u8jy50u8jy50u-100.png"
  compact
  sectionClass="program-banner"
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
      <p class="mobile-copy-14 text-[16px] font-light leading-relaxed text-[#233F4E]">
        {#if pageLanguage === 'en'}
          Still unsure whether Empenta<span class="hidden md:inline"> </span><br class="md:hidden" />is right for you?
        {:else}
          {programCopy.doubtCta.text}
        {/if}
      </p>

      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={programCopy.doubtCta.cta} />
    </div>
  </div>
</section>

<ParallaxSloganSection
  image="/Gemini_Generated_Image_bhw0rlbhw0rlbhw0-70.png"
  compact
  sectionClass="program-banner"
  topHtml={programCopy.slogan2.topHtml}
  bottomHtml={programCopy.slogan2.bottomHtml}
  mobileTopSize={18}
  desktopTopSize={24}
  mobileBottomSize={20}
  desktopBottomSize={33}
/>

<ProgramFaqSection />
</div>

<style>
  @media (max-width: 767px) {
    .program-hero { min-height: 0 !important; }
  }
  .program-hero-content { padding-bottom: var(--program-section-start); }
  .program-es-rhythm {
    --program-section-start: clamp(2.75rem, 5vw, 4.75rem);
    --program-section-end: clamp(3rem, 5vw, 4.75rem);
  }

  :global(.program-es-rhythm .program-steps-section) {
    padding-top: var(--program-section-start);
    padding-bottom: var(--program-section-end);
  }

  :global(.program-es-rhythm .program-banner) { padding-bottom: 0; }

  :global(.program-es-rhythm .program-fit-section),
  :global(.program-es-rhythm #faq) { padding-top: var(--program-section-start); }

  :global(.program-es-rhythm #faq) { padding-bottom: var(--program-section-end); }

  .hero-typed-line,
  .hero-typed-line * {
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif !important;
    font-weight: 300 !important;
    font-style: italic !important;
  }

  .typed-underscore {
    display: inline-block;
    margin-left: 0.02em;
  }

</style>




