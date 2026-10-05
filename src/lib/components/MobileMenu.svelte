<script>
  import { page } from '$app/stores';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getLanguageFromPath } from '$lib/i18n/routes';
  import { getHeaderLinks } from '$lib/i18n/headerLinks';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { dialog } from '$lib/actions/dialog';

  export let mobileMenuOpen = false;
  export let onClose = () => {};

  /** @param {string} path */
  function normalizePath(path) {
    let decoded = path;
    try { decoded = decodeURIComponent(path); } catch { /* Keep malformed error routes safe. */ }
    const normalized = decoded.replace(/\/+$/, '');
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
  $: isBlog = ['/blog', '/ca/blog', '/en/blog'].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  $: routeLanguage = getLanguageFromPath(pathname);
  $: currentLanguage = routeLanguage ?? $language;
  $: copy = getCopy(currentLanguage);
  $: links = getHeaderLinks(currentLanguage);
  $: whatsappHref = getWhatsAppHref(currentLanguage, pathname === '/');
</script>

<div
  id="mobile-menu"
  use:dialog={{ active: mobileMenuOpen, close: onClose, include: 'header' }}
  inert={!mobileMenuOpen}
  tabindex="-1"
  class="mobile-menu fixed inset-0 z-30"
  class:mobile-menu--open={mobileMenuOpen}
  role="dialog"
  aria-modal="true"
  aria-label={copy.nav.menuLabel}
  aria-hidden={!mobileMenuOpen}
>
  <div class="menu-layer menu-layer--first" aria-hidden="true"></div>
  <div class="menu-layer menu-layer--second" aria-hidden="true"></div>
  <div class="menu-panel absolute inset-0 overflow-y-auto overscroll-contain bg-[#233F4E]">
  <nav class="mt-24 mb-10 flex flex-col gap-2 px-8">
    {#each links as link, index (link.href)}
      <a
        href={link.href}
        aria-current={isActive($page.url.pathname, link.href) ? 'page' : undefined}
        class="menu-link border-b border-white/20 py-2 text-xl text-white
          {isActive($page.url.pathname, link.href)
            ? 'font-bold'
            : 'font-light'}"
        style={`--menu-link-delay: ${320 + index * 45}ms`}
        on:click={onClose}
      >
        {link.label}
      </a>
    {/each}

    <div class="menu-controls mt-5 flex justify-center">
      <LanguageSelector compact light onSelect={onClose} />
    </div>

    <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.nav.contact} onClick={onClose} class="mt-6 self-center" />
  </nav>
  </div>
</div>

<style>
  .mobile-menu { pointer-events: none; visibility: hidden; transition: visibility 0s 620ms; }
  .mobile-menu--open { pointer-events: auto; visibility: visible; transition-delay: 0s; }
  .menu-layer { position: absolute; inset: 0; }
  .menu-layer--first { background: #8cd0d6; }
  .menu-layer--second { background: #245b7d; }
  .menu-layer, .menu-panel { transform: translateX(100%); transition: transform 460ms cubic-bezier(.625,.05,0,1); }
  .menu-layer--first { transition-delay: 160ms; }
  .menu-layer--second { transition-delay: 80ms; }
  .mobile-menu--open .menu-layer, .mobile-menu--open .menu-panel { transform: translateX(0); }
  .mobile-menu--open .menu-layer--first { transition-delay: 0ms; }
  .mobile-menu--open .menu-layer--second { transition-delay: 80ms; }
  .mobile-menu--open .menu-panel { transition-delay: 160ms; }
  .menu-link, .menu-controls { opacity: 0; transform: translateY(18px); transition: opacity 180ms ease, transform 180ms ease; }
  .mobile-menu--open .menu-link, .mobile-menu--open .menu-controls { opacity: 1; transform: none; transition-duration: 360ms; transition-delay: var(--menu-link-delay, 560ms); }
  @media (prefers-reduced-motion: reduce) {
    .mobile-menu, .menu-layer, .menu-panel, .menu-link, .menu-controls { transition: none; }
  }
</style>
