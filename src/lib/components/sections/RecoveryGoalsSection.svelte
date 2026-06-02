<script>
  import { onMount } from 'svelte';
  import { getCopy } from '$lib/i18n/copy';
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

  $: recoveryCopy = getCopy($language).home.recovery;
  $: goals = recoveryCopy.goals;
</script>

<section
  class="relative bg-[#f8f4f0] pb-18 pt-16 md:pb-22 md:pt-18"
  data-reveal-ready={revealReady ? 'true' : undefined}
>
  <div class="mx-auto max-w-6xl px-6 md:px-10">
    <header class="mx-auto max-w-4xl text-center">
      <h2
        class="recovery-heading font-display-serif text-[1.9rem] leading-[1.04] font-medium tracking-[0] text-[color:var(--color-brand)] md:text-[48px]"
      >
        <span class="block md:inline">{recoveryCopy.headingBefore}</span>
        <span
          class="block text-[#4083A7] md:inline"
          style="font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;"
          >{recoveryCopy.headingHighlight}</span
        >
        <span class="sr-only">{recoveryCopy.srTitle}</span>
      </h2>
      <p
        class="text-muted mx-auto mt-4 max-w-4xl text-[13px] font-light leading-relaxed md:text-base"
      >
        {recoveryCopy.intro}
        <br class="hidden md:block" />
        {recoveryCopy.introSecond}
      </p>
    </header>

    <div
      use:revealOnScroll
      class="recovery-drop mt-10 flex justify-center md:mt-12"
      style="--reveal-delay: 0ms"
    >
      <div
        class="w-full max-w-[20.75rem] rounded-[8px] bg-white px-5 py-5 text-center shadow-[0_14px_34px_rgba(14,29,38,0.10)] md:max-w-none md:px-6"
      >
        <p
          class="recovery-goals-title text-[22px] font-light leading-tight text-[#4083A7] md:text-[36px]"
          aria-label="Las 3R de tu recuperación"
        >
          <span>{recoveryCopy.titlePrefix}&nbsp;</span><span class="font-bold text-[#233F4E]">{recoveryCopy.titleStrong}</span><span
            >&nbsp;{recoveryCopy.titleSuffix}</span
          >
        </p>
      </div>
    </div>

    <div class="mt-8 grid gap-8 md:mt-9 md:grid-cols-3 md:gap-7 lg:gap-8">
      {#each goals as goal, i (goal.title)}
        <article
          use:revealOnScroll
          class="recovery-rise recovery-card mx-auto w-full max-w-[20.75rem] rounded-[10px] border border-transparent bg-white px-5 pb-5 pt-6 text-center shadow-[0_16px_38px_rgba(14,29,38,0.08)] transition-[border-color,box-shadow,transform] duration-300 ease-out md:max-w-none md:px-6 md:pb-6 md:pt-7"
          style={`--reveal-delay: ${90 + i * 90}ms`}
        >
          <div
            class="mx-auto mb-5 grid h-[5.4rem] w-[5.4rem] place-items-center rounded-full border border-[#8CD0D6] bg-[#EAF8FA] shadow-[0_8px_18px_rgba(14,29,38,0.08)] md:mb-6 md:h-[6.4rem] md:w-[6.4rem]"
            aria-hidden="true"
          >
            <div
              class="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-[#8CD0D6] bg-[#DDF5F8] text-[#1C8CAB] md:h-[5.4rem] md:w-[5.4rem]"
            >
              {#if goal.icon === 'reduce'}
                <svg class="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                  <path
                    d="M50.34,117.66a8,8,0,0,1,11.32-11.32L120,164.69V32a8,8,0,0,1,16,0V164.69l58.34-58.35a8,8,0,0,1,11.32,11.32l-72,72a8,8,0,0,1-11.32,0ZM216,208H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
                  ></path>
                </svg>
              {:else if goal.icon === 'recover'}
                <svg class="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                  <path
                    d="M240,56v64a8,8,0,0,1-16,0V75.31l-82.34,82.35a8,8,0,0,1-11.32,0L96,123.31,29.66,189.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0L136,140.69,212.69,64H168a8,8,0,0,1,0-16h64A8,8,0,0,1,240,56Z"
                  ></path>
                </svg>
              {:else}
                <svg class="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                  <path
                    d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z"
                  ></path>
                </svg>
              {/if}
            </div>
          </div>

          <h3 class="recovery-goal-heading font-noto-serif leading-none text-[color:var(--color-brand)]">
            {goal.title}
            <span class="sr-only"> {goal.subtitle}</span>
          </h3>
          <p class="mt-4 text-[14px] font-medium leading-[1.45] text-[#4083A7] md:text-[15px]">
            {goal.subtitle}
          </p>

          <div class="mx-auto mt-5 h-px w-[10rem] bg-[#8CD0D6] md:w-[11rem]"></div>

          <p
            class="mx-auto mt-5 max-w-[16rem] text-[14px] font-light leading-[1.55] text-[color:var(--color-brand)]/84 md:max-w-[17rem]"
          >
            {goal.body}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .recovery-drop {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }

  :global(section[data-reveal-ready='true'] .recovery-drop:not([data-visible='true'])) {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }

  :global(.recovery-drop[data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .recovery-rise {
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }

  :global(section[data-reveal-ready='true'] .recovery-rise:not([data-visible='true'])) {
    opacity: 0;
    transform: translate3d(0, 22px, 0);
  }

  :global(.recovery-rise[data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .recovery-goals-title,
  .recovery-goals-title * {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif !important;
  }

  .recovery-heading,
  .recovery-heading * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  }

  .recovery-goal-heading {
    font-size: 36px;
  }

  .recovery-goal-heading::first-letter {
    font-size: 40px;
    font-weight: 700;
  }

  @media (hover: hover) {
    .recovery-card:hover {
      border-color: #8cd0d6;
      box-shadow: 0 22px 48px rgba(14, 29, 38, 0.16);
      transform: translate3d(0, -6px, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .recovery-drop,
    .recovery-rise,
    .recovery-card {
      transition: none;
    }
  }
</style>
