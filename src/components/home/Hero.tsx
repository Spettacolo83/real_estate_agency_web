import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-deep)]/40 via-[color:var(--color-deep)]/30 to-[color:var(--color-canvas)]"
          aria-hidden="true"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="flex min-h-[88vh] flex-col justify-end pb-20 pt-32 md:min-h-[92vh] md:pb-28">
          <div className="max-w-3xl">
            <Eyebrow tone="gold" className="text-[color:var(--color-canvas)]">
              {t("heroEyebrow")}
            </Eyebrow>
            <h1
              className="mt-5 text-5xl leading-[1.05] text-[color:var(--color-canvas)] md:text-7xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base text-[color:var(--color-canvas)]/85 md:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/listings" size="lg">
                {t("heroPrimaryCta")}
              </Button>
              <Button
                href="#concierge"
                variant="ghost"
                size="lg"
                className="text-[color:var(--color-canvas)] hover:text-[color:var(--color-gold)]"
              >
                {t("heroSecondaryCta")} ↓
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
