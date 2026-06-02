<script>
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getProgramCopy } from '$lib/i18n/program';
  /** @param {HTMLElement} node */
  function revealOnScroll(node) {
    requestAnimationFrame(() => {
      node.dataset.ready = 'true';
      node.dataset.visible = 'false';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.dataset.visible = entry.isIntersecting ? 'true' : 'false';
      },
      { threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  /** @param {HTMLElement} node */
  function htmlContent(node, value) {
    node.innerHTML = value;

    return {
      update(nextValue) {
        node.innerHTML = nextValue;
      }
    };
  }

  $: stepsCopy = getProgramCopy($language).steps;
  $: steps = stepsCopy.items;
  $: whatsappHref = getWhatsAppHref($language);

  const iconPaths = {
    call: 'M144.27,45.93a8,8,0,0,1,9.8-5.66,86.22,86.22,0,0,1,61.66,61.66,8,8,0,0,1-5.66,9.8A8.23,8.23,0,0,1,208,112a8,8,0,0,1-7.73-5.93,70.35,70.35,0,0,0-50.33-50.34A8,8,0,0,1,144.27,45.93Zm-2.33,41.8c13.79,3.68,22.65,12.55,26.33,26.34A8,8,0,0,0,176,120a8.23,8.23,0,0,0,2.07-.27,8,8,0,0,0,5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8,8,0,1,0-4.13,15.46Zm72.43,78.73-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L126.87,168c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L89.54,41.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,24,88c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,214.37,166.46Z',
    home: 'M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z',
    phone: 'M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72Zm8,120a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z',
    checklist: 'M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z',
    support: 'M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z'
  };
</script>

<section id="program-steps" class="relative bg-[#f8f4f0] py-16 md:py-20">
  {#key $language}
    <div class="mx-auto grid max-w-6xl gap-10 px-6 md:px-10 lg:grid-cols-[minmax(18rem,24rem)_1fr] lg:gap-12">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <div class="mx-auto max-w-[23rem] text-center lg:mx-0 lg:text-left">
          <h2
            class="font-display-serif text-[2.4rem] font-medium leading-[0.98] tracking-[0] text-[color:var(--color-brand)] md:text-[50px]"
          >
            {stepsCopy.headingPrefix} <span class="font-display-serif text-[#4083A7]">{stepsCopy.headingHighlight}</span>
          </h2>

          <p class="mt-6 text-[16px] font-light leading-[1.6] text-[color:var(--color-brand)]/82">
            {stepsCopy.intro}
          </p>

          <div class="mt-8 flex justify-center">
            <div
              class="inline-flex items-center justify-center gap-3 rounded-full bg-[#E8E8F6] px-6 py-3 text-[15px] font-medium text-[#245B7D] shadow-[0_8px_18px_rgba(14,29,38,0.08)]"
            >
              <span class="material-symbols-rounded !text-[20px]">calendar_month</span>
              {stepsCopy.badge}
            </div>
          </div>

          <div class="mt-10 space-y-4 text-[16px] leading-[1.75] text-[color:var(--color-brand)]/82">
            {#each stepsCopy.sideParagraphs as paragraph}
              <p use:htmlContent={paragraph}></p>
            {/each}
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="program-line hidden lg:block" aria-hidden="true"></div>

        <div class="space-y-10 lg:space-y-7">
          {#each steps as step, index}
            <article
              use:revealOnScroll
              class="program-step relative"
              style={`--reveal-delay:${index * 120}ms`}
            >
              <div class="program-step__point hidden lg:flex" aria-hidden="true">
                {step.number}
              </div>

              <div
                class="program-step__point-mobile flex h-[3.7rem] w-[3.7rem] items-center justify-center rounded-full border border-[#D5D7EF] bg-[#E8E8F6] text-[26px] font-light text-[#245B7D] shadow-[0_6px_16px_rgba(14,29,38,0.05)] lg:hidden"
                aria-hidden="true"
              >
                {step.number}
              </div>

              <div
                class="program-step__card rounded-[14px] bg-white p-5 shadow-[0_16px_36px_rgba(14,29,38,0.08)] md:p-6"
              >
                <div
                  class="flex h-[2.9rem] w-[2.9rem] items-center justify-center text-[#233F4E]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 256 256" class="h-[2.2rem] w-[2.2rem] fill-current">
                    <path d={iconPaths[step.icon]}></path>
                  </svg>
                </div>

                <h3
                  class="mt-3 text-[22px] leading-[1.2] font-semibold text-[#233F4E]"
                  style="font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;"
                >
                  {step.title}
                </h3>
                <p
                  use:htmlContent={step.body}
                  class="mt-3 text-[16px] font-light leading-[1.65] text-[#245B7D]"
                ></p>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </div>

    <div class="mx-auto mt-12 max-w-4xl px-6 text-center md:mt-16 md:px-10">
      <p
        use:htmlContent={stepsCopy.closing}
        class="text-[16px] font-light leading-[1.65] text-[#233F4E]"
      ></p>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        class="program-cta cta-arrow-button mt-5 inline-flex items-center justify-center rounded-full bg-[#8CD0D6] px-6 py-3 text-[15px] font-medium text-[#233F4E] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-[#4083A7] hover:font-bold hover:text-white hover:shadow-[0_10px_24px_rgba(64,131,167,0.28)]"
      >
        <span class="program-cta__label">{stepsCopy.cta}</span>
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
    </div>
  {/key}
</section>

<style>
  #program-steps {
    scroll-margin-top: 2.5rem;
  }

  .program-step {
    overflow: visible;
    transition:
      opacity 780ms ease-out,
      transform 780ms ease-out,
      box-shadow 250ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }

  .program-step :global(strong) {
    font-weight: 700;
    color: #245b7d;
  }

  .program-step__point-mobile {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -46%);
  }

  .program-step__card {
    margin-top: 2.2rem;
    padding-top: 2.2rem;
  }

  .program-cta {
    isolation: isolate;
    overflow: hidden;
    position: relative;
  }

  .program-cta::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(-180%) skewX(-18deg);
    transition: transform 420ms ease-out;
    width: 44%;
    z-index: 0;
  }

  .program-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .program-cta__label {
    position: relative;
    z-index: 1;
  }

  :global(.program-step[data-ready='true'][data-visible='false']) {
    opacity: 0;
    transform: translate3d(0, 22px, 0);
  }

  :global(.program-step[data-ready='true'][data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: 1024px) {
    .program-step {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }

    :global(.program-step[data-ready='true']) {
      opacity: 1 !important;
      transform: none !important;
    }

    :global(.program-step[data-ready='true'][data-visible='false']) {
      opacity: 1 !important;
      transform: none !important;
    }

    .program-step__card {
      transition:
        opacity 780ms ease-out,
        transform 780ms ease-out;
      transition-delay: var(--reveal-delay, 0ms);
    }

    :global(.program-step[data-ready='true'][data-visible='false']) .program-step__card {
      opacity: 0;
      transform: translate3d(0, 22px, 0);
    }

    :global(.program-step[data-ready='true'][data-visible='true']) .program-step__card {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    .program-line {
      position: absolute;
      left: 2.125rem;
      top: 2.2rem;
      bottom: 2.2rem;
      width: 2px;
      background: #8cd0d6;
      opacity: 0.82;
    }

    .program-step {
      padding-left: 6.2rem;
    }

    .program-step__point {
      position: absolute;
      top: 50%;
      left: 0.15rem;
      z-index: 2;
      height: 3.95rem;
      width: 3.95rem;
      transform: translateY(-50%);
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: 1px solid #d5d7ef;
      background: #e8e8f6;
      color: #245b7d;
      box-shadow: 0 6px 16px rgba(14, 29, 38, 0.05);
      font-size: 30px;
      font-weight: 300;
      line-height: 1;
    }

    .program-step__card {
      margin-top: 0;
      padding-top: 1.5rem;
    }
  }
</style>

