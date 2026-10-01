import type { Language } from './copy';

export interface Testimonial {
  name: string;
  condition: string;
  conditionTitle?: string;
  conditionDetail?: string;
  conditionDetailLines?: string[];
  before: string;
  beforeLines?: string[];
  after: string;
  afterLines?: string[];
  modalTitle?: string;
  summary?: string;
  summaryLines?: string[];
  image?: string;
  videoUrl?: string;
}

const josueMedia = {
  name: 'Josué',
  image: '/testimonials/testimonial-josue.jpg',
  videoUrl: 'https://www.youtube.com/embed/85AuEva-CUc'
};
const timMedia = {
  name: 'Tim',
  image: '/testimonials/testimonial-tim.jpg',
  videoUrl: 'https://www.youtube.com/embed/4k4t-Er_SiU'
};

const copy = {
  es: {
    title: 'Testimonios | Eima Salut',
    description: "Historias reales de personas que han trabajado con Eima Salut y su experiencia con ejercicio adaptado, hábitos y seguimiento durante su proceso.",
    ogDescription: "Conoce experiencias reales de personas que han trabajado con Eima Salut y cómo han incorporado ejercicio adaptado, hábitos y seguimiento a su proceso.",
    heading: 'Historias', accent: 'reales', section: 'Testimonios',
    intro: [
      ['Cada persona llega en <strong>un punto diferente.</strong> Algunas están en tratamiento,', 'otras acaban de terminarlo y muchas no <strong>saben cómo volver</strong> a moverse sin miedo.'],
      ['En Eima Salut trabajamos con <strong>ejercicio</strong> adaptado, mejora de <strong>hábitos</strong> y <strong>seguimiento diario</strong>', 'para ajustar el plan según la fatiga, el tratamiento y la respuesta de <strong>cada persona.</strong>']
    ],
    before: 'Antes', after: 'Ahora', view: 'Ver testimonio de', upcoming: 'Próximo testimonio de',
    captionBefore: 'Conoce la historia de ', captionAfter: '', dialog: 'Testimonio de', close: 'Cerrar video',
    ctaHeading: 'Si <strong>quieres cambiar</strong> tu situación actual, pero <strong>no sabes cómo</strong> hacerlo.',
    cta: 'Háblanos de tu caso',
    testimonials: [] as Testimonial[]
  },
  ca: {
    title: 'Testimonis | Eima Salut',
    description: "Històries reals de persones que han treballat amb Eima Salut i la seva experiència amb exercici adaptat, hàbits i seguiment durant el seu procés.",
    ogDescription: "Coneix experiències reals de persones que han treballat amb Eima Salut i com han incorporat exercici adaptat, hàbits i seguiment al seu procés.",
    heading: 'Històries', accent: 'reals', section: 'Testimonis',
    intro: [
      ['Cada persona arriba en <strong>un moment diferent.</strong> Algunes estan en tractament,', 'd’altres l’han acabat fa poc i moltes no <strong>saben com tornar</strong> a moure’s sense por.'],
      ['A Eima Salut treballam amb <strong>exercici</strong> adaptat, millora d’<strong>hàbits</strong> i <strong>seguiment diari</strong>', 'per ajustar el pla segons la fatiga, el tractament i la resposta de <strong>cada persona.</strong>']
    ],
    before: 'Abans', after: 'Ara', view: 'Veure el testimoni de', upcoming: 'Pròxim testimoni de',
    captionBefore: 'Coneix la història de ', captionAfter: '', dialog: 'Testimoni de', close: 'Tancar el vídeo',
    ctaHeading: 'Si <strong>vols canviar</strong> la teva situació actual, però <strong>no saps com</strong> fer-ho.',
    cta: 'Conta’ns el teu cas',
    testimonials: [
      {
        ...josueMedia,
        condition: 'Glioblastoma en estadi IV. Ha passat per cirurgia, radioteràpia, quimioteràpia i mesos d’aturada abans de tornar a moure’s.',
        conditionTitle: 'Glioblastoma en estadi IV',
        conditionDetail: 'Ha passat per cirurgia, radioteràpia, quimioteràpia i mesos d’aturada abans de tornar a moure’s.',
        before: 'De sentir-se debilitat després dels tractaments mèdics i veure molt lluny la possibilitat de recuperar la seva rutina esportiva.',
        after: 'A guanyar energia, ànim i constància amb exercici adaptat a la seva situació i seguiment diari.',
        modalTitle: 'Josué · Glioblastoma en estadi IV',
        summary: 'De sentir-se debilitat després dels tractaments mèdics a guanyar energia, ànim i constància amb exercici adaptat.'
      },
      {
        ...timMedia,
        condition: 'Càncer de pròstata. Operat de pròtesi de maluc dret el 2025 i de pròtesi de maluc esquerre el 2026.',
        conditionTitle: 'Càncer de pròstata',
        conditionDetail: 'Operat de pròtesi de maluc dret el 2025 i de pròtesi de maluc esquerre el 2026.',
        before: 'De caminar amb caminador, amb poca estabilitat, i sentir-se molt fatigat al cap de pocs metres.',
        after: 'A poder caminar sense ajudes per dins ca seva i sentir-se cada vegada més fort.',
        modalTitle: 'Tim · Càncer de pròstata',
        summary: 'De caminar amb caminador, poca estabilitat i molta fatiga a moure’s per dins ca seva sense ajudes i amb més força.'
      }
    ] as Testimonial[]
  },
  en: {
    title: 'Testimonials | Eima Salut',
    description: "Real stories from people who have worked with Eima Salut and their experience with adapted exercise, healthy habits and ongoing support.",
    ogDescription: "Discover real experiences from people who have worked with Eima Salut and how adapted exercise, healthy habits and ongoing support became part of their process.",
    heading: 'Real', accent: 'stories', section: 'Testimonials',
    intro: [
      ['Everyone comes to us at <strong>a different stage.</strong> Some are undergoing treatment,', 'others have just finished, and many do not <strong>know how to get back</strong> to moving without fear.'],
      ['At Eima Salut, we work with adapted <strong>exercise</strong>, improved <strong>habits</strong> and <strong>daily support</strong>', 'to adjust the plan according to fatigue, treatment and <strong>each person’s</strong> response.']
    ],
    before: 'Before', after: 'Now', view: 'Watch the testimonial from', upcoming: 'Upcoming testimonial from',
    captionBefore: 'Discover ', captionAfter: '’s story', dialog: 'Testimonial from', close: 'Close video',
    ctaHeading: 'If you <strong>want to change</strong> your current situation but <strong>do not know how</strong> to do it.',
    cta: 'Tell us about your situation',
    testimonials: [
      {
        ...josueMedia,
        condition: 'Stage IV glioblastoma. He has undergone surgery, radiotherapy, chemotherapy and months of inactivity before getting moving again.',
        conditionTitle: 'Stage IV glioblastoma',
        conditionDetail: 'He has undergone surgery, radiotherapy, chemotherapy and months of inactivity before getting moving again.',
        before: 'From feeling weakened after medical treatment and seeing a return to his sporting routine as a distant possibility.',
        after: 'To gaining energy, motivation and consistency through exercise adapted to his situation and daily support.',
        modalTitle: 'Josué · Stage IV glioblastoma',
        summary: 'From feeling weakened after medical treatment to gaining energy, motivation and consistency through adapted exercise.'
      },
      {
        ...timMedia,
        condition: 'Prostate cancer. He had a right hip replacement in 2025 and a left hip replacement in 2026.',
        conditionTitle: 'Prostate cancer',
        conditionDetail: 'He had a right hip replacement in 2025 and a left hip replacement in 2026.',
        before: 'From walking with a walking frame, feeling unsteady and becoming very fatigued after just a few metres.',
        after: 'To being able to walk around his home without walking aids and feeling stronger and stronger.',
        modalTitle: 'Tim · Prostate cancer',
        summary: 'From using a walking frame, feeling unsteady and very fatigued to moving around his home without walking aids and with greater strength.'
      }
    ] as Testimonial[]
  }
};

export function getTestimonialsCopy(language: Language) {
  return copy[language];
}
