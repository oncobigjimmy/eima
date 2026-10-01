<script>
  import { page } from '$app/stores';
  import { language } from '$lib/i18n/language';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { getLanguageFromPath, getRoutePath } from '$lib/i18n/routes';

  const messages = {
    es: { missing: 'Página no encontrada', error: 'Ha ocurrido un error', missingDescription: 'La página que buscas no existe o ha sido movida.', errorDescription: 'Algo ha salido mal. Inténtalo de nuevo o vuelve al inicio.', home: 'Volver al inicio', contact: 'Contactar' },
    ca: { missing: 'Pàgina no trobada', error: 'Hi ha hagut un error', missingDescription: 'La pàgina que cerques no existeix o ha estat moguda.', errorDescription: 'Alguna cosa ha fallat. Torna-ho a provar o torna a l’inici.', home: 'Torna a l’inici', contact: 'Contacta' },
    en: { missing: 'Page not found', error: 'An error occurred', missingDescription: 'The page you are looking for does not exist or has been moved.', errorDescription: 'Something went wrong. Try again or return to the homepage.', home: 'Back to home', contact: 'Contact us' }
  };
  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? 'es';
  $: copy = messages[pageLanguage];

  $: title = $page.status === 404 ? copy.missing : copy.error;
  $: whatsappHref = getWhatsAppHref(pageLanguage);
</script>

<svelte:head>
  <title>{title} ({$page.status}) — Eima Salut</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="error-page" lang={pageLanguage}>
  <div class="error-content">
  <p class="error-code">{$page.status}</p>
  <h1>{title}</h1>
  <p class="error-description">
    {$page.status === 404
      ? copy.missingDescription
      : copy.errorDescription}
  </p>

  <div class="error-actions">
    <PrimaryCta href={getRoutePath('home', pageLanguage)} label={copy.home} class="error-home" />
    <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.contact} />
  </div>
  </div>
</section>

<style>
  .error-page { background: #233f4e; color: white; min-height: 74vh; padding: 8rem 1.5rem 5rem; display: grid; place-items: center; text-align: center; }
  .error-content { width: min(100%, 52rem); }
  .error-code, h1, .error-description { color: white; text-shadow: 0 2px 4px #00000070, 0 6px 18px #00000050; }
  .error-code { font-family: 'Fraunces', Georgia, serif; font-size: clamp(5rem, 12vw, 8rem); font-weight: 500; line-height: 1; }
  h1 { margin-top: 1.5rem; font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2rem, 5vw, 2.5rem); font-weight: 600; line-height: 1.15; }
  .error-description { margin: 1rem auto 0; max-width: 32rem; font-family: 'Inter', Arial, sans-serif; font-size: 18px; line-height: 1.65; }
  .error-actions { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 2rem; margin-top: 2.5rem; }
  .error-actions :global(.primary-cta.error-home:hover), .error-actions :global(.primary-cta.error-home:focus-visible) { background: white; color: #233f4e; }
  @media (max-width: 639px) { .error-page { padding-top: 7rem; } .error-actions { flex-direction: column; } }
</style>
