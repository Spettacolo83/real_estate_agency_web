import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("body") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("contact");
  const tCs = useTranslations("comingSoon");
  return (
    <ComingSoon
      eyebrow={t("eyebrow")}
      title={t("title")}
      body={t("body")}
      badge={tCs("badge")}
      ctaLabel={tCs("ctaHome")}
    >
      <a
        href={`mailto:${t("email")}`}
        className="text-base text-[color:var(--color-deep)] underline decoration-[color:var(--color-hairline)] underline-offset-4 transition-colors hover:text-[color:var(--color-gold)] hover:decoration-[color:var(--color-gold)]"
      >
        {t("emailLabel")}: {t("email")}
      </a>
    </ComingSoon>
  );
}
