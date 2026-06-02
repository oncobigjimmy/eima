<script>
  import ContactFormSection from '$lib/components/sections/ContactFormSection.svelte';
  import { getContactCopy } from '$lib/i18n/contact';
  import { language } from '$lib/i18n/language';

  export let form;

  $: meta = getContactCopy($language).meta;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta
    name="description"
    content={meta.description}
  />
  <link rel="canonical" href="https://eimafisioterapia.es/contacto" />
  <meta property="og:title" content={meta.ogTitle} />
  <meta
    property="og:description"
    content={meta.ogDescription}
  />
  <meta property="og:url" content="https://eimafisioterapia.es/contacto" />
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
