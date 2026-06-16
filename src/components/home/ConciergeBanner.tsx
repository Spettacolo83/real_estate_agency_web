import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function ConciergeBanner() {
  const t = useTranslations("home");

  return (
    <section
      id="concierge"
      className="bg-[color:var(--color-deep)] py-24 text-[color:var(--color-canvas)] md:py-32"
    >
      <Container width="default">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Eyebrow tone="gold">{t("conciergeEyebrow")}</Eyebrow>
            <h2
              className="mt-4 text-4xl leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("conciergeTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-base text-[color:var(--color-canvas)]/80 md:text-lg">
              {t("conciergeBody")}
            </p>
            <div className="mt-10">
              <Button
                href="#"
                size="lg"
                variant="secondary"
                className="border-[color:var(--color-canvas)] text-[color:var(--color-canvas)] hover:bg-[color:var(--color-canvas)] hover:text-[color:var(--color-deep)]"
              >
                {t("conciergeCta")}
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div
              className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-[color:var(--color-gold)]/40 md:h-72 md:w-72"
              aria-hidden="true"
            >
              <div className="absolute inset-0 animate-ping rounded-full border border-[color:var(--color-gold)]/30" />
              <div className="absolute inset-4 rounded-full border border-[color:var(--color-gold)]/30" />
              <div className="absolute inset-8 rounded-full border border-[color:var(--color-gold)]/40" />
              <div className="h-3 w-3 rounded-full bg-[color:var(--color-gold)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
