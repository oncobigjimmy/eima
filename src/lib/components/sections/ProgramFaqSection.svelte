<script lang="ts">
  import { slide } from 'svelte/transition';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getProgramCopy } from '$lib/i18n/program';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { motionDuration } from '$lib/motion';

  let openIndex: number | null = 0;

  $: faqCopy = getProgramCopy($language).faq;
  $: faqs = getProgramCopy($language).faq.faqs;
  $: whatsappHref = getWhatsAppHref($language);

  function inlineLink() {
    const word = $language === 'en' ? 'here' : 'aquí';
    return `<a class="faq-inline-link" href="${whatsappHref}" target="_blank" rel="noopener noreferrer"><span class="faq-inline-link__word">${word}</span> <span class="faq-inline-link__arrow">↗</span></a>`;
  }

  function renderFaqParagraph(paragraph: string) {
    const link = inlineLink();
    return paragraph
      .replaceAll('{{reviewLink}}', link)
      .replaceAll('{{writeLink}}', link)
      .replaceAll('{{situationLink}}', link)
      .replaceAll('{{askLink}}', link)
      .replaceAll('{{caseLink}}', link);
  }


  function htmlContent(node: HTMLElement, value: string) {
    node.innerHTML = value;

    return {
      update(nextValue: string) {
        node.innerHTML = nextValue;
      }
    };
  }

  function revealOnScroll(node: HTMLElement) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>


<section
  id="faq"
  class="bg-[#f8f4f0] pb-16 pt-10 md:pb-22 md:pt-12"
>
  <div class="mx-auto max-w-5xl px-6 md:px-10">
    <header class="mx-auto max-w-3xl text-center">
      <p class="mobile-copy-14 mb-3 text-[16px] font-light leading-relaxed text-[#233F4E]/76">{faqCopy.eyebrow}</p>
      <h2
        class={`faq-title text-[35px] font-medium leading-[1.06] tracking-[0] text-[#233F4E] md:text-[48px] section-playfair-desktop`}
        style="font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;"
      >
        {#if $language === 'en'}
          <span class="text-[#4083A7]" style="font-family: inherit;">{faqCopy.titleHighlight}</span>
          {faqCopy.titleRest} our<br class="hidden md:block" />
          Empenta Programme
        {:else}
        <span class="text-[#4083A7]" style="font-family: inherit;">{faqCopy.titleHighlight}</span><br class="md:hidden" />
        {faqCopy.titleRest}<br class="hidden md:block" />
        {faqCopy.titleProgram}<br class="md:hidden" />
        Empenta
        {/if}
      </h2>
    </header>

    {#key $language}
      <div class="mt-10 flex flex-col gap-3 md:mt-12">
        {#each faqs as faq, index (faq.q)}
          <article
            use:revealOnScroll
            class={`faq-reveal faq-card overflow-hidden rounded-[14px] transition-all duration-300 ${
              openIndex === index
                ? 'border-2 border-[#4083A7] bg-white shadow-[0_16px_34px_rgba(14,29,38,0.10)]'
                : 'border-2 border-transparent bg-white shadow-[0_10px_24px_rgba(14,29,38,0.06)] hover:border-[#4083A7] hover:shadow-[0_14px_30px_rgba(14,29,38,0.09)]'
            }`}
            style={`--reveal-delay: ${Math.min(index, 5) * 70}ms`}
          >
            <button
              type="button"
              class={`faq-trigger group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-300 md:px-6 md:py-3 ${
                openIndex === index ? 'bg-[#4083A7] text-white' : 'bg-white text-[#4083A7]'
              }`}
              on:click={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <span
                class={`flex h-12 w-12 shrink-0 items-center justify-center md:h-10 md:w-10 ${
                  openIndex === index ? 'text-white' : 'text-[#4083A7]'
                }`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 256 256" class="h-11 w-11 fill-current md:h-9 md:w-9">
                  <path d={faq.icon}></path>
                </svg>
              </span>

              <span
                use:htmlContent={faq.q}
                class={`faq-question flex-1 text-[16px] leading-[1.3] md:text-[16px] ${
                  openIndex === index ? 'text-white' : 'text-[#4083A7]'
                }`}
              ></span>

              <span
                class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-250 ${
                  openIndex === index
                    ? 'border-white bg-white text-[#4083A7] rotate-180'
                    : 'border-[#4083A7] bg-white text-[#4083A7] group-hover:bg-[#4083A7] group-hover:text-white'
                }`}
                aria-hidden="true"
              >
                <span class="material-symbols-rounded !text-[20px]">expand_more</span>
              </span>
            </button>

            {#if openIndex === index}
              <div
                class="px-5 pb-5 pt-4 md:px-6"
                in:slide={{ duration: motionDuration(340) }}
                out:slide={{ duration: motionDuration(280) }}
              >
                <div class="faq-answer text-[14px] font-light leading-[1.75] text-[#245B7D] md:text-[14px]">
                  {#each faq.a as paragraph}
                    <p use:htmlContent={renderFaqParagraph(paragraph)}></p>
                  {/each}

                  {#if faq.cta}
                    <div class="mt-5">
                      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={faq.cta} />
                    </div>
                  {/if}
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    {/key}

    <div class="faq-bottom-cta mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-4 text-center md:mt-12 md:flex-row md:gap-6 md:text-left">
      <p class="mobile-copy-14 text-[16px] font-light leading-relaxed text-[#233F4E]">
        {faqCopy.bottomText}
      </p>

      <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={faqCopy.bottomCta} />
    </div>
  </div>
</section>

<style>
  .faq-title,
  .faq-title * {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
  }

  section {
    scroll-margin-top: 96px;
  }

  .faq-question {
    font-family: Inter, system-ui, sans-serif !important;
    font-weight: 400;
  }

  .faq-trigger[aria-expanded='true'] .faq-question {
    text-shadow: var(--eima-blue-text-shadow);
  }

  .faq-question :global(strong) {
    font-weight: 700;
  }

  .faq-answer,
  .faq-answer * {
    font-family: Inter, system-ui, sans-serif !important;
    font-weight: 300;
  }

  .faq-answer :global(strong) {
    font-weight: 700 !important;
    color: inherit;
  }

  .faq-answer p + p {
    margin-top: 0.95rem;
  }

  .faq-card {
    will-change: transform, opacity, filter;
  }

  .faq-reveal {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
    transition:
      opacity 560ms ease-out,
      transform 560ms ease-out,
      border-color 300ms ease-out,
      box-shadow 300ms ease-out,
      background-color 300ms ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }

  :global(.faq-reveal[data-visible='true']) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .faq-answer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .faq-answer p {
    width: 100%;
  }

  .faq-answer :global(.faq-inline-link) {
    border-bottom: 1px dotted currentColor;
    color: #4083a7;
    display: inline;
    font-weight: 500;
    padding-bottom: 0.06em;
    text-decoration: none !important;
    transition: color 220ms ease;
  }

  .faq-answer :global(.faq-inline-link__word) {
    display: inline;
  }

  .faq-answer :global(.faq-inline-link:hover) {
    color: #233f4e;
  }

  .faq-answer :global(.faq-inline-link__arrow) {
    font-size: 0.92em;
    line-height: 1;
    margin-left: 0.18rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-reveal,
    .faq-card {
      transition: none;
    }

    .faq-reveal {
      opacity: 1;
      transform: none;
    }
  }
</style>
