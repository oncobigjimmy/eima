<script>
  import { selectedSituation } from '$lib/data/situation';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { watchReducedMotion } from '$lib/motion';
  import { language } from '$lib/i18n/language';
  import { getProgramCopy } from '$lib/i18n/program';
  import { getProgramStepsHash } from '$lib/i18n/routes';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { eimaBar } from '$lib/actions/eimaBar';
  import ServiceIllustration from '$lib/components/ServiceIllustration.svelte';
  let activeStep = 0;
  let sidebarActive = -1;
  let sidebarProgress = 0;
  let visited = [false, false, false, false, false];
  let mobileProgress = 0;
  let mobileBarVisible = false;
  let headerHeight = 68;
  /** @type {HTMLElement | undefined} */
  let trackNode;
  /** @param {HTMLElement} node */
  function fitSidebar(node) {
    const update = () => node.style.setProperty('--steps-sidebar-height', node.scrollHeight + 'px');
    const observer = new ResizeObserver(update);
    observer.observe(node);
    update();
    return { destroy() { observer.disconnect(); } };
  }
  // TODO [CA-revisar]: revisar las etiquetas del índice y «Pas X de 5».
  const stepLabels = {
    es: ['Nos cuentas tu caso', 'Valoración en tu casa', 'Preparamos el terreno', 'Empiezas tu plan', 'Te acompañamos online'],
    ca: ['Ens contes el teu cas', 'Valoració a casa teva', 'Preparam el terreny', 'Comences el teu pla', "T'acompanyam en línia"],
    en: ['Tell us your situation', 'Assessment at home', 'Preparing the ground', 'Start your plan', 'Online support']
  };
  $: labels = stepLabels[$language];
  /** @param {number} index */
  function goToStep(index) {
    const card = trackNode?.querySelectorAll('.program-step')[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const focusY = window.innerWidth >= 1024 ? window.innerHeight * .48 : window.innerHeight / 2;
    window.scrollTo({ top: window.scrollY + rect.top + rect.height / 2 - focusY, behavior: reduced ? 'instant' : 'smooth' });
  }
  /** @param {HTMLElement} node */
  function revealOnScroll(node) {
    requestAnimationFrame(() => {
      node.dataset.ready = 'true';
      node.dataset.visible = 'false';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { node.dataset.visible = 'true'; observer.disconnect(); }
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

  /**
   * Tie the sidebar rail to the same crossing points as the cards.
   * @param {number[]} stops
   * @param {number[]} crossings
   * @param {number} focusY
   */
  function progressAtCrossings(stops, crossings, focusY) {
    if (crossings.length < 2 || stops.length !== crossings.length) return 0;
    const first = crossings[0], last = crossings[crossings.length - 1];
    const start = first - (crossings[1] - first) / 2;
    const end = last + (last - crossings[crossings.length - 2]) / 2;
    const positions = [start, ...crossings, end];
    const progress = [0, ...stops, 1];
    const next = positions.findIndex(position => position > focusY);
    if (next === 0) return 0;
    if (next === -1) return 1;
    const fraction = (focusY - positions[next - 1]) / (positions[next] - positions[next - 1]);
    return progress[next - 1] + (progress[next] - progress[next - 1]) * fraction;
  }

  /** @param {HTMLElement} node */
  function trackActiveStep(node) {
    trackNode = node;
    let frame = 0;
    let reducedMotion = false;
    const update = () => {
      frame = 0;
      const cards = /** @type {HTMLElement[]} */ (Array.from(node.querySelectorAll('.program-step')));
      const bounds = node.getBoundingClientRect();
      headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 68;
      const desktop = window.innerWidth >= 1024;
      const focusY = desktop ? window.innerHeight * .48 : headerHeight + (window.innerHeight - headerHeight) / 2;
      mobileBarVisible = window.innerHeight / 2 >= bounds.top - 80 && bounds.bottom > headerHeight;
      const crossings = cards.map(card => {
        const point = card.querySelector(desktop ? '.program-step__point' : '.program-step__point-mobile');
        const rect = point?.getBoundingClientRect();
        return rect ? rect.top + (desktop ? rect.height / 2 : 0) : Infinity;
      });
      const index = crossings.findLastIndex(position => position <= focusY);
      const visible = bounds.top < window.innerHeight * .85 && bounds.bottom > window.innerHeight * .15;
      const selected = visible ? cards[desktop ? index : Math.max(0, index)] : undefined;
      if (desktop) {
        const line = node.querySelector('.program-line');
        const lineBounds = line?.getBoundingClientRect();
        if (lineBounds) {
          const drawn = Math.max(0, Math.min(1, (focusY - lineBounds.top) / lineBounds.height));
          node.style.setProperty('--program-line-progress', String(reducedMotion ? 1 : drawn));
        }
        const section = node.closest('.program-steps-section');
        const track = section?.querySelector('.eb-editorial .eb-track');
        if (section && track) {
          const numbers = Array.from(section.querySelectorAll('.steps-index button span'));
          const rail = track.getBoundingClientRect();
          const stops = numbers.map(number => {
            const box = number.getBoundingClientRect();
            return (box.top + box.height / 2 - rail.top) / rail.height;
          });
          if (rail.height) sidebarProgress = progressAtCrossings(stops, crossings, focusY);
        }
      } else {
        const stops = crossings.map((_, index) => (index + .5) / crossings.length);
        mobileProgress = progressAtCrossings(stops, crossings, focusY);
      }
      sidebarActive = selected ? cards.indexOf(selected) : -1;
      if (selected) activeStep = sidebarActive;
      if (selected) visited = visited.map((value, index) => value || index < activeStep || cards[index] === selected);
      const reachedIndex = index;
      cards.forEach((card, index) => { card.dataset.scrollActive = card === selected ? 'true' : 'false'; card.dataset.reached = index <= reachedIndex ? 'true' : 'false'; card.dataset.visited = visited[index] ? 'true' : 'false'; });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const stopMotion = watchReducedMotion((value) => { reducedMotion = value; schedule(); });
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(node);
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return { destroy() { stopMotion(); resizeObserver.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); if (frame) cancelAnimationFrame(frame); } };
  }

  /** @param {HTMLElement} node @param {string} value */
  function htmlContent(node, value) {
    node.innerHTML = value;

    return {
      /** @param {string} nextValue */
      update(nextValue) {
        node.innerHTML = nextValue;
      }
    };
  }

  $: stepsCopy = getProgramCopy($language).steps;
  $: steps = stepsCopy.items;
  $: introHtml = $language === 'es'
    ? 'Un proceso para que no tengas que improvisar <br class="steps-desktop-break" /><strong>qué hacer, cuánto hacer ni cómo</strong> saber <br class="steps-desktop-break" />si lo estás haciendo bien.'
    : stepsCopy.intro;
  $: closingHtml = $language === 'es' ? stepsCopy.closing.replace('. Y ', '.<br class="steps-mobile-break" /> Y ') : stepsCopy.closing;
  $: sideParagraphs = stepsCopy.sideParagraphs.slice(0, 1);
  $: whatsappHref = getWhatsAppHref($language, false, $selectedSituation);
  $: programStepsId = getProgramStepsHash($language);

</script>

<div class="mobile-step-bar" class:shown={mobileBarVisible} style:top={headerHeight + 'px'} aria-hidden="true">
  <canvas class="mobile-step-water" aria-hidden="true"></canvas>
  <div><strong>{$language === 'ca' ? 'Pas' : $language === 'en' ? 'Step' : 'Paso'} {activeStep + 1} {$language === 'en' ? 'of' : 'de'} 5</strong> · {labels[activeStep]}</div>
  <div class="mobile-step-progress eb eb-editorial" data-eb="editorial" use:eimaBar={{ externalScroll: true, value: mobileProgress }}>
    <div class="eb-track"><div class="eb-fill"></div><div class="eb-knob-rail"><span class="eb-knob"></span></div></div>
  </div>
</div>
<section id={programStepsId} class="program-steps-section relative bg-[#f8f4f0] py-16 md:py-20">
  {#if programStepsId !== 'program-steps'}
    <span id="program-steps" class="program-steps-anchor" aria-hidden="true"></span>
  {/if}
  {#key $language}
    <div class="mx-auto grid max-w-6xl gap-10 px-6 md:px-10 lg:grid-cols-[minmax(18rem,24rem)_1fr] lg:gap-12">
      <div class="steps-sidebar lg:sticky lg:top-28 lg:self-start" use:fitSidebar>
        <div class="mx-auto max-w-[23rem] text-center lg:mx-0 lg:text-left">
          <h2
            class={`font-display-serif text-[2.4rem] font-medium leading-[0.98] tracking-[0] text-[color:var(--color-brand)] md:text-[50px] section-playfair-desktop`}
          >
            {stepsCopy.headingPrefix} <span class="font-display-serif text-[#4083A7]">{stepsCopy.headingHighlight}</span>{#if 'headingSuffix' in stepsCopy && stepsCopy.headingSuffix}
              {' '}{stepsCopy.headingSuffix}
            {/if}
          </h2>

          <p class={`steps-intro mt-6 text-[15px] font-light leading-[1.6] text-[#233F4E]`}>{@html introHtml}</p>

          <nav class="steps-index" aria-label={stepsCopy.headingPrefix + ' ' + stepsCopy.headingHighlight}>
            <div class="eb eb-editorial" data-eb="editorial" data-orientation="vertical" data-drive="scroll" data-target=".program-steps-track" data-steps=".steps-index li" aria-hidden="true" use:eimaBar={{ externalScroll: true, value: sidebarProgress }}>
              <div class="eb-track"><div class="eb-fill"></div><div class="eb-knob-rail"><span class="eb-knob"></span></div></div>
            </div>
            <ol>
              {#each labels as label, index}
                <li><button type="button" class:active={index === sidebarActive} aria-current={index === sidebarActive ? 'step' : undefined} on:click={() => goToStep(index)}><span>{index + 1}</span>{label}</button></li>
              {/each}
            </ol>
          </nav>
          <div class="steps-badge mt-8 flex justify-center">
            <div
              class="inline-flex items-center justify-center gap-3 rounded-full bg-[#E8E8F6] px-6 py-3 text-[15px] font-medium text-[#245B7D] shadow-[0_8px_18px_rgba(14,29,38,0.08)]"
            >
              <span class="material-symbols-rounded !text-[20px]">calendar_month</span>
              {stepsCopy.badge}
            </div>
          </div>

          <div class={`steps-side-copy mt-10 space-y-4 text-[15px] leading-[1.75] text-[#233F4E]`}>
            {#each sideParagraphs as paragraph}
              <p use:htmlContent={paragraph}>{@html paragraph}</p>
            {/each}
          </div>
        </div>
      </div>

      <div class="program-steps-track relative" use:trackActiveStep>
        <div class="program-line hidden lg:block" aria-hidden="true"></div>

        <div class="space-y-10 lg:space-y-7">
          {#each steps as step, index}
            <article
              use:revealOnScroll
              class="program-step relative"
              style={`--reveal-delay:calc(${index} * var(--stagger))`}
            >
              <div class="program-step__point hidden lg:flex" aria-hidden="true">
                {step.number}
              </div>

              <div
                class="program-step__point-mobile flex h-[3.7rem] w-[3.7rem] items-center justify-center rounded-full border-2 border-transparent bg-[#E8E8F6] text-[26px] font-light text-[#245B7D] shadow-[0_6px_16px_rgba(14,29,38,0.05)] lg:hidden"
                aria-hidden="true"
              >
                {step.number}
              </div>

              <div class="program-step__card">
                <div class="program-step__surface rounded-[14px] bg-white p-5 shadow-[0_16px_36px_rgba(14,29,38,0.08)] md:p-6">
                <div
                  class="flex h-[2.9rem] w-[2.9rem] items-center justify-center text-[#233F4E]"
                  aria-hidden="true"
                >
                  <span class="h-[2.2rem] w-[2.2rem]"><ServiceIllustration icon={step.icon} /></span>
                </div>

                <h3
                  class="mt-3 text-[22px] leading-[1.2] font-medium text-[#233F4E]"
                  style="font-family: 'Newsreader', Georgia, 'Times New Roman', serif; font-weight: 500 !important;"
                >
                  <span class="step-title-ink">{step.title}</span>
                </h3>
                <p
                  use:htmlContent={step.body}
                  class="mt-3 text-[14px] md:text-[15px] font-light leading-[1.65] text-[#245B7D]"
                >{@html step.body}</p>
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </div>

    <div class="mx-auto mt-12 max-w-4xl px-6 text-center md:mt-16 md:px-10">
      <p
        use:htmlContent={closingHtml}
        class="mobile-copy-14 text-[16px] font-light leading-[1.65] text-[#233F4E]"
      >{@html closingHtml}</p>

      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={stepsCopy.cta} class="steps-cta" />
    </div>
  {/key}
</section>

<style>
  .mobile-step-bar { display: none; }
  @media (max-width: 1023px) {
    .mobile-step-bar { display: block; position: fixed; left: 0; right: 0; z-index: 30; padding: 10px 20px 12px; isolation: isolate; background: var(--water-mist) fixed; color: #233f4e; font-size: 13px; pointer-events: none; opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma), visibility var(--dur-estado); }
    .mobile-step-water { position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; }
    :global(.water-rendered) .mobile-step-bar { background: transparent; }
    .mobile-step-bar.shown { opacity: 1; visibility: visible; transform: translateY(0); }
    :global(body:has(#mobile-menu[aria-hidden="false"])) .mobile-step-bar { display: none; }
  }
  .mobile-step-progress { margin-top: 8px; }
  .mobile-step-progress .eb-knob { width: 15px; height: 15px; border-width: 3px; }
  @media (prefers-reduced-motion: reduce) { .mobile-step-bar { transition: none; } }
  .steps-index { display: none; }
  @media (min-width: 1024px) {
    .steps-sidebar { max-height: none; min-height: min-content; top: clamp(80px, calc(100dvh - var(--steps-sidebar-height, 540px) - 16px), 112px); }
    .steps-sidebar .steps-intro { margin-top: 18px; }
    .steps-sidebar .steps-badge { margin-top: 16px; }
    .steps-sidebar .steps-side-copy { margin-top: 19px; }
    .steps-index { display: grid; grid-template-columns: 10px 1fr; column-gap: 18px; margin-top: 23px; text-align: left; }
    .steps-index .eb-editorial { align-self: stretch; height: auto; margin-block: 10px; }
    .steps-index ol { margin: 0; padding: 0; list-style: none; }
    .steps-index button { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 48px; text-align: left; font-size: 15px; font-weight: 300; color: #8cd0d6; transform-origin: left center; transition: color var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma); }
    @media (prefers-reduced-motion: no-preference) {
      .steps-index button.active, .steps-index button:focus-visible { transform: scale(1.04); }
      @media (hover: hover) and (pointer: fine) { .steps-index button:hover { transform: scale(1.06); } }
    }
    .steps-index button span { display: grid; place-items: center; flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; font-size: 13px; font-weight: 400; color: #233f4e; text-shadow: none; background: #8cd0d6; transition: background-color var(--dur-estado) var(--ease-calma), color var(--dur-estado) var(--ease-calma); }
    .steps-index li:global(.is-reached) button span { background: #4083a7; color: #fff; font-weight: 600; text-shadow: 0 0 3px #071a2580; }
    .steps-index li:global(.is-reached) button { color: #4083a7; }
    .steps-index button.active { color: #245b7d; }
    .steps-index button.active { font-weight: 600; }
    .steps-index button.active span { background: #4083a7; color: #fff; font-weight: 600; text-shadow: 0 0 3px #071a2580; }
    .steps-index button:focus-visible { outline: 2px solid #4083a7; outline-offset: 2px; border-radius: 4px; }
  }
  @media (min-width: 1024px) and (max-height: 859px) { .steps-sidebar .steps-badge { display: none; } }
  @media (prefers-reduced-motion: reduce) { .steps-index button, .steps-index button span { transition: none; } }
  :global(.steps-mobile-break) { display: none; }
  :global(.steps-desktop-break) { display: none; }
  @media (min-width: 1024px) { :global(.steps-desktop-break) { display: block; } }
  @media (max-width: 767px) { :global(.steps-mobile-break) { display: block; } }
  :global(.steps-cta) { margin-top: 1.25rem; }
  .steps-intro :global(strong) { font-weight: 700; }
  .step-title-ink { font: inherit; color: #233f4e; background-color: transparent; transition: background-color 900ms var(--ease-calma); padding: .04em .18em; border-radius: 2px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }

  .program-steps-section,
  .program-steps-anchor {
    scroll-margin-top: -24px;
  }

  .program-steps-anchor {
    display: block;
    height: 0;
  }

  .program-step {
    overflow: visible;
    transition:
      opacity var(--dur-entrada) var(--ease-calma),
      transform var(--dur-entrada) var(--ease-calma),
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

  .program-step__point-mobile,
  .program-step__point { transition: border-color 260ms ease; }

  :global(.program-step[data-scroll-active='true']) .program-step__point-mobile,
  :global(.program-step[data-scroll-active='true']) .program-step__point { border-color: transparent; }

  .program-step__point-mobile, .program-step__point { background: #8cd0d6; color: #233f4e; font-weight: 400; text-shadow: none; }
  :global(.program-step[data-reached='true']) .program-step__point-mobile, :global(.program-step[data-reached='true']) .program-step__point { background: #4083a7; color: #fff; font-weight: 600; text-shadow: 0 0 3px #071a2580; }
  :global(.program-step[data-visited='true']) .step-title-ink { background-color: rgba(140, 208, 214, .55); }
  @media (min-width: 1024px) {
    :global(.program-steps-track:has(.program-step[data-scroll-active='true']) .program-step[data-scroll-active='false'] .program-step__surface) { filter: blur(.6px); opacity: .88; }
  }
  .program-step__card {
    margin-top: 2.2rem;
  }

  .program-step__surface {
    border: 2px solid transparent;
    padding-top: 2.2rem;
    transition: opacity 260ms ease, filter 260ms ease, transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
  }

  :global(.program-step[data-scroll-active='true']) .program-step__surface {
    animation: none;
    border-color: transparent;
    box-shadow: 0 12px 30px #233f4e26;
  }

  :global(.program-steps-track:has(.program-step[data-scroll-active='true']) .program-step[data-scroll-active='false'] .program-step__surface) {
    opacity: .88;
  }


  :global(.program-step[data-ready='true'][data-visible='false']) {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }

  :global(.program-step[data-ready='true'][data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: 1024px) {
    .program-steps-track { --program-axis: 2.125rem; }
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
        opacity var(--dur-entrada) var(--ease-calma),
        transform var(--dur-entrada) var(--ease-calma);
      transition-delay: var(--reveal-delay, 0ms);
    }

    :global(.program-step[data-ready='true'][data-visible='false']) .program-step__card {
      opacity: 0;
      transform: translate3d(0, 16px, 0);
    }

    :global(.program-step[data-ready='true'][data-visible='true']) .program-step__card {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    .program-line {
      position: absolute;
      left: var(--program-axis);
      top: 2.2rem;
      bottom: 2.2rem;
      width: 2px;
      transform: translateX(-50%);
      background: #8cd0d6;
    }

    .program-line::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 3px;
      height: calc(100% * var(--program-line-progress, 0));
      background: #4083a7;
      border-radius: 999px;
      transform: translateX(-50%);
      transform-origin: top;
      pointer-events: none;
    }

    .program-step {
      padding-left: 6.2rem;
    }

    .program-step__point {
      position: absolute;
      top: 50%;
      left: var(--program-axis);
      z-index: 2;
      height: 3.95rem;
      width: 3.95rem;
      transform: translate(-50%, -50%);
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: 2px solid transparent;
      background: #8cd0d6;
      color: #233f4e;
      box-shadow: 0 6px 16px rgba(14, 29, 38, 0.05);
      font-size: 30px;
      font-weight: 400;
      line-height: 1;
    }

    .program-step__card {
      margin-top: 0;
    }
    .program-step__surface { padding-top: 1.5rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.program-step[data-ready]) ,
    :global(.program-step[data-ready]) .program-step__card { opacity: 1 !important; transform: none !important; transition: none !important; }
    .step-title-ink { transition: none; }
    .program-step__surface,
    .program-step__point-mobile,
    .program-step__point { transition: none; }
    :global(.program-step[data-scroll-active='true']) .program-step__surface { animation: none; transform: none !important; }
  }
</style>

