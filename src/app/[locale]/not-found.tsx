import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <main style={{ padding: "4rem 2rem", textAlign: "center", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "3rem" }}>404</h1>
      <p>{t("listings")}</p>
    </main>
  );
}
