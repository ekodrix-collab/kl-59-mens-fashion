'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import OfferMarquee from '@/components/layout/offer-marquee'
import MobileNav from '@/components/layout/mobile-nav'
import WhatsAppFAB from '@/components/layout/whatsapp-fab'
import PriceDisplay from '@/components/ui/price-display'
import ProductCard from '@/components/products/product-card'
import { PLACEHOLDER_PRODUCTS, PLACEHOLDER_CATEGORIES } from '@/lib/constants'
import { generateWhatsAppURL } from '@/lib/whatsapp'
import { MapPin, ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import { motion } from 'framer-motion'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = PLACEHOLDER_PRODUCTS.find(p => p.slug === slug) || PLACEHOLDER_PRODUCTS[0]
  const category = PLACEHOLDER_CATEGORIES.find(c => c.id === product.category_id)

  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '')
  
  const related = PLACEHOLDER_PRODUCTS.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4)

  const handleOrder = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Please select a size first')
      return
    }
    window.open(generateWhatsAppURL(product as Product, selectedSize, selectedColor), '_blank')
  }

  const colorMap: Record<string, string> = {
    blue: '#3B82F6', black: '#1a1a1a', grey: '#6B7280', white: '#f3f3f3',
    navy: '#1e3a5f', olive: '#556B2F', beige: '#C8A97E', khaki: '#C8A97E',
    charcoal: '#4B5563', 'sky blue': '#87CEEB',
  }

  return (
    <>
      <OfferMarquee />
      <Header variant="dark" />

      <main className="min-h-screen bg-white">
        <div className="max-w-[1600px] mx-auto px-10 pt-[140px] pb-32">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Image Section */}
            <div className="lg:w-[60%]">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="aspect-[4/5] bg-brand-light overflow-hidden"
              >
                <img 
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=90&w=1200'} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            </div>

            {/* Product Details Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="lg:w-[40%] flex flex-col pt-4"
            >
              <div className="mb-12">
                <p className="font-montserrat text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4">
                  {category?.name || 'NEW SERIES'}
                </p>
                <h1 className="font-editorial text-4xl md:text-6xl text-text-primary mb-6 leading-tight">
                  {product.name}
                </h1>
                <div className="h-px w-20 bg-accent mb-8" />
                <PriceDisplay mrp={product.mrp} sellingPrice={product.selling_price} discountPercent={product.discount_percent} size="lg" />
              </div>

              <div className="space-y-12 mb-16">
                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div>
                    <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-text-muted block mb-4">Selection / {selectedColor}</span>
                    <div className="flex gap-4">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full transition-all duration-300 ${
                            selectedColor === color ? 'ring-1 ring-offset-4 ring-text-primary' : 'opacity-60 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: colorMap[color.toLowerCase()] || '#C8A97E' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div>
                    <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-text-muted block mb-4">Architecture / Size Selection</span>
                    <div className="flex gap-3 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[50px] h-[50px] border border-brand-light font-montserrat text-[11px] uppercase tracking-widest transition-all duration-500 ${
                            selectedSize === size
                              ? 'bg-brand-black text-white border-brand-black'
                              : 'hover:border-accent hover:text-accent'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrder}
                className="group relative w-full py-6 bg-brand-black overflow-hidden mb-12"
              >
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-editorial" />
                <div className="relative z-10 flex items-center justify-center gap-4 text-white group-hover:text-brand-black transition-colors duration-500">
                  <span className="font-montserrat text-xs uppercase tracking-[0.3em] font-bold">Secure via WhatsApp</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </button>

              <p className="font-inter text-sm text-text-subtle leading-relaxed mb-10 opacity-70">
                {product.description || "Experimental design meets classic tailoring. This piece is part of our limited 2025 drop, focusing on structural integrity and premium hand-feel."}
              </p>

              <div className="pt-10 border-t border-brand-light flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full border border-brand-light flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                  <MapPin size={16} className="text-text-muted group-hover:text-accent" />
                </div>
                <div>
                  <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-text-primary block">Store Availability</span>
                  <Link href="/contact" className="font-inter text-[11px] text-text-subtle hover:text-accent transition-colors">View in KL-59 Showroom</Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Collection */}
          {related.length > 0 && (
            <div className="mt-40">
              <div className="flex items-end justify-between mb-16 border-b border-brand-light pb-8">
                <div>
                  <span className="font-montserrat text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block">SUGGESTIONS</span>
                  <h2 className="font-editorial text-4xl text-text-primary">Related <span className="italic">Series</span></h2>
                </div>
                <Link href="/shop" className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary border-b border-text-muted/20 pb-1">Review All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
      <MobileNav />
    </>
  )
}
