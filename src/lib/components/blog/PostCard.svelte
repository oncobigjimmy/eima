<script>
  import { scrollContrast } from '$lib/actions/scrollContrast';
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
  use:scrollContrast
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
  <p class="post-card-description mt-3 text-sm font-light leading-relaxed opacity-75 md:line-clamp-3 md:min-h-[4rem]">{post.description}</p>
  <div class="post-card-footer mt-7 flex items-end justify-between gap-3 text-left text-xs font-light opacity-70">
    <div class="post-card-meta flex flex-wrap items-center gap-x-2 gap-y-1">
      <span class="whitespace-nowrap">{author.name}</span>
      <span aria-hidden="true" class="opacity-70">&middot;</span>
      <time class="whitespace-nowrap" datetime={post.date}>{formatDate(post.date, getBlogCopy(post.language ?? 'es').locale)}</time>
      {#if post.readingMinutes}<span aria-hidden="true" class="opacity-70">&middot;</span><span class="whitespace-nowrap">{post.readingMinutes} min</span>{/if}
    </div>
    <span class="post-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 18 18 6M7 6h11v11" /></svg></span>
  </div>
</a>

<style>
  .post-card-footer { margin-top: auto; padding-top: 20px; }
  .post-card-arrow { display: grid; flex: 0 0 38px; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: #fff; color: #233f4e; box-shadow: 0 4px 12px #071a2530; opacity: 0; transform: translate(-6px, 6px) rotate(-35deg); transition: opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma); }
  .post-card-arrow svg { width: 20px; height: 20px; }
  .post-card:is(:hover, :focus-visible, :global(.scroll-active)) .post-card-arrow { opacity: 1; transform: translate(0, 0) rotate(0); }
  @media (max-width: 767px) { .post-card:global(.scroll-active) .post-card-arrow { opacity: 1; transform: translate(0, 0) rotate(0); } }
  :global(.blog-post-grid:has(> .post-card:is(:hover, :focus-visible)) > .post-card:not(:hover):not(:focus-visible)),
  :global(.blog-post-grid:has(> .post-card.scroll-active) > .post-card:not(.scroll-active)) { opacity: .7; filter: none; }

  .post-card {
    position: relative;
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
      box-shadow: var(--eima-card-hover-shadow); text-shadow: var(--eima-dark-copy-shadow);
      color: #fff;
    }

    .post-card:hover .post-card-title, .post-card:focus-visible .post-card-title { color: #fff; }
    .post-card:hover .post-card-title span, .post-card:focus-visible .post-card-title span { color: #8cd0d6; }
  }
  @media (max-width: 767px) {
    .post-card-title { font-size: 18px; }
    .post-card-description { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 4; line-clamp: 4; font-size: 13px; }
    .post-card-footer { font-size: 11px; }
    .post-card:global(.scroll-active) { background: var(--eima-card-hover-background); border-color: var(--eima-card-hover-border); box-shadow: var(--eima-card-hover-shadow); text-shadow: var(--eima-dark-copy-shadow); color: #fff; }
    .post-card:global(.scroll-active) .post-card-title { color: #fff; }
    .post-card:global(.scroll-active) .post-card-title span { color: #8cd0d6; }
  }
  @media (prefers-reduced-motion: reduce) { .post-card, .post-card-title, .post-card-title span, .post-card-arrow { transition: none; } .post-card-arrow { transform: none; } }
</style>
