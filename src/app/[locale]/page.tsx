import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { NeighborhoodEditorial } from "@/components/home/NeighborhoodEditorial";
import { ConciergeBanner } from "@/components/home/ConciergeBanner";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <FeaturedListings />
      <NeighborhoodEditorial />
      <ConciergeBanner />
    </>
  );
}
