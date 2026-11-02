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
    A: { title: 'Empezar de cero también está bien.', body: 'Si nunca has hecho ejercicio, no pasa nada. Cuéntanos tu caso y vemos si podemos ayudarte a empezar.' },
    B: { title: 'Tu ejercicio puede adaptarse a esta etapa.', body: 'Si ya haces ejercicio y ahora no sabes cómo adaptarlo al tratamiento, cuéntanos tu caso y vemos si podemos ayudarte.' },
    C: { title: 'No tienes que resolverlo todo por tu cuenta.', body: 'Si la fatiga, el dolor o el miedo te frenan, cuéntanos cómo te encuentras y vemos si podemos ayudarte a dar el siguiente paso.' }
  } },
  ca: { close: 'Tancar', responses: {
    A: { title: 'Començar de zero també està bé.', body: 'Si no has fet mai exercici, no passa res. Explica’ns el teu cas i miram si podem ajudar-te a començar.' },
    B: { title: 'El teu exercici es pot adaptar a aquesta etapa.', body: 'Si ja fas exercici i ara no saps com adaptar-lo al tractament, explica’ns el teu cas i miram si podem ajudar-te.' },
    C: { title: 'No ho has de resoldre tot pel teu compte.', body: 'Si la fatiga, el dolor o la por et frenen, explica’ns com et trobes i miram si podem ajudar-te a fer la passa següent.' }
  } },
  en: { close: 'Close', responses: {
    A: { title: 'Starting from scratch is fine too.', body: 'If you have never exercised, that is okay. Tell us about your situation and we can see whether we can help you get started.' },
    B: { title: 'Your exercise can adapt to this stage.', body: 'If you already exercise but do not know how to adapt it to treatment, tell us about your situation and we can see whether we can help.' },
    C: { title: 'You do not have to work it all out alone.', body: 'If fatigue, pain or fear hold you back, tell us how you feel and we can see whether we can help you take the next step.' }
  } }
};
