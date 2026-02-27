import { RevealImage } from "@/components/ui/reveal-image";
import { COLLECTION_IMAGES } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

const collectionsList = [
  { name: "Denim", slug: "denim", image: COLLECTION_IMAGES.denim },
  { name: "Shirts", slug: "shirts", image: COLLECTION_IMAGES.shirts },
  { name: "T-Shirts", slug: "t-shirts", image: COLLECTION_IMAGES.tshirts },
  { name: "Casual Wear", slug: "casual-wear", image: COLLECTION_IMAGES.casual },
  { name: "Formals", slug: "formals", image: COLLECTION_IMAGES.formals },
];

export default function CollectionsPage() {
  return (
    <main className="pt-32 bg-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="mb-20">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-4">
            Curated
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-white font-medium">
            Collections
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 overflow-hidden">
          {collectionsList.map((col, i) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="relative group overflow-hidden">
              <RevealImage src={col.image} alt={col.name} className="h-[60vh]" width={1200} height={800} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="font-display text-4xl md:text-5xl text-white font-medium tracking-tight">
                  {col.name}
                </h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
