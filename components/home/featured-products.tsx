"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER_PRODUCTS } from "@/lib/data";
import { RevealImage } from "@/components/ui/reveal-image";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = PLACEHOLDER_PRODUCTS.filter(p => p.is_featured).slice(0, 4);

  return (
    <section className="bg-rich-black py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-24 md:gap-32">
          {/* Featured Row 1: 50/50 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <ProductCard 
              product={featured[0]} 
              className="w-full" 
              index={0}
            />
            <ProductCard 
              product={featured[1]} 
              className="w-full" 
              index={1}
            />
          </div>

          {/* Featured Row 2: 50/50 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <ProductCard 
              product={featured[2]} 
              className="w-full" 
              index={2}
            />
            <ProductCard 
              product={featured[3]} 
              className="w-full" 
              index={3}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <Link
            href="/collections"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold hover:text-white transition-colors group"
          >
            View All Collections <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, className, index }: { product: any; className?: string; index: number }) {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <RevealImage src={product.images[0]} alt={product.name} aspectRatio="portrait" />
        <div className="mt-6 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm md:text-base text-white font-medium group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="font-sans text-[11px] text-muted uppercase tracking-wider">
              {product.collection.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {product.mrp > product.selling_price && (
              <span className="font-body text-xs text-subtle line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
            <span className="font-body text-base text-white">
              ₹{product.selling_price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
