<script>
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import AudienceSection from '$lib/components/sections/AudienceSection.svelte';
  import CommonSituationsSection from '$lib/components/sections/CommonSituationsSection.svelte';
  import ValuePropsSection from '$lib/components/sections/ValuePropsSection.svelte';
  import RecoveryGoalsSection from '$lib/components/sections/RecoveryGoalsSection.svelte';
  import ParallaxSloganSection from '$lib/components/sections/ParallaxSloganSection.svelte';
  import { getCopy } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';

  $: homeCopy = getCopy($language).home;
  $: meta = homeCopy.meta;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta
    name="description"
    content={meta.description}
  />

  <link rel="canonical" href="https://eimafisioterapia.es/" />
  <link rel="alternate" hreflang="es-ES" href="https://eimafisioterapia.es/" />
  <link rel="alternate" hreflang="es" href="https://eimafisioterapia.es/" />
  <link rel="alternate" hreflang="x-default" href="https://eimafisioterapia.es/" />

  <meta property="og:title" content={meta.ogTitle} />
  <meta
    property="og:description"
    content={meta.ogDescription}
  />
  <meta property="og:url" content="https://eimafisioterapia.es/" />
  <meta property="og:image" content="https://eimafisioterapia.es/og-image.png" />
  <meta property="og:image:alt" content={meta.imageAlt} />
  <meta name="twitter:title" content={meta.ogTitle} />
  <meta
    name="twitter:description"
    content={meta.ogDescription}
  />
  <meta name="twitter:image" content="https://eimafisioterapia.es/og-image.png" />
</svelte:head>

{#key $language}
  <HeroSection />
  <AudienceSection />
  <CommonSituationsSection />
  <RecoveryGoalsSection />
  <ParallaxSloganSection
    image="/Gemini_Generated_Image_8crr28crr28crr28-100.png"
    topHtml={homeCopy.slogan.topHtml}
    middleHtml={homeCopy.slogan.middleHtml}
    bottomHtml={homeCopy.slogan.bottomHtml}
    mobileTopSize={16}
    desktopTopSize={22}
    mobileMiddleSize={16}
    desktopMiddleSize={22}
    mobileBottomSize={17}
    desktopBottomSize={33}
    lineGap={20}
  />
  <ValuePropsSection />
{/key}
