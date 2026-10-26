// Translations of the approved Spanish home, consumed by the same components.
const caParagraphs = [
  'Si tens o has tingut <strong class="font-semibold">càncer</strong>, t’ajudam a començar o reprendre l’<strong class="font-semibold">exercici</strong> amb un acompanyament de <strong class="font-semibold">12 setmanes</strong> adaptat a tu.',
  'També si <strong class="font-semibold">la fatiga, el dolor o els dubtes</strong> sobre quant pots fer t’estan frenant.'
];
const enParagraphs = [
  'If you have or have had <strong class="font-semibold">cancer</strong>, we help you start or return to <strong class="font-semibold">exercise</strong> with <strong class="font-semibold">12 weeks</strong> of support adapted to you.',
  'Also if <strong class="font-semibold">fatigue, pain or uncertainty</strong> about how much you can do are holding you back.'
];

export const translatedHomeReview = {
  ca: {
    meta: {
      title: 'Exercici per a persones amb càncer a Mallorca | Eima Salut',
      description: 'Programa d’exercici adaptat durant i després del càncer a Mallorca. Valoració inicial, pla personalitzat i seguiment per fisioterapeutes.',
      ogTitle: 'Exercici per a persones amb càncer a Mallorca | Eima Salut',
      ogDescription: 'Exercici adaptat a la teva situació i tractament per ajudar-te a tenir més energia, menys limitacions i continuar amb el teu dia a dia.',
      imageAlt: 'Jaume i Miquel, fisioterapeutes d’Eima Salut'
    },
    hero: {
      eyebrow: 'Programa d’exercici per a persones amb càncer a Mallorca',
      intro: 'Menys limitacions.', phrases: ['Més energia.', 'Més salut.', 'Més vida.'], fromHome: 'En el teu dia a dia.',
      mobileParagraphs: caParagraphs, desktopParagraphs: [
        ['Si tens o has tingut <strong class="font-semibold">càncer</strong>, t’ajudam a començar', 'o reprendre l’<strong class="font-semibold">exercici</strong> amb un acompanyament', 'de <strong class="font-semibold">12 setmanes</strong> adaptat a tu.'],
        ['També si <strong class="font-semibold">la fatiga, el dolor o els dubtes</strong> sobre quant', 'pots fer t’estan frenant.']
      ],
      cta: 'Conta’ns el teu cas', note: 'Valorarem el teu cas, resoldrem els teus dubtes i et direm si aquest acompanyament encaixa amb tu.'
    },
    valueProps: {
  "headingHtml": "La teva <span class=\"value-heading-accent\">salut</span> importa. El teu <span class=\"value-heading-accent\">temps</span> també.",
  "mobileIntro": "El nostre <strong class=\"summary-marker\">Programa Empenta</strong><br />t’acompanya durant <strong>12 setmanes.</strong>",
  "intro": "",
  "steps": [
    {
      "title": "Claredat des del principi",
      "bodyLines": [
        "A la primera valoració veim la teva situació, els teus objectius i què necessites ara mateix perquè sàpigues <strong>què fer, quant fer i com adaptar-ho.</strong>"
      ],
      "icon": "list"
    },
    {
      "title": "Menys desplaçaments",
      "bodyLines": [
        "La <strong>primera valoració</strong> la feim <strong>a ca teva</strong> i <strong>després</strong> t’acompanyam <strong>online</strong>, sense afegir <br class=\"home-mobile-break\"><span class=\"travel-mobile-phrase\">desplaçaments habituals</span><br class=\"home-mobile-break\"> <span class=\"travel-mobile-phrase\">a la teva setmana.</span>"
      ],
      "icon": "car"
    },
    {
      "title": "Suport sense haver de demanar cita",
      "bodyLines": [
        "Si alguna cosa et preocupa, un exercici no et surt o no saps com adaptar-lo, <strong>no has d’esperar a la següent cita</strong>. Ens escrius i ajustam el teu pla amb tu quan sigui necessari."
      ],
      "icon": "support"
    },
    {
      "title": "S’adapta a la teva vida, no a l’inrevés",
      "bodyLines": [
        "Adaptam l’exercici a <strong>com et trobis, els teus tractaments i els teus horaris</strong>, perquè el puguis incorporar a la teva vida sense dependre d’un calendari rígid."
      ],
      "icon": "calendar"
    }
  ],
  "summaryStrong": "",
  "summaryLines": [
    "El nostre <strong class=\"summary-marker\">Programa Empenta</strong> consisteix en un <strong>acompanyament de 12 setmanes.</strong>",
    "<strong>No treballam a base de sessions soltes</strong>, perquè no basta saber quins exercicis fer el primer dia. T’ajudam a incorporar-los a la teva rutina, adaptar-los quan sigui necessari i comprovar com evoluciones.",
    "I una cosa important: <strong>no necessites trobar-te bé totes les setmanes</strong> perquè el nostre acompanyament tengui sentit. Hi haurà moments per progressar, altres per mantenir i altres per descansar.",
    "La nostra feina és ajudar-te a <strong class=\"summary-marker\">saber què fer en cada un d’aquests moments.</strong>"
  ],
  "cta": "I com ho farem?"
}
  },
  en: {
    meta: {
      title: 'Exercise for people with cancer in Mallorca | Eima Salut',
      description: 'Adapted exercise during and after cancer in Mallorca. Initial assessment, personalised plan and follow-up by physiotherapists.',
      ogTitle: 'Exercise for people with cancer in Mallorca | Eima Salut',
      ogDescription: 'Exercise adapted to your situation and treatment to help you have more energy, fewer limitations and keep going with daily life.',
      imageAlt: 'Jaume and Miquel, Eima Salut physiotherapists'
    },
    hero: {
      eyebrow: 'Exercise programme for people with cancer in Mallorca',
      intro: 'Fewer limitations.', phrases: ['More energy.', 'More health.', 'More life.'], fromHome: 'In your daily life.',
      mobileParagraphs: enParagraphs, desktopParagraphs: [
        ['If you have or have had <strong class="font-semibold">cancer</strong>, we help you start', 'or return to <strong class="font-semibold">exercise</strong> with support', 'over <strong class="font-semibold">12 weeks</strong>, adapted to you.'],
        ['Also if <strong class="font-semibold">fatigue, pain or uncertainty</strong> about how much', 'you can do are holding you back.']
      ],
      cta: 'Tell us about your situation', note: 'We’ll assess your situation, answer your questions and tell you whether this support is right for you.'
    },
    valueProps: {
  "headingHtml": "Your <span class=\"value-heading-accent\">health</span> matters. Your <span class=\"value-heading-accent\">time</span> does too.",
  "mobileIntro": "Our <strong class=\"summary-marker\">Empenta Programme</strong><br />supports you for <strong>12 weeks.</strong>",
  "intro": "",
  "steps": [
    {
      "title": "Clarity from the start",
      "bodyLines": [
        "At the first assessment, we look at your situation, your goals and what you need right now so you know <strong>what to do, how much and how to adapt it.</strong>"
      ],
      "icon": "list"
    },
    {
      "title": "Less travelling",
      "bodyLines": [
        "We do the <strong>first assessment</strong> <strong>at your home</strong> and <strong>then</strong> support you <strong>online</strong>, without adding <br class=\"home-mobile-break\"><span class=\"travel-mobile-phrase\">regular travel</span><br class=\"home-mobile-break\"> <span class=\"travel-mobile-phrase\">to your week.</span>"
      ],
      "icon": "car"
    },
    {
      "title": "Support without booking an appointment",
      "bodyLines": [
        "If something worries you, an exercise isn’t working for you or you don’t know how to adapt it, <strong>you don’t have to wait until your next appointment</strong>. Write to us and we’ll adjust your plan with you when needed."
      ],
      "icon": "support"
    },
    {
      "title": "It adapts to your life, not the other way round",
      "bodyLines": [
        "We adapt exercise to <strong>how you feel, your treatments and your schedule</strong>, so you can make it part of your life without depending on a rigid calendar."
      ],
      "icon": "calendar"
    }
  ],
  "summaryStrong": "",
  "summaryLines": [
    "Our <strong class=\"summary-marker\">Empenta Programme</strong> provides <strong>12 weeks of support.</strong>",
    "<strong>We don’t work through one-off sessions</strong>, because knowing which exercises to do on the first day isn’t enough. We help you build them into your routine, adapt them when needed and check how you progress.",
    "And something important: <strong>you don’t need to feel well every week</strong> for our support to make sense. There will be times to progress, times to maintain and times to rest.",
    "Our job is to help you <strong class=\"summary-marker\">know what to do at each of those times.</strong>"
  ],
  "cta": "And how will we do it?"
}
  }
};
