import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "neighborhoods" });
  return { title: t("title"), description: t("body") };
}

type Region = {
  cityFilter: "milano" | "mallorca" | "london";
  labelKey: "milanRegionLabel" | "mallorcaRegionLabel" | "londonRegionLabel";
  taglineKey: "milanRegionTagline" | "mallorcaRegionTagline" | "londonRegionTagline";
  bodyKey: "milanRegionBody" | "mallorcaRegionBody" | "londonRegionBody";
  image: string;
};

const REGIONS: ReadonlyArray<Region> = [
  {
    cityFilter: "milano",
    labelKey: "milanRegionLabel",
    taglineKey: "milanRegionTagline",
    bodyKey: "milanRegionBody",
    image: "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=1600&q=70",
  },
  {
    cityFilter: "mallorca",
    labelKey: "mallorcaRegionLabel",
    taglineKey: "mallorcaRegionTagline",
    bodyKey: "mallorcaRegionBody",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1600&q=70",
  },
  {
    cityFilter: "london",
    labelKey: "londonRegionLabel",
    taglineKey: "londonRegionTagline",
    bodyKey: "londonRegionBody",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=70",
  },
];

export default async function NeighborhoodsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("neighborhoods");

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
            {t("body")}
          </p>
        </Container>
      </section>

      {REGIONS.map((region, idx) => (
        <RegionSection key={region.cityFilter} region={region} reverse={idx % 2 === 1} />
      ))}
    </>
  );
}

function RegionSection({
  region,
  reverse,
}: {
  region: Region;
  reverse: boolean;
}) {
  const t = useTranslations("neighborhoods");
  const label = t(region.labelKey);
  const tagline = t(region.taglineKey);
  const body = t(region.bodyKey);
  const exploreCta = t("exploreCta");
  const href = `/listings?city=${region.cityFilter}`;

  return (
    <section
      className={`py-24 md:py-32 ${reverse ? "bg-[color:var(--color-surface)]" : ""}`}
    >
      <Container width="wide">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Link
            href={href}
            className={`group relative aspect-[4/3] overflow-hidden bg-[color:var(--color-hairline)] md:col-span-7 ${reverse ? "md:order-2" : ""}`}
            aria-label={`${label} — ${exploreCta}`}
          >
            <Image
              src={region.image}
              alt={label}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-deep)]/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-canvas)]/80">
                {tagline}
              </p>
            </div>
          </Link>

          <div
            className={`flex flex-col justify-center md:col-span-5 ${reverse ? "md:order-1" : ""}`}
          >
            <Eyebrow tone="gold">{label}</Eyebrow>
            <h2
              className="mt-4 text-4xl leading-tight text-[color:var(--color-ink)] md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {tagline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--color-muted)] md:text-lg">
              {body}
            </p>
            <div className="mt-8">
              <Button href={href} variant="secondary" size="lg">
                {exploreCta} →
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
