<script>
  import { page } from '$app/stores';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getLanguageFromPath } from '$lib/i18n/routes';

  export let mobileMenuOpen = false;
  export let onClose = () => {};

  /** @param {string} path */
  function normalizePath(path) {
    const normalized = decodeURIComponent(path).replace(/\/+$/, '');
    return normalized === '' ? '/' : normalized;
  }

  /**
   * @param {string} currentPath
   * @param {string} href
   */
  function isActive(currentPath, href) {
    const pathname = normalizePath(currentPath);
    const target = normalizePath(href);
    const homePaths = ['/', '/ca', '/en'];
    if (homePaths.includes(target)) return pathname === target;

    return pathname === target || pathname.startsWith(`${target}/`);
  }

  $: pathname = $page.url.pathname;
  $: isBlog = pathname === '/blog' || pathname.startsWith('/blog/');
  $: routeLanguage = getLanguageFromPath(pathname);
  $: currentLanguage = isBlog ? 'es' : (routeLanguage ?? $language);
  $: copy = getCopy(currentLanguage);
  $: links = copy.nav.links;
  $: whatsappHref = getWhatsAppHref(currentLanguage);
</script>

<div
  class={`fixed inset-0 z-30 bg-[#F8F4F0] transform transition-transform duration-250 ease-in-out
    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
  role="dialog"
  aria-modal="true"
  aria-hidden={!mobileMenuOpen}
>
  <nav class="mt-24 mb-10 flex flex-col gap-2 px-8">
    {#each links as link (link.href)}
      <a
        href={link.href}
        aria-current={isActive($page.url.pathname, link.href) ? 'page' : undefined}
        class="border-b border-[#ece3d8] py-2 text-xl transition-[color,font-weight]
          {isActive($page.url.pathname, link.href)
            ? 'font-bold text-[color:var(--color-brand)]'
            : 'font-light text-[color:var(--color-brand-soft)]'}"
        on:click={onClose}
      >
        {link.label}
      </a>
    {/each}

    <div class="mt-5 flex justify-center">
      <LanguageSelector compact onSelect={onClose} />
    </div>

    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      class="mobile-menu-cta mt-6 inline-flex w-fit self-center items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand-accent)] px-6 py-3 font-light text-[color:var(--color-brand)] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-[#4083A7] hover:text-white hover:font-bold hover:shadow-[0_10px_24px_rgba(64,131,167,0.28)]"
      on:click={onClose}
    >
      <svg class="h-4 w-4" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.5 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4-.1 101.8-82.9 184.7-184.5 184.7zm101.2-138.1c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.8 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.5z" />
      </svg>
      {copy.nav.contact}
    </a>
  </nav>
</div>

<style>
  .mobile-menu-cta {
    overflow: hidden;
    position: relative;
  }

  .mobile-menu-cta::before {
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

  .mobile-menu-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .mobile-menu-cta :global(svg) {
    position: relative;
    z-index: 1;
  }
</style>




