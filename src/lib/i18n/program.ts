import type { Language } from './copy';

export type ProgramFaq = {
  q: string;
  a: string[];
  icon: string;
  cta?: string;
};

const icons = {
  shield:
    'M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm-34.32,69.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z',
  clipboard:
    'M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z',
  battery:
    'M88,8a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,8Zm72,176H96a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V192A8,8,0,0,0,160,184ZM200,56V224a24,24,0,0,1-24,24H80a24,24,0,0,1-24-24V56A24,24,0,0,1,80,32h96A24,24,0,0,1,200,56Zm-16,0a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8V224a8,8,0,0,0,8,8h96a8,8,0,0,0,8-8Z',
  gear:
    'M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z',
  hourglass:
    'M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.59A16.09,16.09,0,0,0,200,75.64ZM184,180.36V216H72V180l48-36v24a8,8,0,0,0,16,0V144.08Zm0-104.72L178.23,80H77.33L72,76V40H184Z',
  steps:
    'M216.06,192v12A36,36,0,0,1,144,204V192a8,8,0,0,1,8-8h56A8,8,0,0,1,216.06,192ZM104,160h-56a8,8,0,0,0-8,8v12A36,36,0,0,0,112,180V168A8,8,0,0,0,104,160ZM76,16C64.36,16,53.07,26.31,44.2,45c-13.93,29.38-18.56,73,.29,96a8,8,0,0,0,6.2,2.93h50.55a8,8,0,0,0,6.2-2.93c18.85-23,14.22-66.65.29-96C98.85,26.31,87.57,16,76,16Zm78.8,152h50.55a8,8,0,0,0,6.2-2.93c18.85-23,14.22-66.65.29-96C202.93,50.31,191.64,40,180,40s-22.89,10.31-31.77,29c-13.93,29.38-18.56,73,.29,96A8,8,0,0,0,154.76,168Z',
  refresh:
    'M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z',
  home:
    'M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16Zm-88,0H104V160a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4Z',
  chat:
    'M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z',
  people:
    'M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z'
};

const esProgram = {
  meta: {
    title: 'EIMA | Fisioterapia a domicilio para personas con cáncer',
    description:
      'Fisioterapia a domicilio en Mallorca para personas en un proceso oncológico. Ejercicio guiado en casa y acompañamiento online continuo, sin desplazamientos.',
    ogTitle: 'Ejercicio durante y después del cáncer | Eima Fisioterapia',
    ogDescription:
      'Fisioterapia a domicilio en Mallorca especializada en ejercicio para personas que atraviesan un proceso oncológico. Te guiamos con ejercicio individualizado y seguro, incluso con dolor o fatiga.',
    imageAlt: 'EIMA Fisioterapia — Programa Empenta de ejercicio oncológico'
  },
  hero: {
    eyebrow:
      'Servicio especializado de fisioterapia oncológica y ejercicio físico a domicilio en Mallorca.',
    srTitle:
      'Servicio especializado de fisioterapia oncológica y ejercicio físico a domicilio en Mallorca. Menos efectos secundarios durante y después del cáncer',
    phrases: ['Más vitalidad', 'Más fuerza', 'Menos efectos secundarios'],
    line1: 'durante y después',
    line2: 'del cáncer',
    desktopParagraph: [
      'Ayudamos a personas con cáncer a recuperar su vitalidad',
      'y a reducir el impacto de los efectos secundarios en su día a día',
      'con nuestro <strong class="font-semibold">programa de 12 semanas</strong>.'
    ],
    mobileParagraph:
      'Ayudamos a personas con cáncer a recuperar su vitalidad y a reducir el impacto de los efectos secundarios en su día a día con nuestro <strong class="font-semibold">programa de 12 semanas</strong>.',
    cta: 'Hablemos de tu caso'
  },
  steps: {
    headingPrefix: 'Cómo funciona',
    headingHighlight: 'Empenta',
    intro:
      'Un proceso de 12 semanas para que no tengas que improvisar qué hacer, cuánto hacer ni si lo estás haciendo bien.',
    badge: 'Programa de 12 semanas',
    sideParagraphs: [
      'No trabajamos con sesiones sueltas. <strong>Es un acompañamiento</strong> estructurado para ayudarte a empezar o retomar el ejercicio con seguridad.',
      'Donde valoramos tu punto de partida, diseñamos un plan progresivo y lo adaptamos según cómo vas evolucionando.'
    ],
    items: [
      {
        number: '1',
        title: 'Nos cuentas tu caso',
        body:
          'Empezamos con una <strong>breve llamada</strong> para entender tu situación y ver si Empenta puede ayudarte de verdad. Si vemos que sí, te enviamos un formulario inicial para recoger la <strong>información importante antes de empezar</strong>.',
        icon: 'call'
      },
      {
        number: '2',
        title: 'Hacemos una valoración inicial en tu casa',
        body:
          'Vamos a tu domicilio para conocerte bien y <strong>valorar desde dónde partimos</strong>. Revisamos tu historia, tus síntomas, el momento del proceso oncológico en el que estás (quimioterapia, radioterapia, inmunoterapia, post-cirugía, etc.) y tu condición física actual para <strong>ajustar el plan a ti desde el principio</strong>.',
        icon: 'home'
      },
      {
        number: '3',
        title: 'Preparamos el terreno para empezar bien',
        body:
          'Antes de arrancar de verdad, no buscamos que lo hagas perfecto. Te explicamos <strong>cómo funciona el programa</strong>, cómo registrar la actividad en la app y cómo empezar poco a poco para llegar preparado/a a la primera semana real.',
        icon: 'phone'
      },
      {
        number: '4',
        title: 'Empiezas tu plan adaptado',
        body:
          'Diseñamos un plan de ejercicio ajustado a tu situación actual. Priorizamos una dosis asumible para ti y la vamos adaptando según <strong>tu tolerancia, tus síntomas y tu evolución</strong>.',
        icon: 'checklist'
      },
      {
        number: '5',
        title: 'Te acompañamos y medimos tu evolución',
        body:
          'Durante el programa hacemos <strong>seguimiento online continuo</strong>, ajustamos la pauta según cómo te encuentras y recogemos datos para valorar tu evolución con criterio. Si lo autorizas, podremos <strong>compartir esa información con tu oncólogo/a</strong> o equipo médico para que también tenga una visión clara de tu progreso.',
        icon: 'support'
      }
    ],
    closing:
      'Porque <strong>tu cuerpo cambia</strong> semana a semana. Y <strong>el plan también</strong> debe hacerlo.',
    cta: 'Cuéntanos tu historia'
  },
  slogan1: {
    topHtml: 'La <strong>medicina</strong> se centrará en que vivas <strong>MÁS.</strong>',
    bottomHtml: '<strong>Nosotros</strong> en que vivas <strong>MEJOR.</strong>'
  },
  fit: {
    eyebrow: 'Si tengo cáncer o he pasado un cáncer',
    titlePrefix: '¿Cómo sé si',
    titleHighlight: 'este programa es para mí?',
    yesTitle: 'Esto encaja contigo si...',
    noTitle: 'Esto <span class="font-bold">NO</span> encaja contigo si...',
    yesItems: [
      'Te han dicho que te iría bien hacer ejercicio, pero no sabes bien por dónde empezar.',
      'Te notas con menos fuerza, menos energía o más inseguridad desde el diagnóstico y los tratamientos.',
      'Quieres recuperar <em>cosas normales</em> como: subir escaleras, llevar la compra o jugar con tus hijos/nietos.',
      'Buscas una guía clara y un seguimiento real para no ir a ciegas.'
    ],
    noItems: [
      'Buscas sesiones sueltas sin implicarte en lo que haces fuera de ellas.',
      'No quieres reservar un mínimo de tiempo al día para moverte por tu cuenta.',
      'Esperas mejorar sin constancia, sin adaptación y sin revisar hábitos.',
      'Prefieres una solución pasiva en lugar de participar en tu proceso.'
    ]
  },
  doubtCta: {
    text: '¿Aún dudas de si podemos ayudarte?',
    cta: 'Cuéntanos tu caso'
  },
  slogan2: {
    topHtml:
      "Tu <strong>salud</strong> y tu <strong>tiempo</strong> son lo <br class='parallax-mobile-break' /><strong>más valioso</strong> que tienes.",
    bottomHtml:
      'Con nuestro programa <strong>Empenta</strong>, cuidarás de <strong>AMBOS.</strong>'
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    titleHighlight: 'Dudas habituales',
    titleRest: 'sobre',
    titleProgram: 'nuestro programa',
    bottomText: '¿Todavía tienes dudas?',
    bottomCta: 'Escríbenos',
    faqs: [
      {
        q: '¿Es <strong>seguro hacer ejercicio</strong> durante el tratamiento del cáncer (quimioterapia o radioterapia)?',
        a: [
          'En la mayoría de casos, <strong>sí.</strong> Hacer ejercicio durante el tratamiento oncológico puede ser seguro cuando está <strong>adaptado</strong> a tu situación, tus síntomas y el momento de tu tratamiento.',
          'Por eso en Empenta no trabajamos con pautas genéricas. Primero <strong>valoramos tu caso</strong>, entendemos cómo estás y <strong>ajustamos el ejercicio a ti, no tú al ejercicio.</strong>',
          'La idea no es exigirte más porque sí, sino ayudarte a <strong>moverte con criterio y seguridad, para que el ejercicio sume</strong> dentro del proceso en lugar de convertirse en una carga más.',
          'Si esta es una de las dudas que te frena, podemos orientarte antes de empezar.'
        ],
        cta: 'Quiero saber si esto encaja conmigo',
        icon: icons.shield
      },
      {
        q: '¿El ejercicio puede ayudarme con la <strong>fatiga oncológica?</strong>',
        a: [
          'Sí. El ejercicio adaptado puede ayudar a muchas personas con cáncer a manejar mejor la <strong>fatiga oncológica</strong>, especialmente cuando se ajusta a su nivel de energía, síntomas y momento del tratamiento.',
          'La fatiga oncológica no es simplemente estar cansado. A veces aparece aunque hayas descansado, y puede hacer que <strong>tareas normales</strong> —caminar, ducharte, salir de casa o subir unas escaleras— se sientan <strong>más pesadas de lo habitual.</strong>',
          'No significa que el cansancio desaparezca de golpe, ni que todos los días vayas a sentirte igual. Pero con una pauta bien ajustada, el ejercicio puede ayudarte a conservar <strong>fuerza</strong>, tolerar mejor el <strong>esfuerzo</strong> y sentir que recuperas algo de <strong>control</strong> sobre tu cuerpo.',
          'Si la fatiga te está limitando, podemos ayudarte a valorar por dónde empezar.'
        ],
        cta: 'Quiero orientación para empezar',
        icon: icons.battery
      },
      {
        q: '¿Necesito la <strong>derivación de mi oncólogo</strong> para empezar este programa de ejercicio?',
        a: [
          'No es necesario. Lo importante no es que tu oncólogo conozca el nombre del programa, sino que el ejercicio esté bien adaptado a tu situación clínica real.',
          'En la valoración inicial <strong>revisamos la información médica</strong> que tengas disponible: informes, analíticas, PET-TAC, electrocardiogramas, pruebas recientes, medicación e indicaciones específicas de tu equipo médico.',
          'Empenta no va por libre. Cuando sea necesario y posible, y siempre con tu autorización, <strong>podemos coordinarnos con tu oncólogo/a para compartir tu evolución</strong> y ajustar mejor el plan según el momento del tratamiento: quimioterapia, inmunoterapia, radioterapia o cirugía.',
          'La idea es formar un pequeño <strong>equipo alrededor de ti</strong>: que oncología tenga información útil sobre tu evolución y que nosotros podamos adaptar el ejercicio a lo que esté ocurriendo en tu tratamiento.',
          'Si quieres que revisemos tu situación antes de empezar, puedes verlo {{reviewLink}}.'
        ],
        icon: icons.clipboard
      },
      {
        q: '¿El ejercicio físico <strong>sustituye al tratamiento médico</strong> contra el cáncer?',
        a: [
          'No. Empenta no sustituye a la oncología ni a la medicación, la quimioterapia, la radioterapia, la cirugía, la inmunoterapia ni ningún tratamiento indicado por tu equipo médico.',
          'No es elegir entre tratamiento médico o ejercicio. Es <strong>unir fuerzas contra el cáncer.</strong>',
          'El tratamiento oncológico se dirige contra la enfermedad. El ejercicio adaptado busca <strong>ayudarte a cuidar el resto</strong>: tus músculos, tu energía, tu movilidad, tu sistema inmune, tu metabolismo, tu tolerancia al esfuerzo y tu autonomía.',
          'La idea es <strong>crear sinergia.</strong> Que el tratamiento médico haga su parte contra el cáncer y que el ejercicio —junto con otros pilares como la nutrición, el descanso, la gestión emocional y la reducción de tóxicos— ayude a que tu cuerpo llegue al proceso en las mejores condiciones posibles dentro de tu situación.',
          'Si quieres saber cómo podríamos ayudarte sin interferir con tu tratamiento, puedes escribirnos {{writeLink}}.'
        ],
        icon: icons.people
      },
      {
        q: '¿La valoración es <strong>presencial</strong> o todo es <strong>online?</strong>',
        a: [
          '<strong>La valoración inicial</strong> la hacemos <strong>de forma presencial</strong> en tu casa, para conocerte bien antes de pautar ejercicio. En esa primera visita revisamos tu situación, tus síntomas, tus limitaciones, el momento del proceso oncológico y tu punto de partida físico.',
          'Después, el <strong>seguimiento del programa</strong> es principalmente <strong>online</strong>. Esto nos permite ajustar mejor el ejercicio a tu energía, síntomas y horarios, sin añadir más desplazamientos innecesarios.',
          'Mucha gente piensa que online significa distante. En Empenta lo usamos justo para lo contrario: para poder estar más pendientes de <strong>cómo evolucionas entre una visita y otra.</strong>',
          'Antes de empezar, te explicamos cómo sería el proceso en tu caso.'
        ],
        cta: 'Quiero que me expliquéis el proceso',
        icon: icons.home
      },
      {
        q: '¿Y si tengo <strong>dudas</strong> o no se me da bien la <strong>tecnología?</strong>',
        a: [
          '<strong>No estarás solo/a.</strong> Durante el proceso tendrás acompañamiento para resolver dudas, ajustar el ejercicio y revisar cómo vas evolucionando.',
          'Si no sabes si estás haciendo bien un ejercicio, si una semana tienes más fatiga, si aparece algún dolor o si algo te preocupa, <strong>no tienes que quedarte con la duda.</strong>',
          'Y si la tecnología no se te da bien, tampoco pasa nada. Te lo explicamos <strong>paso a paso</strong> y usamos <strong>herramientas sencillas.</strong> No necesitas dominar ninguna aplicación para poder empezar. Y si al principio necesitas que te ayude un familiar, puede participar sin ningún problema.',
          'La parte online no está pensada para complicarte la vida, sino para <strong>acompañarte mejor sin obligarte a desplazarte más.</strong>',
          'Si esto es una de las cosas que te frena, lo vemos contigo desde el principio.'
        ],
        cta: 'Quiero resolver mis dudas',
        icon: icons.chat
      },
      {
        q: '¿Puedo hacer ejercicio si tengo <strong>metástasis, dolor o anemia</strong> por el cáncer?',
        a: [
          '<strong>Precisamente por eso no damos pautas genéricas.</strong>',
          'Si tienes dolor, anemia, metástasis óseas, bajada importante de defensas, neuropatía u otros efectos secundarios del tratamiento, el ejercicio no se elimina automáticamente, pero sí <strong>debe adaptarse con más precisión.</strong>',
          'En algunos casos habrá que bajar la intensidad. En otros, cambiar el tipo de ejercicio, reducir la duración, modificar posiciones o evitar ciertos movimientos. Y en momentos concretos, puede tener sentido pausar, priorizar movilidad suave o centrarnos solo en mantener actividad básica.',
          'No se trata de forzar ni de entrenar pase lo que pase. Se trata de encontrar la forma más <strong>segura, útil y realista</strong> de moverte según tu situación actual.',
          'Si tienes dudas sobre tu caso concreto, puedes explicarnos tu situación {{situationLink}}.'
        ],
        icon: icons.gear
      },
      {
        q: '<strong>¿Cuándo empezar a hacer ejercicio:</strong> durante o después del tratamiento del cáncer?',
        a: [
          'En general, si tu situación lo permite, suele tener más sentido <strong>empezar poco a poco durante el tratamiento oncológico</strong> que esperar al momento perfecto.',
          'Muchas veces ese momento perfecto tarda mucho en llegar. Y mientras tanto, pueden pasar semanas o meses en los que podrías haber empezado a moverte, aunque fuera poco, para conservar mejor tu <strong>fuerza, movilidad, energía y autonomía.</strong>',
          'No se trata de empezar fuerte, sino de empezar con <strong>una dosis adaptada a ti.</strong> Esperar solo tendría sentido si hay una limitación concreta o una situación clínica que obligue a modificar el plan. Por eso primero valoramos tu caso y, a partir de ahí, decidimos qué tiene sentido para ti.',
          'Si no sabes si es buen momento para empezar, puedes preguntarnos {{askLink}}.'
        ],
        icon: icons.hourglass
      },
      {
        q: '¿Qué pasa si <strong>nunca he hecho ejercicio</strong> y me diagnostican cáncer?',
        a: [
          'No pasa nada. Empenta también está pensado para personas que <strong>nunca han hecho ejercicio</strong> o que llevan mucho tiempo sin moverse.',
          'Muchas veces el problema no es la falta de ganas, sino no saber <strong>qué hacer, cuánto hacer o cómo empezar sin miedo.</strong> Y cuando todo parece demasiado confuso, es fácil bloquearse y acabar sin hacer nada.',
          'Por eso no buscamos que lo hagas perfecto desde el primer día. Primero entendemos tu punto de partida, te explicamos cómo funciona todo y empezamos con una <strong>dosis asumible para ti.</strong>',
          'Si partes de cero, puedes contarnos tu caso {{caseLink}} y vemos si este programa encaja contigo.'
        ],
        icon: icons.steps
      },
      {
        q: '¿Qué pasa si una semana <strong>me encuentro peor?</strong>',
        a: [
          'Si una semana te encuentras peor, <strong>nos avisas y ajustamos el plan.</strong> No tienes que esperar a la siguiente cita para saber qué hacer, qué reducir o qué evitar.',
          'Durante el tratamiento hay semanas mejores y semanas más difíciles. Por eso el ejercicio <strong>no puede ser rígido.</strong>',
          'Si tienes más fatiga, dolor, mal descanso, efectos secundarios o menos energía, bajamos la carga, modificamos los ejercicios o cambiamos el objetivo de esa semana. Ya <strong>volveremos a progresar cuando tu cuerpo esté preparado.</strong>',
          'La idea no es que tú encajes en una rutina cerrada, sino que <strong>el plan encaje contigo.</strong> Nuestro objetivo es que puedas seguir avanzando sin sentir que estás fallando cada vez que tienes una semana complicada.'
        ],
        cta: 'Quiero saber cómo sería mi plan',
        icon: icons.refresh
      }
    ]
  }
};

const caProgram = {
  meta: {
    title: 'EIMA | Com funciona Empenta',
    description:
      'Servei especialitzat de fisioteràpia oncològica i exercici físic a domicili a Mallorca. Programa Empenta de 12 setmanes.',
    ogTitle: 'Com funciona Empenta | EIMA Fisioteràpia',
    ogDescription:
      'Ajudam persones amb càncer a recuperar vitalitat i reduir l’impacte dels efectes secundaris amb exercici adaptat a domicili.',
    imageAlt: 'EIMA Fisioteràpia — Programa Empenta d’exercici oncològic'
  },
  hero: {
    eyebrow:
      'Servei especialitzat de fisioteràpia oncològica i exercici físic a domicili a Mallorca.',
    srTitle:
      'Servei especialitzat de fisioteràpia oncològica i exercici físic a domicili a Mallorca. Menys efectes secundaris durant i després del càncer',
    phrases: ['Més vitalitat', 'Més força', 'Menys efectes secundaris'],
    line1: 'durant i després',
    line2: 'del càncer',
    desktopParagraph: [
      'Ajudam persones amb càncer a recuperar la seva vitalitat',
      'i a reduir l’impacte dels efectes secundaris en el seu dia a dia',
      'amb el nostre <strong class="font-semibold">programa de 12 setmanes</strong>.'
    ],
    mobileParagraph:
      'Ajudam persones amb càncer a recuperar la seva vitalitat i a reduir l’impacte dels efectes secundaris en el seu dia a dia amb el nostre <strong class="font-semibold">programa de 12 setmanes</strong>.',
    cta: 'Parlem del teu cas'
  },
  steps: {
    headingPrefix: 'Com funciona',
    headingHighlight: 'Empenta',
    intro:
      'Un procés de 12 setmanes perquè no hagis d’improvisar què fer, quant fer ni estar pensant tot el temps si ho estàs fent bé.',
    badge: 'Programa de 12 setmanes',
    sideParagraphs: [
      'No treballam amb sessions soltes. <strong>És un acompanyament</strong> estructurat per ajudar-te a començar o reprendre l’exercici amb seguretat.',
      'On valoram el teu punt de partida, dissenyam un pla progressiu i l’adaptam segons com vas evolucionant.'
    ],
    items: [
      {
        number: '1',
        title: 'Ens expliques el teu cas',
        body:
          'Començam amb una <strong>breu telefonada</strong> per entendre la teva situació i veure si Empenta et pot ajudar de veritat. Si veim que sí, t’enviam un formulari inicial per recollir la <strong>informació important abans de començar</strong>.',
        icon: 'call'
      },
      {
        number: '2',
        title: 'Feim una valoració inicial a ca teva',
        body:
          'Venim al teu domicili per conèixer-te bé i <strong>valorar des d’on partim</strong>. Revisam la teva història, els teus símptomes, el moment del procés oncològic en què et trobes (quimioteràpia, radioteràpia, immunoteràpia, postcirurgia, etc.) i la teva condició física actual per <strong>ajustar el pla a tu des del principi</strong>.',
        icon: 'home'
      },
      {
        number: '3',
        title: 'Preparam el terreny per començar bé',
        body:
          'Abans d’arrencar de veritat, no cercam que ho facis perfecte. T’explicam <strong>com funciona el programa</strong>, com registrar l’activitat a l’app i com començar a poc a poc per arribar preparat/ada a la primera setmana real.',
        icon: 'phone'
      },
      {
        number: '4',
        title: 'Comences el teu pla adaptat',
        body:
          'Dissenyam un pla d’exercici ajustat a la teva situació actual. Prioritzam una dosi assumible per a tu i l’anam adaptant segons <strong>la teva tolerància, els teus símptomes i la teva evolució</strong>.',
        icon: 'checklist'
      },
      {
        number: '5',
        title: 'T’acompanyam i mesuram la teva evolució',
        body:
          'Durant el programa feim <strong>seguiment online continu</strong>, ajustam la pauta segons com et trobes i recollim dades per valorar la teva evolució amb criteri. Si ho autoritzes, podrem <strong>compartir aquesta informació amb el teu oncòleg/òloga</strong> o equip mèdic perquè també tengui una visió clara del teu progrés.',
        icon: 'support'
      }
    ],
    closing:
      'Perquè <strong>el teu cos canvia</strong> setmana a setmana. I <strong>el pla també</strong> ho ha de fer.',
    cta: 'Explica’ns la teva història'
  },
  slogan1: {
    topHtml: 'La <strong>medicina</strong> se centrarà que visquis <strong>MÉS.</strong>',
    bottomHtml: '<strong>Nosaltres</strong>, que visquis <strong>MILLOR.</strong>'
  },
  fit: {
    eyebrow: 'Si tenc càncer o he passat un càncer',
    titlePrefix: 'Com sé si',
    titleHighlight: 'el programa és per a mi?',
    yesTitle: 'Això encaixa amb tu si...',
    noTitle: 'Això <span class="font-bold">NO</span> encaixa amb tu si...',
    yesItems: [
      'T’han dit que t’aniria bé fer exercici, però no saps ben bé per on començar.',
      'Et notes amb menys força, menys energia o més inseguretat des del diagnòstic i els tractaments.',
      'Vols recuperar <em>coses normals</em> com: pujar escales, dur la compra o jugar amb els teus fills/nets.',
      'Cerques una guia clara i un seguiment real per no anar a cegues.'
    ],
    noItems: [
      'Cerques sessions soltes sense implicar-te en el que fas fora d’elles.',
      'No vols reservar un mínim de temps al dia per moure’t pel teu compte.',
      'Esperes millorar sense constància, sense adaptació i sense revisar hàbits.',
      'Prefereixes una solució passiva en lloc de participar en el teu procés.'
    ]
  },
  doubtCta: {
    text: 'Encara dubtes de si podem ajudar-te?',
    cta: 'Explica’ns el teu cas'
  },
  slogan2: {
    topHtml:
      "La teva <strong>salut</strong> i el teu <strong>temps</strong> són el <br class='parallax-mobile-break' /><strong>més valuós</strong> que tens.",
    bottomHtml:
      'Amb el nostre programa <strong>Empenta</strong>, cuidaràs <strong>AMBDÓS.</strong>'
  },
  faq: {
    eyebrow: 'Preguntes freqüents',
    titleHighlight: 'Dubtes habituals',
    titleRest: 'sobre',
    titleProgram: 'el nostre programa',
    bottomText: 'Encara tens dubtes?',
    bottomCta: 'Escriu-nos',
    faqs: [
      {
        q: 'És segur <strong>fer exercici</strong> durant el tractament del càncer (quimioteràpia o radioteràpia)?',
        a: [
          'En la majoria de casos, <strong>sí.</strong> Fer exercici durant el tractament oncològic pot ser segur quan està <strong>adaptat</strong> a la teva situació, als teus símptomes i al moment del teu tractament.',
          'Per això a Empenta no treballam amb pautes genèriques. Primer <strong>valoram el teu cas</strong>, entenem com estàs i <strong>ajustam l’exercici a tu, no tu a l’exercici.</strong>',
          'La idea no és exigir-te més perquè sí, sinó ajudar-te a <strong>moure’t amb criteri i seguretat, perquè l’exercici sumi</strong> dins el procés en lloc de convertir-se en una càrrega més.',
          'Si aquest és un dels dubtes que et frena, podem orientar-te abans de començar.'
        ],
        cta: 'Vull saber si això encaixa amb mi',
        icon: icons.shield
      },
      {
        q: 'L’exercici em pot ajudar amb la <strong>fatiga oncològica?</strong>',
        a: [
          'Sí. L’exercici adaptat pot ajudar moltes persones amb càncer a gestionar millor la <strong>fatiga oncològica</strong>, especialment quan s’ajusta al seu nivell d’energia, als seus símptomes i al moment del tractament.',
          'La fatiga oncològica no és simplement estar cansat. A vegades apareix encara que hagis descansat, i pot fer que <strong>tasques normals</strong> —caminar, dutxar-te, sortir de casa o pujar unes escales— se sentin <strong>més pesades de l’habitual.</strong>',
          'No significa que el cansament desaparegui de cop, ni que tots els dies t’hagis de sentir igual. Però amb una pauta ben ajustada, l’exercici pot ajudar-te a conservar <strong>força</strong>, tolerar millor l’<strong>esforç</strong> i sentir que recuperes una mica de <strong>control</strong> sobre el teu cos.',
          'Si la fatiga t’està limitant, podem ajudar-te a valorar per on començar.'
        ],
        cta: 'Vull orientació per començar',
        icon: icons.battery
      },
      {
        q: 'Necessit la <strong>derivació del meu oncòleg</strong> per començar aquest programa d’exercici?',
        a: [
          'No és necessari. L’important no és que el teu oncòleg conegui el nom del programa, sinó que l’exercici estigui ben adaptat a la teva situació clínica real.',
          'A la valoració inicial <strong>revisam la informació mèdica</strong> que tenguis disponible: informes, analítiques, PET-TAC, electrocardiogrames, proves recents, medicació i indicacions específiques del teu equip mèdic.',
          'Empenta no va per lliure. Quan sigui necessari i possible, i sempre amb la teva autorització, <strong>podem coordinar-nos amb el teu oncòleg/òloga per compartir la teva evolució</strong> i ajustar millor el pla segons el moment del tractament: quimioteràpia, immunoteràpia, radioteràpia o cirurgia.',
          'La idea és formar un petit <strong>equip al teu voltant</strong>: que oncologia tengui informació útil sobre la teva evolució i que nosaltres puguem adaptar l’exercici al que estigui passant en el teu tractament.',
          'Si vols que revisem la teva situació abans de començar, ho pots veure {{reviewLink}}.'
        ],
        icon: icons.clipboard
      },
      {
        q: 'L’exercici físic <strong>substitueix el tractament mèdic</strong> contra el càncer?',
        a: [
          'No. Empenta no substitueix l’oncologia ni la medicació, la quimioteràpia, la radioteràpia, la cirurgia, la immunoteràpia ni cap tractament indicat pel teu equip mèdic.',
          'No es tracta d’escollir entre tractament mèdic o exercici. Es tracta d’<strong>unir forces contra el càncer.</strong>',
          'El tractament oncològic es dirigeix contra la malaltia. L’exercici adaptat cerca <strong>ajudar-te a cuidar la resta</strong>: els teus músculs, la teva energia, la teva mobilitat, el teu sistema immune, el teu metabolisme, la teva tolerància a l’esforç i la teva autonomia.',
          'La idea és <strong>crear sinergia.</strong> Que el tractament mèdic faci la seva part contra el càncer i que l’exercici —juntament amb altres pilars com la nutrició, el descans, la gestió emocional i la reducció de tòxics— ajudi que el teu cos arribi al procés en les millors condicions possibles dins la teva situació.',
          'Si vols saber com et podríem ajudar sense interferir amb el teu tractament, ens pots escriure {{writeLink}}.'
        ],
        icon: icons.people
      },
      {
        q: 'La valoració és <strong>presencial</strong> o tot és <strong>online?</strong>',
        a: [
          '<strong>La valoració inicial</strong> la feim <strong>de manera presencial</strong> a ca teva, per conèixer-te bé abans de pautar exercici. En aquesta primera visita revisam la teva situació, els teus símptomes, les teves limitacions, el moment del procés oncològic i el teu punt de partida físic.',
          'Després, el <strong>seguiment del programa</strong> és principalment <strong>online</strong>. Això ens permet ajustar millor l’exercici a la teva energia, als teus símptomes i als teus horaris, sense afegir més desplaçaments innecessaris.',
          'Molta gent pensa que online significa distant. A Empenta ho usam just per al contrari: per poder estar més pendents de <strong>com evoluciones entre una visita i una altra.</strong>',
          'Abans de començar, t’explicam com seria el procés en el teu cas.'
        ],
        cta: 'Vull que m’expliqueu el procés',
        icon: icons.home
      },
      {
        q: 'I si tenc <strong>dubtes</strong> o no se’m dona bé la <strong>tecnologia?</strong>',
        a: [
          '<strong>No estaràs sol/a.</strong> Durant el procés tendràs acompanyament per resoldre dubtes, ajustar l’exercici i revisar com vas evolucionant.',
          'Si no saps si estàs fent bé un exercici, si una setmana tens més fatiga, si apareix algun dolor o si alguna cosa et preocupa, <strong>no t’has de quedar amb el dubte.</strong>',
          'I si la tecnologia no se’t dona bé, tampoc passa res. T’ho explicam <strong>pas a pas</strong> i usam <strong>eines senzilles.</strong> No necessites dominar cap aplicació per poder començar. I si al principi necessites que t’ajudi un familiar, pot participar sense cap problema.',
          'La part online no està pensada per complicar-te la vida, sinó per <strong>acompanyar-te millor sense obligar-te a desplaçar-te més.</strong>',
          'Si aquesta és una de les coses que et frena, ho veim amb tu des del principi.'
        ],
        cta: 'Vull resoldre els meus dubtes',
        icon: icons.chat
      },
      {
        q: 'Puc fer exercici si tenc <strong>metàstasi, dolor o anèmia</strong> pel càncer?',
        a: [
          '<strong>Precisament per això no donam pautes genèriques.</strong>',
          'Si tens dolor, anèmia, metàstasis òssies, una baixada important de defenses, neuropatia o altres efectes secundaris del tractament, l’exercici no s’elimina automàticament, però sí que <strong>s’ha d’adaptar amb més precisió.</strong>',
          'En alguns casos caldrà baixar la intensitat. En altres, canviar el tipus d’exercici, reduir la durada, modificar posicions o evitar certs moviments. I en moments concrets, pot tenir sentit pausar, prioritzar mobilitat suau o centrar-nos només a mantenir activitat bàsica.',
          'No es tracta de forçar ni d’entrenar passi el que passi. Es tracta de trobar la manera més <strong>segura, útil i realista</strong> de moure’t segons la teva situació actual.',
          'Si tens dubtes sobre el teu cas concret, ens pots explicar la teva situació {{situationLink}}.'
        ],
        icon: icons.gear
      },
      {
        q: '<strong>Quan he de començar a fer exercici:</strong> durant o després del tractament del càncer?',
        a: [
          'En general, si la teva situació ho permet, sol tenir més sentit <strong>començar a poc a poc durant el tractament oncològic</strong> que esperar el moment perfecte.',
          'Moltes vegades aquest moment perfecte tarda molt a arribar. I, mentrestant, poden passar setmanes o mesos en què podries haver començat a moure’t, encara que fos poc, per conservar millor la teva <strong>força, mobilitat, energia i autonomia.</strong>',
          'No es tracta de començar fort, sinó de començar amb <strong>una dosi adaptada a tu.</strong> Esperar només tendria sentit si hi ha una limitació concreta o una situació clínica que obligui a modificar el pla. Per això primer valoram el teu cas i, a partir d’aquí, decidim què té sentit per a tu.',
          'Si no saps si és bon moment per començar, ens pots demanar orientació {{askLink}}.'
        ],
        icon: icons.hourglass
      },
      {
        q: 'Què passa si <strong>mai he fet exercici</strong> i em diagnostiquen càncer?',
        a: [
          'No passa res. Empenta també està pensat per a persones que <strong>mai han fet exercici</strong> o que fa molt de temps que no es mouen.',
          'Moltes vegades el problema no és la falta de ganes, sinó no saber <strong>què fer, quant fer o com començar sense por.</strong> I quan tot sembla massa confús, és fàcil bloquejar-se i acabar sense fer res.',
          'Per això no cercam que ho facis perfecte des del primer dia. Primer entenem el teu punt de partida, t’explicam com funciona tot i començam amb <strong>una dosi assumible per a tu.</strong>',
          'Si parteixes de zero, ens pots contar el teu cas {{caseLink}} i veim si aquest programa encaixa amb tu.'
        ],
        icon: icons.steps
      },
      {
        q: 'Què passa si una setmana <strong>em trob pitjor?</strong>',
        a: [
          'Si una setmana et trobes pitjor, <strong>ens avises i ajustam el pla.</strong> No has d’esperar a la següent cita per saber què fer, què reduir o què evitar.',
          'Durant el tractament hi ha setmanes millors i setmanes més difícils. Per això l’exercici <strong>no pot ser rígid.</strong>',
          'Si tens més fatiga, dolor, mal descans, efectes secundaris o menys energia, baixam la càrrega, modificam els exercicis o canviam l’objectiu d’aquella setmana. <strong>Ja tornarem a progressar quan el teu cos estigui preparat.</strong>',
          'La idea no és que tu encaixis en una rutina tancada, sinó que <strong>el pla encaixi amb tu.</strong> El nostre objectiu és que puguis continuar avançant sense sentir que estàs fallant cada vegada que tens una setmana complicada.'
        ],
        cta: 'Vull saber com seria el meu pla',
        icon: icons.refresh
      }
    ]
  }
};

const enProgram = {
  meta: {
    title: 'EIMA | How Empenta works',
    description:
      'Specialist oncology physiotherapy and physical exercise at home in Mallorca. A 12-week Empenta programme with guided exercise and continuous online support.',
    ogTitle: 'How Empenta works | EIMA Fisioterapia',
    ogDescription:
      'We help people with cancer recover vitality and reduce the impact of side effects with adapted exercise at home.',
    imageAlt: 'EIMA Fisioterapia - Empenta oncology exercise programme'
  },
  hero: {
    eyebrow:
      'Home-based oncology physiotherapy and exercise support in Mallorca.',
    srTitle:
      'Specialist oncology physiotherapy and physical exercise service at home in Mallorca. Fewer side effects during and after cancer',
    phrases: ['More vitality', 'More strength', 'Fewer side effects'],
    line1: 'during and after',
    line2: 'cancer',
    desktopParagraph: [
      'We help people with cancer rebuild strength, energy and confidence',
      'through a <strong class="font-semibold">12-week programme</strong> adapted to their treatment,',
      'symptoms and daily life.'
    ],
    mobileParagraph:
      'We help people with cancer rebuild strength, energy and confidence through a <strong class="font-semibold">12-week programme</strong> adapted to their treatment, symptoms and daily life.',
    cta: 'Talk to us about your situation'
  },
  steps: {
    headingPrefix: 'How',
    headingHighlight: 'Empenta',
    headingSuffix: 'works',
    intro:
      'A 12-week process so you do not have to improvise what to do, how much to do, or keep wondering all the time whether you are doing it right or not.',
    badge: '12-week programme',
    sideParagraphs: [
      'We do not work through isolated sessions. <strong>It is a structured support process</strong> to help you start or return to exercise safely.',
      'We assess your starting point, build a progressive plan and adapt it as your body changes.'
    ],
    items: [
      {
        number: '1',
        title: 'We listen first',
        body:
          'We start with a <strong>short phone call</strong> to understand your situation and see whether Empenta can truly help you. If it is, we’ll send you a short form so we can understand the <strong>key details before we begin</strong>.',
        icon: 'call'
      },
      {
        number: '2',
        title: 'Initial assessment at your home',
        body:
          'We visit you at home to understand your situation properly and <strong>assess your starting point</strong>. We review your medical history, symptoms, treatment stage (chemotherapy, radiotherapy, immunotherapy, post-surgery, etc.) and current physical capacity so the <strong>plan is built around you from the start</strong>.',
        icon: 'home'
      },
      {
        number: '3',
        title: 'We set you up properly before you begin',
        body:
          'Before the first real week, the goal is not perfection. We explain <strong>how the programme works</strong>, how to use the app and how to start gradually, so you feel ready for the first week.',
        icon: 'phone'
      },
      {
        number: '4',
        title: 'Your tailored plan begins',
        body:
          'We design an exercise plan tailored to your current situation. We prioritise a level that feels manageable for you. We adapt it according to <strong>your tolerance, symptoms and progress</strong>.',
        icon: 'checklist'
      },
      {
        number: '5',
        title: 'We track, adapt and support you',
        body:
          'Throughout the programme, we provide <strong>online follow-up</strong>, adjust your plan based on how you feel and track your progress with clear criteria. With your permission, we can <strong>share useful progress updates</strong> with your oncologist or medical team.',
        icon: 'support'
      }
    ],
    closing:
      'Your <strong>body changes</strong> week by week. Your <strong>plan</strong> should too.',
    cta: 'Tell us what’s going on'
  },
  slogan1: {
    topHtml: 'Medicine will focus on helping you live <strong>LONGER.</strong>',
    bottomHtml: '<strong>We</strong> focus on helping you live <strong>BETTER.</strong>'
  },
  fit: {
    eyebrow: 'If I have or have had cancer',
    titlePrefix: 'How do I know if this',
    titleHighlight: 'programme is for me?',
    yesTitle: 'This is right for you if...',
    noTitle: 'This <span class="font-bold">is NOT</span> right for you if...',
    yesItems: [
      'You feel weaker, more tired or less confident since diagnosis or treatment.',
      'You want to get back to everyday things like: climbing stairs, carrying shopping bags or playing with your children or grandchildren.',
      'You want clear guidance and real support, instead of guessing on your own.'
    ],
    noItems: [
      'You’re only looking for occasional sessions and don’t want to do anything between them.',
      'You don’t want to set aside a small amount of time to move on your own.',
      'You expect progress without consistency, adaptation or follow-up.',
      'You prefer a passive fix rather than taking part in your recovery.'
    ]
  },
  doubtCta: {
    text: 'Still unsure whether Empenta is right for you?',
    cta: 'Tell us what’s going on'
  },
  slogan2: {
    topHtml:
      "Your <strong>health</strong> and your <strong>time</strong> are the <br class='parallax-mobile-break' /><strong>most valuable</strong> things you have.",
    bottomHtml:
      'With our <strong>Empenta Programme</strong>, you will take care of <strong>BOTH.</strong>'
  },
  faq: {
    eyebrow: 'Frequently asked questions',
    titleHighlight: 'Common questions',
    titleRest: 'about',
    titleProgram: 'our Programme',
    bottomText: 'Still have questions?',
    bottomCta: 'Write to us',
    faqs: [
      {
        q: 'Is it <strong>safe to exercise</strong> during chemotherapy or radiotherapy?',
        a: [
          'In most cases, <strong>yes.</strong> Exercising during cancer treatment can be safe when it is <strong>adapted</strong> to your situation, your symptoms and the stage of your treatment.',
          'That’s why Empenta does not use generic exercise plans. First, we <strong>assess your situation</strong>, understand how you are and <strong>build the exercise around you.</strong>',
          'The goal is not to push you harder for the sake of it, but to help you <strong>move with clarity and safety</strong>, so exercise supports the process instead of becoming another burden.',
          'If this doubt is holding you back, we can guide you before you start.'
        ],
        cta: 'I want to know if this is right for me',
        icon: icons.shield
      },
      {
        q: 'Can exercise help me with <strong>cancer-related fatigue?</strong>',
        a: [
          'Yes. Adapted exercise can help many people manage <strong>cancer-related fatigue</strong> better, especially when it is adjusted to their energy level, symptoms and treatment stage.',
          'Cancer-related fatigue is not the same as normal tiredness. Sometimes it appears even after you have rested, and it can make <strong>normal tasks</strong> - walking, showering, leaving the house or climbing stairs - feel <strong>heavier than usual.</strong>',
          'It doesn’t mean the fatigue will disappear overnight, or that every day will feel the same. With a well-adjusted plan, exercise can help you preserve <strong>strength</strong>, tolerate <strong>effort</strong> better and regain a sense of <strong>control</strong> over your body.',
          'If fatigue is limiting you, we can help you find a safe starting point.'
        ],
        cta: 'I want guidance to get started',
        icon: icons.battery
      },
      {
        q: 'Do I need a <strong>referral from my oncologist</strong> to start this exercise programme?',
        a: [
          'No. It is not necessary. What matters is not whether your oncologist knows Empenta, but whether the exercise is properly adapted to your real clinical situation.',
          'In the initial assessment, <strong>we review the medical information</strong> you have available: reports, blood tests, PET-CT, electrocardiograms, recent tests, medication and specific instructions from your medical team.',
          'Empenta does not work in isolation. When needed, and always with your permission, <strong>we can coordinate with your oncologist or medical team</strong> to share your progress and better adjust the plan according to the treatment stage: chemotherapy, immunotherapy, radiotherapy or surgery.',
          'The idea is to build a small <strong>team around you</strong>: so oncology has useful information about your progress and we can adapt the exercise to what is happening in your treatment.',
          'If you want us to review your situation before starting, you can do it {{reviewLink}}.'
        ],
        icon: icons.clipboard
      },
      {
        q: 'Does physical exercise <strong>replace medical treatment</strong> for cancer?',
        a: [
          'No. Empenta does not replace oncology or medication, chemotherapy, radiotherapy, surgery, immunotherapy or any treatment indicated by your medical team.',
          'It is not about choosing between medical treatment or exercise. It is about <strong>joining forces against cancer.</strong>',
          'Medical treatment targets the disease. Adapted exercise helps you <strong>take care of the rest</strong>: your muscles, your energy, your mobility, your immune system, your metabolism, your tolerance to effort and your autonomy.',
          'The idea is to <strong>create synergy.</strong> Let medical treatment do its part against cancer while exercise - together with other pillars such as nutrition, rest, emotional management and reducing toxins - helps your body reach the process in the best possible condition within your situation.',
          'If you want to know how we could help without interfering with your treatment, you can write to us {{writeLink}}.'
        ],
        icon: icons.people
      },
      {
        q: 'Is the assessment <strong>in person</strong> or is everything <strong>online?</strong>',
        a: [
          '<strong>The initial assessment</strong> is done <strong>in person</strong> at your home, so we can get to know you well before prescribing exercise. In that first visit we review your situation, your symptoms, your limitations, the stage of the cancer process and your physical starting point.',
          'Afterwards, the <strong>programme follow-up</strong> is mainly <strong>online</strong>. This allows us to adjust your exercise around your energy, symptoms and schedule, without adding unnecessary travel.',
          'Many people think online means distant. In Empenta, we use it for the opposite reason: to follow you more closely between visits.',
          'Before starting, we explain what the process would look like in your case.'
        ],
        cta: 'Show me the process',
        icon: icons.home
      },
      {
        q: 'What if I have <strong>questions</strong> or I’m not confident with <strong>technology?</strong>',
        a: [
          '<strong>You won’t be left on your own.</strong> During the process you will have support to resolve doubts, adjust the exercise and review how you are progressing.',
          'If you’re unsure whether you’re doing an exercise correctly, if fatigue increases, if pain appears or if something worries you, <strong>you don’t have to keep it to yourself.</strong>',
          'And if technology is not your thing, that’s completely fine. We explain it <strong>step by step</strong> and use <strong>simple tools.</strong> You don’t need to master any app to get started.',
          'The online part is not designed to complicate your life, but to <strong>support you better without forcing you to travel more.</strong>',
          'If this is holding you back, we’ll look at it with you from the beginning.'
        ],
        cta: 'I want to resolve my doubts',
        icon: icons.chat
      },
      {
        q: 'Can I exercise if I have <strong>metastases, pain or anaemia</strong> due to cancer?',
        a: [
          '<strong>That is exactly why we do not give generic plans.</strong>',
          'If you have pain, anaemia, bone metastases, a significant drop in defences, neuropathy or other side effects of treatment, exercise is not automatically ruled out, but it <strong>must be adapted with greater precision.</strong>',
          'In some cases we will need to lower the intensity. In others, change the type of exercise, reduce duration, modify positions or avoid certain movements. At certain times, it may make sense to pause, prioritise gentle mobility or focus only on basic activity.',
          'It is not about forcing yourself to train no matter what. It is about finding the <strong>safest, most useful and most realistic</strong> way to move according to your current situation.',
          'If you have doubts about your specific case, you can explain your situation to us {{situationLink}}.'
        ],
        icon: icons.gear
      },
      {
        q: '<strong>When should I start exercising:</strong> during or after cancer treatment?',
        a: [
          'In general, if your situation allows it, it usually makes more sense to <strong>start gradually during cancer treatment</strong> than to wait for the perfect moment.',
          'That perfect moment often takes a long time to arrive.',
          'It is not about starting hard, but about starting with <strong>a dose adapted to you.</strong> Waiting only makes sense if there is a specific clinical reason to adapt or delay the plan. That is why we first assess your case and, from there, decide what makes sense for you.',
          'If you do not know whether it is a good time to start, you can ask us {{askLink}}.'
        ],
        icon: icons.hourglass
      },
      {
        q: 'What happens if I have <strong>never exercised</strong> and I am diagnosed with cancer?',
        a: [
          'That’s completely fine. Empenta is also designed for people who <strong>have never exercised</strong> or have not moved much for a long time.',
          'Often, the problem is not a lack of motivation, but not knowing <strong>what to do, how much to do or how to start without fear.</strong> When everything feels confusing, it is easy to freeze and end up doing nothing.',
          'That is why we are not looking for perfection from day one. First we understand your starting point, explain how everything works and start with <strong>a dose that is manageable for you.</strong>',
          'If you’re starting from zero, tell us what’s going on {{caseLink}} and we’ll see whether Empenta is right for you.'
        ],
        icon: icons.steps
      },
      {
        q: 'What happens if one week <strong>I feel worse?</strong>',
        a: [
          'If one week you feel worse, <strong>let us know and we’ll adjust the plan.</strong> You do not have to wait until the next appointment to know what to do, what to reduce or what to avoid.',
          'During treatment, some weeks are better and some are more difficult. That’s why exercise <strong>cannot be rigid.</strong>',
          "If you have more fatigue, pain, poor sleep, side effects or less energy, we lower the load, modify the exercises or change that week’s goal. <strong>We will progress again when your body is ready.</strong>",
          'The idea is not for you to fit into a fixed routine, but for <strong>the plan to fit you.</strong> Our goal is to help you keep moving forward without feeling that you’ve failed every time you have a difficult week.'
        ],
        cta: 'See what my plan could look like',
        icon: icons.refresh
      }
    ]
  }
};

const programByLanguage = {
  es: esProgram,
  ca: caProgram,
  en: enProgram
};

export function getProgramCopy(language: Language) {
  return programByLanguage[language] ?? esProgram;
}
