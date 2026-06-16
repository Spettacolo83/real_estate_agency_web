"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = {
  en: "EN",
  it: "IT",
  es: "ES",
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("nav");

  function pathWithoutLocale(): string {
    for (const loc of routing.locales) {
      if (loc === routing.defaultLocale) continue;
      const prefix = `/${loc}`;
      if (pathname === prefix) return "/";
      if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
    }
    return pathname;
  }

  function hrefFor(target: Locale): string {
    const stripped = pathWithoutLocale();
    if (target === routing.defaultLocale) return stripped;
    return stripped === "/" ? `/${target}` : `/${target}${stripped}`;
  }

  return (
    <div
      className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]"
      aria-label={t("switchLocale")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.push(hrefFor(loc))}
          className={
            loc === currentLocale
              ? "text-[color:var(--color-deep)] font-medium"
              : "text-[color:var(--color-muted)] hover:text-[color:var(--color-deep)] transition-colors"
          }
          aria-current={loc === currentLocale ? "true" : undefined}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
