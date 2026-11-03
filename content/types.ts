export type Locale = 'en' | 'ar';

/** A bilingual string. Every piece of public copy carries both languages. */
export interface L {
  en: string;
  ar: string;
}

export const t = (l: L, locale: Locale): string => l[locale];
