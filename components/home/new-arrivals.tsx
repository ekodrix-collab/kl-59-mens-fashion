"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/use-products";

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { productsQuery } = useProducts();
  const { data: products, isLoading } = productsQuery;

  const arrivals = products?.filter(p => p.is_new_arrival) || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 400 : scrollLeft + 400;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (isLoading) return null;

  return (
    <section className="bg-dark py-16 md:py-40 overflow-hidden">
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
            className="font-display text-4xl md:text-5xl text-white font-light mb-4"
          >
            Latest <span className="italic font-serif">Additions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30"
          >
            Curated for the modern individual
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
        className="flex gap-6 overflow-x-auto hide-scrollbar px-6 lg:px-10 pr-20 lg:pr-32 snap-x snap-mandatory"
        data-lenis-prevent
      >
        {arrivals.map((product, i) => {
          const primaryCat = product.product_categories?.find(pc => pc.is_primary)?.category?.name
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="min-w-[280px] md:min-w-[380px] snap-start group"
            >
              <Link href={`/shop/${product.slug}`}>
                <div className="mb-6 relative overflow-hidden bg-rich-black aspect-[3/4]">
                  {product.images?.[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-sm md:text-base text-white font-medium group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans text-[11px] text-muted uppercase tracking-wider">
                    {primaryCat || (product.product_categories?.[0]?.category?.name) || 'Collection'}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-body text-base text-white">
                      ₹{product.selling_price.toLocaleString("en-IN")}
                    </span>
                    {product.mrp > product.selling_price && (
                      <span className="font-body text-xs text-subtle line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}

        <div className="min-w-[220px] md:min-w-[320px] snap-start mb-6">
          <Link
            href="/shop"
            className="group flex h-full aspect-[3/4] items-center justify-center text-center"
          >
            <div className="space-y-4">
              <p className="font-display text-[32px] md:text-5xl text-white leading-none">
                View All
              </p>
              <div className="flex items-center justify-center gap-3 text-gold">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Shop</span>
                <span className="h-px w-10 bg-gold/70 transition-all duration-300 group-hover:w-16" />
                <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
