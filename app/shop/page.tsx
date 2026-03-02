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

  // Process combo offers into mock product elements
  const comboOffersAsProducts = offers?.filter(o => o.offer_type === 'combo' && o.is_active).map(offer => {
    // Calculate total original MRP of all items in combo map
    const totalMrp = offer.combo_items?.reduce((sum, item) => sum + ((item.product?.mrp || 0) * item.quantity), 0) || offer.combo_price || 0;
    const comboPrice = offer.combo_price || 0;
    const discountPercent = totalMrp > 0 ? Math.round((1 - (comboPrice / totalMrp)) * 100) : 0;

    // Fallback to combo item images if banner is missing
    const defaultImages = offer.combo_items?.filter(ci => ci.product?.images?.[0]).map(ci => ci.product!.images[0]) || [];
    const images = offer.banner_image ? [offer.banner_image] : defaultImages;

    return {
      id: offer.id,
      name: offer.title,
      slug: `combo/${offer.id}`,
      description: offer.description,
      mrp: totalMrp,
      selling_price: comboPrice,
      discount_percent: discountPercent,
      sizes: [],
      colors: [],
      color_images: {},
      images: images,
      is_featured: false,
      is_new_arrival: false,
      is_on_offer: true,
      is_published: true,
      created_at: offer.created_at,
      updated_at: offer.created_at,
      collection: { name: 'Combo Offers', slug: 'combo-offers' },
      is_combo: true,
      combo_items: offer.combo_items,
    }
  }) || [];

  const allDisplayItems = [...productsWithOffers, ...comboOffersAsProducts];

  return (
    <CollectionLayout
      initialProducts={allDisplayItems}
      allCategories={categories}
      heroData={{
        name: "The Catalogue",
        tagline: `CATALOGUE ${new Date().getFullYear()}`,
        image: "/images/hero/shop-hero.jpg" // Placeholder or use a constant
      }}
    />
  )
}
