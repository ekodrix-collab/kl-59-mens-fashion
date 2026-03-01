"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RevealImage } from "@/components/ui/reveal-image";
import { useCategories } from "@/hooks/use-categories";
import { Loader2 } from "lucide-react";

export function CollectionShowcase() {
  const { categoriesQuery } = useCategories();
  const { data: categories, isLoading } = categoriesQuery;

  if (isLoading) return null;

  // Take first 5 categories for the showcase
  const displayCollections = categories?.slice(0, 5) || [];

  return (
    <section className="bg-rich-black py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-4"
          >
            Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-white font-medium"
          >
            Explore Our World
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {displayCollections.slice(0, 3).map((col, i) => (
            <Link
              key={col.id}
              href={`/shop?category=${col.slug}`}
              className="relative group block"
            >
              <RevealImage
                src={col.image || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80'}
                alt={col.name}
                aspectRatio="portrait"
                className="w-full"
              />
              <div className="mt-8">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3 block">
                  {col.name}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-6">
                  Built to Last
                </h3>
                <div className="flex items-center gap-4 py-2 border-b border-white/10 group-hover:border-gold transition-colors">
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white group-hover:text-gold transition-colors">Shop Series</span>
                  <span className="text-gold transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {displayCollections.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-20 md:mt-32">
            {displayCollections.slice(3, 5).map((col, i) => (
              <Link
                key={col.id}
                href={`/shop?category=${col.slug}`}
                className="relative group block"
              >
                <RevealImage
                  src={col.image || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80'}
                  alt={col.name}
                  aspectRatio="landscape"
                  className="w-full"
                />
                <div className="mt-8 flex justify-between items-end">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3 block">
                      {col.name}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl text-white">
                      Effortless Style
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 pb-2 border-b border-white/10 group-hover:border-gold transition-colors">
                    <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white group-hover:text-gold transition-colors">Explore</span>
                    <span className="text-gold transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
