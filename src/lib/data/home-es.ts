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
      'Si tienes o has tenido <strong class="font-semibold">cáncer</strong>, te ayudamos a empezar o retomar el <strong class="font-semibold">ejercicio</strong> con un acompañamiento de <strong class="font-semibold">12 semanas</strong> adaptado a ti.',
      'También si <strong class="font-semibold">la fatiga, el dolor o las dudas</strong> sobre cuánto puedes hacer te están frenando.'
    ],
    desktopParagraphs: [
      ['Si tienes o has tenido <strong class="font-semibold">cáncer</strong>, te ayudamos a empezar', 'o retomar el <strong class="font-semibold">ejercicio</strong> con un acompañamiento', 'de <strong class="font-semibold">12 semanas</strong> adaptado a ti.'],
      ['También si <strong class="font-semibold">la fatiga, el dolor o las dudas</strong> sobre cuánto', 'puedes hacer te están frenando.']
    ],
    cta: 'Cuéntanos tu caso',
    note: 'Valoraremos tu caso, resolveremos tus dudas y te diremos si este acompañamiento encaja contigo.'
  },
  valueProps: {
    intro: '',
    steps: [
      { title: 'Claridad desde el principio', bodyLines: ['En la primera valoración vemos tu situación, tus objetivos y qué necesitas ahora mismo para que sepas <strong>qué hacer, cuánto hacer y cómo adaptarlo</strong>.'], icon: 'list' },
      { title: 'Menos desplazamientos', bodyLines: ['La <strong>primera valoración</strong> la hacemos <strong>en tu casa</strong> <strong>y después</strong><br class="home-desktop-break"> te acompañamos <strong>online</strong>, para ajustar el plan sin<br class="home-desktop-break"> sumar más desplazamientos a tu semana.'], icon: 'car' },
      { title: 'Apoyo cuando lo necesitas', bodyLines: ['Si aparece una duda, dolor o fatiga con algún ejercicio,<br class="home-desktop-break"> <strong>no tienes que esperar a la siguiente cita para resolverlo.</strong><br class="home-desktop-break"> Nos escribes y ajustamos tu plan contigo.'], icon: 'support' },
      { title: 'Se adapta a ti, no al revés', bodyLines: ['Tu cuerpo no está igual todas las semanas. Este formato<br class="home-desktop-break"> nos permite <strong>adaptar el plan según tus síntomas,<br class="home-desktop-break"> tus horarios y tus tratamientos.</strong>'], icon: 'calendar' }
    ],
    summaryStrong: '',
    summaryLines: [
      'Nuestro <strong class="text-[#4083A7]">Programa Empenta</strong> consta de un <strong class="text-[#4083A7]">acompañamiento de 12 semanas.</strong>',
      '<strong>No trabajamos a base de sesiones sueltas</strong> porque no basta con saber qué ejercicios hacer el primer día.',
      'Necesitamos <strong>conocer tu punto de partida,</strong> acompañarte mientras los <strong>incorporas a tu rutina,</strong> adaptarlos cuando sea necesario y comprobar <strong>cómo evolucionas.</strong>'
    ],
    cta: 'Ver cómo funciona Empenta'
  }
};

export const homeWhatsAppMessage = 'Hola, he visto vuestro programa en la web y me gustaría contaros mi caso para saber si puede encajar conmigo.';

// Completar con vídeo, subtítulos y miniatura definitivos cuando se entreguen.
// No reutilizar los vídeos de fondo de los heroes como VSL.
export const homeVideoEs = { src: '', captions: '', poster: '/og-image.png' };
