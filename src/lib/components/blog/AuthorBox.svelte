<script>
  import { getBlogCopy } from '$lib/i18n/blog';
  import { getRoutePath } from '$lib/i18n/routes';
  /** @type {import('$lib/i18n/copy').Language} */
  export let language = 'es';
  export let author;

  $: authorHref = author?.id ? `${getRoutePath('story', language)}#${author.id}` : author?.url;
</script>

<a
  href={authorHref}
  class="group mt-12 flex flex-col items-start gap-4 rounded-[10px] border border-transparent bg-white p-6 text-[color:var(--color-brand)] no-underline shadow-[0_1px_3px_rgba(14,29,38,0.06)] transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-0.5 hover:border-[#8CD0D6] hover:shadow-[0_10px_24px_rgba(14,29,38,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CD0D6] sm:flex-row"
>
  <div
    class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[color:var(--color-brand-accent)] text-[color:var(--color-brand)]"
  >
    {#if author.avatar}
      <img
        src={author.avatar}
        alt={author.name}
        class="h-full w-full object-cover object-top" loading="lazy" decoding="async"
      />
    {:else}
      <span class="material-symbols-rounded !text-3xl">account_circle</span>
    {/if}
  </div>
  <div class="flex-1">
    <p class="text-sm font-light opacity-70">{getBlogCopy(language).written}</p>
    <p class="text-lg font-medium">{author.name}</p>
    <p class="text-sm text-[color:var(--color-brand-soft)] mb-2 font-light">{author.role}</p>
    <p class="text-sm font-light opacity-85">{author.bio}</p>
  </div>
</a>
