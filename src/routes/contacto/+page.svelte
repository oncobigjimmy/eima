<script>
  import { page } from '$app/stores';
  import ContactFormSection from '$lib/components/sections/ContactFormSection.svelte';
  import { getContactCopy } from '$lib/i18n/contact';
  import { language } from '$lib/i18n/language';
  import { getAbsoluteUrl, getAlternateLinks, getLanguageFromPath, getLocalizedPath } from '$lib/i18n/routes';

  export let form;

  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? $language;
  $: meta = getContactCopy(pageLanguage).meta;
  $: canonicalUrl = getAbsoluteUrl(getLocalizedPath($page.url.pathname, pageLanguage));
  $: alternateLinks = getAlternateLinks('contact');
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta
    name="description"
    content={meta.description}
  />
  <link rel="canonical" href={canonicalUrl} />
  {#each alternateLinks as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta property="og:title" content={meta.ogTitle} />
  <meta
    property="og:description"
    content={meta.ogDescription}
  />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content="https://eimafisioterapia.es/og-image.png" />
  <meta property="og:image:alt" content={meta.imageAlt} />
  <meta name="twitter:title" content={meta.ogTitle} />
  <meta
    name="twitter:description"
    content={meta.ogDescription}
  />
  <meta name="twitter:image" content="https://eimafisioterapia.es/og-image.png" />
</svelte:head>

<ContactFormSection {form} />
