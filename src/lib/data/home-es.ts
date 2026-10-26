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
      { title: 'Claridad desde el principio', bodyLines: ['En la primera valoración vemos tu situación, tus objetivos y<br class="home-desktop-break"> qué necesitas ahora mismo para que sepas <strong>qué hacer,<br class="home-desktop-break"> cuánto hacer y cómo adaptarlo.</strong>'], icon: 'list' },
      { title: 'Menos desplazamientos', bodyLines: ['La <strong>primera valoración</strong> la hacemos <strong>en tu casa</strong> y <strong>después</strong><br class="home-desktop-break"> te acompañamos <strong>online</strong>, sin añadir <br class="home-mobile-break"><span class="travel-mobile-phrase">desplazamientos<br class="home-desktop-break"> habituales</span><br class="home-mobile-break"> <span class="travel-mobile-phrase">a tu semana.</span>'], icon: 'car' },
      { title: 'Apoyo sin tener que pedir cita', bodyLines: ['Si algo te preocupa, un ejercicio no te sale o no sabes cómo<br class="home-desktop-break"> adaptarlo, <strong>no tienes que esperar a la siguiente cita</strong>. Nos<br class="home-desktop-break"> escribes y ajustamos tu plan contigo cuando sea necesario.'], icon: 'support' },
      { title: 'Se adapta a tu vida, no al revés', bodyLines: ['Adaptamos el ejercicio a <strong>cómo te encuentres, tus<br class="home-desktop-break"> tratamientos y tus horarios</strong>, para que puedas incorporarlo<br class="home-desktop-break"> a tu vida sin depender de un calendario rígido.'], icon: 'calendar' }
    ],
    summaryStrong: '',
    summaryLines: [
      'Nuestro <strong class="summary-marker">Programa Empenta</strong> consiste en un <strong class="text-[#4083A7]">acompañamiento de 12 semanas.</strong>',
      '<strong>No trabajamos a base de sesiones sueltas</strong>, porque no basta con saber qué ejercicios hacer<br class="home-desktop-break"> el primer día. Te ayudamos a incorporarlos a tu rutina, adaptarlos cuando sea necesario<br class="home-desktop-break"> y comprobar cómo evolucionas.',
      'Y algo importante: <strong>no necesitas encontrarte bien todas las semanas</strong> para que nuestro<br class="home-desktop-break"> acompañamiento tenga sentido. Habrá momentos para progresar, otros para mantener<br class="home-desktop-break"> y otros para descansar.',
      'Nuestro trabajo es ayudarte a <strong class="summary-marker">saber qué hacer en cada uno de ellos.</strong>'
    ],
    cta: '¿Y cómo lo haremos?'
  }
};

export const homeWhatsAppMessage = 'Hola, he visto vuestro programa en la web y me gustaría contaros mi caso para saber si puede encajar conmigo.';

// Completar con vídeo, subtítulos y miniatura definitivos cuando se entreguen.
// No reutilizar los vídeos de fondo de los heroes como VSL.
export const homeVideoEs = { src: '', captions: '', poster: '/og-image.png' };
