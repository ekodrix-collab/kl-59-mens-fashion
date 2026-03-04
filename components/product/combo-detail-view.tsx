'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, ChevronLeft, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Offer } from '@/types'

interface ComboDetailViewProps {
    offer: Offer;
}

export function ComboDetailView({ offer }: ComboDetailViewProps) {
    const [activeImage, setActiveImage] = useState(0)

    const handleOrderClick = () => {
        const phoneNumber = "919876543210";
        const message = `Hi, I am interested in buying the combo offer: ${offer.title} (Offer ID: ${offer.id}).\nCombo Price: ${formatPrice(offer.combo_price || 0)}\nIs it available?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    }

    // Calculate total original selling price sum
    const totalOriginalPrice = offer.combo_items?.reduce((sum, item) => sum + ((item.product?.selling_price || 0) * item.quantity), 0) || 0;
    const finalComboPrice = offer.combo_price || totalOriginalPrice;

    // Collect images from banner or items
    const itemImages = offer.combo_items?.filter(ci => ci.product?.images?.[0]).map(ci => ci.product!.images[0]) || [];
    const images = offer.banner_image ? [offer.banner_image, ...itemImages] : itemImages;

    return (
        <main className="min-h-screen bg-black text-white pt-20 md:pt-24 uppercase">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-6">
                <div className="flex items-center gap-3">
                    <Link href="/shop" className="flex items-center gap-2 text-white/30 hover:text-gold transition-colors">
                        <ChevronLeft size={14} />
                        <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Back to Catalogue</span>
                    </Link>
                    <span className="text-white/10">/</span>
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/50">Combo Offers</span>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:h-[850px] lg:items-stretch">
                    <div className="w-full lg:w-[58%] h-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[3/4] lg:aspect-auto lg:h-full w-full overflow-hidden bg-rich-black mb-4"
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
                                        <>
                                            <Image
                                                src={images[activeImage]}
                                                alt={offer.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                            {totalOriginalPrice > finalComboPrice && (
                                                <div className="absolute top-4 left-4 bg-offer-red text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 z-10 flex items-center gap-1">
                                                    {Math.round((1 - finalComboPrice / totalOriginalPrice) * 100)}% Off
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <span className="text-white/20 font-sans text-xs uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto hide-scrollbar lg:max-h-[80px]">
                                {images.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${activeImage === i ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-80'
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
                        className="w-full lg:w-[42%] flex flex-col h-full lg:overflow-y-auto lg:pr-6 custom-scrollbar"
                        data-lenis-prevent
                    >
                        <div className="mb-6">
                            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-3 block">
                                Combo Offer
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl text-white font-medium leading-tight mb-4 uppercase">
                                {offer.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="font-body text-2xl text-white">
                                    {formatPrice(finalComboPrice)}
                                </span>
                                {totalOriginalPrice > finalComboPrice && (
                                    <>
                                        <span className="font-body text-lg text-white/30 line-through">
                                            {formatPrice(totalOriginalPrice)}
                                        </span>
                                        <span className="font-sans text-[10px] uppercase tracking-wider text-gold bg-gold/10 px-3 py-1">
                                            Save {formatPrice(totalOriginalPrice - finalComboPrice)}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-white/5 mb-6" />

                        {offer.description && (
                            <p className="font-body text-base text-white/60 leading-relaxed mb-6 uppercase">
                                {offer.description}
                            </p>
                        )}

                        <div className="mb-10">
                            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-6">Included within this bundle</h3>
                            <div className="flex flex-col gap-4">
                                {offer.combo_items?.map((item) => (
                                    <Link key={item.id} href={`/shop/${item.product?.slug}`} className="group flex items-center gap-4 p-3 bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                                        <div className="relative w-16 h-20 bg-rich-black overflow-hidden shrink-0">
                                            {item.product?.images?.[0] && (
                                                <Image src={item.product.images[0]} alt={item.product?.name || 'Product'} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-sans text-sm text-white group-hover:text-gold transition-colors">{item.product?.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-sans text-[10px] uppercase tracking-wider text-white/40">Qty: {item.quantity}</span>
                                                <span className="text-white/20 text-[10px]">|</span>
                                                <span className="font-body text-xs text-white/60">{formatPrice(item.product?.selling_price || 0)} each</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

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
                            <div className="flex flex-col">
                                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/60 block mb-1">Store Availability</span>
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

        </main>
    )
}
