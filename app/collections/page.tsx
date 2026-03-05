"use client";
import { RevealImage } from "@/components/ui/reveal-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/use-categories";
import { Loader2 } from "lucide-react";

const FALLBACK_COLLECTION_IMAGE = "/images/collections/placeholder.jpg";

export default function CollectionsPage() {
  const { categoriesQuery } = useCategories();
  const { data: categories, isLoading: categoriesLoading } = categoriesQuery;

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  const dbCollections = (categories || [])
    .filter((cat) => {
      const slug = (cat.slug || "").trim().toLowerCase();
      const name = (cat.name || "").trim().toLowerCase();
      return slug !== "uncategorized" && name !== "uncategorized";
    })
    .map((cat) => {
      let image = cat.image;
      if (!image) {
        if (cat.slug === "formals") {
          image = "/images/collections/formals.jpg";
        } else {
          image = "/og-image.jpg";
        }
      }

      return {
        name: cat.name,
        slug: cat.slug,
        image: image,
        isShopAll: false,
      };
    });

  const allCollections = [
    ...dbCollections,
    { name: "Shop All", slug: "all", image: "", isShopAll: true }
  ];

  return (
    <main className="pt-24 bg-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-32">
        <div className="mb-16 mt-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-gold block mb-4"
          >
            Explore Our
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-8xl text-white font-medium leading-none"
          >
            Collections
          </motion.h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {allCollections.map((col, i) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative overflow-hidden",
                col.isShopAll && "flex items-center justify-center border border-white/10 hover:border-gold/50 transition-colors duration-500 bg-zinc-900/20"
              )}
            >
              <Link href={col.slug === "all" ? "/shop" : `/collections/${col.slug}`} className="block w-full h-full">
                {col.isShopAll ? (
                  <div className="aspect-[4/5] flex flex-col items-center justify-center p-10 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Complete Catalogue</span>
                    <h2 className="font-display text-2xl md:text-4xl text-white mb-6">Discover All</h2>
                    <div className="w-12 h-[1px] bg-gold/50 group-hover:w-20 transition-all duration-700" />
                  </div>
                ) : (
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <RevealImage
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full"
                      aspectRatio="auto"
                    />
                    {/* Subtle Gradient Fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

                    {/* Bottom-Left Editorial Typography */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold/90 block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        Men's Fashion
                      </span>
                      <h2 className="font-display text-2xl md:text-4xl text-white font-medium tracking-tight">
                        {col.name}
                      </h2>
                      <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white/70 transition-all duration-700 delay-200">
                        <span className="font-sans text-[10px] uppercase tracking-widest font-medium">Explore</span>
                        <div className="w-0 group-hover:w-8 h-[1px] bg-white/30 transition-all duration-700" />
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
