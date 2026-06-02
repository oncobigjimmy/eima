import type { Language } from './copy';

const contactCopy = {
  es: {
    meta: {
      title: 'Contacto | Fisioterapia oncológica a domicilio en Mallorca',
      description:
        'Escríbenos o llámanos para contarnos tu caso. Te diremos con honestidad si Empenta puede ayudarte durante o después del cáncer.',
      ogTitle: 'Contacto | Fisioterapia oncológica a domicilio en Mallorca',
      ogDescription:
        'Cuéntanos tu caso sin compromiso. Valoramos si podemos ayudarte con fisioterapia oncológica y ejercicio a domicilio en Mallorca.',
      imageAlt: 'EIMA Fisioterapia — Contacto'
    },
    hero: {
      titleLineOne: '¿Listo/a para',
      titleHighlight: 'tomar las riendas',
      titleLineThree: 'de tu salud?',
      introPrefix: 'Si tienes dudas, escríbenos o llámanos',
      introStrong: 'totalmente gratuita.',
      introConnector: 'de forma',
      casePrefix: 'Cuéntanos tu caso y te diremos con',
      caseStrong: 'total honestidad',
      caseSuffix: 'si podemos ayudarte.',
      socialHeading: 'También puedes encontrarnos aquí:'
    },
    form: {
      title: 'Contacta con nosotros',
      nameLabel: 'Nombre',
      namePlaceholder: 'Nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'Correo electrónico',
      messageLabel: 'Cuéntanos tu caso',
      messagePlaceholder:
        '¿Qué es lo que más te limita ahora mismo?\n¿Qué te gustaría volver a hacer?',
      submit: 'Enviar',
      privacyBefore: 'Al enviar aceptas nuestra',
      privacyLink: 'política de privacidad',
      privacyAfter: '.',
      successTitle: '¡Gracias! Hemos recibido tu mensaje.',
      successBody: 'Te responderemos lo antes posible. Si lo prefieres, también puedes llamarnos al',
      errors: {
        email: 'Email requerido',
        name: 'Nombre requerido',
        notConfigured: 'El formulario no está configurado todavía.',
        internal: 'Error interno del servidor'
      }
    }
  },
  ca: {
    meta: {
      title: 'Contacte | Fisioteràpia oncològica a domicili a Mallorca',
      description:
        'Escriu-nos o telefona’ns per explicar-nos el teu cas. Et direm amb honestedat si Empenta et pot ajudar durant o després del càncer.',
      ogTitle: 'Contacte | Fisioteràpia oncològica a domicili a Mallorca',
      ogDescription:
        'Explica’ns el teu cas sense compromís. Valoram si et podem ajudar amb fisioteràpia oncològica i exercici a domicili a Mallorca.',
      imageAlt: 'EIMA Fisioteràpia — Contacte'
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
      caseSuffix: 'si et podem ajudar.',
      socialHeading: 'També ens pots trobar aquí:'
    },
    form: {
      title: 'Contacta amb nosaltres',
      nameLabel: 'Nom',
      namePlaceholder: 'Nom',
      emailLabel: 'Correu electrònic',
      emailPlaceholder: 'Correu electrònic',
      messageLabel: 'Explica’ns el teu cas',
      messagePlaceholder:
        'Què és el que més et limita ara mateix?\nQuè t’agradaria tornar a fer?',
      submit: 'Enviar',
      privacyBefore: 'En enviar acceptes la nostra',
      privacyLink: 'política de privacitat',
      privacyAfter: '.',
      successTitle: 'Gràcies! Hem rebut el teu missatge.',
      successBody: 'Et respondrem tan aviat com puguem. Si ho prefereixes, també ens pots telefonar al',
      errors: {
        email: 'Correu electrònic requerit',
        name: 'Nom requerit',
        notConfigured: 'El formulari encara no està configurat.',
        internal: 'Error intern del servidor'
      }
    }
  },
  en: {
    meta: {
      title: 'Contact | Oncology physiotherapy at home in Mallorca',
      description:
        'Write to us or call us to tell us about your case. We will honestly tell you whether Empenta can help you during or after cancer.',
      ogTitle: 'Contact | Oncology physiotherapy at home in Mallorca',
      ogDescription:
        'Tell us about your case with no obligation. We will assess whether we can help you with oncology physiotherapy and home-based exercise in Mallorca.',
      imageAlt: 'EIMA Physiotherapy — Contact'
    },
    hero: {
      titleLineOne: 'Ready to',
      titleHighlight: 'take control',
      titleLineThree: 'of your health?',
      introPrefix: 'If you have any questions, write to us or call us',
      introStrong: 'completely free of charge.',
      introConnector: '',
      casePrefix: 'Tell us about your case and we will tell you with',
      caseStrong: 'complete honesty',
      caseSuffix: 'whether we can help you.',
      socialHeading: 'You can also find us here:'
    },
    form: {
      title: 'Contact us',
      nameLabel: 'Name',
      namePlaceholder: 'Name',
      emailLabel: 'Email address',
      emailPlaceholder: 'Email address',
      messageLabel: 'Tell us about your case',
      messagePlaceholder:
        'What is limiting you the most right now?\nWhat would you like to be able to do again?',
      submit: 'Send',
      privacyBefore: 'By submitting, you accept our',
      privacyLink: 'privacy policy',
      privacyAfter: '.',
      successTitle: 'Thank you! We have received your message.',
      successBody: 'We will reply as soon as possible. If you prefer, you can also call us at',
      errors: {
        email: 'Email required',
        name: 'Name required',
        notConfigured: 'The form is not configured yet.',
        internal: 'Internal server error'
      }
    }
  }
} as const;

export function getContactCopy(language: Language) {
  return contactCopy[language];
}
