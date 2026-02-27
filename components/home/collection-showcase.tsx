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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-1.5 overflow-hidden">
          {collections.map((col, i) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className={`relative group ${col.grid}`}
            >
              <RevealImage
                src={col.image}
                alt={col.name}
                className="w-full h-full min-h-[50vh] md:min-h-0"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-editorial group-hover:translate-x-2">
                  {col.name}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white italic opacity-80 mt-1">
                  {col.tagline}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
