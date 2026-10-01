import type { Language } from './copy';

// Stable Spanish IDs keep existing URLs, recommendations and translations linked.
export const blogSlugs = {
  'es-seguro-hacer-ejercicio-durante-la-quimioterapia-o-deberia-esperar-a-terminarla': {
    ca: 'es-segur-fer-exercici-durant-la-quimioterapia-o-hauria-desperar-a-acabar-la',
    en: 'is-it-safe-to-exercise-during-chemotherapy-or-should-i-wait-until-it-ends'
  },
  'por-que-cada-vez-hay-mas-gente-joven-con-cancer-que-esta-pasando': {
    ca: 'per-que-cada-vegada-hi-ha-mes-gent-jove-amb-cancer-que-esta-passant',
    en: 'why-are-more-young-people-getting-cancer-what-is-happening'
  },
  'por-que-el-reposo-total-ya-no-es-la-mejor-recomendacion-si-tienes-cancer': {
    ca: 'per-que-el-repos-total-ja-no-es-la-millor-recomanacio-si-tens-cancer',
    en: 'why-complete-rest-is-no-longer-the-best-advice-if-you-have-cancer'
  },
  'por-que-he-tenido-un-cancer-si-no-hay-antecedentes-en-toda-mi-familia': {
    ca: 'per-que-he-tingut-un-cancer-si-no-hi-ha-antecedents-a-la-meva-familia',
    en: 'why-did-i-get-cancer-if-there-is-no-history-in-my-family'
  },
  'puede-el-ejercicio-frenar-el-crecimiento-de-un-tumor-que-dice-la-ciencia': {
    ca: 'pot-lexercici-frenar-el-creixement-dun-tumor-que-diu-la-ciencia',
    en: 'can-exercise-slow-tumour-growth-what-does-science-say'
  },
  'sirve-de-algo-hacer-ejercicio-si-tengo-cancer-esto-dice-la-ciencia': {
    ca: 'serveix-de-res-fer-exercici-si-tinc-cancer-aixo-diu-la-ciencia',
    en: 'does-exercise-help-if-i-have-cancer-this-is-what-science-says'
  }
} as const;

export function getBlogPostPath(id: string, language: Language = 'es') {
  const translated = blogSlugs[id as keyof typeof blogSlugs];
  return language === 'es' ? `/blog/${id}` : `/${language}/blog/${translated?.[language] ?? id}`;
}

export function getBlogPostId(pathname: string) {
  return Object.keys(blogSlugs).find((id) =>
    (['es', 'ca', 'en'] as const).some((language) => getBlogPostPath(id, language) === pathname)
  );
}
