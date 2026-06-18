<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getAboutCopy } from '$lib/i18n/about';
  import { getAbsoluteUrl, getAlternateLinks, getLanguageFromPath, getLocalizedPath, getRoutePath } from '$lib/i18n/routes';

  let typedDefinitionOne = '';
  let typedDefinitionTwo = '';
  let typedClosing = '';
  let typedTeamHint = '';
  let dictionaryTyping = false;
  let dictionaryFinalPulse = false;
  /** @type {HTMLElement | undefined} */
  let dictionaryNode;
  /** @type {HTMLElement | undefined} */
  let closingHeadingNode;
  /** @type {HTMLElement | undefined} */
  let teamHintNode;
  let dictionaryStarted = false;
  let closingStarted = false;
  let teamHintStarted = false;
  let currentLanguage = $language;

  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? $language;
  $: aboutCopy = getAboutCopy(pageLanguage);
  $: meta = aboutCopy.meta;
  $: hero = aboutCopy.hero;
  $: origin = aboutCopy.origin;
  $: dictionary = aboutCopy.dictionary;
  $: team = aboutCopy.team;
  $: principlesCopy = aboutCopy.principles;
  $: closing = aboutCopy.closing;
  $: principles = principlesCopy.items;
  $: whatsappHref = getWhatsAppHref(pageLanguage);
  $: storyPath = getRoutePath('story', pageLanguage);
  $: miquelStoryHref = `${storyPath}#miquel`;
  $: jaumeStoryHref = `${storyPath}#jaume`;
  $: canonicalUrl = getAbsoluteUrl(getLocalizedPath($page.url.pathname, pageLanguage));
  $: alternateLinks = getAlternateLinks('about');
  $: definitionOne = dictionary.definitionOne;
  $: definitionTwo = dictionary.definitionTwo;
  $: teamHintFullText = team.hintFull;
  $: teamHintMobileLineOne = team.hintMobileLineOne;
  $: teamHintMobileLineTwo = team.hintMobileLineTwo;
  $: closingPrefix = closing.prefix;
  $: closingAccentOne = closing.accentOne;
  $: closingMiddle = closing.middle;
  $: closingAccentTwo = closing.accentTwo;
  $: originTitleHighlight = origin.titleHighlight ?? 'EIMA';
  $: originTitleDesktopSuffix = origin.titleDesktopSuffix ?? '';
  $: originTitleMobileLine2Highlight = origin.titleMobileLine2Highlight ?? 'EIMA';
  $: originTitleMobileLine2Suffix = origin.titleMobileLine2Suffix ?? '';
  $: closingFirstLineLength = closingPrefix.length + closingAccentOne.length;
  $: closingSecondLineStart = closingFirstLineLength + 1;
  $: closingThirdLineStart = closingSecondLineStart + closingMiddle.length + 1;
  $: closingFullText = `${closingPrefix}${closingAccentOne} ${closingMiddle} ${closingAccentTwo}`;
  $: if (currentLanguage !== pageLanguage) {
    currentLanguage = pageLanguage;
    if (dictionaryStarted) {
      typedDefinitionOne = definitionOne;
      typedDefinitionTwo = definitionTwo;
    }
    if (closingStarted) typedClosing = closingFullText;
    typedTeamHint = teamHintStarted ? teamHintFullText : teamHintFullText;
  }

  /** @param {number} ms */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * @param {HTMLElement} node
   * @param {string} value
   */
  function htmlContent(node, value) {
    node.innerHTML = value;

    return {
      /** @param {string} nextValue */
      update(nextValue) {
        node.innerHTML = nextValue;
      }
    };
  }

  /**
   * @param {string} text
   * @param {number} start
   * @param {number} length
   */
  function getTypedSegment(text, start, length) {
    return text.slice(start, Math.min(text.length, start + length));
  }

  /** @param {HTMLElement} node */
  function revealOnScroll(node) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  onMount(() => {
    let cancelled = false;
    /** @type {IntersectionObserver | undefined} */
    let observer;
    /** @type {IntersectionObserver | undefined} */
    let closingObserver;
    /** @type {IntersectionObserver | undefined} */
    let teamHintObserver;

    async function typeDictionary() {
      if (dictionaryStarted) return;
      dictionaryStarted = true;

      await sleep(420);

      for (let i = 1; i <= definitionOne.length && !cancelled; i += 1) {
        dictionaryTyping = true;
        typedDefinitionOne = definitionOne.slice(0, i);
        await sleep(42);
      }

      await sleep(380);

      for (let i = 1; i <= definitionTwo.length && !cancelled; i += 1) {
        typedDefinitionTwo = definitionTwo.slice(0, i);
        await sleep(38);
      }

      dictionaryTyping = false;
      dictionaryFinalPulse = true;
      await sleep(2100);
      dictionaryFinalPulse = false;
    }

    async function typeClosingHeading() {
      if (closingStarted) return;
      closingStarted = true;

      await sleep(220);

      for (let i = 1; i <= closingFullText.length && !cancelled; i += 1) {
        typedClosing = closingFullText.slice(0, i);
        await sleep(44);
      }
    }

    async function typeTeamHint() {
      if (teamHintStarted) return;
      teamHintStarted = true;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      typedTeamHint = '';
      await sleep(180);

      for (let i = 1; i <= teamHintFullText.length && !cancelled; i += 1) {
        typedTeamHint = teamHintFullText.slice(0, i);
        await sleep(34);
      }
    }

    if (dictionaryNode && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer?.disconnect();
            typeDictionary();
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(dictionaryNode);
    } else {
      typeDictionary();
    }

    if (closingHeadingNode && 'IntersectionObserver' in window) {
      closingObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            closingObserver?.disconnect();
            typeClosingHeading();
          }
        },
        { threshold: 0.5 }
      );

      closingObserver.observe(closingHeadingNode);
    } else {
      typeClosingHeading();
    }

    if (teamHintNode && 'IntersectionObserver' in window) {
      teamHintObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            teamHintObserver?.disconnect();
            typeTeamHint();
          }
        },
        { threshold: 0.4 }
      );

      teamHintObserver.observe(teamHintNode);
    } else {
      typeTeamHint();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      closingObserver?.disconnect();
      teamHintObserver?.disconnect();
    };
  });

  $: if (!teamHintStarted) typedTeamHint = teamHintFullText;
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

<section class="about-hero relative min-h-[86vh] overflow-hidden bg-[#13212b] pt-24 md:pt-28">
  <div class="absolute inset-0">
    <img
      src="/buyer-persona-Cx-2.0.png"
      alt=""
      class="h-full w-full object-cover object-center"
    />
    <div
      class="absolute inset-0"
      style="background: linear-gradient(90deg, rgba(8, 18, 24, 0.48) 0%, rgba(8, 18, 24, 0.38) 44%, rgba(8, 18, 24, 0.2) 100%), linear-gradient(180deg, rgba(8, 18, 24, 0.12) 0%, rgba(8, 18, 24, 0.36) 100%);"
    ></div>
  </div>

  <div class="relative z-10 mx-auto flex min-h-[calc(86vh-6rem)] max-w-7xl flex-col justify-end px-5 pb-20 md:px-10 md:pb-28">
    <div class="max-w-[42rem] text-white">
      <h1 class="about-hero-title max-w-[12ch] text-[38px] leading-[1.06] text-white md:max-w-none md:text-[60px]">
        <span class="about-hero-title-mobile md:hidden">
          {#if pageLanguage === 'ca'}
            <span class="block whitespace-nowrap">Volem ajudar-te</span>
            <span class="block whitespace-nowrap">a recuperar la teva</span>
            <span class="block whitespace-nowrap text-[#8CD0D6]">energia, confiança</span>
            <span class="block whitespace-nowrap text-[#8CD0D6]">i control.</span>
          {:else if pageLanguage === 'en'}
            <span class="block whitespace-nowrap">We want to help</span>
            <span class="block whitespace-nowrap">you rebuild your</span>
            <span class="block whitespace-nowrap text-[#8CD0D6]">energy, confidence</span>
            <span class="block whitespace-nowrap">
              and sense of <span class="text-[#8CD0D6]">control.</span>
            </span>
          {:else}
            <span class="block whitespace-nowrap">Queremos ayudarte</span>
            <span class="block whitespace-nowrap">a recuperar tu</span>
            <span class="block whitespace-nowrap text-[#8CD0D6]">energía, confianza</span>
            <span class="block whitespace-nowrap">
              y <span class="text-[#8CD0D6]">control.</span>
            </span>
          {/if}
        </span>

        {#if hero.desktopTitleLines}
          <span class="hidden md:block">
            {#each hero.desktopTitleLines as line}
              <span class={`block whitespace-nowrap ${line.accent ? 'text-[#8CD0D6]' : ''}`}>
                {#if line.parts}
                  {#each line.parts as part}
                    <span class:text-[#8CD0D6]={part.accent}>{part.text}</span>
                  {/each}
                {:else}
                  {line.text}
                {/if}
              </span>
            {/each}
          </span>
        {:else}
          <span class="hidden md:block md:whitespace-nowrap">{hero.line1}</span>
          <span class="hidden md:block md:whitespace-nowrap">{hero.line2Prefix} <span class="text-[#8CD0D6]">{hero.line2Highlight}</span></span>
          <span class="hidden md:block md:whitespace-nowrap">
            {#if hero.line3Parts}
              {#each hero.line3Parts as part}
                <span class:text-[#8CD0D6]={part.accent}>{part.text}</span>
              {/each}
            {:else}
              <span class="text-[#8CD0D6]">{hero.line3}</span>
            {/if}
          </span>
        {/if}
      </h1>
      <h2 class="sr-only">
        {hero.srSubtitle}
      </h2>
      <p class="mt-7 max-w-[35rem] text-[16px] font-light leading-[1.75] text-white/90">
        <span use:htmlContent={hero.body}></span>
      </p>
    </div>

    <div class="mt-12 flex w-full flex-col items-center justify-center gap-4 md:flex-row">
      <p class="text-center text-[14px] font-light text-white/72">{hero.prompt}</p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        class="hero-cta inline-flex w-fit items-center justify-center rounded-full border border-white/50 px-7 py-3.5 font-light text-white transition-[background-color,transform,font-weight] duration-300 ease-out hover:scale-[1.03] hover:bg-white/10 hover:font-bold"
      >
        {hero.cta}
      </a>
    </div>
  </div>
</section>

<section id="about-us" class="bg-[#F8F4F0] py-16 md:py-24">
  <div class="mx-auto max-w-6xl px-5 md:px-10">
    <div class="hidden text-center md:block">
      <p class="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-[#4083A7]">
        {origin.eyebrow}
      </p>
      <h2 class="about-section-title about-origin-heading mt-4 text-[58px] leading-[1.02] text-[#233F4E]">
        <span>{origin.titleDesktopPrefix}&nbsp;</span><span class="text-[#4083A7]" style="font-family: inherit;">{originTitleHighlight}</span>{#if originTitleDesktopSuffix}<span>{' '}{originTitleDesktopSuffix}</span>{/if}
      </h2>
      <p class="mx-auto mt-6 max-w-[58rem] text-[16px] font-light leading-[1.85] text-[#233F4E]/88">
        <span use:htmlContent={origin.intro}></span>
      </p>
    </div>

    <div class="grid gap-12 md:mt-12 md:grid-cols-[0.82fr_1fr]">
      <div>
        <p class="text-center text-[0.76rem] font-medium uppercase tracking-[0.22em] text-[#4083A7] md:hidden">
          {origin.eyebrow}
        </p>
        <div class="about-section-title about-origin-heading mt-4 text-center text-[3.05rem] leading-[1.02] text-[#233F4E] md:hidden">
          <span class="block">{origin.titleMobileLine1}</span>
          <span class="block">
            {origin.titleMobileLine2Prefix}{origin.titleMobileLine2Prefix ? ' ' : ''}<span class="text-[#4083A7]" style="font-family: inherit;">{originTitleMobileLine2Highlight}</span>{#if originTitleMobileLine2Suffix}<span>{' '}{originTitleMobileLine2Suffix}</span>{/if}
          </span>
        </div>

        <div
          use:revealOnScroll
          class="about-reveal about-origin-image about-origin-image--desktop mt-8 hidden max-w-[19rem] overflow-hidden rounded-[8px] shadow-[0_34px_76px_rgba(14,29,38,0.38)] ring-1 ring-[#233F4E]/5 md:mx-auto md:mt-5 md:block md:max-w-[23rem]"
        >
          <img
            src="/dependencia-502.png"
            alt={origin.imageAlt}
            class="aspect-[16/9] w-full object-cover object-[64%_center]"
          />
        </div>
      </div>

      <div class="space-y-6 text-[16px] font-light leading-[1.85] text-[#233F4E]/88">
        <p class="md:hidden">
          {origin.introMobile}
        </p>
        {#each origin.firstParagraphs as paragraph}
          <p use:htmlContent={paragraph}></p>
        {/each}
        <div
          use:revealOnScroll
          class="about-reveal about-origin-image mt-8 overflow-hidden rounded-[8px] shadow-[0_34px_76px_rgba(14,29,38,0.38)] ring-1 ring-[#233F4E]/5 md:hidden"
        >
          <img
            src="/dependencia-502.png"
            alt={origin.imageAlt}
            class="aspect-[16/9] w-full object-cover object-[64%_center]"
          />
        </div>
      </div>
    </div>

    <div class="mt-8 grid gap-10 md:mt-10 md:grid-cols-[0.82fr_1fr] md:items-start md:gap-12">
      <div class="space-y-6 text-[16px] font-light leading-[1.85] text-[#233F4E]/88">
        {#each origin.secondParagraphs as paragraph}
          <p use:htmlContent={paragraph}></p>
        {/each}
      </div>

      <div
        use:revealOnScroll
        bind:this={dictionaryNode}
        class="about-reveal dictionary-card bg-white px-5 pb-6 pt-5 shadow-[0_18px_44px_rgba(14,29,38,0.10)] md:px-7 md:pb-7 md:pt-5"
      >
        <p class="dictionary-word">eima</p>
        <p class="mt-4 text-[1rem] leading-snug text-[#14191d] md:text-[18px]">
          <span>{dictionary.phonetic}</span>
          <span class="mx-1.5">·</span>
          <em>{dictionary.gender}</em>
          <span class="mx-1.5">·</span>
          <strong class="font-semibold">{dictionary.region}</strong>
        </p>
        <div class="mt-5 h-px bg-[#14191d]"></div>

        <div class="mt-5 space-y-4 text-[1rem] leading-[1.45] text-[#14191d] md:text-[16px]">
          <div class="grid grid-cols-[1.25rem_1fr] gap-2 md:grid-cols-[1.1rem_1fr] md:gap-2">
            <span>1.</span>
            <p class="md:whitespace-nowrap">
              {typedDefinitionOne}
              {#if dictionaryTyping && typedDefinitionOne.length < definitionOne.length}
                <span class="typing-cursor"></span>
              {/if}
            </p>
          </div>

          <div class="grid grid-cols-[1.25rem_1fr] gap-2 md:grid-cols-[1.1rem_1fr] md:gap-2">
            <span>2.</span>
            <p class="md:whitespace-nowrap">
              {#if typedDefinitionOne.length === definitionOne.length}
                {typedDefinitionTwo}
                {#if (dictionaryTyping && typedDefinitionTwo.length < definitionTwo.length) || dictionaryFinalPulse}
                  <span class="typing-cursor"></span>
                {/if}
              {/if}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="team" class="bg-[#F8F4F0] pb-[4.5rem] md:pb-24">
  <div class="mx-auto max-w-6xl px-5 md:px-10">
    <div class="team-layout grid gap-9 md:grid-cols-[1.06fr_0.94fr] md:items-start md:gap-12">
      <div class="team-copy">
        <header class="team-header max-w-[36rem]">
          <p class="text-center text-[0.76rem] font-medium uppercase tracking-[0.22em] text-[#4083A7] md:text-left">
            {team.eyebrow}
          </p>
          <h2 class="about-section-title team-heading mt-4 text-center text-[2.2rem] leading-[1.05] text-[#233F4E] md:text-left md:pb-1 md:text-[3.15rem] md:leading-[1.04]">
            <span class="block">
              {team.headingLine1Prefix} <span class="text-[#4083A7]" style="font-family: inherit;">{team.headingLine1Highlight}</span>
            </span>
            <span class="block">{team.headingLine2}</span>
            <span class="block">
              {#if pageLanguage === 'ca'}
                <span class="text-[#4083A7]" style="font-family: inherit;">{team.headingLine3Prefix}{team.headingLine3Highlight}</span>
              {:else}
                {team.headingLine3Prefix} <span class="text-[#4083A7]" style="font-family: inherit;">{team.headingLine3Highlight}</span>
              {/if}
            </span>
          </h2>
        </header>

        <div
          use:revealOnScroll
          class="about-reveal team-health-wrap relative mt-10 w-full max-w-[28rem] justify-self-center md:mt-14 md:max-w-none"
        >
          <div class="team-health-label relative z-10 mx-auto w-full whitespace-nowrap rounded-[12px] bg-[#4083A7] px-3 py-3 text-center text-[16px] font-bold leading-tight text-white shadow-[0_8px_18px_rgba(14,29,38,0.18)] md:absolute md:left-1/2 md:top-0 md:w-[28rem] md:-translate-x-1/2 md:-translate-y-1/2 md:px-8 md:text-[20px]">
            {team.healthLabel}
          </div>

          <div class="team-health-card mt-3 bg-[#E8E8F6] px-5 pb-6 pt-6 text-[14px] leading-[1.55] text-black shadow-[0_16px_38px_rgba(14,29,38,0.16)] md:mt-0 md:px-5 md:pb-7 md:pt-9 md:text-[14px]">
            {#each team.healthParagraphs as paragraph, index}
              <p class:mt-5={index > 0} use:htmlContent={paragraph}></p>
            {/each}
          </div>
        </div>
      </div>

      <div bind:this={teamHintNode} class="team-media-column justify-self-center md:mt-7 md:justify-self-end">
        <p
          class="team-photo-hint team-photo-hint--desktop mb-[0.15rem] hidden text-center text-[14px] font-light italic leading-relaxed text-[#233F4E]/72 md:block"
        >
          {typedTeamHint}{#if teamHintStarted && typedTeamHint.length < teamHintFullText.length}<span class="team-hint-cursor"></span>{/if}
        </p>
        <div class="team-photo-card">
          <div use:revealOnScroll class="about-reveal team-photo-inner h-full w-full">
            <img
              src="/eima-team-card.png"
              alt={team.imageAlt}
              class="h-full w-full object-cover object-center"
            />
            <a
              class="team-photo-hover team-photo-hover--left"
              href={miquelStoryHref}
              aria-label="Ver la historia de Miquel Galmés"
            ></a>
            <a
              class="team-photo-hover team-photo-hover--right"
              href={jaumeStoryHref}
              aria-label="Ver la historia de Jaume Sansó"
            ></a>
            <a
              class="team-photo-tooltip team-photo-tooltip--left"
              href={miquelStoryHref}
              aria-label="Ver la historia de Miquel Galmés"
              >Miquel</a
            >
            <a
              class="team-photo-tooltip team-photo-tooltip--right"
              href={jaumeStoryHref}
              aria-label="Ver la historia de Jaume Sansó"
              >Jaume</a
            >
          </div>
        </div>

        <div class="team-mobile-name-row md:hidden" aria-label={team.mobileNamesLabel}>
          <a class="team-mobile-name-chip" href={miquelStoryHref}>Miquel</a>
          <a class="team-mobile-name-chip" href={jaumeStoryHref}>Jaume</a>
        </div>

        <p class="team-photo-hint team-photo-hint--mobile mt-[-0.5rem] text-center text-[14px] font-light italic leading-relaxed text-[#233F4E]/72 md:hidden">
          <span>{teamHintMobileLineOne}</span>
          <br />
          <span>{teamHintMobileLineTwo}</span>
        </p>

        <div class="team-actions mt-6 flex items-center justify-center md:mt-3">
          <a class="about-cta team-action-pill team-action-pill--single" href={storyPath}>
            <span>{team.cta}</span>
            <span class="team-action-icon" aria-hidden="true">
              <svg class="team-action-icon__arrow" viewBox="0 0 256 256" fill="currentColor">
                <path
                  d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
                ></path>
              </svg>
              <svg class="team-action-icon__arrow-up" viewBox="0 0 256 256" fill="currentColor">
                <path
                  d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"
                ></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-[#233F4E] py-16 text-white md:py-[5.5rem]">
  <div class="mx-auto max-w-6xl px-5 md:px-10">
    <header class="mx-auto max-w-3xl text-center">
      <p class="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-[#8CD0D6]">
        {principlesCopy.eyebrow}
      </p>
      <h2 class="about-section-title mt-4 text-[2.1rem] leading-[1.06] text-white md:text-[3rem]">
        {principlesCopy.headingPrefix} <span class="text-[#8CD0D6]" style="font-family: inherit;">{principlesCopy.headingHighlight}</span> {principlesCopy.headingSuffix}
      </h2>
    </header>

    <div class="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
      {#each principles as item, i (item.title)}
        <article
          use:revealOnScroll
          class="about-reveal principle-card border border-white/16 bg-white/[0.06] p-6"
          style={`--reveal-delay: ${i * 90}ms`}
        >
          <svg
            class="h-16 w-16 text-[#8CD0D6]"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={item.iconPath}></path>
          </svg>
          <h3 class="principle-title mt-5 text-[20px] font-bold leading-snug text-white">
            {item.title}
          </h3>
          <p class="mt-4 text-[14px] font-light leading-[1.75] text-white/78">
            {item.text}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>

<section id="closing-section" class="closing-section relative overflow-hidden bg-[#F8F4F0]">
  <div class="closing-section__grid mx-auto grid max-w-7xl items-stretch md:grid-cols-[1.05fr_0.95fr]">
    <div class="closing-section__copy px-5 py-16 md:px-10 md:py-24">
      <p class="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-[#4083A7]">
        {closing.eyebrow}
      </p>
      <h2 class="sr-only">{closingFullText}</h2>
      <div
        bind:this={closingHeadingNode}
        class="about-section-title closing-type-title mt-4 text-[40px] leading-[1.04] text-[#233F4E] md:text-[58px]"
        aria-label={closingFullText}
      >
        <span class="sr-only">{closingFullText}</span>
        <span aria-hidden="true">
          <span class="block" style="font-family: inherit;">
            {getTypedSegment(typedClosing, 0, closingPrefix.length)}<span class="text-[#4083A7]" style="font-family: inherit;">{getTypedSegment(typedClosing, closingPrefix.length, closingAccentOne.length)}</span>
            {#if closingStarted && typedClosing.length < closingSecondLineStart}<span class="closing-typing-cursor"></span>{/if}
          </span>
          <span class="block" style="font-family: inherit;">
            {getTypedSegment(typedClosing, closingSecondLineStart, closingMiddle.length)}
            {#if closingStarted && typedClosing.length >= closingSecondLineStart && typedClosing.length < closingThirdLineStart}<span class="closing-typing-cursor"></span>{/if}
          </span>
          <span class="block text-[#4083A7]" style="font-family: inherit;">
            {getTypedSegment(typedClosing, closingThirdLineStart, closingAccentTwo.length)}{#if closingStarted && typedClosing.length >= closingThirdLineStart && typedClosing.length < closingFullText.length}<span class="closing-typing-cursor"></span>{/if}
          </span>
        </span>
      </div>
      <div class="mt-7 max-w-[36rem] space-y-5 text-[16px] font-light leading-[1.85] text-[#233F4E]/86">
        {#each closing.paragraphs as paragraph}
          <p use:htmlContent={paragraph}></p>
        {/each}
      </div>

      <div class="mt-9 flex justify-center">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          class="about-cta inline-flex w-fit items-center justify-center rounded-full bg-[#8CD0D6] px-6 py-3 text-[15px] font-medium text-[#233F4E] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-[#4083A7] hover:font-bold hover:text-white hover:shadow-[0_10px_24px_rgba(64,131,167,0.28)]"
        >
          <span>{closing.cta}</span>
        </a>
      </div>
    </div>

    <div class="min-h-[24rem] md:min-h-full">
      <img
        src="/sunset-80-1.png"
        alt=""
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</section>

<style>
  .about-hero-title,
  .about-hero-title *,
  .about-section-title {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-weight: 500;
    letter-spacing: 0;
  }

  .about-origin-heading,
  .about-origin-heading * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  }

  :global(.about-origin-nowrap) {
    white-space: normal;
  }

  @media (min-width: 1180px) {
    :global(.about-origin-nowrap) {
      white-space: nowrap;
    }
  }

  .team-heading,
  .team-heading * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  }

  .principle-title {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
  }

  .about-reveal {
    opacity: 0;
    transform: translate3d(0, 28px, 0);
    transition:
      opacity 680ms ease-out,
      transform 680ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
    will-change: opacity, transform;
  }

  :global(.about-reveal[data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .team-card,
  .principle-card,
  .dictionary-card {
    border: 1px solid rgba(64, 131, 167, 0);
    border-radius: 8px;
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      transform 220ms ease;
  }

  .dictionary-card:hover {
    border-color: rgba(140, 208, 214, 0.95);
    box-shadow: 0 22px 52px rgba(14, 29, 38, 0.13);
    transform: translateY(-2px);
  }

  .principle-card:hover {
    border-color: rgba(140, 208, 214, 0.95);
    box-shadow:
      inset 0 0 0 1px rgba(140, 208, 214, 0.55),
      0 18px 42px rgba(14, 29, 38, 0.16);
    transform: translateY(-2px);
  }

  .dictionary-word {
    color: #14191d;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: clamp(3.5rem, 10vw, 4.375rem);
    font-weight: 500;
    letter-spacing: 0;
    line-height: 0.82;
  }

  @media (min-width: 768px) {
    .about-origin-image {
      transform: translateY(0.35rem);
    }

    .dictionary-word {
      font-size: 70px;
    }
  }

  .typing-cursor {
    animation: cursor-blink 0.78s steps(1) infinite;
    border-right: 2px solid #14191d;
    display: inline-block;
    height: 1em;
    margin-left: 0.08em;
    transform: translateY(0.16em);
  }

  @keyframes cursor-blink {
    50% {
      opacity: 0;
    }
  }

  .closing-type-title {
    min-height: 7.85rem;
    max-width: 43rem;
  }

  .closing-type-title,
  .closing-type-title * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  }

  .closing-type-title span[aria-hidden='true'] > .block {
    white-space: nowrap;
  }

  .closing-typing-cursor {
    animation: cursor-blink 0.78s steps(1) infinite;
    border-right: 2px solid currentColor;
    display: inline-block;
    height: 0.82em;
    margin-left: 0.08em;
    transform: translateY(0.1em);
  }

  .team-hint-cursor {
    animation: cursor-blink 0.78s steps(1) infinite;
    border-right: 1.5px solid currentColor;
    display: inline-block;
    height: 0.9em;
    margin-left: 0.08em;
    transform: translateY(0.12em);
  }

  .team-photo-card {
    aspect-ratio: 4 / 5;
    border-radius: 18px;
    overflow: visible;
    width: min(82vw, 21rem);
  }

  .team-photo-card img {
    border-radius: inherit;
    transform-origin: center center;
  }

  .team-photo-inner {
    position: relative;
  }

  .team-photo-hover {
    bottom: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 50%;
    z-index: 2;
  }

  .team-photo-hover--left {
    left: 0;
  }

  .team-photo-hover--right {
    right: 0;
  }

  .team-photo-tooltip {
    background: rgba(24, 24, 27, 0.92);
    border-radius: 6px;
    bottom: 0.8rem;
    color: #fff;
    font-size: 12px;
    left: 50%;
    opacity: 0;
    padding: 0.35rem 0.5rem;
    pointer-events: none;
    position: absolute;
    transform: translate(-50%, 10px) scale(0.96);
    transform-origin: top center;
    transition:
      opacity 180ms ease-out,
      transform 180ms ease-out;
    white-space: nowrap;
    z-index: 30;
  }

  .team-photo-tooltip--left {
    left: 34%;
  }

  .team-photo-tooltip--right {
    left: 63%;
  }

  .team-photo-tooltip::after {
    border-bottom: 5px solid rgba(24, 24, 27, 0.92);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    content: '';
    left: 50%;
    position: absolute;
    bottom: 100%;
    transform: translateX(-50%);
  }

  .team-photo-hover--left:hover ~ .team-photo-tooltip--left,
  .team-photo-hover--left:focus-visible ~ .team-photo-tooltip--left,
  .team-photo-hover--right:hover ~ .team-photo-tooltip--right,
  .team-photo-hover--right:focus-visible ~ .team-photo-tooltip--right {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0) scale(1);
  }

  .team-media-column {
    width: min(100%, 31rem);
  }

  .team-mobile-name-row {
    display: none;
  }

  .team-mobile-name-chip {
    background: rgba(24, 24, 27, 0.92);
    border-radius: 6px;
    color: #fff;
    font-size: 12px;
    line-height: 1;
    padding: 0.45rem 0.55rem;
    position: relative;
    text-decoration: none;
    white-space: nowrap;
  }

  .team-mobile-name-chip::after {
    border-bottom: 5px solid rgba(24, 24, 27, 0.92);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    bottom: 100%;
    content: '';
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }

  .team-health-card {
    border: 1.5px solid #4083a7;
    border-radius: 12px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .team-health-card,
  .team-health-card * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  }

  .team-health-label {
    box-sizing: border-box;
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif !important;
  }

  .team-action-pill {
    align-items: center;
    background: #8cd0d6;
    border-radius: 999px;
    color: #0f2530;
    display: inline-flex;
    gap: 0.55rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    justify-content: center;
    min-width: 11.5rem;
    padding: 0.88rem 1.45rem;
    transition:
      background-color 300ms ease,
      box-shadow 300ms ease,
      color 300ms ease,
      font-weight 300ms ease,
      transform 300ms ease;
  }

  .team-action-pill--single {
    min-width: 14.5rem;
  }

  .team-action-pill:hover {
    background: #4083a7;
    box-shadow: 0 10px 24px rgba(64, 131, 167, 0.28);
    color: #ffffff;
    font-weight: 700;
    transform: scale(1.03);
  }

  .team-action-icon {
    display: grid;
    height: 1.25rem;
    place-items: center;
    position: relative;
    width: 1.25rem;
  }

  .team-action-icon svg {
    height: 1.25rem;
    position: absolute;
    transition:
      opacity 220ms ease-out,
      transform 220ms ease-out;
    width: 1.25rem;
  }

  .team-action-icon__arrow {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  .team-action-icon__arrow-up {
    opacity: 0;
    transform: translate(-0.18rem, 0.18rem) scale(0.86);
  }

  .team-action-pill:hover .team-action-icon__arrow {
    opacity: 0;
    transform: translate(0.2rem, -0.1rem) scale(0.86);
  }

  .team-action-pill:hover .team-action-icon__arrow-up {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }

  .team-card__initial {
    align-items: center;
    background: #8cd0d6;
    border-radius: 999px;
    color: #233f4e;
    display: inline-flex;
    flex: none;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 2.25rem;
    height: 4rem;
    justify-content: center;
    line-height: 1;
    width: 4rem;
  }

  .about-cta {
    isolation: isolate;
    overflow: hidden;
    position: relative;
  }

  .about-cta::before {
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

  .about-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .about-cta span {
    position: relative;
    z-index: 1;
  }

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

  @media (max-width: 767px) {
    .about-hero-title {
      max-width: min(100%, 22rem);
    }

    .team-layout {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .team-copy,
    .team-media-column {
      display: contents;
    }

    .team-header {
      order: 1;
    }

    .team-photo-card {
      aspect-ratio: 1.13 / 1;
      margin-top: 0.75rem;
      margin-inline: auto;
      order: 2;
      overflow: hidden;
      width: 100%;
    }

    .team-photo-inner {
      border: 0;
      box-shadow: none !important;
      filter: none !important;
    }

    .team-photo-card img {
      box-shadow: none !important;
      filter: none !important;
      transform: scale(1.08);
    }

    .team-photo-hint--mobile {
      line-height: 1.55;
      margin-top: 0.85rem;
      order: 4;
      overflow: visible;
      padding-bottom: 0;
    }

    .team-photo-tooltip {
      display: none;
    }

    .team-photo-hover {
      bottom: 0.15rem;
      display: none;
      pointer-events: none;
      top: 0.15rem;
    }

    .team-mobile-name-row {
      display: flex;
      gap: 2.75rem;
      justify-content: center;
      margin-top: -0.35rem;
      order: 3;
    }

    .team-health-wrap {
      margin-top: 1.25rem;
      max-width: 28rem;
      order: 5;
      width: 100%;
    }

    .team-actions {
      margin-top: 1.5rem;
      order: 6;
    }
  }

  @media (hover: none) {
    .team-photo-tooltip {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }
  }

  @media (min-width: 768px) {
    .closing-type-title {
      min-height: 11.4rem;
    }

    .team-photo-card {
      aspect-ratio: 1.13 / 1;
      width: 100%;
    }

    .team-photo-card img {
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .about-reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
