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
  class={`fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-[#F8F4F0] transform transition-transform duration-250 ease-in-out
    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
  role="dialog"
  aria-modal="true"
  aria-label={copy.nav.menuLabel}
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

    <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.nav.contact} onClick={onClose} class="mt-6 self-center" />
  </nav>
</div>
