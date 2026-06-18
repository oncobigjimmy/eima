<script>
  import PostCard from '$lib/components/blog/PostCard.svelte';
  export let data;

  $: jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://eimafisioterapia.es/blog#blog',
    name: 'Blog EIMA Fisioterapia',
    description:
      'Fisioterapia oncológica y ejercicio terapéutico para personas con cáncer: fuerza, fatiga, dolor, movilidad y salud durante y después del tratamiento.',
    url: 'https://eimafisioterapia.es/blog',
    inLanguage: 'es-ES',
    publisher: { '@id': 'https://eimafisioterapia.es/#organization' },
    blogPost: data.posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      url: `https://eimafisioterapia.es/blog/${p.slug}`
    }))
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://eimafisioterapia.es/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://eimafisioterapia.es/blog' }
    ]
  };

  $: ldBlogHtml = `<script type="application/ld+json">${JSON.stringify(jsonLdBlog)}<\/script>`;
  const ldBreadcrumbHtml = `<script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumb)}<\/script>`;
</script>

<svelte:head>
  <title>Blog | Cáncer, ejercicio y fisioterapia oncológica</title>
  <meta
    name="description"
    content="Artículos sobre ejercicio durante y después del cáncer, fisioterapia oncológica, fatiga, dolor y hábitos para recuperar fuerza y salud."
  />
  <link rel="canonical" href="https://eimafisioterapia.es/blog" />
  <link rel="alternate" type="application/rss+xml" title="EIMA Blog RSS" href="https://eimafisioterapia.es/blog.xml" />
  <meta property="og:title" content="Blog | Cáncer, ejercicio y fisioterapia oncológica" />
  <meta
    property="og:description"
    content="Guías de EIMA sobre fisioterapia oncológica, ejercicio terapéutico, fatiga, dolor y salud para personas con cáncer en Mallorca."
  />
  <meta property="og:url" content="https://eimafisioterapia.es/blog" />
  <meta property="og:image" content="https://eimafisioterapia.es/og-image.png" />
  <meta property="og:image:alt" content="EIMA Fisioterapia — Blog sobre cáncer, ejercicio y salud" />
  <meta name="twitter:title" content="Blog | Cáncer, ejercicio y fisioterapia oncológica" />
  <meta
    name="twitter:description"
    content="Guías de EIMA sobre fisioterapia oncológica, ejercicio terapéutico, fatiga, dolor y salud para personas con cáncer en Mallorca."
  />
  <meta name="twitter:image" content="https://eimafisioterapia.es/og-image.png" />
  {@html ldBlogHtml}
  {@html ldBreadcrumbHtml}
</svelte:head>

<section class="relative overflow-hidden" style="min-height: 45vh;">
  <div
    class="absolute inset-0 bg-center bg-cover"
    style="background-image: url('/blog-hero-mallorca.png');"
    aria-hidden="true"
  ></div>
  <div
    class="absolute inset-0"
    style="background: linear-gradient(90deg, rgba(8,18,24,0.76) 0%, rgba(8,18,24,0.58) 42%, rgba(8,18,24,0.3) 100%);"
    aria-hidden="true"
  ></div>
  <div
    class="absolute inset-0"
    style="background: linear-gradient(180deg, rgba(8,18,24,0.26) 0%, rgba(8,18,24,0.12) 46%, rgba(8,18,24,0.48) 100%);"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl px-5 md:px-10 pt-24 md:pt-32 pb-16">
    <p class="mb-6 text-[0.78rem] font-light uppercase tracking-[0.28em] text-white/70">Blog</p>
    <h1 class="blog-hero-title text-[35px] leading-[1.08] text-white md:text-[60px] md:leading-[1.02]">
      <span class="block md:hidden">Artículos sobre</span>
      <span class="block text-[#8CD0D6] md:hidden">cáncer, ejercicio</span>
      <span class="block text-[#8CD0D6] md:hidden">y salud.</span>
      <span class="hidden md:block">
        Artículos sobre <span class="text-[#8CD0D6]">cáncer,</span>
      </span>
      <span class="hidden text-[#8CD0D6] md:block">ejercicio y salud.</span>
    </h1>
    <p class="mt-5 text-white/80 font-light max-w-xl text-[15px]">
      Fisioterapia oncológica y ejercicio terapéutico para personas con cáncer: fuerza, fatiga, dolor, movilidad y salud durante y después del tratamiento.
    </p>
  </div>
</section>

<style>
  .blog-hero-title,
  .blog-hero-title * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-weight: 500;
    letter-spacing: 0;
  }

  @media (hover: hover) and (min-width: 768px) {
    :global(.blog-post-grid:has(a:hover) a:not(:hover)) {
      filter: blur(1.4px) saturate(0.85);
      opacity: 0.42;
      transform: scale(0.99);
    }
  }
</style>

<section class="py-20 md:py-28">
  <div class="mx-auto max-w-7xl px-6 md:px-10">
    {#if data.posts.length === 0}
      <p class="text-center opacity-70">Próximamente publicaremos nuestros primeros artículos.</p>
    {:else}
      <div class="blog-post-grid grid gap-6 md:grid-cols-3">
        {#each data.posts as post (post.slug)}
          <PostCard {post} />
        {/each}
      </div>
    {/if}
  </div>
</section>
