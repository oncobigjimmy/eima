<script lang="ts">
  import type { Language } from '$lib/i18n/copy';
  import { homeSections } from '$lib/i18n/reviewed';
  import { threeR } from './three-r.js';
  import { eimaBar } from '$lib/actions/eimaBar';
  import './three-r.css';

  export let pageLanguage: Language;
  export let goals: { title: string; subtitle: string; body: string }[];

  const copy = {
    es: {
      tag: 'Las 3R de tu progreso',
      payoff: ['Porque el objetivo no es «hacer ejercicio».', 'Es volver a esto:'],
      activities: ['Ir a pilates', 'Hacer yoga', 'Bailar', 'Seguir trabajando', 'Jugar al golf', 'Jugar al pádel', 'Nadar', 'Jugar con los nietos', 'Salir de excursión', 'Pasear por la playa', 'Ir en bici', 'Viajar', 'Cuidar el huerto', 'Cocinar para los tuyos', 'Pasear al perro', 'Salir a cenar']
    },
    ca: {
      tag: 'Les 3R del teu progrés',
      payoff: ['Perquè l’objectiu no és «fer exercici».', 'És tornar a fer això:'],
      activities: ['Anar a pilates', 'Fer ioga', 'Ballar', 'Continuar fent feina', 'Jugar a golf', 'Jugar a pàdel', 'Nedar', 'Jugar amb els nets', 'Anar d’excursió', 'Passejar per la platja', 'Anar en bici', 'Viatjar', 'Cuidar l’hort', 'Cuinar per als teus', 'Passejar el ca', 'Sortir a sopar']
    },
    en: {
      tag: 'The 3 Rs of your progress',
      payoff: ['Because the goal isn’t “to exercise”.', 'It’s to get back to this:'],
      activities: ['Going to Pilates', 'Doing yoga', 'Dancing', 'Keeping up with work', 'Playing golf', 'Playing padel', 'Swimming', 'Playing with your grandchildren', 'Going hiking', 'Walking on the beach', 'Cycling', 'Travelling', 'Tending the garden', 'Cooking for your loved ones', 'Walking the dog', 'Going out for dinner']
    }
  };

  $: ui = copy[pageLanguage];
  $: tag = ui.tag.split(/(3\s?Rs?)/);
</script>

<section class="eima-three-r" aria-labelledby="recovery-title" use:threeR>
  <div class="intro" data-water-tone="deep">
    <div class="wrap">
      <h2 class="section-playfair-desktop" id="recovery-title">
        {@html homeSections[pageLanguage].recoveryTitle}
      </h2>
    </div>
  </div>
  <div class="scene" data-water-tone="deep">
    <div class="scene__track">
      <div class="scene__pin">
        <div class="wrap">
          <p class="tag scene__top" data-newsreader-fixed>{tag[0]}<span>{tag[1]}</span>{tag[2]}</p>
          <div class="letters"><canvas id="rrr" aria-hidden="true"></canvas></div>
          <div class="rail eb eb-thread" data-eb="thread" data-drive="scroll" data-target=".scene__track" data-ticks="12" role="progressbar" aria-label={ui.tag} aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" use:eimaBar={{ externalScroll: true }}>
            <div class="eb-track">
              <div class="eb-base"></div><div class="eb-fill"></div>
              <div class="eb-knob-rail"><span class="eb-knob"><span class="eb-ring"></span><span class="eb-ring"></span></span></div>
            </div>
          </div>
          <ul class="rtexts">
            {#each goals as stage, index}
              <li class="rtext" class:rtext--retomar={index === 2} class:is-active={index === 0}>
                <h3 class="rtext__w">{stage.title}</h3>
                <p class="rtext__t">{stage.subtitle}</p>
                <p class="rtext__d">{@html stage.body}</p>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <div class="payoff">
      <p class="payoff__line">{ui.payoff[0]} <em>{ui.payoff[1]}</em></p>
      <div class="goals"><canvas class="goals-water" aria-hidden="true"></canvas><div class="marquee"><div class="marquee__run">
        {#each [false, true] as duplicate}
          <ul aria-hidden={duplicate || undefined}>
            {#each ui.activities as activity}<li>{activity}</li>{/each}
          </ul>
        {/each}
      </div></div></div>
    </div>
  </div>
</section>
