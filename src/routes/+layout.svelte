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
  import PageLoader from '$lib/components/PageLoader.svelte';
  import { setLanguage } from '$lib/i18n/language';
  import { getLanguageFromPath, getRouteKey } from '$lib/i18n/routes';
  import { getBlogPostId } from '$lib/i18n/blog-routes';
  import { getSiteSchema, languageLocales, serializeJsonLd } from '$lib/seo';

  const ogLocaleByLanguage = languageLocales;

  let mobileMenuOpen = false;
  let scrollProgress = 0;
  let scrollThumbRatio = 1;

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
      scrollThumbRatio = Math.min(1, Math.max(.035, window.innerHeight / document.documentElement.scrollHeight));
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

<PageLoader />
<div class="min-h-screen bg-default text-primary">
  <div class="scroll-progress" style={`--scroll-progress: ${scrollProgress}`} aria-hidden="true"></div>
  <div class="mobile-scroll-rail" class:mobile-scroll-rail--visible={scrollProgress > 0 && scrollThumbRatio < 1 && !mobileMenuOpen} aria-hidden="true">
    <div class="mobile-scroll-track"><span style={`height: ${scrollThumbRatio * 100}%; top: ${scrollProgress * (1 - scrollThumbRatio) * 100}%`}></span></div>
  </div>
  <Header bind:mobileMenuOpen />
  <MobileMenu {mobileMenuOpen} onClose={closeMobileMenu} />

  <main>
    <slot />
  </main>

  <Footer />
  <FloatingWhatsApp />
</div>

<style>
  .mobile-scroll-rail { display: none; }
  @media (max-width: 767px) {
    .mobile-scroll-rail { display: block; position: fixed; right: 0; top: 0; bottom: 0; width: 6px; background: #f8f4f0; pointer-events: none; opacity: 0; z-index: 70; }
    .mobile-scroll-rail--visible { opacity: 1; }
    .mobile-scroll-track { position: absolute; inset: 10px 1px; }
    .mobile-scroll-track span { position: absolute; right: 0; width: 4px; background: #233f4e; border-radius: 999px; }
    .mobile-scroll-rail::before, .mobile-scroll-rail::after { content: ''; position: absolute; left: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; }
    .mobile-scroll-rail::before { top: 2px; border-bottom: 4px solid #233f4e; }
    .mobile-scroll-rail::after { bottom: 2px; border-top: 4px solid #233f4e; }
  }
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
