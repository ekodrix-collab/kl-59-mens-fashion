"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RevealImage } from "@/components/ui/reveal-image";

const collections = [
  {
    name: "Denim",
    slug: "denim",
    tagline: "Built to Last",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
    grid: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Shirts",
    slug: "shirts",
    tagline: "Sharp & Refined",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80",
    grid: "md:col-span-1 md:row-span-1",
  },
  {
    name: "T-Shirts",
    slug: "t-shirts",
    tagline: "Everyday Essential",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
    grid: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Casual Wear",
    slug: "casual-wear",
    tagline: "Effortless Style",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80",
    grid: "md:col-span-2 md:row-span-1",
  },
  {
    name: "Formals",
    slug: "formals",
    tagline: "Command the Room",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    grid: "md:col-span-1 md:row-span-1",
  },
];

export function CollectionShowcase() {
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
          {collections.slice(0, 3).map((col, i) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="relative group block"
            >
              <RevealImage
                src={col.image}
                alt={col.name}
                aspectRatio="portrait"
                className="w-full"
              />
              <div className="mt-8">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3 block">
                  {col.name}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-6">
                  {col.tagline}
                </h3>
                <div className="flex items-center gap-4 py-2 border-b border-white/10 group-hover:border-gold transition-colors">
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white group-hover:text-gold transition-colors">Shop Series</span>
                  <span className="text-gold transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-20 md:mt-32">
          {collections.slice(3).map((col, i) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="relative group block"
            >
              <RevealImage
                src={col.image}
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
                    {col.tagline}
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
      </div>
    </section>
  );
}
