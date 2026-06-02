<script lang="ts">
  import { slide } from 'svelte/transition';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getProgramCopy } from '$lib/i18n/program';

  let openIndex: number | null = 0;

  $: faqCopy = getProgramCopy($language).faq;
  $: faqs = getProgramCopy($language).faq.faqs;
  $: whatsappHref = getWhatsAppHref($language);
  $: faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: htmlToText(faq.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: htmlToText(faq.a.map(renderFaqParagraph).join(' '))
      }
    }))
  };
  $: faqSchemaHtml = `<script type="application/ld+json">${JSON.stringify(faqSchema).replace(/</g, '\\u003c')}<\/script>`;

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

  function htmlToText(value: string) {
    return value
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
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

<svelte:head>
  {@html faqSchemaHtml}
</svelte:head>

<section
  id="faq"
  class="bg-[#f8f4f0] pb-16 pt-10 md:pb-22 md:pt-12"
>
  <div class="mx-auto max-w-5xl px-6 md:px-10">
    <header class="mx-auto max-w-3xl text-center">
      <p class="mb-3 text-[16px] font-light leading-relaxed text-[#233F4E]/76">{faqCopy.eyebrow}</p>
      <h2
        class="faq-title text-[35px] font-medium leading-[1.06] tracking-[0] text-[#233F4E] md:text-[48px]"
        style="font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;"
      >
        <span class="text-[#4083A7]" style="font-family: inherit;">{faqCopy.titleHighlight}</span><br class="md:hidden" />
        {faqCopy.titleRest}<br class="hidden md:block" />
        {faqCopy.titleProgram}<br class="md:hidden" />
        Empenta
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
                in:slide={{ duration: 340 }}
                out:slide={{ duration: 280 }}
              >
                <div class="faq-answer text-[14px] font-light leading-[1.75] text-[#245B7D] md:text-[14px]">
                  {#each faq.a as paragraph}
                    <p use:htmlContent={renderFaqParagraph(paragraph)}></p>
                  {/each}

                  {#if faq.cta}
                    <div class="mt-5">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="faq-cta inline-flex w-fit items-center justify-center self-center rounded-full bg-[#8CD0D6] px-5 py-2.5 text-center text-[14px] font-medium text-[#233F4E] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-[#4083A7] hover:font-bold hover:text-white hover:shadow-[0_10px_24px_rgba(64,131,167,0.28)]"
                      >
                        <span class="faq-cta__label">{faq.cta}</span>
                      </a>
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
      <p class="text-[16px] font-light leading-relaxed text-[#233F4E]">
        {faqCopy.bottomText}
      </p>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        class="faq-call-cta inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#8CD0D6] px-6 py-3 text-[15px] font-medium text-[#233F4E] shadow-[0_10px_24px_rgba(14,29,38,0.10)] transition-[transform,background-color,color,font-weight,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-[#4083A7] hover:font-bold hover:text-white hover:shadow-[0_12px_28px_rgba(64,131,167,0.28)]"
      >
        <svg class="h-[18px] w-[18px]" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
          <path
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.5 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4-.1 101.8-82.9 184.7-184.5 184.7zm101.2-138.1c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.8 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.5z"
          />
        </svg>
        <span>{faqCopy.bottomCta}</span>
      </a>
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

  .faq-cta {
    isolation: isolate;
    overflow: hidden;
    position: relative;
  }

  .faq-cta::before {
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

  .faq-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .faq-cta__label {
    position: relative;
    z-index: 1;
  }

  .faq-call-cta {
    isolation: isolate;
    overflow: hidden;
    position: relative;
  }

  .faq-call-cta::before {
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

  .faq-call-cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .faq-call-cta span,
  .faq-call-cta svg {
    position: relative;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-reveal,
    .faq-card,
    .faq-cta,
    .faq-cta::before,
    .faq-call-cta,
    .faq-call-cta::before {
      transition: none;
    }

    .faq-reveal {
      opacity: 1;
      transform: none;
    }
  }
</style>
