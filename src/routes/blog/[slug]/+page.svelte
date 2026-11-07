<script>
  import { site } from '$lib/site';
  import { serializeJsonLd } from '$lib/seo';
  import { getPost, getPostAlternates } from '$lib/blog/posts.js';
  import { getAuthor } from '$lib/blog/authors.js';
  import PostMeta from '$lib/components/blog/PostMeta.svelte';
  import AuthorSupport from '$lib/components/blog/AuthorSupport.svelte';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';

  import { getBlogCopy } from '$lib/i18n/blog';
  import { getRoutePath } from '$lib/i18n/routes';
  export let data;
  $: ui = getBlogCopy(data.language);
  $: homePath = getRoutePath('home', data.language);
  $: blogPath = getRoutePath('blog', data.language);
  $: programPath = getRoutePath('program', data.language);
  $: contactPath = getRoutePath('contact', data.language);

  $: post = getPost(data.slug, data.language);
  $: author = getAuthor(data.author, data.language);
  $: canonical = site.url + data.path;
  $: ogImage = data.image?.startsWith('http')
    ? data.image
    : `${site.url}${data.image}`;

  $: jsonLdPost = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    headline: data.title,
    description: data.description,
    image: ogImage,
    datePublished: data.date,
    dateModified: data.updated ?? data.date,
    inLanguage: ui.locale,
    articleSection: data.category,
    keywords: (data.tags ?? []).join(', '),
    author: {
      '@type': 'Person',
      name: author.name,
      '@id': `${site.url}/#${author.id}`,
      jobTitle: author.jobTitle,
      url: author.url,
      worksFor: { '@id': `${site.url}/#organization` }
    },
    publisher: { '@id': `${site.url}/#organization` },
    isPartOf: { '@id': `${site.url}${blogPath}#blog` }
  };

  $: jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: site.url + homePath },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: site.url + blogPath },
      { '@type': 'ListItem', position: 3, name: data.title, item: canonical }
    ]
  };

  $: ldPostHtml = `<script type="application/ld+json">${serializeJsonLd(jsonLdPost)}<\/script>`;
  $: ldBreadcrumbHtml = `<script type="application/ld+json">${serializeJsonLd(jsonLdBreadcrumb)}<\/script>`;
  $: heroDescriptionParts =
    data.heroEmphasis && data.description?.includes(data.heroEmphasis)
      ? data.description.split(data.heroEmphasis)
      : null;
  $: titleParts =
    data.titleAccent && data.title?.includes(data.titleAccent)
      ? data.title.split(data.titleAccent)
      : null;
  $: nextPost = post?.nextPost ? getPost(post.nextPost, data.language) : null;
</script>

<svelte:head>
  <title>{data.title} | Eima Salut</title>
  <meta name="description" content={data.seoDescription} />
  {#if data.keywords}
    <meta name="keywords" content={data.keywords} />
  {/if}
  <meta name="author" content={author.name} />
  <link rel="canonical" href={canonical} />
  {#each getPostAlternates(data.slug) as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta property="og:title" content={data.title} />
  <meta property="og:description" content={data.seoDescription} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content={data.imageAlt} />
  <meta property="article:published_time" content={data.date} />
  <meta property="article:modified_time" content={data.updated ?? data.date} />
  <meta property="article:author" content={author.url} />
  <meta property="article:section" content={data.category} />
  {#each data.tags ?? [] as tag}
    <meta property="article:tag" content={tag} />
  {/each}
  <meta name="twitter:title" content={data.title} />
  <meta name="twitter:description" content={data.description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={data.imageAlt} />
  {@html ldPostHtml}
  {@html ldBreadcrumbHtml}
</svelte:head>

<section class="relative overflow-hidden" style="min-height: 40vh;">
  <div class="absolute inset-0 bg-center bg-cover" style="background-image: url('/blog-hero-mallorca.png');" aria-hidden="true"></div>
  <div class="site-hero-overlay absolute inset-0" aria-hidden="true"></div>

  <div class="blog-post-hero-content photo-text-contrast--light relative z-10 mx-auto max-w-6xl px-6 md:px-10 pt-24 md:pt-32 pb-16">
    <nav aria-label={ui.breadcrumbs} class="blog-post-breadcrumb text-sm font-light text-white/70">
      <a href={homePath} class="hover:text-white">{ui.home}</a>
      <span aria-hidden="true" class="mx-2">/</span>
      <a href={blogPath} class="hover:text-white">Blog</a>
    </nav>
    <h1 class={`blog-post-title font-light text-white ${data.heroTitleClass ?? ''}`}>
      {#if data.language === 'es' && data.slug === 'por-que-cada-vez-hay-mas-gente-joven-con-cancer-que-esta-pasando'}
        ¿Por qué cada vez hay más <br class="hidden md:block" />
        <span class="blog-post-title-accent">gente joven</span> con cáncer? <br class="hidden md:block" />
        ¿Qué está pasando?
      {:else if data.language === 'es' && data.slug === 'por-que-he-tenido-un-cancer-si-no-hay-antecedentes-en-toda-mi-familia'}
        ¿Por qué he tenido un cáncer <br class="hidden md:block" />
        si <span class="blog-post-title-accent">no hay antecedentes</span> en <br class="hidden md:block" />
        toda mi familia?
      {:else if data.language === 'es' && data.slug === 'sirve-de-algo-hacer-ejercicio-si-tengo-cancer-esto-dice-la-ciencia'}
        ¿Sirve de algo hacer <span class="blog-post-title-accent">ejercicio</span> <br class="hidden md:block" />
        si tengo cáncer? Esto dice <br class="hidden md:block" />
        la ciencia
      {:else if data.language === 'es' && data.slug === 'puede-el-ejercicio-frenar-el-crecimiento-de-un-tumor-que-dice-la-ciencia'}
        ¿Puede el <span class="blog-post-title-accent">ejercicio</span> frenar el <br class="hidden md:block" />
        crecimiento de un tumor? <br class="hidden md:block" />
        ¿Qué dice la ciencia?
      {:else if titleParts}
        {titleParts[0]}<span class="blog-post-title-accent">{data.titleAccent}</span>{titleParts.slice(1).join(data.titleAccent)}
      {:else}
        {data.title}
      {/if}
    </h1>
    <p class="blog-post-description text-white/85 font-light text-[14px] md:text-[15px]">
      {#if data.language === 'es' && data.slug === 'por-que-cada-vez-hay-mas-gente-joven-con-cancer-que-esta-pasando'}
        Los datos de la SEOM en 2026 apuntan a un <strong class="font-bold text-white">aumento</strong> de diagnósticos <br class="hidden md:block" />
        de cáncer antes de los 65 años. Revisamos qué factores pueden estar <br class="hidden md:block" />
        detrás y cómo el ejercicio puede ayudar durante el proceso.
      {:else if data.language === 'es' && data.slug === 'es-seguro-hacer-ejercicio-durante-la-quimioterapia-o-deberia-esperar-a-terminarla'}
        Empezar a hacer ejercicio durante la quimioterapia no solo es seguro. <br class="hidden md:block" />
        Sino que puede ayudar a <strong class="font-bold text-white">combatir la toxicidad</strong> y preservar tu capacidad física.
      {:else if heroDescriptionParts}
        {heroDescriptionParts[0]}<strong class="font-bold text-white">{data.heroEmphasis}</strong>{heroDescriptionParts.slice(1).join(data.heroEmphasis)}
      {:else}
        {data.description}
      {/if}
    </p>
  </div>
</section>

<style>
  .blog-post-title {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 35px;
    letter-spacing: 0;
    line-height: 1.08;
    margin-top: 1.5rem;
  }

  .blog-post-title--compact {
    font-size: 33px;
  }

  .blog-post-title--long {
    font-size: 35px;
  }

  .blog-post-description {
    line-height: 1.45;
    margin-top: 1.5rem;
    max-width: 50rem;
  }

  .blog-post-title-accent {
    color: #8cd0d6;
    font-family: inherit;
  }

  .blog-next-link {
    color: #233f4e;
    text-decoration: none;
  }

  .blog-next-link:hover {
    color: #4083a7;
  }

  .blog-cta-link {
    isolation: isolate;
    overflow: hidden;
    position: relative;
  }

  .blog-cta-link::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(-180%) skewX(-18deg);
    transition: transform 420ms ease-out;
    width: 44%;
    z-index: 0;
  }

  .blog-cta-link:hover::before,
  .blog-cta-link:focus-visible::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .blog-cta-link span {
    position: relative;
    z-index: 1;
  }

  :global(.prose-blog .blog-program-cta) {
    margin: 2.3rem 0 2.8rem;
  }

  :global(.prose-blog .blog-program-cta__copy) {
    border-left: 4px solid #8cd0d6;
    padding: 0.1rem 0 0.1rem 1.15rem;
  }

  :global(.prose-blog .blog-program-cta__copy p) {
    color: #233f4e;
    font-size: 0.98rem;
    font-weight: 300;
    line-height: 1.65;
    margin: 0 0 0.85rem;
  }

  :global(.prose-blog .blog-program-cta__copy p:first-child) {
    margin-bottom: 1rem;
  }

  :global(.prose-blog .blog-program-cta__copy p:last-child) {
    margin-bottom: 0;
  }

  :global(.prose-blog .empenta-inline-link) {
    border-bottom: 1px dotted currentColor;
    color: #4083a7;
    font-weight: 500;
    padding-bottom: 0.06em;
    text-decoration: none !important;
    transition: color 220ms ease;
  }

  :global(.prose-blog .empenta-inline-link:hover) {
    color: #233f4e;
  }

  :global(.prose-blog .blog-program-cta__program) {
    color: #4083a7;
    font-weight: 700;
  }

  :global(.prose-blog .blog-program-cta__button) {
    align-items: center;
    background: #8cd0d6;
    border-radius: 999px;
    color: #233f4e;
    display: flex;
    font-size: 0.95rem;
    font-weight: 500;
    gap: 0.55rem;
    justify-content: center;
    margin: 0.75rem auto 0;
    overflow: hidden;
    padding: 0.8rem 1.75rem;
    position: relative;
    text-decoration: none !important;
    transition:
      transform 300ms ease-out,
      background-color 300ms ease-out,
      color 300ms ease-out,
      font-weight 300ms ease-out,
      box-shadow 300ms ease-out;
    width: fit-content;
  }

  :global(.prose-blog .blog-program-cta__button::before) {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(-180%) skewX(-18deg);
    transition: transform 420ms ease-out;
    width: 44%;
  }

  :global(.prose-blog .blog-program-cta__button:hover),
  :global(.prose-blog .blog-program-cta__button:focus-visible) {
    background: #4083a7;
    box-shadow: 0 10px 24px rgba(64, 131, 167, 0.28);
    color: #ffffff;
    font-weight: 700;
    transform: scale(1.03);
    text-shadow: var(--eima-blue-text-shadow);
  }

  :global(.prose-blog .blog-program-cta__button:hover::before),
  :global(.prose-blog .blog-program-cta__button:focus-visible::before) {
    transform: translateX(260%) skewX(-18deg);
  }

  :global(.prose-blog .blog-program-cta__button > span) {
    position: relative;
    z-index: 1;
  }

  :global(.prose-blog h2),
  :global(.prose-blog h3) {
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif !important;
    font-weight: 400 !important;
  }

  :global(.prose-blog h2) {
    color: #245b7d;
    margin-top: 48px;
    margin-bottom: 16px;
    line-height: 1.18;
  }

  :global(.prose-blog h3) { color: #4083a7; }

  :global(.prose-blog .source-card img) {
    border: 1px solid transparent;
    box-sizing: border-box;
  }

  :global(.prose-blog .source-card:hover img) {
    border-color: #8cd0d6;
  }

  @media (min-width: 700px) {
    .blog-post-hero-content {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    }

    .blog-post-hero-content nav,
    .blog-post-hero-content h1,
    .blog-post-hero-content p {
      grid-column: 1;
    }

    .blog-post-description {
      max-width: 52rem;
    }
  }

  @media (min-width: 768px) {
    .blog-post-title {
      font-size: 50px;
      line-height: 1.1;
    }

    .blog-post-title--compact {
      font-size: 50px;
    }

    .blog-post-title--long {
      font-size: 50px;
    }
  }
  :global(.prose-blog a.source-card) { position: relative; min-height: 44px; transition: transform var(--dur-micro) var(--ease-calma); }
  :global(.prose-blog .source-go) { position: absolute; top: 10px; right: 10px; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 999px; background: #233f4e; color: #fff; }
  :global(.prose-blog .source-go svg) { width: 20px; height: 20px; transition: transform var(--dur-micro) var(--ease-calma); }
  :global(.prose-blog .source-label) { display: block; font: 400 13px/1.5 Inter, sans-serif; color: #245b7d; }
  @media (hover: hover) and (pointer: fine) { :global(.prose-blog a.source-card:hover) { transform: translateY(-4px); } :global(.prose-blog .source-card:hover .source-go svg) { transform: translate(2px,-2px); } }
  @media (prefers-reduced-motion: reduce) { :global(.prose-blog a.source-card), :global(.prose-blog .source-go svg) { transition: none; } :global(.prose-blog a.source-card:hover), :global(.prose-blog .source-card:hover .source-go svg) { transform: none; } }
  .keep-reading { margin-top: 32px; }
  .keep-reading-label { margin-bottom: 12px; text-transform: uppercase; font: 400 12px/1.5 Inter, sans-serif; letter-spacing: .12em; color: #245b7d; }
  .keep-reading-card { display: block; padding: 22px 20px; border-radius: 14px; background: #233f4e; color: #f4f4f8; }
  .keep-reading-card h2 { color: #f4f4f8; margin: 10px 0; font: 400 21px/1.3 Fraunces, serif; }
  .keep-reading-card p { font: 400 14px/1.7 Inter, sans-serif; }
  .keep-reading-card .keep-reading-time { font-size: 12px; }
  .keep-reading-card span { display: flex; align-items: center; min-height: 44px; margin-top: 12px; color: #8cd0d6; }
  :global(.prose-blog > p), :global(.prose-blog li:not(.key-points li)) { font-weight: 400; line-height: 1.7; }
  @media (min-width: 768px) { :global(.prose-blog > p), :global(.prose-blog li:not(.key-points li)) { font-size: 17px; } }
</style>

<article class="py-16 md:py-20">
  <div class="mx-auto max-w-3xl px-6 md:px-10">
    <PostMeta
      date={data.date}
      updated={data.updated}
      language={data.language}
      readingMinutes={data.readingMinutes}
    />

    <div class="prose-blog mt-10">
      {#if post?.Component}
        <svelte:component this={post.Component} />
      {/if}
    </div>

    <AuthorSupport {author} language={data.language} />
    {#if nextPost}
      <!-- TODO [CA-revisar]: revisar «Continua llegint» i «Llegir l’article». -->
      <aside class="keep-reading">
        <p class="keep-reading-label">{data.language === 'ca' ? 'Continua llegint' : data.language === 'en' ? 'Keep reading' : 'Sigue leyendo'}</p>
        <a class="keep-reading-card" href={nextPost.path} data-card>
          {#if nextPost.readingMinutes}<p class="keep-reading-time">{nextPost.readingMinutes} min</p>{/if}
          <h2>{nextPost.title}</h2><p>{nextPost.description}</p>
          <span>{data.language === 'ca' ? 'Llegir l’article' : data.language === 'en' ? 'Read article' : 'Leer artículo'} →</span>
        </a>
      </aside>
    {/if}
  </div>
</article>
