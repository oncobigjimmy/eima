<script>
  import { site } from '$lib/site';
  import { serializeJsonLd } from '$lib/seo';
  import PostCard from '$lib/components/blog/PostCard.svelte';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { getBlogCopy } from '$lib/i18n/blog';
  import { getAlternateLinks, getRoutePath } from '$lib/i18n/routes';
  export let data;
  $: ui = getBlogCopy(data.language);
  $: blogPath = getRoutePath('blog', data.language);
  $: canonical = site.url + blogPath;
  $: homePath = getRoutePath('home', data.language);
  $: rssPath = data.language === 'es' ? '/blog.xml' : '/' + data.language + '/blog.xml';

  $: whatsappHref = getWhatsAppHref(data.language);

  $: jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${canonical}#blog`,
    name: 'Blog Eima Salut',
    description: ui.schemaDescription,
    url: canonical,
    inLanguage: ui.locale,
    publisher: { '@id': `${site.url}/#organization` },
    blogPost: data.posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      url: `${site.url}${p.path}`
    }))
  };

   $: jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: site.url + homePath },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical }
    ]
  };

  $: ldBlogHtml = `<script type="application/ld+json">${serializeJsonLd(jsonLdBlog)}<\/script>`;
   $: ldBreadcrumbHtml = `<script type="application/ld+json">${serializeJsonLd(jsonLdBreadcrumb)}<\/script>`;
</script>

<svelte:head>
  <title>{ui.title}</title>
  <meta
    name="description"
    content={ui.description}
  />
  <link rel="canonical" href={canonical} />
  {#each getAlternateLinks('blog') as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <link rel="alternate" type="application/rss+xml" title="Eima Salut Blog RSS" href={site.url + rssPath} />
  <meta property="og:title" content={ui.title} />
  <meta
    property="og:description"
    content={ui.socialDescription}
  />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={`${site.url}/og-image.png`} />
  <meta property="og:image:alt" content={ui.imageAlt} />
  <meta name="twitter:title" content={ui.title} />
  <meta
    name="twitter:description"
    content={ui.socialDescription}
  />
  <meta name="twitter:image" content={`${site.url}/og-image.png`} />
  {@html ldBlogHtml}
  {@html ldBreadcrumbHtml}
</svelte:head>

<div class="blog-index">
<section class="relative overflow-hidden" style="min-height: 45vh;">
  <div
    class="absolute inset-0 bg-center bg-cover"
    style="background-image: url('/blog-hero-mallorca.png');"
    aria-hidden="true"
  ></div>
  <div
    class="site-hero-overlay absolute inset-0"
    aria-hidden="true"
  ></div>

  <div class="blog-hero-content photo-text-contrast relative z-10 mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28">
    <h1 class="blog-hero-title text-[35px] leading-[1.08] text-white md:text-[60px] md:leading-[1.02]">
      <span class="block md:inline">{ui.heading[0]}</span>{' '}
      <span class="text-[#8CD0D6]">{ui.heading[1]}<br class="hidden md:block" />{' '}{ui.mobileHeading[1].slice(ui.heading[1].length).trim()}<br class="md:hidden" />{' '}{ui.mobileHeading[2]}</span>
    </h1>
    <p class="mt-7 max-w-5xl text-[15px] font-light leading-relaxed text-white/80">
      {ui.intro[0]} <strong class="font-bold">{ui.intro[1]}</strong><br class="hidden md:block" />{' '}
      {ui.intro[2]}
    </p>
  </div>
</section>

<style>
  .blog-index { --blog-boundary-space: 4rem; }
  .blog-hero-content { padding-bottom: var(--blog-boundary-space); }
  .blog-entries { padding-top: var(--blog-boundary-space); }
  .blog-hero-title,
  .blog-hero-title * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-weight: 500;
    letter-spacing: 0;
  }

</style>

<section class="blog-entries pb-8 md:pb-11">
  <div class="mx-auto max-w-7xl px-6 md:px-10">
    {#if data.posts.length === 0}
      <p class="text-center opacity-70">{ui.empty}</p>
    {:else}
      <div class="blog-post-grid hover-dim-group grid gap-6 md:grid-cols-3">
        {#each data.posts as post (post.slug)}
          <PostCard {post} />
        {/each}
      </div>
    {/if}

    <div class="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-4 text-center md:mt-12 md:flex-row md:gap-6 md:text-left">
      <p class="mobile-copy-14 text-[16px] font-light leading-relaxed text-[#233F4E]">{ui.doubt}</p>
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={ui.cta} />
    </div>
  </div>
</section>
</div>
