'use client'

import { motion } from 'framer-motion'
import { PLACEHOLDER_PRODUCTS } from '@/lib/data'
import { RevealImage } from '@/components/ui/reveal-image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default function ShopPage() {
  return (
    <main className="pt-24 bg-black min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-10 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-6 block"
            >
              CATALOGUE 2025
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-8xl text-white leading-none"
            >
              The <span className="italic font-medium">Catalogue</span>
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-10 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {PLACEHOLDER_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="group"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <RevealImage src={product.images[0]} alt={product.name} />
                <div className="mt-8 flex justify-between items-start">
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
                        {formatPrice(product.mrp)}
                      </span>
                    )}
                    <span className="font-body text-base text-white">
                      {formatPrice(product.selling_price)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
