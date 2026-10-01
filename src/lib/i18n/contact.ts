import type { Language } from './copy';

const contactCopy = {
  es: {
    meta: {
      title: 'Contacto | Eima Salut',
      description:
        'Escríbenos o llámanos para contarnos tu caso. Te diremos con honestidad si Empenta puede ayudarte durante o después del cáncer.',
      ogTitle: "Contacto | Eima Salut",
      ogDescription: "Cuéntanos tu caso sin compromiso. Te diremos con honestidad si Empenta puede encajar contigo durante o después del cáncer.",
      imageAlt: 'Eima Salut — Contacto'
    },
    hero: {
      titleLineOne: '¿Listo/a para',
      titleHighlight: 'tomar las riendas',
      titleLineThree: 'de tu salud?',
      introPrefix: 'Si tienes dudas, escríbenos o llámanos',
      introStrong: 'totalmente gratuita.',
      introConnector: 'de forma',
      casePrefix: 'Cuéntanos tu caso y te diremos',
      caseStrong: 'total honestidad',
      caseSuffix: 'si podemos ayudarte.'
    }
  },
  ca: {
    meta: {
      title: 'Contacte | Eima Salut',
      description:
        'Escriu-nos o telefona’ns per explicar-nos el teu cas. Et direm amb honestedat si Empenta et pot ajudar durant o després del càncer.',
      ogTitle: "Contacte | Eima Salut",
      ogDescription: "Explica’ns el teu cas sense compromís. Et direm amb honestedat si Empenta pot encaixar amb tu durant o després del càncer.",
      imageAlt: 'Eima Salut — Contacte'
    },
    hero: {
      titleLineOne: 'Preparat/ada per',
      titleHighlight: 'agafar les regnes',
      titleLineThree: 'de la teva salut?',
      introPrefix: 'Si tens dubtes, escriu-nos o telefona’ns',
      introStrong: 'totalment gratuïta.',
      introConnector: 'de manera',
      casePrefix: 'Explica’ns el teu cas i et direm amb',
      caseStrong: 'total honestedat',
      caseSuffix: 'si et podem ajudar.'
    }
  },
  en: {
    meta: {
      title: 'Contact | Eima Salut',
      description:
        'Write to us or call us to tell us about your case. We will honestly tell you whether Empenta can help you during or after cancer.',
      ogTitle: "Contact | Eima Salut",
      ogDescription: "Tell us about your case with no obligation. We will honestly tell you whether Empenta could be suitable for you during or after cancer.",
      imageAlt: 'Eima Salut — Contact'
    },
    hero: {
      titleLineOne: 'Ready to',
      titleHighlight: 'take control',
      titleLineThree: 'of your health?',
      introPrefix: 'If you have any questions, write to us or call us',
      introStrong: 'completely free of charge.',
      introConnector: '',
      casePrefix: 'Tell us what’s going on and we’ll be',
      caseStrong: 'honest',
      caseSuffix: 'about whether we can help.'
    }
  }
} as const;

export function getContactCopy(language: Language) {
  return contactCopy[language];
}
