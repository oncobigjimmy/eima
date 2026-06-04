export const DEFAULT_LANGUAGE = 'es';

export const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español', displayName: 'ESPAÑOL' },
  { code: 'ca', label: 'CA', name: 'Català', displayName: 'CATALÀ' },
  { code: 'en', label: 'EN', name: 'English', displayName: 'ENGLISH' }
] as const;

export type Language = (typeof LANGUAGES)[number]['code'];

export function isLanguage(value: string): value is Language {
  return LANGUAGES.some((language) => language.code === value);
}

const esCopy = {
  nav: {
    links: [
      { href: '/', label: 'Inicio' },
      { href: '/como-funciona', label: 'Cómo funciona' },
      { href: '/quienes-somos', label: 'Quiénes somos' },
      { href: '/contacto', label: 'Contacto' },
      { href: '/blog', label: 'Blog' }
    ],
    contact: 'Contáctanos',
    menuLabel: 'Menú'
  },
  footer: {
    contact: 'Contáctanos',
    pageMenu: 'Menú de páginas',
    legalPages: 'Páginas legales',
    legalLinks: [
      { href: '/terminos', label: 'Términos y condiciones' },
      { href: '/politica-privacidad', label: 'Política de privacidad' },
      { href: '/politica-cookies', label: 'Política de cookies' }
    ],
    phone: 'Teléfono',
    copyrightPrefix: 'Copyright ©',
    madeIn: 'Creado con cariño en Mallorca',
    madeInBefore: 'Creado con',
    madeInAfter: 'en Mallorca',
    heartAlt: 'corazón'
  },
  whatsapp: {
    message:
      'Hola, he visto vuestro programa Empenta en la web y me gustaría saber si puede encajar con mi situación. ¿Os puedo contar un poco mi caso?'
  },
  home: {
    meta: {
      title: 'EIMA | Fisioterapia a domicilio para personas con cáncer',
      description:
        'Fisioterapia a domicilio en Mallorca para personas con cáncer. Si estás en tratamiento o ya lo has pasado: recupera fuerza y energía con ejercicio en casa.',
      ogTitle: 'Fisioterapeutas especializados en cáncer y dolor oncológico',
      ogDescription:
        'Fisioterapia y ejercicio a domicilio en Mallorca. Te guiamos durante y después del cáncer con un plan seguro, progresivo y personalizado para recuperar fuerza y energía, incluso con dolor oncológico.',
      imageAlt: 'EIMA Fisioterapia — Fisioterapia a domicilio en Mallorca'
    },
    hero: {
      eyebrow: 'Ejercicio y fisioterapia a domicilio en Mallorca para personas con cáncer.',
      intro: 'Menos limitaciones.',
      phrases: ['Más energía', 'Más salud', 'Más vida.'],
      fromHome: 'Desde casa.',
      mobileParagraphs: [
        'Si estás pasando por un <strong class="font-semibold">cáncer</strong> (o ya lo has pasado), te ayudamos a empezar o retomar el <strong class="font-semibold">ejercicio</strong> de forma segura con un acompañamiento de 12 semanas adaptado a ti.',
        'Incluso si sigues con <strong class="font-semibold">dolor, fatiga o miedo a empeorar</strong> tras tus tratamientos médicos.'
      ],
      desktopParagraphs: [
        [
          'Si estás pasando por un <strong class="font-semibold">cáncer</strong> (o ya lo has pasado),',
          'te ayudamos a empezar o retomar el <strong class="font-semibold">ejercicio</strong> de forma segura',
          'con un acompañamiento de 12 semanas adaptado a ti.'
        ],
        [
          'Incluso si sigues con <strong class="font-semibold">dolor, fatiga o miedo a empeorar</strong>',
          'tras tus tratamientos médicos.'
        ]
      ],
      cta: 'Cuéntanos tu caso aquí',
      note:
        'Valoraremos tu caso, resolveremos tus dudas y te diremos si este acompañamiento encaja contigo.'
    },
    audience: {
      titleLine1: '¿Te ves reflejado/a en alguna',
      titleLine2Prefix: 'de',
      titleHighlight: 'estas situaciones',
      titleSuffix: '?',
      subtitle: 'No todo el mundo parte del mismo punto. Por eso adaptamos el proceso a tu caso.',
      button: 'Ver si es para mí',
      closingLines: ['3 situaciones diferentes.', 'Pero con un objetivo común:'],
      autonomyPrefix: 'Recuperar su',
      autonomyStrong: 'autonomía',
      items: [
        {
          letter: 'A',
          quote: '“No he hecho ejercicio nunca y no sé por dónde empezar.”',
          quoteLines: ['“No he hecho ejercicio', 'nunca y no sé por', 'dónde empezar.”'],
          actionLines: [
            'Te guiaremos con un plan claro y',
            'progresivo. Empezaremos con',
            'seguridad, sin agobios.'
          ]
        },
        {
          letter: 'B',
          quote: '“Hago algo por mi cuenta, pero no sé si ahora me conviene.”',
          actionLines: [
            'Ajustaremos tu entrenamiento',
            'para que sea eficaz. Y lo haremos',
            'sostenible para tu día a día.'
          ]
        },
        {
          letter: 'C',
          quote: '“Sé que moverme me puede ayudar, pero tengo dolor o fatiga.”',
          actionLines: [
            'Aprenderás a moverte con',
            'confianza. Y a progresar sin miedo,',
            'incluso con dolor o fatiga.'
          ]
        }
      ]
    },
    commonSituations: {
      titlePrefix: 'Si ahora mismo',
      titleHighlight: 'te pasa algo de esto',
      situations: [
        {
          icon: 'battery',
          body:
            'Te notas con <strong>menos fuerza y menos energía</strong>, y sientes que tu cuerpo ya no responde como antes.'
        },
        {
          icon: 'stethoscope',
          body:
            'Tu oncólogo/a te ha recomendado moverte, pero <strong>no sabes qué hacer, cuánto hacer ni cómo adaptarlo</strong> a tus tratamientos, síntomas y situación actual.'
        },
        {
          icon: 'question',
          body:
            'Quieres hacer algo para encontrarte mejor, pero <strong>te da miedo pasarte, agotarte o empeorar tus síntomas.</strong>'
        }
      ],
      asideTitleLines: ['Tienes que saber que', '<span class="font-bold">NO</span> es culpa tuya'],
      asideParagraphs: [
        'Esto le pasa a muchas personas durante y después del tratamiento.',
        'Y no significa que estés fallando.',
        'Significa que <strong class="font-bold">necesitas una guía adaptada</strong> a tu momento actual.'
      ],
      bottom:
        'Por eso, no se trata de moverte sin más, sino de hacerlo de una forma que te ayude de verdad en tu día a día.',
      cta: 'Cuéntanos qué te pasa'
    },
    recovery: {
      headingBefore: 'Lo que queremos',
      headingHighlight: 'ayudarte a conseguir',
      srTitle: '. Las 3R de tu recuperación',
      intro:
        '¿Sabes cuáles son los beneficios de hacer ejercicio durante y después del cáncer?',
      introSecond: 'Podemos resumirlos en un concepto:',
      titlePrefix: 'Las',
      titleStrong: '3R',
      titleSuffix: 'de tu recuperación',
      goals: [
        {
          title: 'Reducir',
          subtitle: 'el impacto de los efectos secundarios',
          body:
            'Buscamos que te muevas con menos fatiga, menos rigidez, menos miedo y más sensación de control sobre tu cuerpo y tu día a día.',
          icon: 'reduce'
        },
        {
          title: 'Recuperar',
          subtitle: 'fuerza y energía para tu día a día',
          body:
            'Queremos que vuelvas a sentirte más capaz en cosas cotidianas como caminar, subir escaleras, cargar bolsas o terminar el día con menos agotamiento.',
          icon: 'recover'
        },
        {
          title: 'Retomar',
          subtitle: 'con confianza lo importante para ti',
          body:
            'Poco a poco, buscamos que vuelvas a hacer con más seguridad esas actividades que ahora te cuestan, te cansan o te generan dudas.',
          icon: 'resume'
        }
      ]
    },
    slogan: {
      topHtml: '<strong>Sin SALUD,</strong> no disfrutas de tu tiempo.',
      middleHtml: '<strong>Sin TIEMPO,</strong> no puedes cuidar tu salud.',
      bottomHtml:
        'Con nosotros, <strong>cuidarás tu salud sin renunciar a tu tiempo.</strong>'
    },
    valueProps: {
      headingBefore: 'Ganarás',
      headingHighlight1: 'tiempo',
      headingMiddle: ', sin descuidar tu',
      headingHighlight2: 'salud',
      intro:
        'Nuestro formato está pensado para no añadirte otra carga más. Queremos acompañarte de una forma que encaje con tu energía, tus citas médicas y lo que necesites en cada momento.',
      steps: [
        {
          title: 'Claridad desde el principio',
          bodyLines: [
            'No vas a ciegas ni probando cosas al azar.',
            'En la primera valoración vemos tu situación, tus objetivos y qué necesitas ahora mismo para que sepas <strong>qué hacer, cuánto hacer y cómo adaptarlo</strong>.'
          ],
          icon: 'list'
        },
        {
          title: 'Menos desplazamientos',
          bodyLines: [
            'Ya tienes suficientes citas, revisiones y días duros.',
            'Por eso priorizamos un formato que te ayude sin añadir más carga a una etapa que ya puede ser <strong>física y mentalmente exigente.</strong>'
          ],
          icon: 'car'
        },
        {
          title: 'Apoyo cuando lo necesitas',
          bodyLines: [
            'Si aparece una duda, dolor, fatiga o un mal día, no tienes que esperar a la siguiente cita para resolverlo.',
            'Puedes consultarnos y <strong>ajustamos el proceso contigo en el momento.</strong>'
          ],
          icon: 'support'
        },
        {
          title: 'Se adapta a ti, no al revés',
          bodyLines: [
            'Tu cuerpo no está igual todas las semanas.',
            'Este formato permite subir, bajar o modificar el ejercicio según <strong>tu energía, tus síntomas, tus horarios y tu tratamiento.</strong>'
          ],
          icon: 'calendar'
        }
      ],
      summaryStrong: 'Por eso no trabajamos a base de sesiones sueltas.',
      summaryLines: [
        'Trabajamos con un acompañamiento estructurado de <strong class="text-[#4083A7]">12 semanas</strong>, con una primera valoración en tu casa y un seguimiento online <strong>para adaptar el proceso según tu momento.</strong>',
        'Haz clic abajo, donde te enseñamos paso a paso cómo funciona nuestro <strong class="text-[#4083A7]">Programa Empenta.</strong>'
      ],
      cta: 'Ver cómo funciona Empenta'
    }
  }
};

const caCopy = {
  ...esCopy,
  nav: {
    links: [
      { href: '/ca', label: 'Inici' },
      { href: '/ca/com-funciona', label: 'Com funciona' },
      { href: '/ca/qui-som', label: 'Qui som' },
      { href: '/ca/contacte', label: 'Contacte' },
      { href: '/blog', label: 'Blog' }
    ],
    contact: 'Contacta’ns',
    menuLabel: 'Menú'
  },
  footer: {
    contact: 'Contacta’ns',
    pageMenu: 'Menú de pàgines',
    legalPages: 'Pàgines legals',
    legalLinks: [
      { href: '/terminos', label: 'Termes i condicions' },
      { href: '/politica-privacidad', label: 'Política de privacitat' },
      { href: '/politica-cookies', label: 'Política de cookies' }
    ],
    phone: 'Telèfon',
    copyrightPrefix: 'Copyright ©',
    madeIn: 'Creat amb estima a Mallorca',
    madeInBefore: 'Creat amb',
    madeInAfter: 'a Mallorca',
    heartAlt: 'cor'
  },
  whatsapp: {
    message:
      "Hola, he vist el vostre programa Empenta a la web i m'agradaria saber si pot encaixar amb la meva situació. Us puc explicar una mica el meu cas?"
  },
  home: {
    ...esCopy.home,
    meta: {
      title: 'EIMA | Exercici i fisioteràpia a domicili per a persones amb càncer',
      description:
        'Exercici i fisioteràpia a domicili a Mallorca per a persones amb càncer. Comença o reprèn l’exercici de manera segura amb un acompanyament adaptat.',
      ogTitle: 'Exercici i fisioteràpia a domicili per a persones amb càncer',
      ogDescription:
        'T’acompanyam durant i després del càncer amb un pla segur, progressiu i personalitzat per recuperar força i energia des de casa.',
      imageAlt: 'EIMA Fisioteràpia — Fisioteràpia a domicili a Mallorca'
    },
    hero: {
      eyebrow: 'Exercici i fisioteràpia a domicili a Mallorca per a persones amb càncer.',
      intro: 'Menys limitacions.',
      phrases: ['Més energia', 'Més salut', 'Més vida.'],
      fromHome: 'Des de casa.',
      mobileParagraphs: [
        'Si estàs passant per un <strong class="font-semibold">càncer</strong> (o ja l’has passat), t’ajudam a començar o reprendre l’<strong class="font-semibold">exercici</strong> de manera segura amb un acompanyament de 12 setmanes adaptat a tu.',
        'Fins i tot si continues amb <strong class="font-semibold">dolor, fatiga o por d’empitjorar</strong> després dels teus tractaments mèdics.'
      ],
      desktopParagraphs: [
        [
          'Si estàs passant per un <strong class="font-semibold">càncer</strong> (o ja l’has passat),',
          't’ajudam a començar o reprendre l’<strong class="font-semibold">exercici</strong> de manera segura',
          'amb un acompanyament de 12 setmanes adaptat a tu.'
        ],
        [
          'Fins i tot si continues amb <strong class="font-semibold">dolor, fatiga o por d’empitjorar</strong>',
          'després dels teus tractaments mèdics.'
        ]
      ],
      cta: 'Explica’ns el teu cas aquí',
      note:
        'Valorarem el teu cas, resoldrem els teus dubtes i et direm si aquest acompanyament encaixa amb tu.'
    },
    audience: {
      titleLine1: 'Et veus reflectit/ida en alguna',
      titleLine2Prefix: 'd’',
      titleHighlight: 'aquestes situacions',
      titleSuffix: '?',
      subtitle: 'No tothom parteix del mateix punt. Per això adaptam el procés al teu cas.',
      button: 'Veure si és per a mi',
      closingLines: ['3 situacions diferents.', 'Però amb un objectiu comú:'],
      autonomyPrefix: 'Recuperar la seva',
      autonomyStrong: 'autonomia',
      items: [
        {
          letter: 'A',
          quote: '“No he fet exercici mai i no sé per on començar.”',
          quoteLines: ['“No he fet exercici', 'mai i no sé per', 'on començar.”'],
          actionLines: [
            'Et guiarem amb un pla clar i',
            'progressiu. Començarem amb',
            'seguretat, sense aclaparaments.'
          ]
        },
        {
          letter: 'B',
          quote: '“Faig alguna cosa pel meu compte, però no sé si ara em convé.”',
          actionLines: [
            'Ajustarem el teu entrenament',
            'perquè sigui eficaç. I ho farem',
            'sostenible per al teu dia a dia.'
          ]
        },
        {
          letter: 'C',
          quote: '“Sé que moure’m em pot ajudar, però tenc dolor o fatiga.”',
          actionLines: [
            'Aprendràs a moure’t amb',
            'confiança. I a progressar sense por,',
            'fins i tot amb dolor o fatiga.'
          ]
        }
      ]
    },
    commonSituations: {
      titlePrefix: 'Si ara',
      titleHighlight: 'et passa alguna cosa d’aquestes',
      situations: [
        {
          icon: 'battery',
          body:
            'Et notes amb <strong>menys força i menys energia</strong>, i sents que el teu cos ja no respon com abans.'
        },
        {
          icon: 'stethoscope',
          body:
            'El teu oncòleg o oncòloga t’ha recomanat moure’t, però <strong>no saps què fer, quant fer ni com adaptar-ho</strong> als teus tractaments, símptomes i situació actual.'
        },
        {
          icon: 'question',
          body:
            'Vols fer alguna cosa per trobar-te millor, però <strong>et fa por fer-ne massa, esgotar-te o empitjorar els teus símptomes.</strong>'
        }
      ],
      asideTitleLines: ['Has de saber que', '<span class="font-bold">NO</span> és culpa teva'],
      asideParagraphs: [
        'Això li passa a moltes persones durant i després del tractament.',
        'I no significa que estiguis fallant.',
        'Significa que <strong class="font-bold">necessites una guia adaptada</strong> al teu moment actual.'
      ],
      bottom:
        'Per això, no es tracta de moure’t sense més, sinó de fer-ho d’una manera que t’ajudi de veritat en el teu dia a dia.',
      cta: 'Explica’ns què et passa'
    },
    recovery: {
      headingBefore: 'El que volem',
      headingHighlight: 'ajudar-te a aconseguir',
      srTitle: '. Les 3R de la teva recuperació',
      intro:
        'Saps quins són els beneficis de fer exercici durant i després del càncer?',
      introSecond: 'Podem resumir-los en un concepte:',
      titlePrefix: 'Les',
      titleStrong: '3R',
      titleSuffix: 'de la teva recuperació',
      goals: [
        {
          title: 'Reduir',
          subtitle: 'l’impacte dels efectes secundaris',
          body:
            'Cercam que et moguis amb menys fatiga, menys rigidesa, menys por i més sensació de control sobre el teu cos i el teu dia a dia.',
          icon: 'reduce'
        },
        {
          title: 'Recuperar',
          subtitle: 'força i energia per al teu dia a dia',
          body:
            'Volem que tornis a sentir-te més capaç en coses quotidianes com caminar, pujar escales, carregar bosses o acabar el dia amb menys esgotament.',
          icon: 'recover'
        },
        {
          title: 'Reprendre',
          subtitle: 'allò que és important per a tu',
          body:
            'A poc a poc, cercam que tornis a fer amb més seguretat aquelles activitats que ara et costen, et cansen o et generen dubtes de si ara és un bon moment.',
          icon: 'resume'
        }
      ]
    },
    slogan: {
      topHtml: '<strong>Sense SALUT,</strong> no gaudeixes del teu temps.',
      middleHtml: '<strong>Sense TEMPS,</strong> no pots cuidar la teva salut.',
      bottomHtml:
        'Amb nosaltres, <strong>cuidaràs la teva salut sense renunciar al teu temps.</strong>'
    },
    valueProps: {
      headingBefore: 'Guanyaràs',
      headingHighlight1: 'temps',
      headingMiddle: ', sense descuidar la teva',
      headingHighlight2: 'salut',
      intro:
        'El nostre format està pensat per no afegir-te una altra càrrega més. Volem acompanyar-te d’una manera que encaixi amb la teva energia, les teves cites mèdiques i el que necessitis en cada moment.',
      steps: [
        {
          title: 'Claredat des del principi',
          bodyLines: [
            'No vas a cegues ni provant coses a l’atzar.',
            'A la primera valoració veim la teva situació, els teus objectius i què necessites ara mateix perquè sàpigues <strong>què fer, quant fer i com adaptar-ho</strong>.'
          ],
          icon: 'list'
        },
        {
          title: 'Menys desplaçaments',
          bodyLines: [
            'Ja tens prou cites, revisions i dies difícils.',
            'Per això prioritzam un format que t’ajudi sense afegir més càrrega a una etapa que ja pot ser <strong>física i mentalment exigent.</strong>'
          ],
          icon: 'car'
        },
        {
          title: 'Suport quan el necessites',
          bodyLines: [
            'Si apareix un dubte, dolor, fatiga o un mal dia, no has d’esperar a la següent cita per resoldre-ho.',
            'Ens pots consultar i <strong>ajustam el procés junts en el moment.</strong>'
          ],
          icon: 'support'
        },
        {
          title: 'S’adapta a tu, no a l’inrevés',
          bodyLines: [
            'El teu cos no està igual totes les setmanes.',
            'Aquest format permet pujar, baixar o modificar l’exercici segons <strong>la teva energia, els teus símptomes, els teus horaris i el teu tractament.</strong>'
          ],
          icon: 'calendar'
        }
      ],
      summaryStrong: 'Per això no treballam a base de sessions soltes.',
      summaryLines: [
        'Treballam amb un acompanyament estructurat de <strong class="text-[#4083A7]">12 setmanes</strong>, amb una primera valoració a ca teva i un seguiment online <strong>per adaptar el procés segons el teu moment.</strong>',
        'Fes clic a baix, on t’ensenyam pas a pas com funciona el nostre <strong class="text-[#4083A7]">Programa Empenta.</strong>'
      ],
      cta: 'Veure com funciona Empenta'
    }
  }
};

const enCopy = {
  ...esCopy,
  nav: {
    links: [
      { href: '/en', label: 'Home' },
      { href: '/en/how-it-works', label: 'How it works' },
      { href: '/en/who-we-are', label: 'Who we are' },
      { href: '/en/contact', label: 'Contact' },
      { href: '/blog', label: 'Blog' }
    ],
    contact: 'Contact us',
    menuLabel: 'Menu'
  },
  footer: {
    contact: 'Contact us',
    pageMenu: 'Page menu',
    legalPages: 'Legal pages',
    legalLinks: [
      { href: '/terminos', label: 'Terms and conditions' },
      { href: '/politica-privacidad', label: 'Privacy policy' },
      { href: '/politica-cookies', label: 'Cookie policy' }
    ],
    phone: 'Phone',
    copyrightPrefix: 'Copyright ©',
    madeIn: 'Created with heart in Mallorca',
    madeInBefore: 'Created with',
    madeInAfter: 'in Mallorca',
    heartAlt: 'heart'
  },
  whatsapp: {
    message:
      'Hi, I saw your Empenta Programme on your website and I’m wondering if it might be right for me. Can I tell you a bit about my situation?'
  },
  home: {
    ...esCopy.home,
    meta: {
      title: 'EIMA | Home physiotherapy for people with cancer',
      description:
        'Home-based oncology physiotherapy and exercise support in Mallorca. Start or return to exercise safely through a 12-week programme built around you.',
      ogTitle: 'Home-based oncology physiotherapy and exercise support in Mallorca',
      ogDescription:
        'We support you during and after cancer with a safe, progressive and personalised plan to recover strength and energy from home.',
      imageAlt: 'EIMA Physiotherapy — Home physiotherapy in Mallorca'
    },
    hero: {
      eyebrow: 'Home-based oncology physiotherapy and exercise support in Mallorca.',
      intro: 'Fewer limitations.',
      phrases: ['More energy', 'More health', 'More life.'],
      fromHome: 'From home.',
      mobileParagraphs: [
        'If you’re going through <strong class="font-semibold">cancer treatment</strong> — or recovering from it — we help you start or return to <strong class="font-semibold">exercise</strong> safely through a 12-week programme built around you.',
        'Even if you’re dealing with <strong class="font-semibold">pain, fatigue or fear of making things worse</strong> after treatment.'
      ],
      desktopParagraphs: [
        [
          'If you’re going through <strong class="font-semibold">cancer treatment</strong> — or recovering from it —',
          'we help you start or return to <strong class="font-semibold">exercise</strong> safely through',
          'a 12-week programme built around you.'
        ],
        [
          'Even if you’re dealing with <strong class="font-semibold">pain, fatigue</strong> or',
          '<strong class="font-semibold">fear of making things worse</strong> after treatment.'
        ]
      ],
      cta: "Tell us what's going on",
      note:
        'We’ll look at your situation, answer your questions and tell you honestly if we can help you.',
      noteLines: [
        'We’ll look at your situation, answer your questions',
        'and tell you honestly if we can help you.'
      ]
    },
    audience: {
      titleLine1: 'Do you see yourself in any',
      titleLine2Prefix: 'of',
      titleHighlight: 'these situations',
      titleSuffix: '?',
      subtitle: 'Not everyone starts from the same place. That is why we adapt the process to your case.',
      button: 'Is this for me?',
      closingLines: ['3 different starting points.', 'One shared goal:'],
      autonomyPrefix: 'Rebuilding your',
      autonomyStrong: 'independence.',
      items: [
        {
          letter: 'A',
          quote: '“I have never exercised and I don’t know where to start.”',
          quoteLines: ['“I have never exercised', 'and I don’t know', 'where to start.”'],
          actionLines: [
            'We’ll guide you with a clear,',
            'progressive plan so you can begin',
            'safely, without feeling overwhelmed.'
          ]
        },
        {
          letter: 'B',
          quote: '“I do some exercise on my own, but I don’t know if it is right for me now.”',
          actionLines: [
            'We’ll adapt your training',
            'so it fits your treatment, symptoms',
            'and day-to-day life.'
          ]
        },
        {
          letter: 'C',
          quote: '“I know movement can help, but right now I have pain or fatigue.”',
          actionLines: [
            'You’ll learn how to move with more',
            'confidence and progress without fear,',
            'even on difficult days.'
          ]
        }
      ]
    },
    commonSituations: {
      titlePrefix: 'If any of this is',
      titleHighlight: 'happening to you right now',
      situations: [
        {
          icon: 'battery',
          body:
            'You feel <strong>weaker, more tired and less confident</strong> in your body than before. Like your body no longer responds as it used to.'
        },
        {
          icon: 'stethoscope',
          body:
            'Your oncologist has recommended that you move more, but <strong>you do not know what to do, how much to do, or how to adapt it</strong> to your treatments, symptoms and current situation.'
        },
        {
          icon: 'question',
          body:
            'You want to do something to feel better, but <strong>you are afraid of overdoing it, exhausting yourself or worsening your symptoms.</strong>'
        }
      ],
      asideTitleLines: ['You need to know this:', 'it is <span class="font-bold">NOT</span> your fault'],
      asideParagraphs: [
        'This happens to many people during and after treatment.',
        'It doesn’t mean you’re failing.',
        'It means you need <strong class="font-bold">guidance</strong> that fits your current situation.'
      ],
      bottom:
        'Because this is not about “just moving more”. It’s about moving in a way that actually helps you in your daily life.',
      cta: 'Tell us what is going on'
    },
    recovery: {
      headingBefore: 'What we want to',
      headingHighlight: 'help you achieve',
      srTitle: '. The 3 Rs of your recovery',
      intro:
        'Do you know the benefits of exercising during and after cancer?',
      introSecond: 'We can summarise them in one concept:',
      titlePrefix: 'The',
      titleStrong: '3 Rs',
      titleSuffix: 'of your recovery',
      goals: [
        {
          title: 'Reduce',
          subtitle: 'the impact of side effects',
          body:
            'We want you to move with less fatigue, less stiffness, less fear and a greater sense of control over your body and your day-to-day life.',
          icon: 'reduce'
        },
        {
          title: 'Recover',
          subtitle: 'strength and energy for your daily life',
          body:
            'We want you to feel more capable again in everyday activities such as walking, climbing stairs, carrying shopping bags or finishing the day with less exhaustion.',
          icon: 'recover'
        },
        {
          title: 'Return',
          subtitle: 'with confidence to what matters to you',
          body:
            'Step by step, we help you return more safely to the activities that you now find difficult, exhausting, or uncertain. So you can enjoy them again.',
          icon: 'resume'
        }
      ]
    },
    slogan: {
      topHtml: '<strong>Without HEALTH,</strong> you cannot enjoy your time.',
      middleHtml: '<strong>Without TIME,</strong> you cannot take care of your health.',
      bottomHtml:
        'With us, <strong>you will take care of your health without giving up your time.</strong>'
    },
    valueProps: {
      headingBefore: 'You will save',
      headingHighlight1: 'time',
      headingMiddle: ', without',
      headingSecondLine: 'compromising your',
      headingHighlight2: 'health',
      intro:
        'Our format is designed so it does not become another burden. We want to support you in a way that fits your energy, your medical appointments and what you need at each moment.',
      steps: [
        {
          title: 'Clarity from the beginning',
          bodyLines: [
            'You won’t be left guessing or trying random exercises.',
            'In the first assessment, we look at your situation, your goals and what you need right now, so you know <strong>what to do, how much to do and how to adapt it.</strong>'
          ],
          icon: 'list'
        },
        {
          title: 'Less travelling',
          bodyLines: [
            'You already have enough appointments, check-ups and difficult days.',
            'That’s why we prioritise a format that supports you without adding more unnecessary travelling to an <strong>already demanding stage.</strong>'
          ],
          icon: 'car'
        },
        {
          title: 'Support when you need it',
          bodyLines: [
            'If a question, pain, fatigue or a bad day appears, you do not have to wait until the next appointment to solve it.',
            'You can contact us and <strong>we will adjust the process with you in the moment.</strong>'
          ],
          icon: 'support'
        },
        {
          title: 'The plan is built around you',
          bodyLines: [
            'Your body is not the same every week.',
            'This format allows us to increase, reduce or modify the exercise according to <strong>your energy, your symptoms, your schedule and your treatment.</strong>'
          ],
          icon: 'calendar'
        }
      ],
      summaryStrong: 'That is why we do not work through isolated sessions.',
      summaryLines: [
        'We work with a structured <strong class="text-[#4083A7]">12-week</strong> support programme, with an initial assessment at your home and online follow-up <strong>to adapt the process according to your current situation.</strong>',
        'Click below to see, step by step, how the <strong class="text-[#4083A7]">Empenta Programme</strong> works.'
      ],
      cta: 'See how Empenta works'
    }
  }
};

const copyByLanguage = {
  es: esCopy,
  ca: caCopy,
  en: enCopy
};

export function getCopy(language: Language) {
  return copyByLanguage[language] ?? esCopy;
}

export function getHtmlLang(language: Language) {
  return language === 'ca' ? 'ca' : language === 'en' ? 'en' : 'es';
}

export function getWhatsAppHref(language: Language) {
  const message = getCopy(language).whatsapp.message;
  return `https://wa.me/34604529731?text=${encodeURIComponent(message)}`;
}
