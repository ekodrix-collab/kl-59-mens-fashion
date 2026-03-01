'use client'

import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { RevealImage } from '@/components/ui/reveal-image'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600'

  return (
    <Link href={`/shop/${product.slug}`} className="group block" data-cursor="view">
      <div className="relative overflow-hidden bg-brand-light">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <RevealImage 
            src={primaryImage}
            alt={product.name}
            aspectRatio="portrait"
            className="aspect-[3/4.5]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Subtle Overlay on hover */}
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors duration-500" />
          
          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.is_new_arrival && (
              <span className="bg-white text-brand-black px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
                New Arrival
              </span>
            )}
            {product.discount_percent > 0 && (
              <span className="bg-accent text-brand-black px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
                -{product.discount_percent}%
              </span>
            )}
          </div>
        </div>

        {/* Product Info - Minimalist */}
        <div className="pt-6 pb-4 flex flex-col items-center text-center">
          <p className="font-montserrat text-[9px] uppercase tracking-[0.3em] text-text-subtle mb-2">
            KL-59 ESSENTIALS
          </p>
          <h3 className="font-montserrat text-sm font-medium text-text-primary tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-3">
            {product.mrp > product.selling_price && (
              <span className="font-inter text-xs line-through text-text-subtle">
                {formatPrice(product.mrp)}
              </span>
            )}
            <span className="font-inter text-sm font-semibold text-text-primary">
              {formatPrice(product.selling_price)}
            </span>
          </div>
          
          {/* Quick Info - reveal on hover */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="font-montserrat text-[10px] uppercase tracking-[0.1em] text-accent">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
