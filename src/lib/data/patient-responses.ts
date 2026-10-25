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
  /** Underline coordinates as percentages of the original screenshot. */
  underlines?: { x: number; y: number; width: number; height: number }[];
};

// Selected patient responses; each image appears in one narrative row only.
export const patientResponses: PatientResponse[] = [
  {
    "id": "difficult-day-2",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-2.jpg",
    "underlines": [
      {"x": 26.332, "y": 88.09, "width": 20.603, "height": 6.17},
      {"x": 60.101, "y": 88.09, "width": 29.548, "height": 6.17}
    ],
    "width": 995,
    "height": 807,
    "highlight": "Todo el día sin energía y con asco y vómitos.",
    "alt": "Respuesta real de paciente: Todo el día sin energía y con asco y vómitos."
  },
  {
    "id": "difficult-day-4",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-4.jpg",
    "underlines": [
      {"x": 30.409, "y": 75.33, "width": 37.787, "height": 6.44}
    ],
    "width": 1003,
    "height": 779,
    "highlight": "Sensación de malestar todo el día, estómago duro sin ganas de comer.",
    "alt": "Respuesta real de paciente: Sensación de malestar todo el día, estómago duro sin ganas de comer."
  },
  {
    "id": "difficult-day-1",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-1.jpg",
    "underlines": [
      {"x": 68.663, "y": 81.07, "width": 26.048, "height": 6.78},
      {"x": 3.693, "y": 89.02, "width": 51.896, "height": 6.78}
    ],
    "width": 1002,
    "height": 740,
    "highlight": "Hemos ido a caminar pero estaba muy cansada. He hecho lo que he podido.",
    "alt": "Respuesta real de paciente: Hemos ido a caminar pero estaba muy cansada. He hecho lo que he podido."
  },
  {
    "id": "difficult-day-5",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-5.jpg",
    "underlines": [
      {"x": 20.638, "y": 91.57, "width": 53.639, "height": 4.99}
    ],
    "width": 1003,
    "height": 1005,
    "highlight": "He estado en la cama con dolores abdominales. No tengo fuerzas para nada.",
    "alt": "Respuesta real de paciente: He estado en la cama con dolores abdominales. No tengo fuerzas para nada."
  },
  {
    "id": "difficult-day-6",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-bad-day.jpg",
    "underlines": [
      {"x": 60.657, "y": 21.6, "width": 33.086, "height": 10.4},
      {"x": 3.075, "y": 36.5, "width": 27.359, "height": 10.4}
    ],
    "width": 943,
    "height": 394,
    "highlight": "Hoy no ha sido un buen día. Me he levantado muy mareado, me ha costado trabajar y sigo aún así.",
    "alt": "Respuesta real de paciente: Hoy no ha sido un buen día. Me he levantado muy mareado, me ha costado trabajar y sigo aún así. He podido solo caminar 45’ a no muy alto ritmo. No se si ya puedes ver los datos de la Whoop. Si no, te los paso."
  },
  {
    "id": "difficult-day-7",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-mental-fog.jpg",
    "underlines": [
      {"x": 80.765, "y": 26.3, "width": 14.703, "height": 11.3},
      {"x": 4.23, "y": 43.2, "width": 24.068, "height": 11.3}
    ],
    "highlight": "Sigo con bastante “niebla” en la cabeza.",
    "alt": "Respuesta real de paciente: Caminata de la hora. Sigo con bastante “niebla” en la cabeza y quizás no voy suficientemente rápido, ya que estoy casi todo el rato en zona 0. Ojalá me vaya despejando.",
    "width": 993,
    "height": 346
  },
  {
    "id": "difficult-day-8",
    "category": "difficult-day",
    "image": "/patient-responses/difficult-day-8.png",
    "underlines": [
      {"x": 28.078, "y": 4.74, "width": 68.47, "height": 6.87}
    ],
    "width": 1072,
    "height": 780,
    "highlight": "Esta semana prácticamente no he podido entrenar.",
    "alt": "Respuesta real de paciente: Esta semana prácticamente no he podido entrenar."
  },
  {
    "id": "eima-adaptation-1",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-1.jpg",
    "underlines": [
      {"x": 43.845, "y": 49.32, "width": 49.034, "height": 10.14},
      {"x": 3.255, "y": 61.15, "width": 6.104, "height": 10.14}
    ],
    "width": 983,
    "height": 502,
    "highlight": "Me encanta que sea un plan adaptable al día a día.",
    "alt": "Respuesta real de paciente: Me encanta que sea un plan adaptable al día a día."
  },
  {
    "id": "eima-adaptation-9",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-9.png",
    "underlines": [
      {"x": 3.474, "y": 45.89, "width": 51.174, "height": 9.18}
    ],
    "width": 1065,
    "height": 580,
    "highlight": "Me he sentido acompañada con las llamadas telefónicas.",
    "alt": "Respuesta real de paciente: Me he sentido acompañada con las llamadas telefónicas."
  },
  {
    "id": "eima-adaptation-3",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-3.jpg",
    "underlines": [
      {"x": 67.416, "y": 67.52, "width": 12.666, "height": 10.58},
      {"x": 3.882, "y": 79.93, "width": 48.417, "height": 10.58}
    ],
    "width": 979,
    "height": 462,
    "highlight": "Creo que siempre que he tenido dudas, me las has resuelto al momento.",
    "alt": "Respuesta real de paciente: Creo que siempre que he tenido dudas, me las has resuelto al momento."
  },
  {
    "id": "eima-adaptation-2",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-2.jpg",
    "underlines": [
      {"x": 30.73, "y": 61.08, "width": 63.387, "height": 9.18},
      {"x": 4.057, "y": 71.84, "width": 41.684, "height": 9.18}
    ],
    "width": 986,
    "height": 537,
    "highlight": "Me gusta saber lo que tengo que hacer al día siguiente.",
    "alt": "Respuesta real de paciente: Me gusta saber lo que tengo que hacer al día siguiente."
  },
  {
    "id": "eima-adaptation-11",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-11.jpg",
    "underlines": [
      {"x": 70.336, "y": 66.16, "width": 26.096, "height": 9.15},
      {"x": 3.058, "y": 76.52, "width": 43.425, "height": 9.15},
      {"x": 3.058, "y": 87.2, "width": 36.188, "height": 8.84}
    ],
    "width": 981,
    "height": 554,
    "highlight": "Agradezco de corazón la dedicación, porque es por mi bien y veo los resultados.",
    "alt": "Respuesta real de paciente: He de decir, que al principio casi te pillo manía, porque eres muy pesado, todos los días y a primera hora ya escribiendo, pero agradezco de corazón la dedicación, porque es por mi bien y veo los resultados."
  },
  {
    "id": "eima-adaptation-7",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-7.jpg",
    "underlines": [
      {"x": 3.195, "y": 79.91, "width": 92.119, "height": 12.82}
    ],
    "width": 939,
    "height": 379,
    "highlight": "El video me gustó mucho y me ayudó a entender por donde estoy y lo que me queda.",
    "alt": "Respuesta real de paciente: El video me gustó mucho y me ayudó a entender por donde estoy y lo que me queda."
  },
  {
    "id": "eima-adaptation-4",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-4.png",
    "underlines": [
      {"x": 3.355, "y": 32.91, "width": 90.121, "height": 9.58},
      {"x": 3.262, "y": 43.45, "width": 16.403, "height": 9.58}
    ],
    "width": 1073,
    "height": 579,
    "highlight": "La atención recibida, el trato individual para cada paciente, muy bueno.",
    "alt": "Respuesta real de paciente: La atención recibida, el trato individual para cada paciente, muy bueno."
  },
  {
    "id": "eima-adaptation-6",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-6.jpg",
    "underlines": [
      {"x": 59.119, "y": 63.71, "width": 35.246, "height": 12.66},
      {"x": 4.098, "y": 78.48, "width": 42.828, "height": 12.66}
    ],
    "width": 976,
    "height": 399,
    "highlight": "Saber que a diario alguien se preocupa de mi salud.",
    "alt": "Respuesta real de paciente: Saber que a diario alguien se preocupa de mi salud."
  },
  {
    "id": "eima-adaptation-8",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-8.jpg",
    "underlines": [
      {"x": 3.608, "y": 55.11, "width": 54.536, "height": 11.31}
    ],
    "highlight": "Lo dejo en manos de Jaime.",
    "alt": "Respuesta real de paciente: Lo dejo en manos de Jaime.",
    "width": 970,
    "height": 459
  },
  {
    "id": "eima-adaptation-10",
    "category": "eima-adaptation",
    "image": "/patient-responses/eima-adaptation-10.jpg",
    "underlines": [
      {"x": 2.778, "y": 54.01, "width": 34.774, "height": 9.26}
    ],
    "width": 972,
    "height": 543,
    "highlight": "Tengo fe absoluta en que lo que hacemos es bueno para mi.",
    "alt": "Respuesta real de paciente: Tengo fe absoluta en que lo que hacemos es bueno para mi, así que estoy en tus manos para seguir al menos 3 meses más. Seguro que valdrá la pena."
  },
  {
    "id": "progress-12",
    "category": "progress",
    "image": "/patient-responses/progress-12.jpg",
    "underlines": [
      {"x": 3.306, "y": 37.92, "width": 35.331, "height": 5.37}
    ],
    "width": 968,
    "height": 933,
    "highlight": "He podido volver a seguir las rutinas establecidas y a sentirme «normal».",
    "alt": "Respuesta real de paciente: He podido volver a seguir las rutinas establecidas y a sentirme «normal»."
  },
  {
    "id": "progress-2",
    "category": "progress",
    "image": "/patient-responses/progress-2.jpg",
    "underlines": [
      {"x": 3.992, "y": 87.96, "width": 83.633, "height": 6.45}
    ],
    "width": 1002,
    "height": 803,
    "highlight": "Volver a hacer clase de estiramientos y ver que puedo volver a la rutina de antes del cáncer.",
    "alt": "Respuesta real de paciente: Volver a hacer clase de estiramientos y ver que puedo volver a la rutina de antes del cáncer."
  },
  {
    "id": "progress-3",
    "category": "progress",
    "image": "/patient-responses/progress-3.jpg",
    "underlines": [
      {"x": 3.553, "y": 83.1, "width": 66.802, "height": 6.11}
    ],
    "width": 985,
    "height": 834,
    "highlight": "He podido ir de viaje a buen ritmo y hacer todas las cosas que tenía planeadas.",
    "alt": "Respuesta real de paciente: He podido ir de viaje a buen ritmo y hacer todas las cosas que tenía planeadas."
  },
  {
    "id": "progress-9",
    "category": "progress",
    "image": "/patient-responses/progress-9.png",
    "underlines": [
      {"x": 18.934, "y": 47.75, "width": 51.195, "height": 13.51}
    ],
    "width": 1088,
    "height": 416,
    "highlight": "Lograr salir a caminar todos los días, a pesar del tratamiento y las inyecciones.",
    "alt": "Respuesta real de paciente: Lograr salir a caminar todos los días, a pesar del tratamiento y las inyecciones."
  },
  {
    "id": "progress-1",
    "category": "progress",
    "image": "/patient-responses/progress-1.jpg",
    "underlines": [
      {"x": 48.22, "y": 37.33, "width": 43.947, "height": 10.0},
      {"x": 3.052, "y": 48.67, "width": 13.327, "height": 10.0}
    ],
    "width": 983,
    "height": 508,
    "highlight": "No creía que ya podría levantar tanto peso tan pronto.",
    "alt": "Respuesta real de paciente: No creía que ya podría levantar tanto peso tan pronto."
  },
  {
    "id": "progress-11",
    "category": "progress",
    "image": "/patient-responses/progress-11.png",
    "underlines": [
      {"x": 4.24, "y": 49.1, "width": 55.76, "height": 13.51}
    ],
    "width": 1085,
    "height": 416,
    "highlight": "Me he sentido un poco más yo al poder ir sola a Inca y Palma.",
    "alt": "Respuesta real de paciente: Me he sentido un poco más yo al poder ir sola a Inca y Palma."
  },
  {
    "id": "progress-6",
    "category": "progress",
    "image": "/patient-responses/progress-6.jpg",
    "underlines": [
      {"x": 55.68, "y": 50.0, "width": 22.414, "height": 9.93},
      {"x": 54.158, "y": 72.52, "width": 39.249, "height": 9.93},
      {"x": 2.941, "y": 83.44, "width": 30.832, "height": 9.93}
    ],
    "width": 986,
    "height": 513,
    "highlight": "Me ha dado un punto más de confianza en que puedo con esto.",
    "alt": "Respuesta real de paciente: Me ha dado un punto más de confianza en que puedo con esto."
  },
  {
    "id": "progress-7",
    "category": "progress",
    "image": "/patient-responses/progress-7.jpg",
    "underlines": [
      {"x": 50.151, "y": 62.5, "width": 43.317, "height": 12.92}
    ],
    "width": 995,
    "height": 411,
    "highlight": "Empiezo a notarme con más fuerza en general, incluso antes de la operación.",
    "alt": "Respuesta real de paciente: Empiezo a notarme con más fuerza en general, incluso antes de la operación."
  },
  {
    "id": "progress-4",
    "category": "progress",
    "image": "/patient-responses/progress-4.png",
    "underlines": [
      {"x": 9.254, "y": 29.9, "width": 62.89, "height": 6.26}
    ],
    "width": 1059,
    "height": 904,
    "highlight": "Mi físico y mi aguante. Antes de empezar me fatigaba mucho más.",
    "alt": "Respuesta real de paciente: Mi físico y mi aguante. Antes de empezar me fatigaba mucho más."
  },
  {
    "id": "progress-5",
    "category": "progress",
    "image": "/patient-responses/progress-5.jpg",
    "underlines": [
      {"x": 3.049, "y": 64.17, "width": 87.602, "height": 12.92},
      {"x": 3.049, "y": 78.75, "width": 35.061, "height": 12.92}
    ],
    "width": 984,
    "height": 407,
    "highlight": "Después del ejercicio estoy mucho mejor que antes de empezar.",
    "alt": "Respuesta real de paciente: Después del ejercicio estoy mucho mejor que antes de empezar."
  },
  {
    "id": "progress-10",
    "category": "progress",
    "image": "/patient-responses/progress-10.png",
    "underlines": [
      {"x": 4.709, "y": 67.44, "width": 79.224, "height": 18.02}
    ],
    "width": 1083,
    "height": 322,
    "highlight": "Retomar un proyecto de reforma de un piso.",
    "alt": "Respuesta real de paciente: Retomar un proyecto de reforma de un piso."
  }
];

const patientCaptionTranslations: Record<string, { ca: string; en: string }> = {
  'difficult-day-2': {
    ca: 'Tot el dia sense energia, amb fàstic i vòmits.',
    en: 'No energy all day, feeling sick and vomiting.'
  },
  'difficult-day-4': {
    ca: 'Sensació de malestar tot el dia, panxa dura i sense ganes de menjar.',
    en: 'Feeling unwell all day, a hard stomach and no appetite.'
  },
  'difficult-day-1': {
    ca: 'Hem anat a caminar, però estava molt cansada. He fet el que he pogut.',
    en: 'We went for a walk, but I was very tired. I did what I could.'
  },
  'difficult-day-5': {
    ca: 'He estat al llit amb dolors abdominals. No tenc forces per a res.',
    en: 'I’ve been in bed with abdominal pain. I have no strength for anything.'
  },
  'difficult-day-6': {
    ca: 'Avui no ha estat un bon dia. M’he aixecat molt marejat, m’ha costat fer feina i encara seguesc igual.',
    en: 'Today has not been a good day. I woke up very dizzy, found it hard to work and still feel that way.'
  },
  'difficult-day-7': {
    ca: 'Seguesc amb bastanta “boira” al cap.',
    en: 'I still have quite a lot of “fog” in my head.'
  },
  'difficult-day-8': {
    ca: 'Aquesta setmana pràcticament no he pogut entrenar.',
    en: 'I’ve barely been able to train this week.'
  },
  'eima-adaptation-1': {
    ca: 'M’encanta que sigui un pla adaptable al dia a dia.',
    en: 'I love that the plan can adapt from day to day.'
  },
  'eima-adaptation-9': {
    ca: 'M’he sentit acompanyada amb les telefonades.',
    en: 'The phone calls have made me feel supported.'
  },
  'eima-adaptation-3': {
    ca: 'Crec que sempre que he tingut dubtes, me’ls has resolt al moment.',
    en: 'I think whenever I’ve had questions, you’ve answered them straight away.'
  },
  'eima-adaptation-2': {
    ca: 'M’agrada saber què he de fer l’endemà.',
    en: 'I like knowing what I need to do the next day.'
  },
  'eima-adaptation-11': {
    ca: 'Agraesc de tot cor la dedicació, perquè és pel meu bé i veig els resultats.',
    en: 'I sincerely appreciate the dedication, because it is for my own good and I can see the results.'
  },
  'eima-adaptation-7': {
    ca: 'El vídeo em va agradar molt i em va ajudar a entendre en quin punt estic i què em queda.',
    en: 'I really liked the video. It helped me understand where I am and what lies ahead.'
  },
  'eima-adaptation-4': {
    ca: 'L’atenció rebuda, el tracte individual per a cada pacient, molt bo.',
    en: 'The care received and the individual attention for each patient have been very good.'
  },
  'eima-adaptation-6': {
    ca: 'Saber que cada dia algú es preocupa per la meva salut.',
    en: 'Knowing that someone cares about my health every day.'
  },
  'eima-adaptation-8': {
    ca: 'Ho deix en mans de Jaime.',
    en: 'I leave it in Jaime’s hands.'
  },
  'progress-12': {
    ca: 'He pogut tornar a seguir les rutines establertes i a sentir-me «normal».',
    en: 'I’ve been able to get back to my usual routines and feel ‘normal’ again.'
  },
  'progress-2': {
    ca: 'Tornar a fer classe d’estiraments i veure que puc tornar a la rutina d’abans del càncer.',
    en: 'Going back to stretching classes and seeing that I can return to my routine from before cancer.'
  },
  'progress-3': {
    ca: 'He pogut anar de viatge a bon ritme i fer tot el que tenia planejat.',
    en: 'I’ve been able to travel at a good pace and do everything I had planned.'
  },
  'progress-9': {
    ca: 'Aconseguir sortir a caminar cada dia, malgrat el tractament i les injeccions.',
    en: 'Managing to go for a walk every day, despite the treatment and injections.'
  },
  'progress-1': {
    ca: 'No em pensava que ja podria aixecar tant de pes tan aviat.',
    en: 'I didn’t think I’d be able to lift so much weight so soon.'
  },
  'progress-11': {
    ca: 'M’he sentit una mica més jo mateixa en poder anar tota sola a Inca i Palma.',
    en: 'I’ve felt a little more like myself by being able to go to Inca and Palma on my own.'
  },
  'progress-6': {
    ca: 'M’ha donat una mica més de confiança que puc amb això.',
    en: 'It’s given me a little more confidence that I can handle this.'
  },
  'progress-7': {
    ca: 'Començ a notar-me amb més força en general, fins i tot abans de l’operació.',
    en: 'I’m starting to feel stronger overall, even before the operation.'
  },
  'progress-4': {
    ca: 'La meva forma física i la meva resistència. Abans de començar em fatigava molt més.',
    en: 'My fitness and stamina. Before starting, I used to get tired much more easily.'
  },
  'progress-5': {
    ca: 'Després de l’exercici estic molt millor que abans de començar.',
    en: 'After exercising, I feel much better than before I started.'
  },
  'eima-adaptation-10': {
    ca: 'Tenc plena confiança que el que feim és bo per a mi.',
    en: 'I have complete faith that what we are doing is good for me.'
  },
  'progress-10': {
    ca: 'Reprendre un projecte de reforma d’un pis.',
    en: 'Getting back to a flat renovation project.'
  }
};

export function getPatientResponses(language: Language): PatientResponse[] {
  if (language === 'es') return patientResponses;
  const altPrefix = language === 'ca' ? 'Resposta real de pacient' : 'Real patient response';
  return patientResponses.map(item => {
    const highlight = patientCaptionTranslations[item.id][language];
    return { ...item, highlight, alt: `${altPrefix}: ${highlight}` };
  });
}

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
      { category: 'difficult-day', title: 'No todos los días van a ser iguales.', subtitle: '<span class="subtitle-line">Durante el tratamiento habrá días en que puedas hacer más y otros en los que necesites descansar.</span><span class="subtitle-line">Lo importante es saber <strong>cómo adaptar el ejercicio</strong> a cada momento, <strong>sin exigirte de más.</strong></span>' },
      { category: 'eima-adaptation', title: 'Precisamente para esos días existe Empenta.', subtitle: 'Vemos cómo vas y ajustamos lo necesario <strong>para que no tengas que decidir <span style="color: #8cd0d6;">tú solo/a</span> qué hacer.</strong>' },
      { category: 'progress', title: 'Y poco a poco, volver a hacer cosas que antes parecían lejos.' }
    ]
  },
  ca: {
    label: 'Respostes dels nostres pacients', previous: 'Resposta anterior', next: 'Resposta següent', position: 'de', expand: 'Ampliar resposta', close: 'Tancar resposta',
    rows: [
      { category: 'difficult-day', title: 'No tots els dies seran iguals.', subtitle: '<span class="subtitle-line">Durant el tractament hi haurà dies en què podràs fer més i altres en què necessitaràs descansar.</span><span class="subtitle-line">L’important és saber <strong>com adaptar l’exercici</strong> a cada moment, <strong>sense exigir-te de més.</strong></span>' },
      { category: 'eima-adaptation', title: 'Precisament per a aquests dies existeix Empenta.', subtitle: 'Veim com vas i ajustam el que calgui <strong>perquè no hagis de decidir <span style="color: #8cd0d6;">tot sol/a</span> què fer.</strong>' },
      { category: 'progress', title: 'I a poc a poc, tornar a fer coses que creies que trigarien molt més.' }
    ]
  },
  en: {
    label: 'Responses from our patients', previous: 'Previous response', next: 'Next response', position: 'of', expand: 'Enlarge response', close: 'Close response',
    rows: [
      { category: 'difficult-day', title: 'Not every day will be the same.', subtitle: '<span class="subtitle-line">During treatment, some days you’ll be able to do more and others you’ll need to rest.</span><span class="subtitle-line">What matters is knowing <strong>how to adapt exercise</strong> at each stage, <strong>without pushing yourself too hard.</strong></span>' },
      { category: 'eima-adaptation', title: 'That is exactly why Empenta exists.', subtitle: 'We see how you’re doing and adjust what’s needed <strong>so you don’t have to decide what to do <span style="color: #8cd0d6;">on your own.</span></strong>' },
      { category: 'progress', title: 'And little by little, doing things again that you thought would take much longer.' }
    ]
  }
};
