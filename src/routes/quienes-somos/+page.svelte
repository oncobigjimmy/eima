<script>
  import { site } from '$lib/site';
  import { page } from '$app/stores';
  import { language } from '$lib/i18n/language';
  import { getAboutCopy } from '$lib/i18n/about';
  import AboutEsSections from '$lib/components/sections/AboutEsSections.svelte';
  import { getAbsoluteUrl, getAlternateLinks, getLanguageFromPath, getLocalizedPath } from '$lib/i18n/routes';
  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? $language;
  $: meta = getAboutCopy(pageLanguage).meta;
  $: canonicalUrl = getAbsoluteUrl(getLocalizedPath($page.url.pathname, pageLanguage));
  $: alternateLinks = getAlternateLinks('about');
</script>
<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={canonicalUrl} />
  {#each alternateLinks as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta property="og:title" content={meta.ogTitle} />
  <meta property="og:description" content={meta.ogDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={`${site.url}/og-image.png`} />
  <meta property="og:image:alt" content={meta.imageAlt} />
  <meta name="twitter:title" content={meta.ogTitle} />
  <meta name="twitter:description" content={meta.ogDescription} />
  <meta name="twitter:image" content={`${site.url}/og-image.png`} />
</svelte:head>
{#key pageLanguage}<AboutEsSections pageLanguage={pageLanguage} />{/key}
