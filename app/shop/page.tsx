'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/use-products'
import { useOffers } from '@/hooks/use-offers'
import { useCategories } from '@/hooks/use-categories'
import { Loader2 } from 'lucide-react'

import { CollectionLayout } from '@/components/collection/collection-layout'

export default function ShopPage() {
  const { productsQuery } = useProducts()
  const { offersQuery } = useOffers()
  const { categoriesQuery } = useCategories()

  const { data: products, isLoading: productsLoading } = productsQuery
  const { data: offers, isLoading: offersLoading } = offersQuery
  const { data: categories, isLoading: categoriesLoading } = categoriesQuery

  if (productsLoading || offersLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  // Process products to include offers
  const productsWithOffers = products?.map(product => {
    const activeOffer = offers?.find(o => o.offer_type === 'product_offer' && o.product_id === product.id && o.is_active)
    // Map DB product to the format expected by CollectionLayout (handling collection object)
    const processedProduct = {
      ...product,
      active_offer: activeOffer,
      // Ensure collection slug/name are available for filters
      collection: product.product_categories?.[0]?.category || { name: 'Uncategorized', slug: 'uncategorized' }
    }
    return processedProduct
  }) || []

  return (
    <CollectionLayout
      initialProducts={productsWithOffers}
      allCategories={categories}
      heroData={{
        name: "The Catalogue",
        tagline: `CATALOGUE ${new Date().getFullYear()}`,
        image: "/images/hero/shop-hero.jpg" // Placeholder or use a constant
      }}
    />
  )
}
