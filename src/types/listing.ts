export type ListingCity = "milano" | "mallorca" | "london";

export type ListingCurrency = "EUR" | "GBP";

export type Listing = {
  id_suggested: string;
  source_url: string;
  source_portal: string;
  city: string;
  neighborhood: string;
  address_approx: string;
  title: string;
  description_short: string;
  description_long: string;
  price: number;
  currency: ListingCurrency;
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  features: ReadonlyArray<string>;
  coordinates: { lat: number; lng: number };
  photo_urls: ReadonlyArray<string>;
  photos_source_note?: string;
};

export type ListingsDataset = {
  generated_at: string;
  milano: ReadonlyArray<Listing>;
  mallorca: ReadonlyArray<Listing>;
  london: ReadonlyArray<Listing>;
};
