<script lang="ts">
  import { getCopy, getWhatsAppHref, type Language } from '$lib/i18n/copy';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { patientProofCopy, patientResponses } from '$lib/data/patient-responses';
  import PatientResponseCarousel from '$lib/components/PatientResponseCarousel.svelte';

  export let pageLanguage: Language = 'es';
  const titleEmphasis = {
    'difficult-day': 'No todos los días',
    'eima-adaptation': 'para esos días',
    progress: 'volver a hacer cosas'
  };
  $: copy = patientProofCopy[pageLanguage];
  $: whatsappHref = getWhatsAppHref(pageLanguage, true);
  $: ctaLabel = pageLanguage === 'es' ? 'Cuéntanos tu caso' : getCopy(pageLanguage).home.hero.cta;
  $: rows = copy.rows.map(row => ({ ...row, items: patientResponses.filter(item => item.category === row.category) })).filter(row => row.items.length);
</script>

{#if rows.length}
  <section class="patient-proof" aria-label={copy.label}>
    {#each rows as row}
      {@const title = row.title.replace(/\.$/, '')}
      {@const emphasis = pageLanguage === 'es' ? titleEmphasis[row.category] : ''}
      <div class="patient-row" class:patient-row--difficult={row.category === 'difficult-day'} class:patient-row--dark={row.category === 'eima-adaptation'}>
        <header class="patient-heading">
          <h2 class="section-title-mobile" id={`patients-${row.category}-title`}>{#if emphasis}{title.split(emphasis)[0]}<span class="title-emphasis">{emphasis}</span>{title.split(emphasis)[1]}{:else}{title}{/if}</h2>
          {#if row.subtitle}
            <p class="mobile-copy-14" class:patient-subtitle-lines={pageLanguage === 'es' && row.category === 'difficult-day'}>
              {#if pageLanguage === 'es' && row.category === 'difficult-day'}
                <span class="subtitle-line">Durante el tratamiento habrá días en que puedas hacer más y otros en que toque bajar el ritmo.</span>
                <span class="subtitle-line">Y ahí, saber qué hacer evita que <strong>una mala semana te haga parar más de la cuenta.</strong></span>
              {:else if pageLanguage === 'es' && row.category === 'eima-adaptation'}
                Vemos cómo vas y ajustamos lo necesario <strong>para que no tengas que decidir</strong> tú solo qué hacer.
              {:else}{row.subtitle}{/if}
            </p>
          {/if}
        </header>
        <div class="patient-inner">
          <PatientResponseCarousel items={row.items} id={`patients-${row.category}`} previousLabel={copy.previous} nextLabel={copy.next} positionLabel={copy.position} expandLabel={copy.expand} closeLabel={copy.close} />
        </div>
        {#if row.category === 'progress'}
          <div class="patient-cta"><PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={ctaLabel} /></div>
        {/if}
      </div>
    {/each}
  </section>
{/if}

<style>
  .patient-proof { width: 100%; overflow: clip; }
  .patient-row { padding: clamp(2rem, 3.5vw, 2.75rem) 0 1rem; background: var(--color-surface); }
  .patient-row--difficult { background: #e8e8f6; }
  .patient-heading { max-width: 960px; margin: 0 auto 1.25rem; padding: 0 1.5rem; text-align: center; }
  h2 { margin: 0; font-family: 'Playfair Display', Georgia, serif; font-weight: 500; font-size: clamp(1.8rem, 3.1vw, 2.5rem); line-height: 1.16; text-wrap: balance; color: var(--color-brand); }
  .title-emphasis { font-family: inherit; font-weight: inherit; color: #4083a7; }
  .patient-row--dark .title-emphasis { color: #8cd0d6; }
  .subtitle-line { display: block; }
  p { max-width: 750px; margin: 1rem auto 0; font-size: 1rem; line-height: 1.7; color: #233f4e; }
  .patient-cta { display: flex; justify-content: center; margin: 1.5rem 1.25rem 0; }
  .patient-inner { max-width: 1072px; margin: 0 auto; }
  .patient-row--dark { background: var(--color-brand); }
  .patient-row--dark h2 { color: var(--color-inverse); }
  .patient-row--dark p { color: #e8e8f6; }
  @media (min-width: 768px) {
    .patient-row { padding-bottom: clamp(2rem, 3.5vw, 2.75rem); }
    .patient-heading { max-width: 1072px; }
    .patient-subtitle-lines { max-width: none; }
    .subtitle-line { display: block; }
    h2 { font-size: 50px; }
    .title-emphasis { font-family: inherit; color: #4083a7; }
    .patient-row--dark .title-emphasis { color: #8cd0d6; }
    .patient-inner { max-width: none; }
  }
  @media (max-width: 767px) {
    .patient-row { padding-top: 2rem; padding-bottom: 2rem; }
    .patient-heading { padding: 0 1.25rem; margin-bottom: 1rem; }
    h2 { font-size: clamp(1.65rem, 6.5vw, 2rem); }
  }
</style>
