<script lang="ts">
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';
  import { page } from '$app/stores';
  import { LANGUAGES, type Language } from '$lib/i18n/copy';
  import { language, setLanguage } from '$lib/i18n/language';
  import { getLanguageFromPath, getLocalizedHash, getLocalizedPath } from '$lib/i18n/routes';

  export let light = false;
  export let compact = false;
  export let onSelect = () => {};

  let dropdownOpen = false;
  let selector: HTMLDivElement;
  let trigger: HTMLButtonElement;

  async function openDropdown(last = false) {
    dropdownOpen = true;
    await tick();
    const items = selector.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    items[last ? items.length - 1 : 0]?.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && dropdownOpen) {
      event.preventDefault();
      event.stopPropagation();
      dropdownOpen = false;
      trigger.focus();
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      if (!dropdownOpen && event.target === trigger && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        openDropdown(event.key === 'ArrowUp');
      } else if (dropdownOpen) {
        event.preventDefault();
        const items = [...selector.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')];
        const index = items.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 :
          (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items[next]?.focus();
      }
    }
  }

  function handleFocusout(event: FocusEvent) {
    if (!(event.relatedTarget instanceof Node) || !selector.contains(event.relatedTarget)) closeDropdown();
  }

  $: pathname = $page.url.pathname;
  $: routeLanguage = getLanguageFromPath(pathname);
  $: currentLanguageCode = routeLanguage ?? $language;
  $: currentLanguage = LANGUAGES.find((item) => item.code === currentLanguageCode) ?? LANGUAGES[0];

  function chooseLanguage(nextLanguage: Language) {
    const nextPath = getLocalizedPath(pathname, nextLanguage);
    const nextHash = getLocalizedHash($page.url.hash, nextLanguage);
    const nextUrl = `${nextPath}${$page.url.search}${nextHash}`;
    const currentUrl = `${$page.url.pathname}${$page.url.search}${$page.url.hash}`;

    setLanguage(nextLanguage);
    dropdownOpen = false;
    trigger?.focus();
    onSelect();

    if (nextUrl !== currentUrl) {
      goto(nextUrl, { noScroll: true, keepFocus: true });
    }
  }

  function closeDropdown() {
    dropdownOpen = false;
  }
</script>

<svelte:window on:click={closeDropdown} />

  <div
    bind:this={selector}
    role="group"
    on:focusout={handleFocusout}
    class="language-selector flex items-center gap-1.5"
    class:language-selector--compact={compact}
    class:language-selector--light={light}
    aria-label={currentLanguageCode === 'en' ? 'Language' : 'Idioma'}
  >
    <div class="language-selector__mobile flex items-center gap-2">
      {#each LANGUAGES as item (item.code)}
        <button
          type="button"
          class="language-selector__button inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-light transition-[background-color,color,border-color,opacity,text-shadow] duration-200 hover:opacity-90
            {light
              ? 'border-white/45 text-white'
              : 'border-[color:var(--color-brand)]/18 text-[color:var(--color-brand)]'}
            {currentLanguageCode === item.code
              ? light
                ? 'bg-white/18 font-medium'
                : 'bg-[color:var(--color-brand-accent)] font-medium'
              : light
                ? 'bg-white/5'
                : 'bg-white/45'}"
          aria-pressed={currentLanguageCode === item.code}
          aria-label={`${currentLanguageCode === 'en' ? 'Change language to' : currentLanguageCode === 'ca' ? 'Canvia l’idioma a' : 'Cambiar idioma a'} ${item.name}`}
          on:click={() => chooseLanguage(item.code)}
        >
          <span class={`language-flag language-flag--${item.code}`} aria-hidden="true"></span>
          <span>{item.label}</span>
        </button>
      {/each}
    </div>

    <div class="language-selector__desktop relative">
      <button
        bind:this={trigger}
        on:keydown={handleKeydown}
        type="button"
        class="language-selector__trigger inline-flex min-w-[8.2rem] items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-[12px] font-medium tracking-[0.02em] transition-[background-color,color,border-color,opacity,text-shadow] duration-200 hover:opacity-90
          {light
            ? 'border-white/45 bg-white/8 text-white'
            : 'border-[color:var(--color-brand)]/18 bg-white/60 text-[color:var(--color-brand)]'}"
        aria-haspopup="menu"
        aria-expanded={dropdownOpen}
        on:click|stopPropagation={() => dropdownOpen ? closeDropdown() : openDropdown()}
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
                {currentLanguageCode === item.code ? 'bg-[#8CD0D6] font-medium' : ''}"
              role="menuitemradio"
              on:keydown={handleKeydown}
              aria-checked={currentLanguageCode === item.code}
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

<style>
  .language-selector--light .language-selector__button,
  .language-selector--light .language-selector__trigger {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.48), 0 3px 8px rgba(0, 0, 0, 0.28);
  }

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
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg' shape-rendering='crispEdges'%3E%3Crect width='72' height='72' fill='%23ffd447'/%3E%3Crect y='8' width='72' height='8' fill='%23c60b1e'/%3E%3Crect y='24' width='72' height='8' fill='%23c60b1e'/%3E%3Crect y='40' width='72' height='8' fill='%23c60b1e'/%3E%3Crect y='56' width='72' height='8' fill='%23c60b1e'/%3E%3C/svg%3E");
    background-position: center;
    background-size: cover;
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
