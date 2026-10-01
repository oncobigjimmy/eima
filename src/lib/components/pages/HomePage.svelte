<script>
  import { site } from '$lib/site';
  import { page } from '$app/stores';
  import HomeReviewSections from '$lib/components/sections/HomeReviewSections.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import ValuePropsSection from '$lib/components/sections/ValuePropsSection.svelte';
  import ParallaxSloganSection from '$lib/components/sections/ParallaxSloganSection.svelte';
  import { getCopy } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getAbsoluteUrl, getAlternateLinks, getLanguageFromPath, getLocalizedPath } from '$lib/i18n/routes';

  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? $language;
  $: homeCopy = getCopy(pageLanguage).home;
  $: meta = homeCopy.meta;
  $: canonicalUrl = getAbsoluteUrl(getLocalizedPath($page.url.pathname, pageLanguage));
  $: alternateLinks = getAlternateLinks('home');
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

{#key pageLanguage}
  <div class="home-es-rhythm">
  <HeroSection />
  <HomeReviewSections pageLanguage={pageLanguage} />
  <ParallaxSloganSection
    image="/Gemini_Generated_Image_8crr28crr28crr28-100.png"
    topHtml={homeCopy.slogan.topHtml}
    middleHtml={homeCopy.slogan.middleHtml}
    bottomHtml={homeCopy.slogan.bottomHtml}
    mobileTopSize={16}
    desktopTopSize={24}
    mobileMiddleSize={16}
    desktopMiddleSize={24}
    mobileBottomSize={17}
    desktopBottomSize={33}
    lineGap={20}
    sectionClass="home-banner-section"
  />
  <ValuePropsSection />
  </div>
{/key}

<style>
  .home-es-rhythm {
    --home-section-start: clamp(2.75rem, 5vw, 4.75rem);
    --home-section-end: clamp(3rem, 5vw, 4.75rem);
  }
</style>
