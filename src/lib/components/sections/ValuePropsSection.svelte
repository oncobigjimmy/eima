<script>
  import { afterUpdate, onMount } from 'svelte';
  import { getCopy } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getRoutePath } from '$lib/i18n/routes';

  /** @param {HTMLElement} node */
  function revealOnScroll(node) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  /**
   * @param {HTMLElement} node
   * @param {string} value
   */
  function htmlContent(node, value) {
    node.innerHTML = value;

    return {
      /** @param {string} nextValue */
      update(nextValue) {
        node.innerHTML = nextValue;
      }
    };
  }

  let timelineRoot;
  let timelineLine;
  let timelineProgress;
  let requestTimelineUpdate;

  $: valueCopy = getCopy($language).home.valueProps;
  $: steps = valueCopy.steps;
  $: programHref = `${getRoutePath('program', $language)}#program-steps`;

  afterUpdate(() => {
    requestTimelineUpdate?.();
  });

  onMount(() => {
    if (!timelineRoot || !timelineLine || !timelineProgress) return;

    const getAbsTop = (element) => element.getBoundingClientRect().top + window.pageYOffset;
    let ticking = false;
    let resizeObserver;

    const updateLineBounds = () => {
      const items = Array.from(timelineRoot.querySelectorAll('.js-timeline-item'));
      if (!items.length) return;

      const firstPoint = items[0]?.querySelector('.js-timeline-point');
      const lastPoint = items[items.length - 1]?.querySelector('.js-timeline-point');
      if (!firstPoint || !lastPoint) return;

      const rootTop = getAbsTop(timelineRoot);
      const firstTop = getAbsTop(firstPoint);
      const lastTop = getAbsTop(lastPoint);
      const rootBottom = rootTop + timelineRoot.offsetHeight;

      const firstOffset = firstTop - rootTop + firstPoint.offsetHeight / 2;
      const lastOffset = rootBottom - (lastTop + lastPoint.offsetHeight / 2);

      timelineLine.style.top = `${firstOffset}px`;
      timelineLine.style.bottom = `${lastOffset}px`;
    };

    const updateProgressAndStates = () => {
      const items = Array.from(timelineRoot.querySelectorAll('.js-timeline-item'));
      if (!items.length) return;

      const scrollTop = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const lastPoint = items[items.length - 1]?.querySelector('.js-timeline-point');
      if (!lastPoint) return;

      const lastPointTop = getAbsTop(lastPoint);
      const progressTop = getAbsTop(timelineProgress);
      let height = scrollTop - progressTop + viewportHeight / 2;

      if (lastPointTop <= scrollTop + viewportHeight / 2) {
        height = lastPointTop - progressTop;
      }

      timelineProgress.style.height = `${Math.max(0, height)}px`;

      items.forEach((item, index) => {
        const point = item.querySelector('.js-timeline-point');
        if (!point) return;
        const pointTop = getAbsTop(point);
        const isActive = pointTop < scrollTop + viewportHeight * 0.5;
        const isShown = pointTop < scrollTop + viewportHeight * 0.9;

        item.classList.toggle('js-is-active', isActive);
        item.classList.toggle('js-is-show', isShown);
      });
    };

    const update = () => {
      ticking = false;
      updateLineBounds();
      updateProgressAndStates();
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    requestTimelineUpdate = requestUpdate;
    requestUpdate();
    requestAnimationFrame(requestUpdate);
    setTimeout(requestUpdate, 60);
    setTimeout(requestUpdate, 220);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('orientationchange', requestUpdate);
    window.addEventListener('load', requestUpdate);

    resizeObserver = new ResizeObserver(() => requestUpdate());
    resizeObserver.observe(timelineRoot);

    return () => {
      requestTimelineUpdate = undefined;
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('orientationchange', requestUpdate);
      window.removeEventListener('load', requestUpdate);
      resizeObserver?.disconnect();
    };
  });
</script>

<section class="relative bg-[#f8f4f0] pb-24 pt-10 md:pb-28 md:pt-14">
  <div class="mx-auto max-w-6xl px-6 md:px-10">
    <header class="mx-auto max-w-4xl pb-8 text-center md:pb-10">
      <h2
        class="font-display-serif text-[2.2rem] leading-[1.04] font-medium tracking-[0] text-[color:var(--color-brand)] md:text-[48px]"
      >
        {#if $language === 'ca'}
          {valueCopy.headingBefore}
          <span style="color: #4083A7; font-family: inherit; font-size: inherit; font-weight: inherit;"
            >{valueCopy.headingHighlight1}</span
          >, sense descuidar<br class="hidden md:block" />
          la teva
          <span style="color: #4083A7; font-family: inherit; font-size: inherit; font-weight: inherit;"
            >{valueCopy.headingHighlight2}</span
          >
        {:else}
          {valueCopy.headingBefore}
          <span style="color: #4083A7; font-family: inherit; font-size: inherit; font-weight: inherit;"
            >{valueCopy.headingHighlight1}</span
          >{valueCopy.headingMiddle}{' '}
          <span style="color: #4083A7; font-family: inherit; font-size: inherit; font-weight: inherit;"
            >{valueCopy.headingHighlight2}</span
          >
        {/if}
      </h2>

      <p class="text-muted mx-auto mt-4 max-w-4xl text-[13px] font-light leading-relaxed md:text-base">
        <span use:htmlContent={valueCopy.intro}></span>
      </p>
    </header>

    <div bind:this={timelineRoot} class="timeline mt-24 md:mt-28">
      <div bind:this={timelineLine} class="timeline__line">
        <div bind:this={timelineProgress} class="timeline__line-progress"></div>
      </div>

      <div class="timeline__list">
        {#each steps as step, index (step.title)}
          <article class={`timeline__item js-timeline-item ${index % 2 === 1 ? 'timeline__item--reverse' : ''}`}>
            <div class="timeline__card">
              <div class="timeline__card-inner">
                <div class="timeline__card-content">
                  <div class="timeline__card-titlebar">
                    <h3 class="timeline__card-title">{step.title}</h3>
                  </div>
                  <div class="timeline__card-body">
                    {#each step.bodyLines as line}
                      <p class="timeline__card-paragraph" use:htmlContent={line}></p>
                    {/each}
                  </div>
                </div>
              </div>
              <div class="timeline__card-arrow" aria-hidden="true"></div>
            </div>

            <div class="timeline__point js-timeline-point">
              <div class="timeline__point-content" aria-hidden="true">
                {#if step.icon === 'list'}
                  <svg class="timeline__point-icon" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"></path>
                  </svg>
                {:else if step.icon === 'support'}
                  <svg class="timeline__point-icon" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M254.3,107.91,228.78,56.85a16,16,0,0,0-21.47-7.15L182.44,62.13,130.05,48.27a8.14,8.14,0,0,0-4.1,0L73.56,62.13,48.69,49.7a16,16,0,0,0-21.47,7.15L1.7,107.9a16,16,0,0,0,7.15,21.47l27,13.51,55.49,39.63a8.06,8.06,0,0,0,2.71,1.25l64,16a8,8,0,0,0,7.6-2.1l55.07-55.08,26.42-13.21a16,16,0,0,0,7.15-21.46Zm-54.89,33.37L165,113.72a8,8,0,0,0-10.68.61C136.51,132.27,116.66,130,104,122L147.24,80h31.81l27.21,54.41ZM41.53,64,62,74.22,36.43,125.27,16,115.06Zm116,119.13L99.42,168.61l-49.2-35.14,28-56L128,64.28l9.8,2.59-45,43.68-.08.09a16,16,0,0,0,2.72,24.81c20.56,13.13,45.37,11,64.91-5L188,152.66Zm62-57.87-25.52-51L214.47,64,240,115.06Zm-87.75,92.67a8,8,0,0,1-7.75,6.06,8.13,8.13,0,0,1-1.95-.24L80.41,213.33a7.89,7.89,0,0,1-2.71-1.25L51.35,193.26a8,8,0,0,1,9.3-13l25.11,17.94L126,208.24A8,8,0,0,1,131.82,217.94Z"></path>
                  </svg>
                {:else if step.icon === 'car'}
                  <svg class="timeline__point-icon" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M240,112H211.31L168,68.69A15.86,15.86,0,0,0,156.69,64H44.28A16,16,0,0,0,31,71.12L1.34,115.56A8.07,8.07,0,0,0,0,120v48a16,16,0,0,0,16,16H33a32,32,0,0,0,62,0h66a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V128A16,16,0,0,0,240,112ZM44.28,80H156.69l32,32H23ZM64,192a16,16,0,1,1,16-16A16,16,0,0,1,64,192Zm128,0a16,16,0,1,1,16-16A16,16,0,0,1,192,192Zm48-24H223a32,32,0,0,0-62,0H95a32,32,0,0,0-62,0H16V128H240Z"></path>
                  </svg>
                {:else}
                  <svg class="timeline__point-icon" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
                  </svg>
                {/if}
              </div>
            </div>
          </article>
        {/each}
      </div>
    </div>

    <div use:revealOnScroll class="timeline-summary mx-auto mt-14 max-w-5xl md:mt-16">
      <div class="timeline-summary__content">
        <p class="timeline-summary__line timeline-summary__line--strong">
          {valueCopy.summaryStrong}
        </p>
        {#each valueCopy.summaryLines as line}
          <p class="timeline-summary__line timeline-summary__line--inter" use:htmlContent={line}></p>
        {/each}
      </div>

      <div class="mt-7 flex justify-center">
        <a
          href={programHref}
          class="value-cta cta-arrow-button inline-flex items-center justify-center gap-2 rounded-full bg-[#8CD0D6] px-7 py-3 text-[15px] font-medium text-[color:var(--color-brand)] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-[#4083A7] hover:font-bold hover:text-white hover:shadow-[0_10px_24px_rgba(64,131,167,0.28)]"
        >
          <span class="value-cta__label">{valueCopy.cta}</span>
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
    </div>
  </div>
</section>

<style>
  .timeline {
    position: relative;
    width: 100%;
    margin: 0 auto;
    --color-line: #e8e8f6;
    --color-card-bg: #ffffff;
    --color-point-svg: #245b7d;
    --color-active: #245b7d;
    --color-point-active-svg: #ffffff;
    --line-w: 2px;
    --item-gap-y: 1.9rem;
    --point-size: 3.9rem;
    --point-gap: 1.25rem;
    --point-radius: 999px;
    --card-radius: 10px;
    --card-padding: 1.3rem 1.45rem;
    --arrow-size: 1.1rem;
    --arrow-offset: calc(var(--arrow-size) / 2);
  }

  .timeline__list {
    position: relative;
  }

  .timeline__item {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  .timeline__item + .timeline__item {
    margin-top: var(--item-gap-y);
  }

  .timeline__line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(var(--point-size) / 2);
    transform: translateX(-50%);
    width: var(--line-w);
    overflow: hidden;
    background: var(--color-line);
  }

  .timeline__line-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: var(--color-active);
  }

  .timeline__card {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    margin-left: 0.7rem;
    border-radius: var(--card-radius);
  }

  .timeline__card-inner {
    z-index: 1;
    overflow: hidden;
    width: 100%;
    border-radius: var(--card-radius);
    box-shadow: 0 14px 34px rgba(14, 29, 38, 0.1);
  }

  .timeline__card-content {
    min-height: 12.5rem;
    background: var(--color-card-bg);
    border-radius: var(--card-radius);
    text-align: center;
  }

  .timeline__card-titlebar {
    background: #245b7d;
    padding: 1.15rem 1.5rem 1rem;
  }

  .timeline__card-title {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-size: 24px;
    line-height: 1.2;
    color: #ffffff;
    text-align: center;
  }

  .timeline__card-body {
    padding: 1.35rem 1.45rem 1.45rem;
    font-size: 16px;
    line-height: 1.62;
    font-weight: 300;
    color: #245b7d;
    text-align: center;
  }

  .timeline__card-paragraph + .timeline__card-paragraph {
    margin-top: 0.7rem;
  }

  .timeline__card-arrow {
    position: absolute;
    left: 0;
    top: 50%;
    width: var(--arrow-size);
    height: var(--arrow-size);
    margin-left: calc(var(--arrow-offset) * -1);
    background: var(--color-card-bg);
    transform: translateY(-50%) rotate(45deg);
    z-index: 2;
  }

  .timeline__point {
    flex: 0 0 auto;
    order: 0;
    margin-left: 0;
    margin-right: var(--point-gap);
  }

  .timeline__point-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--point-size);
    height: var(--point-size);
    border-radius: var(--point-radius);
    background: var(--color-line);
    color: var(--color-point-svg);
    transition:
      background-color 220ms ease-out,
      color 220ms ease-out;
  }

  .timeline__point-icon {
    width: 1.7rem;
    height: 1.7rem;
    flex: 0 0 auto;
  }

  .timeline__item.js-is-active .timeline__point-content {
    background: var(--color-active);
    color: var(--color-point-active-svg);
  }

  .timeline__card {
    transition:
      opacity 780ms ease-out,
      transform 780ms ease-out;
  }

  .timeline__item:not(.js-is-show) .timeline__card {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }

  .timeline__item:not(.timeline__item--reverse):not(.js-is-show) .timeline__card {
    transform: translate3d(-52px, 0, 0);
  }

  .timeline__item.timeline__item--reverse:not(.js-is-show) .timeline__card {
    transform: translate3d(52px, 0, 0);
  }

  .timeline__item.js-is-show .timeline__card {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .timeline-summary {
    position: relative;
    padding-left: 1.5rem;
  }

  .timeline-summary::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 3.6rem;
    width: 4px;
    background: #8cd0d6;
  }

  .timeline-summary__content {
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
    opacity: 0;
    transition: opacity 620ms ease-out;
  }

  :global(.timeline-summary[data-visible='true']) .timeline-summary__content {
    opacity: 1;
  }

  .timeline-summary__line--strong {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.55;
    font-weight: 700;
    color: var(--color-brand);
  }

  .timeline-summary__line--serif {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-size: 20px;
    line-height: 1.45;
    color: var(--color-brand);
  }

  .timeline-summary__line--inter {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.55;
    font-weight: 300;
    color: var(--color-brand);
  }

  .value-cta {
    position: relative;
    overflow: hidden;
  }

  .value-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 44%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    transform: translateX(-180%) skewX(-18deg);
    transition: transform 420ms ease-out;
  }

  .value-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .value-cta__label {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1023px) {
    .timeline {
      --point-gap: 0.95rem;
      --item-gap-y: 1.7rem;
    }

    .timeline__line {
      left: calc(var(--point-size) / 2);
      transform: translateX(-50%);
    }

    .timeline__item {
      display: flex;
      align-items: center;
    }

    .timeline__point {
      order: 0;
      align-self: center;
      margin-right: var(--point-gap);
    }

    .timeline__card {
      order: 1;
      margin-left: 0;
      width: 100%;
    }

    .timeline__item:not(.js-is-show) .timeline__card,
    .timeline__item.timeline__item--reverse:not(.js-is-show) .timeline__card,
    .timeline__item:not(.timeline__item--reverse):not(.js-is-show) .timeline__card {
      transform: translate3d(34px, 0, 0);
    }

    .timeline__card-arrow {
      left: 0;
      right: auto;
      margin-left: calc(var(--arrow-offset) * -1);
      margin-right: 0;
    }
  }

  @media (min-width: 1024px) {
    .timeline__line {
      left: 50%;
    }

    .timeline__item {
      display: grid;
      grid-template-areas: 'left point right';
      grid-template-columns: minmax(0, 1fr) var(--point-size) minmax(0, 1fr);
      column-gap: calc(var(--point-gap) * 1.9);
      align-items: center;
    }

    .timeline__point {
      grid-area: point;
      grid-row: 1;
      order: 0;
      margin: 0;
      justify-self: center;
      align-self: center;
    }

    .timeline__card {
      grid-area: left;
      grid-row: 1;
      width: min(100%, 30rem);
      margin-left: 0;
      justify-self: end;
      align-self: center;
    }

    .timeline__item--reverse .timeline__card {
      grid-area: right;
      grid-row: 1;
      justify-self: start;
    }

    .timeline__item:not(.timeline__item--reverse) .timeline__card-arrow {
      left: auto;
      right: 0;
      margin-left: 0;
      margin-right: calc(var(--arrow-offset) * -1);
    }

    .timeline__item--reverse .timeline__card-arrow {
      left: 0;
      margin-left: calc(var(--arrow-offset) * -1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .timeline__card,
    .timeline__point-content,
    .timeline-summary__content {
      transition: none;
    }
  }
</style>
