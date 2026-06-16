import type { Locale } from "@/i18n/routing";

export const BRAND_NAME = "CasAI" as const;

export const FTFAI_URL = "https://www.followtheflowai.com" as const;

export const TAGLINE_BY_LOCALE: Record<Locale, string> = {
  en: "Curated estates. Intelligent service.",
  it: "Dimore selezionate. Servizio intelligente.",
  es: "Propiedades selectas. Servicio inteligente.",
};

export function getFtfaiUrl(locale: Locale): string {
  return locale === "en" ? FTFAI_URL : `${FTFAI_URL}/${locale}`;
}
