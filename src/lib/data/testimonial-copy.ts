import type { Language } from '$lib/i18n/copy';
// TODO [CA-revisar]: revisar todas las nuevas traducciones catalanas de testimonios.
export const testimonialUi = {
  es: {
    eyebrow: 'Respuestas reales de pacientes', heading: 'Lo que nos cuentan cada semana nuestros pacientes', headingBefore: 'Lo que nos cuentan cada semana', headingAccent: 'nuestros pacientes', headingAfter: '',
    chapters: ['1 · Lo que se recupera', '2 · Los días difíciles', '3 · Cómo te acompañamos'],
    shortChapters: ['Se recupera', 'Días difíciles', 'Te acompañamos'],
    cta: 'Cuéntanos tu caso', all: 'Ver todos los testimonios',
    previous: 'Respuesta anterior', next: 'Respuesta siguiente', expand: 'Ampliar respuesta', captureHint: 'Haz clic para aumentar', restart: 'Volver al principio',
    bridge1: 'Pero durante un cáncer, ', bridge1Accent: 'no todos los días son así.',
    bridge2: 'Precisamente ', bridge2Accent: 'para esos días', bridge2End: ' existe Empenta',
    final: 'Para que vuelvas a hacer', finalAccent: 'cosas que antes', finalEnd: 'parecían lejos.',
    tabs: ['Historias en vídeo', 'Historias escritas'],
    filters: ['Todas', 'Lo que se recupera', 'Los días difíciles', 'Cómo te acompañamos'], filter: 'Filtrar:',
    pause: 'Pausar movimiento', resume: 'Reanudar'
  },
  ca: {
    eyebrow: 'Respostes reals de pacients', heading: 'El que ens expliquen cada setmana els nostres pacients', headingBefore: 'El que ens expliquen cada setmana', headingAccent: 'els nostres pacients', headingAfter: '',
    chapters: ['1 · El que es recupera', '2 · Els dies difícils', "3 · Com t'acompanyam"],
    shortChapters: ['Es recupera', 'Dies difícils', "T'acompanyam"],
    cta: "Explica'ns el teu cas", all: 'Veure tots els testimonis',
    previous: 'Resposta anterior', next: 'Resposta següent', expand: 'Ampliar resposta', captureHint: 'Fes clic per ampliar', restart: 'Tornar al principi',
    bridge1: 'Però durant un càncer, ', bridge1Accent: 'no tots els dies són així.',
    bridge2: 'Precisament ', bridge2Accent: 'per a aquests dies', bridge2End: ' existeix Empenta',
    final: 'Perquè tornis a fer', finalAccent: 'coses que abans', finalEnd: 'semblaven lluny.',
    tabs: ['Històries en vídeo', 'Històries escrites'],
    filters: ['Totes', 'El que es recupera', 'Els dies difícils', "Com t'acompanyam"], filter: 'Filtrar:',
    pause: 'Aturar moviment', resume: 'Reprendre'
  },
  en: {
    eyebrow: 'Real patient responses', heading: 'What our patients tell us each week', headingBefore: 'What we hear each week from', headingAccent: 'our patients', headingAfter: '',
    chapters: ['1 · What you regain', '2 · Difficult days', '3 · How we support you'],
    shortChapters: ['Regaining things', 'Difficult days', 'Our support'],
    cta: 'Tell us about your situation', all: 'See all testimonials',
    previous: 'Previous response', next: 'Next response', expand: 'Enlarge response', captureHint: 'Click to enlarge', restart: 'Back to the beginning',
    bridge1: 'But during cancer, ', bridge1Accent: 'not every day is like that.',
    bridge2: 'It is precisely ', bridge2Accent: 'for those days', bridge2End: ' that Empenta exists',
    final: 'So you can return to', finalAccent: 'things that once', finalEnd: 'felt far away.',
    tabs: ['Video stories', 'Written stories'],
    filters: ['All', 'What you regain', 'Difficult days', 'How we support you'], filter: 'Filter:',
    pause: 'Pause movement', resume: 'Resume'
  }
} satisfies Record<Language, object>;
