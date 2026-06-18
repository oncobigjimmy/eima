<script>
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { WEB_WHATSAPP_HREF } from '$lib/data/whatsapp';

  const testimonials = [
    {
      name: 'Josué',
      condition: 'Glioblastoma estadio IV. Cirugía, radioterapia, quimioterapia y meses de parón antes de volver a moverse.',
      conditionTitle: 'Glioblastoma estadio IV',
      conditionDetail: 'Ha pasado por cirugía, radioterapia, quimioterapia y meses de parón antes de volver a moverse.',
      before: 'De sentirse debilitado tras el tratamiento y ver muy lejos recuperar su rutina deportiva',
      after: 'A ganar energía, ánimo y constancia con ejercicio adaptado y seguimiento diario',
      modalTitle: 'Josué · Glioblastoma estadio IV',
      summary: 'De sentirse debilitado tras los tratamientos a recuperar energía, ánimo y constancia.',
      summaryLines: [
        'De sentirse debilitado tras los',
        'tratamientos a recuperar energía,',
        'ánimo y constancia.'
      ],
      image: '/testimonials/testimonial-josue.jpg',
      videoUrl: 'https://www.youtube.com/embed/85AuEva-CUc'
    },
    {
      name: 'Marta',
      condition: 'fatiga, perdida de fuerza y dudas sobre que podia hacer sin empeorar.',
      before: 'De sentir que el cuerpo no respondia y parar por miedo',
      after: 'A construir una rutina posible y volver a sentirse autonoma',
      image: '/testimonials/testimonial-marta.jpg'
    },
    {
      name: 'Carlos',
      condition: 'molestias persistentes de cadera y falta de confianza para caminar mas.',
      before: 'De cancelar planes por inseguridad y rigidez',
      after: 'A caminar mas lejos, subir cuestas y disfrutar sin anticipar dolor',
      image: '/testimonials/testimonial-carlos.jpg'
    },
    {
      name: 'Elena',
      condition: 'dolor cervical, cansancio y tension acumulada al final del dia.',
      before: 'De terminar cada jornada agotada y con miedo a cargar peso',
      after: 'A recuperar movilidad, fuerza y tranquilidad en su rutina',
      image: '/testimonials/testimonial-elena.jpg'
    }
  ];

  let activeTestimonial = null;

  function openTestimonial(testimonial) {
    activeTestimonial = testimonial;
    document.body.style.overflow = 'hidden';
  }

  function closeTestimonial() {
    activeTestimonial = null;
    document.body.style.overflow = '';
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && activeTestimonial) closeTestimonial();
  }

  onDestroy(() => {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
  <title>Testimonios | EIMA Fisioterapia</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta
    name="description"
    content="Pagina interna de EIMA Fisioterapia para preparar futuros testimonios en video."
  />
</svelte:head>

<section class="testimonials-hero">
  <div class="testimonials-hero__image" aria-hidden="true"></div>
  <div class="testimonials-hero__shade" aria-hidden="true"></div>
  <div class="testimonials-hero__content">
    <h1>Historias <span>reales</span></h1>
    <div class="testimonials-hero__lead">
      <p>Cada persona llega en <strong>un punto diferente.</strong></p>
      <p>
        Algunas están en tratamiento, otras acaban de terminarlo<br />
        y muchas no <strong>saben cómo volver</strong> a moverse sin miedo.
      </p>
      <p>
        En EIMA trabajamos con <strong>ejercicio</strong> adaptado,<br />
        mejora de <strong>hábitos</strong> y <strong>seguimiento diario</strong> para ajustar el plan<br />
        según la fatiga, el tratamiento y la respuesta de <strong>cada persona.</strong>
      </p>
    </div>

    <a class="testimonials-hero__cta" href="/como-funciona#program-steps">
      <span>Conoce cómo trabajamos</span>
    </a>
  </div>
</section>

<section class="testimonials-section" aria-labelledby="testimonios-title">
  <div class="testimonials-section__inner">
    <h2 id="testimonios-title" class="sr-only">Testimonios</h2>

    <div class="testimonials-grid">
      {#each testimonials as testimonial (testimonial.name)}
        <article class="testimonial-card">
          <div class="testimonial-card__content">
            <div class="testimonial-card__person">
              <h3>{testimonial.name}</h3>
              <p class="testimonial-card__condition testimonial-card__condition--desktop">
                {testimonial.condition}
              </p>
              <p class="testimonial-card__condition testimonial-card__condition--mobile">
                {#if testimonial.conditionTitle && testimonial.conditionDetail}
                  <span class="testimonial-card__condition-title">{testimonial.conditionTitle}</span>
                  <span class="testimonial-card__condition-detail">{testimonial.conditionDetail}</span>
                {:else}
                  {testimonial.condition}
                {/if}
              </p>
            </div>

            <div class="testimonial-card__change">
              <span>Antes</span>
              <p>{testimonial.before}</p>
            </div>

            <div class="testimonial-card__change testimonial-card__change--after">
              <span>Ahora</span>
              <p>{testimonial.after}</p>
            </div>
          </div>

          <button
            class="testimonial-card__media"
            type="button"
            aria-label={`Ver testimonio de ${testimonial.name}`}
            on:click={() => openTestimonial(testimonial)}
          >
            <img src={testimonial.image} alt="" loading="lazy" />
            <span class="testimonial-card__overlay" aria-hidden="true"></span>
            <span class="testimonial-card__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l10-6.5-10-6.5Z" />
              </svg>
            </span>
            <span class="testimonial-card__caption">Conoce la historia de {testimonial.name}</span>
          </button>

          <div class="testimonial-card__divider" aria-hidden="true"></div>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="testimonials-cta" aria-labelledby="testimonios-cta-title">
  <div>
    <h2 id="testimonios-cta-title">
      Si <strong>quieres cambiar</strong> tu situación actual, pero <strong>no sabes cómo</strong> hacerlo.
    </h2>
  </div>
  <a class="cta-arrow-button" href={WEB_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
    <span>Háblanos de tu caso</span>
    <span class="cta-arrow-swap" aria-hidden="true">
      <svg class="cta-arrow-swap__right" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg class="cta-arrow-swap__up" viewBox="0 0 24 24" fill="none">
        <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </a>
</section>

{#if activeTestimonial}
  <div
    class="testimonial-modal"
    role="presentation"
    on:click={closeTestimonial}
    transition:fade={{ duration: 140 }}
  >
    <div
      class="testimonial-modal__panel"
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonio de ${activeTestimonial.name}`}
      tabindex="-1"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <button class="testimonial-modal__close" type="button" aria-label="Cerrar video" on:click={closeTestimonial}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>

      <div class="testimonial-modal__video">
        {#if activeTestimonial.videoUrl}
          <iframe
            src={`${activeTestimonial.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
            title={`Testimonio de ${activeTestimonial.name}`}
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
              {line}{#if index < activeTestimonial.summaryLines.length - 1}<br class="testimonial-modal__summary-break" />{/if}
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
    background: #f4f8f0;
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
    min-height: 76vh;
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
    background:
      linear-gradient(90deg, rgba(8, 18, 24, 0.82) 0%, rgba(8, 18, 24, 0.66) 44%, rgba(8, 18, 24, 0.32) 100%),
      linear-gradient(180deg, rgba(8, 18, 24, 0.22) 0%, rgba(8, 18, 24, 0.58) 100%);
    inset: 0;
    position: absolute;
  }

  .testimonials-hero__content {
    color: white;
    margin: 0 auto;
    max-width: 80rem;
    padding: 7.5rem 1.5rem 5.5rem;
    position: relative;
    z-index: 1;
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
    max-width: 47rem;
  }

  .testimonials-hero__lead p {
    color: rgba(255, 255, 255, 0.84);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.68;
  }

  .testimonials-hero__lead strong {
    color: white;
    font-weight: 700;
  }

  .testimonials-hero__cta {
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.72);
    border-radius: 999px;
    color: white;
    display: flex;
    gap: 0.55rem;
    isolation: isolate;
    justify-content: center;
    margin: 2rem auto 0;
    min-width: 15.5rem;
    overflow: hidden;
    padding: 0.82rem 1.45rem;
    position: relative;
    transition:
      background-color 180ms ease,
      border-color 180ms ease,
      box-shadow 180ms ease,
      font-weight 180ms ease,
      transform 180ms ease;
    width: fit-content;
  }

  .testimonials-hero__cta::before {
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

  .testimonials-hero__cta:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.92);
    box-shadow: 0 14px 32px rgba(255, 255, 255, 0.1);
    font-weight: 700;
    transform: translateY(-2px) scale(1.03);
  }

  .testimonials-hero__cta:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .testimonials-hero__cta > span {
    position: relative;
    z-index: 1;
  }

  .testimonials-section {
    background:
      linear-gradient(180deg, rgba(140, 208, 214, 0.12), transparent 18rem),
      #f4f8f0;
    padding: 4.4rem 1.25rem 3.2rem;
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
    background: color-mix(in srgb, #ffffff 64%, #f4f8f0);
    border: 1px solid rgba(140, 208, 214, 0.74);
    border-radius: 8px;
    display: grid;
    gap: 1.15rem;
    grid-template-columns: minmax(11rem, 0.72fr) minmax(0, 1fr);
    min-height: 20rem;
    overflow: hidden;
    padding: 1rem;
  }

  .testimonial-card__media {
    align-self: stretch;
    background: #0e1d26;
    border-radius: 8px;
    color: white;
    display: block;
    grid-column: 1;
    grid-row: 1;
    min-height: 18.75rem;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .testimonial-card__media img {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: transform 320ms ease;
    width: 100%;
  }

  .testimonial-card__media:hover img,
  .testimonial-card__media:focus-visible img {
    transform: scale(1.045);
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
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-size: 1.12rem;
    font-weight: 400;
    left: 1rem;
    line-height: 1.2;
    max-width: 9rem;
    position: absolute;
    text-align: left;
    z-index: 2;
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
    gap: 0.52rem;
  }

  .testimonial-card__person h3 {
    color: var(--color-brand);
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 40px;
    font-weight: 400;
    line-height: 1;
  }

  .testimonial-card__condition {
    color: color-mix(in srgb, var(--color-brand) 80%, transparent);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.55;
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
    border-left: 2px solid #4083a7;
    padding-left: 0.9rem;
  }

  .testimonial-card__change span {
    color: #4083a7;
    display: block;
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0;
    margin-bottom: 0.32rem;
  }

  .testimonial-card__change p {
    color: var(--color-brand);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.48;
  }

  .testimonial-card__change--after {
    border-left-color: #245b7d;
    margin-top: 0.65rem;
  }

  .testimonial-card__change--after span {
    color: #245b7d;
  }

  .testimonials-cta {
    align-items: center;
    background: #f4f8f0;
    color: var(--color-brand);
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
    justify-content: center;
    padding: 2.25rem max(1.5rem, calc((100vw - 80rem) / 2)) 3.5rem;
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

  .testimonials-cta h2 strong {
    font-weight: 700;
  }

  .testimonials-cta a {
    align-items: center;
    background: #8cd0d6;
    border-radius: 999px;
    color: var(--color-brand);
    display: inline-flex;
    flex: none;
    font-weight: 500;
    gap: 0.55rem;
    justify-content: center;
    min-width: 14.4rem;
    padding: 0.92rem 1.55rem;
    transition:
      background-color 180ms ease,
      box-shadow 180ms ease,
      color 180ms ease,
      font-weight 180ms ease,
      transform 180ms ease;
  }

  .testimonials-cta .cta-arrow-swap {
    height: 1.55rem;
    width: 1.55rem;
  }

  .testimonials-cta .cta-arrow-swap svg {
    height: 1.55rem;
    width: 1.55rem;
  }

  .testimonials-cta a:hover {
    background: #4083a7;
    box-shadow: 0 14px 28px rgba(64, 131, 167, 0.22);
    color: white;
    font-weight: 700;
    transform: translateY(-2px);
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
      font-size: 70px;
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
      min-height: 20rem;
    }

    .testimonial-card__media {
      min-height: 18rem;
    }
  }

  @media (max-width: 680px) {
    .testimonials-hero {
      min-height: 72vh;
    }

    .testimonials-hero__content {
      padding-top: 6.7rem;
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
      padding: 4rem 1rem 5rem;
    }

    .testimonial-card {
      grid-template-columns: 1fr;
      padding: 0.8rem;
    }

    .testimonial-card__divider {
      background: linear-gradient(90deg, transparent, #8cd0d6 16%, #8cd0d6 84%, transparent);
      display: block;
      grid-column: 1;
      grid-row: 4;
      height: 1px;
    }

    .testimonial-card__media {
      aspect-ratio: 9 / 14;
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
      padding: 0.15rem 0.2rem 0;
    }

    .testimonial-card__person h3 {
      text-align: center;
    }

    .testimonial-card__condition--desktop {
      display: none;
    }

    .testimonial-card__condition--mobile {
      border-left: 2px solid #4083a7;
      display: block;
      font-size: 15px;
      line-height: 1.48;
      margin-top: 0.45rem;
      padding-left: 0.9rem;
      text-align: left;
    }

    .testimonial-card__condition-title {
      color: #4083a7;
      display: block;
      font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 0.35rem;
    }

    .testimonial-card__condition-detail {
      color: rgba(35, 63, 78, 0.8);
      display: block;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.48;
    }

    .testimonial-card__person::after {
      display: none;
    }

    .testimonial-card__change {
      border-left-color: #245b7d;
      grid-column: 1;
      grid-row: 3;
      margin: 0.15rem 0.2rem 0;
    }

    .testimonial-card__change span {
      color: #245b7d;
    }

    .testimonial-card__change p {
      color: rgba(35, 63, 78, 0.8);
    }

    .testimonial-card__change--after {
      border-left-color: #233f4e;
      grid-row: 5;
      margin: 0.1rem 0.2rem 0.35rem;
    }

    .testimonial-card__change--after span {
      color: #233f4e;
    }

    .testimonial-card__change--after p {
      color: rgba(35, 63, 78, 0.8);
    }

    .testimonials-cta {
      align-items: center;
      flex-direction: column;
      padding-bottom: 3.5rem;
      padding-top: 3.5rem;
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
</style>
