<script>
  import { onMount } from 'svelte';
  import { getCopy, getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';

  let revealReady = false;

  /** @param {HTMLElement} node */
  function revealOnScroll(node) {
    if (!('IntersectionObserver' in window)) {
      node.dataset.visible = 'true';

      return {
        destroy() {}
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  onMount(() => {
    revealReady = true;
  });

  $: audienceCopy = getCopy($language).home.audience;
  $: audience = audienceCopy.items;
  $: whatsappHref = getWhatsAppHref($language);
  $: titlePrefixSeparator = audienceCopy.titleLine2Prefix.endsWith('’') ? '' : ' ';
</script>

<section
  class="relative bg-[#f8f4f0] pb-16 pt-10 md:pb-[5.5rem] md:pt-12"
  data-reveal-ready={revealReady ? 'true' : undefined}
>
  <div class="mx-auto max-w-6xl px-6 md:px-10">
    <header class="mx-auto mb-10 max-w-4xl text-center md:mb-12">
      <h2
        class="audience-title font-display-serif text-[2.05rem] leading-[1.04] font-medium tracking-[0] text-[color:var(--color-brand)] md:text-[48px]"
      >
        <span class="md:block">{audienceCopy.titleLine1}</span>
        <span class="md:block">
          <span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{audienceCopy.titleLine2Prefix}</span
          >{titlePrefixSeparator}<span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{audienceCopy.titleHighlight}</span
          ><span
            class="text-[#4083A7]"
            style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
            >{audienceCopy.titleSuffix}</span
          >
        </span>
      </h2>
      <p class="text-muted mt-4 text-[13px] font-light leading-relaxed md:text-base">
        {audienceCopy.subtitle}
      </p>
    </header>

    <div class="audience-grid grid gap-7 justify-items-center md:grid-cols-3 md:gap-4 lg:gap-5">
      {#each audience as item, i (item.letter)}
        <div use:revealOnScroll class="audience-reveal w-full" style={`--reveal-delay: ${i * 90}ms`}>
          <article
            class="audience-card mx-auto flex h-full w-full max-w-[19.6rem] flex-col rounded-[8px] border border-transparent bg-white px-3 py-3 text-center shadow-[0_14px_34px_rgba(14,29,38,0.10)] md:min-h-[20rem] md:max-w-[18.75rem] md:px-3.5 md:pb-3 md:pt-3.5"
          >
            <div
              class="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#8CD0D6] text-[1.65rem] text-[color:var(--color-brand)] md:h-11 md:w-11 md:text-[1.75rem]"
            >
              <span class="audience-letter font-display-serif">{item.letter}</span>
            </div>

            <h3
              class="audience-quote font-noto-serif mx-auto mt-3 min-h-[4.9rem] max-w-[17.4rem] text-[1.45rem] leading-[1.05] text-[color:var(--color-brand)] md:min-h-[5.1rem] md:max-w-[17.6rem] md:text-[1.54rem]"
            >
              {#if item.quoteLines}
                {#each item.quoteLines as line}
                  <span class="block">{line}</span>
                {/each}
              {:else}
                {item.quote}
              {/if}
            </h3>

            <div class="mx-auto mt-4 h-px w-[4.75rem] bg-[color:var(--color-brand-accent)]"></div>

            <p
              class="text-muted mx-auto mt-4 min-h-[3.15rem] max-w-[17.6rem] text-[13px] font-light leading-[1.38] md:min-h-[3.3rem] md:max-w-[17.8rem] md:text-[14px]"
            >
              {#each item.actionLines as line}
                <span class="block">{line}</span>
              {/each}
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              class="audience-button cta-arrow-button mt-5 inline-flex items-center justify-center gap-2.5 self-center rounded-full bg-[color:var(--color-brand-accent)] px-5 py-2.5 text-[13px] font-medium text-[color:var(--color-brand)] shadow-[0_6px_14px_rgba(14,29,38,0.12)] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out md:mt-4 md:px-[1.4rem] md:py-[0.8rem]"
            >
              <span class="audience-button-label">{audienceCopy.button}</span>
              <span class="cta-arrow-swap" aria-hidden="true">
                <svg class="cta-arrow-swap__right" viewBox="0 0 256 256" fill="currentColor">
                  <path
                    d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
                  ></path>
                </svg>
                <svg class="cta-arrow-swap__up" viewBox="0 0 256 256" fill="currentColor">
                  <path
                    d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"
                  ></path>
                </svg>
              </span>
            </a>
          </article>
        </div>
      {/each}
    </div>

    <div class="mx-auto mt-10 max-w-[30rem] text-center md:mt-12">
      <p
        use:revealOnScroll
        class="audience-fade leading-[1.35] text-[color:var(--color-brand)]"
        style="--reveal-delay: 0ms"
      >
        {#each audienceCopy.closingLines as line}
          <span class="block text-[20px] font-light">{line}</span>
        {/each}
      </p>
      <div
        use:revealOnScroll
        class="audience-fade my-4 flex justify-center md:my-5"
        style="--reveal-delay: 90ms"
        aria-hidden="true"
      >
        <img src="/download_130837.png" alt="" class="h-10 w-auto opacity-80 md:h-12" />
      </div>
      <p
        use:revealOnScroll
        class="audience-fade mt-2 text-[25px] leading-tight text-[color:var(--color-brand)]"
        style="--reveal-delay: 180ms"
      >
        <span class="font-light">{audienceCopy.autonomyPrefix}</span>{' '}
        <span class="font-bold">{audienceCopy.autonomyStrong}</span>
      </p>
    </div>
  </div>
</section>

<style>
  .audience-letter {
    display: block;
    line-height: 1;
    transform: translateY(-0.03em);
  }

  .audience-title,
  .audience-title * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  }

  .audience-quote,
  .audience-quote * {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif !important;
  }

  .audience-reveal {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }

  :global(section[data-reveal-ready='true'] .audience-reveal:not([data-visible='true'])) {
    opacity: 0;
    transform: translate3d(-18px, 22px, 0);
  }

  :global(.audience-reveal[data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .audience-fade {
    transition: opacity 520ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }

  :global(section[data-reveal-ready='true'] .audience-fade:not([data-visible='true'])) {
    opacity: 0;
  }

  :global(.audience-fade[data-visible='true']) {
    opacity: 1;
  }

  .audience-card {
    transition:
      transform 300ms ease-out,
      border-color 300ms ease-out,
      box-shadow 300ms ease-out;
  }

  .audience-card:hover {
    border-color: var(--color-brand-accent);
    box-shadow: 0 18px 42px rgba(14, 29, 38, 0.14);
    transform: translateY(-4px) scale(1.02);
  }

  @media (hover: hover) {
    .audience-grid:has(.audience-card:hover) .audience-card:not(:hover) {
      filter: saturate(0.85);
      opacity: 0.38;
      transform: scale(0.988);
    }
  }

  .audience-button {
    overflow: hidden;
    position: relative;
  }

  .audience-button::before {
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

  .audience-button-label {
    position: relative;
    z-index: 1;
  }

  .audience-card:hover .audience-button,
  .audience-button:hover {
    background: #4083a7;
    box-shadow: 0 9px 18px rgba(14, 29, 38, 0.16);
    color: #ffffff;
    font-weight: 700;
    transform: translateY(-1px);
  }

  .audience-card:hover .audience-button::before,
  .audience-button:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .audience-card:hover .audience-button :global(.cta-arrow-swap__right) {
    opacity: 0;
    transform: translate3d(0.12rem, -0.12rem, 0) scale(0.88);
  }

  .audience-card:hover .audience-button :global(.cta-arrow-swap__up) {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .audience-reveal,
    .audience-fade,
    .audience-card,
    .audience-button,
    .audience-button::before {
      transition: none;
    }
  }
</style>
