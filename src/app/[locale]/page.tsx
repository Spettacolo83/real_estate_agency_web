import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <p style={{ fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {t("heroEyebrow")}
      </p>
      <h1 style={{ fontSize: "3rem", margin: "1rem 0" }}>{t("heroTitle")}</h1>
      <p style={{ fontSize: "1.125rem", maxWidth: "40rem" }}>{t("heroSubtitle")}</p>
    </main>
  );
}
