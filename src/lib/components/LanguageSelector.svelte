<script lang="ts">
  import { page } from '$app/stores';
  import { LANGUAGES, type Language } from '$lib/i18n/copy';
  import { language, setLanguage } from '$lib/i18n/language';

  export let light = false;
  export let compact = false;
  export let onSelect = () => {};

  let dropdownOpen = false;

  $: pathname = $page.url.pathname;
  $: isBlog = pathname === '/blog' || pathname.startsWith('/blog/');
  $: currentLanguage = LANGUAGES.find((item) => item.code === $language) ?? LANGUAGES[0];

  function chooseLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    dropdownOpen = false;
    onSelect();
  }

  function closeDropdown() {
    dropdownOpen = false;
  }
</script>

<svelte:window on:click={closeDropdown} />

{#if !isBlog}
  <div
    class="language-selector flex items-center gap-1.5"
    class:language-selector--compact={compact}
    aria-label="Idioma"
  >
    <div class="language-selector__mobile flex items-center gap-2">
      {#each LANGUAGES as item (item.code)}
        <button
          type="button"
          class="language-selector__button inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-light transition-[background-color,color,border-color,opacity] duration-200 hover:opacity-90
            {light
              ? 'border-white/45 text-white'
              : 'border-[color:var(--color-brand)]/18 text-[color:var(--color-brand)]'}
            {$language === item.code
              ? light
                ? 'bg-white/18 font-medium'
                : 'bg-[color:var(--color-brand-accent)] font-medium'
              : light
                ? 'bg-white/5'
                : 'bg-white/45'}"
          aria-pressed={$language === item.code}
          aria-label={`Cambiar idioma a ${item.name}`}
          on:click={() => chooseLanguage(item.code)}
        >
          <span class={`language-flag language-flag--${item.code}`} aria-hidden="true"></span>
          <span>{item.label}</span>
        </button>
      {/each}
    </div>

    <div class="language-selector__desktop relative">
      <button
        type="button"
        class="language-selector__trigger inline-flex min-w-[8.2rem] items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-[12px] font-medium tracking-[0.02em] transition-[background-color,color,border-color,opacity] duration-200 hover:opacity-90
          {light
            ? 'border-white/45 bg-white/8 text-white'
            : 'border-[color:var(--color-brand)]/18 bg-white/60 text-[color:var(--color-brand)]'}"
        aria-haspopup="menu"
        aria-expanded={dropdownOpen}
        on:click|stopPropagation={() => (dropdownOpen = !dropdownOpen)}
      >
        <span class="inline-flex items-center gap-2">
          <span class={`language-flag language-flag--${currentLanguage.code}`} aria-hidden="true"></span>
          <span>{currentLanguage.displayName}</span>
        </span>
        <span class="material-symbols-rounded language-selector__chevron" aria-hidden="true">
          expand_more
        </span>
      </button>

      {#if dropdownOpen}
        <div
          class="language-selector__menu absolute right-0 top-[calc(100%+0.55rem)] z-50 min-w-[10.8rem] rounded-[8px] border border-[color:var(--color-brand)]/12 bg-[#F8F4F0] p-1.5 text-[color:var(--color-brand)] shadow-[0_14px_34px_rgba(14,29,38,0.16)]"
          role="menu"
        >
          {#each LANGUAGES as item (item.code)}
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-left text-[12px] font-light tracking-[0.02em] transition-colors hover:bg-[#8CD0D6]
                {$language === item.code ? 'bg-[#8CD0D6] font-medium' : ''}"
              role="menuitemradio"
              aria-checked={$language === item.code}
              on:click|stopPropagation={() => chooseLanguage(item.code)}
            >
              <span class={`language-flag language-flag--${item.code}`} aria-hidden="true"></span>
              <span>{item.displayName}</span>
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .language-selector--compact {
    flex-wrap: wrap;
    justify-content: center;
  }

  .language-selector__button {
    line-height: 1;
  }

  .language-selector__desktop {
    display: none;
  }

  .language-selector__mobile {
    display: flex;
  }

  .language-selector__chevron {
    font-size: 1rem;
    line-height: 1;
  }

  .language-flag {
    border-radius: 999px;
    box-shadow: 0 0 0 1px rgba(14, 29, 38, 0.14);
    display: inline-block;
    height: 1.15rem;
    overflow: hidden;
    width: 1.15rem;
  }

  .language-flag--es {
    background: linear-gradient(180deg, #c60b1e 0 25%, #ffc400 25% 75%, #c60b1e 75% 100%);
  }

  .language-flag--ca {
    background: repeating-linear-gradient(180deg, #ffd447 0 12.5%, #c60b1e 12.5% 25%);
  }

  .language-flag--en {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='60' fill='%23012169'/%3E%3Cpath d='M0 0 60 60M60 0 0 60' stroke='%23fff' stroke-width='13'/%3E%3Cpath d='M0 0 60 60M60 0 0 60' stroke='%23C8102E' stroke-width='7'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23fff' stroke-width='20'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23C8102E' stroke-width='12'/%3E%3C/svg%3E");
    background-position: center;
    background-size: cover;
  }

  @media (min-width: 1024px) {
    .language-selector__desktop {
      display: block;
    }

    .language-selector__mobile {
      display: none;
    }

    .language-flag {
      height: 1rem;
      width: 1rem;
    }
  }
</style>
