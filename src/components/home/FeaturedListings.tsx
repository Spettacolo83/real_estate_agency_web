import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Placeholder = {
  city: "milanTag" | "mallorcaTag" | "londonTag";
  image: string;
  title: string;
  meta: string;
};

const PLACEHOLDERS: ReadonlyArray<Placeholder> = [
  {
    city: "milanTag",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=70",
    title: "Brera attic with frescoed ceiling",
    meta: "240 m² · 3 bed · 3 bath",
  },
  {
    city: "mallorcaTag",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=70",
    title: "Finca above the Tramuntana",
    meta: "420 m² · 5 bed · 4 bath",
  },
  {
    city: "londonTag",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=70",
    title: "Mayfair townhouse, Georgian façade",
    meta: "310 m² · 4 bed · 3 bath",
  },
];

export function FeaturedListings() {
  const t = useTranslations("home");

  function cityLabel(key: Placeholder["city"]): string {
    if (key === "milanTag") return t("neighborhoodMilanTag");
    if (key === "mallorcaTag") return t("neighborhoodMallorcaTag");
    return t("neighborhoodLondonTag");
  }

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
          {PLACEHOLDERS.map((p) => (
            <article key={p.title} className="group">
              <div className="relative aspect-[3/2] overflow-hidden bg-[color:var(--color-hairline)]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5">
                <Eyebrow tone="muted">{cityLabel(p.city)}</Eyebrow>
                <h3
                  className="mt-2 text-2xl leading-snug text-[color:var(--color-ink)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--color-muted)]">{p.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
