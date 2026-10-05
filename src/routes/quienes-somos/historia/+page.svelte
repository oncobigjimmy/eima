<script>
  import { site } from '$lib/site';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  import { getStoryCopy } from '$lib/i18n/story';
  import { getAbsoluteUrl, getAlternateLinks, getLanguageFromPath, getLocalizedPath } from '$lib/i18n/routes';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { dialog } from '$lib/actions/dialog';
  import { scrollContrast } from '$lib/actions/scrollContrast';
  import { motionDuration } from '$lib/motion';

  let activeId = 'miquel';
  /** @type {ReturnType<typeof parseReading> | null} */
  let selectedCover = null;
  /** @type {string | undefined} */
  let anchorEntryPadding;

  $: pageLanguage = getLanguageFromPath($page.url.pathname) ?? $language;
  $: storyCopy = getStoryCopy(pageLanguage);
  $: journey = { es: { first: 'Conoce', accent: 'nuestro recorrido' }, ca: { first: 'Coneix', accent: 'el nostre recorregut' }, en: { first: 'Discover', accent: 'our journey' } }[pageLanguage];
  $: storyProfiles = storyCopy.profiles;
  $: storyMarks = storyCopy.marks;
  $: meta = storyCopy.meta;
  $: hero = storyCopy.hero;
  $: labels = storyCopy.labels;
  $: statusLabels = storyCopy.status;
  $: whatsappHref = getWhatsAppHref(pageLanguage);
  $: activeProfile = storyProfiles.find((profile) => profile.id === activeId) ?? storyProfiles[0];
  $: canonicalUrl = getAbsoluteUrl(getLocalizedPath($page.url.pathname, pageLanguage));
  $: alternateLinks = getAlternateLinks('story');

  /** @param {'miquel' | 'jaume'} profileId */
  const selectProfile = (profileId) => {
    activeId = profileId;

    if (typeof window === 'undefined') return;

    const nextHash = `#${profileId}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = profileId;
    }
  };

  const closeCoverModal = () => {
    selectedCover = null;
  };

  /** @param {KeyboardEvent} event */
  const handleCoverModalKeydown = (event) => {
    if (event.key === 'Escape') closeCoverModal();
  };

  onMount(() => {
    const setProfileFromHash = () => {
      const profileId = window.location.hash.replace('#', '');
      if (profileId === 'miquel' || profileId === 'jaume') {
        activeId = profileId;

      }
    };

    setProfileFromHash();
    {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (!['#jaume', '#miquel'].includes(window.location.hash)) return;
        const section = document.getElementById('historias');
        const card = section?.querySelector('.team-photo-frame');
        const header = document.querySelector('header');
        if (!section || !card || !header) return;
        const requiredSpace = header.getBoundingClientRect().bottom + 32;
        const cardDocumentTop = card.getBoundingClientRect().top + window.scrollY;
        const offset = Math.max(0, requiredSpace - cardDocumentTop);
        anchorEntryPadding = `${parseFloat(getComputedStyle(section).paddingTop) + offset}px`;
      });
    }
    window.addEventListener('hashchange', setProfileFromHash);

    return () => {
      window.removeEventListener('hashchange', setProfileFromHash);
    };
  });

  /** @param {string} text @param {string} profileId */
  const getMarkedSegments = (text, profileId) => {
    const marks = storyMarks[/** @type {keyof typeof storyMarks} */ (profileId)] ?? [];
    const segments = [];
    let cursor = 0;

    while (cursor < text.length) {
      const next = marks
        .map((mark) => ({ ...mark, index: text.indexOf(mark.text, cursor) }))
        .filter((mark) => mark.index !== -1)
        .sort((a, b) => a.index - b.index || b.text.length - a.text.length)[0];

      if (!next) {
        segments.push({ text: text.slice(cursor), mark: 'plain' });
        break;
      }

      if (next.index > cursor) {
        segments.push({ text: text.slice(cursor, next.index), mark: 'plain' });
      }

      segments.push({ text: next.text, mark: next.mark });
      cursor = next.index + next.text.length;
    }

    return segments;
  };

  /** @type {Record<string, string>} */
  const readingCovers = {
    'Explain Pain': '/book-explain-pain.png',
    'Aches & Pains': '/book-aches-pains.png',
    'Understanding sciatica': '/book-understanding-sciatica.png',
    'Understanding Sciatica': '/book-understanding-sciatica.png',
    'The Biomechanics of Low Back Pain': '/book-biomechanics-back-pain.png',
    'El ayuno contra el cáncer': '/book-ayuno-cancer.png',
    'Ser mujer': '/book-ser-mujer.png',
    'Exercise Oncology': '/book-exercise-oncology.jpg',
    'Fasting Against Cancer': '/book-ayuno-cancer.png',
    'Hábitos atómicos': '/book-habitos-atomicos.png',
    'Atomic Habits': '/book-habitos-atomicos.png',
    'Neurociencia del cuerpo': '/book-neurociencia-cuerpo.png',
    'Neuroscience of the Body': '/book-neurociencia-cuerpo.png',
    'Essential Guide Cervical Spine': '/book-essential-guide-cervical-spine.jpg',
    'Antifrágil': '/book-antifragil.jpg',
    'Antifràgil': '/book-antifragil.jpg',
    Antifragile: '/book-antifragil.jpg',
    'Medio ambiente y salud': '/book-medio-ambiente-salud.png',
    'Environment and Health': '/book-medio-ambiente-salud.png',
    'El ejercicio: Un muro contra el cáncer': '/book-ejercicio-muro-cancer.png',
    'Exercise: A Wall Against Cancer': '/book-ejercicio-muro-cancer.png',
    'La Enciclopedia del Cáncer: Metabolismo, Sistema Inmune y Microbiota': '/book-cancer-integral.png',
    'The Cancer Encyclopedia: Metabolism, Immune System and Microbiota': '/book-cancer-integral.png',
    'Libérate de tóxicos: Guía para evitar los disruptores endocrinos': '/book-liberate-toxicos.png',
    'Free Yourself from Toxins: A Guide to Avoiding Endocrine Disruptors': '/book-liberate-toxicos.png'
  };

  /** @param {string} title */
  const displayReadingTitle = (title) => {
    if (title.startsWith('Aches & Pains') || title.toLowerCase().startsWith('aches and pains')) {
      return 'Aches & Pains';
    }

    if (title.startsWith('Medio ambiente y salud:')) {
      return 'Medio ambiente y salud';
    }

    if (title.startsWith('El ejercicio, un muro contra el cáncer')) {
      return 'Un muro contra el cáncer';
    }

    if (title.startsWith('La Enciclopedia del Cáncer')) return 'La Enciclopedia del Cáncer';
    if (title.startsWith('Libérate de tóxicos')) return 'Libérate de tóxicos';
    if (title === 'The Biomechanics of Low Back Pain') return 'The Biomechanics of BP';

    return title;
  };

  /** @param {string} status */
  const normalizeStatus = (status) => {
    const lower = status.toLowerCase();
    if (status.includes('✔') || lower.includes('acabado') || lower.includes('acabat') || lower.includes('finished')) {
      return statusLabels.done;
    }
    if (lower.includes('en curso') || lower.includes('en curs') || lower.includes('in progress')) return statusLabels.progress;
    return status;
  };

  /** @param {string} reading */
  const parseReading = (reading) => {
    const [rawTitle, detail = ''] = reading.split(' — ');
    const title = displayReadingTitle(rawTitle);
    const statusMatch = detail.match(/\s*(\([^)]*\)|✔️)$/u);
    const rawStatus = statusMatch?.[1] ?? '';
    const status = normalizeStatus(rawStatus);
    let author = rawStatus ? detail.replace(rawStatus, '').trim() : detail.trim();

    if (title.startsWith('La Enciclopedia del Cáncer')) {
      author = 'Alfonso Fernández';
    }
    if (title === 'Un muro contra el cáncer') author = 'Adrián C., Javier M. y Pedro V.';

    const authorParts = author.match(/^(.*?)\s*(\([^)]*\))$/u);
    const authorName = authorParts ? authorParts[1].trim() : author;
    const authorNote = authorParts ? authorParts[2] : '';

    return {
      title,
      author,
      authorName,
      authorNote,
      status,
      cover: readingCovers[rawTitle] ?? readingCovers[title] ?? (title === 'Un muro contra el cáncer' ? '/book-ejercicio-muro-cancer.png' : undefined)
    };
  };

  /** @param {{id: string, readings: string[]}} profile */
  const getDisplayReadings = (profile) => {
    const seen = new Set();

    return profile.readings.filter((reading) => {
      const parsed = parseReading(reading);
      const key = parsed.title;

      if (profile.id === 'jaume' && key === 'Aches & Pains') {
        if (seen.has(key)) return false;
        seen.add(key);
      }

      return true;
    });
  };

  /** @param {string} item */
  const parseEducationItem = (item) => {
    const [main, ...rest] = item.split(' — ');
    const detail = rest.join(' — ');
    const detailParts = detail.match(/^(.*?)\s*(\([^)]*\))$/u);

    return {
      main,
      detail,
      detailName: detailParts ? detailParts[1].trim() : detail,
      detailNote: detailParts ? detailParts[2] : ''
    };
  };
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta
    name="description"
    content={meta.description}
  />
  <link rel="canonical" href={canonicalUrl} />
  {#each alternateLinks as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta property="og:title" content={meta.ogTitle} />
  <meta
    property="og:description"
    content={meta.ogDescription}
  />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={`${site.url}/og-image.png`} />
  <meta property="og:image:alt" content={meta.imageAlt} />
  <meta name="twitter:title" content={meta.ogTitle} />
  <meta
    name="twitter:description"
    content={meta.ogDescription}
  />
  <meta name="twitter:image" content={`${site.url}/og-image.png`} />
</svelte:head>

<section id="historias" style:padding-top={anchorEntryPadding} class={`story-page bg-[#F8F4F0] pb-12 md:pb-16 pt-20 md:pt-24`}>
  <div class="mx-auto max-w-6xl px-5 md:px-10">
    <h1 class="story-journey-title">{journey.first} <span>{journey.accent}</span></h1>
    <div class="mx-auto w-full max-w-[28rem]">

      <div class="team-photo-frame" aria-label={meta.imageAlt}>
        <button
          type="button"
          class="story-person-slot story-person-slot--miquel"
          aria-label={labels.viewMiquel}
          on:click={() => selectProfile('miquel')}
        >
          <img
            class:inactive-person={activeId !== 'miquel'}
            class="story-person story-person--miquel"
            src="/story-miquel-crop.png"
            alt="Miquel Galmés"
          />
        </button>
        <button
          type="button"
          class="story-person-slot story-person-slot--jaume"
          aria-label={labels.viewJaume}
          on:click={() => selectProfile('jaume')}
        >
          <img
            class:inactive-person={activeId !== 'jaume'}
            class="story-person story-person--jaume"
            src="/story-jaume-crop.png"
            alt="Jaume Sansó"
          />
        </button>
      </div>

      <div class="story-tabs mt-5" aria-label={labels.chooseStory}>
        <button
          type="button"
          class:active-person={activeId === 'miquel'}
          on:click={() => selectProfile('miquel')}
        >
          Miquel
        </button>
        <button
          type="button"
          class:active-person={activeId === 'jaume'}
          on:click={() => selectProfile('jaume')}
        >
          Jaume
        </button>
      </div>
    </div>

    {#if activeProfile}
      {#key activeId}
        <article
          in:fade={{ duration: motionDuration(260) }}
          class="mt-14 space-y-10 md:mt-16 md:space-y-14"
        >
          <section class="profile-card">
            <header class="profile-card__header profile-card__header--dark">
              <h2 class="story-name story-profile-name text-white">
                {activeProfile.name}
              </h2>
              <p class="story-profile-specialty mx-auto mt-3 max-w-2xl text-[20px] font-light leading-[1.7] text-white/86">
                {activeProfile.specialty}
              </p>
            </header>

            <div class="profile-card__body space-y-10">
              {#each activeProfile.storySections as section}
                <section>
                  <h3
                    class="story-section-heading text-[25px] leading-[1.2] text-[#4083A7]"
                  >
                    {section.title}
                  </h3>
                  <div class="mt-4 space-y-4 text-[14px] font-light leading-[1.85] text-[#233F4E]/86">
                    {#each section.paragraphs as paragraph}
                      {@const segments = getMarkedSegments(paragraph, activeProfile.id)}
                      <p>
                        {#each segments as segment}
                          {#if segment.mark === 'bold'}
                            <strong>{segment.text}</strong>
                          {:else if segment.mark === 'italic'}
                            <em>{segment.text}</em>
                          {:else}
                            {segment.text}
                          {/if}
                        {/each}
                      </p>
                    {/each}
                  </div>
                </section>
              {/each}
            </div>
          </section>

          <section class="profile-card">
            <header class="profile-card__header profile-card__header--blue">
              <h3 class="story-side-title text-[30px] text-white">
                {activeProfile.educationTitle}
              </h3>
            </header>

            <div class="profile-card__body">
              <div class="education-timeline">
                {#each activeProfile.education as group}
                  <div class="education-year-block">
                    <p class="education-year">{group.year}</p>
                    <div class="education-items">
                      {#each group.items as item}
                        {@const educationItem = parseEducationItem(item)}
                        <div class="education-item" use:scrollContrast={'.education-timeline'}>
                          <span class="education-dot" aria-hidden="true"></span>
                          <p>
                            <strong>{educationItem.main}</strong>
                            {#if educationItem.detailName}
                              <span>
                                — {educationItem.detailName}
                                {#if educationItem.detailNote}
                                  <em>{educationItem.detailNote}</em>
                                {/if}
                              </span>
                            {/if}
                          </p>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </section>

          <section class="profile-card profile-card--readings">
            <header class="profile-card__header profile-card__header--blue">
              <h3 class="story-side-title text-[30px] text-white">
                {activeProfile.readingsTitle}
              </h3>
            </header>

            <div class="profile-card__body">
              <div class:readings-grid--compact={true} class="readings-grid hover-dim-group">
                {#each getDisplayReadings(activeProfile) as reading}
                  {@const parsedReading = parseReading(reading)}
                  <article
                    use:scrollContrast
                    class:reading-card--compact={true}
                    class="reading-card hover-dim-item"
                  >
                    {#if parsedReading.cover}
                      <button
                        type="button"
                        class="reading-cover-button"
                        aria-label={`${labels.enlargeCover} ${parsedReading.title}`}
                        on:click={() => (selectedCover = parsedReading)}
                      >
                        <img
                          class="reading-cover-image"
                          src={parsedReading.cover}
                          alt={`${labels.coverOf} ${parsedReading.title}`} loading="lazy" decoding="async"
                        />
                      </button>
                    {:else}
                      <div class="reading-cover" aria-hidden="true">
                        <span>{parsedReading.title.slice(0, 1)}</span>
                      </div>
                    {/if}
                    <h4>{parsedReading.title}</h4>
                    {#if parsedReading.authorName}
                      <p class="reading-author">
                        {parsedReading.authorName}
                        {#if parsedReading.authorNote}
                          <em>{parsedReading.authorNote}</em>
                        {/if}
                      </p>
                    {/if}

                  </article>
                {/each}
              </div>
            </div>
          </section>

          <div class="story-closing">
            <p>{activeProfile.cta}</p>
            <PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={labels.finalCta} />
          </div>
        </article>
      {/key}
    {/if}
  </div>
</section>

{#if selectedCover}
  <div
    class="cover-modal"
    use:dialog={{ close: closeCoverModal }}
    role="dialog"
    aria-modal="true"
    aria-label={`${labels.coverOf} ${selectedCover.title}`}
    tabindex="-1"
    on:keydown={handleCoverModalKeydown}
  >
    <button class="cover-modal__backdrop" type="button" tabindex="-1" aria-label={labels.close} on:click={closeCoverModal}></button>
    <button class="cover-modal__close" type="button" aria-label={labels.close} on:click={closeCoverModal}>
      ×
    </button>
    <div class="cover-modal__content">
      <img src={selectedCover.cover} alt={`${labels.coverOf} ${selectedCover.title}`} />
      <p>{selectedCover.title}</p>
    </div>
  </div>
{/if}

<style>
  .story-name {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    letter-spacing: 0;
  }

  .story-title {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  }

  .story-eyebrow {
    letter-spacing: 0.32em;
  }

  .story-title__line {
    display: block;
    font-family: inherit;
    color: inherit;
  }

  .story-title span {
    font-family: inherit;
  }

  .story-title__line span {
    color: #8cd0d6;
  }

  .story-section-heading,
  .story-side-title {
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
    font-weight: 400 !important;
  }

  .story-section-heading { font-weight: 500 !important; }
  @media (min-width: 1024px) { .story-side-title { font-size: 40px; } }

  .story-journey-title {
    margin: 0 auto 2.5rem;
    color: #233f4e;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 500;
    line-height: 1.1;
    text-align: center;
  }

  .story-journey-title span { color: #4083a7; font-family: inherit; }
  @media (min-width: 1024px) { .story-journey-title { font-size: 60px; } }

  .profile-card {
    overflow: hidden;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 24px 70px rgba(14, 29, 38, 0.1);
    border: 1px solid rgba(35, 63, 78, 0.1);
  }

  .profile-card__header {
    padding: 1.35rem 1.5rem;
    text-align: center;
    color: #ffffff;
  }

  .profile-card__header--dark {
    background: #233f4e;
  }

  .profile-card__header--blue {
    background: #4083a7;
    text-shadow: var(--eima-blue-text-shadow);
  }

  .profile-card__body {
    background: #ffffff;
    padding: 2rem 1.5rem;
  }

  .profile-card--readings, .profile-card--readings .profile-card__body { background: #f8f4f0; }

  .story-profile-name {
    font-size: 40px;
    line-height: 1.08;
  }

  .education-timeline {
    position: relative;
    display: grid;
    gap: 0;
  }

  .education-timeline::before {
    content: '';
    position: absolute;
    left: calc(4.5rem + 1.25rem + 1.25rem - 19px + 4px);
    top: 0.45rem;
    bottom: 0.45rem;
    width: 1px;
    transform: translateX(-50%);
    background: rgba(35, 63, 78, 0.34);
  }

  .education-year-block {
    display: grid;
    grid-template-columns: 4.5rem minmax(0, 1fr);
    gap: 1.25rem;
    padding-bottom: 1.75rem;
  }

  .education-year-block:last-child {
    padding-bottom: 0;
  }

  .education-year {
    transform-origin: right center;
    transition: transform 260ms ease-out, opacity 175ms ease-out, filter 175ms ease-out;
    padding-top: 0;
    text-align: right;
    font-family: 'Fraunces', Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.65;
    letter-spacing: 0.18em;
    color: #4083a7;
  }

  .education-items {
    position: relative;
    display: grid;
    gap: 0.8rem;
    padding-left: 1.25rem;
  }

  .education-item {
    transition: opacity 175ms ease-out, filter 175ms ease-out;
    position: relative;
    min-height: 1.45rem;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.65;
    color: rgba(35, 63, 78, 0.86);
  }

  .education-item p { transform-origin: left center; transition: transform 260ms ease-out; }

  .education-item em {
    font-style: italic;
    margin-left: 0.18rem;
  }

  .education-item strong,
  .profile-card__body strong {
    font-weight: 700;
    color: #233f4e;
  }

  .profile-card__body em {
    font-style: italic;
  }

  .education-dot {
    transition: transform 260ms ease-out;
    position: absolute;
    left: -19px;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: #233f4e;
    z-index: 1;
  }

  .readings-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    align-items: start;
  }

  .reading-card {
    --reading-title-height: 56.7px;
    --reading-author-height: 34.8px;
    display: grid;
    grid-template-rows: 8.85rem var(--reading-title-height) var(--reading-author-height);
    align-items: start;
    justify-items: center;
    row-gap: 0.65rem;
    border-radius: 8px;
    border: 1px solid #4083a7;
    background: #e8e8f6;
    padding: 1rem;
    text-align: center;
    transition: opacity 175ms ease-out, filter 175ms ease-out, transform 380ms ease-out, background-color 380ms ease-out, border-color 380ms ease-out, box-shadow 380ms ease-out;
  }

  .reading-card--compact { --reading-title-height: 18.9px; --reading-author-height: 17.4px; grid-template-rows: calc(8.85rem + 8px) var(--reading-title-height) var(--reading-author-height); }
  .reading-card--compact h4, .reading-card--compact p { white-space: nowrap; }

  .reading-cover {
    display: flex;
    aspect-ratio: 0.72;
    width: min(100%, 5.2rem);
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: linear-gradient(145deg, #233f4e, #4083a7);
    color: #ffffff;
    box-shadow: 0 10px 22px rgba(14, 29, 38, 0.16);
  }

  .reading-cover-button {
    display: flex;
    width: 100%;
    height: 8.85rem;
    align-items: center;
    justify-content: center;
    cursor: zoom-in;
    border: 0;
    background: transparent;
    padding: 0;
  }

  .reading-cover-button:focus-visible {
    outline: 2px solid #4083a7;
    outline-offset: 4px;
    border-radius: 8px;
  }

  .reading-cover-image {
    transition: transform 380ms ease-out, box-shadow 380ms ease-out;
    display: block;
    width: min(100%, 6.2rem);
    height: 100%;
    aspect-ratio: 0.72;
    object-fit: contain;
    object-position: center;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0 10px 22px rgba(14, 29, 38, 0.16);
  }

  .reading-cover span {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 2rem;
    line-height: 1;
  }

  .reading-card h4 {
    transition: color 380ms ease-out, text-shadow 380ms ease-out;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.35;
    color: #233f4e;
  }

  .reading-card p {
    transition: color 380ms ease-out, text-shadow 380ms ease-out;
    height: 100%;
    display: block;
    margin: 0;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.45;
    color: rgba(35, 63, 78, 0.74);
  }

  .reading-author em {
    font-style: italic;
    margin-left: 0.18rem;
  }

  @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
    .reading-card:hover {
      background: #4083a7;
      border-color: #233f4e;
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 16px 32px #233f4e40, 0 4px 10px #233f4e26, 0 0 22px #8cd0d64d;
    }
    .reading-card:hover h4 { color: #ffffff; }
    .reading-card:hover .reading-author { color: #e8e8f6; }
    .reading-card:hover h4, .reading-card:hover .reading-author { text-shadow: 0 1px 3px #233f4e66, 0 3px 8px #233f4e33; }
    .reading-card:hover .reading-cover-image { transform: scale(1.06); box-shadow: 0 18px 38px #071a2540, 0 0 28px #8cd0d673; }
    .readings-grid:has(> .reading-card:hover) > .reading-card:not(:hover) { opacity: .7; filter: blur(1px); }

    .education-item:hover p { transform: scale(1.06); }
    .education-item:hover .education-dot { transform: scale(1.55); }
    .education-year-block:has(.education-item:hover) > .education-year { transform: scale(1.13); }
    .education-timeline:has(.education-item:hover) .education-item:not(:hover),
    .education-timeline:has(.education-item:hover) .education-year-block:not(:has(.education-item:hover)) > .education-year { opacity: .5; filter: blur(.7px); }
  }

  @media (hover: none), (pointer: coarse) {
    .readings-grid:has(> .reading-card:hover) > .reading-card:not(:hover) { opacity: 1; filter: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .reading-card, .reading-cover-image, .reading-card h4, .reading-card p,
    .education-item, .education-item p, .education-year, .education-dot { transition: none; }
    .reading-card:hover, .reading-card:hover .reading-cover-image,
    .education-item:hover p, .education-item:hover .education-dot,
    .education-year-block:has(.education-item:hover) > .education-year { transform: none; }
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    .readings-grid--compact { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .reading-card:not(.reading-card--compact) { --reading-title-height: 75.6px; }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .readings-grid--compact { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .reading-card:not(.reading-card--compact) { --reading-title-height: 94.5px; --reading-author-height: 52.2px; }
  }

  @media (max-width: 374px) {
    .reading-card:not(.reading-card--compact) { --reading-title-height: 75.6px; }
  }

  .reading-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    min-width: 4.5rem;
    height: 1.85rem;
    padding: 0 0.65rem;
    font-size: 12px;
    line-height: 1.45;
    color: #233f4e;
  }

  .reading-status--done {
    background: #8cd0d6;
    font-weight: 700;
  }

  .reading-status--progress {
    background: #e8e8f6;
    font-weight: 300;
  }

  .story-closing {
    display: grid;
    justify-items: center;
    gap: 1rem;
    padding-top: 0.65rem;
    text-align: center;
  }

  .story-closing p {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.7;
    color: #233f4e;
  }

  .cover-modal {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(8, 18, 24, 0.76);
    padding: 1.5rem;
  }

  .cover-modal__backdrop {
    position: absolute;
    inset: 0;
    cursor: default;
  }

  .cover-modal__content {
    display: grid;
    justify-items: center;
    gap: 1rem;
    max-width: min(92vw, 34rem);
    position: relative;
    z-index: 1;
  }

  .cover-modal__content img {
    max-height: min(78vh, 42rem);
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
  }

  .cover-modal__content p {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }

  .cover-modal__close {
    position: fixed;
    right: 1.25rem;
    top: 1rem;
    z-index: 2;
    color: #ffffff;
    font-size: 2.1rem;
    line-height: 1;
  }

  .team-photo-frame {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1.5rem;
    overflow: hidden;
    aspect-ratio: 1.35;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 20px 52px rgba(14, 29, 38, 0.14);
    isolation: isolate;
    padding: 0.32rem 1.3rem 0;
  }

  .story-person-slot {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    min-width: 0;
    cursor: pointer;
    appearance: none;
    border: 0;
    background: transparent;
    padding: 0;
  }

  .story-person-slot:focus-visible {
    outline: 2px solid #4083a7;
    outline-offset: -4px;
  }

  .story-person {
    display: block;
    height: 124%;
    width: auto;
    object-fit: contain;
    object-position: bottom center;
    transform-origin: center bottom;
    transition:
      filter 280ms ease,
      opacity 280ms ease,
      transform 280ms ease;
  }

  .story-person--miquel {
    z-index: 2;
    margin: 0;
  }

  .story-person--jaume {
    z-index: 1;
    margin: 0;
  }

  .story-person:not(.inactive-person) {
    filter: none;
    transform: scale(1.12);
  }

  .story-person.inactive-person {
    filter: blur(3px) saturate(0.7);
    opacity: 0.38;
    transform: scale(1.08);
  }

  .story-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    width: min(100%, 18.5rem);
    margin-inline: auto;
    padding: 0.55rem;
    border-radius: 9999px;
    background: #ffffff;
    box-shadow:
      0 9px 22px rgba(14, 29, 38, 0.13),
      inset 0 0 0 1px rgba(35, 63, 78, 0.08);
  }

  .story-tabs button {
    cursor: pointer;
    min-height: 2.8rem;
    border-radius: 9999px;
    background: #e8e8f6;
    color: #233f4e;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    transition:
      background-color 240ms ease,
      color 240ms ease,
      transform 240ms ease,
      font-weight 240ms ease;
  }

  .story-tabs button:hover {
    transform: translateY(-1px);
  }

  .story-tabs button.active-person {
    background: #4083a7;
    color: #ffffff;
    font-weight: 700;
    text-shadow: var(--eima-blue-text-shadow);
  }

  @media (max-width: 767px) {
    .story-journey-title { font-size: 40px; }
    .story-profile-name { font-size: 30px; }
    .story-profile-specialty { font-size: 16px; line-height: 1.4; }
    .story-section-heading { font-size: 22px; }

    .education-item:global(.scroll-active) p { transform: scale(1.06); }
    .education-item:global(.scroll-active) .education-dot { transform: scale(1.55); }
    .education-year-block:has(.education-item:global(.scroll-active)) > .education-year { transform: scale(1.13); }
    .education-timeline:has(.education-item:global(.scroll-active)) .education-item:not(:global(.scroll-active)),
    .education-timeline:has(.education-item:global(.scroll-active)) .education-year-block:not(:has(.education-item:global(.scroll-active))) > .education-year { opacity: .5; filter: blur(.7px); }

    .reading-card:global(.scroll-active) {
      background: #4083a7;
      border-color: #233f4e;
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 16px 32px #233f4e40, 0 4px 10px #233f4e26, 0 0 22px #8cd0d64d;
    }
    .reading-card:global(.scroll-active) h4 { color: #ffffff; }
    .reading-card:global(.scroll-active) .reading-author { color: #e8e8f6; }
    .reading-card:global(.scroll-active) h4, .reading-card:global(.scroll-active) .reading-author { text-shadow: 0 1px 3px #233f4e66, 0 3px 8px #233f4e33; }
    .reading-card:global(.scroll-active) .reading-cover-image { transform: scale(1.06); box-shadow: 0 18px 38px #071a2540, 0 0 28px #8cd0d673; }
    .readings-grid:has(> .reading-card:global(.scroll-active)) > .reading-card:not(:global(.scroll-active)) { opacity: .7; filter: blur(1px); }

    .story-title {
      font-size: 2.35rem;
    }

    .story-tabs {
      width: min(100%, 18rem);
    }

    .team-photo-frame {
      aspect-ratio: 1.35;
      gap: 1.1rem;
      padding: 0.28rem 1rem 0;
    }

    .story-person {
      height: 122%;
    }

    .story-person:not(.inactive-person) { transform: scale(1.08); }
    .story-person.inactive-person { transform: scale(1.04); }

    .story-person--miquel {
      margin: 0;
    }

    .story-person--jaume {
      margin: 0;
    }

    .story-tabs button {
      min-height: 2.85rem;
      font-size: 16px;
    }

    .profile-card__body {
      padding: 1.5rem 1.1rem;
    }

    .education-year-block {
      grid-template-columns: 3.5rem minmax(0, 1fr);
      gap: 0.95rem;
    }

    .education-timeline::before {
      left: calc(3.5rem + 0.95rem + 1.25rem - 15px);
    }

    .education-year {
      font-size: 18px;
      letter-spacing: 0.14em;
    }

    .readings-grid {
      grid-template-columns: 1fr;
      justify-items: center;
    }

    .reading-card {
      width: min(100%, 18rem);
    }
  }

  @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
    .reading-card:global(.scroll-active), .reading-card:global(.scroll-active) .reading-cover-image,
    .education-item:global(.scroll-active) p, .education-item:global(.scroll-active) .education-dot,
    .education-year-block:has(.education-item:global(.scroll-active)) > .education-year { transform: none; }
  }
</style>
