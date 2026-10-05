<script>
  import { contactLayout } from '$lib/i18n/reviewed';
  import { site } from '$lib/site';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';

  $: layout = contactLayout[$language];
  $: whatsappHref = getWhatsAppHref($language);
</script>

<section id="contacto" class="contact-page" class:contact-page--es={true} class:contact-page--ca={$language === 'ca'}>
  <div class="contact-background" aria-hidden="true">
    <img src="/contact-walking-couple.png" alt="" />
  </div>

  <div class="contact-inner">
    <div class="contact-copy photo-text-contrast">
      <h1 class="contact-title">
        {#each layout.lines as line, index}{#if index > 0}{' '}{/if}<span>{@html line}</span>{/each}
      </h1>

      <div class="contact-intro">{#each layout.intro as paragraph, index}{#if index > 0}{' '}{/if}<p>{@html paragraph}</p>{/each}</div>

      <div class="contact-methods photo-text-contrast">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          class="contact-method contact-method--whatsapp"
        >
          <span class="contact-method__icon" aria-hidden="true">
            <svg viewBox="0 0 448 512" fill="currentColor" class="contact-method__whatsapp">
              <path
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.5 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4-.1 101.8-82.9 184.7-184.5 184.7zm101.2-138.1c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.8 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.5z"
              />
            </svg>
          </span>
          <span class="contact-method__label">WhatsApp</span>
        </a>

        <a href={site.phoneHref} class="contact-method contact-method--phone">
          <span class="contact-method__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" class="contact-method__phone">
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
              />
            </svg>
          </span>
          <span class="contact-method__label">{site.phone}</span>
        </a>

        <a href={`mailto:${site.email}`} class="contact-method contact-method--email">
          <span class="contact-method__icon" aria-hidden="true">
            <svg viewBox="0 0 256 256" fill="currentColor" class="contact-method__email">
              <path
                d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"
              />
            </svg>
          </span>
          <span class="contact-method__label">{site.email}</span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-page {
    position: relative;
    isolation: isolate;
    min-height: 590px;
    overflow: hidden;
    background: #13212b;
    padding: clamp(6rem, 7.5vw, 6.5rem) 0 clamp(4rem, 6vw, 5rem);
  }
  @media (min-width: 1024px) {
    .contact-page--es {
      padding-top: 105.5px;
    }
  }
  .contact-background {
    position: absolute;
    z-index: -1;
    inset: 0;
  }
  .contact-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .contact-background::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--site-hero-overlay);
  }
  .contact-inner {
    width: min(calc(100% - 5rem), 1200px);
    margin: 0 auto;
  }
  .contact-copy {
    max-width: 42rem;
    color: white;
  }
  .contact-title {
    max-width: 100%;
    color: white;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 66px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.08;
  }
  .contact-title > span {
    display: block;
  }
  @media (min-width: 900px) {
    .contact-page--ca .contact-title {
      font-size: 60px;
    }
  }
  .contact-title :global(span) {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  }
  :global(.contact-title__accent) {
    color: #8cd0d6;
  }
  .contact-intro {
    max-width: 42rem;
    margin-top: 1.5rem;
    color: rgba(255, 255, 255, 0.92);
    font-family: 'Inter', Arial, sans-serif;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.65;
  }
  .contact-intro :global(strong) {
    color: white;
    font-weight: 600;
  }
  .contact-intro > p { display: inline; }
  .contact-methods {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    margin-top: 2rem;
  }
  .contact-method {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 0.95rem;
    color: rgba(255, 255, 255, 0.96);
    text-align: left;
    text-decoration: none;
    transition:
      color 220ms ease,
      transform 220ms ease;
  }
  .contact-method:is(:hover, :focus-visible) {
    color: white;
    transform: translateX(6px);
  }
  .contact-method__label {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.45;
    transition:
      color 180ms ease,
      font-weight 180ms ease;
  }
  .contact-method:is(:hover, :focus-visible) .contact-method__label {
    color: #4083a7;
    font-weight: 700;
  }
  .contact-method--whatsapp:is(:hover, :focus-visible) .contact-method__label {
    color: #06c755;
  }
  .contact-method__icon {
    position: relative;
    display: inline-flex;
    flex: none;
    width: 2.75rem;
    height: 2.75rem;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    background: #4083a7;
    color: white;
    text-shadow: none;
    transition: box-shadow 180ms ease;
  }
  .contact-method--whatsapp .contact-method__icon {
    background: #06c755;
  }
  .contact-method__icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 48%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    transform: translateX(-170%) skewX(-18deg);
    transition: transform 430ms ease-out;
  }
  .contact-method:is(:hover, :focus-visible) .contact-method__icon {
    box-shadow: 0 8px 18px rgba(8, 18, 24, 0.22);
  }
  .contact-method:is(:hover, :focus-visible) .contact-method__icon::before {
    transform: translateX(180%) skewX(-18deg);
  }
  .contact-method__icon svg {
    position: relative;
    z-index: 1;
  }
  .contact-method__whatsapp {
    width: 1.42rem;
    height: 1.42rem;
  }
  .contact-method__email {
    width: 1.72rem;
    height: 1.72rem;
  }
  .contact-method__phone {
    width: 1.7rem;
    height: 1.7rem;
  }
  @media (max-width: 899px) {
    .contact-page {
      min-height: auto;
      padding: 6rem 0 4rem;
    }
    .contact-inner {
      width: min(calc(100% - 3rem), 38rem);
    }
    .contact-title {
      font-size: clamp(36px, 9vw, 60px);
    }
    :global(.desktop-break) {
      display: none;
    }
  }
  @media (min-width: 900px) {
    :global(.desktop-break) {
      display: initial;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .contact-method,
    .contact-method__label,
    .contact-method__icon,
    .contact-method__icon::before {
      transition: none;
    }
    .contact-method:is(:hover, :focus-visible) {
      transform: none;
    }
  }
  @media (max-width: 767px) {
    .contact-intro > p { display: block; }
    .contact-intro > p + p { margin-top: 8px; }
    .contact-methods { margin-top: calc(2rem + 8px); }
  }
</style>
