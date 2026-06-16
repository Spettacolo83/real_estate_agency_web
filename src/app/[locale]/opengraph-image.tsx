import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const alt = "CasAI — Curated estates. Intelligent service.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "home" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F8F5EF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#B08D57",
          }}
        >
          CasAI
        </div>
        <div
          style={{
            fontSize: 84,
            lineHeight: 1.05,
            color: "#1A1A1A",
            maxWidth: "1000px",
            display: "flex",
          }}
        >
          {t("heroTitle")}
        </div>
        <div style={{ fontSize: 24, color: "#6B6660" }}>casa.followtheflowai.com</div>
      </div>
    ),
    size,
  );
}
