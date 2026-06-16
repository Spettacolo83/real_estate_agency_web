import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <main className="flex min-h-[70vh] items-center">
      <Container width="narrow" className="text-center">
        <Eyebrow tone="gold">404</Eyebrow>
        <h1
          className="mt-5 text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {tFooter("tagline")}
        </h1>
        <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">—</p>
        <div className="mt-10 flex justify-center">
          <Button href="/" size="lg">
            {tNav("listings")} →
          </Button>
        </div>
      </Container>
    </main>
  );
}
