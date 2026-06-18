import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ListingCard } from "@/components/ui/ListingCard";
import { getListingsByCity } from "@/data/listings";
import { routing } from "@/i18n/routing";
import type { ListingCity } from "@/types/listing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ city?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "listings" });
  return { title: t("title"), description: t("subtitle") };
}

const ALL_CITY_SECTIONS: ReadonlyArray<{
  cityKey: ListingCity;
  tagKey: "neighborhoodMilanTag" | "neighborhoodMallorcaTag" | "neighborhoodLondonTag";
}> = [
  { cityKey: "milano", tagKey: "neighborhoodMilanTag" },
  { cityKey: "mallorca", tagKey: "neighborhoodMallorcaTag" },
  { cityKey: "london", tagKey: "neighborhoodLondonTag" },
];

function isCityFilter(value: string | undefined): value is ListingCity {
  return value === "milano" || value === "mallorca" || value === "london";
}

export default async function ListingsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const cityFilter = isCityFilter(sp.city) ? sp.city : undefined;
  return <ListingsContent locale={locale} cityFilter={cityFilter} />;
}

function ListingsContent({
  locale,
  cityFilter,
}: {
  locale: string;
  cityFilter?: ListingCity;
}) {
  const t = useTranslations("listings");
  const tHome = useTranslations("home");

  const sections = cityFilter
    ? ALL_CITY_SECTIONS.filter((s) => s.cityKey === cityFilter)
    : ALL_CITY_SECTIONS;

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] py-20 md:py-28">
        <Container width="wide">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            className="mt-4 max-w-3xl text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-[color:var(--color-muted)] md:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <FilterChip
              label={t("filterAll")}
              href="/listings"
              active={!cityFilter}
            />
            {ALL_CITY_SECTIONS.map((s) => (
              <FilterChip
                key={s.cityKey}
                label={tHome(s.tagKey)}
                href={`/listings?city=${s.cityKey}`}
                active={cityFilter === s.cityKey}
              />
            ))}
          </div>
        </Container>
      </section>

      {sections.map((section) => {
        const listings = getListingsByCity(section.cityKey);
        const cityLabel = tHome(section.tagKey);
        return (
          <section key={section.cityKey} className="py-20 md:py-28">
            <Container width="wide">
              <div className="mb-10 flex items-baseline justify-between gap-6 md:mb-14">
                <h2
                  className="text-3xl text-[color:var(--color-ink)] md:text-4xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {cityLabel}
                </h2>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  {listings.length}{" "}
                  {listings.length === 1
                    ? t("propertySingular")
                    : t("propertyPlural")}
                </p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id_suggested}
                    listing={listing}
                    cityKey={section.cityKey}
                    locale={locale}
                    bedLabel={t("bedLabel")}
                    bathLabel={t("bathLabel")}
                  />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}

function FilterChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  const cls = active
    ? "border-[color:var(--color-deep)] bg-[color:var(--color-deep)] text-[color:var(--color-canvas)]"
    : "border-[color:var(--color-hairline)] bg-transparent text-[color:var(--color-deep)] hover:border-[color:var(--color-deep)]";
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-[2px] border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${cls}`}
    >
      {label}
    </Link>
  );
}
