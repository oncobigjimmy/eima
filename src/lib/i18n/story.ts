import { storyProfiles as esProfiles } from '$lib/data/stories';
import type { Language } from './copy';

const esMarks = {
  miquel: [
    { text: 'quería dedicarme a ayudar a las personas.', mark: 'bold' },
    { text: 'sensación constante de inconformidad.', mark: 'bold' },
    {
      text: '¿Por qué hacemos esto así? ¿De verdad me enseñan técnicas que no están demostradas científicamente? ¿Estoy tratando el dolor sin entender por qué le duele a mi paciente?',
      mark: 'italic'
    },
    {
      text: '¿Cómo va a mejorar alguien que no puede caminar por el dolor si lo único que hacemos es un masaje en la espalda?',
      mark: 'bold'
    },
    { text: 'Esa frustración', mark: 'bold' },
    { text: 'Necesitaba entender cómo funciona el dolor', mark: 'bold' },
    { text: 'grandes profesionales', mark: 'bold' },
    { text: 'Pablo Mendo, Rafael Torres o Louis Gifford', mark: 'bold' },
    { text: 'trasladar todo este conocimiento a cada persona con la que trabajo', mark: 'bold' },
    { text: 'nace EIMA.', mark: 'bold' }
  ],
  jaume: [
    { text: '“la mitad de vosotros tendrá cáncer de mayor”', mark: 'bold' },
    { text: 'espina clavada.', mark: 'bold' },
    { text: 'sufrí episodios de dolor lumbar', mark: 'bold' },
    { text: 'entender el cuerpo, el dolor y el movimiento.', mark: 'bold' },
    { text: 'la independencia', mark: 'bold' },
    { text: 'dependencia que crea la camilla.', mark: 'bold' },
    { text: 'lo que tú mismo haces por TU cuerpo.', mark: 'bold' },
    { text: 'la calidad de vida no era la misma.', mark: 'bold' },
    { text: 'Thomas Seyfried', mark: 'bold' },
    { text: 'el papel del metabolismo', mark: 'bold' },
    { text: 'filtrar el ruido.', mark: 'bold' },
    { text: 'Mi misión', mark: 'bold' }
  ]
};

const caProfiles = [
  {
    id: 'jaume',
    name: 'Jaume Sansó',
    specialty: 'Fisioterapeuta especialitzat en exercici i càncer',
    storySections: [
      {
        eyebrow: 'Qui soc',
        title: 'Com va començar tot?',
        paragraphs: [
          'Hola! T’explic com va començar aquest viatge.',
          'De petit m’obsessionava tot el que estava relacionat amb les cèl·lules. Però el moment que em va marcar va ser a l’institut, quan la meva professora de biologia va deixar anar una frase que se’m va quedar gravada a foc: “la meitat de vosaltres tendrà càncer de gran”. Anys després, aquella frase va deixar de ser teoria: vaig començar a veure amics amb una mare o un pare supervivent de càncer… i allà se’m va quedar una espina clavada.',
          'Vaig estudiar Fisioteràpia per un altre motiu: abans d’entrar a la carrera vaig patir episodis de dolor lumbar que em varen impedir jugar a bàsquet. A la universitat vaig provar en mi mateix moltes teràpies —gairebé totes passives— i vaig aprendre una cosa incòmoda: alleugen, però només de manera momentània. El que realment em va treure del forat va ser entendre el cos, el dolor i el moviment. Tornar a entrenar, a poc a poc, em va retornar una cosa més important que l’absència de dolor: la independència.'
        ]
      },
      {
        title: 'La meva frustració',
        paragraphs: [
          'I quan vaig començar a treballar a l’hospital vaig veure un problema enorme: la dependència que crea la llitera. Allà vaig entendre una cosa que ho va canviar tot: gran part del canvi no està en el que et fan, sinó en el que tu mateix fas pel TEU cos. Volia traslladar als meus pacients aquella sensació de llibertat i empoderament que jo mateix havia sentit en recuperar-me amb exercici, rompent el paradigma de dependre de les mans del fisio per millorar.',
          'Amb els anys, el càncer es va tornar a creuar en el meu camí: pacients que havien passat per un procés oncològic i arrossegaven seqüeles. I allà vaig veure una diferència molt clara entre qui feia exercici i qui no: la qualitat de vida no era la mateixa.'
        ]
      },
      {
        title: 'El perquè del que faig',
        paragraphs: [
          'El clic definitiu va arribar quan vaig escoltar una entrevista a l’investigador Thomas Seyfried: allà vaig veure amb claredat el paper del metabolisme en la salut. Des de llavors aprenc dia a dia dels millors professionals que treballen amb aquest enfocament, per nodrir-me dels seus coneixements i aplicar-los als meus pacients.',
          'EIMA neix amb un objectiu clar: filtrar el renou. Condensam la informació dels majors experts i la transformam en accions clares perquè tenguis el teu full de ruta ben definit, sense perdre mesos entre dubtes i consells contradictoris.',
          'La meva missió és que tota persona que passi per EIMA sigui conscient de tot el que el seu cos pot fer per millorar la seva salut.'
        ]
      }
    ],
    cta: 'Ara que coneixes la meva història, ens expliques la teva?',
    educationTitle: 'La meva formació',
    education: [
      {
        year: '2020',
        items: ['Grau en Fisioteràpia — col·legiat 1738 — Universitat de les Illes Balears']
      },
      {
        year: '2021',
        items: [
          'Curs de Raonament Clínic i Diagnòstic Clínic — Arturo Such — Qeres Formación',
          'Curs de Mètode Científic i Investigació Sanitària — Fran Gurdiel i Laura Flix — Qeres Formación'
        ]
      },
      {
        year: '2022',
        items: [
          'Curs d’Exercici Terapèutic — Fran Gurdiel — Qeres Formación',
          'Curs d’Abordatge de Neuropaties en MMSS i MMII — Arturo Such — Qeres Formación'
        ]
      },
      {
        year: '2023',
        items: [
          'Curs d’Abordatge i Tractament de Tendinopaties en MMSS i MMII — Álvaro Altube — Qeres Formación',
          'Curs de Reconeixement de Patrons — Arturo Such — Qeres Formación',
          'Curs d’Exercici, Obesitat i Càncer — 2a edició — Mario Redondo i Javi Butragueño — Obesity Management School'
        ]
      },
      {
        year: '2024',
        items: [
          'Curs d’Abordatge de la Persona amb Dolor de Llarga Evolució — Mar Flores — acreditat per l’Hospital Sant Joan de Déu',
          'Curs de Dolor i Moviment. Neurobiologia del Dolor — Arturo Goicoechea — acreditat per l’Hospital Sant Joan de Déu',
          'Curs de Fisioteràpia en el Pacient Oncològic — Luis Montoya — Qeres Formación'
        ]
      },
      {
        year: '2025',
        items: [
          'Curs de Dolor d’Espatlla. Raonament Clínic i Abordatge Terapèutic — Tito Pampín — acreditat per l’Hospital Sant Joan de Déu',
          'Curs d’Oncologia Metabòlica — Alfonso Fernández'
        ]
      }
    ],
    readingsTitle: 'Les meves lectures',
    readings: [
      'Explain Pain — Lorimer Moseley (acabat)',
      'Aches & Pains — Luis Gifford (acabat)',
      'Medio ambiente y salud — Carme Valls-Llobet (acabat)',
      'El ejercicio: Un muro contra el cáncer — Adrián Castillo, Javier Morales i Pedro Valenzuela (acabat)',
      'La Enciclopedia del Cáncer: Metabolismo, Sistema Inmune y Microbiota — Alfonso Fernández (Cáncer Integral) (en curs)',
      'Libérate de tóxicos: Guía para evitar los disruptores endocrinos — Nicolás Olea (en curs)'
    ]
  },
  {
    id: 'miquel',
    name: 'Miquel Galmés',
    specialty: 'Fisioterapeuta especialitzat en exercici i dolor oncològic',
    storySections: [
      {
        eyebrow: 'Qui soc',
        title: 'Els meus inicis',
        paragraphs: [
          'Hola, som en Miquel. I m’agradaria explicar-te com he arribat fins aquí.',
          'Des d’adolescent vaig tenir clar que volia dedicar-me a ajudar les persones. La meva vida sempre ha girat al voltant del moviment i l’esport, així que la fisioteràpia em va semblar la millor manera de millorar la vida de les persones que es veuen limitades pel dolor.',
          'Per això vaig estudiar Fisioteràpia i vaig començar a interessar-me profundament per tot allò que pogués millorar la qualitat de vida dels meus pacients.'
        ]
      },
      {
        title: 'Quan alguna cosa no encaixava',
        paragraphs: [
          'En acabar la carrera, cap al 2017, la meva vida professional va estar marcada per una sensació constant d’inconformisme. No deixava de fer-me preguntes:',
          'Per què feim això així? De veritat m’ensenyen tècniques que no estan demostrades científicament? Estic tractant el dolor sense entendre per què li fa mal al meu pacient?',
          'A més, passava moltes hores tractant de manera passiva a la llitera persones que m’explicaven tot el que havien deixat de fer per culpa del seu dolor: el seu esport preferit, caminar amb la seva parella, treballar, passejar amb els seus nets…',
          'I jo pensava: com ha de millorar algú que no pot caminar pel dolor si l’únic que feim és un massatge a l’esquena?',
          'Alguna cosa no quadrava.'
        ]
      },
      {
        title: 'A la recerca de respostes',
        paragraphs: [
          'Aquesta frustració va ser el motor que em va dur a cercar respostes.',
          'Em vaig formar tot el que vaig poder, encara que al principi em vaig trobar amb molts cursos centrats únicament a aprendre més tècniques manuals, sense un objectiu clar de retornar la persona a allò que no podia fer.',
          'A més, moltes d’aquestes formacions no oferien explicacions científiques que donassin suport al que es proposava.',
          'Les meves expectatives eren unes altres. Necessitava entendre com funciona el dolor i quins factors influeixen perquè es mantengui en el temps.',
          'En aquest camí vaig tenir la sort d’aprendre de grans professionals i formadors que varen marcar la meva manera d’entendre la fisioteràpia i el dolor, com Pablo Mendo, Rafael Torres o Louis Gifford, entre d’altres.'
        ]
      },
      {
        title: 'Com treball avui dia',
        paragraphs: [
          'Avui enfoc la meva feina a traslladar tot aquest coneixement a cada persona amb qui treball, elaborant programes totalment personalitzats i acompanyant-la en el seu procés per recuperar benestar, moviment i confiança en el seu cos.',
          'I d’aquí neix EIMA.',
          'De la unió de dos professionals cansats de treballar amb limitacions, amb l’objectiu de millorar la vida dels nostres pacients amb compromís real, implicació total i acompanyant-te passa a passa cap al teu millor estat de salut.'
        ]
      }
    ],
    cta: 'Ara que coneixes la meva història, ens expliques la teva?',
    educationTitle: 'La meva formació',
    education: [
      {
        year: '2017',
        items: ['Grau en Fisioteràpia — col·legiat 1463 — Universitat de les Illes Balears']
      },
      {
        year: '2018',
        items: [
          'Curs de Punció Seca en la Síndrome de Dolor Miofascial',
          'Curs d’Actualització en la Llei de Protecció de Dades',
          'Curs sobre Noves Tecnologies Aplicades a la Rehabilitació'
        ]
      },
      {
        year: '2019',
        items: ['Màster de Tècniques Osteopàtiques de l’Aparell Locomotor — Escola d’Osteopatia de Madrid']
      },
      {
        year: '2021',
        items: ['Curs de Raonament i Diagnòstic Clínic — Arturo Such']
      },
      {
        year: '2022',
        items: [
          'Curs d’Abordatge Pràctic del Pacient amb Dolor Crònic — Nivell Bàsic — Rafael Torres',
          'Curs d’Exercici Terapèutic en Persones Majors'
        ]
      },
      {
        year: '2023',
        items: [
          'Curs d’Abordatge Pràctic del Pacient amb Dolor Crònic — Nivell Avançat — Rafael Torres',
          'Curs d’Abordatge de la Persona amb Dolor de Llarga Evolució — Mar Flores',
          'Curs d’Abordatge de les Tendinopaties Basat en l’Evidència — Álvaro Altube'
        ]
      },
      {
        year: '2024',
        items: ['Curs de Dolor i Moviment. Neurobiologia del Dolor — Arturo Goicoechea']
      },
      {
        year: '2025',
        items: ['Curs de Dolor d’Espatlla. Raonament Clínic i Abordatge Terapèutic — Tito Pampín']
      }
    ],
    readingsTitle: 'Les meves lectures',
    readings: [
      'Explain Pain — Lorimer Moseley (acabat)',
      'Essential Guide Cervical Spine — Rafael Torres (acabat)',
      'Understanding sciatica — Tom Jesson (acabat)',
      'The Biomechanics of Low Back Pain — Bogduk i col·laboradors (acabat)',
      'Aches & Pains — Louis Gifford (en curs)',
      'Neurociencia del cuerpo — Nazareth Castellanos (acabat)',
      'Antifràgil — Nassim Taleb (acabat)',
      'Hábitos atómicos — James Clear (en curs)',
      'El ejercicio: Un muro contra el cáncer — Adrián Castillo, Javier Morales i Pedro Valenzuela (acabat)',
      'El ayuno contra el cáncer — Valter Longo (en curs)'
    ]
  }
];

const caMarks = {
  miquel: [
    { text: 'volia dedicar-me a ajudar les persones.', mark: 'bold' },
    { text: 'sensació constant d’inconformisme.', mark: 'bold' },
    {
      text: 'Per què feim això així? De veritat m’ensenyen tècniques que no estan demostrades científicament? Estic tractant el dolor sense entendre per què li fa mal al meu pacient?',
      mark: 'italic'
    },
    {
      text: 'com ha de millorar algú que no pot caminar pel dolor si l’únic que feim és un massatge a l’esquena?',
      mark: 'bold'
    },
    { text: 'Aquesta frustració', mark: 'bold' },
    { text: 'Necessitava entendre com funciona el dolor', mark: 'bold' },
    { text: 'grans professionals', mark: 'bold' },
    { text: 'Pablo Mendo, Rafael Torres o Louis Gifford', mark: 'bold' },
    { text: 'traslladar tot aquest coneixement a cada persona amb qui treball', mark: 'bold' },
    { text: 'neix EIMA.', mark: 'bold' }
  ],
  jaume: [
    { text: '“la meitat de vosaltres tendrà càncer de gran”', mark: 'bold' },
    { text: 'espina clavada.', mark: 'bold' },
    { text: 'vaig patir episodis de dolor lumbar', mark: 'bold' },
    { text: 'entendre el cos, el dolor i el moviment.', mark: 'bold' },
    { text: 'la independència', mark: 'bold' },
    { text: 'dependència que crea la llitera.', mark: 'bold' },
    { text: 'el que tu mateix fas pel TEU cos.', mark: 'bold' },
    { text: 'la qualitat de vida no era la mateixa.', mark: 'bold' },
    { text: 'Thomas Seyfried', mark: 'bold' },
    { text: 'el paper del metabolisme', mark: 'bold' },
    { text: 'filtrar el renou.', mark: 'bold' },
    { text: 'La meva missió', mark: 'bold' }
  ]
};

const enProfiles = [
  {
    id: 'jaume',
    name: 'Jaume Sansó',
    specialty: 'Physiotherapist specialised in exercise and cancer',
    storySections: [
      {
        eyebrow: 'Who I am',
        title: 'How did it all begin?',
        paragraphs: [
          'Hi! Let me tell you how this journey began.',
          'As a child, I was obsessed with everything related to cells. But the moment that really marked me was at secondary school, when my biology teacher said a sentence that stayed burned into my memory: “half of you will have cancer when you are older”. Years later, that sentence stopped being theory: I began to see friends whose mother or father had survived cancer… and something stayed with me.',
          'I studied Physiotherapy for a different reason: before starting my degree, I suffered episodes of low back pain that stopped me from playing basketball. At university, I tried many therapies on myself —almost all of them passive— and learned something uncomfortable: they relieve symptoms, but only temporarily. What truly pulled me out of the hole was understanding the body, pain and movement. Returning to training, little by little, gave me back something even more important than the absence of pain: independence.'
        ]
      },
      {
        title: 'My frustration',
        paragraphs: [
          'When I started working in the hospital, I saw a huge problem: the dependency created by the treatment table. That is when I understood something that changed everything: a large part of change does not come from what is done to you, but from what you do yourself for YOUR body. I wanted to give my patients that same sense of freedom and empowerment that I had felt when recovering through exercise, breaking away from the idea of depending on a physiotherapist’s hands in order to improve.',
          'Over the years, cancer crossed my path again: patients who had been through an oncological process and were still dealing with its consequences. And there I saw a very clear difference between those who exercised and those who did not: their quality of life was not the same.'
        ]
      },
      {
        title: 'The reason behind what I do',
        paragraphs: [
          'The definitive turning point came when I listened to an interview with researcher Thomas Seyfried: that is when I clearly saw the role of metabolism in health. Since then, I have been learning day by day from some of the best professionals working with this approach, absorbing their knowledge and applying it with my patients.',
          'EIMA was born with a clear goal: to filter out the noise. We condense information from leading experts and transform it into clear actions so that you have a well-defined roadmap, without losing months among doubts and contradictory advice.',
          'My mission is for every person who comes to EIMA to become aware of everything their body can do to improve their health.'
        ]
      }
    ],
    cta: 'Now that you know my story, will you tell us yours?',
    educationTitle: 'My training',
    education: [
      {
        year: '2020',
        items: ['Degree in Physiotherapy — registered physiotherapist 1738 — University of the Balearic Islands']
      },
      {
        year: '2021',
        items: [
          'Course in Clinical Reasoning and Clinical Diagnosis — Arturo Such — Qeres Formación',
          'Course in Scientific Method and Health Research — Fran Gurdiel and Laura Flix — Qeres Formación'
        ]
      },
      {
        year: '2022',
        items: [
          'Course in Therapeutic Exercise — Fran Gurdiel — Qeres Formación',
          'Course in the Management of Upper and Lower Limb Neuropathies — Arturo Such — Qeres Formación'
        ]
      },
      {
        year: '2023',
        items: [
          'Course in the Management and Treatment of Upper and Lower Limb Tendinopathies — Álvaro Altube — Qeres Formación',
          'Course in Pattern Recognition — Arturo Such — Qeres Formación',
          'Course in Exercise, Obesity and Cancer — 2nd edition — Mario Redondo and Javi Butragueño — Obesity Management School'
        ]
      },
      {
        year: '2024',
        items: [
          'Course in the Management of People with Long-Term Pain — Mar Flores — accredited by Hospital Sant Joan de Déu',
          'Course in Pain and Movement. Neurobiology of Pain — Arturo Goicoechea — accredited by Hospital Sant Joan de Déu',
          'Course in Physiotherapy for the Oncology Patient — Luis Montoya — Qeres Formación'
        ]
      },
      {
        year: '2025',
        items: [
          'Course in Shoulder Pain. Clinical Reasoning and Therapeutic Management — Tito Pampín — accredited by Hospital Sant Joan de Déu',
          'Course in Metabolic Oncology — Alfonso Fernández'
        ]
      }
    ],
    readingsTitle: 'My reading',
    readings: [
      'Explain Pain — Lorimer Moseley (finished)',
      'Aches & Pains — Luis Gifford (finished)',
      'Environment and Health — Carme Valls-Llobet (finished)',
      'Exercise: A Wall Against Cancer — Adrián Castillo, Javier Morales and Pedro Valenzuela (finished)',
      'The Cancer Encyclopedia: Metabolism, Immune System and Microbiota — Alfonso Fernández (Cáncer Integral) (in progress)',
      'Free Yourself from Toxins: A Guide to Avoiding Endocrine Disruptors — Nicolás Olea (in progress)'
    ]
  },
  {
    id: 'miquel',
    name: 'Miquel Galmés',
    specialty: 'Physiotherapist specialised in exercise and cancer-related pain',
    storySections: [
      {
        eyebrow: 'Who I am',
        title: 'My beginnings',
        paragraphs: [
          'Hi, I’m Miquel. And I would like to explain how I got here.',
          'Since I was a teenager, I knew I wanted to dedicate myself to helping people. My life has always revolved around movement and sport, so physiotherapy seemed to me the best way to improve the lives of people limited by pain.',
          'That is why I studied Physiotherapy and began to take a deep interest in everything that could improve my patients’ quality of life.'
        ]
      },
      {
        title: 'When something did not fit',
        paragraphs: [
          'When I finished my degree, around 2017, my professional life was marked by a constant feeling of dissatisfaction. I kept asking myself questions:',
          'Why are we doing this this way? Are they really teaching me techniques that have not been scientifically proven? Am I treating pain without understanding why my patient is in pain?',
          'I also spent many hours giving passive treatments on a treatment table to people who told me everything they had stopped doing because of their pain: their favourite sport, walking with their partner, working, going for walks with their grandchildren…',
          'And I thought: how is someone who cannot walk because of pain supposed to improve if all we do is massage their back?',
          'Something did not add up.'
        ]
      },
      {
        title: 'Looking for answers',
        paragraphs: [
          'That frustration became the engine that pushed me to look for answers.',
          'I trained as much as I could, although at first I came across many courses focused only on learning more manual techniques, without a clear goal of helping the person return to what they could no longer do.',
          'Many of those courses also failed to provide scientific explanations to support what was being proposed.',
          'My expectations were different. I needed to understand how pain works and which factors influence whether it persists over time.',
          'Along the way, I was lucky enough to learn from great professionals and teachers who shaped my way of understanding physiotherapy and pain, such as Pablo Mendo, Rafael Torres and Louis Gifford, among others.'
        ]
      },
      {
        title: 'How I work today',
        paragraphs: [
          'Today, I focus my work on bringing all this knowledge to each person I work with, creating fully personalised programmes and supporting them throughout their process of recovering wellbeing, movement and confidence in their body.',
          'And that is where EIMA comes from.',
          'From the union of two professionals tired of working with limitations, with the goal of improving our patients’ lives through real commitment, full involvement and step-by-step support towards their best possible state of health.'
        ]
      }
    ],
    cta: 'Now that you know my story, will you tell us yours?',
    educationTitle: 'My training',
    education: [
      {
        year: '2017',
        items: ['Degree in Physiotherapy — registered physiotherapist 1463 — University of the Balearic Islands']
      },
      {
        year: '2018',
        items: [
          'Course in Dry Needling for Myofascial Pain Syndrome',
          'Course on Updates in Data Protection Law',
          'Course on New Technologies Applied to Rehabilitation'
        ]
      },
      {
        year: '2019',
        items: ['Master’s Degree in Osteopathic Techniques of the Musculoskeletal System — Madrid School of Osteopathy']
      },
      {
        year: '2021',
        items: ['Course in Clinical Reasoning and Diagnosis — Arturo Such']
      },
      {
        year: '2022',
        items: [
          'Course in Practical Management of Patients with Chronic Pain — Basic Level — Rafael Torres',
          'Course in Therapeutic Exercise for Older Adults'
        ]
      },
      {
        year: '2023',
        items: [
          'Course in Practical Management of Patients with Chronic Pain — Advanced Level — Rafael Torres',
          'Course in the Management of People with Long-Term Pain — Mar Flores',
          'Evidence-Based Course in Tendinopathy Management — Álvaro Altube'
        ]
      },
      {
        year: '2024',
        items: ['Course in Pain and Movement. Neurobiology of Pain — Arturo Goicoechea']
      },
      {
        year: '2025',
        items: ['Course in Shoulder Pain. Clinical Reasoning and Therapeutic Management — Tito Pampín']
      }
    ],
    readingsTitle: 'My reading',
    readings: [
      'Explain Pain — Lorimer Moseley (finished)',
      'Essential Guide Cervical Spine — Rafael Torres (finished)',
      'Understanding Sciatica — Tom Jesson (finished)',
      'The Biomechanics of Low Back Pain — Bogduk and collaborators (finished)',
      'Aches & Pains — Louis Gifford (in progress)',
      'Neuroscience of the Body — Nazareth Castellanos (finished)',
      'Antifragile — Nassim Taleb (finished)',
      'Atomic Habits — James Clear (in progress)',
      'Exercise: A Wall Against Cancer — Adrián Castillo, Javier Morales and Pedro Valenzuela (finished)',
      'Fasting Against Cancer — Valter Longo (in progress)'
    ]
  }
];

const enMarks = {
  miquel: [
    { text: 'dedicate myself to helping people.', mark: 'bold' },
    { text: 'constant feeling of dissatisfaction.', mark: 'bold' },
    {
      text: 'Why are we doing this this way? Are they really teaching me techniques that have not been scientifically proven? Am I treating pain without understanding why my patient is in pain?',
      mark: 'italic'
    },
    {
      text: 'how is someone who cannot walk because of pain supposed to improve if all we do is massage their back?',
      mark: 'bold'
    },
    { text: 'That frustration', mark: 'bold' },
    { text: 'I needed to understand how pain works', mark: 'bold' },
    { text: 'great professionals', mark: 'bold' },
    { text: 'Pablo Mendo, Rafael Torres and Louis Gifford', mark: 'bold' },
    { text: 'bringing all this knowledge to each person I work with', mark: 'bold' },
    { text: 'where EIMA comes from.', mark: 'bold' }
  ],
  jaume: [
    { text: '“half of you will have cancer when you are older”', mark: 'bold' },
    { text: 'something stayed with me.', mark: 'bold' },
    { text: 'suffered episodes of low back pain', mark: 'bold' },
    { text: 'understanding the body, pain and movement.', mark: 'bold' },
    { text: 'independence.', mark: 'bold' },
    { text: 'dependency created by the treatment table.', mark: 'bold' },
    { text: 'what you do yourself for YOUR body.', mark: 'bold' },
    { text: 'their quality of life was not the same.', mark: 'bold' },
    { text: 'Thomas Seyfried', mark: 'bold' },
    { text: 'role of metabolism', mark: 'bold' },
    { text: 'filter out the noise.', mark: 'bold' },
    { text: 'My mission', mark: 'bold' }
  ]
};

const storyCopy = {
  es: {
    meta: {
      title: 'Nuestra historia | Jaume y Miquel, fisioterapeutas EIMA',
      description:
        'Descubre la historia de los fisioterapeutas de EIMA y por qué acompañan a personas con cáncer a recuperar energía, confianza y autonomía.',
      ogTitle: 'Nuestra historia | Jaume y Miquel, fisioterapeutas EIMA',
      ogDescription:
        'Conoce el camino de Jaume Sansó y Miquel Galmés, fisioterapeutas fundadores de EIMA, y su forma de acompañar a personas con cáncer.',
      imageAlt: 'Jaume y Miquel, fisioterapeutas fundadores de EIMA'
    },
    hero: {
      eyebrow: 'Nuestra historia',
      titleLineOnePrefix: 'Conoce',
      titleLineOneHighlight: 'nuestras',
      titleLineTwoHighlight: 'historias',
      titleLineTwoSuffix: 'a fondo',
      introLineOne: 'Dos caminos distintos, una',
      introStrong: 'misma idea',
      introLineTwo: 'Ayudarte a recuperar seguridad, energía y confianza en tu proceso.',
      cta: 'Cuéntanos tu historia'
    },
    labels: {
      meetUs: 'Conócenos',
      chooseStory: 'Elegir historia',
      viewMiquel: 'Ver la historia de Miquel',
      viewJaume: 'Ver la historia de Jaume',
      enlargeCover: 'Ampliar portada de',
      coverOf: 'Portada de',
      close: 'Cerrar',
      finalCta: 'Te escuchamos'
    },
    status: {
      done: 'Acabado',
      progress: 'En curso'
    },
    profiles: esProfiles,
    marks: esMarks
  },
  ca: {
    meta: {
      title: 'La nostra història | Jaume i Miquel, fisioterapeutes EIMA',
      description:
        'Coneix la història dels fisioterapeutes d’EIMA i per què acompanyen persones amb càncer a recuperar energia, confiança i autonomia.',
      ogTitle: 'La nostra història | Jaume i Miquel, fisioterapeutes EIMA',
      ogDescription:
        'Coneix el camí de Jaume Sansó i Miquel Galmés, fisioterapeutes fundadors d’EIMA, i la seva manera d’acompanyar persones amb càncer.',
      imageAlt: 'Jaume i Miquel, fisioterapeutes fundadors d’EIMA'
    },
    hero: {
      eyebrow: 'La nostra història',
      titleLineOnePrefix: 'Coneix les',
      titleLineOneHighlight: 'nostres',
      titleLineTwoHighlight: 'històries',
      titleLineTwoSuffix: 'a fons',
      introLineOne: 'Dos camins diferents, una',
      introStrong: 'mateixa idea',
      introLineTwo: 'Ajudar-te a recuperar seguretat, energia i confiança en el teu procés.',
      cta: 'Explica’ns la teva història'
    },
    labels: {
      meetUs: 'Coneix-nos',
      chooseStory: 'Elegir història',
      viewMiquel: 'Veure la història de Miquel',
      viewJaume: 'Veure la història de Jaume',
      enlargeCover: 'Ampliar portada de',
      coverOf: 'Portada de',
      close: 'Tancar',
      finalCta: 'T’escoltam'
    },
    status: {
      done: 'Acabat',
      progress: 'En curs'
    },
    profiles: caProfiles,
    marks: caMarks
  },
  en: {
    meta: {
      title: 'Our story | Jaume and Miquel, EIMA physiotherapists',
      description:
        'Discover the story of EIMA’s physiotherapists and why they support people with cancer in recovering energy, confidence and autonomy.',
      ogTitle: 'Our story | Jaume and Miquel, EIMA physiotherapists',
      ogDescription:
        'Discover the path of Jaume Sansó and Miquel Galmés, EIMA’s founding physiotherapists, and their way of supporting people with cancer.',
      imageAlt: 'Jaume and Miquel, founding physiotherapists of EIMA'
    },
    hero: {
      eyebrow: 'Our story',
      titleLineOnePrefix: 'Get to know our',
      titleLineOneHighlight: '',
      titleLineTwoHighlight: 'story',
      titleLineTwoSuffix: 'in depth',
      introLineOne: 'Two different paths, one',
      introStrong: 'shared idea',
      introLineTwo: 'Helping you recover safety, energy and confidence in your process.',
      cta: 'Tell us your story'
    },
    labels: {
      meetUs: 'Get to know us',
      chooseStory: 'Choose story',
      viewMiquel: 'View Miquel Galmés’ story',
      viewJaume: 'View Jaume Sansó’s story',
      enlargeCover: 'Enlarge cover of',
      coverOf: 'Cover of',
      close: 'Close',
      finalCta: 'We listen to you'
    },
    status: {
      done: 'Finished',
      progress: 'In progress'
    },
    profiles: enProfiles,
    marks: enMarks
  }
};

export function getStoryCopy(language: Language) {
  return storyCopy[language];
}
