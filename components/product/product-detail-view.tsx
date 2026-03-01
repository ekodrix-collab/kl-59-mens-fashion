'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, MessageSquare, ChevronLeft, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { generateWhatsAppURL } from '@/lib/whatsapp'
import { WhatsAppDrawer } from '@/components/product/whatsapp-drawer'
import { toast } from 'react-hot-toast'
import type { Product } from '@/types'

interface ProductDetailViewProps {
  product: Product;
  related: Product[];
}

export function ProductDetailView({ product, related }: ProductDetailViewProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleOrderClick = () => {
    if (!selectedSize && (product?.sizes?.length ?? 0) > 0) {
      toast.error('Please select a size', {
        icon: String.fromCodePoint(0x1F4CF),
        style: {
          borderRadius: '0',
          background: '#111',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }
      })
      return
    }
    setIsDrawerOpen(true)
  }

  const confirmWhatsAppOrder = () => {
    if (!product) return
    const url = generateWhatsAppURL(product, selectedSize, selectedColor)
    window.open(url, '_blank')
  }

  const images = product.images || []
  const primaryCat = product?.product_categories?.find((pc: any) => pc.is_primary)?.category
  const categoryName = primaryCat?.name || product.product_categories?.[0]?.category?.name || 'Collection'

  return (
    <main className="min-h-screen bg-black text-white pt-24 md:pt-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <div className="flex items-center gap-3">
          <Link href="/shop" className="flex items-center gap-2 text-white/30 hover:text-gold transition-colors">
            <ChevronLeft size={14} />
            <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Back to Catalogue</span>
          </Link>
          <span className="text-white/10">/</span>
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/50">{categoryName}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="w-full lg:w-[58%]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full overflow-hidden bg-rich-black mb-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {images[activeImage] ? (
                    <Image
                      src={images[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <span className="text-white/20 font-sans text-xs uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === i ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[42%] flex flex-col"
          >
            <div className="mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">
                {categoryName}
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-white font-medium leading-tight mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="font-body text-2xl text-white">
                  {formatPrice(product.selling_price)}
                </span>
                {product.mrp > product.selling_price && (
                  <>
                    <span className="font-body text-lg text-white/30 line-through">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-gold bg-gold/10 px-3 py-1">
                      Save {formatPrice(product.mrp - product.selling_price)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5 mb-8" />

            {product.description && (
              <p className="font-body text-base text-white/60 leading-relaxed mb-10">
                {product.description}
              </p>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                  Color — {selectedColor || 'Select'}
                </span>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2.5 border font-sans text-[10px] uppercase tracking-wider transition-all duration-300 ${
                        selectedColor === color
                          ? 'border-gold text-gold bg-gold/5'
                          : 'border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-10">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                  Size
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center border font-sans text-xs uppercase tracking-wider transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pb-24 md:pb-0">
              <button
                onClick={handleOrderClick}
                className="hidden md:flex w-full bg-[#25D366] text-white font-sans text-[11px] font-medium uppercase tracking-[0.2em] py-5 transition-all items-center justify-center gap-3 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-green-500/20"
              >
                <MessageSquare size={18} />
                Order on WhatsApp
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                <MapPin size={16} className="text-white/40" />
              </div>
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/60 block">Store Availability</span>
                <Link href="/store" className="font-sans text-[10px] text-gold hover:text-white transition-colors">
                  Visit KL-59 Showroom →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-50 md:hidden">
        <button
          onClick={handleOrderClick}
          className="w-full bg-[#25D366] text-white font-sans text-[11px] font-medium uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
        >
          <MessageSquare size={16} />
          Order on WhatsApp
        </button>
      </div>

      {related.length > 0 && (
        <section className="border-t border-white/5 py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">You May Also Like</span>
                <h2 className="font-display text-3xl md:text-4xl text-white">Related <span className="italic">Pieces</span></h2>
              </div>
              <Link href="/shop" className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p: any) => (
                <Link key={p.id} href={`/shop/${p.slug}`} className="group">
                    <div className="aspect-[3/4] bg-rich-black overflow-hidden mb-4 relative">
                      {p.images?.[0] ? (
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                      <div className="w-full h-full bg-white/5" />
                    )}
                  </div>
                  <h3 className="font-sans text-sm text-white group-hover:text-gold transition-colors">{p.name}</h3>
                  <span className="font-body text-sm text-white/50">{formatPrice(p.selling_price)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhatsAppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onConfirm={confirmWhatsAppOrder}
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </main>
  )
}
