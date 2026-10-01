const es = {
  locale: 'es-ES', home: 'Inicio', breadcrumbs: 'Migas de pan',
  title: 'Blog sobre ejercicio y cáncer | Eima Salut',
  description: 'Artículos sobre ejercicio durante y después del cáncer, fisioterapia oncológica, fatiga, dolor y hábitos para recuperar fuerza y salud.',
  socialDescription: 'Guías de Eima Salut sobre fisioterapia oncológica, ejercicio terapéutico, fatiga, dolor y salud para personas con cáncer en Mallorca.',
  imageAlt: 'Eima Salut — Blog sobre cáncer, ejercicio y salud',
  schemaDescription: 'Fisioterapia oncológica y ejercicio terapéutico para personas con cáncer: fuerza, fatiga, dolor, movilidad y salud durante y después del tratamiento.',
  heading: ['Artículos sobre', 'cáncer,', 'ejercicio y hábitos de salud.'],
  mobileHeading: ['Artículos sobre', 'cáncer, ejercicio y', 'hábitos de salud.'],
  intro: ['Información práctica y basada en evidencia sobre', 'fisioterapia oncológica, ejercicio terapéutico y hábitos de salud', 'durante y después del tratamiento del cáncer: fuerza, fatiga, dolor, movilidad, sueño y recuperación.'],
  empty: 'Próximamente publicaremos nuestros primeros artículos.', doubt: '¿Todavía tienes dudas sobre qué hacer?', cta: 'Cuéntanos tu caso',
  next: 'Esto también te interesa', read: 'Leer', written: 'Escrito por', updated: 'Actualizado:', reading: 'min de lectura',
  contactTitle: '¿Quieres que te acompañemos en tu proceso?', contactText: 'Reserva una primera toma de contacto gratuita y sin compromiso.', contact: 'Contactar',
  questions: '¿Tienes más preguntas?', questionsBefore: 'Sabemos que este tema genera muchas dudas: qué tipo de ejercicio es seguro, cuándo empezar, qué hacer si hay fatiga, dolor, metástasis, anemia o miedo a moverse. Puedes consultar nuestras', faq: 'Preguntas Frecuentes', questionsAfter: 'para resolver las dudas más comunes.',
  rssDescription: 'Artículos sobre ejercicio terapéutico, fisioterapia oncológica y dolor crónico.'
};
const ca = {
  locale: 'ca-ES', home: 'Inici', breadcrumbs: 'Fil d’Ariadna',
  title: 'Blog sobre exercici i càncer | Eima Salut',
  description: 'Articles sobre exercici durant i després del càncer, fisioteràpia oncològica, fatiga, dolor i hàbits per recuperar força i salut.',
  socialDescription: 'Guies d’Eima Salut sobre fisioteràpia oncològica, exercici terapèutic, fatiga, dolor i salut per a persones amb càncer a Mallorca.',
  imageAlt: 'Eima Salut — Blog sobre càncer, exercici i salut',
  schemaDescription: 'Fisioteràpia oncològica i exercici terapèutic per a persones amb càncer: força, fatiga, dolor, mobilitat i salut durant i després del tractament.',
  heading: ['Articles sobre', 'càncer,', 'exercici i hàbits de salut.'],
  mobileHeading: ['Articles sobre', 'càncer, exercici i', 'hàbits de salut.'],
  intro: ['Informació pràctica i basada en evidència sobre', 'fisioteràpia oncològica, exercici terapèutic i hàbits de salut', 'durant i després del tractament del càncer: força, fatiga, dolor, mobilitat, son i recuperació.'],
  empty: 'Aviat publicarem els nostres primers articles.', doubt: 'Encara tens dubtes sobre què fer?', cta: 'Conta’ns el teu cas',
  next: 'Això també t’interessa', read: 'Llegir', written: 'Escrit per', updated: 'Actualitzat:', reading: 'min de lectura',
  contactTitle: 'Vols que t’acompanyem en el teu procés?', contactText: 'Reserva una primera presa de contacte gratuïta i sense compromís.', contact: 'Contactar',
  questions: 'Tens més preguntes?', questionsBefore: 'Sabem que aquest tema genera molts dubtes: quin tipus d’exercici és segur, quan començar, què fer si hi ha fatiga, dolor, metàstasis, anèmia o por de moure’s. Pots consultar les nostres', faq: 'Preguntes freqüents', questionsAfter: 'per resoldre els dubtes més habituals.',
  rssDescription: 'Articles sobre exercici terapèutic, fisioteràpia oncològica i dolor crònic.'
};
const en = {
  locale: 'en-GB', home: 'Home', breadcrumbs: 'Breadcrumbs',
  title: 'Blog about exercise and cancer | Eima Salut',
  description: 'Articles about exercise during and after cancer, oncological physiotherapy, fatigue, pain and habits to regain strength and health.',
  socialDescription: 'Eima Salut guides on oncological physiotherapy, therapeutic exercise, fatigue, pain and health for people with cancer in Mallorca.',
  imageAlt: 'Eima Salut — Blog about cancer, exercise and health',
  schemaDescription: 'Oncological physiotherapy and therapeutic exercise for people with cancer: strength, fatigue, pain, mobility and health during and after treatment.',
  heading: ['Articles about', 'cancer,', 'exercise and healthy habits.'],
  mobileHeading: ['Articles about', 'cancer, exercise and', 'healthy habits.'],
  intro: ['Practical, evidence-based information on', 'oncological physiotherapy, therapeutic exercise and healthy habits', 'during and after cancer treatment: strength, fatigue, pain, mobility, sleep and recovery.'],
  empty: 'We will publish our first articles soon.', doubt: 'Still unsure what to do?', cta: 'Tell us about your situation',
  next: 'You may also be interested in', read: 'Read', written: 'Written by', updated: 'Updated:', reading: 'min read',
  contactTitle: 'Would you like us to support you through your journey?', contactText: 'Book an initial conversation, free of charge and with no obligation.', contact: 'Contact us',
  questions: 'Do you have more questions?', questionsBefore: 'We know this topic raises many questions: what type of exercise is safe, when to start, and what to do if you have fatigue, pain, metastases, anaemia or fear of moving. You can consult our', faq: 'Frequently Asked Questions', questionsAfter: 'to find answers to the most common questions.',
  rssDescription: 'Articles about therapeutic exercise, oncological physiotherapy and chronic pain.'
};
/** @param {import('./copy').Language} language */
export function getBlogCopy(language = 'es') { return { es, ca, en }[language]; }
