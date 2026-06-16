import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 rounded-[2px] border";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-deep)] text-[color:var(--color-canvas)] border-[color:var(--color-deep)] hover:bg-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]",
  secondary:
    "bg-transparent text-[color:var(--color-deep)] border-[color:var(--color-deep)] hover:bg-[color:var(--color-deep)] hover:text-[color:var(--color-canvas)]",
  ghost:
    "bg-transparent text-[color:var(--color-deep)] border-transparent hover:text-[color:var(--color-gold)]",
};

const sizeClass: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "className" | "children"
>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "children"
>;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const cls = clsx(base, variantClass[variant], sizeClass[size], className);
  const fontStyle = { fontFamily: "var(--font-inter)" };

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={cls} style={fontStyle} {...rest}>
        {children}
      </Link>
    );
  }

  const { href: _ignored, ...rest } = props as ButtonAsButton & { href?: undefined };
  return (
    <button className={cls} style={fontStyle} {...rest}>
      {children}
    </button>
  );
}
