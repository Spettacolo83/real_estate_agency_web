import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ListingCard } from "@/components/ui/ListingCard";
import { getFeaturedListings } from "@/data/listings";

export function FeaturedListings() {
  const t = useTranslations("home");
  const tListings = useTranslations("listings");
  const locale = useLocale();
  const featured = getFeaturedListings();

  return (
    <section className="py-24 md:py-32">
      <Container width="wide">
        <div className="mb-14 max-w-2xl md:mb-20">
          <Eyebrow>{t("featuredEyebrow")}</Eyebrow>
          <h2
            className="mt-4 text-4xl leading-tight text-[color:var(--color-ink)] md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("featuredTitle")}
          </h2>
          <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">
            {t("featuredSubtitle")}
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {featured.map((listing) => (
            <ListingCard
              key={listing.id_suggested}
              listing={listing}
              cityKey={listing.cityKey}
              locale={locale}
              bedLabel={tListings("bedLabel")}
              bathLabel={tListings("bathLabel")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
