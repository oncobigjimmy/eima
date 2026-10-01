<script>
  import BrandLogo from '$lib/components/BrandLogo.svelte';
  import { site } from '$lib/site';
  import { page } from '$app/stores';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getLanguageFromPath } from '$lib/i18n/routes';
  import { getHeaderLinks } from '$lib/i18n/headerLinks';

  const year = new Date().getFullYear();

  $: pathname = $page.url.pathname;
  $: isBlog = ['/blog', '/ca/blog', '/en/blog'].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  $: routeLanguage = getLanguageFromPath(pathname);
  $: currentLanguage = routeLanguage ?? $language;
  $: copy = getCopy(currentLanguage);
  $: pageLinks = getHeaderLinks(currentLanguage);
  $: legalLinks = copy.footer.legalLinks;
  $: whatsappHref = getWhatsAppHref(currentLanguage, pathname === '/');
  $: brandName = site.name;
</script>

<footer class="footer bg-dark text-[color:var(--color-inverse)]">
  <div
    class="footer-main-grid mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4 md:gap-0 md:px-10"
  >
    <div class="flex flex-col items-center justify-center border-b border-white/14 pb-8 md:items-start md:border-b-0 md:border-r md:border-white/18 md:pb-0 md:pr-6">
      <BrandLogo id="footer-logo" light class="h-20 w-auto md:h-24" />
    </div>

    <div
      class="footer-contact-column flex flex-col items-center justify-center gap-4 border-b border-white/14 pb-8 text-center md:border-b-0 md:border-r md:border-white/18 md:px-6 md:pb-0"
    >
      <p class="footer-heading text-[24px] font-medium tracking-[0.02em]">{copy.footer.contact}</p>
      <div class="footer-social-grid">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          class="footer-social relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10"
        >
          <span class="footer-social-tooltip">WhatsApp</span>
          <svg class="h-5 w-5" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
            <path
              d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.5 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4-.1 101.8-82.9 184.7-184.5 184.7zm101.2-138.1c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.8 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.5z"
            />
          </svg>
        </a>

        <a
          href={site.phoneHref}
          aria-label="Llamar"
          class="footer-social relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10"
        >
          <span class="footer-social-tooltip">{copy.footer.phone}</span>
          <span class="material-symbols-rounded !text-[18px]">call</span>
        </a>
        <a
          href={`mailto:${site.email}`}
          aria-label="Email"
          class="footer-social relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10"
        >
          <span class="footer-social-tooltip">Email</span>
          <span class="material-symbols-rounded !text-[18px]">mail</span>
        </a>
        <a
          href={site.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          class="footer-social relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10"
        >
          <span class="footer-social-tooltip">Instagram</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        </a>
        <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" class="footer-social relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10" aria-label="Facebook">
          <span class="footer-social-tooltip">Facebook</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.77-3.89 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" /></svg>
        </a>
        <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" class="footer-social relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10" aria-label="YouTube">
          <span class="footer-social-tooltip">YouTube</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" /></svg>
        </a>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center border-b border-white/14 text-center pb-8 md:border-b-0 md:border-r md:border-white/18 md:px-6 md:pb-0"
    >
      <p class="footer-heading mb-4 text-[24px] font-medium">{copy.footer.pageMenu}</p>
      <ul class="footer-page-links text-sm font-light opacity-90">
        {#each pageLinks as link (link.href)}
          <li>
            <a href={link.href} class="transition-opacity hover:opacity-70">{link.label}</a>
          </li>
        {/each}
      </ul>
    </div>

    <div class="flex flex-col items-center justify-center text-center md:px-6">
      <p class="footer-heading mb-4 text-[24px] font-medium">{copy.footer.legalPages}</p>
      <ul class="space-y-2 text-sm font-light opacity-90">
        {#each legalLinks as link (link.href)}
          <li>
            <a href={link.href} class="transition-opacity hover:opacity-70">{link.label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="border-t border-white/10">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-center text-xs opacity-70 md:flex-row md:px-10"
    >
      <p>{copy.footer.copyrightPrefix} {year} {brandName}</p>
      <p class="inline-flex items-center justify-center gap-1.5">
        <span>{copy.footer.madeInBefore}</span>
        <img src="/heart-poker.png" alt={copy.footer.heartAlt} class="h-3.5 w-3.5" />
        <span>{copy.footer.madeInAfter}</span>
      </p>
    </div>
  </div>
</footer>

<style>
  .footer { text-shadow: 0 1px 3px #0005, 0 3px 10px #0002; }
  .footer-heading { font-family: 'Playfair Display', Georgia, serif; }
  @media (min-width: 1024px) { .footer-contact-column { padding-top: 12px; } }
  .footer-page-links { display: grid; grid-auto-flow: column; grid-template-columns: repeat(2, max-content); grid-template-rows: repeat(3, auto); gap: .5rem 1rem; width: max-content; }
  @media (min-width: 768px) and (max-width: 1023px) {
    .footer-main-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 2.5rem; }
    .footer-main-grid > div:nth-child(2) { border-right: 0; }
  }
  .footer-social-grid { display: grid; grid-template-columns: repeat(3, 2.5rem); gap: .5rem; }
  .footer-social { width: 2.5rem; height: 2.5rem; }
  .footer-social svg { width: 18px; height: 18px; }
  .footer-social-tooltip {
    background: rgba(24, 24, 27, 0.92);
    border-radius: 6px;
    color: #fff;
    font-size: 12px;
    left: 50%;
    opacity: 0;
    padding: 0.35rem 0.5rem;
    pointer-events: none;
    position: absolute;
    top: -0.55rem;
    transform: translate(-50%, -100%) scale(0.96);
    transform-origin: bottom center;
    transition:
      opacity 180ms ease-out,
      transform 180ms ease-out;
    white-space: nowrap;
    z-index: 3;
  }

  .footer-social-tooltip::after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(24, 24, 27, 0.92);
    content: '';
    left: 50%;
    position: absolute;
    top: 100%;
    transform: translateX(-50%);
  }

  .footer-social:hover .footer-social-tooltip,
  .footer-social:focus-visible .footer-social-tooltip {
    opacity: 1;
    transform: translate(-50%, -100%) scale(1);
  }
  
  @media (hover: none) {
    .footer-social-tooltip {
      display: none;
    }
  }
</style>




