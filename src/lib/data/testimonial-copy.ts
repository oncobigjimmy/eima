import type { Language } from '$lib/i18n/copy';
// TODO [CA-revisar]: revisar todas las nuevas traducciones catalanas de testimonios.
export const testimonialUi = {
  es: {
    eyebrow: 'Respuestas reales de pacientes', heading: 'Lo que nos cuentan cada semana nuestros pacientes', headingBefore: 'Lo que nos cuentan cada semana', headingAccent: 'nuestros pacientes', headingAfter: '',
    chapters: ['1 · Lo que recuperan', '2 · Sus días difíciles', '3 · Cómo te acompañamos'],
    shortChapters: ['Lo que recuperan', 'Sus días difíciles', 'Te acompañamos'],
    cta: 'Cuéntanos tu caso', all: 'Ver todos los testimonios',
    previous: 'Respuesta anterior', next: 'Respuesta siguiente', expand: 'Ampliar respuesta', captureHint: 'Haz clic para aumentar', restart: 'Volver al principio',
    bridge1: 'Pero durante un cáncer, ', bridge1Accent: 'no todos los días son así.',
    bridge2: 'Precisamente ', bridge2Accent: 'para esos días', bridge2End: ' existe Empenta',
    final: 'Para que puedas', finalAccent: 'volver a hacer las cosas', finalEnd: 'que echas de menos.',
    tabs: ['Historias en vídeo', 'Historias escritas'],
    filters: ['Todas', 'Lo que se recupera', 'Los días difíciles', 'Cómo te acompañamos'], filter: 'Filtrar:',
    pause: 'Pausar movimiento', resume: 'Reanudar', explored: 'Historias exploradas',
    completion: {
      eyebrow: 'Cada historia, una persona', heading: 'Ahora queremos escucharte a ti.',
      intro: 'Has recorrido todas estas experiencias reales', introEnd: 'de nuestros pacientes.',
      question: '¿Te has sentido identificado con algún comentario?', questionEnd: '¿Te ha surgido alguna duda?',
      invitation: 'Cuéntanos qué estás viviendo y lo hablamos contigo.',
      cta: 'Hablemos por WhatsApp', free: 'Esta primera conversación es gratuita y sin compromiso.',
      dismiss: 'Seguir explorando', close: 'Cerrar invitación'
    }
  },
  ca: {
    eyebrow: 'Respostes reals de pacients', heading: 'El que ens expliquen cada setmana els nostres pacients', headingBefore: 'El que ens expliquen cada setmana', headingAccent: 'els nostres pacients', headingAfter: '',
    chapters: ['1 · El que recuperen', '2 · Els seus dies difícils', "3 · Com t'acompanyam"],
    shortChapters: ['El que recuperen', 'Els seus dies difícils', "T'acompanyam"],
    cta: "Explica'ns el teu cas", all: 'Veure tots els testimonis',
    previous: 'Resposta anterior', next: 'Resposta següent', expand: 'Ampliar resposta', captureHint: 'Fes clic per ampliar', restart: 'Tornar al principi',
    bridge1: 'Però durant un càncer, ', bridge1Accent: 'no tots els dies són així.',
    bridge2: 'Precisament ', bridge2Accent: 'per a aquests dies', bridge2End: ' existeix Empenta',
    final: 'Perquè puguis', finalAccent: 'tornar a fer les coses', finalEnd: 'que enyores.',
    tabs: ['Històries en vídeo', 'Històries escrites'],
    filters: ['Totes', 'El que es recupera', 'Els dies difícils', "Com t'acompanyam"], filter: 'Filtrar:',
    pause: 'Aturar moviment', resume: 'Reprendre', explored: 'Històries explorades',
    completion: {
      eyebrow: 'Cada història, una persona', heading: "Ara et volem escoltar a tu.",
      intro: 'Has recorregut totes aquestes experiències reals', introEnd: 'dels nostres pacients.',
      question: "T’has sentit identificat amb qualque comentari?", questionEnd: 'T’ha sorgit cap dubte?',
      invitation: "Explica’ns què estàs vivint i en parlam amb tu.",
      cta: 'Parlem per WhatsApp', free: 'Aquesta primera conversa és gratuïta i sense compromís.',
      dismiss: 'Continuar explorant', close: 'Tancar la invitació'
    }
  },
  en: {
    eyebrow: 'Real patient responses', heading: 'What our patients tell us each week', headingBefore: 'What we hear each week from', headingAccent: 'our patients', headingAfter: '',
    chapters: ['1 · What they regain', '2 · Their difficult days', '3 · How we support you'],
    shortChapters: ['What they regain', 'Their difficult days', 'Our support'],
    cta: 'Tell us about your situation', all: 'See all testimonials',
    previous: 'Previous response', next: 'Next response', expand: 'Enlarge response', captureHint: 'Click to enlarge', restart: 'Back to the beginning',
    bridge1: 'But during cancer, ', bridge1Accent: 'not every day is like that.',
    bridge2: 'It is precisely ', bridge2Accent: 'for those days', bridge2End: ' that Empenta exists',
    final: 'So you can', finalAccent: 'get back to doing the things', finalEnd: 'you miss.',
    tabs: ['Video stories', 'Written stories'],
    filters: ['All', 'What you regain', 'Difficult days', 'How we support you'], filter: 'Filter:',
    pause: 'Pause movement', resume: 'Resume', explored: 'Stories explored',
    completion: {
      eyebrow: 'Every story, a person', heading: 'Now we’d like to hear your story.',
      intro: 'You’ve explored all these real experiences', introEnd: 'from our patients.',
      question: 'Did any of their words resonate with you?', questionEnd: 'Do you have any questions?',
      invitation: 'Tell us what you’re going through. We’re here to talk it through with you.',
      cta: 'Let’s talk on WhatsApp', free: 'This first conversation is free, with no obligation.',
      dismiss: 'Keep exploring', close: 'Close invitation'
    }
  }
} satisfies Record<Language, object>;
