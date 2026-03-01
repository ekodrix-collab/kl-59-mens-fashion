'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/use-products'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export default function ShopPage() {
  const { productsQuery } = useProducts()
  const { data: products, isLoading } = productsQuery

  const publishedProducts = products?.filter(p => p.is_published) || []

  return (
    <main className="pt-24 bg-black min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-6 block"
            >
              Current Collection
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-8xl text-white leading-tight md:leading-none"
            >
              The <span className="italic font-medium text-gold/90">Catalogue</span>
            </motion.h1>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/30"
          >
            {publishedProducts.length} Pieces
          </motion.span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-40">
        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : publishedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <h2 className="font-display text-3xl text-white/20 mb-4">Coming <span className="italic">Soon</span></h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20">New pieces are being added to the collection</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
            {publishedProducts.map((product, i) => {
              const primaryCat = product.product_categories?.find((pc: any) => pc.is_primary)?.category?.name
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  className="group"
                >
                  <Link href={`/shop/${product.slug}`} className="block">
                    <div className="aspect-[3/4] bg-rich-black overflow-hidden mb-6 relative">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                          <span className="text-white/10 font-sans text-[9px] uppercase tracking-widest">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-sans text-sm md:text-base text-white font-medium group-hover:text-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="font-sans text-[10px] text-white/40 uppercase tracking-wider">
                          {primaryCat || product.product_categories?.[0]?.category?.name || 'Collection'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {product.mrp > product.selling_price && (
                          <span className="font-body text-xs text-white/30 line-through">
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
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
