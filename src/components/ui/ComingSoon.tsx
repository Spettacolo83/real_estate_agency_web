import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  badge: string;
  ctaLabel: string;
  ctaHref?: string;
  children?: ReactNode;
};

export function ComingSoon({
  eyebrow,
  title,
  body,
  badge,
  ctaLabel,
  ctaHref = "/",
  children,
}: Props) {
  return (
    <main className="flex min-h-[70vh] items-center py-20 md:py-28">
      <Container width="narrow" className="text-center">
        <Eyebrow tone="gold">{badge}</Eyebrow>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          {eyebrow}
        </p>
        <h1
          className="mt-3 text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h1>
        <p className="mt-6 text-base text-[color:var(--color-muted)] md:text-lg">{body}</p>
        {children ? <div className="mt-8">{children}</div> : null}
        <div className="mt-10 flex justify-center">
          <Button href={ctaHref} size="lg" variant="secondary">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </main>
  );
}
