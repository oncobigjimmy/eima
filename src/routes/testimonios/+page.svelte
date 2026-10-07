<script>
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { getTestimonialsCopy } from '$lib/i18n/testimonials';
  import { getAbsoluteUrl, getAlternateLinks, getLanguageFromPath, getLocalizedPath } from '$lib/i18n/routes';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { site } from '$lib/site';
  import { dialog } from '$lib/actions/dialog';
  import { motionDuration } from '$lib/motion';
  import { scrollContrast } from '$lib/actions/scrollContrast';

  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? 'es';
  $: copy = getTestimonialsCopy(pageLanguage);
  $: whatsappHref = getWhatsAppHref(pageLanguage);
  $: canonicalUrl = getAbsoluteUrl(getLocalizedPath($page.url.pathname, pageLanguage));
  $: alternateLinks = getAlternateLinks('testimonials');

  /**
   * @typedef {{
   *   name: string;
   *   condition: string;
   *   conditionTitle?: string;
   *   conditionDetail?: string;
   *   conditionDetailLines?: string[];
   *   before: string;
   *   beforeLines?: string[];
   *   after: string;
   *   afterLines?: string[];
   *   modalTitle?: string;
   *   summary?: string;
   *   summaryLines?: string[];
   *   image?: string;
   *   videoUrl?: string;
   * }} Testimonial
   */

  /** @type {Testimonial[]} */
  const testimonials = [
    {
      name: 'Josué',
      condition: 'Glioblastoma estadio IV. Ha pasado por cirugía, radioterapia, quimioterapia y meses de parón antes de volver a moverse.',
      conditionTitle: 'Glioblastoma estadio IV',
      conditionDetail: 'Ha pasado por cirugía, radioterapia, quimioterapia y meses de parón antes de volver a moverse.',
      conditionDetailLines: [
        'Ha pasado por cirugía, radioterapia,',
        'quimioterapia y meses de parón',
        'antes de volver a moverse.'
      ],
      before: 'De sentirse debilitado tras los tratamientos médicos y ver muy lejos poder recuperar su rutina deportiva.',
      beforeLines: [
        'De sentirse debilitado tras los tratamientos',
        'médicos y ver muy lejos poder recuperar',
        'su rutina deportiva.'
      ],
      after: 'A ganar energía, ánimo y constancia con el ejercicio adaptado a su situación y con un seguimiento diario.',
      afterLines: [
        'A ganar energía, ánimo y constancia',
        'con el ejercicio adaptado a su situación',
        'y con un seguimiento diario.'
      ],
      modalTitle: 'Josué · Glioblastoma estadio IV',
      summary: 'De sentirse debilitado tras los tratamientos médicos a ganar energía, ánimo y constancia con ejercicio adaptado.',
      summaryLines: [
        'De sentirse debilitado tras los',
        'tratamientos médicos a ganar energía,',
        'ánimo y constancia con ejercicio adaptado.'
      ],
      image: '/testimonials/testimonial-josue.jpg',
      videoUrl: 'https://www.youtube.com/embed/85AuEva-CUc'
    },
    {
      name: 'Tim',
      condition: 'Cáncer de próstata. Operado de prótesis de cadera derecha en 2025 y de prótesis de cadera izquierda en 2026.',
      conditionTitle: 'Cáncer de próstata',
      conditionDetail: 'Operado de prótesis de cadera derecha en 2025 y de prótesis de cadera izquierda en 2026.',
      conditionDetailLines: [
        'Operado de prótesis de cadera derecha',
        'en 2025 y de prótesis de cadera',
        'izquierda en 2026.'
      ],
      before: 'De caminar con andador con poca estabilidad y sentirse muy fatigado a los pocos metros.',
      beforeLines: [
        'De caminar con andador con poca estabilidad',
        'y sentirse muy fatigado a los pocos metros.'
      ],
      after: 'A ser capaz de caminar sin ayudas por dentro de su casa y sintiéndose cada vez más fuerte.',
      afterLines: [
        'A ser capaz de caminar sin ayudas',
        'por dentro de su casa y sintiéndose',
        'cada vez más fuerte.'
      ],
      modalTitle: 'Tim · Cáncer de próstata',
      summary: 'De caminar con andador, poca estabilidad y mucha fatiga a moverse dentro de casa sin ayudas y con más fuerza.',
      summaryLines: [
        'De caminar con andador, poca estabilidad',
        'y mucha fatiga a moverse dentro de casa',
        'sin ayudas y con más fuerza.'
      ],
      image: '/testimonials/testimonial-tim.jpg',
      videoUrl: 'https://www.youtube.com/embed/4k4t-Er_SiU'
    },
    {
      name: 'Carlos',
      condition: 'molestias persistentes de cadera y falta de confianza para caminar mas.',
      before: 'De cancelar planes por inseguridad y rigidez',
      after: 'A caminar mas lejos, subir cuestas y disfrutar sin anticipar dolor'
    },
    {
      name: 'Elena',
      condition: 'dolor cervical, cansancio y tension acumulada al final del dia.',
      before: 'De terminar cada jornada agotada y con miedo a cargar peso',
      after: 'A recuperar movilidad, fuerza y tranquilidad en su rutina'
    }
  ];
  $: visibleTestimonials = pageLanguage === 'es'
    ? testimonials.filter((testimonial) => testimonial.name === 'Josué' || testimonial.name === 'Tim')
    : copy.testimonials;

  /** @type {Testimonial | null} */
  let activeTestimonial = null;

  /** @param {Testimonial} testimonial */
  function hasPlayableVideo(testimonial) {
    return Boolean(testimonial.videoUrl);
  }

  /** @param {Testimonial} testimonial */
  function openTestimonial(testimonial) {
    activeTestimonial = testimonial;
  }

  function closeTestimonial() {
    activeTestimonial = null;
  }

  /** @param {KeyboardEvent} event */
  function handleKeydown(event) {
    if (event.key === 'Escape' && activeTestimonial) closeTestimonial();
  }

  onDestroy(() => {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
  <title>{copy.title}</title>
  <meta
    name="description"
    content={copy.description}
  />
  <link rel="canonical" href={canonicalUrl} />
  {#each alternateLinks as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta property="og:title" content={copy.title} />
  <meta property="og:description" content={copy.ogDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={`${site.url}${site.socialImage}`} />
  <meta property="og:image:alt" content={copy.heading + ' — Eima Salut'} />
  <meta name="twitter:title" content={copy.title} />
  <meta name="twitter:description" content={copy.description} />
  <meta name="twitter:image" content={`${site.url}${site.socialImage}`} />
</svelte:head>

<section class="testimonials-hero">
  <div class="testimonials-hero__image" aria-hidden="true"></div>
  <div class="testimonials-hero__shade site-hero-overlay" aria-hidden="true"></div>
  <div class="testimonials-hero__content photo-text-contrast">
    <h1>{copy.heading} <span>{copy.accent}</span></h1>
    <div class="testimonials-hero__lead">
      {#each copy.intro as lines}
        <p>{@html lines[0]}<br class="testimonials-intro-break" />{' '}{@html lines[1]}</p>
      {/each}
    </div>

  </div>
</section>

<section class="testimonials-section" aria-labelledby="testimonios-title">
  <div class="testimonials-section__inner">
    <h2 id="testimonios-title" class="sr-only">{copy.section}</h2>

    <div class="testimonials-grid">
      {#each visibleTestimonials as testimonial (testimonial.name)}
        <article class="testimonial-card" use:scrollContrast>
          <div class="testimonial-card__content">
            <div class="testimonial-card__person">
              <h3>{testimonial.name}</h3>
              <p class="testimonial-card__condition testimonial-card__condition--desktop">
                {#if testimonial.conditionTitle && testimonial.conditionDetail}
                  <strong class="testimonial-card__condition-title">{testimonial.conditionTitle}</strong>
                  <span class="testimonial-card__condition-detail">{testimonial.conditionDetail}</span>
                {:else}
                  {testimonial.condition}
                {/if}
              </p>
              <p class="testimonial-card__condition testimonial-card__condition--mobile">
                {#if testimonial.conditionTitle && testimonial.conditionDetail}
                  <strong class="testimonial-card__condition-title">{testimonial.conditionTitle}</strong>
                  <span class="testimonial-card__condition-detail">
                    {testimonial.conditionDetail}
                  </span>
                {:else}
                  {testimonial.condition}
                {/if}
              </p>
            </div>

            <div class="testimonial-card__change">
              <span>{copy.before}</span>
              <p>
                {testimonial.before}
              </p>
            </div>

            <div class="testimonial-card__change testimonial-card__change--after">
              <span>{copy.after}</span>
              <p>
                {testimonial.after}
              </p>
            </div>
          </div>

          <button
            class="testimonial-card__media"
            type="button"
            aria-label={`${hasPlayableVideo(testimonial) ? copy.view : copy.upcoming} ${testimonial.name}`}
            disabled={!hasPlayableVideo(testimonial)}
            on:click={() => hasPlayableVideo(testimonial) && openTestimonial(testimonial)}
          >
            {#if testimonial.image}
              <img
                class:testimonial-card__image--portrait-crop={testimonial.name === 'Tim'}
                src={testimonial.image}
                alt=""
                loading="lazy"
              />
              <span class="testimonial-card__overlay" aria-hidden="true"></span>
            {/if}
            <span class="testimonial-card__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l10-6.5-10-6.5Z" />
              </svg>
            </span>
            {#if testimonial.image}
              <span class="testimonial-card__caption"><span class="testimonial-card__caption-line">{copy.captionBefore.trim()}</span>{' '}<span class="testimonial-card__caption-line">{testimonial.name}{copy.captionAfter}</span></span>
            {/if}
          </button>

          <div class="testimonial-card__divider" aria-hidden="true"></div>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="testimonials-cta" aria-labelledby="testimonios-cta-title">
  <div>
    <h2 id="testimonios-cta-title" class="mobile-copy-14">
      {@html copy.ctaHeading}
    </h2>
  </div>
  <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={copy.cta} />
</section>

{#if activeTestimonial}
  <div
    class="testimonial-modal"
    role="presentation"
    on:click={closeTestimonial}
    transition:fade={{ duration: motionDuration(140) }}
  >
    <div
      class="testimonial-modal__panel"
      use:dialog={{ close: closeTestimonial }}
      role="dialog"
      aria-modal="true"
      aria-label={`${copy.dialog} ${activeTestimonial.name}`}
      tabindex="-1"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <button class="testimonial-modal__close" type="button" aria-label={copy.close} on:click={closeTestimonial}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>

      <div class="testimonial-modal__video">
        {#if activeTestimonial.videoUrl}
          <iframe
            src={`${activeTestimonial.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
            title={`${copy.dialog} ${activeTestimonial.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        {:else}
          <img src={activeTestimonial.image} alt="" />
          <div class="testimonial-modal__video-shade" aria-hidden="true"></div>
          <span class="testimonial-modal__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l10-6.5-10-6.5Z" />
            </svg>
          </span>
        {/if}
      </div>

      <div class="testimonial-modal__caption">
        <p>{activeTestimonial.modalTitle ?? activeTestimonial.name}</p>
        <span>
          {#if activeTestimonial.summaryLines}
            {#each activeTestimonial.summaryLines as line, index}
              {line}{#if index < activeTestimonial.summaryLines.length - 1}<br class="testimonial-modal__summary-break" />{' '}{/if}
            {/each}
          {:else}
            {activeTestimonial.summary ?? `${activeTestimonial.before} · ${activeTestimonial.after}`}
          {/if}
        </span>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body:has(.testimonial-modal)) {
    overflow: hidden;
  }

  :global(body:has(.testimonials-hero)) {
    background: #f8f4f0;
  }

  .sr-only {
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .testimonials-hero {
    min-height: 0;
    overflow: hidden;
    position: relative;
  }

  .testimonials-hero__image {
    background-image: url('/testimonials-hero-bridge.jpg');
    background-position: center;
    background-size: cover;
    inset: 0;
    position: absolute;
    transform: scale(1.02);
  }

  .testimonials-hero__shade {
    inset: 0;
    position: absolute;
  }

  .testimonials-hero__content {
    color: white;
    margin: 0 auto;
    max-width: 80rem;
    padding: 7.5rem 1.5rem 4.4rem;
    position: relative;
    z-index: 1;
  }

  @media (min-width: 1024px) {
    .testimonials-hero__content {
      padding-top: 110px;
    }
  }

  .testimonials-hero h1 {
    color: white;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: clamp(2.7rem, 12vw, 3.45rem);
    font-weight: 500;
    letter-spacing: 0;
    line-height: 0.98;
    margin-top: 0;
    max-width: 58rem;
  }

  .testimonials-hero h1 span {
    color: #8cd0d6;
    font-family: inherit;
  }

  .testimonials-hero__lead {
    display: grid;
    gap: 0.9rem;
    margin-top: 1.4rem;
    max-width: 58rem;
  }

  .testimonials-hero__lead p {
    color: rgba(255, 255, 255, 0.96);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.68;
  }

  @media (max-width: 1023px) { .testimonials-intro-break { display: none; } }

  .testimonials-hero__lead :global(strong) {
    color: white;
    font-weight: 700;
  }

  .testimonials-section {
    background: #f8f4f0;
    padding: 4.4rem 1.25rem 2.5rem;
  }

  .testimonials-section__inner {
    margin: 0 auto;
    max-width: 80rem;
  }

  .testimonials-grid {
    display: grid;
    gap: 1.35rem;
  }

  .testimonial-card {
    --testimonial-heading: var(--color-brand);
    --testimonial-detail: rgba(35, 63, 78, .8);
    --testimonial-accent: #4083a7;
    --testimonial-after: #245b7d;
    --testimonial-body: var(--color-brand);
    background: color-mix(in srgb, #ffffff 64%, #f8f4f0);
    border: 1px solid rgba(140, 208, 214, 0.74);
    border-radius: 8px;
    display: grid;
    gap: 1.15rem;
    grid-template-columns: minmax(13.5rem, 0.58fr) minmax(0, 1fr);
    min-height: 0;
    overflow: visible;
    padding: 1rem;
    transition: background-color 380ms ease-out, border-color 380ms ease-out, box-shadow 380ms ease-out;
  }

  .testimonial-card__media {
    border: 0;
    transition: box-shadow 380ms ease-out;
    align-self: stretch;
    background: #0e1d26;
    border-radius: 8px;
    color: white;
    display: block;
    grid-column: 1;
    grid-row: 1;
    min-height: 16rem;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .testimonial-card__media img {
    display: block;
    height: 100%;
    inset: 0;
    object-fit: cover;
    position: absolute;
    transition: transform 320ms ease;
    width: 100%;
  }

  /* Tim's 480px thumbnail contains a 200px portrait between baked-in side panels. */
  .testimonial-card__media img.testimonial-card__image--portrait-crop {
    left: -70%;
    max-width: none;
    width: 240%;
  }

  .testimonial-card__media:hover img,
  .testimonial-card__media:focus-visible img {
    transform: scale(1.045);
  }

  .testimonial-card__media:disabled {
    cursor: default;
  }

  .testimonial-card__overlay {
    background:
      linear-gradient(180deg, rgba(8, 18, 24, 0.04) 0%, rgba(8, 18, 24, 0.72) 100%),
      linear-gradient(90deg, rgba(8, 18, 24, 0.68) 0%, rgba(8, 18, 24, 0.12) 70%);
    inset: 0;
    position: absolute;
  }

  .testimonial-card__play,
  .testimonial-modal__play {
    align-items: center;
    background: rgba(255, 255, 255, 0.94);
    border-radius: 999px;
    color: var(--color-brand);
    display: inline-flex;
    height: 3rem;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    z-index: 2;
  }

  .testimonial-card__play svg,
  .testimonial-modal__play svg {
    height: 1.6rem;
    margin-left: 0.12rem;
    width: 1.6rem;
  }

  .testimonial-card__caption {
    bottom: 1rem;
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
    font-weight: 400 !important;
    font-size: 1.12rem;
    left: 1rem;
    line-height: 1.2;
    max-width: 9rem;
    position: absolute;
    text-align: left;
    z-index: 2;
  }

  .testimonial-card__caption-line {
    font-family: inherit !important;
  }

  .testimonial-card__divider {
    display: none;
  }

  .testimonial-card__content {
    align-content: center;
    display: flex;
    flex-direction: column;
    gap: 1.08rem;
    grid-column: 2;
    grid-row: 1;
    padding: 0.4rem 0.25rem 0.4rem 0;
  }

  .testimonial-card__person {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.52rem;
  }

  .testimonial-card__person h3 {
    color: var(--testimonial-heading);
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 40px;
    font-weight: 400;
    line-height: 1;
    text-align: center;
  }

  .testimonial-card__condition {
    color: var(--testimonial-detail);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.45;
  }

  .testimonial-card__condition strong {
    font-weight: 700;
  }

  .testimonial-card__condition-title {
    color: var(--testimonial-accent);
    display: block;
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
    font-size: 18px;
    line-height: 1.25;
    margin-bottom: 0.32rem;
  }

  .testimonial-card__condition--desktop .testimonial-card__condition-title {
    text-align: center;
  }

  .testimonial-card__condition--desktop .testimonial-card__condition-detail {
    text-align: center;
  }

  .testimonial-card__condition-detail {
    display: block;
  }

  .testimonial-card__condition--mobile {
    display: none;
  }

  .testimonial-card__person::after {
    background: linear-gradient(90deg, transparent 0%, rgba(140, 208, 214, 0.72) 18%, #8cd0d6 50%, rgba(140, 208, 214, 0.72) 82%, transparent 100%);
    clip-path: polygon(0 50%, 50% 0, 100% 50%, 50% 100%);
    content: '';
    display: block;
    height: 4px;
    justify-self: center;
    margin: 0.7rem auto 0;
    max-width: calc(100% - 1.5rem);
    width: 15.5rem;
  }

  .testimonial-card__change {
    border-left: 2px solid var(--testimonial-accent);
    padding-left: 0.9rem;
  }

  .testimonial-card__change span {
    color: var(--testimonial-accent);
    display: block;
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
    font-weight: 400 !important;
    font-size: 18px;
    letter-spacing: 0;
    margin-bottom: 0.32rem;
  }

  .testimonial-card__change p {
    color: var(--testimonial-body);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.48;
  }

  .testimonial-card__change--after {
    border-left-color: var(--testimonial-after);
    margin-top: 0.65rem;
  }

  .testimonial-card__change--after span {
    color: var(--testimonial-after);
  }

  .testimonials-cta {
    align-items: center;
    background: #f8f4f0;
    color: var(--color-brand);
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
    justify-content: center;
    padding: 1.5rem max(1.5rem, calc((100vw - 80rem) / 2)) 3.5rem;
    text-align: center;
  }

  .testimonials-cta h2 {
    color: var(--color-brand);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 1.45;
    max-width: 50rem;
  }

  .testimonials-cta h2 :global(strong) {
    font-weight: 700;
  }

  .testimonial-modal {
    align-items: center;
    background: rgba(7, 15, 20, 0.78);
    display: flex;
    inset: 0;
    justify-content: center;
    overflow-y: auto;
    padding: 3.25rem 1.25rem 1.5rem;
    position: fixed;
    z-index: 60;
  }

  .testimonial-modal__panel {
    max-width: min(21rem, 90vw, calc((100vh - 8.5rem) * 9 / 16));
    position: relative;
    width: 100%;
  }

  .testimonial-modal__close {
    align-items: center;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 999px;
    color: var(--color-brand);
    display: inline-flex;
    height: 2.35rem;
    justify-content: center;
    left: 0.65rem;
    position: absolute;
    right: auto;
    top: 0.65rem;
    width: 2.35rem;
    z-index: 3;
  }

  .testimonial-modal__close svg {
    height: 1.15rem;
    width: 1.15rem;
  }

  .testimonial-modal__video {
    aspect-ratio: 9 / 16;
    background: #0e1d26;
    border: 3px solid white;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    position: relative;
  }

  .testimonial-modal__video img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .testimonial-modal__video iframe {
    border: 0;
    height: 100%;
    inset: 0;
    position: absolute;
    width: 100%;
  }

  .testimonial-modal__video-shade {
    background: linear-gradient(180deg, rgba(8, 18, 24, 0.08), rgba(8, 18, 24, 0.45));
    inset: 0;
    position: absolute;
  }

  .testimonial-modal__caption {
    background: white;
    border-radius: 0 0 10px 10px;
    color: var(--color-brand);
    padding: 0.72rem 0.9rem 0.82rem;
    text-align: center;
  }

  .testimonial-modal__caption p {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 0.45rem;
  }

  .testimonial-modal__caption span {
    color: color-mix(in srgb, var(--color-brand) 72%, transparent);
    display: block;
    font-size: 12px;
    line-height: 1.3;
  }

  .testimonial-modal__summary-break {
    display: none;
  }

  @media (min-width: 768px) {
    .testimonials-hero__content {
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }

    .testimonials-hero h1 {
      font-size: 60px;
    }

    .testimonials-hero__lead p {
      font-size: 16px;
    }

    .testimonial-modal__close {
      height: 1.85rem;
      width: 1.85rem;
    }

    .testimonial-modal__close svg {
      height: 0.9rem;
      width: 0.9rem;
    }

    .testimonial-modal__summary-break {
      display: block;
    }

    .testimonials-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .testimonial-card__caption {
      bottom: 1.1rem;
      font-size: 15px;
      left: 50%;
      line-height: 1.2;
      max-width: calc(100% - 1.5rem);
      text-align: center;
      transform: translateX(-50%);
      white-space: nowrap;
    }
  }

  @media (max-width: 1023px) {
    .testimonial-card {
      grid-template-columns: minmax(8.5rem, 0.58fr) minmax(0, 1fr);
    }

    .testimonial-card__media {
      min-height: 16rem;
    }

    .testimonial-card__caption {
      white-space: normal;
    }
  }

  @media (max-width: 680px) {
    .testimonials-hero {
      min-height: 0;
    }

    .testimonials-hero__content {
      padding-top: 6.7rem;
      padding-bottom: 4rem;
    }

    .testimonials-hero__lead {
      max-width: 20rem;
    }

    .testimonials-hero__lead p {
      font-size: 15px;
    }

    .testimonials-hero__lead br {
      display: none;
    }

    .testimonials-section {
      padding: 4rem 1rem 2rem;
    }

    .testimonial-card {
      grid-template-columns: 1fr;
      padding: 0.6rem;
    }

    .testimonial-card__divider {
      background: linear-gradient(90deg, transparent, #8cd0d6 16%, #8cd0d6 84%, transparent);
      display: block;
      grid-column: 1;
      grid-row: 4;
      height: 1px;
    }

    .testimonial-card__media {
      aspect-ratio: 3 / 4;
      grid-column: 1;
      grid-row: 2;
      min-height: auto;
    }

    .testimonial-card__caption {
      bottom: 1rem;
      font-size: 15px;
      left: 50%;
      line-height: 1.2;
      max-width: calc(100% - 1.25rem);
      text-align: center;
      transform: translateX(-50%);
      white-space: nowrap;
    }

    .testimonial-card__content {
      display: contents;
      padding: 0.15rem 0.2rem 0.4rem;
    }

    .testimonial-card__person {
      grid-column: 1;
      grid-row: 1;
      padding: 0.15rem 0 0;
    }

    .testimonial-card__person h3 {
      text-align: center;
    }

    .testimonial-card__condition--desktop {
      display: none;
    }

    .testimonial-card__condition--mobile {
      border-left: 2px solid var(--testimonial-accent);
      display: block;
      font-size: 14px;
      line-height: 1.45;
      margin-top: 0.45rem;
      padding-left: 0.4rem;
      text-align: left;
    }

    .testimonial-card__condition-detail {
      color: var(--testimonial-detail);
      display: block;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: inherit;
    }

    .testimonial-card__person::after {
      display: none;
    }

    .testimonial-card__change {
      border-left-color: var(--testimonial-accent);
      grid-column: 1;
      grid-row: 3;
      margin: 0.15rem 0 0;
      padding-left: 0.4rem;
    }

    .testimonial-card__change span {
      color: var(--testimonial-accent);
    }

    .testimonial-card__change p {
      color: var(--testimonial-detail);
      font-size: 12px;
    }

    .testimonial-card__change--after {
      border-left-color: var(--testimonial-after);
      grid-row: 5;
      margin: 0.1rem 0 0.35rem;
    }

    .testimonial-card__change--after span {
      color: var(--testimonial-after);
    }

    .testimonial-card__change--after p {
      color: var(--testimonial-detail);
    }

    .testimonials-cta {
      align-items: center;
      flex-direction: column;
      padding-bottom: 3.5rem;
      padding-top: 2.25rem;
      text-align: center;
    }

    .testimonial-modal__panel {
      max-width: min(18.5rem, 86vw, calc((100vh - 7.5rem) * 9 / 16));
    }

    .testimonial-modal__close {
      height: 2.15rem;
      width: 2.15rem;
    }
  }
  .testimonial-card h3, .testimonial-card p, .testimonial-card span, .testimonial-card strong {
    transition: color 380ms ease-out;
  }
  @media (min-width: 768px) and (hover: hover) {
    .testimonial-card:is(:hover, :focus-within) {
      background: var(--eima-card-hover-background);
      border-color: var(--eima-card-hover-border);
      box-shadow: var(--eima-card-hover-shadow);
      --testimonial-heading: #fff;
      --testimonial-detail: #fff;
      --testimonial-body: #fff;
      --testimonial-accent: #8cd0d6;
      --testimonial-after: #8cd0d6;
    }
    .testimonial-card:is(:hover, :focus-within) .testimonial-card__media {
      box-shadow: 0 18px 38px #071a2540, 0 0 28px #8cd0d673;
    }
  }
  @media (max-width: 767px) {
    .testimonial-card:global(.scroll-active) {
      background: var(--eima-card-hover-background);
      border-color: var(--eima-card-hover-border);
      box-shadow: var(--eima-card-hover-shadow);
      --testimonial-heading: #fff;
      --testimonial-detail: #fff;
      --testimonial-body: #fff;
      --testimonial-accent: #8cd0d6;
      --testimonial-after: #8cd0d6;
    }
    .testimonial-card:global(.scroll-active) .testimonial-card__media {
      box-shadow: 0 18px 38px #071a2540, 0 0 28px #8cd0d673;
    }
    .testimonial-card .testimonial-card__media {
      width: 75%;
      container-type: inline-size;
      justify-self: center;
      aspect-ratio: 3 / 4;
      min-height: 0;
      align-self: start;
    }
    .testimonial-card .testimonial-card__caption {
      font-size: clamp(11px, 7cqi, 14px);
      left: 50%;
      white-space: nowrap;
      max-width: calc(100% - 1.25rem);
      text-align: center;
      transform: translateX(-50%);
    }
    .testimonial-card__caption-line { display: inline; }
  }
  @media (prefers-reduced-motion: reduce) {
    .testimonial-card, .testimonial-card h3, .testimonial-card p, .testimonial-card span, .testimonial-card strong, .testimonial-card__media, .testimonial-card__media img { transition: none; }
    .testimonial-card__media:hover img, .testimonial-card__media:focus-visible img { transform: none; }
  }
</style>
