<script>
  import { site } from '$lib/site';
  import { serializeJsonLd } from '$lib/seo';
  import { getPost, getPostAlternates } from '$lib/blog/posts.js';
  import { getAuthor } from '$lib/blog/authors.js';
  import PostMeta from '$lib/components/blog/PostMeta.svelte';
  import AuthorSupport from '$lib/components/blog/AuthorSupport.svelte';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';

  import { getBlogCopy } from '$lib/i18n/blog';
  import { onMount } from 'svelte';
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
  $: nextTitleParts = nextPost?.titleAccent && nextPost.title.includes(nextPost.titleAccent) ? nextPost.title.split(nextPost.titleAccent) : null;

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = Array.from(document.querySelectorAll('.prose-blog .source-card'));
      const center = window.innerHeight / 2;
      let closest = null;
      let distance = Infinity;
      for (const card of cards) {
        const rect = (card.querySelector('img') ?? card).getBoundingClientRect();
        const current = Math.abs((rect.top + rect.bottom) / 2 - center);
        if (rect.top <= center + window.innerHeight * .15 && rect.bottom >= center - window.innerHeight * .15 && current < distance) { closest = card; distance = current; }
      }
      for (const card of cards) card.classList.toggle('source-active', reduced.matches || card === closest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const container = document.querySelector('.prose-blog');
    const changes = new MutationObserver(schedule);
    if (container) changes.observe(container, { childList: true, subtree: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule, true);
    reduced.addEventListener('change', schedule);
    schedule();
    return () => { changes.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); window.removeEventListener('load', schedule, true); reduced.removeEventListener('change', schedule); cancelAnimationFrame(frame); };
  });
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
  :global(.prose-blog a:not(.source-card):not(.blog-program-cta__button)) { border-bottom: 1px dotted currentColor; color: #4083a7; font-weight: 500; padding-bottom: .06em; text-decoration: none !important; transition: color 220ms ease; }
  :global(.prose-blog a:not(.source-card):not(.blog-program-cta__button):hover) { color: #233f4e; }

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
  @media (min-width: 1024px) {
    .blog-post-breadcrumb { display: none; }
    .blog-post-hero-content { display: block; padding-top: 6rem; text-align: center; }
    .blog-post-title { margin: 0 auto; }
    .blog-post-description { margin-left: auto; margin-right: auto; }
  }
  :global(.prose-blog a.source-card) { position: relative; min-height: 44px; transition: transform var(--dur-micro) var(--ease-calma); }
  @media (min-width: 768px) { :global(.prose-blog .source-card) { display: grid; grid-template-columns: minmax(0, 1fr); width: min(100%, 300px); margin-inline: auto; gap: 0; } :global(.prose-blog .source-card img) { grid-area: 1 / 1; margin: 0; align-self: end; } :global(.prose-blog .source-card > span) { grid-area: 2 / 1; display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 4; line-clamp: 4; margin-top: 22px; } :global(.prose-blog .source-card .source-go) { grid-area: 1 / 1; position: relative; inset: auto; z-index: 1; align-self: end; justify-self: center; transform: translateY(50%); } }
  :global(.prose-blog .source-go) { position: absolute; top: 10px; right: 10px; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 999px; background: #233f4e; color: #fff; }
  :global(.prose-blog .source-go svg) { width: 20px; height: 20px; transition: transform var(--dur-micro) var(--ease-calma); }
  :global(.prose-blog .source-label) { display: none; font: 400 13px/1.5 Inter, sans-serif; color: #245b7d; }
  @media (hover: hover) and (pointer: fine) { :global(.prose-blog a.source-card:hover) { transform: translateY(-4px); } :global(.prose-blog .source-card:hover .source-go svg) { transform: translate(2px,-2px); } }
  @media (prefers-reduced-motion: reduce) { :global(.prose-blog a.source-card), :global(.prose-blog .source-go svg) { transition: none; } :global(.prose-blog a.source-card:hover), :global(.prose-blog .source-card:hover .source-go svg) { transform: none; } }
  .article-closing-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; margin-top: 12px; }
  .keep-reading { margin-top: 0; align-self: stretch; }
  .keep-reading-card { display: flex; flex-direction: column; height: 100%; min-height: 100%; padding: 22px 20px; border-radius: 14px; background: #233f4e; color: #f4f4f8; }
  .keep-reading-card h2 { color: #f4f4f8; margin: 10px 0; font: 400 21px/1.3 Fraunces, serif; }
  .keep-reading-card h2 span { color: #8cd0d6; font-family: inherit; font-size: inherit; font-weight: inherit; }
  .keep-reading-card .keep-reading-summary { font: 300 14px/1.7 Inter, sans-serif; }
  .keep-reading-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; margin-top: auto; padding-top: 18px; }
  .keep-reading-footer span { display: flex; align-items: center; min-height: 40px; color: #8cd0d6; }
  .keep-reading-footer .keep-reading-label { justify-self: start; font: 500 12px/1.4 Inter, sans-serif; letter-spacing: .07em; text-transform: uppercase; }
  .keep-reading-footer .keep-reading-time { justify-self: center; font: 400 12px/1.5 Inter, sans-serif; }
  .keep-reading-footer .keep-reading-link { justify-self: end; justify-content: center; width: 40px; height: 40px; min-height: 40px; border-radius: 50%; background: #f8f4f0; color: #4083a7; box-shadow: 0 3px 9px #071a251c; }
  .keep-reading-footer .keep-reading-link svg { width: 18px; height: 18px; }
  @media (min-width: 1024px) { .keep-reading-card { padding: 18px 20px; } .keep-reading-card h2 { margin: 6px 0 8px; font-size: 22px; } .keep-reading-card .keep-reading-summary { line-height: 1.55; } }
  @media (min-width: 1024px) { .article-closing-grid { position: relative; left: 50%; width: min(calc(100vw - 80px), 1100px); grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 40px; transform: translateX(-50%); } }
  @media (max-width: 767px) { .blog-post-hero-content { padding-bottom: 32px; } .article-page { padding-top: 32px; } .blog-post-title { font-size: 32px; } :global(.prose-blog h2), :global(.prose-blog h3) { font-size: 22px !important; } :global(.prose-blog h2) { margin-top: 30px; } :global(.prose-blog > p), :global(.prose-blog li:not(.key-points li)) { font-weight: 300; } }
  :global(.prose-blog > p), :global(.prose-blog li:not(.key-points li)) { font-weight: 300; line-height: 1.7; }
  @media (min-width: 768px) { :global(.prose-blog > p), :global(.prose-blog li:not(.key-points li)) { font-size: 17px; } }
  @media (max-width: 767px) {
    :global(.prose-blog .source-grid) { grid-template-columns: minmax(0, 1fr); justify-items: center; }
    :global(.prose-blog .source-card) { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; width: min(100%, 300px); margin-inline: auto; }
    :global(.prose-blog .source-card > span) { grid-area: 2 / 1; display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 4; line-clamp: 4; margin-top: 22px; font: 400 16px/1.3 Inter, sans-serif; }
    :global(.prose-blog .source-card img) { grid-area: 1 / 1; margin: 0; align-self: end; justify-self: center; }
    :global(.prose-blog .source-go) { position: relative; inset: auto; grid-area: 1 / 1; z-index: 1; align-self: end; justify-self: center; margin: 0; opacity: 0; transform: translateY(calc(50% + 8px)) scale(.94); transition: opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma); }
    :global(.prose-blog .source-label) { display: block; grid-area: 3 / 1; margin-top: 4px; opacity: 0; transform: translateY(6px); transition: opacity var(--dur-estado) var(--ease-calma) 80ms, transform var(--dur-estado) var(--ease-calma) 80ms; }
    :global(.prose-blog .source-card.source-active .source-go) { opacity: 1; transform: translateY(50%); }
    :global(.prose-blog .source-card.source-active .source-label) { opacity: 1; transform: none; }
    :global(.prose-blog .source-card.source-active .source-go svg) { animation: source-arrow-in 450ms var(--ease-calma) both; }
    @keyframes source-arrow-in { from { transform: translate(-5px,5px) rotate(-35deg); } to { transform: translate(2px,-2px) rotate(0); } }
  }
  @media (prefers-reduced-motion: reduce) { :global(.prose-blog .source-go), :global(.prose-blog .source-label), :global(.prose-blog .source-go svg) { transition: none !important; animation: none !important; } :global(.prose-blog .source-label), :global(.prose-blog .source-go svg) { transform: none !important; } }
</style>

<article class="article-page py-16 md:py-20">
  <div class="article-page-inner mx-auto max-w-3xl px-6 md:px-10">
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

    <div class="article-closing-grid">
    <AuthorSupport {author} language={data.language} />
    {#if nextPost}
      <!-- TODO [CA-revisar]: revisar «Continua llegint» i «Llegir l’article». -->
      <aside class="keep-reading">
        <a class="keep-reading-card" href={nextPost.path} data-card>
          <h2>{#if nextTitleParts}{nextTitleParts[0]}<span>{nextPost.titleAccent}</span>{nextTitleParts.slice(1).join(nextPost.titleAccent)}{:else}{nextPost.title}{/if}</h2><p class="keep-reading-summary">{nextPost.description}</p>
          <div class="keep-reading-footer"><span class="keep-reading-label">{data.language === 'ca' ? 'Continua llegint' : data.language === 'en' ? 'Keep reading' : 'Sigue leyendo'}</span>{#if nextPost.readingMinutes}<span class="keep-reading-time">{nextPost.readingMinutes} min</span>{:else}<span></span>{/if}<span class="keep-reading-link" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 18 18 6M7 6h11v11" /></svg></span></div>
        </a>
      </aside>
    {/if}
    </div>
  </div>
</article>
