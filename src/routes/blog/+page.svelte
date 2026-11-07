<script>
  import { selectedSituation } from '$lib/data/situation';
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

  $: whatsappHref = getWhatsAppHref(data.language, false, $selectedSituation);

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

@media (max-width: 767px) { .blog-hero-content p { font-size: 14.8px; } }
  .blog-faq-card { display: block; max-width: 1100px; border: 1px solid transparent; text-decoration: none; transition: border-color 200ms ease, box-shadow 200ms ease; }
  .blog-faq-card:is(:hover, :focus-visible) { border-color: #4083a7; }
  .blog-faq-card:focus-visible { outline: 2px solid #4083a7; outline-offset: 3px; }
  .blog-faq-card h2 { margin-bottom: 12px; font: 500 24px/1.3 'Playfair Display', Georgia, serif; color: #245b7d; }
  @media (min-width: 768px) { .blog-faq-card h2 { font-size: 30px; } }
  .blog-faq-card p { font: 300 15px/1.65 Inter, sans-serif; color: #4083a7; }
  .blog-faq-link { color: #245b7d; font-weight: 700; border-bottom: 1px dotted currentColor; }
  .blog-faq-break { display: block; height: .7rem; }
  .blog-faq-desktop-break { display: none; }
  @media (min-width: 1024px) { .blog-faq-card { max-width: 760px; } .blog-faq-desktop-break { display: block; } .blog-faq-card p { font-size: clamp(13px, 1.17vw, 15px); } }
  @media (max-width: 767px) { .blog-faq-break { display: block; height: .7rem; } }
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

    <a href={`${getRoutePath('program', data.language)}#faq`} class="blog-faq-card mx-auto mt-10 rounded-xl bg-white p-6 shadow-[0_3px_12px_rgba(35,63,78,.10)] md:mt-12 md:p-6">
      <h2>{ui.questions}</h2>
      <p>{#if data.language === 'es'}Sabemos que este tema genera muchas dudas: <strong><em>qué tipo de ejercicio es seguro, cuándo empezar,<br class="blog-faq-desktop-break" /> qué hacer si hay fatiga, dolor, metástasis, anemia o miedo a moverse.</em></strong><span class="blog-faq-break" aria-hidden="true"></span> Puedes consultar nuestras{:else}{ui.questionsBefore}{/if}{' '}<span class="blog-faq-link">{ui.faq}</span> {ui.questionsAfter}</p>
    </a>
    <div class="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6 md:text-left">
      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={ui.cta} />
    </div>
  </div>
</section>
</div>
