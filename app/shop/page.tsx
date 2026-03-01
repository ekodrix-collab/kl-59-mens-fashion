'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProducts } from '@/hooks/use-products'
import { useCategories } from '@/hooks/use-categories'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, cn, optimizeImageUrl } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { productsQuery } = useProducts()
  const { categoriesQuery } = useCategories()
  
  const { data: products, isLoading } = productsQuery
  const { data: categories } = categoriesQuery

  const filteredProducts = products?.filter(p => {
    if (!p.is_published) return false
    if (activeCategory === 'all') return true
    return p.product_categories?.some(pc => pc.category?.slug === activeCategory)
  }) || []

  return (
    <main className="pt-24 bg-black min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-12 md:mb-20">
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
            {filteredProducts.length} Pieces
          </motion.span>
        </div>

        {/* Category Filter */}
        <div className="mt-12 md:mt-16 overflow-hidden border-b border-white/5 pb-8">
          <div className="flex gap-8 overflow-x-auto hide-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                "font-sans text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors relative pb-2",
                activeCategory === 'all' ? "text-gold" : "text-white/40 hover:text-white"
              )}
            >
              All Pieces
              {activeCategory === 'all' && (
                <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
              )}
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "font-sans text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors relative pb-2",
                  activeCategory === cat.slug ? "text-gold" : "text-white/40 hover:text-white"
                )}
              >
                {cat.name}
                {activeCategory === cat.slug && (
                  <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-40">
        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <h2 className="font-display text-3xl text-white/20 mb-4">No <span className="italic">Pieces</span> Found</h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20">Refine your selection or explore other categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => {
                const primaryCat = product.product_categories?.find((pc: any) => pc.is_primary)?.category?.name
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <Link href={`/shop/${product.slug}`} className="block">
                      <div className="aspect-[3/4] bg-rich-black overflow-hidden mb-6 relative">
                        {product.images?.[0] ? (
                          <Image
                            src={optimizeImageUrl(product.images[0])}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            priority={i < 4}
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
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}
