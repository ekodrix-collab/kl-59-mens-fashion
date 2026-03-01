'use client'

import { useParams } from 'next/navigation'
import { useProducts } from '@/hooks/use-products'
import { useCategories } from '@/hooks/use-categories'
import { CollectionHero } from '@/components/collection/collection-components'
import { ModernProductCard } from '@/components/collection/modern-product-card'
import { CollectionSidebar, FilterState } from '@/components/collection/collection-sidebar'
import { SearchBar } from '@/components/collection/search-bar'
import { Filter, X, Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { COLLECTION_IMAGES } from '@/lib/data'

export default function CollectionPage() {
  const params = useParams()
  const slug = params.slug as string
  const { productsQuery } = useProducts()
  const { categoriesQuery } = useCategories()
  const { data: allProducts, isLoading } = productsQuery
  const { data: categories } = categoriesQuery

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    categories: slug && slug !== 'all' ? [slug] : [],
    priceRanges: [],
    sizes: [],
  })
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Find current category
  const currentCategory = categories?.find(c => c.slug === slug)
  const heroName = currentCategory?.name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const heroImage = currentCategory?.image || COLLECTION_IMAGES[slug as keyof typeof COLLECTION_IMAGES] || COLLECTION_IMAGES.denim

  // Map products to include collection-style data for filters
  const mappedProducts = useMemo(() => {
    if (!allProducts) return []
    return allProducts
      .filter(p => p.is_published)
      .map(p => {
        const primaryCat = p.product_categories?.find((pc: any) => pc.is_primary)?.category
        const firstCat = p.product_categories?.[0]?.category
        const cat = primaryCat || firstCat
        return {
          ...p,
          collection: cat ? { name: cat.name, slug: cat.slug } : { name: 'Uncategorized', slug: 'uncategorized' }
        }
      })
  }, [allProducts])

  // Extract available sizes
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>()
    mappedProducts.forEach(p => p.sizes?.forEach((s: string) => sizes.add(s)))
    return Array.from(sizes).sort()
  }, [mappedProducts])

  // Extract available categories
  const availableCategories = useMemo(() => {
    const cats = new Map<string, { name: string, count: number }>()
    mappedProducts.forEach(p => {
      if (p.collection) {
        const existing = cats.get(p.collection.slug)
        if (existing) {
          cats.set(p.collection.slug, { ...existing, count: existing.count + 1 })
        } else {
          cats.set(p.collection.slug, { name: p.collection.name, count: 1 })
        }
      }
    })
    return Array.from(cats.entries()).map(([slug, data]) => ({ slug, ...data }))
  }, [mappedProducts])

  // Apply filters
  const filteredProducts = useMemo(() => {
    return mappedProducts.filter(p => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.collection?.name.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }
      if (filters.categories.length > 0 && (!p.collection || !filters.categories.includes(p.collection.slug))) {
        return false
      }
      if (filters.priceRanges.length > 0) {
        const price = p.selling_price
        const matchesPrice = filters.priceRanges.some(range => {
          if (range === 'under-1000') return price < 1000
          if (range === '1000-2000') return price >= 1000 && price <= 2000
          if (range === 'over-2000') return price > 2000
          return false
        })
        if (!matchesPrice) return false
      }
      if (filters.sizes.length > 0) {
        if (!p.sizes || !filters.sizes.some((s: string) => p.sizes.includes(s))) {
          return false
        }
      }
      return true
    })
  }, [mappedProducts, filters, searchQuery])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  return (
    <div className="bg-rich-black min-h-screen">
      <CollectionHero name={heroName} tagline="Premium Collection" image={heroImage} />

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Mobile Search & Filter Toggle */}
          <div className="lg:hidden flex flex-col gap-6 mb-12 border-b border-white/5 pb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} className="max-w-none" />
            <div className="flex justify-between items-center">
              <p className="font-sans text-[10px] uppercase tracking-widest text-white/40">
                {filteredProducts.length} Results
              </p>
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-white hover:text-gold transition-colors border border-white/10 py-2 px-4"
              >
                <Filter className="w-3 h-3" /> Filters
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-1/4 max-w-[280px] shrink-0">
              <CollectionSidebar
                filters={filters}
                setFilters={setFilters}
                availableCategories={availableCategories}
                availableSizes={availableSizes}
              />
            </aside>

            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              <div className="hidden lg:flex justify-between items-end mb-12 border-b border-white/5 pb-8">
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-2xl text-white">Products</h2>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-white/40">
                    Showing {filteredProducts.length} Results
                  </p>
                </div>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-16">
                  {filteredProducts.map(product => (
                    <ModernProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center flex flex-col items-center gap-6 border border-white/5 p-10">
                  <p className="font-display text-4xl text-white">No products found</p>
                  <p className="text-white/40 font-body text-sm max-w-sm">
                    {searchQuery
                      ? `No results for "${searchQuery}". Try a different term or clear filters.`
                      : "We couldn't find any products matching your current filters."}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setFilters({ categories: [], priceRanges: [], sizes: [] })
                    }}
                    className="mt-6 border border-gold bg-transparent text-gold hover:bg-gold hover:text-black py-4 px-10 text-xs uppercase tracking-widest transition-all duration-300 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[85vw] sm:w-[380px] bg-rich-black z-50 overflow-y-auto border-l border-white/10 lg:hidden flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/10 sticky top-0 z-10 bg-rich-black">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-white">Filters</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="text-white/40 hover:text-white transition-colors p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
                <CollectionSidebar
                  filters={filters}
                  setFilters={setFilters}
                  availableCategories={availableCategories}
                  availableSizes={availableSizes}
                />
              </div>
              <div className="p-6 border-t border-white/10 sticky bottom-0 bg-rich-black">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-gold hover:bg-gold text-black py-4 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
