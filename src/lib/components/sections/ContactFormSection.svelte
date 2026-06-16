<script>
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { getContactCopy } from '$lib/i18n/contact';
  import { language } from '$lib/i18n/language';
  import { getRoutePath } from '$lib/i18n/routes';

  export let form = null;

  const instagramHref = 'https://www.instagram.com/eima.fisioterapia';
  const facebookHref = 'https://www.facebook.com/share/1EeWREQSQi/?mibextid=wwXIfr';

  $: copy = getContactCopy($language);
  $: hero = copy.hero;
  $: formCopy = copy.form;
  $: whatsappHref = getWhatsAppHref($language);
  $: formAction = getRoutePath('contact', $language);
  $: localizedError = form?.error ? getLocalizedError(form.error, formCopy.errors) : '';

  function getLocalizedError(error, errors) {
    if (error === 'Email requerido') return errors.email;
    if (error === 'Nombre requerido') return errors.name;
    if (error === 'El formulario no está configurado todavía.') return errors.notConfigured;
    if (error === 'Error interno del servidor') return errors.internal;
    return error;
  }
</script>

<section
  id="contacto"
  class="contact-page relative min-h-screen overflow-hidden bg-[#13212b] pt-24 md:pt-28"
>
  <div class="absolute inset-0">
    <img
      src="/Gemini_Generated_Image_rp1v8grp1v8grp1v1.png"
      alt=""
      class="h-full w-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,24,0.78)_0%,rgba(8,18,24,0.56)_36%,rgba(8,18,24,0.28)_57%,rgba(8,18,24,0.54)_100%)]"></div>
    <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,24,0.52)_0%,rgba(8,18,24,0.18)_26%,rgba(8,18,24,0.18)_74%,rgba(8,18,24,0.62)_100%)]"></div>
  </div>

  <div class="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-stretch px-5 pb-10 md:px-10 md:pb-14">
    <div
      class="grid w-full content-start items-start gap-8 lg:content-end lg:grid-cols-[minmax(0,1fr)_minmax(300px,350px)] xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14"
    >
      <div class="flex max-w-[42rem] flex-col justify-start self-start text-white">
        <div class="max-w-[31rem]">
          <h1 class="contact-title text-white">
            <span class="contact-title__line">
              {hero.titleLineOne}
            </span>
            <span class="contact-title__line">
              <span class="text-[#8CD0D6]">{hero.titleHighlight}</span>
            </span>
            <span class="contact-title__line">
              {hero.titleLineThree}
            </span>
          </h1>

          <p class="intro-copy mt-6 text-[1.16rem] leading-[1.65] text-white/92">
            {hero.introPrefix}
            <span class="desktop-break"><br /></span>
            {#if hero.introConnector}{hero.introConnector}{' '}{/if}<strong class="font-semibold text-white">{hero.introStrong}</strong>
          </p>

          <p class="intro-copy mt-5 text-[1.16rem] leading-[1.65] text-white/92">
            {hero.casePrefix}
            <span class="desktop-break"><br /></span>
            <strong class="font-semibold text-white">{hero.caseStrong}</strong> {hero.caseSuffix}
          </p>
        </div>

        <div class="mt-9 flex max-w-[26rem] flex-col gap-3 text-white/95">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" class="contact-link">
            <span class="contact-link__icon contact-link__icon--whatsapp" aria-hidden="true">
              <svg viewBox="0 0 448 512" fill="currentColor" class="contact-link__whatsapp">
                <path
                  d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.4 32 1.9 131.5 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.5 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4-.1 101.8-82.9 184.7-184.5 184.7zm101.2-138.1c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.8 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.5z"
                />
              </svg>
            </span>
            <span class="contact-link__text">WhatsApp</span>
          </a>

          <a href="mailto:info@eimafisioterapia.es" class="contact-link">
            <span class="contact-link__icon contact-link__icon--email" aria-hidden="true">
              <svg class="contact-link__gmail" fill="#ffffff" viewBox="0 0 256 256" aria-hidden="true">
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
              </svg>
            </span>
            <span class="contact-link__text">info@eimafisioterapia.es</span>
          </a>

          <a href="tel:+34604529731" class="contact-link">
            <span class="contact-link__icon contact-link__icon--phone" aria-hidden="true">
              <svg class="contact-link__phone" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
              </svg>
            </span>
            <span class="contact-link__text">+34 604 52 97 31</span>
          </a>
        </div>

        <div class="mt-9 max-w-[26rem]">
          <p class="social-heading text-[1rem] font-light text-white/88">{hero.socialHeading}</p>
          <div class="mt-4 flex flex-col items-start gap-3">
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="contact-link"
            >
              <span class="contact-link__icon contact-link__icon--instagram" aria-hidden="true">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </span>
              <span class="contact-link__text">Instagram</span>
            </a>

            <a
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="contact-link"
            >
              <span class="contact-link__icon contact-link__icon--facebook" aria-hidden="true">
                <svg viewBox="0 0 320 512" fill="currentColor" class="h-5 w-5">
                  <path
                    d="M279.14 288l14.22-92.66h-88.91V135.07c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72V195.3H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </span>
              <span class="contact-link__text">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <div class="w-full max-w-[340px] justify-self-center self-start lg:justify-self-end">
        <div class="form-card rounded-[8px] border border-white/24 bg-white/95 p-6 shadow-[0_28px_80px_rgba(7,16,22,0.26)] backdrop-blur-[6px] md:p-7">
          <h2 class="contact-form-title mx-auto mb-6 w-fit whitespace-nowrap text-center text-[20px] font-semibold uppercase leading-[1.15] text-[#4083A7]">
            {formCopy.title}
          </h2>

          {#if form?.success}
            <div
              class="rounded-[8px] bg-[color:var(--color-brand-accent)]/22 p-5 text-[15px] text-[color:var(--color-brand)]"
              role="status"
              aria-live="polite"
            >
              <p class="mb-1 font-semibold">{formCopy.successTitle}</p>
              <p class="font-light opacity-85">
                {formCopy.successBody}
                <a href="tel:+34604529731" class="font-medium underline decoration-dotted"
                  >604 52 97 31</a
                >.
              </p>
            </div>
          {:else}
            <form method="POST" action={formAction} class="flex flex-col gap-4">
              <div style="position:absolute;left:-9999px;top:-9999px" aria-hidden="true">
                <input type="text" name="company" tabindex="-1" autocomplete="off" />
                <input type="text" name="website" tabindex="-1" autocomplete="off" />
              </div>

              <label class="field-group">
                <span>{formCopy.nameLabel} <span class="text-[color:var(--color-brand-soft)]">*</span></span>
                <input
                  name="name"
                  type="text"
                  required
                  autocomplete="name"
                  placeholder={formCopy.namePlaceholder}
                  class="field-input"
                />
              </label>

              <label class="field-group">
                <span>{formCopy.emailLabel} <span class="text-[color:var(--color-brand-soft)]">*</span></span>
                <input
                  name="email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder={formCopy.emailPlaceholder}
                  class="field-input"
                />
              </label>

              <label class="field-group">
                <span>{formCopy.messageLabel}</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder={formCopy.messagePlaceholder}
                  class="field-textarea"
                ></textarea>
              </label>

              {#if form && !form.success && form.error}
                <p class="text-sm text-red-600">{localizedError}</p>
              {/if}

              <div class="flex flex-col items-center pt-2 text-center">
                <button type="submit" class="contact-submit cta-arrow-button">
                  <span>{formCopy.submit}</span>
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
                </button>
                <p class="privacy-note mt-4 text-[12px] leading-[1.55] text-[color:var(--color-brand)]/72">
                  {formCopy.privacyBefore}
                  <a
                    href="/politica-privacidad"
                    class="underline decoration-dotted underline-offset-[3px]"
                    >{formCopy.privacyLink}</a
                  >{formCopy.privacyAfter}
                </p>
              </div>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-link {
    align-items: center;
    color: rgba(255, 255, 255, 0.96);
    display: inline-flex;
    gap: 0.95rem;
    transition: color 220ms ease, transform 220ms ease;
    width: fit-content;
  }

  .contact-link:is(:hover, :focus-visible, :active) {
    color: white;
    transform: translateX(6px);
  }

  .contact-link__icon {
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.96);
    display: inline-flex;
    flex: none;
    height: 2.75rem;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition:
      background-color 180ms ease,
      border-color 180ms ease,
      box-shadow 180ms ease,
      color 180ms ease;
    width: 2.75rem;
  }

  .contact-link__icon--whatsapp {
    background: #06c755;
    color: #ffffff;
  }

  .contact-link__icon--email {
    background: #4083a7;
  }

  .contact-link__icon--phone {
    background: #4083a7;
    color: #ffffff;
  }

  .contact-link__icon--instagram {
    background:
      radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 7%, #fd5949 42%, #d6249f 62%, #285aeb 100%),
      linear-gradient(135deg, #405de6 0%, #833ab4 34%, #c13584 56%, #e1306c 72%, #fd1d1d 100%);
    color: #ffffff;
  }

  .contact-link__icon--facebook {
    background: #1877f2;
    color: #ffffff;
  }

  .contact-link__icon::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(-160%) skewX(-18deg);
    transition: transform 430ms ease-out;
    width: 48%;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon {
    box-shadow: 0 8px 18px rgba(8, 18, 24, 0.22);
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--whatsapp {
    background: #06c755;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--email {
    background: #4083a7;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--phone {
    background: #4083a7;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--instagram {
    background:
      radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 7%, #fd5949 42%, #d6249f 62%, #285aeb 100%),
      linear-gradient(135deg, #405de6 0%, #833ab4 34%, #c13584 56%, #e1306c 72%, #fd1d1d 100%);
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--facebook {
    background: #1877f2;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon::before {
    transform: translateX(-160%) skewX(-18deg);
  }

  .contact-link__icon svg {
    position: relative;
    z-index: 1;
  }

  .contact-link__whatsapp {
    height: 1.42rem;
    width: 1.42rem;
  }

  .contact-link__gmail {
    height: 1.72rem;
    width: 1.72rem;
  }

  .contact-link__phone {
    height: 1.7rem;
    width: 1.7rem;
  }

  .contact-link__text {
    font-size: 1.04rem;
    font-weight: 300;
    line-height: 1.45;
    transition:
      background-position 260ms ease,
      color 180ms ease,
      font-weight 180ms ease;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__text {
    color: #8cd0d6;
    font-weight: 700;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--whatsapp + .contact-link__text {
    color: #06c755;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--email + .contact-link__text,
  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--phone + .contact-link__text {
    color: #4083a7;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--facebook + .contact-link__text {
    color: #1877f2;
  }

  .contact-link:is(:hover, :focus-visible, :active) .contact-link__icon--instagram + .contact-link__text {
    background: linear-gradient(90deg, #fdf497 0%, #fd5949 28%, #d6249f 56%, #405de6 78%, #8cd0d6 100%);
    background-clip: text;
    background-size: 180% 100%;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .desktop-break {
    display: none;
  }

  .intro-copy,
  .social-heading {
    font-size: 16px;
  }

  .contact-title {
    color: #ffffff;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: clamp(32px, 10.4vw, 55px);
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.08;
    max-width: 100%;
  }

  .contact-title *,
  .contact-form-title {
    letter-spacing: 0;
  }

  .contact-title * {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  .contact-title__line {
    display: block;
    white-space: normal;
  }

  .contact-form-title {
    font-family: 'Noto Serif', Georgia, 'Times New Roman', serif;
    font-weight: 700;
  }

  .form-card {
    background: #f8f4f0;
  }

  .field-group {
    color: var(--color-brand);
    display: flex;
    flex-direction: column;
    font-size: 0.92rem;
    gap: 0.48rem;
  }

  .field-group span {
    font-weight: 500;
  }

  .field-input,
  .field-textarea {
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid rgba(35, 63, 78, 0.16);
    color: var(--color-brand);
    font-size: 0.96rem;
    font-weight: 300;
    outline: none;
    transition: border-color 180ms ease, box-shadow 180ms ease;
    width: 100%;
  }

  .field-input {
    border-radius: 999px;
    padding: 0.82rem 1rem;
  }

  .field-textarea {
    border-radius: 8px;
    min-height: 8.5rem;
    padding: 0.88rem 1rem;
    resize: vertical;
  }

  .field-input:focus,
  .field-textarea:focus {
    border-color: #8cd0d6;
    box-shadow: 0 0 0 3px rgba(140, 208, 214, 0.18);
  }

  .contact-submit {
    align-items: center;
    background: var(--color-brand-accent);
    border-radius: 999px;
    color: var(--color-brand);
    display: inline-flex;
    font-size: 0.95rem;
    font-weight: 300;
    justify-content: center;
    min-width: 8.6rem;
    overflow: hidden;
    padding: 0.68rem 1.35rem;
    position: relative;
    transition:
      background-color 220ms ease,
      color 220ms ease,
      box-shadow 220ms ease,
      transform 220ms ease,
      font-weight 220ms ease;
    width: fit-content;
  }

  .contact-submit::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.48), transparent);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(-180%) skewX(-18deg);
    transition: transform 420ms ease-out;
    width: 44%;
  }

  .contact-submit span {
    position: relative;
    z-index: 1;
  }

  .contact-submit:hover {
    background: #4083a7;
    box-shadow: 0 10px 24px rgba(64, 131, 167, 0.28);
    color: white;
    font-weight: 700;
    transform: scale(1.03);
  }

  .contact-submit:hover::before {
    transform: translateX(260%) skewX(-18deg);
  }

  .privacy-note {
    white-space: nowrap;
  }

  @media (max-width: 1023px) {
    .contact-page {
      min-height: auto;
    }

    .contact-title {
      line-height: 1.04;
    }

    .contact-link__text {
      font-size: 1rem;
    }
  }

  @media (min-width: 1024px) {
    .contact-title {
      font-size: 55px;
    }

    .intro-copy,
    .social-heading {
      font-size: 16px;
    }

    .contact-link__text {
      font-size: 16px;
    }

    .contact-form-title {
      font-size: 20px;
    }

    .desktop-break {
      display: inline;
    }
  }
</style>
