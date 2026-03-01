'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/use-products'
import { useOffers } from '@/hooks/use-offers'
import ProductCard from '@/components/products/product-card'
import ComboCard from '@/components/products/combo-card'
import { Loader2 } from 'lucide-react'

export default function ShopPage() {
  const { productsQuery } = useProducts()
  const { offersQuery } = useOffers()

  const { data: products, isLoading: productsLoading } = productsQuery
  const { data: offers, isLoading: offersLoading } = offersQuery

  if (productsLoading || offersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  // 1. Process single product offers and attach to products
  const productsWithOffers = products?.map(product => {
    const activeOffer = offers?.find(o => o.offer_type === 'product_offer' && o.product_id === product.id && o.is_active)
    return { ...product, active_offer: activeOffer }
  }) || []

  // 2. Identify active combo offers
  const comboOffers = offers?.filter(o => o.offer_type === 'combo' && o.is_active) || []

  // 3. Create a merged list of items to display
  // We can inject combo offers into the grid
  const allItems = [...productsWithOffers.map(p => ({ type: 'product', data: p, id: p.id })),
  ...comboOffers.map(c => ({ type: 'combo', data: c, id: c.id }))]

  // Sort by created_at descending if needed (optional)
  // allItems.sort((a, b) => new Date(b.data.created_at).getTime() - new Date(a.data.created_at).getTime())

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
              CATALOGUE {new Date().getFullYear()}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
          {allItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className={item.type === 'combo' ? 'md:col-span-2' : ''}
            >
              {item.type === 'product' ? (
                <ProductCard product={item.data as any} />
              ) : (
                <ComboCard offer={item.data as any} />
              )}
            </motion.div>
          ))}
        </div>
        {allItems.length === 0 && (
          <div className="py-40 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-white/30">No items found in the catalogue.</p>
          </div>
        )}
      </div>
    </main>
  )
}
