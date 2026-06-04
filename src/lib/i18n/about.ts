import type { Language } from './copy';

const principleIcons = {
  listen:
    'M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z',
  measure:
    'M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z',
  integrate:
    'M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,120l80-80,80,80v88H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48Zm96,88H112V160h32Z'
};

const esAbout = {
  meta: {
    title: 'EIMA | Quiénes somos | Fisioterapia a Domicilio en Mallorca',
    description:
      'Somos fisioterapeutas que creemos en el ejercicio como la base para mantener nuestra autonomía. Conoce nuestra historia y nuestra forma de entender la salud.',
    ogTitle: 'Conoce quiénes somos y nuestra historia | Eima Fisioterapia',
    ogDescription:
      'Conoce al equipo y por qué nuestro enfoque es activo. Nos basamos en ejercicio, educación en hábitos de salud y un seguimiento continuado para recuperar fuerza, energía y autonomía.',
    imageAlt: 'Jaume y Miquel, fisioterapeutas de EIMA'
  },
  hero: {
    eyebrow: 'Quiénes somos',
    line1: 'Queremos ayudarte a',
    line2Prefix: 'recuperar tu',
    line2Highlight: 'energía,',
    line3: 'confianza y control.',
    line3Parts: [
      { text: 'confianza', accent: true },
      { text: ' y ' },
      { text: 'control.', accent: true }
    ],
    srSubtitle:
      'Acompañamos a personas con cáncer a moverse con seguridad, recuperar energía y cuidarse sin desplazamientos innecesarios.',
    body:
      'Somos Miquel y Jaume, fisioterapeutas y fundadores de EIMA. <strong>Acompañamos a personas con cáncer</strong> a moverse con seguridad, recuperar energía y cuidarse sin desplazamientos innecesarios.',
    prompt: '¿Nos cuentas tu historia?',
    cta: 'Te escuchamos'
  },
  origin: {
    eyebrow: 'Nuestra mirada',
    titleDesktopPrefix: 'De dónde nace',
    titleMobileLine1: 'De dónde',
    titleMobileLine2Prefix: 'nace',
    intro:
      'EIMA nace del cansancio.<br />Del cansancio de ver un sistema que, muchas veces, no ayuda a salir de la enfermedad, sino a convivir a diario con ella.',
    introMobile:
      'EIMA nace del cansancio. Del cansancio de ver un sistema que, muchas veces, no ayuda a salir de la enfermedad, sino a convivir a diario con ella.',
    imageAlt: 'Persona sentada en casa mirando medicación',
    firstParagraphs: [
      'De ver cómo, en este sistema, se normaliza la <strong>dependencia</strong> y se pierde de vista el principal objetivo: recuperar salud, autonomía y calidad de vida a largo plazo.',
      'Nosotros no creemos en eso. Creemos que la salud no va de parches eternos ni de delegarlo todo en otros. Creemos en personas activas, críticas y responsables, que quieren <strong>entender qué les pasa</strong>, qué pueden hacer para estar mejor <strong>hoy</strong> y qué necesitan para seguir estando bien <strong>dentro de 10 años</strong>.'
    ],
    secondParagraphs: [
      'No pretendemos luchar contra el sistema. Sabemos que es demasiado grande para cambiarlo desde dentro.',
      'Por eso decidimos salirnos y construir una forma de trabajar coherente con cómo entendemos la salud.',
      'Eso es EIMA: hacer las cosas con <strong>conocimiento, criterio y sentido común.</strong> No por costumbre ni por inercia.'
    ]
  },
  dictionary: {
    phonetic: "['əj.mə]",
    gender: 'nombre femenino',
    region: 'Balear',
    definitionOne: 'Hacer las cosas con sensatez y conocimiento.',
    definitionTwo: '«Tenir eima»: tener cuidado a la hora de hacer las cosas.'
  },
  team: {
    eyebrow: 'El equipo',
    headingLine1Prefix: 'Dos',
    headingLine1Highlight: 'fisioterapeutas,',
    headingLine2: 'una misma forma',
    headingLine3Prefix: 'de',
    headingLine3Highlight: 'acompañarte.',
    healthLabel: 'Nuestra forma de entender la salud',
    healthParagraphs: [
      'En EIMA entendemos que un cáncer <strong>no es solo un diagnóstico</strong>. Es una experiencia que puede afectar al cuerpo, a la mente, a la energía, a la confianza y la forma en que vives tu día a día.',
      'Por eso no miramos únicamente el síntoma. <strong>Miramos a la persona:</strong> su historia, su contexto, su nivel de actividad, sus miedos, su fatiga, su dolor y lo que necesita para <strong>volver a sentirse más capaz.</strong>',
      'Trabajamos desde un enfoque activo, con <strong>ejercicio adaptado</strong>, educación en hábitos de salud y acompañamiento cercano. No buscamos imponer un ritmo, sino ayudarte a avanzar con criterio, seguridad y objetivos realistas.'
    ],
    hintFull: 'Haz clic encima de uno de nosotros para conocer nuestra historia.',
    hintMobileLineOne: 'Haz clic encima de uno de nuestros nombres',
    hintMobileLineTwo: 'para conocer nuestra historia al completo.',
    imageAlt: 'Jaume Sansó Servera y Miquel Galmés Vives',
    mobileNamesLabel: 'Historias del equipo',
    cta: 'Lee nuestra historia'
  },
  principles: {
    eyebrow: 'Cómo trabajamos',
    headingPrefix: 'Cercanía, criterio y',
    headingHighlight: 'un plan',
    headingSuffix: 'que puedas sostener.',
    items: [
      {
        iconPath: principleIcons.listen,
        title: 'Escuchar antes de pautar',
        text:
          'Cada persona llega con una historia, un tratamiento y unas prioridades distintas. Primero entendemos tu contexto; después adaptamos el plan a ti. No al revés.'
      },
      {
        iconPath: principleIcons.measure,
        title: 'Medir para decidir',
        text:
          'No trabajamos a ojo. Observamos cómo respondes, ajustamos la carga y buscamos que cada paso tenga sentido para tu momento.'
      },
      {
        iconPath: principleIcons.integrate,
        title: 'Integrarlo en tu vida',
        text:
          'Llevamos la fisioterapia y el ejercicio a tu entorno para que cuidar tu salud sea más fácil, más realista y, sobre todo, más sostenible a largo plazo.'
      }
    ]
  },
  closing: {
    eyebrow: 'Y así nace EIMA',
    prefix: 'Porque la ',
    accentOne: 'salud',
    middle: 'también necesita',
    accentTwo: 'tiempo.',
    paragraphs: [
      'Creamos EIMA para personas que <strong>no quieren que la vida quede en pausa</strong> durante el tratamiento.',
      'Personas que quieren seguir haciendo lo que está en su mano para recuperar energía, moverse con más seguridad y <strong>vivir más, sí, pero sobre todo vivir mejor.</strong>',
      'Por eso trabajamos de forma <strong>online</strong>: porque sabemos que el cansancio, las citas médicas y la vida diaria ya ocupan demasiado espacio. Nuestro papel es ayudarte a cuidar tu salud <strong>sin añadir más carga a tu día a día.</strong>'
    ],
    cta: 'Cuéntanos tu caso'
  }
};

const caAbout = {
  meta: {
    title: 'EIMA | Qui som | Fisioteràpia a domicili a Mallorca',
    description:
      'Som fisioterapeutes i acompanyam persones amb càncer a moure’s amb seguretat, recuperar energia i cuidar-se sense desplaçaments innecessaris.',
    ogTitle: 'Qui som | EIMA Fisioteràpia',
    ogDescription:
      'Coneix l’equip i la nostra manera d’entendre la salut: exercici adaptat, hàbits de salut i acompanyament proper.',
    imageAlt: 'Jaume i Miquel, fisioterapeutes d’EIMA'
  },
  hero: {
    eyebrow: 'Qui som',
    line1: 'Volem ajudar-te a',
    line2Prefix: 'recuperar la teva',
    line2Highlight: 'energia,',
    line3: 'confiança i control.',
    line3Parts: [
      { text: 'confiança', accent: true },
      { text: ' i ' },
      { text: 'control.', accent: true }
    ],
    srSubtitle:
      'Acompanyam persones amb càncer a moure’s amb seguretat, recuperar energia i cuidar-se sense desplaçaments innecessaris.',
    body:
      'Som en Miquel i en Jaume, fisioterapeutes i fundadors d’EIMA.<br class="hidden md:block" /> <strong>Acompanyam persones amb càncer</strong> a moure’s amb seguretat,<br class="hidden md:block" /> recuperar energia i cuidar-se sense desplaçaments innecessaris.',
    prompt: 'Ens expliques la teva història?',
    cta: 'T’escoltam'
  },
  origin: {
    eyebrow: 'La nostra mirada',
    titleDesktopPrefix: 'D’on neix',
    titleMobileLine1: 'D’on',
    titleMobileLine2Prefix: 'neix',
    intro:
      'EIMA neix del cansament.<br />Del cansament de veure un sistema que, moltes vegades, no ajuda a sortir de la malaltia, sinó a conviure-hi cada dia.',
    introMobile:
      'EIMA neix del cansament. Del cansament de veure un sistema que, moltes vegades, no ajuda a sortir de la malaltia, sinó a conviure-hi cada dia.',
    imageAlt: 'Persona asseguda a casa mirant medicació',
    firstParagraphs: [
      'De veure com, en aquest sistema, es normalitza la <strong>dependència</strong> i es perd de vista l’objectiu principal: recuperar salut, autonomia i qualitat de vida a llarg termini.',
      'Nosaltres no creim en això. Creim en una salut que no va de pedaços eterns ni de delegar-ho tot en altres. Creim en persones actives, crítiques i responsables, que volen <strong>entendre què els passa</strong>, què poden fer per estar millor <strong>avui</strong> i què necessiten per continuar estant bé <strong>d’aquí a 10 anys</strong>.'
    ],
    secondParagraphs: [
      'No pretenem lluitar contra el sistema. Sabem que és massa gran per canviar-lo des de dins.',
      'Per això vàrem decidir fer una passa al costat i construir una manera de treballar coherent amb com entenem la salut.',
      'Això és EIMA: fer les coses amb <strong>coneixement, criteri i sentit comú.</strong> No per costum ni per inèrcia.'
    ]
  },
  dictionary: {
    phonetic: "['əj.mə]",
    gender: 'nom femení',
    region: 'Balear',
    definitionOne: 'Fer les coses amb seny i coneixement.',
    definitionTwo: '«Tenir eima»: anar amb compte a l’hora de fer les coses.'
  },
  team: {
    eyebrow: 'L’equip',
    headingLine1Prefix: 'Dos',
    headingLine1Highlight: 'fisioterapeutes,',
    headingLine2: 'una mateixa manera',
    headingLine3Prefix: 'd’',
    headingLine3Highlight: 'acompanyar-te.',
    healthLabel: 'La nostra manera d’entendre la salut',
    healthParagraphs: [
      'A EIMA entenem que un càncer <strong>no és només un diagnòstic</strong>. És una experiència que pot afectar el cos, la ment, l’energia, la confiança i la manera com vius el teu dia a dia.',
      'Per això no miram únicament el símptoma. <strong>Miram la persona:</strong> la seva història, el seu context, el seu nivell d’activitat, les seves pors, la seva fatiga, el seu dolor i el que necessita per tornar a sentir-se més capaç.',
      'Treballam des d’un enfocament actiu, amb <strong>exercici adaptat</strong>, educació en hàbits de salut i acompanyament proper. No cercam imposar un ritme, sinó ajudar-te a avançar amb criteri, seguretat i objectius realistes.'
    ],
    hintFull: 'Fes clic damunt un de nosaltres per conèixer la nostra història.',
    hintMobileLineOne: 'Fes clic damunt un dels nostres noms',
    hintMobileLineTwo: 'per conèixer la nostra història al complet.',
    imageAlt: 'Jaume Sansó Servera i Miquel Galmés Vives',
    mobileNamesLabel: 'Històries de l’equip',
    cta: 'Llegeix la nostra història'
  },
  principles: {
    eyebrow: 'Com treballam',
    headingPrefix: 'Proximitat, criteri i',
    headingHighlight: 'un pla',
    headingSuffix: 'que puguis sostenir.',
    items: [
      {
        iconPath: principleIcons.listen,
        title: 'Escoltar abans de pautar',
        text:
          'Cada persona arriba amb una història, un tractament i unes prioritats diferents. Primer entenem el teu context; després adaptam el pla a tu. No a l’inrevés.'
      },
      {
        iconPath: principleIcons.measure,
        title: 'Mesurar per decidir',
        text:
          'No treballam a ull. Observam com respons, ajustam la càrrega segons la teva energia i símptomes, i cercam que cada passa tengui sentit per al moment en què et trobes.'
      },
      {
        iconPath: principleIcons.integrate,
        title: 'Integrar-ho en la teva vida',
        text:
          'Duim la fisioteràpia i l’exercici al teu entorn perquè cuidar la teva salut sigui més fàcil, més realista i, sobretot, més sostenible a llarg termini.'
      }
    ]
  },
  closing: {
    eyebrow: 'I així neix EIMA',
    prefix: 'Perquè la ',
    accentOne: 'salut',
    middle: 'també necessita',
    accentTwo: 'temps.',
    paragraphs: [
      'Cream EIMA per a persones que <strong>no volen que la vida quedi en pausa</strong> durant el tractament, ni sentir que només poden esperar que les coses passin.',
      'Persones que volen continuar fent el que està a les seves mans per recuperar energia, moure’s amb més seguretat, guanyar confiança en el seu cos i <strong>viure més, sí, però sobretot viure millor.</strong>',
      'Per això treballam de forma <strong>online</strong>: perquè sabem que el cansament, les cites mèdiques i la vida diària ja ocupen massa espai. El nostre paper és ajudar-te a cuidar la teva salut <strong>sense afegir més càrrega al teu dia a dia.</strong>'
    ],
    cta: 'Explica’ns el teu cas'
  }
};

const enAbout = {
  meta: {
    title: 'EIMA | Who we are | Home Physiotherapy in Mallorca',
    description:
      'We are physiotherapists who support people with cancer so they can move safely, recover energy and take care of themselves without unnecessary journeys.',
    ogTitle: 'Who we are | EIMA Physiotherapy',
    ogDescription:
      'Meet the team and our way of understanding health: adapted exercise, health habits and close support.',
    imageAlt: 'Jaume and Miquel, EIMA physiotherapists'
  },
  hero: {
    eyebrow: 'Who we are',
    line1: 'We want to help you',
    line2Prefix: 'rebuild your',
    line2Highlight: 'energy,',
    line3: 'confidence and sense of control.',
    line3Parts: [
      { text: 'confidence', accent: true },
      { text: ' and sense of ' },
      { text: 'control.', accent: true }
    ],
    desktopTitleLines: [
      { text: 'We want to help you rebuild' },
      {
        parts: [
          { text: 'your ' },
          { text: 'energy,', accent: true },
          { text: ' ' },
          { text: 'confidence', accent: true }
        ]
      },
      {
        parts: [
          { text: 'and sense of ' },
          { text: 'control.', accent: true }
        ]
      }
    ],
    srSubtitle:
      'We support people with cancer so they can move safely, rebuild energy and take care of their health without unnecessary travel.',
    body:
      'We are Miquel and Jaume, physiotherapists and founders of EIMA.<br class="hidden md:block" /> <strong>We support people with cancer</strong> so they can move safely, rebuild<br class="hidden md:block" /> energy and take care of their health without unnecessary travel.',
    prompt: 'Will you tell us your story?',
    cta: 'We listen to you'
  },
  origin: {
    eyebrow: 'Our view of health',
    titleDesktopPrefix: 'Where',
    titleHighlight: 'EIMA',
    titleDesktopSuffix: 'comes from',
    titleMobileLine1: 'Where',
    titleMobileLine2Prefix: '',
    titleMobileLine2Highlight: 'EIMA',
    titleMobileLine2Suffix: 'comes from',
    intro:
      'EIMA was born from a clear frustration.<br /><span class="about-origin-nowrap">The frustration of seeing a system that, too often, does not help people move beyond illness, but simply live with it every day.</span>',
    introMobile:
      'EIMA was born from a clear frustration. The frustration of seeing a system that, too often, does not help people move beyond illness, but simply live with it every day.',
    imageAlt: 'Person sitting at home looking at medication',
    firstParagraphs: [
      'Seeing how, in this system, <strong>dependency</strong> becomes normalised, and the real goal is pushed into the background: recovering health, autonomy and long-term quality of life.',
      'We do not believe in that. We believe health is not about endless quick fixes or handing everything over to others. We believe in active, critical and responsible people who want to <strong>understand what is happening to them</strong>, what they can do to feel better <strong>today</strong> and what they need to keep feeling well <strong>10 years from now</strong>.'
    ],
    secondParagraphs: [
      'We are not here to fight the system. We know it is too big to change from within.',
      'We are here to offer a way of working that is more coherent with how we understand health.',
      'That is EIMA: doing things with <strong>knowledge, clinical judgement and common sense.</strong> Not out of habit or inertia.'
    ]
  },
  dictionary: {
    phonetic: "['əj.mə]",
    gender: 'feminine noun',
    region: 'Balearic',
    definitionOne: 'To do things with good sense and knowledge.',
    definitionTwo: '“Tenir eima”: to be careful when doing things.'
  },
  team: {
    eyebrow: 'The team',
    headingLine1Prefix: 'Two',
    headingLine1Highlight: 'physiotherapists,',
    headingLine2: 'one shared way',
    headingLine3Prefix: 'of',
    headingLine3Highlight: 'supporting you.',
    healthLabel: 'Our way of understanding health',
    healthParagraphs: [
      'At EIMA, we understand that cancer <strong>is not just a diagnosis</strong>. It is an experience that can affect your body, mind, energy, confidence and the way you live your day-to-day life.',
      'That is why we do not look only at the symptom. <strong>We look at the person:</strong> their story, their context, their activity level, their fears, their fatigue, their pain and what they need to <strong>feel more capable again.</strong>',
      'We work from an active approach, using <strong>adapted exercise</strong>, health education and close support. We are not here to impose a pace, but to help you move forward safely, realistically and with clear criteria.'
    ],
    hintFull: 'Click on one of our names to read our story.',
    hintMobileLineOne: 'Click on one of our names',
    hintMobileLineTwo: 'to read our story.',
    imageAlt: 'Jaume Sansó Servera and Miquel Galmés Vives',
    mobileNamesLabel: 'Team stories',
    cta: 'Read our story'
  },
  principles: {
    eyebrow: 'How we work',
    headingPrefix: 'Close support, clinical judgement and',
    headingHighlight: 'a plan',
    headingSuffix: 'you can sustain.',
    items: [
      {
        iconPath: principleIcons.listen,
        title: 'Listening before prescribing',
        text:
          'Every person arrives with a different story, treatment and set of priorities. First, we understand your context. Then we adapt the plan to you. Not the other way around.'
      },
      {
        iconPath: principleIcons.measure,
        title: 'Measuring in order to decide',
        text:
          'We do not rely on guesswork. We observe how you respond, adjust the load and make sure each step makes sense for your current situation.'
      },
      {
        iconPath: principleIcons.integrate,
        title: 'Bringing it into your life',
        text:
          'We bring physiotherapy and exercise into your own environment. Making it easier, more realistic and more sustainable to take care of your health.'
      }
    ]
  },
  closing: {
    eyebrow: 'And that is how EIMA was born',
    prefix: 'Because ',
    accentOne: 'health',
    middle: 'also needs',
    accentTwo: 'time.',
    paragraphs: [
      'We created EIMA for people who <strong>do not want life to be put on hold</strong> during treatment, or feel stuck waiting for things to change.',
      'People who want to keep doing what is within their power to rebuild energy, move with more confidence and <strong>live longer — but above all, live better.</strong>',
      'That is why we work mainly <strong>online</strong>: to help you take care of your health <strong>without adding more burden to your day-to-day life.</strong>'
    ],
    cta: 'Tell us what’s going on'
  }
};

const aboutByLanguage = {
  es: esAbout,
  ca: caAbout,
  en: enAbout
};

export function getAboutCopy(language: Language) {
  return aboutByLanguage[language] ?? esAbout;
}
