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

<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm font-light opacity-80">
  <span class="inline-flex items-center gap-1">
    <span class="material-symbols-rounded !text-base">calendar_today</span>
    <time datetime={date}>{formatDate(date, ui.locale)}</time>
  </span>
  {#if updated && updated !== date}
    <span class="inline-flex items-center gap-1">
      <span class="material-symbols-rounded !text-base">update</span>
      {ui.updated} <time datetime={updated}>{formatDate(updated, ui.locale)}</time>
    </span>
  {/if}
  {#if readingMinutes}
    <span class="inline-flex items-center gap-1">
      <span class="material-symbols-rounded !text-base">schedule</span>
      {readingMinutes} {ui.reading}
    </span>
  {/if}
</div>
