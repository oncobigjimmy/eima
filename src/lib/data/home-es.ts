// Base castellana aprobada. Los tres idiomas comparten los mismos componentes y estilos.
export const homeEsReview = {
  meta: {
    title: 'Ejercicio para personas con cáncer en Mallorca | Eima Salut',
    description: 'Programa de ejercicio adaptado durante y después del cáncer en Mallorca. Valoración inicial, plan personalizado y seguimiento por fisioterapeutas.',
    ogTitle: 'Ejercicio para personas con cáncer en Mallorca | Eima Salut',
    ogDescription: 'Ejercicio adaptado a tu situación y tratamiento para ayudarte a tener más energía, menos limitaciones y seguir con tu día a día.',
    imageAlt: 'Jaume y Miquel, fisioterapeutas de EIMA SALUT'
  },
  hero: {
    eyebrow: 'Programa de ejercicio para personas con cáncer en Mallorca',
    intro: 'Menos limitaciones.',
    phrases: ['Más energía.', 'Más salud.', 'Más vida.'],
    fromHome: 'En tu día a día.',
    mobileParagraphs: [
      'Si estás pasando por un <strong class="font-semibold">cáncer</strong> (o ya lo has pasado), te ayudamos a empezar o retomar el <strong class="font-semibold">ejercicio</strong> con un acompañamiento de 12 semanas adaptado a ti.',
      'Incluso si tienes <strong class="font-semibold">fatiga, dolor o dudas</strong> sobre cuánto puedes hacer durante o después del tratamiento.'
    ],
    desktopParagraphs: [
      ['Si estás pasando por un <strong class="font-semibold">cáncer</strong> (o ya lo has pasado), te ayudamos a empezar o retomar el <strong class="font-semibold">ejercicio</strong> con un acompañamiento de 12 semanas adaptado a ti.'],
      ['Incluso si tienes <strong class="font-semibold">fatiga, dolor o dudas</strong> sobre cuánto puedes hacer durante o después del tratamiento.']
    ],
    cta: 'Cuéntanos tu caso',
    note: 'Valoraremos tu caso, resolveremos tus dudas y te diremos si este acompañamiento encaja contigo.'
  },
  valueProps: {
    intro: '',
    steps: [
      { title: 'Claridad desde el principio', bodyLines: ['En la primera valoración vemos tu situación, tus objetivos y qué necesitas ahora mismo para que sepas <strong>qué hacer, cuánto hacer y cómo adaptarlo</strong>.'], icon: 'list' },
      { title: 'Menos desplazamientos', bodyLines: ['La <strong>primera valoración</strong> la hacemos <strong>en tu casa</strong> <strong>y después</strong><br class="home-desktop-break"> te acompañamos <strong>online</strong>, para ajustar el plan sin<br class="home-desktop-break"> sumar más desplazamientos a tu semana.'], icon: 'car' },
      { title: 'Apoyo cuando lo necesitas', bodyLines: ['Si aparece una duda, dolor, fatiga o un mal día, <strong>no tienes<br class="home-desktop-break"> que esperar a la siguiente cita para resolverlo.</strong> Nos<br class="home-desktop-break"> escribes y ajustamos el plan contigo.'], icon: 'support' },
      { title: 'Se adapta a ti, no al revés', bodyLines: ['Tu cuerpo no está igual todas las semanas. Este formato<br class="home-desktop-break"> nos permite <strong>adaptar el plan según tus síntomas,<br class="home-desktop-break"> tus horarios y tus tratamientos.</strong>'], icon: 'calendar' }
    ],
    summaryStrong: 'Por eso no trabajamos a base de sesiones sueltas.',
    summaryLines: [
      'Nuestro <strong class="text-[#4083A7]">Programa Empenta</strong> consta de un acompañamiento de <strong class="text-[#4083A7]">12 semanas.</strong>',
      'Porque <strong>una visita aislada no basta:</strong> necesitamos tiempo para conocerte, poner el plan en marcha, ir ajustándolo según lo que ocurra y volver a medir cómo evolucionas.'
    ],
    cta: 'Ver cómo funciona Empenta'
  }
};

export const homeWhatsAppMessage = 'Hola, he visto vuestro programa en la web y me gustaría contaros mi caso para saber si puede encajar conmigo.';

// Completar con vídeo, subtítulos y miniatura definitivos cuando se entreguen.
// No reutilizar los vídeos de fondo de los heroes como VSL.
export const homeVideoEs = { src: '', captions: '', poster: '/og-image.png' };
