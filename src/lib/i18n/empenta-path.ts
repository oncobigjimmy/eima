import type { Language } from './copy';

export const empentaPathCopy: Record<Language, {
  before: string; accent: string; after: string; endingAccent: string; subtitle: string;
  stages: { title: string; description: string }[];
  next: string; followUp: string; closing: string;
}> = {
  es: {
    before: 'El ', accent: 'camino', after: ' que seguiremos ', endingAccent: 'contigo',
    subtitle: 'Tu camino, a tu ritmo. Nosotros te damos <strong>el empujón</strong> que necesitas para seguir avanzando.',
    stages: [
      { title: 'Arranca', description: 'Damos los primeros pasos adaptándonos<br class="path-desktop-break" /> a cómo te encuentras.' },
      { title: 'Construye', description: 'Creamos una base de fuerza y confianza para seguir avanzando.' },
      { title: 'Desarrolla', description: 'Avanzamos hacia las actividades que quieres recuperar o mantener.' },
      { title: 'Consolida', description: 'Reforzamos lo conseguido para mantenerte activo con más autonomía.' }
    ],
    next: '¿Y después?', followUp: 'Seguimiento',
    closing: 'Si quieres seguir contando con nosotros, podremos valorar un seguimiento<br />adaptado a ti para continuar cuidando y mejorando tu salud.'
  },
  ca: {
    before: 'El ', accent: 'camí', after: ' que seguirem ', endingAccent: 'amb tu',
    subtitle: 'El teu camí, al teu ritme. Nosaltres et donam <strong>l’empenta</strong> que necessites per seguir avançant.',
    stages: [
      { title: 'Arrenca', description: 'Feim les primeres passes adaptant-nos a com et trobes.' },
      { title: 'Construeix', description: 'Cream una base de força i confiança per seguir avançant.' },
      { title: 'Desenvolupa', description: 'Avançam cap a les activitats que vols recuperar o mantenir.' },
      { title: 'Consolida', description: 'Reforçam el que has aconseguit per mantenir-te actiu amb més autonomia.' }
    ],
    next: 'I després?', followUp: 'Seguiment',
    closing: 'Si vols seguir comptant amb nosaltres, podrem valorar un seguiment<br />adaptat a tu per continuar cuidant i millorant la teva salut.'
  },
  en: {
    before: 'The ', accent: 'path', after: ' we’ll follow ', endingAccent: 'together',
    subtitle: 'Your path, at your pace. We give you <strong>the encouragement</strong> you need to keep moving forward.',
    stages: [
      { title: 'Begin', description: 'We take the first steps, adapting to how you feel.' },
      { title: 'Build', description: 'We build a foundation of strength and confidence to keep moving forward.' },
      { title: 'Develop', description: 'We work towards the activities you want to regain or maintain.' },
      { title: 'Consolidate', description: 'We reinforce your progress so you can stay active with more independence.' }
    ],
    next: 'What comes next?', followUp: 'Follow-up',
    closing: 'If you’d like to keep working with us, we can discuss follow-up support<br />adapted to you so you can keep caring for and improving your health.'
  }
};
