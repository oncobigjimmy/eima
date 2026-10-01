// Translations of the approved Spanish home, consumed by the same components.
const caParagraphs = [
  'Si estàs passant per un <strong class="font-semibold">càncer</strong> (o ja l’has passat), t’ajudam a començar o reprendre l’<strong class="font-semibold">exercici</strong> amb un acompanyament de 12 setmanes adaptat a tu.',
  'Encara que tenguis <strong class="font-semibold">fatiga, dolor o dubtes</strong> sobre quant pots fer durant o després del tractament.'
];
const enParagraphs = [
  'If you’re going through <strong class="font-semibold">cancer</strong> (or have already been through it), we help you start or return to <strong class="font-semibold">exercise</strong> with 12 weeks of support adapted to you.',
  'Even if you have <strong class="font-semibold">fatigue, pain or questions</strong> about how much you can do during or after treatment.'
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
      mobileParagraphs: caParagraphs, desktopParagraphs: caParagraphs.map(p => [p]),
      cta: 'Conta’ns el teu cas', note: 'Valorarem el teu cas, resoldrem els teus dubtes i et direm si aquest acompanyament encaixa amb tu.'
    },
    valueProps: {
      intro: '', headingBefore: 'Guanyaràs', headingHighlight1: 'temps', headingMiddle: ', sense descuidar la teva', headingHighlight2: 'salut',
      steps: [
        { title: 'Claredat des del principi', bodyLines: ['A la primera valoració veim la teva situació, els teus objectius i què necessites ara mateix perquè sàpigues <strong>què fer, quant fer i com adaptar-ho</strong>.'], icon: 'list' },
        { title: 'Menys desplaçaments', bodyLines: ['La <strong>primera valoració</strong> la feim <strong>a ca teva</strong> <strong>i després</strong> t’acompanyam <strong>online</strong>, per ajustar el pla sense afegir més desplaçaments a la teva setmana.'], icon: 'car' },
        { title: 'Suport quan el necessites', bodyLines: ['Si apareix un dubte, dolor, fatiga o un mal dia, <strong>no has d’esperar a la següent cita per resoldre-ho.</strong> Ens escrius i ajustam el pla amb tu.'], icon: 'support' },
        { title: 'S’adapta a tu, no a l’inrevés', bodyLines: ['El teu cos no està igual totes les setmanes. Aquest format ens permet <strong>adaptar el pla segons els teus símptomes, els teus horaris i els teus tractaments.</strong>'], icon: 'calendar' }
      ],
      summaryStrong: 'Per això no treballam a base de sessions soltes.',
      summaryLines: ['El nostre <strong class="text-[#4083A7]">Programa Empenta</strong> consta d’un acompanyament de <strong class="text-[#4083A7]">12 setmanes.</strong>', 'Perquè <strong>una visita aïllada no basta:</strong> necessitam temps per conèixer-te, posar el pla en marxa, anar-lo ajustant segons el que passi i tornar a mesurar com evoluciones.'],
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
      mobileParagraphs: enParagraphs, desktopParagraphs: enParagraphs.map(p => [p]),
      cta: 'Tell us about your situation', note: 'We’ll assess your situation, answer your questions and tell you whether this support is right for you.'
    },
    valueProps: {
      intro: '', headingBefore: 'You’ll save', headingHighlight1: 'time', headingMiddle: ', without neglecting your', headingHighlight2: 'health',
      steps: [
        { title: 'Clarity from the start', bodyLines: ['At the first assessment, we look at your situation, goals and current needs so you know <strong>what to do, how much and how to adapt it</strong>.'], icon: 'list' },
        { title: 'Less travelling', bodyLines: ['We do the <strong>first assessment</strong> <strong>at your home</strong> <strong>and then</strong> support you <strong>online</strong>, adjusting the plan without adding more travelling to your week.'], icon: 'car' },
        { title: 'Support when you need it', bodyLines: ['If a question, pain, fatigue or a bad day comes up, <strong>you don’t have to wait until your next appointment to address it.</strong> Write to us and we’ll adjust the plan with you.'], icon: 'support' },
        { title: 'It adapts to you', bodyLines: ['Your body isn’t the same every week. This format lets us <strong>adapt the plan to your symptoms, schedule and treatments.</strong>'], icon: 'calendar' }
      ],
      summaryStrong: 'That’s why we don’t work through isolated sessions.',
      summaryLines: ['Our <strong class="text-[#4083A7]">Empenta Programme</strong> provides <strong class="text-[#4083A7]">12 weeks</strong> of support.', 'Because <strong>a single visit isn’t enough:</strong> we need time to get to know you, put the plan into action, keep adjusting it as things change and measure your progress again.'],
      cta: 'See how Empenta works'
    }
  }
};
