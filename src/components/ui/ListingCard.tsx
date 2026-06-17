import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "./Eyebrow";
import type { Listing, ListingCity } from "@/types/listing";
import { formatPrice, getLocalizedListing } from "@/data/listings";

type Props = {
  listing: Listing;
  cityKey: ListingCity;
  locale: string;
  bedLabel: string;
  bathLabel: string;
};

export function ListingCard({ listing, locale, bedLabel, bathLabel }: Props) {
  const photo = listing.photo_urls[0];
  const price = formatPrice(listing.price, listing.currency, locale);
  const href = `/listings/${listing.id_suggested}`;
  const localized = getLocalizedListing(listing, locale);

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-[color:var(--color-hairline)]">
        {photo ? (
          <Image
            src={photo}
            alt={localized.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : null}
      </div>
      <div className="mt-5">
        <Eyebrow tone="muted">{listing.city.toUpperCase()} · {listing.neighborhood}</Eyebrow>
        <h3
          className="mt-2 text-2xl leading-snug text-[color:var(--color-ink)] group-hover:text-[color:var(--color-gold)] transition-colors"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {localized.title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          {listing.sqm} m² · {listing.bedrooms} {bedLabel} · {listing.bathrooms} {bathLabel}
        </p>
        <p className="mt-2 text-base font-medium text-[color:var(--color-deep)]">
          {price}
        </p>
      </div>
    </Link>
  );
}
