import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const TILES = [
  {
    key: "milan" as const,
    cityFilter: "milano",
    image: "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=1200&q=70",
  },
  {
    key: "mallorca" as const,
    cityFilter: "mallorca",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=70",
  },
  {
    key: "london" as const,
    cityFilter: "london",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=70",
  },
];

export function NeighborhoodEditorial() {
  const t = useTranslations("home");

  function tagFor(key: (typeof TILES)[number]["key"]): string {
    if (key === "milan") return t("neighborhoodMilanTag");
    if (key === "mallorca") return t("neighborhoodMallorcaTag");
    return t("neighborhoodLondonTag");
  }

  return (
    <section className="bg-[color:var(--color-surface)] py-24 md:py-32">
      <Container width="wide">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Eyebrow>{t("neighborhoodEyebrow")}</Eyebrow>
            <h2
              className="mt-4 text-4xl leading-tight text-[color:var(--color-ink)] md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("neighborhoodTitle")}
            </h2>
            <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">
              {t("neighborhoodBody")}
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-3 gap-4">
              {TILES.map((tile) => (
                <Link
                  key={tile.key}
                  href={`/listings?city=${tile.cityFilter}`}
                  className="group block"
                  aria-label={`${tagFor(tile.key)} — vedi gli immobili`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--color-hairline)]">
                    <Image
                      src={tile.image}
                      alt={tagFor(tile.key)}
                      fill
                      sizes="(min-width: 768px) 20vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-deep)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)] group-hover:text-[color:var(--color-gold)] transition-colors">
                    {tagFor(tile.key)} →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
