"use client";

import { motion } from "framer-motion";
import { RevealImage } from "@/components/ui/reveal-image";
import Link from "next/link";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";

export function FeaturedProducts() {
  const { productsQuery } = useProducts({ featured: true });
  const { data: featured, isLoading } = productsQuery;

  if (isLoading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="animate-spin text-gold" size={32} />
    </div>
  );

  const displayedProducts = featured?.slice(0, 4) || [];

  return (
    <section className="bg-rich-black py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-24 md:gap-32">
          {/* Featured Row 1: 50/50 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <ProductCard
              product={displayedProducts[0]}
              className="w-full"
              index={0}
            />
            <ProductCard
              product={displayedProducts[1]}
              className="w-full"
              index={1}
            />
          </div>

          {/* Featured Row 2: 50/50 */}
          {displayedProducts.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <ProductCard
                product={displayedProducts[2]}
                className="w-full"
                index={2}
              />
              <ProductCard
                product={displayedProducts[3]}
                className="w-full"
                index={3}
              />
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <Link
            href="/shop"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold hover:text-white transition-colors group"
          >
            Explore All Pieces <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, className, index }: { product: any; className?: string; index: number }) {
  if (!product) return null;

  const primaryCat = product.product_categories?.find((pc: any) => pc.is_primary)?.category?.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <RevealImage 
          src={product.images[0]} 
          alt={product.name} 
          aspectRatio="portrait" 
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="mt-6 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm md:text-base text-white font-medium group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="font-sans text-[11px] text-muted uppercase tracking-wider">
              {primaryCat || (product.product_categories?.[0]?.category?.name) || 'Collection'}
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
