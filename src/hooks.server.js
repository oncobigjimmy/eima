import { site } from '$lib/site';
import { getLanguageFromPath } from '$lib/i18n/routes';

const htmlLanguageByCode = {
  es: 'es-ES',
  ca: 'ca',
  en: 'en'
};

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const language = getLanguageFromPath(event.url.pathname) ?? 'es';
  const htmlLanguage = htmlLanguageByCode[language] ?? htmlLanguageByCode.es;

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replaceAll('%eima.url%', site.url)
        .replaceAll('%eima.email%', site.email)
        .replaceAll('%eima.phone%', site.phone)
        .replaceAll('%eima.instagram%', site.socials.instagram)
        .replaceAll('%eima.name%', site.name)
        .replaceAll('%eima.logoDark%', site.logoDark)
        .replaceAll('%eima.themeColor%', site.themeColor)
        .replace('<html lang="es-ES">', `<html lang="${htmlLanguage}">`)
        .replace(
          '<meta http-equiv="content-language" content="es-ES" />',
          `<meta http-equiv="content-language" content="${htmlLanguage}" />`
        )
  });
};
