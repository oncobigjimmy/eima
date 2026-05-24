<script>
  import { getPost } from '$lib/blog/posts.js';
  import { getAuthor } from '$lib/blog/authors.js';
  import PostMeta from '$lib/components/blog/PostMeta.svelte';
  import AuthorBox from '$lib/components/blog/AuthorBox.svelte';

  export let data;

  $: post = getPost(data.slug);
  $: author = getAuthor(data.author);
  $: canonical = `https://eimafisioterapia.es/blog/${data.slug}`;
  $: ogImage = data.image?.startsWith('http')
    ? data.image
    : `https://eimafisioterapia.es${data.image}`;

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
    inLanguage: 'es-ES',
    articleSection: data.category,
    keywords: (data.tags ?? []).join(', '),
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      url: author.url,
      sameAs: [author.sameAs],
      worksFor: { '@id': 'https://eimafisioterapia.es/#organization' }
    },
    publisher: { '@id': 'https://eimafisioterapia.es/#organization' },
    isPartOf: { '@id': 'https://eimafisioterapia.es/blog#blog' }
  };

  $: jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://eimafisioterapia.es/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://eimafisioterapia.es/blog' },
      { '@type': 'ListItem', position: 3, name: data.title, item: canonical }
    ]
  };

  $: ldPostHtml = `<script type="application/ld+json">${JSON.stringify(jsonLdPost)}<\/script>`;
  $: ldBreadcrumbHtml = `<script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumb)}<\/script>`;
  $: heroDescriptionParts =
    data.heroEmphasis && data.description?.includes(data.heroEmphasis)
      ? data.description.split(data.heroEmphasis)
      : null;
  $: titleParts =
    data.titleAccent && data.title?.includes(data.titleAccent)
      ? data.title.split(data.titleAccent)
      : null;
  $: nextPost = post?.nextPost ? getPost(post.nextPost) : null;
</script>

<svelte:head>
  <title>{data.title} | EIMA Fisioterapia</title>
  <meta name="description" content={data.description} />
  {#if data.keywords}
    <meta name="keywords" content={data.keywords} />
  {/if}
  <meta name="author" content={author.name} />
  <link rel="canonical" href={canonical} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.title} />
  <meta property="og:description" content={data.description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />
  <meta property="article:published_time" content={data.date} />
  <meta property="article:modified_time" content={data.updated ?? data.date} />
  <meta property="article:author" content={author.name} />
  <meta property="article:section" content={data.category} />
  {#each data.tags ?? [] as tag}
    <meta property="article:tag" content={tag} />
  {/each}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.title} />
  <meta name="twitter:description" content={data.description} />
  <meta name="twitter:image" content={ogImage} />
  {@html ldPostHtml}
  {@html ldBreadcrumbHtml}
</svelte:head>

<section class="relative overflow-hidden" style="min-height: 40vh;">
  <div class="absolute inset-0 bg-center bg-cover" style="background-image: url('/blog-hero-mallorca.png');" aria-hidden="true"></div>
  <div class="absolute inset-0" style="background: linear-gradient(90deg, rgba(35,63,78,0.88) 0%, rgba(35,63,78,0.6) 100%);" aria-hidden="true"></div>

  <div class="blog-post-hero-content relative z-10 mx-auto max-w-6xl px-6 md:px-10 pt-24 md:pt-32 pb-16">
    <nav aria-label="Migas de pan" class="blog-post-breadcrumb text-sm font-light text-white/70">
      <a href="/" class="hover:text-white">Inicio</a>
      <span aria-hidden="true" class="mx-2">/</span>
      <a href="/blog" class="hover:text-white">Blog</a>
    </nav>
    <h1 class={`blog-post-title font-light text-white ${data.heroTitleClass ?? ''}`}>
      {#if data.slug === 'por-que-cada-vez-hay-mas-gente-joven-con-cancer-que-esta-pasando'}
        ¿Por qué cada vez hay más <br class="hidden md:block" />
        <span class="blog-post-title-accent">gente joven</span> con cáncer? <br class="hidden md:block" />
        ¿Qué está pasando?
      {:else if data.slug === 'por-que-he-tenido-un-cancer-si-no-hay-antecedentes-en-toda-mi-familia'}
        ¿Por qué he tenido un cáncer <br class="hidden md:block" />
        si <span class="blog-post-title-accent">no hay antecedentes</span> en <br class="hidden md:block" />
        toda mi familia?
      {:else if data.slug === 'sirve-de-algo-hacer-ejercicio-si-tengo-cancer-esto-dice-la-ciencia'}
        ¿Sirve de algo hacer <span class="blog-post-title-accent">ejercicio</span> <br class="hidden md:block" />
        si tengo cáncer? Esto dice <br class="hidden md:block" />
        la ciencia
      {:else if data.slug === 'puede-el-ejercicio-frenar-el-crecimiento-de-un-tumor-que-dice-la-ciencia'}
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
      {#if data.slug === 'por-que-cada-vez-hay-mas-gente-joven-con-cancer-que-esta-pasando'}
        Los datos de la SEOM en 2026 apuntan a un <strong class="font-bold text-white">aumento</strong> de diagnósticos <br class="hidden md:block" />
        de cáncer antes de los 65 años. Revisamos qué factores pueden estar <br class="hidden md:block" />
        detrás y cómo el ejercicio puede ayudar durante el proceso.
      {:else if data.slug === 'es-seguro-hacer-ejercicio-durante-la-quimioterapia-o-deberia-esperar-a-terminarla'}
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
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif !important;
  }

  :global(.prose-blog h2) {
    line-height: 1.18;
  }

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
</style>

<article class="py-16 md:py-20">
  <div class="mx-auto max-w-3xl px-6 md:px-10">
    <PostMeta
      date={data.date}
      updated={data.updated}
      readingMinutes={data.readingMinutes}
    />

    <div class="prose-blog mt-10">
      {#if post?.Component}
        <svelte:component this={post.Component} />
      {/if}
    </div>

    {#if nextPost}
      <aside class="mt-12 rounded-[10px] bg-[color:var(--color-brand-accent)]/15 p-7 shadow-[0_1px_3px_rgba(14,29,38,0.06)]">
        <p class="mb-3 text-xs uppercase tracking-[0.12em] text-[color:var(--color-brand-soft)]">Esto también te interesa</p>
        <a class="blog-next-link block text-2xl font-light leading-tight" href={`/blog/${nextPost.slug}`}>
          {nextPost.title}
        </a>
        <p class="mt-3 text-sm font-light leading-relaxed opacity-80 line-clamp-4">
          {nextPost.description}
        </p>
        <a
          href={`/blog/${nextPost.slug}`}
          class="blog-cta-link mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-brand-accent)] text-[color:var(--color-brand)] px-5 py-2.5 font-light text-[14px] transition-[transform,font-weight] duration-300 ease-out hover:scale-[1.03] hover:font-bold"
        >
          <span>Leer</span>
          <span class="material-symbols-rounded !text-base">arrow_forward</span>
        </a>
      </aside>
    {/if}

    <AuthorBox {author} />

    <aside class="mt-12 rounded-[10px] bg-[color:var(--color-brand-accent)]/15 p-7 text-center">
      <h2 class="text-xl font-light mb-2">¿Quieres que te acompañemos en tu proceso?</h2>
      <p class="opacity-80 font-light text-sm mb-4">
        Reserva una primera toma de contacto gratuita y sin compromiso.
      </p>
      <a
        href="/contacto"
        class="blog-cta-link inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-accent)] text-[color:var(--color-brand)] px-6 py-3 font-light text-[15px] transition-[transform,font-weight] duration-300 ease-out hover:scale-[1.03] hover:font-bold"
      >
        <span>Contactar</span>
        <span class="material-symbols-rounded !text-base">arrow_forward</span>
      </a>
    </aside>

    <section class="mt-8 rounded-[10px] bg-white p-6 shadow-[0_1px_3px_rgba(14,29,38,0.06)]">
      <h2 class="text-xl font-medium mb-3">¿Tienes más preguntas?</h2>
      <p class="text-sm font-light opacity-85 leading-relaxed">
        Sabemos que este tema genera muchas dudas: qué tipo de ejercicio es seguro, cuándo empezar, qué hacer si hay fatiga, dolor, metástasis, anemia o miedo a moverse. Puedes consultar nuestras <a href="/como-funciona#faq" class="text-[color:var(--color-brand-soft)] underline underline-offset-3">Preguntas Frecuentes</a> para resolver las dudas más comunes.
      </p>
    </section>
  </div>
</article>
