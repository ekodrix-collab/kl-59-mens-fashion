'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/use-products'
import { useOffers } from '@/hooks/use-offers'
import { useCategories } from '@/hooks/use-categories'
import { Loader2 } from 'lucide-react'

import { CollectionLayout } from '@/components/collection/collection-layout'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { useStoreInfo } from '@/hooks/use-store-info'

function ShopContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || undefined

  const { productsQuery } = useProducts()
  const { offersQuery } = useOffers()
  const { categoriesQuery } = useCategories()
  const { storeInfoQuery } = useStoreInfo()

  const { data: products, isLoading: productsLoading } = productsQuery
  const { data: offers, isLoading: offersLoading } = offersQuery
  const { data: categories, isLoading: categoriesLoading } = categoriesQuery
  const { data: storeInfo, isLoading: storeLoading } = storeInfoQuery

  if (productsLoading || offersLoading || categoriesLoading || storeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  // Process products to include offers
  const productsWithOffers = products?.map(product => {
    const activeOffer = offers?.find(o => o.offer_type === 'product_offer' && o.product_id === product.id && o.is_active)
    return {
      ...product,
      active_offer: activeOffer,
      collection: product.product_categories?.[0]?.category || { name: 'Uncategorized', slug: 'uncategorized' }
    }
  }) || []

  return (
    <CollectionLayout
      initialProducts={productsWithOffers}
      allCategories={categories}
      initialCategory={category}
      heroData={{
        name: "The Catalogue",
        tagline: `CATALOGUE ${new Date().getFullYear()}`,
        image: storeInfo?.hero_image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000"
      }}
    />
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
       <div className="flex items-center justify-center min-h-screen bg-black">
         <Loader2 className="animate-spin text-gold" size={32} />
       </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
