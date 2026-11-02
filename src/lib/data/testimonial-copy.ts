import type { Language } from '$lib/i18n/copy';
// TODO [CA-revisar]: revisar todas las nuevas traducciones catalanas de testimonios.
export const testimonialUi = {
  es: {
    eyebrow: 'Respuestas reales de pacientes', heading: 'Lo que nos cuentan nuestros pacientes, semana a semana', headingBefore: 'Lo que nos cuentan ', headingAccent: 'nuestros pacientes', headingAfter: ', semana a semana',
    chapters: ['1 · Lo que se recupera', '2 · Los días difíciles', '3 · Cómo te acompañamos'],
    shortChapters: ['Se recupera', 'Días difíciles', 'Te acompañamos'],
    questionnaire: 'Cuestionario de seguimiento', cta: 'Cuéntanos tu caso', all: 'Ver todos los testimonios',
    previous: 'Respuesta anterior', next: 'Respuesta siguiente', expand: 'Ampliar respuesta', restart: 'Volver al principio',
    bridge1: 'Pero no todos los días ', bridge1Accent: 'son así.',
    bridge2: 'Precisamente ', bridge2Accent: 'para esos días', bridge2End: ' existe Empenta',
    final: 'Para que tú también puedas ', finalAccent: 'volver a hacer cosas', finalEnd: ' que antes parecían lejos.',
    tabs: ['Historias en vídeo', 'Historias escritas'],
    filters: ['Todas', 'Lo que se recupera', 'Los días difíciles', 'Cómo te acompañamos'], filter: 'Filtrar:',
    pause: 'Pausar movimiento', resume: 'Reanudar', more: 'Ver más historias'
  },
  ca: {
    eyebrow: 'Respostes reals de pacients', heading: 'El que ens expliquen els nostres pacients, setmana a setmana', headingBefore: 'El que ens expliquen ', headingAccent: 'els nostres pacients', headingAfter: ', setmana a setmana',
    chapters: ['1 · El que es recupera', '2 · Els dies difícils', "3 · Com t'acompanyam"],
    shortChapters: ['Es recupera', 'Dies difícils', "T'acompanyam"],
    questionnaire: 'Qüestionari de seguiment', cta: "Explica'ns el teu cas", all: 'Veure tots els testimonis',
    previous: 'Resposta anterior', next: 'Resposta següent', expand: 'Ampliar resposta', restart: 'Tornar al principi',
    bridge1: 'Però no tots els dies ', bridge1Accent: 'són així.',
    bridge2: 'Precisament ', bridge2Accent: 'per a aquests dies', bridge2End: ' existeix Empenta',
    final: 'Perquè tu també puguis ', finalAccent: 'tornar a fer coses', finalEnd: ' que abans semblaven lluny.',
    tabs: ['Històries en vídeo', 'Històries escrites'],
    filters: ['Totes', 'El que es recupera', 'Els dies difícils', "Com t'acompanyam"], filter: 'Filtrar:',
    pause: 'Aturar moviment', resume: 'Reprendre', more: 'Veure més històries'
  },
  en: {
    eyebrow: 'Real patient responses', heading: 'What our patients tell us, week by week', headingBefore: 'What ', headingAccent: 'our patients', headingAfter: ' tell us, week by week',
    chapters: ['1 · What you regain', '2 · Difficult days', '3 · How we support you'],
    shortChapters: ['Regaining things', 'Difficult days', 'Our support'],
    questionnaire: 'Follow-up questionnaire', cta: 'Tell us about your situation', all: 'See all testimonials',
    previous: 'Previous response', next: 'Next response', expand: 'Enlarge response', restart: 'Back to the beginning',
    bridge1: 'But not every day ', bridge1Accent: 'is like that.',
    bridge2: 'It is precisely ', bridge2Accent: 'for those days', bridge2End: ' that Empenta exists',
    final: 'So you too can ', finalAccent: 'do things again', finalEnd: ' that once felt far away.',
    tabs: ['Video stories', 'Written stories'],
    filters: ['All', 'What you regain', 'Difficult days', 'How we support you'], filter: 'Filter:',
    pause: 'Pause movement', resume: 'Resume', more: 'See more stories'
  }
} satisfies Record<Language, object>;
