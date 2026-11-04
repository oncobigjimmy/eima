import { writable } from 'svelte/store';
import type { Language } from '$lib/i18n/copy';

export type Situation = 'A' | 'B' | 'C' | 'D';
export const selectedSituation = writable<Situation | null>(null);
export const situationMessages: Record<Language, Record<Situation, string>> = {
  es: {
    A: 'Nunca he hecho ejercicio y no sabría por dónde empezar.',
    B: 'Hacía ejercicio, pero ahora no sé cómo adaptarlo al tratamiento.',
    C: 'Quiero moverme, pero la fatiga, el dolor o el miedo me frenan.',
    D: 'He terminado el tratamiento, pero todavía no me siento como antes.'
  },
  // TODO [CA-revisar]: revisar las frases personalizadas.
  ca: {
    A: 'Mai he fet exercici i no sabria per on començar.',
    B: 'Feia exercici, però ara no sé com adaptar-lo al tractament.',
    C: "Vull moure'm, però la fatiga, el dolor o la por em frenen.",
    D: "He acabat el tractament, però encara no em sent com abans."
  },
  en: {
    A: 'I have never exercised and would not know where to start.',
    B: 'I used to exercise, but now I do not know how to adapt it to treatment.',
    C: 'I want to move, but fatigue, pain or fear hold me back.',
    D: 'I have finished treatment, but I still do not feel like I did before.'
  }
};

/** Called only on the client; session state never leaks between SSR requests. */
export function restoreSituation() {
  try {
    const saved = sessionStorage.getItem('eima-situacion');
    selectedSituation.set(saved === 'A' || saved === 'B' || saved === 'C' || saved === 'D' ? saved : null);
  } catch { selectedSituation.set(null); }
  return selectedSituation.subscribe(value => {
    try {
      if (value) sessionStorage.setItem('eima-situacion', value);
      else sessionStorage.removeItem('eima-situacion');
    } catch { /* The site also works when storage is unavailable. */ }
  });
}

// TODO [CA-revisar]: revisar indicaciones y pastillas.
export const situationCopy = {
  es: { labels: ['Nunca he hecho ejercicio', 'Ya hacía ejercicio', 'Los síntomas me frenan', 'Después del tratamiento'], choose: 'Elige la situación que más se parezca a la tuya', identify: 'Me identifico', selected: 'Seleccionada', hint: 'Haz clic para elegirla' },
  ca: { labels: ['Mai he fet exercici', 'Ja feia exercici', 'Els símptomes em frenen', 'Després del tractament'], choose: "Tria la situació que més s'assembli a la teva", identify: "M'hi identific", selected: 'Seleccionada', hint: 'Fes clic per triar-la' },
  en: { labels: ['I have never exercised', 'I used to exercise', 'Symptoms hold me back', 'After treatment'], choose: 'Choose the situation that feels most like yours', identify: 'This is me', selected: 'Selected', hint: 'Click to choose' }
};

// TODO [CA-revisar]: revisar las respuestas de los cuatro pop-ups.
export const situationResponseCopy = {
  es: { close: 'Cerrar', responses: {
    A: { title: 'Todos empezamos alguna vez.\nTambién está bien empezar ahora.', body: 'Si nunca has hecho ejercicio, no tienes por qué saber cómo empezar. Querer cuidarte ya es un paso importante. Cuéntanos tu caso y vemos juntos por dónde seguir.' },
    B: { title: 'Tu ejercicio puede\nadaptarse a esta etapa.', body: 'Si ya haces ejercicio, tenemos mucho terreno ganado.\nTe ayudamos a adaptarlo al tratamiento para que puedas\nseguir moviéndote según cómo te encuentres.' },
    C: { title: 'Siempre se puede empezar\npor algo pequeño.', body: 'Aunque haya limitaciones, un pequeño paso adaptado\na ti también cuenta. Cuéntanos tu caso y vemos por dónde\nempezar, para ir avanzando poco a poco.' },
    D: { title: 'Terminar el tratamiento\nno significa sentirte como antes.', body: 'Si todavía notas fatiga, has perdido fuerza o te cuesta retomar tu rutina, cuéntanos cómo estás. Vemos contigo por dónde empezar para recuperar poco a poco lo que es importante para ti.' }
  } },
  ca: { close: 'Tancar', responses: {
    A: { title: 'Tots començam alguna vegada.\nTambé està bé començar ara.', body: 'Si no has fet mai exercici, no has de saber com començar. Voler cuidar-te ja és una passa important. Explica’ns el teu cas i miram plegats per on continuar.' },
    B: { title: 'El teu exercici es pot adaptar\na aquesta etapa.', body: 'Si ja fas exercici, tenim molt de terreny guanyat.\nT’ajudam a adaptar-lo al tractament perquè puguis\ncontinuar movent-te segons com et trobis.' },
    C: { title: 'Sempre es pot començar\nper una cosa petita.', body: 'Encara que hi hagi limitacions, una passa petita\nadaptada a tu també compta. Explica’ns el teu cas i miram\nper on començar, per anar avançant a poc a poc.' },
    D: { title: 'Acabar el tractament\nno vol dir sentir-te com abans.', body: 'Si encara notes fatiga, has perdut força o et costa reprendre la rutina, explica’ns com estàs. Miram amb tu per on començar per recuperar a poc a poc allò que és important per a tu.' }
  } },
  en: { close: 'Close', responses: {
    A: { title: 'Everyone starts somewhere.\nIt is okay to start now.', body: 'If you have never exercised, you do not have to know where to start. Wanting to care for yourself and looking for a way forward is already an important step. Tell us about your situation and we can help you find the next one.' },
    B: { title: 'Your exercise can adapt\nto this stage.', body: 'If you already exercise, you have a head start.\nWe help you adapt it to treatment so you can keep\nmoving in a way that suits how you feel.' },
    C: { title: 'You can always start\nwith something small.', body: 'Even with limitations, a small step adapted to you\ncounts too. Tell us about your situation and we can see\nwhere to start, moving forward little by little.' },
    D: { title: 'Finishing treatment\ndoes not mean feeling like before.', body: 'If you still feel tired, have lost strength or find it hard to return to your routine, tell us how you are doing. Together we can find a starting point to gradually regain what matters to you.' }
  } }
};
