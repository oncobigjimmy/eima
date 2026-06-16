<script>
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  const testimonials = [
    {
      name: 'Josue',
      condition: 'dolor lumbar, miedo al esfuerzo y meses evitando moverse con confianza.',
      before: 'De vivir pendiente del dolor y medir cada gesto del dia',
      after: 'A volver a entrenar fuerza, moverse con calma y recuperar seguridad',
      image: '/testimonials/testimonial-josue.jpg'
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
    <nav aria-label="Migas de pan" class="testimonials-hero__breadcrumbs">
      <a href="/">Inicio</a>
      <span aria-hidden="true">/</span>
      <span>Testimonios</span>
    </nav>

    <p class="testimonials-hero__eyebrow">Historias EIMA</p>
    <h1>Historias reales de personas que volvieron a confiar en su cuerpo</h1>
    <p class="testimonials-hero__lead">
      El dolor, miedo, dudas y un proceso acompañado. Estos son algunos caminos de vuelta al movimiento.
    </p>
  </div>
</section>

<section class="testimonials-section" aria-labelledby="testimonios-title">
  <div class="testimonials-section__inner">
    <div class="testimonials-section__heading">
      <p>Testimonios en preparacion</p>
      <h2 id="testimonios-title">Procesos reales, contados desde el cambio</h2>
    </div>

    <div class="testimonials-grid">
      {#each testimonials as testimonial (testimonial.name)}
        <article class="testimonial-card">
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

          <div class="testimonial-card__content">
            <p class="testimonial-card__person">
              <strong>{testimonial.name}:</strong> {testimonial.condition}
            </p>

            <div class="testimonial-card__change">
              <span>Antes</span>
              <p>{testimonial.before}</p>
            </div>

            <div class="testimonial-card__change testimonial-card__change--after">
              <span>Ahora</span>
              <p>{testimonial.after}</p>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="testimonials-cta" aria-labelledby="testimonios-cta-title">
  <div>
    <p>Tu proceso tambien puede empezar aqui</p>
    <h2 id="testimonios-cta-title">Hablemos de tu caso con calma.</h2>
  </div>
  <a class="cta-arrow-button" href="/contacto">
    <span>Quiero que me orientéis</span>
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
        <img src={activeTestimonial.image} alt="" />
        <div class="testimonial-modal__video-shade" aria-hidden="true"></div>
        <span class="testimonial-modal__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l10-6.5-10-6.5Z" />
          </svg>
        </span>
      </div>

      <div class="testimonial-modal__caption">
        <p>{activeTestimonial.name}</p>
        <span>{activeTestimonial.before} · {activeTestimonial.after}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body:has(.testimonial-modal)) {
    overflow: hidden;
  }

  .testimonials-hero {
    min-height: 76vh;
    overflow: hidden;
    position: relative;
  }

  .testimonials-hero__image {
    background-image: url('/blog-hero-mallorca.png');
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

  .testimonials-hero__breadcrumbs {
    align-items: center;
    color: rgba(255, 255, 255, 0.72);
    display: flex;
    font-size: 0.9rem;
    gap: 0.55rem;
    margin-bottom: 4rem;
  }

  .testimonials-hero__breadcrumbs a {
    transition: color 180ms ease;
  }

  .testimonials-hero__breadcrumbs a:hover {
    color: white;
  }

  .testimonials-hero__eyebrow,
  .testimonials-section__heading p,
  .testimonials-cta p {
    color: #8cd0d6;
    font-size: 0.77rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .testimonials-hero h1 {
    color: white;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: clamp(2.55rem, 6vw, 5.8rem);
    font-weight: 500;
    letter-spacing: 0;
    line-height: 0.98;
    margin-top: 1rem;
    max-width: 58rem;
  }

  .testimonials-hero__lead {
    color: rgba(255, 255, 255, 0.82);
    font-size: clamp(1rem, 2vw, 1.22rem);
    font-weight: 300;
    line-height: 1.65;
    margin-top: 1.5rem;
    max-width: 40rem;
  }

  .testimonials-section {
    background:
      linear-gradient(180deg, rgba(140, 208, 214, 0.12), transparent 18rem),
      var(--color-surface);
    padding: 5rem 1.25rem 6rem;
  }

  .testimonials-section__inner {
    margin: 0 auto;
    max-width: 80rem;
  }

  .testimonials-section__heading {
    align-items: end;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .testimonials-section__heading h2 {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3.8vw, 3.45rem);
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.08;
    margin-top: 0.7rem;
    max-width: 46rem;
  }

  .testimonials-grid {
    display: grid;
    gap: 1.35rem;
  }

  .testimonial-card {
    background: color-mix(in srgb, #ffffff 64%, var(--color-surface));
    border: 1px solid rgba(140, 208, 214, 0.74);
    border-radius: 8px;
    display: grid;
    gap: 1.15rem;
    grid-template-columns: minmax(11rem, 0.72fr) 1px minmax(0, 1fr);
    min-height: 24rem;
    overflow: hidden;
    padding: 1rem;
  }

  .testimonial-card__media {
    align-self: stretch;
    background: #0e1d26;
    border-radius: 8px;
    color: white;
    display: block;
    min-height: 22rem;
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
    background: linear-gradient(180deg, transparent, #8cd0d6 16%, #8cd0d6 84%, transparent);
  }

  .testimonial-card__content {
    align-content: center;
    display: grid;
    gap: 1rem;
    padding: 0.4rem 0.25rem 0.4rem 0;
  }

  .testimonial-card__person {
    color: color-mix(in srgb, var(--color-brand) 82%, transparent);
    font-size: 0.95rem;
    font-weight: 300;
    line-height: 1.65;
  }

  .testimonial-card__person strong {
    color: var(--color-brand);
  }

  .testimonial-card__change {
    border-left: 2px solid rgba(35, 63, 78, 0.18);
    padding-left: 0.9rem;
  }

  .testimonial-card__change span {
    color: var(--color-brand-soft);
    display: block;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    margin-bottom: 0.32rem;
    text-transform: uppercase;
  }

  .testimonial-card__change p {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-size: 1.13rem;
    font-weight: 400;
    line-height: 1.35;
  }

  .testimonial-card__change--after {
    border-left-color: #8cd0d6;
  }

  .testimonials-cta {
    align-items: center;
    background: #233f4e;
    color: white;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    padding: 3rem max(1.5rem, calc((100vw - 80rem) / 2));
  }

  .testimonials-cta h2 {
    color: white;
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3vw, 3rem);
    font-weight: 400;
    letter-spacing: 0;
    margin-top: 0.45rem;
  }

  .testimonials-cta a {
    align-items: center;
    background: #8cd0d6;
    border-radius: 999px;
    color: var(--color-brand);
    display: inline-flex;
    flex: none;
    font-weight: 400;
    gap: 0.55rem;
    padding: 0.9rem 1.35rem;
    transition:
      background-color 180ms ease,
      color 180ms ease,
      transform 180ms ease;
  }

  .testimonials-cta a:hover {
    background: #ffffff;
    transform: translateY(-2px);
  }

  .testimonial-modal {
    align-items: center;
    background: rgba(7, 15, 20, 0.78);
    display: flex;
    inset: 0;
    justify-content: center;
    padding: 1.25rem;
    position: fixed;
    z-index: 60;
  }

  .testimonial-modal__panel {
    max-width: min(25rem, 92vw);
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
    position: absolute;
    right: -0.75rem;
    top: -0.75rem;
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

  .testimonial-modal__video-shade {
    background: linear-gradient(180deg, rgba(8, 18, 24, 0.08), rgba(8, 18, 24, 0.45));
    inset: 0;
    position: absolute;
  }

  .testimonial-modal__caption {
    background: white;
    border-radius: 0 0 10px 10px;
    color: var(--color-brand);
    padding: 1rem 1.1rem 1.1rem;
  }

  .testimonial-modal__caption p {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .testimonial-modal__caption span {
    color: color-mix(in srgb, var(--color-brand) 72%, transparent);
    display: block;
    font-size: 0.9rem;
    line-height: 1.45;
  }

  @media (min-width: 768px) {
    .testimonials-hero__content {
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }

    .testimonials-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 1023px) {
    .testimonials-section__heading {
      align-items: start;
      display: block;
    }

    .testimonial-card {
      grid-template-columns: minmax(8.5rem, 0.58fr) 1px minmax(0, 1fr);
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

    .testimonials-hero__breadcrumbs {
      margin-bottom: 2.8rem;
    }

    .testimonials-hero__lead {
      max-width: 20rem;
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
      height: 1px;
    }

    .testimonial-card__media {
      aspect-ratio: 9 / 14;
      min-height: auto;
    }

    .testimonial-card__content {
      padding: 0.15rem 0.2rem 0.4rem;
    }

    .testimonials-cta {
      align-items: start;
      flex-direction: column;
      padding-bottom: 3.5rem;
      padding-top: 3.5rem;
    }

    .testimonial-modal__panel {
      max-width: min(20rem, 86vw);
    }

    .testimonial-modal__close {
      right: 0.65rem;
      top: 0.65rem;
    }
  }
</style>
