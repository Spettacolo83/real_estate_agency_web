import type { ReactNode } from "react";
import clsx from "clsx";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "gold";
};

export function Eyebrow({ children, className, tone = "muted" }: EyebrowProps) {
  return (
    <span
      className={clsx(
        "inline-block text-xs font-medium uppercase tracking-[0.18em]",
        tone === "gold" ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-muted)]",
        className,
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {children}
    </span>
  );
}
