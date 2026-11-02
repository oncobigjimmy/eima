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

// TODO [CA-revisar]: revisar indicaciones, pastillas y confirmación.
export const situationCopy = {
  es: { choose: 'Elige la situación que más se parezca a la tuya', identify: 'Me identifico', selected: 'Seleccionada', hint: 'Haz clic para elegirla', confirmation: 'Lo añadiremos a tu mensaje:' },
  ca: { choose: "Tria la situació que més s'assembli a la teva", identify: "M'hi identific", selected: 'Seleccionada', hint: 'Fes clic per triar-la', confirmation: 'Ho afegirem al teu missatge:' },
  en: { choose: 'Choose the situation that feels most like yours', identify: 'This is me', selected: 'Selected', hint: 'Click to choose', confirmation: 'We will add this to your message:' }
};
