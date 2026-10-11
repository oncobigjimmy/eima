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
      intro: '', headingBefore: 'Guanyaràs', headingHighlight1: 'temps', headingMiddle: ', sense descuidar la teva', headingHighlight2: 'salut',
      steps: [
        { title: 'Claredat des del principi', bodyLines: ['A la primera valoració veim la teva situació, els teus objectius i què necessites ara mateix perquè sàpigues <strong>què fer, quant fer i com adaptar-ho</strong>.'], icon: 'list' },
        { title: 'Menys desplaçaments', bodyLines: ['La <strong>primera valoració</strong> la feim <strong>a ca teva</strong> <strong>i després</strong> t’acompanyam <strong>online</strong>, per ajustar el pla sense afegir més desplaçaments a la teva setmana.'], icon: 'car' },
        { title: 'Suport quan el necessites', bodyLines: ['Si apareix un dubte, dolor o fatiga amb algun exercici,<br class="home-desktop-break"> <strong>no has d’esperar a la següent cita per resoldre-ho.</strong><br class="home-desktop-break"> Ens escrius i ajustam el teu pla amb tu.'], icon: 'support' },
        { title: 'S’adapta a tu, no a l’inrevés', bodyLines: ['El teu cos no està igual totes les setmanes. Aquest format ens permet <strong>adaptar el pla segons els teus símptomes, els teus horaris i els teus tractaments.</strong>'], icon: 'calendar' }
      ],
      summaryStrong: '',
      summaryLines: [
        'El nostre <strong class="text-[#4083A7]">Programa Empenta</strong> consta d’un <strong class="text-[#4083A7]">acompanyament de 12 setmanes.</strong>',
        '<strong>No treballam a base de sessions soltes</strong> perquè no basta saber quins exercicis fer el primer dia.',
        'Necessitam <strong>conèixer el teu punt de partida,</strong> acompanyar-te mentre els <strong>incorpores a la teva rutina,</strong> adaptar-los quan sigui necessari i comprovar <strong>com evoluciones.</strong>'
      ],
      cta: 'Veure com funciona Empenta'
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
      intro: '', headingBefore: 'You’ll save', headingHighlight1: 'time', headingMiddle: ', without neglecting your', headingHighlight2: 'health',
      steps: [
        { title: 'Clarity from the start', bodyLines: ['At the first assessment, we look at your situation, goals and current needs so you know <strong>what to do, how much and how to adapt it</strong>.'], icon: 'list' },
        { title: 'Less travelling', bodyLines: ['We do the <strong>first assessment</strong> <strong>at your home</strong> <strong>and then</strong> support you <strong>online</strong>, adjusting the plan without adding more travelling to your week.'], icon: 'car' },
        { title: 'Support when you need it', bodyLines: ['If a question, pain or fatigue comes up with an exercise,<br class="home-desktop-break"> <strong>you don’t have to wait until your next appointment to address it.</strong><br class="home-desktop-break"> Write to us and we’ll adjust your plan with you.'], icon: 'support' },
        { title: 'It adapts to you', bodyLines: ['Your body isn’t the same every week. This format lets us <strong>adapt the plan to your symptoms, schedule and treatments.</strong>'], icon: 'calendar' }
      ],
      summaryStrong: '',
      summaryLines: [
        'Our <strong class="text-[#4083A7]">Empenta Programme</strong> provides <strong class="text-[#4083A7]">12 weeks of support.</strong>',
        '<strong>We don’t work through individual sessions</strong> because knowing which exercises to do on the first day isn’t enough.',
        'We need to <strong>understand your starting point,</strong> support you as you <strong>build them into your routine,</strong> adapt them when needed and check <strong>how you progress.</strong>'
      ],
      cta: 'See how Empenta works'
    }
  }
};
