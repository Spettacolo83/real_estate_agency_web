import type { Listing, ListingCity, ListingsDataset } from "@/types/listing";
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
