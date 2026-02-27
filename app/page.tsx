import { PreLoader } from "@/components/home/pre-loader";
import { HeroVideo } from "@/components/home/hero-video";
import { CollectionShowcase } from "@/components/home/collection-showcase";
import { NewArrivals } from "@/components/home/new-arrivals";
import { DenimEditorial } from "@/components/home/denim-editorial";
import { OfferHighlight } from "@/components/home/offer-highlight";
import { BrandStatement } from "@/components/home/brand-statement";
import { FeaturedProducts } from "@/components/home/featured-products";
import { VisitStore } from "@/components/home/visit-store";

export default function Home() {
  return (
    <main className="relative bg-black">
      <PreLoader />
      
      <HeroVideo />
      
      <div className="relative z-10">
        <CollectionShowcase />
        <NewArrivals />
        <DenimEditorial />
        <OfferHighlight />
        <BrandStatement />
        <FeaturedProducts />
        <VisitStore />
      </div>
    </main>
  );
}
