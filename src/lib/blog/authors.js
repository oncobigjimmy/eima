import { site } from '$lib/site';
export const AUTHORS = {
  jaume: {
    id: 'jaume',
    name: 'Jaume Sansó',
    role: 'Fisioterapeuta · Ejercicio y cáncer',
    jobTitle: 'Fisioterapeuta especializado en ejercicio terapéutico y cáncer',
    bio: 'Fisioterapeuta con más de 7 años de experiencia hospitalaria acompañando a personas durante y después del cáncer.',
    avatar: '/team-jaume.png',
    url: `${site.url}/quienes-somos/historia#jaume`,
    sameAs: site.socials.instagram
  },
  miquel: {
    id: 'miquel',
    name: 'Miquel Galmés',
    role: 'Fisioterapeuta · Ejercicio y dolor oncológico',
    jobTitle: 'Fisioterapeuta especializado en dolor persistente y dolor oncológico',
    bio: 'Fisioterapeuta con más de 7 años de experiencia hospitalaria acompañando a personas durante y después del cáncer.',
    avatar: '/team-miquel.png',
    url: `${site.url}/quienes-somos/historia#miquel`,
    sameAs: site.socials.instagram
  }
};

/** @param {string} id @param {import('$lib/i18n/copy').Language} language */
export function getAuthor(id, language = 'es') {
  const author = AUTHORS[/** @type {keyof typeof AUTHORS} */ (id)] ?? AUTHORS.jaume;
  if (language === 'es') return author;
  const isJaume = author.id === 'jaume';
  return {
    ...author,
    url: `${site.url}/${language}/${language === 'ca' ? 'qui-som/historia' : 'who-we-are/story'}#${author.id}`,
    role: language === 'ca'
      ? `Fisioterapeuta · ${isJaume ? 'Exercici i càncer' : 'Exercici i dolor oncològic'}`
      : `Physiotherapist · ${isJaume ? 'Exercise and cancer' : 'Exercise and cancer-related pain'}`,
    jobTitle: language === 'ca'
      ? `Fisioterapeuta especialitzat en ${isJaume ? 'exercici terapèutic i càncer' : 'dolor persistent i dolor oncològic'}`
      : `Physiotherapist specialising in ${isJaume ? 'therapeutic exercise and cancer' : 'persistent pain and cancer-related pain'}`,
    bio: language === 'ca'
      ? 'Fisioterapeuta amb més de 7 anys d’experiència hospitalària acompanyant persones durant i després del càncer.'
      : 'Physiotherapist with more than 7 years of hospital experience supporting people during and after cancer.'
  };
}
