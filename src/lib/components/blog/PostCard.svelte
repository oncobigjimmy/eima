<script>
  import { getAuthor } from '$lib/blog/authors.js';
  import { getBlogCopy } from '$lib/i18n/blog';
  /** @type {Omit<ReturnType<typeof import('$lib/blog/posts').getPosts>[number], 'Component' | 'seoDescription' | 'heroLabel' | 'heroEmphasis' | 'heroTitleClass' | 'nextPost' | 'keywords' | 'faq'>} */
  export let post;

  $: author = getAuthor(post.author);
  $: titleParts =
    post.titleAccent && post.title?.includes(post.titleAccent)
      ? post.title.split(post.titleAccent)
      : null;

  /** @param {string | null | undefined} d @param {string} locale */
  function formatDate(d, locale) {
    if (!d) return '';
    return new Date(d).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<a
  href={post.path ?? `/blog/${post.slug}`}
  class="post-card group hover-dim-item flex h-full flex-col rounded-[10px] border border-transparent bg-white p-7 shadow-[0_1px_3px_rgba(14,29,38,0.06)] md:p-6"
>
  <h2
    class="post-card-title text-xl leading-snug md:line-clamp-3 md:min-h-[5.15rem] md:text-[1.35rem]"
  >
    {#if titleParts}
      {titleParts[0]}<span>{post.titleAccent}</span>{titleParts.slice(1).join(post.titleAccent)}
    {:else}
      {post.title}
    {/if}
  </h2>
  <p class="mt-3 text-sm font-light leading-relaxed opacity-75 md:line-clamp-3 md:min-h-[4rem]">{post.description}</p>
  <div class="mt-7 flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-left text-xs font-light opacity-70">
    <span class="whitespace-nowrap">{author.name}</span>
    <span aria-hidden="true" class="opacity-70">&middot;</span>
    <time class="whitespace-nowrap" datetime={post.date}>{formatDate(post.date, getBlogCopy(post.language ?? 'es').locale)}</time>
    {#if post.readingMinutes}
      <span aria-hidden="true" class="opacity-70">&middot;</span>
      <span class="whitespace-nowrap">{post.readingMinutes} min</span>
    {/if}
  </div>
</a>

<style>
  .post-card {
    color: #233f4e;
    transition: opacity 175ms ease-out, background-color 380ms ease-out, border-color 380ms ease-out, box-shadow 380ms ease-out, color 380ms ease-out;
  }

  .post-card-title {
    color: #233f4e;
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
    font-weight: 500;
    letter-spacing: 0;
    transition: color 380ms ease-out;
  }

  .post-card-title span {
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
    font-weight: 700;
    transition: color 380ms ease-out;
  }

  @media (min-width: 768px) and (hover: hover) {
    .post-card:hover, .post-card:focus-visible {
      background: var(--eima-card-hover-background);
      border-color: var(--eima-card-hover-border);
      box-shadow: var(--eima-card-hover-shadow);
      color: #fff;
    }

    .post-card:hover .post-card-title, .post-card:focus-visible .post-card-title { color: #fff; }
    .post-card:hover .post-card-title span, .post-card:focus-visible .post-card-title span { color: #8cd0d6; }
  }
</style>
