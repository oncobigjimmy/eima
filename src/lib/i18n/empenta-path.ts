import type { Language } from './copy';

export const empentaPathCopy: Record<Language, {
  before: string; accent: string; after: string; endingAccent: string; subtitle: string;
  stages: { title: string; description: string }[];
  next: string; followUp: string; closing: string;
  clarificationTitle: string; clarificationBody: string;
}> = {
  es: {
    clarificationTitle: 'No todos empezamos desde el <span class="clarification-title-accent">mismo lugar</span> ni avanzamos al <span class="clarification-title-accent">mismo ritmo.</span>',
    clarificationBody: 'Las cuatro etapas <strong>no son periodos fijos</strong> ni tienes que completarlas todas en 12 semanas.<br class="clarification-desktop-break" /> <strong style="color: inherit;">Avanzamos según cómo te encuentres</strong>, cómo respondes al ejercicio y qué objetivos quieras alcanzar.',
    before: 'El ', accent: 'camino', after: ' que seguiremos ', endingAccent: 'contigo',
    subtitle: 'Los cinco pasos anteriores explican cómo trabajaremos contigo. <strong>Estas <span class="path-etapas-accent">4 etapas</span> muestran<br class="path-desktop-break" /> cómo iremos progresando con el ejercicio a lo largo del programa.</strong>',
    stages: [
      { title: 'Arranca', description: 'Damos los primeros pasos<br class="path-mobile-break" /> adaptándonos<br class="path-desktop-break" /> a cómo<br class="path-mobile-break" /> te encuentras.' },
      { title: 'Construye', description: 'Creamos una base de<br class="path-mobile-break" /> fuerza y confianza para<br class="path-mobile-break" /> seguir avanzando.' },
      { title: 'Desarrolla', description: 'Avanzamos hacia las<br class="path-mobile-break" /> actividades que quieres<br class="path-mobile-break" /> recuperar o mantener.' },
      { title: 'Consolida', description: 'Reforzamos lo conseguido<br class="path-mobile-break" /> para mantenerte activo<br class="path-mobile-break" /> con más autonomía.' }
    ],
    next: '¿Y después?', followUp: 'Seguimiento',
    closing: 'Si quieres seguir contando con nosotros,<br class="path-mobile-break" /> podremos valorar un seguimiento<br />adaptado a ti para continuar cuidando<br class="path-mobile-break" /> y mejorando tu salud.'
  },
  ca: {
    clarificationTitle: 'No tots començam des del <span class="clarification-title-accent">mateix lloc</span> ni avançam al <span class="clarification-title-accent">mateix ritme.</span>',
    clarificationBody: 'Les quatre etapes <strong>no són períodes fixos</strong> ni les has de completar totes en 12 setmanes.<br class="clarification-desktop-break" /> <strong style="color: inherit;">Avançam segons com et trobes</strong>, com respons a l’exercici i quins objectius vols assolir.',
    before: 'El ', accent: 'camí', after: ' que seguirem ', endingAccent: 'amb tu',
    subtitle: 'Les cinc passes anteriors expliquen com treballarem amb tu. <strong>Aquestes <span class="path-etapas-accent">4 etapes</span> mostren<br class="path-desktop-break" /> com anirem progressant amb l’exercici al llarg del programa.</strong>',
    stages: [
      { title: 'Arrenca', description: 'Feim les primeres passes<br class="path-mobile-break" /> adaptant-nos a com<br class="path-mobile-break" /> et trobes.' },
      { title: 'Construeix', description: 'Cream una base de<br class="path-mobile-break" /> força i confiança per<br class="path-mobile-break" /> seguir avançant.' },
      { title: 'Desenvolupa', description: 'Avançam cap a les<br class="path-mobile-break" /> activitats que vols<br class="path-mobile-break" /> recuperar o mantenir.' },
      { title: 'Consolida', description: 'Reforçam el que has<br class="path-mobile-break" /> aconseguit per mantenir-te<br class="path-mobile-break" /> actiu amb més autonomia.' }
    ],
    next: 'I després?', followUp: 'Seguiment',
    closing: 'Si vols seguir comptant amb nosaltres, podrem valorar un seguiment<br />adaptat a tu per continuar cuidant i millorant la teva salut.'
  },
  en: {
    clarificationTitle: 'We don’t all start from the <span class="clarification-title-accent">same place</span> or progress at the <span class="clarification-title-accent">same pace.</span>',
    clarificationBody: 'The four stages <strong>are not fixed periods</strong> and you do not have to complete them all in 12 weeks.<br class="clarification-desktop-break" /> <strong style="color: inherit;">We progress according to how you feel</strong>, how you respond to exercise and the goals you want to achieve.',
    before: 'The ', accent: 'path', after: ' we’ll follow ', endingAccent: 'together',
    subtitle: 'The five steps above explain how we’ll work with you. <strong>These <span class="path-etapas-accent">4 stages</span> show<br class="path-desktop-break" /> how we’ll progress with exercise throughout the programme.</strong>',
    stages: [
      { title: 'Begin', description: 'We take the first steps,<br class="path-mobile-break" /> adapting to<br class="path-mobile-break" /> how you feel.' },
      { title: 'Build', description: 'We build a foundation<br class="path-mobile-break" /> of strength and confidence<br class="path-mobile-break" /> to keep moving forward.' },
      { title: 'Develop', description: 'We work towards the<br class="path-mobile-break" /> activities you want<br class="path-mobile-break" /> to regain or maintain.' },
      { title: 'Consolidate', description: 'We reinforce your progress<br class="path-mobile-break" /> so you can stay active<br class="path-mobile-break" /> with more independence.' }
    ],
    next: 'What comes next?', followUp: 'Follow-up',
    closing: 'If you’d like to keep working with us, we can discuss follow-up support<br />adapted to you so you can keep caring for and improving your health.'
  }
};
