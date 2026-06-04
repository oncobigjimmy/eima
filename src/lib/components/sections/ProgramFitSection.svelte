<script>
  import { language } from '$lib/i18n/language';
  import { getProgramCopy } from '$lib/i18n/program';

  /** @param {HTMLElement} node */
  function revealOnScroll(node) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  $: fitCopy = getProgramCopy($language).fit;
  $: yesItems = fitCopy.yesItems;
  $: noItems = fitCopy.noItems;
  $: highlightWords = fitCopy.titleHighlight.split(' ');
  $: firstHighlightWord = highlightWords[0];
  $: remainingHighlightWords = highlightWords.slice(1).join(' ');
  $: firstTwoHighlightWords = highlightWords.slice(0, 2).join(' ');
  $: secondAndThirdHighlightWords = highlightWords.slice(1, 3).join(' ');
  $: remainingAfterSecondHighlightWords = highlightWords.slice(2).join(' ');
  $: remainingAfterThirdHighlightWords = highlightWords.slice(3).join(' ');
  $: titlePrefixWithoutThis = fitCopy.titlePrefix.replace(/ this$/, '');
</script>

<section class="program-fit-section bg-[#f8f4f0] pb-10 pt-9 md:pb-14 md:pt-12">
  <div class="mx-auto mb-8 max-w-4xl px-6 text-center md:mb-10 md:px-10">
    <p class="text-[16px] font-normal leading-relaxed text-[#233F4E]/78">
      {fitCopy.eyebrow}
    </p>

    <h2
      class="program-fit-title mx-auto mt-3 max-w-[22rem] font-display-serif text-[33px] font-medium leading-[1.04] tracking-[0] text-[#233F4E] md:max-w-none md:text-[48px]"
      style="font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;"
    >
      <span class="md:hidden">
        {#if $language === 'ca'}
          {fitCopy.titlePrefix}<br />
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{firstTwoHighlightWords}</span
          ><br />
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{remainingAfterSecondHighlightWords}</span
          >
        {:else if $language === 'en'}
          {titlePrefixWithoutThis}<br />
          this{' '}
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{firstHighlightWord}</span
          ><br />
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{remainingHighlightWords}</span
          >
        {:else}
          {fitCopy.titlePrefix}{' '}
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{firstHighlightWord}</span
          ><br />
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{remainingHighlightWords}</span
          >
        {/if}
      </span>

      <span class="hidden md:inline">
        {#if $language === 'es'}
          {fitCopy.titlePrefix}{' '}
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{firstHighlightWord}</span
          ><br />
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{remainingHighlightWords}</span
          >
        {:else}
          {fitCopy.titlePrefix}
          {#if $language === 'en'}<br class="hidden md:block" /><span class="md:hidden"> </span>{:else}{' '}{/if}
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{fitCopy.titleHighlight}</span
          >
        {/if}
      </span>
    </h2>
  </div>

  <div class="mx-auto grid max-w-6xl gap-8 px-6 md:px-10 lg:grid-cols-2 lg:gap-10">
    <article
      use:revealOnScroll
      class="fit-reveal fit-card fit-card--yes w-full max-w-[34rem] justify-self-center rounded-[14px] bg-white p-7 shadow-[0_16px_36px_rgba(14,29,38,0.08)] transition-[transform,box-shadow,opacity,filter] duration-300 ease-out md:p-8"
      style="--reveal-delay: 0ms"
    >
      <div class="fit-card__inner">
        <div class="flex items-center gap-5">
          <div
            class="fit-card__icon-wrap flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#E7F3E8] text-[#3F8A57]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" class="h-10 w-10 fill-none stroke-current stroke-[2.4]">
              <path d="M5 12.5 9.2 16.7 19 6.9" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>

          <div>
            <h3 class="fit-card__title text-[25px] leading-[1.05] text-[#233F4E]">
              <span
                class="font-display-serif"
                style="font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;"
                >{@html fitCopy.yesTitle}</span
              >
            </h3>
            <div class="fit-card__line mt-3 h-px w-18 bg-[#9FD2AB]"></div>
          </div>
        </div>

        <ul class="mt-7 space-y-4">
          {#each yesItems as item}
            <li class="fit-card__item grid grid-cols-[1.9rem_1fr] items-start gap-3 text-[15px] leading-[1.65] text-[#245B7D]">
              <span class="fit-card__bullet self-center text-[#59A873]" aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-[1.65rem] w-[1.65rem] fill-none stroke-current stroke-[2.2]">
                  <circle cx="12" cy="12" r="8.2"></circle>
                  <path d="M8.4 12.3 10.8 14.7 15.8 9.7" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </span>
              <span>{@html item}</span>
            </li>
          {/each}
        </ul>
      </div>
    </article>

    <article
      use:revealOnScroll
      class="fit-reveal fit-card fit-card--no w-full max-w-[34rem] justify-self-center rounded-[14px] bg-white p-7 shadow-[0_16px_36px_rgba(14,29,38,0.08)] transition-[transform,box-shadow,opacity,filter] duration-300 ease-out md:p-8"
      style="--reveal-delay: 120ms"
    >
      <div class="fit-card__inner">
        <div class="flex items-center gap-5">
          <div
            class="fit-card__icon-wrap flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#FCE4E4] text-[#C64A4A]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" class="h-10 w-10 fill-none stroke-current stroke-[2.4]">
              <path d="M7 7 17 17" stroke-linecap="round"></path>
              <path d="M17 7 7 17" stroke-linecap="round"></path>
            </svg>
          </div>

          <div>
            <h3 class="fit-card__title text-[23px] leading-[1.05] text-[#233F4E] md:text-[25px]">
              <span
                class="font-display-serif"
                style="font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;"
                >{@html fitCopy.noTitle}</span
              >
            </h3>
            <div class="fit-card__line mt-3 h-px w-18 bg-[#F3B1B1]"></div>
          </div>
        </div>

        <ul class="mt-7 space-y-4">
          {#each noItems as item}
            <li class="fit-card__item grid grid-cols-[1.9rem_1fr] items-start gap-3 text-[15px] leading-[1.65] text-[#245B7D]">
              <span class="fit-card__bullet self-center text-[#D55B5B]" aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-[1.65rem] w-[1.65rem] fill-none stroke-current stroke-[2.2]">
                  <circle cx="12" cy="12" r="8.2"></circle>
                  <path d="M9 9 15 15" stroke-linecap="round"></path>
                  <path d="M15 9 9 15" stroke-linecap="round"></path>
                </svg>
              </span>
              <span>{@html item}</span>
            </li>
          {/each}
        </ul>
      </div>
    </article>
  </div>
</section>

<style>
  .fit-card {
    overflow: hidden;
    position: relative;
  }

  .program-fit-title,
  .program-fit-title * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  }

  .fit-reveal {
    opacity: 0;
    transform: translate3d(0, 26px, 0);
    transition:
      opacity 620ms ease-out,
      transform 620ms ease-out,
      box-shadow 300ms ease-out,
      filter 300ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }

  :global(.fit-reveal[data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .fit-card::before {
    background-image: var(--card-image);
    background-position: center;
    background-size: cover;
    content: '';
    inset: 0;
    opacity: 0;
    position: absolute;
    transform: scale(1.04);
    transition:
      opacity 320ms ease-out,
      transform 420ms ease-out;
    z-index: 0;
  }

  .fit-card::after {
    background: linear-gradient(180deg, rgba(18, 31, 41, 0.58) 0%, rgba(18, 31, 41, 0.72) 100%);
    content: '';
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 320ms ease-out;
    z-index: 0;
  }

  .fit-card--yes {
    --card-image: url('/estirar-consciente-50.png');
  }

  .fit-card--no {
    --card-image: url('/dependencia-sistema-50.png');
  }

  .fit-card__inner {
    position: relative;
    z-index: 1;
  }

  .fit-card__title,
  .fit-card__title * {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif !important;
  }

  .fit-card:hover {
    box-shadow: 0 22px 46px rgba(14, 29, 38, 0.14);
    transform: translateY(-6px) scale(1.015);
  }

  .fit-card:hover::before,
  .fit-card:hover::after {
    opacity: 1;
  }

  .fit-card:hover::before {
    transform: scale(1);
  }

  .fit-card:hover .fit-card__title,
  .fit-card:hover .fit-card__item,
  .fit-card:hover .fit-card__item :global(em) {
    color: #ffffff;
  }

  .fit-card:hover .fit-card__line {
    background: rgba(255, 255, 255, 0.7);
  }

  .fit-card:hover .fit-card__icon-wrap {
    background: rgba(255, 255, 255, 0.18);
    color: #ffffff;
  }

  .fit-card:hover .fit-card__bullet {
    color: rgba(255, 255, 255, 0.92);
  }

  @media (hover: hover) {
    .program-fit-section:has(.fit-card:hover) .fit-card:not(:hover) {
      filter: saturate(0.85);
      opacity: 0.38;
      transform: scale(0.988);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fit-reveal,
    .fit-card,
    .fit-card::before,
    .fit-card::after {
      transition: none;
    }

    .fit-reveal {
      opacity: 1;
      transform: none;
    }
  }
</style>
