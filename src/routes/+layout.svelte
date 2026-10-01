<script>
  import { site } from '$lib/site';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import '@fontsource/material-symbols-rounded/300.css';
  import interLightFont from '@fontsource/inter/files/inter-latin-300-normal.woff2?url';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import MobileMenu from '$lib/components/MobileMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';
  import { setLanguage } from '$lib/i18n/language';
  import { getLanguageFromPath, getRouteKey } from '$lib/i18n/routes';
  import { getBlogPostId } from '$lib/i18n/blog-routes';
  import { getSiteSchema, languageLocales, serializeJsonLd } from '$lib/seo';

  const ogLocaleByLanguage = languageLocales;

  let mobileMenuOpen = false;
  let scrollProgress = 0;

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
  afterNavigate(closeMobileMenu);

  $: urlLanguage = getLanguageFromPath($page.url.pathname);
  $: if (urlLanguage) setLanguage(urlLanguage);
  $: currentLanguage = urlLanguage ?? 'es';
  $: ogLocale = ogLocaleByLanguage[currentLanguage] ?? ogLocaleByLanguage.es;
  $: isArticle = Boolean(getBlogPostId($page.url.pathname));
  $: hasAlternates = isArticle || Boolean(getRouteKey($page.url.pathname));
  $: schemaHtml = $page.status >= 400 ? '' : `<script type="application/ld+json">${serializeJsonLd(getSiteSchema($page.url.pathname, currentLanguage))}<\/script>`;

  onMount(() => {
    const desktop = window.matchMedia('(min-width: 1100px)');
    const closeOnDesktop = () => { if (desktop.matches) closeMobileMenu(); };
    desktop.addEventListener('change', closeOnDesktop);
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      desktop.removeEventListener('change', closeOnDesktop);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  });
</script>

<svelte:head>
  <link rel="preload" href={interLightFont} as="font" type="font/woff2" crossorigin="anonymous" />
  <meta property="og:type" content={isArticle ? 'article' : 'website'} />
  <meta property="og:locale" content={ogLocale} />
  {#each hasAlternates ? Object.values(languageLocales).filter(locale => locale !== ogLocale) : [] as locale}
    <meta property="og:locale:alternate" content={locale} />
  {/each}
  <meta property="og:site_name" content={site.seoName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content={`${site.domain}`} />
  {#if !isArticle}
    <meta property="og:image:width" content="1080" />
    <meta property="og:image:height" content="631" />
    <meta name="twitter:image:alt" content={`${currentLanguage === 'en' ? 'Jaume and Miquel' : currentLanguage === 'ca' ? 'Jaume i Miquel' : 'Jaume y Miquel'} — Eima Salut`} />
  {/if}
  {@html schemaHtml}
</svelte:head>

<div class="min-h-screen bg-default text-primary">
  <div class="scroll-progress" style={`--scroll-progress: ${scrollProgress}`} aria-hidden="true"></div>
  <Header bind:mobileMenuOpen />
  <MobileMenu {mobileMenuOpen} onClose={closeMobileMenu} />

  <main>
    <slot />
  </main>

  <Footer />
  <FloatingWhatsApp />
</div>

<style>
  .scroll-progress {
    background: #8cd0d6;
    height: 3px;
    left: 0;
    pointer-events: none;
    position: fixed;
    right: 0;
    top: 0;
    transform: scaleX(var(--scroll-progress, 0));
    transform-origin: left center;
    transition: transform 80ms linear;
    z-index: 80;
  }

  @media (min-width: 768px) {
    .scroll-progress {
      height: 4px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-progress {
      transition: none;
    }
  }
</style>
