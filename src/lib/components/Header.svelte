<script>
  import BrandLogo from '$lib/components/BrandLogo.svelte';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getLanguageFromPath, getRouteKey, getRoutePath } from '$lib/i18n/routes';
  import { getHeaderLinks } from '$lib/i18n/headerLinks';

  export let mobileMenuOpen = false;

  let mounted = false;
  let scrolled = false;

  function updateScrolled() {
    scrolled = window.scrollY > 8;
  }

  /**
   * @param {string} href
   * @param {string} pathname
   */
  function isActive(href, pathname) {
    const homePaths = ['/', '/ca', '/en'];
    if (homePaths.includes(href)) return pathname === href;

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  onMount(() => {
    mounted = true;
    updateScrolled();
  });

  $: pathname = $page.url.pathname;
  $: isBlog = ['/blog', '/ca/blog', '/en/blog'].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  $: routeLanguage = getLanguageFromPath(pathname);
  $: currentLanguage = routeLanguage ?? $language;
  $: copy = getCopy(currentLanguage);
  $: links = getHeaderLinks(currentLanguage);
  $: homeHref = getRoutePath('home', currentLanguage);
  $: whatsappHref = getWhatsAppHref(currentLanguage, pathname === '/');
  $: routeKey = getRouteKey(pathname);
  $: hasDarkHero =
    routeKey === 'home' ||
    routeKey === 'program' ||
    routeKey === 'about' ||
    routeKey === 'contact' ||
    routeKey === 'testimonials' ||
    isBlog;
  $: transparent = mounted && hasDarkHero && !scrolled && !mobileMenuOpen;
  $: isErrorPage = $page.status >= 400;
  $: lightHeader = (transparent || isErrorPage) && !mobileMenuOpen;
  $: solidHeaderClass = routeKey === 'testimonials' ? 'bg-[#F4F8F0]' : 'bg-[#F8F4F0]';
</script>

<svelte:window on:scroll={updateScrolled} />

<header
  class="fixed top-0 z-40 w-full transition-colors duration-300
    {isErrorPage && !mobileMenuOpen ? 'bg-[#233F4E]' : lightHeader ? 'bg-transparent' : solidHeaderClass}"
>
  <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
    <a href={homeHref} aria-label={currentLanguage === 'en' ? 'Home' : currentLanguage === 'ca' ? 'Inici' : 'Inicio'} on:click={() => (mobileMenuOpen = false)} class="ml-1 flex items-center md:ml-2">
      <BrandLogo id="header-logo" light={lightHeader} class="h-9 w-auto md:h-11" />
    </a>

    <nav class="hidden items-center gap-[18px] min-[1100px]:flex min-[1200px]:gap-8">
      {#each links as link (link.href)}
        <a
          href={link.href}
          aria-current={isActive(link.href, pathname) ? 'page' : undefined}
          class="relative text-[16px] transition-[color,font-weight,text-shadow] duration-300 ease-out after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-[transform,box-shadow] after:duration-300 after:ease-out hover:font-bold hover:after:scale-x-100
            {isActive(link.href, pathname)
              ? lightHeader
                ? 'font-bold text-white after:scale-x-100'
                : 'font-bold text-[color:var(--color-brand)] after:scale-x-100'
              : lightHeader
                ? 'font-light text-white/90 hover:text-white'
                : 'font-light text-[color:var(--color-brand-soft)] hover:text-[color:var(--color-brand)]'}"
          class:header-link--light={lightHeader}
        >
          {link.label}
        </a>
      {/each}

      <LanguageSelector light={lightHeader} />

      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.nav.contact} ariaLabel={`${copy.nav.contact} — WhatsApp`} />
    </nav>

    <button
      aria-controls="mobile-menu"
      aria-label={copy.nav.menuLabel}
      aria-expanded={mobileMenuOpen}
      class="transition-opacity hover:opacity-70 min-[1100px]:hidden"
      on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
    >
      <span class="relative block h-6 w-6" aria-hidden="true">
        <span
          class="absolute left-0 right-0 top-1 block h-[2px] rounded transition-transform duration-200
            {lightHeader ? 'bg-white' : 'bg-[color:var(--color-brand)]'}"
          class:translate-y-[7px]={mobileMenuOpen}
          class:rotate-45={mobileMenuOpen}
        ></span>
        <span
          class="absolute left-0 right-0 top-1/2 block h-[2px] -translate-y-1/2 rounded transition-opacity duration-200
            {lightHeader ? 'bg-white' : 'bg-[color:var(--color-brand)]'}"
          class:opacity-0={mobileMenuOpen}
        ></span>
        <span
          class="absolute bottom-1 left-0 right-0 block h-[2px] rounded transition-transform duration-200
            {lightHeader ? 'bg-white' : 'bg-[color:var(--color-brand)]'}"
          class:-translate-y-[7px]={mobileMenuOpen}
          class:-rotate-45={mobileMenuOpen}
        ></span>
      </span>
    </button>
  </div>
</header>

<style>
  .header-link--light {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.48), 0 3px 8px rgba(0, 0, 0, 0.28);
  }

  .header-link--light::after {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.25);
  }
</style>
