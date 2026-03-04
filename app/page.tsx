import { Metadata } from 'next'
import { HeroVideo } from "@/components/home/hero-video";
import { CollectionShowcase } from "@/components/home/collection-showcase";
import { NewArrivals } from "@/components/home/new-arrivals";
import { DenimEditorial } from "@/components/home/denim-editorial";
import { OfferHighlight } from "@/components/home/offer-highlight";
import { BrandStatement } from "@/components/home/brand-statement";
import { FeaturedProducts } from "@/components/home/featured-products";
import { VisitStore } from "@/components/home/visit-store";
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <div className="relative bg-black">
      <OrganizationJsonLd />
      <WebsiteJsonLd />

      <HeroVideo />

      <div className="relative z-10">
        <CollectionShowcase />
        <OfferHighlight priorityType="bogo" />
        <NewArrivals />
        <DenimEditorial />
        <OfferHighlight priorityType="combo" />
        <BrandStatement />
        <FeaturedProducts />
        <VisitStore />
      </div>
    </div>
  );
}
