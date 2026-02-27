"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER_PRODUCTS } from "@/lib/data";
import { RevealImage } from "@/components/ui/reveal-image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export function CollectionHero({ name, tagline, image }: { name: string; tagline: string; image: string }) {
  return (
    <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
      <RevealImage src={image} alt={name} className="absolute inset-0" aspectRatio="auto" />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-4"
        >
          {name}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl text-white font-medium"
        >
          {tagline}
        </motion.h1>
      </div>
    </section>
  );
}

export function ProductEditorialGrid({ products }: { products: any[] }) {
  return (
    <section className="bg-rich-black py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {products.map((p, i) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
      </div>
    </section>
  );
}

function ProductItem({ product, fullWidth }: { product: any; fullWidth?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <RevealImage
          src={product.images[0]}
          alt={product.name}
          aspectRatio={fullWidth ? "landscape" : "portrait"}
          className="w-full"
        />
        <div className="mt-8 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-base md:text-lg text-white font-medium group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="font-sans text-[11px] text-muted uppercase tracking-wider">
              {product.collection.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {product.mrp > product.selling_price && (
              <span className="font-body text-sm text-subtle line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
            <span className="font-body text-xl text-white">
              {formatPrice(product.selling_price)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
