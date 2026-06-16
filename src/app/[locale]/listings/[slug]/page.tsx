import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { getListingBySlug, getAllSlugs, formatPrice, getLocalizedListing } from "@/data/listings";
import { routing } from "@/i18n/routing";
import type { ListingCity } from "@/types/listing";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map(({ slug }) => ({ locale, slug })),
  );
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Not found · CasAI" };
  const t = await getTranslations({ locale, namespace: "listingDetail" });
  const loc = getLocalizedListing(listing, locale);
  return {
    title: loc.title,
    description: loc.description_short,
    openGraph: {
      title: `${loc.title} · CasAI`,
      description: loc.description_short,
      images: listing.photo_urls[0] ? [{ url: listing.photo_urls[0] }] : undefined,
    },
    alternates: {
      canonical: `/${locale === "en" ? "" : `${locale}/`}listings/${slug}`,
    },
    other: { "og:price": String(listing.price), "og:currency": listing.currency, "view-source": t("originalLabel") },
  };
}

const CITY_TAG_KEY: Record<ListingCity, "neighborhoodMilanTag" | "neighborhoodMallorcaTag" | "neighborhoodLondonTag"> = {
  milano: "neighborhoodMilanTag",
  mallorca: "neighborhoodMallorcaTag",
  london: "neighborhoodLondonTag",
};

export default async function ListingDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const listing = getListingBySlug(slug);
  if (!listing) notFound();
  return <Content slug={slug} />;
}

function Content({ slug }: { slug: string }) {
  const t = useTranslations("listingDetail");
  const tHome = useTranslations("home");
  const tListings = useTranslations("listings");
  const locale = useLocale();

  const listing = getListingBySlug(slug);
  if (!listing) return null;

  const cityLabel = tHome(CITY_TAG_KEY[listing.cityKey]);
  const price = formatPrice(listing.price, listing.currency, locale);
  const hero = listing.photo_urls[0];
  const grid = listing.photo_urls.slice(1, 5);
  const rest = listing.photo_urls.slice(5);
  const localized = getLocalizedListing(listing, locale);
  const paragraphs = localized.description_long
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]">
        <Container width="wide" className="py-6">
          <Link
            href="/listings"
            className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-gold)]"
          >
            ← {tListings("eyebrow")}
          </Link>
        </Container>
      </section>

      <section className="py-8">
        <Container width="wide">
          <div className="grid gap-3 md:grid-cols-12 md:gap-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-hairline)] md:col-span-8 md:aspect-[16/10]">
              {hero ? (
                <Image
                  src={hero}
                  alt={localized.title}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-2 md:gap-4">
              {grid.map((url, i) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden bg-[color:var(--color-hairline)]"
                >
                  <Image
                    src={url}
                    alt={`${localized.title} — ${i + 2}`}
                    fill
                    sizes="(min-width: 768px) 16vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow>
                {cityLabel} · {listing.neighborhood}
              </Eyebrow>
              <h1
                className="mt-4 text-4xl leading-tight text-[color:var(--color-ink)] md:text-6xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {localized.title}
              </h1>
              <p className="mt-4 text-base text-[color:var(--color-muted)] md:text-lg">
                {localized.description_short}
              </p>
            </div>
            <aside className="md:col-span-5">
              <div className="border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  {t("priceLabel")}
                </p>
                <p
                  className="mt-2 text-4xl text-[color:var(--color-ink)] md:text-5xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {price}
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[color:var(--color-hairline)] pt-6 text-sm">
                  <Spec label={t("sizeLabel")} value={`${listing.sqm} m²`} />
                  <Spec label={t("bedroomsLabel")} value={String(listing.bedrooms)} />
                  <Spec label={t("bathroomsLabel")} value={String(listing.bathrooms)} />
                  <Spec label={t("typeLabel")} value={listing.property_type} />
                </dl>
                <div className="mt-8">
                  <Button href="#book" size="lg" className="w-full">
                    {t("bookCta")}
                  </Button>
                  <p className="mt-3 text-xs text-[color:var(--color-muted)]">
                    {t("askHint")}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-16 md:py-24">
        <Container width="default">
          <Eyebrow>{t("descriptionHeading")}</Eyebrow>
          <div
            className="mt-6 space-y-5 text-base leading-relaxed text-[color:var(--color-ink)] md:text-lg"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <Eyebrow>{t("featuresHeading")}</Eyebrow>
          <h2
            className="mt-4 text-3xl text-[color:var(--color-ink)] md:text-4xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("featuresTitle")}
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {listing.features.map((f) => (
              <li
                key={f}
                className="border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] px-5 py-4 text-sm text-[color:var(--color-deep)]"
              >
                {f}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {rest.length > 0 ? (
        <section className="bg-[color:var(--color-surface)] py-16 md:py-24">
          <Container width="wide">
            <Eyebrow>{t("galleryHeading")}</Eyebrow>
            <h2
              className="mt-4 text-3xl text-[color:var(--color-ink)] md:text-4xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("galleryTitle")}
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((url, i) => (
                <div
                  key={url}
                  className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-hairline)]"
                >
                  <Image
                    src={url}
                    alt={`${localized.title} — ${i + 6}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section
        id="book"
        className="bg-[color:var(--color-deep)] py-20 text-[color:var(--color-canvas)] md:py-28"
      >
        <Container width="default" className="text-center">
          <Eyebrow tone="gold">{t("ctaEyebrow")}</Eyebrow>
          <h2
            className="mt-4 text-4xl leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[color:var(--color-canvas)]/80 md:text-lg">
            {t("ctaBody")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href="#"
              size="lg"
              variant="secondary"
              className="border-[color:var(--color-canvas)] text-[color:var(--color-canvas)] hover:bg-[color:var(--color-canvas)] hover:text-[color:var(--color-deep)]"
            >
              {t("bookCta")}
            </Button>
            <a
              href={listing.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-canvas)]/70 hover:text-[color:var(--color-gold)] transition-colors"
            >
              {t("originalLabel")} {listing.source_portal} ↗
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-base text-[color:var(--color-ink)]">{value}</dd>
    </div>
  );
}
