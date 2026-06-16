import type { Listing, ListingCity, ListingsDataset, ListingTranslation } from "@/types/listing";
import raw from "./listings_research.json";

const dataset = raw as unknown as ListingsDataset;

export function getAllListings(): ReadonlyArray<Listing & { cityKey: ListingCity }> {
  const cities: ReadonlyArray<ListingCity> = ["milano", "mallorca", "london"];
  return cities.flatMap((cityKey) =>
    dataset[cityKey].map((l) => ({ ...l, cityKey })),
  );
}

export function getListingsByCity(cityKey: ListingCity): ReadonlyArray<Listing> {
  return dataset[cityKey];
}

export function getFeaturedListings(): ReadonlyArray<Listing & { cityKey: ListingCity }> {
  const milan = dataset.milano[0];
  const mallorca = dataset.mallorca[0];
  const london = dataset.london[0];
  if (!milan || !mallorca || !london) {
    throw new Error("Listings dataset is incomplete");
  }
  return [
    { ...milan, cityKey: "milano" },
    { ...mallorca, cityKey: "mallorca" },
    { ...london, cityKey: "london" },
  ];
}

export function formatPrice(price: number, currency: "EUR" | "GBP", locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getListingBySlug(
  slug: string,
): (Listing & { cityKey: ListingCity }) | undefined {
  return getAllListings().find((l) => l.id_suggested === slug);
}

export function getAllSlugs(): ReadonlyArray<{ slug: string; cityKey: ListingCity }> {
  return getAllListings().map((l) => ({ slug: l.id_suggested, cityKey: l.cityKey }));
}

export function getLocalizedListing(listing: Listing, locale: string): ListingTranslation {
  const supportedLocales = ["en", "it", "es"] as const;
  const requested = supportedLocales.find((l) => l === locale) ?? "en";
  const fromI18n = listing.i18n?.[requested];
  if (fromI18n) return fromI18n;
  const fromEn = listing.i18n?.en;
  if (fromEn) return fromEn;
  return {
    title: listing.title,
    description_short: listing.description_short,
    description_long: listing.description_long,
  };
}
