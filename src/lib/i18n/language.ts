import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { DEFAULT_LANGUAGE, getHtmlLang, isLanguage, type Language } from './copy';

const STORAGE_KEY = 'eima-language';

function getInitialLanguage(): Language {
  if (!browser) return DEFAULT_LANGUAGE;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
}

export const language = writable<Language>(getInitialLanguage());

export function setLanguage(nextLanguage: Language) {
  language.set(nextLanguage);
}

if (browser) {
  language.subscribe((currentLanguage) => {
    window.localStorage.setItem(STORAGE_KEY, currentLanguage);
    document.documentElement.lang = getHtmlLang(currentLanguage);
  });
}
