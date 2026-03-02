'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Offer } from '@/types'

interface ComboCardProps {
    offer: Offer
}

export default function ComboCard({ offer }: ComboCardProps) {
    const items = offer.combo_items || []

    return (
        <div className="group relative bg-rich-black/40 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-700 hover:border-gold/30">
            {/* Premium Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold font-bold">
                        PREMIUM BUNDLE
                    </span>
                    <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-500">
                        {offer.title}
                    </h3>
                </div>
                <div className="bg-gold/10 backdrop-blur-md border border-gold/20 px-4 py-2">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                        COMBO PRICE: {formatPrice(offer.combo_price || 0)}
                    </span>
                </div>
            </div>

            {/* Visual Representation */}
            <Link href={`/offers/${offer.id}`} className="relative aspect-[16/10] mt-24 mb-6 px-10 flex items-center justify-center gap-4 cursor-pointer">
                {items.slice(0, 2).map((item, idx) => (
                    <div key={item.id} className="relative flex-1 aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-700">
                        {item.product?.images?.[0] ? (
                            <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] uppercase tracking-widest text-white/20">
                                Product {idx + 1}
                            </div>
                        )}
                        {/* Simple label for each product in combo */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 border-t border-white/5">
                            <p className="text-[8px] uppercase tracking-widest text-white/60 truncate">{item.product?.name}</p>
                        </div>
                    </div>
                ))}

                {/* Plus Sign */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-200">
                        <Plus size={20} strokeWidth={3} />
                    </div>
                </div>
            </Link>

            {/* Footer Info */}
            <div className="px-8 pb-8 flex flex-col items-center text-center">
                <p className="font-body text-xs text-muted mb-6 max-w-[280px]">
                    {offer.description || "Curated premium selection harmoniously bundled for the modern gentleman."}
                </p>

                <Link
                    href={`/offers/${offer.id}`}
                    className="group/link flex items-center gap-4 font-sans text-[9px] uppercase tracking-[0.4em] font-bold text-white hover:text-gold transition-colors"
                >
                    BUY NOW
                    <span className="inline-block transform group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
            </div>

            {/* Side Decorative Borders */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        </div>
    )
}
