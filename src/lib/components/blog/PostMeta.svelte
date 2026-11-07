<script>
  import { getBlogCopy } from '$lib/i18n/blog';
  /** @type {import('$lib/i18n/copy').Language} */
  export let language = 'es';
  $: ui = getBlogCopy(language);
  export let date;
  /** @type {string | null} */
  export let updated = null;
  /** @type {number | null} */
  export let readingMinutes = null;

  /** @param {string | null | undefined} d @param {string} locale */
  function formatDate(d, locale) {
    if (!d) return '';
    return new Date(d).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="post-meta flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm font-light opacity-80">
  <span class="post-meta-date inline-flex items-center gap-1">
    <span class="material-symbols-rounded !text-base">calendar_today</span>
    <time datetime={date}>{formatDate(date, ui.locale)}</time>
  </span>
  {#if updated && updated !== date}
    <span class="post-meta-updated inline-flex items-center gap-1">
      <span class="material-symbols-rounded !text-base">update</span>
      {ui.updated} <time datetime={updated}>{formatDate(updated, ui.locale)}</time>
    </span>
  {/if}
  {#if readingMinutes}
    <span class="post-meta-reading inline-flex items-center gap-1">
      <span class="material-symbols-rounded !text-base">schedule</span>
      {readingMinutes} {ui.reading}
    </span>
  {/if}
</div>

<style>
  @media all {
    .post-meta { opacity: 1; }
    .post-meta-date, .post-meta-updated, .post-meta-reading { min-height: 40px; padding: 8px 15px; border-radius: 999px; opacity: 1; }
    .post-meta-date, .post-meta-updated { background: #245b7d; color: #fff; }
    .post-meta-reading { background: #fff; color: #245b7d; border: 1px solid #245b7d33; }
  }
  @media (max-width: 767px) { .post-meta { flex-wrap: nowrap; gap: clamp(10px, 3vw, 14px); font-size: 11.5px; } .post-meta-date, .post-meta-updated, .post-meta-reading { padding: 7px clamp(10px, 3vw, 14px); min-height: 38px; white-space: nowrap; } }
</style>


