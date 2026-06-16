import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <FeaturedListings />
    </>
  );
}
