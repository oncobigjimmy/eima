import type { Language } from './copy';

// Copy for the approved shared layouts. HTML is authored here, never supplied by visitors.
export const homeSections = {
  es: {
    vslBefore: 'Te explicamos cómo funciona', vslAfter: '', programme: 'Nuestro programa de ejercicio para personas con cáncer en Mallorca',
    posterFirst: 'Así funciona', posterMiddle: 'el programa', posterDescription: 'Qué ejercicio hacer, cuánto y cómo<br class="poster-desktop-break" /> adaptarlo durante tus tratamientos.',
    peopleAlt: 'Jaume y Miquel, fisioterapeutas de EIMA SALUT', phoneAlt: 'Móvil con la agenda de ejercicios de la app del cliente', play: 'Conoce cómo funciona Empenta',
    situationTitle: '¿Te ves reflejado/a en alguna<br class="desktop-only-break" /> de <span>estas situaciones?</span>',
    situationIntro: 'Quizá tu cuerpo ya no responde como antes, o <strong>tu oncólogo/a te ha recomendado moverte</strong>, pero no sabes qué hacer ni cuánto.',
    situations: ['“Nunca he hecho ejercicio y no sabría por dónde empezar.”', '“Ya hago ejercicio, pero no sé cómo adaptarlo ahora al tratamiento.”', '“Quiero moverme, pero la fatiga, el dolor o el miedo a pasarme me frenan.”'],
    situationClosing: 'Sea cual sea tu punto de partida, primero necesitamos entender tu situación.',
    recoveryTitle: '¿Qué queremos que <span>consigas?</span>', recoverySubtitle: 'Las <strong>3R</strong> de tu recuperación',
    firstGoalBody: 'Buscamos que te muevas con menos fatiga, menos rigidez, menos miedo y más sensación de control sobre tu cuerpo y tu rutina del día a día.',
    thirdGoalSubtitle: 'con confianza lo importante para ti', thirdGoalBody: 'Poco a poco, buscamos que vuelvas a hacer con más seguridad esas actividades que ahora te cuestan, te cansan o te generan dudas.'
  },
  ca: {
    vslBefore: 'T’explicam com funciona', vslAfter: '', programme: 'El nostre programa d’exercici per a persones amb càncer a Mallorca',
    posterFirst: 'Així funciona', posterMiddle: 'el programa', posterDescription: 'Quin exercici fer, quant i com<br class="poster-desktop-break" /> adaptar-lo als teus tractaments.',
    peopleAlt: 'Jaume i Miquel, fisioterapeutes d’Eima Salut', phoneAlt: 'Mòbil amb l’agenda d’exercicis de l’app del client', play: 'Coneix com funciona Empenta',
    situationTitle: 'Et veus reflectit/ida en alguna<br class="desktop-only-break" /> <span>d’aquestes situacions?</span>',
    situationIntro: 'Potser el teu cos ja no respon com abans, o <strong>el teu oncòleg/òloga t’ha recomanat moure’t</strong>, però no saps què fer ni quant.',
    situations: ['“Mai he fet exercici i no sabria per on començar.”', '“Ja faig exercici, però no sé com adaptar-lo ara al tractament.”', '“Vull moure’m, però la fatiga, el dolor o la por de passar-me em frenen.”'],
    situationClosing: 'Sigui quin sigui el teu punt de partida, primer necessitam entendre la teva situació.',
    recoveryTitle: 'Què volem que <span>aconsegueixis?</span>', recoverySubtitle: 'Les <strong>3R</strong> de la teva recuperació',
    firstGoalBody: 'Cercam que et moguis amb menys fatiga, menys rigidesa, menys por i més sensació de control sobre el teu cos i la teva rutina del dia a dia.',
    thirdGoalSubtitle: 'amb confiança allò que és important per a tu', thirdGoalBody: 'A poc a poc, cercam que tornis a fer amb més seguretat aquelles activitats que ara et costen, et cansen o et generen dubtes.'
  },
  en: {
    vslBefore: 'We explain how', vslAfter: ' works', programme: 'Our exercise programme for people with cancer in Mallorca',
    posterFirst: 'How it works', posterMiddle: 'the programme', posterDescription: 'What exercise to do, how much and how<br class="poster-desktop-break" /> to adapt it during your treatments.',
    peopleAlt: 'Jaume and Miquel, Eima Salut physiotherapists', phoneAlt: 'Phone showing the client app’s exercise agenda', play: 'Discover how Empenta works',
    situationTitle: 'Do you recognise yourself in<br class="desktop-only-break" /> <span>any of these situations?</span>',
    situationIntro: 'Perhaps your body no longer responds as it used to, or <strong>your oncologist has recommended moving more</strong>,<br class="desktop-only-break" /> but you don’t know what to do or how much.',
    situations: ['“I’ve never exercised and wouldn’t know where to start.”', '“I already exercise, but don’t know how to adapt it to treatment now.”', '“I want to move, but fatigue, pain or fear of overdoing it hold me back.”'],
    situationClosing: 'Whatever your starting point, we first need to understand your situation.',
    recoveryTitle: 'What do we want you to <span>achieve?</span>', recoverySubtitle: 'The <strong>3Rs</strong> of your recovery',
    firstGoalBody: 'We want you to move with less fatigue, less stiffness, less fear and a greater sense of control over your body and your daily routine.',
    thirdGoalSubtitle: 'with confidence to what matters to you', thirdGoalBody: 'Step by step, we want you to return more safely to the activities that now feel difficult, tiring or uncertain.'
  }
};

export const aboutSections = {
  es: {
    title: ['Dos <span class="about-blue">fisioterapeutas.</span>', 'Una misma forma de <span class="about-blue">acompañarte.</span>'],
    hint: 'Haz clic en uno de nosotros para conocer su historia.', view: 'Conoce la historia de',
    bannerTop: 'El <strong>cáncer</strong> puede cambiar tus planes.', bannerBottom: 'Queremos ayudarte a que <strong>no pare tu vida por completo.</strong>',
    originTitle: '¿De dónde nace <span>Eima Salut?</span>',
    intro: 'Trabajando con personas con cáncer vimos que <strong>el problema no era saber<br class="origin-intro-break" /> que había que moverse.</strong> El problema era todo lo que venía después.',
    conclusion: '<strong>Por eso creamos Eima Salut:</strong> para ayudarte a saber qué hacer, adaptarlo cuando sea necesario y conseguir que forme parte de tu vida.',
    sunsetAlt: 'Atardecer junto al mar en Mallorca',
    cards: [
      { titleLines: ['Te dicen que hagas ejercicio,', 'pero no te explican cómo'], body: 'En una consulta hay muchas decisiones que tomar y <strong>no siempre hay tiempo para explicar</strong> qué ejercicio hacer, cuánto o cómo adaptarlo a tu situación.' },
      { titleLines: ['Lo que te va bien hoy', 'puede cambiar mañana'], body: 'Fatiga, dolor, cirugía o nuevos síntomas pueden hacer que lo que te iba bien una semana <strong>ya no te sirva igual</strong> la siguiente.' },
      { titleLines: ['Las dudas no aparecen', 'solo en consulta'], body: '<em>“¿Esto es normal?”</em>, <em>“¿me estoy pasando?”</em>, <em>“¿debería hacer más?”</em> Muchas preguntas aparecen en casa, <strong>cuando toca decidir qué hacer</strong>.' },
      { titleLines: ['El miedo a hacerte daño', 'te acaba frenando'], body: 'Después de una operación o durante el tratamiento es normal tener miedo. El problema es que ese miedo muchas veces <strong>te frena más de la cuenta</strong>.' },
      { titleLines: ['No basta con saber', 'lo que tienes que hacer'], body: 'Lo difícil no es solo tener una pauta. Lo difícil es <strong>llevarla a tu día a día</strong>, entenderla bien y mantenerla cuando la vida se complica.' },
      { titleLines: ['Sin apoyo, es fácil', 'dejarlo para otro día'], body: 'Cuando la vida aprieta, el ejercicio suele ser de lo primero que se cae. Por eso acompañarlo bien <strong>también forma parte del proceso</strong>.' }
    ]
  },
  ca: {
    title: ['Dos <span class="about-blue">fisioterapeutes.</span>', 'Una mateixa manera <span class="about-blue">d’acompanyar-te.</span>'],
    hint: 'Fes clic en un de nosaltres per conèixer la seva història.', view: 'Coneix la història de',
    bannerTop: 'El <strong>càncer</strong> pot canviar els teus plans.', bannerBottom: 'Volem ajudar-te perquè <strong>no aturi la teva vida del tot.</strong>',
    originTitle: 'D’on neix <span>Eima Salut?</span>',
    intro: 'Treballant amb persones amb càncer vàrem veure que <strong>el problema no era saber<br class="origin-intro-break" /> que calia moure’s.</strong> El problema era tot el que venia després.',
    conclusion: '<strong>Per això vàrem crear Eima Salut:</strong> per ajudar-te a saber què fer, adaptar-ho quan sigui necessari i aconseguir que formi part de la teva vida.',
    sunsetAlt: 'Posta de sol devora la mar a Mallorca',
    cards: [
      { titleLines: ['Et diuen que facis exercici,', 'però no t’expliquen com'], body: 'En una consulta hi ha moltes decisions a prendre i <strong>no sempre hi ha temps d’explicar</strong> quin exercici fer, quant o com adaptar-lo a la teva situació.' },
      { titleLines: ['El que avui et va bé', 'pot canviar demà'], body: 'Fatiga, dolor, cirurgia o nous símptomes poden fer que el que t’anava bé una setmana <strong>ja no et serveixi igual</strong> la següent.' },
      { titleLines: ['Els dubtes no apareixen', 'només a la consulta'], body: '<em>“Això és normal?”</em>, <em>“m’estic passant?”</em>, <em>“hauria de fer més?”</em> Moltes preguntes apareixen a casa, <strong>quan toca decidir què fer</strong>.' },
      { titleLines: ['La por de fer-te mal', 't’acaba frenant'], body: 'Després d’una operació o durant el tractament és normal tenir por. El problema és que aquesta por sovint <strong>et frena més del compte</strong>.' },
      { titleLines: ['No basta saber', 'què has de fer'], body: 'El més difícil no és només tenir una pauta. És <strong>dur-la al teu dia a dia</strong>, entendre-la bé i mantenir-la quan la vida es complica.' },
      { titleLines: ['Sense suport, és fàcil', 'deixar-ho per un altre dia'], body: 'Quan la vida apreta, l’exercici sol ser de les primeres coses que cauen. Per això acompanyar-lo bé <strong>també forma part del procés</strong>.' }
    ]
  },
  en: {
    title: ['Two <span class="about-blue">physiotherapists.</span>', 'One shared way of <span class="about-blue">supporting you.</span>'],
    hint: 'Click on either of us to discover his story.', view: 'Discover the story of',
    bannerTop: '<strong>Cancer</strong> can change your plans.', bannerBottom: 'We want to help you <strong>keep your life from coming to a complete stop.</strong>',
    originTitle: 'How did <span>Eima Salut begin?</span>',
    intro: 'Working with people with cancer, we saw that <strong>the problem wasn’t knowing<br class="origin-intro-break" /> that they needed to move.</strong> It was everything that came afterwards.',
    conclusion: '<strong>That’s why we created Eima Salut:</strong> to help you know what to do, adapt it when needed and make it part of your life.',
    sunsetAlt: 'Sunset by the sea in Mallorca',
    cards: [
      { titleLines: ['You’re told to exercise,', 'but aren’t told how'], body: 'There are many decisions to make in a consultation and <strong>not always time to explain</strong> what exercise to do, how much or how to adapt it to your situation.' },
      { titleLines: ['What works well today', 'may change tomorrow'], body: 'Fatigue, pain, surgery or new symptoms can mean that what worked one week <strong>no longer works as well</strong> the next.' },
      { titleLines: ['Questions don’t arise', 'only in consultations'], body: '<em>“Is this normal?”</em>, <em>“am I overdoing it?”</em>, <em>“should I do more?”</em> Many questions come up at home, <strong>when it’s time to decide what to do</strong>.' },
      { titleLines: ['Fear of hurting yourself', 'holds you back'], body: 'After surgery or during treatment, feeling afraid is normal. The problem is that this fear often <strong>holds you back more than it should</strong>.' },
      { titleLines: ['Knowing what to do', 'isn’t enough'], body: 'The challenge isn’t just having a plan. It’s <strong>fitting it into daily life</strong>, understanding it and keeping it up when life gets complicated.' },
      { titleLines: ['Without support,', 'it’s easy to put it off'], body: 'When life gets busy, exercise is often one of the first things to slip. That’s why good support <strong>is also part of the process</strong>.' }
    ]
  }
};

export const contactLayout: Record<Language, { lines: string[]; intro: string[] }> = {
  es: { lines: ['¿Listo/a para <span class="contact-title__accent">tomar</span>', '<span class="contact-title__accent">las riendas</span> de', 'tu salud?'], intro: ['Si tienes dudas, escríbenos o llámanos <strong>de forma totalmente</strong><br class="desktop-break" /> <strong>gratuita.</strong>', 'Cuéntanos tu caso y te diremos <strong>con total</strong><br class="desktop-break" /> <strong>honestidad</strong> si podemos ayudarte.'] },
  ca: { lines: ['Preparat/ada per', '<span class="contact-title__accent">agafar les regnes</span>', 'de la teva salut?'], intro: ['Si tens dubtes, escriu-nos o telefona’ns <strong>de manera totalment</strong><br class="desktop-break" /> <strong>gratuïta.</strong>', 'Conta’ns el teu cas i et direm <strong>amb total</strong><br class="desktop-break" /> <strong>honestedat</strong> si et podem ajudar.'] },
  en: { lines: ['Ready to <span class="contact-title__accent">take</span>', '<span class="contact-title__accent">control</span> of', 'your health?'], intro: ['If you have questions, write to us or call us <strong>completely</strong><br class="desktop-break" /> <strong>free of charge.</strong>', 'Tell us about your situation and we’ll tell you<br class="desktop-break" /> <strong>with complete honesty</strong> whether we can help.'] }
};
