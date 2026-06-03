<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import '@fontsource/material-symbols-rounded/300.css';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import MobileMenu from '$lib/components/MobileMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';
  import { setLanguage } from '$lib/i18n/language';
  import { getLanguageFromPath } from '$lib/i18n/routes';

  const ogLocaleByLanguage = {
    es: 'es_ES',
    ca: 'ca_ES',
    en: 'en_GB'
  };

  let mobileMenuOpen = false;
  let scrollProgress = 0;

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  $: urlLanguage = getLanguageFromPath($page.url.pathname);
  $: if (urlLanguage) setLanguage(urlLanguage);
  $: currentLanguage = urlLanguage ?? 'es';
  $: ogLocale = ogLocaleByLanguage[currentLanguage] ?? ogLocaleByLanguage.es;

  onMount(() => {
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  });
</script>

<svelte:head>
  <meta property="og:type" content="website" />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:site_name" content="EIMA Fisioterapia" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content="eimafisioterapia.es" />
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
