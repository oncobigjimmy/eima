import { writable } from 'svelte/store';
import type { Language } from '$lib/i18n/copy';

export type Situation = 'A' | 'B' | 'C';
export const selectedSituation = writable<Situation | null>(null);
export const situationMessages: Record<Language, Record<Situation, string>> = {
  es: {
    A: 'Nunca he hecho ejercicio y no sabría por dónde empezar.',
    B: 'Ya hago ejercicio, pero no sé cómo adaptarlo a mi tratamiento.',
    C: 'Quiero moverme, pero la fatiga, el dolor o el miedo me frenan.'
  },
  // TODO [CA-revisar]: revisar las frases personalizadas.
  ca: {
    A: 'Mai he fet exercici i no sabria per on començar.',
    B: 'Ja faig exercici, però no sé com adaptar-lo al meu tractament.',
    C: "Vull moure'm, però la fatiga, el dolor o la por em frenen."
  },
  en: {
    A: 'I have never exercised and would not know where to start.',
    B: 'I already exercise, but I do not know how to adapt it to my treatment.',
    C: 'I want to move, but fatigue, pain or fear hold me back.'
  }
};

/** Called only on the client; session state never leaks between SSR requests. */
export function restoreSituation() {
  try {
    const saved = sessionStorage.getItem('eima-situacion');
    selectedSituation.set(saved === 'A' || saved === 'B' || saved === 'C' ? saved : null);
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
  es: { choose: 'Elige la situación que más se parezca a la tuya', identify: 'Me identifico', selected: 'Seleccionada', hint: 'Haz clic para elegirla' },
  ca: { choose: "Tria la situació que més s'assembli a la teva", identify: "M'hi identific", selected: 'Seleccionada', hint: 'Fes clic per triar-la' },
  en: { choose: 'Choose the situation that feels most like yours', identify: 'This is me', selected: 'Selected', hint: 'Click to choose' }
};

// TODO [CA-revisar]: revisar las respuestas de los tres pop-ups.
export const situationResponseCopy = {
  es: { close: 'Cerrar', responses: {
    A: { title: 'Empezar de cero\ntambién está bien.', body: 'Si nunca has hecho ejercicio, no pasa nada.\nQuerer empezar ya es un paso importante.\nY tú ya has dado ese primer paso.' },
    B: { title: 'Tu ejercicio puede\nadaptarse a esta etapa.', body: 'Si ya haces ejercicio, tenemos mucho terreno ganado.\nTe ayudamos a adaptarlo al tratamiento para que puedas\nseguir moviéndote según cómo te encuentres.' },
    C: { title: 'Siempre se puede empezar\npor algo pequeño.', body: 'Aunque haya limitaciones, un pequeño paso adaptado\na ti también cuenta. Cuéntanos tu caso y vemos por dónde\nempezar, para ir avanzando poco a poco.' }
  } },
  ca: { close: 'Tancar', responses: {
    A: { title: 'Començar de zero\ntambé està bé.', body: 'Si no has fet mai exercici, no passa res.\nVoler començar ja és una passa important.\nI tu ja has fet aquesta primera passa.' },
    B: { title: 'El teu exercici es pot adaptar\na aquesta etapa.', body: 'Si ja fas exercici, tenim molt de terreny guanyat.\nT’ajudam a adaptar-lo al tractament perquè puguis\ncontinuar movent-te segons com et trobis.' },
    C: { title: 'Sempre es pot començar\nper una cosa petita.', body: 'Encara que hi hagi limitacions, una passa petita\nadaptada a tu també compta. Explica’ns el teu cas i miram\nper on començar, per anar avançant a poc a poc.' }
  } },
  en: { close: 'Close', responses: {
    A: { title: 'Starting from scratch\nis fine too.', body: 'If you have never exercised, that is okay.\nWanting to start is already an important step.\nAnd you have already taken that first step.' },
    B: { title: 'Your exercise can adapt\nto this stage.', body: 'If you already exercise, you have a head start.\nWe help you adapt it to treatment so you can keep\nmoving in a way that suits how you feel.' },
    C: { title: 'You can always start\nwith something small.', body: 'Even with limitations, a small step adapted to you\ncounts too. Tell us about your situation and we can see\nwhere to start, moving forward little by little.' }
  } }
};
