import type { Language } from '$lib/i18n/copy';

export type PatientCategory = 'difficult-day' | 'eima-adaptation' | 'progress';

export type PatientResponse = {
  id: string;
  category: PatientCategory;
  /** Only anonymised screenshots approved for the website belong here. */
  image: string;
  width: number;
  height: number;
  highlight: string;
  alt: string;
};

// Selected patient responses; each image appears in one narrative row only.
export const patientResponses: PatientResponse[] = [
  {
    "id": "difficult-day-2",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-2.jpg",
    "width": 995,
    "height": 807,
    "highlight": "Todo el día sin energía y con asco y vómitos.",
    "alt": "Respuesta real de paciente: Todo el día sin energía y con asco y vómitos."
  },
  {
    "id": "difficult-day-3",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-3.jpg",
    "width": 1001,
    "height": 993,
    "highlight": "No he podido hacer ejercicio esta semana. Esta semana he estado muy negativa",
    "alt": "Respuesta real de paciente: No he podido hacer ejercicio esta semana. Esta semana he estado muy negativa"
  },
  {
    "id": "difficult-day-4",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-4.jpg",
    "width": 1003,
    "height": 779,
    "highlight": "Sensación de malestar todo el día, estómago duro sin ganas de comer.",
    "alt": "Respuesta real de paciente: Sensación de malestar todo el día, estómago duro sin ganas de comer."
  },
  {
    "id": "difficult-day-1",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-1.jpg",
    "width": 1002,
    "height": 740,
    "highlight": "Hemos ido a caminar pero estaba muy cansada. He hecho lo que he podido.",
    "alt": "Respuesta real de paciente: Hemos ido a caminar pero estaba muy cansada. He hecho lo que he podido."
  },
  {
    "id": "difficult-day-5",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-5.jpg",
    "width": 1003,
    "height": 1005,
    "highlight": "He estado en la cama con dolores abdominales. No tengo fuerzas para nada.",
    "alt": "Respuesta real de paciente: He estado en la cama con dolores abdominales. No tengo fuerzas para nada."
  },
  {
    "id": "difficult-day-6",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-6.jpg",
    "width": 981,
    "height": 760,
    "highlight": "Hoy ya no he tomado las pastillas para los vómitos, pero sigo teniendo muchas náuseas.",
    "alt": "Respuesta real de paciente: Hoy ya no he tomado las pastillas para los vómitos, pero sigo teniendo muchas náuseas."
  },
  {
    "id": "difficult-day-7",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-7.jpg",
    "highlight": "Estoy muy cansada. Muchos dolores musculares.",
    "alt": "Respuesta real de paciente: Estoy muy cansada. Muchos dolores musculares.",
    "width": 1007,
    "height": 919
  },
  {
    "id": "difficult-day-8",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-8.png",
    "width": 1072,
    "height": 780,
    "highlight": "Esta semana prácticamente no he podido entrenar.",
    "alt": "Respuesta real de paciente: Esta semana prácticamente no he podido entrenar."
  },
  {
    "id": "eima-adaptation-1",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-1.jpg",
    "width": 983,
    "height": 502,
    "highlight": "Me encanta que sea un plan adaptable al día a día.",
    "alt": "Respuesta real de paciente: Me encanta que sea un plan adaptable al día a día."
  },
  {
    "id": "eima-adaptation-9",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-9.png",
    "width": 1065,
    "height": 580,
    "highlight": "Me he sentido acompañada con las llamadas telefónicas.",
    "alt": "Respuesta real de paciente: Me he sentido acompañada con las llamadas telefónicas."
  },
  {
    "id": "eima-adaptation-3",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-3.jpg",
    "width": 979,
    "height": 462,
    "highlight": "Creo que siempre que he tenido dudas, me las has resuelto al momento.",
    "alt": "Respuesta real de paciente: Creo que siempre que he tenido dudas, me las has resuelto al momento."
  },
  {
    "id": "eima-adaptation-2",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-2.jpg",
    "width": 986,
    "height": 537,
    "highlight": "Me gusta saber lo que tengo que hacer al día siguiente.",
    "alt": "Respuesta real de paciente: Me gusta saber lo que tengo que hacer al día siguiente."
  },
  {
    "id": "eima-adaptation-7",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-7.jpg",
    "width": 939,
    "height": 379,
    "highlight": "El video me gustó mucho y me ayudó a entender por donde estoy y lo que me queda.",
    "alt": "Respuesta real de paciente: El video me gustó mucho y me ayudó a entender por donde estoy y lo que me queda."
  },
  {
    "id": "eima-adaptation-4",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-4.png",
    "width": 1073,
    "height": 579,
    "highlight": "La atención recibida, el trato individual para cada paciente, muy bueno.",
    "alt": "Respuesta real de paciente: La atención recibida, el trato individual para cada paciente, muy bueno."
  },
  {
    "id": "eima-adaptation-6",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-6.jpg",
    "width": 976,
    "height": 399,
    "highlight": "Saber que a diario alguien se preocupa de mi salud.",
    "alt": "Respuesta real de paciente: Saber que a diario alguien se preocupa de mi salud."
  },
  {
    "id": "eima-adaptation-8",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-8.jpg",
    "highlight": "Lo dejo en manos de Jaime.",
    "alt": "Respuesta real de paciente: Lo dejo en manos de Jaime.",
    "width": 970,
    "height": 459
  },
  {
    "id": "progress-12",
    "category": "progress",
    "image": "/patient-responses/progress-12.jpg",
    "width": 968,
    "height": 933,
    "highlight": "He podido volver a seguir las rutinas establecidas y a sentirme «normal».",
    "alt": "Respuesta real de paciente: He podido volver a seguir las rutinas establecidas y a sentirme «normal»."
  },
  {
    "id": "progress-2",
    "category": "progress",
    "image": "/patient-responses/progress-2.jpg",
    "width": 1002,
    "height": 803,
    "highlight": "Volver a hacer clase de estiramientos y ver que puedo volver a la rutina de antes del cáncer.",
    "alt": "Respuesta real de paciente: Volver a hacer clase de estiramientos y ver que puedo volver a la rutina de antes del cáncer."
  },
  {
    "id": "progress-3",
    "category": "progress",
    "image": "/patient-responses/progress-3.jpg",
    "width": 985,
    "height": 834,
    "highlight": "He podido ir de viaje a buen ritmo y hacer todas las cosas que tenía planeadas.",
    "alt": "Respuesta real de paciente: He podido ir de viaje a buen ritmo y hacer todas las cosas que tenía planeadas."
  },
  {
    "id": "progress-9",
    "category": "progress",
    "image": "/patient-responses/progress-9.png",
    "width": 1088,
    "height": 416,
    "highlight": "Lograr salir a caminar todos los días, a pesar del tratamiento y las inyecciones.",
    "alt": "Respuesta real de paciente: Lograr salir a caminar todos los días, a pesar del tratamiento y las inyecciones."
  },
  {
    "id": "progress-1",
    "category": "progress",
    "image": "/patient-responses/progress-1.jpg",
    "width": 983,
    "height": 508,
    "highlight": "No creía que ya podría levantar tanto peso tan pronto.",
    "alt": "Respuesta real de paciente: No creía que ya podría levantar tanto peso tan pronto."
  },
  {
    "id": "progress-11",
    "category": "progress",
    "image": "/patient-responses/progress-11.png",
    "width": 1085,
    "height": 416,
    "highlight": "Me he sentido un poco más yo al poder ir sola a Inca y Palma.",
    "alt": "Respuesta real de paciente: Me he sentido un poco más yo al poder ir sola a Inca y Palma."
  },
  {
    "id": "progress-6",
    "category": "progress",
    "image": "/patient-responses/progress-6.jpg",
    "width": 986,
    "height": 513,
    "highlight": "Me ha dado un punto más de confianza en que puedo con esto.",
    "alt": "Respuesta real de paciente: Me ha dado un punto más de confianza en que puedo con esto."
  },
  {
    "id": "progress-7",
    "category": "progress",
    "image": "/patient-responses/progress-7.jpg",
    "width": 995,
    "height": 411,
    "highlight": "Empiezo a notarme con más fuerza en general, incluso antes de la operación.",
    "alt": "Respuesta real de paciente: Empiezo a notarme con más fuerza en general, incluso antes de la operación."
  },
  {
    "id": "progress-4",
    "category": "progress",
    "image": "/patient-responses/progress-4.png",
    "width": 1059,
    "height": 904,
    "highlight": "Mi físico y mi aguante. Antes de empezar me fatigaba mucho más.",
    "alt": "Respuesta real de paciente: Mi físico y mi aguante. Antes de empezar me fatigaba mucho más."
  },
  {
    "id": "progress-5",
    "category": "progress",
    "image": "/patient-responses/progress-5.jpg",
    "width": 984,
    "height": 407,
    "highlight": "Después del ejercicio estoy mucho mejor que antes de empezar.",
    "alt": "Respuesta real de paciente: Después del ejercicio estoy mucho mejor que antes de empezar."
  },
  {
    "id": "progress-10",
    "category": "progress",
    "image": "/patient-responses/progress-10.png",
    "width": 1083,
    "height": 322,
    "highlight": "Retomar un proyecto de reforma de un piso.",
    "alt": "Respuesta real de paciente: Retomar un proyecto de reforma de un piso."
  }
];

export const patientProofCopy: Record<Language, {
  label: string;
  previous: string;
  next: string;
  position: string;
  expand: string;
  close: string;
  rows: { category: PatientCategory; title: string; subtitle?: string }[];
}> = {
  es: {
    label: 'Respuestas de nuestros pacientes', previous: 'Respuesta anterior', next: 'Respuesta siguiente', position: 'de', expand: 'Ampliar respuesta', close: 'Cerrar respuesta',
    rows: [
      { category: 'difficult-day', title: 'No todos los días van a ser iguales.', subtitle: 'Durante el tratamiento habrá días en que puedas hacer más y otros en que toque bajar el ritmo. Y ahí, saber qué hacer evita que una mala semana te haga parar más de la cuenta.' },
      { category: 'eima-adaptation', title: 'Precisamente para esos días existe Empenta.', subtitle: 'Vemos cómo vas y ajustamos lo necesario para que no tengas que decidir tú solo qué hacer.' },
      { category: 'progress', title: 'Y poco a poco, volver a hacer cosas que antes parecían lejos.' }
    ]
  },
  ca: {
    label: 'Respostes dels nostres pacients', previous: 'Resposta anterior', next: 'Resposta següent', position: 'de', expand: 'Ampliar resposta', close: 'Tancar resposta',
    rows: [
      { category: 'difficult-day', title: 'No tots els dies seran iguals.', subtitle: 'Durant el tractament hi haurà dies en què podràs fer més i altres en què tocarà baixar el ritme. Tenir clar què fer llavors evita que una mala setmana et tregui del camí.' },
      { category: 'eima-adaptation', title: 'Precisament per a aquests dies existeix Empenta.', subtitle: 'Ens expliques com estàs i ajustam el que calgui perquè no hagis de decidir tot sol què fer.' },
      { category: 'progress', title: 'I a poc a poc, tornar a fer coses que creies que trigarien molt més.' }
    ]
  },
  en: {
    label: 'Responses from our patients', previous: 'Previous response', next: 'Next response', position: 'of', expand: 'Enlarge response', close: 'Close response',
    rows: [
      { category: 'difficult-day', title: 'Not every day will be the same.', subtitle: 'During treatment, some days you will be able to do more, and on others you will need to slow down. Knowing what to do then helps keep a difficult week from taking you off track.' },
      { category: 'eima-adaptation', title: 'That is exactly why Empenta exists.', subtitle: 'You tell us how you are feeling, and we make the adjustments you need so you do not have to decide what to do on your own.' },
      { category: 'progress', title: 'And little by little, doing things again that you thought would take much longer.' }
    ]
  }
};
