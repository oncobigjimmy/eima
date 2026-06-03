<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getLanguageFromPath, getRouteKey, getRoutePath } from '$lib/i18n/routes';

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
  $: isBlog = pathname === '/blog' || pathname.startsWith('/blog/');
  $: routeLanguage = getLanguageFromPath(pathname);
  $: currentLanguage = isBlog ? 'es' : (routeLanguage ?? $language);
  $: copy = getCopy(currentLanguage);
  $: links = copy.nav.links;
  $: homeHref = getRoutePath('home', currentLanguage);
  $: whatsappHref = getWhatsAppHref(currentLanguage);
  $: routeKey = getRouteKey(pathname);
  $: hasDarkHero =
    routeKey === 'home' ||
    routeKey === 'program' ||
    routeKey === 'about' ||
    routeKey === 'contact' ||
    pathname === '/blog' ||
    pathname.startsWith('/blog/');
  $: transparent = mounted && hasDarkHero && !scrolled && !mobileMenuOpen;
  $: lightHeader = transparent;
</script>

<svelte:window on:scroll={updateScrolled} />

<header
  class="fixed top-0 z-40 w-full transition-colors duration-300
    {lightHeader ? 'bg-transparent' : 'bg-[#F8F4F0]'}"
>
  <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
    <a href={homeHref} aria-label="Inicio" class="flex items-center">
      <img
        src={lightHeader ? '/eima-logo.png' : '/eima-logo-white.png'}
        alt="EIMA Fisioterapia"
        class="h-10 w-auto md:h-12"
      />
    </a>

    <nav class="hidden items-center gap-7 lg:flex">
      {#each links as link (link.href)}
        <a
          href={link.href}
          aria-current={isActive(link.href, pathname) ? 'page' : undefined}
          class="relative text-[15px] transition-[color,font-weight] duration-300 ease-out after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:font-bold hover:after:scale-x-100
            {isActive(link.href, pathname)
              ? lightHeader
                ? 'font-bold text-white after:scale-x-100'
                : 'font-bold text-[color:var(--color-brand)] after:scale-x-100'
              : lightHeader
                ? 'font-light text-white/90 hover:text-white'
                : 'font-light text-[color:var(--color-brand-soft)] hover:text-[color:var(--color-brand)]'}"
        >
          {link.label}
        </a>
      {/each}

      <LanguageSelector light={lightHeader} />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        class="header-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-light transition-[background-color,color,transform,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03]
          {lightHeader
            ? 'border border-white/60 text-white hover:bg-white/10 hover:font-bold'
            : 'bg-[color:var(--color-brand-accent)] text-[color:var(--color-brand)] hover:bg-[#4083A7] hover:text-white hover:font-bold hover:shadow-[0_10px_24px_rgba(64,131,167,0.28)]'}"
        aria-label="Contactar por WhatsApp"
      >
        <svg class="h-4 w-4" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.5 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4-.1 101.8-82.9 184.7-184.5 184.7zm101.2-138.1c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.8 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.5z" />
        </svg>
        <span>{copy.nav.contact}</span>
      </a>
    </nav>

    <button
      aria-label={copy.nav.menuLabel}
      aria-expanded={mobileMenuOpen}
      class="transition-opacity hover:opacity-70 lg:hidden"
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
  .header-cta {
    overflow: hidden;
    position: relative;
  }

  .header-cta::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(-180%) skewX(-18deg);
    transition: transform 420ms ease-out;
    width: 44%;
  }

  .header-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .header-cta :global(svg),
  .header-cta :global(span) {
    position: relative;
    z-index: 1;
  }
</style>
