"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/use-products";

export function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { productsQuery } = useProducts({ featured: true });
  const { data: featured, isLoading } = productsQuery;
  const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0 });
  const touchLock = useRef<"horizontal" | "vertical" | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Touch drag handlers for mobile swipe
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!scrollRef.current) return;
    const touch = e.touches[0];
    dragStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      scrollLeft: scrollRef.current.scrollLeft
    };
    touchLock.current = null;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!scrollRef.current) return;

    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;

    // Determine direction lock on first significant movement
    if (!touchLock.current) {
      if (Math.abs(dx) > Math.abs(dy)) {
        touchLock.current = "horizontal";
      } else if (Math.abs(dy) > Math.abs(dx)) {
        touchLock.current = "vertical";
      }
    }

    // If horizontal, prevent vertical page scroll and update slider scroll
    if (touchLock.current === "horizontal") {
      if (e.cancelable) e.preventDefault();
      scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchLock.current = null;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart as any, { passive: true });
    el.addEventListener("touchmove", handleTouchMove as any, { passive: false });
    el.addEventListener("touchend", handleTouchEnd as any, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart as any);
      el.removeEventListener("touchmove", handleTouchMove as any);
      el.removeEventListener("touchend", handleTouchEnd as any);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (isLoading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="animate-spin text-gold" size={32} />
    </div>
  );

  const displayedProducts = featured || [];

  return (
    <section className="bg-rich-black py-16 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-16 flex items-end justify-between">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-4"
          >
            Curated Selection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-white font-light mb-4"
          >
            Featured <span className="italic font-serif">Pieces</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30"
          >
            Our signature designs for the season
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
        className="flex gap-6 px-6 lg:px-10 pr-20 lg:pr-32 overflow-hidden md:overflow-hidden"
        style={{ overscrollBehavior: 'none' }}
      >
        {displayedProducts.map((product, i) => {
          const primaryCat = product.product_categories?.find((pc: any) => pc.is_primary)?.category?.name
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.3) }}
              className="min-w-[280px] md:min-w-[380px] group will-change-transform"
            >
              <Link href={`/shop/${product.slug}`}>
                <div className="mb-6 relative overflow-hidden bg-black aspect-[3/4]">
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

        <div className="min-w-[220px] md:min-w-[320px] mb-6">
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
