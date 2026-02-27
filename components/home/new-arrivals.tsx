"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER_PRODUCTS } from "@/lib/data";
import { RevealImage } from "@/components/ui/reveal-image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const arrivals = PLACEHOLDER_PRODUCTS.filter(p => p.is_new_arrival);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 400 : scrollLeft + 400;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-dark py-32 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-16 flex items-end justify-between">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-4"
          >
            New In
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-white font-medium mb-4"
          >
            Just Arrived
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-muted font-light text-sm md:text-base"
          >
            Our latest drops, curated for you
          </motion.p>
        </div>

        <div className="hidden md:flex gap-4">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar px-6 lg:px-10 snap-x snap-mandatory"
      >
        {arrivals.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="min-w-[300px] md:min-w-[380px] snap-start group"
          >
            <Link href={`/product/${product.slug}`}>
              <div className="mb-6 relative overflow-hidden bg-[#F5F5F0] aspect-[2/3]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans text-sm md:text-base text-white font-medium group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans text-[11px] text-muted uppercase tracking-wider">
                  {product.collection.name}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-body text-base text-white">
                    ₹{product.selling_price.toLocaleString("en-IN")}
                  </span>
                  <span className="font-body text-xs text-subtle line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <div className="min-w-[200px] flex items-center justify-center">
          <Link
            href="/collections"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold hover:text-white transition-colors flex items-center gap-2"
          >
            View All <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Inline Image component for convenience, usually I'd use next/image
import Image from "next/image";
