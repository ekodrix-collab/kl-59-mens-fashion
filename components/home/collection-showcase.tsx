"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RevealImage } from "@/components/ui/reveal-image";
import { useCategories } from "@/hooks/use-categories";
import { Loader2 } from "lucide-react";

const CATEGORY_THEMES: Record<string, { tagline: string; cta: string }> = {
  'denim': { tagline: 'Timeless by Nature', cta: 'Discover' },
  'shirts': { tagline: 'Tailored for Presence', cta: 'View Collection' },
  't-shirts': { tagline: 'Effortless Essentials', cta: 'Explore' },
  'casual-wear': { tagline: 'Relaxed Confidence', cta: 'See Styles' },
  'formals': { tagline: 'Defined Presence', cta: 'Enter Collection' },
};

export function CollectionShowcase() {
  const { categoriesQuery } = useCategories();
  const { data: categories, isLoading } = categoriesQuery;

  if (isLoading) return null;

  // Take first 5 categories for the showcase
  const displayCollections = categories?.slice(0, 5) || [];

  const getTheme = (slug: string) => CATEGORY_THEMES[slug.toLowerCase()] || { tagline: 'Defined Style', cta: 'Explore' };

  return (
    <section className="bg-rich-black py-12 md:py-40">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-4"
          >
            The Archive
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-6xl text-white font-light tracking-tight"
          >
            Curated <span className="italic font-serif">Segments</span>
          </motion.h2>
        </div>

        {/* Mobile Layout: 2 Columns */}
        <div className="grid grid-cols-2 md:hidden gap-4 mb-12">
          {displayCollections.map((col) => {
            const theme = getTheme(col.slug);
            return (
              <Link
                key={col.id}
                href={`/shop?category=${col.slug}`}
                className="relative group block"
              >
                <RevealImage
                  src={col.image || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80'}
                  alt={col.name}
                  aspectRatio="portrait"
                  sizes="50vw"
                />
                <div className="mt-4">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-1 block">
                    {col.name}
                  </span>
                  <h3 className="font-display text-sm text-white mb-3 font-light leading-snug line-clamp-2">
                    {theme.tagline}
                  </h3>
                  <div className="flex items-center gap-2 py-1 border-b border-white/10">
                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-white">
                      {theme.cta}
                    </span>
                    <span className="text-gold text-xs">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>


        {/* Desktop Layout: Existing 3+2 Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {displayCollections.slice(0, 3).map((col) => {
            const theme = getTheme(col.slug);
            return (
              <Link
                key={col.id}
                href={`/shop?category=${col.slug}`}
                className="relative group block"
              >
                <RevealImage
                  src={col.image || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80'}
                  alt={col.name}
                  aspectRatio="portrait"
                  sizes="(max-width: 1200px) 50vw, 33vw"
                />
                <div className="mt-8">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3 block">
                    {col.name}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-6 font-light leading-snug">
                    {theme.tagline}
                  </h3>
                  <div className="flex items-center gap-4 py-2 border-b border-white/10 group-hover:border-gold transition-colors">
                    <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white group-hover:text-gold transition-colors">
                      {theme.cta}
                    </span>
                    <span className="text-gold transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {displayCollections.length > 3 && (
          <div className="hidden md:grid grid-cols-2 gap-16 md:gap-10 mt-16 md:mt-32">
            {displayCollections.slice(3, 5).map((col) => {
              const theme = getTheme(col.slug);
              return (
                <Link
                  key={col.id}
                  href={`/shop?category=${col.slug}`}
                  className="relative group block"
                >
                  <RevealImage
                    src={col.image || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80'}
                    alt={col.name}
                    aspectRatio="portrait"
                    sizes="50vw"
                  />
                  <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                    <div>
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3 block">
                        {col.name}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl text-white font-light leading-snug">
                        {theme.tagline}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 pb-2 border-b border-white/10 group-hover:border-gold transition-colors self-start md:self-auto">
                      <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white group-hover:text-gold transition-colors">
                        {theme.cta}
                      </span>
                      <span className="text-gold transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>

  );
}
