import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { PRIMARY_NAV } from "@/lib/nav";
import { BRAND_NAME, getFtfaiUrl } from "@/lib/brand";
import type { Locale } from "@/i18n/routing";

const LEGAL_LINKS = [
  { key: "legalImprint" as const, href: "/imprint" },
  { key: "legalPrivacy" as const, href: "/privacy" },
  { key: "legalTerms" as const, href: "/terms" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <footer className="mt-24 border-t border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]">
      <Container width="wide">
        <div className="grid gap-12 py-16 md:grid-cols-3 md:gap-10 md:py-20">
          <div>
            <p
              className="text-3xl text-[color:var(--color-deep)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {BRAND_NAME}
            </p>
            <p className="mt-3 max-w-xs text-sm text-[color:var(--color-muted)]">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t("navHeading")}
            </p>
            <ul className="mt-5 space-y-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-[color:var(--color-deep)] hover:text-[color:var(--color-gold)] transition-colors"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t("legalHeading")}
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-[color:var(--color-deep)] hover:text-[color:var(--color-gold)] transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--color-hairline)] py-6 text-xs text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. {t("credit")}
          </p>
          <a
            href={getFtfaiUrl(locale)}
            className="hover:text-[color:var(--color-gold)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("creditLinkLabel")} →
          </a>
        </div>
      </Container>
    </footer>
  );
}
