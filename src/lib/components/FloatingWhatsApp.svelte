<script>
  import { selectedSituation } from '$lib/data/situation';
  import { page } from '$app/stores';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';

  $: pathname = $page.url.pathname;
  $: isBlog = pathname === '/blog' || pathname.startsWith('/blog/');
  $: currentLanguage = $language;
  $: whatsappHref = getWhatsAppHref(currentLanguage, pathname === '/', $selectedSituation);
  $: whatsappLabel =
    currentLanguage === 'en'
      ? 'Open WhatsApp'
      : currentLanguage === 'ca'
        ? 'Obrir WhatsApp'
        : 'Abrir WhatsApp';

  let hidden = true;
  let expanded = false;
  let requestBarCheck = () => {};
  // TODO [CA-revisar]: revisar el text de la barra de WhatsApp.
  $: barCopy = currentLanguage === 'ca' ? ['Tens dubtes?', ' Escriu-nos'] : currentLanguage === 'en' ? ['Questions?', ' Write to us'] : ['¿Tienes dudas?', ' Escríbenos'];
  /** @param {HTMLElement} node @param {string} route */
  function sessionBar(node, route) {
    let used = false, frame = 0, peak = 0;
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let closeTimer;
    function showBar() {
      expanded = true;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => { expanded = false; }, 3000);
    }
    function check() {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return;
      const position = Math.max(0, Math.min(1, window.scrollY / available));
      peak = Math.max(peak, position);
      if (!used && position >= .5) { used = true; showBar(); }
      if (peak - position >= .2) { peak = position; showBar(); }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    const reset = () => { used = false; peak = 0; expanded = false; clearTimeout(closeTimer); schedule(); };
    requestBarCheck = schedule;
    window.addEventListener('scroll', schedule, { passive: true });
    reset();
    return { update(nextRoute = route) { if (nextRoute !== route) { route = nextRoute; reset(); } }, destroy() { requestBarCheck = () => {}; window.removeEventListener('scroll', schedule); cancelAnimationFrame(frame); clearTimeout(closeTimer); } };
  }
  /** @param {HTMLElement} node @param {string} _route */
  function avoidControls(node, _route) {
    const blocked = new Set();
    let observed = new Set();
    let frame = 0;
    let ready = false;
    const collisionSelector = 'button, input, select, textarea, [role="dialog"], a[href*="wa.me"], a[href*="api.whatsapp.com"]';
    const check = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const x = rect.right - rect.height / 2, y = rect.top + rect.height / 2;
      const covered = document.elementsFromPoint(x, y).some(element => !node.contains(element) && element !== node && !!element.closest(collisionSelector));
      const wasHidden = hidden;
      hidden = !ready || blocked.size > 0 || covered;
      if (wasHidden && !hidden) requestBarCheck();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    const observer = new IntersectionObserver(entries => {
      ready = true;
      for (const entry of entries) {
        if (entry.isIntersecting) blocked.add(entry.target);
        else blocked.delete(entry.target);
      }
      schedule();
    }, { threshold: [0, .5] });
    const refresh = () => {
      const heading = document.querySelector('main h1');
      const hero = heading?.closest('section') ?? heading?.parentElement;
      const targets = new Set(document.querySelectorAll('footer'));
      if (hero) targets.add(hero);
      for (const target of targets) if (node.contains(target)) targets.delete(target);
      for (const target of observed) if (!targets.has(target)) { observer.unobserve(target); blocked.delete(target); }
      for (const target of targets) if (!observed.has(target)) observer.observe(target);
      observed = targets;
      schedule();
    };
    const changes = new MutationObserver(refresh);
    changes.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    refresh();
    return { update() { hidden = true; ready = false; observer.disconnect(); blocked.clear(); observed.clear(); refresh(); }, destroy() { observer.disconnect(); changes.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); } };
  }
</script>

<div class="floating-whatsapp" class:is-hidden={hidden && !expanded} class:expanded use:avoidControls={pathname} use:sessionBar={pathname} aria-hidden={hidden && !expanded}>
  <a class="wa-bar-link" href={whatsappHref} target="_blank" rel="noopener noreferrer" tabindex={!expanded ? -1 : 0} aria-hidden={!expanded}><strong>{barCopy[0]}</strong><span>{barCopy[1]}</span></a>
  <a class="wa-icon-link" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={whatsappLabel} tabindex={hidden && !expanded ? -1 : 0}>
  <svg class="h-9 w-9" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
    <path
      d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.5 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4-.1 101.8-82.9 184.7-184.5 184.7zm101.2-138.1c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.8 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.5z"
    />
  </svg>
  </a>
</div>

<style>
  .floating-whatsapp { position: fixed; z-index: 50; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom)); width: 56px; height: 56px; overflow: hidden; border-radius: 999px; background: #25d366; color: #fff; box-shadow: 0 10px 24px rgba(14,29,38,.22); opacity: 1; transform: scale(1); transition: width 450ms var(--ease-calma), opacity 200ms var(--ease-calma), transform 200ms var(--ease-calma); }
  .floating-whatsapp.expanded { width: min(calc(100vw - 32px), 420px); }
  @media (min-width: 1024px) { .floating-whatsapp.expanded { width: min(calc(100vw - 32px), 350px); } .wa-bar-link { font-size: 16px; padding-left: 8px; padding-right: 8px; } }
  .floating-whatsapp.is-hidden { opacity: 0; transform: scale(.9); pointer-events: none; }
  .wa-icon-link { position: absolute; right: 0; top: 0; width: 56px; height: 56px; display: grid; place-items: center; }
  .wa-icon-link svg { width: 30px; height: 30px; }
  .wa-bar-link { position: absolute; inset: 0 56px 0 0; display: flex; align-items: center; justify-content: center; gap: .3em; text-align: center; padding: 0 8px; font: 400 15px/1.3 Inter, sans-serif; white-space: nowrap; }
  .wa-bar-link, .wa-bar-link strong, .wa-bar-link span { color: #fff; }
  .wa-bar-link { opacity: 0; visibility: hidden; transition: opacity 200ms var(--ease-calma), visibility 200ms; }
  @media (max-width: 767px) { .wa-bar-link { padding-left: 8px; padding-right: 8px; } }
  .wa-bar-link strong { font-weight: 700; }
  .wa-bar-link span { font-weight: 400; }
  .expanded .wa-bar-link { opacity: 1; visibility: visible; transition-delay: 200ms; }
  .floating-whatsapp a:focus-visible { outline: 2px solid #fff; outline-offset: -4px; border-radius: 999px; }
  @media (prefers-reduced-motion: reduce) { .floating-whatsapp, .wa-bar-link, .expanded .wa-bar-link { transition: none; transform: none; } }
</style>
