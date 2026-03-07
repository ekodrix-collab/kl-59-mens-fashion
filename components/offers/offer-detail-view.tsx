'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, ChevronLeft, MapPin, ArrowRight, Package, Plus, Check, ShieldCheck, Award, Tag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Offer, Product } from '@/types'

interface OfferDetailViewProps {
    offer: Offer;
}

export function OfferDetailView({ offer }: OfferDetailViewProps) {
    const [activeImage, setActiveImage] = useState(0)

    const buyItemsCount = offer.offer_type === 'bogo' ? (offer.combo_price ? Number(offer.combo_price) : 1) : 0;
    const buyItems = offer.offer_type === 'bogo' ? offer.combo_items?.slice(0, buyItemsCount) || [] : [];
    const freeItems = offer.offer_type === 'bogo' ? offer.combo_items?.slice(buyItemsCount) || [] : [];

    // Calculate total original price (using selling_price)
    // For BOGO: Buy X Get Y Free -> Total original price is sum of all items in combo_items
    const totalOriginalPrice = (offer.offer_type === 'combo' || offer.offer_type === 'bogo')
        ? (offer.combo_items?.reduce((sum, item) => sum + ((item.product?.selling_price || 0) * item.quantity), 0) || 0)
        : (offer.product?.selling_price || 0);

    const sellingPriceValue = offer.offer_type === 'combo'
        ? (offer.combo_price || totalOriginalPrice)
        : offer.offer_type === 'bogo'
            ? (buyItems.reduce((sum, item) => sum + ((item.product?.selling_price || 0) * item.quantity), 0) || 0)
            : (offer.product?.selling_price || 0);

    // Collect images based on offer type
    const getImages = () => {
        // Exclude banner image from the gallery as per requirements
        if (offer.offer_type === 'product_offer' && offer.product?.images) {
            return offer.product.images;
        }

        const itemImages = offer.combo_items?.filter(ci => ci.product?.images?.[0]).map(ci => ci.product!.images[0]) || [];
        return itemImages;
    }

    const images = getImages();

    const handleWhatsAppOrder = () => {
        const WHATSAPP_NUMBER = "919895884796";
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kl-59mensfashion.in";

        let msg = `Hi KL-59! ✨\n\nI am interested in this offer:\n\n`;

        if (offer.offer_type === 'combo') {
            msg += `🎁 *COMBO: ${offer.title.toUpperCase()}*\n`;
            msg += `💰 Price: ${formatPrice(offer.combo_price || 0)}\n`;
            msg += `📦 Includes: ${offer.combo_items?.map(i => `${i.product?.name} (x${i.quantity})`).join(', ')}\n`;
        } else if (offer.offer_type === 'bogo') {
            msg += `🔥 *BOGO: ${offer.title.toUpperCase()}*\n`;
            const buyItemsText = buyItems.map(i => `${i.product?.name}${i.quantity > 1 ? ` (x${i.quantity})` : ''}`).join(', ') || 'Item';
            const freeItemsText = freeItems.map(i => `${i.product?.name}${i.quantity > 1 ? ` (x${i.quantity})` : ''}`).join(', ') || 'Free Item';
            msg += `🛒 Buy: ${buyItemsText}\n`;
            msg += `✨ Get Free: ${freeItemsText}\n`;
        } else {
            msg += `🏷️ *OFFER: ${offer.title.toUpperCase()}*\n`;
            msg += `👕 Product: ${offer.product?.name}\n`;
            msg += `💰 Offer Price: ${formatPrice(offer.product?.selling_price || 0)}\n`;
        }

        msg += `\n🔗 View on site: ${SITE_URL}/offers/${offer.id}\n\nIs it available? 🙏`;

        const encodedMessage = encodeURIComponent(msg);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    }

    return (
        <main className="min-h-screen bg-black text-white pt-20 md:pt-24 uppercase">
            {/* Breadcrumbs */}
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-6 font-sans">
                <div className="flex items-center gap-3">
                    <Link href="/offers" className="flex items-center gap-2 text-white/30 hover:text-gold transition-colors">
                        <ChevronLeft size={14} />
                        <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Back to Offers</span>
                    </Link>
                    <span className="text-white/10">/</span>
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/50">
                        {offer.offer_type === 'bogo' ? 'Buy One Get One' : offer.offer_type === 'combo' ? 'Combo Collection' : 'Special Offer'}
                    </span>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:h-[850px] lg:items-stretch">

                    {/* Visual Section */}
                    <div className="w-full lg:w-[58%] h-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[3/4] lg:aspect-auto lg:h-full w-full overflow-hidden bg-rich-black mb-4"
                        >
                            {/* Offer Badge Overlay */}
                            <div className="absolute top-8 left-8 z-20">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-gold text-black px-6 py-2 font-sans text-[10px] uppercase tracking-[0.3em] font-bold shadow-2xl"
                                >
                                    {offer.offer_type === 'bogo' ? 'BOGO FREE' : offer.offer_type === 'combo' ? 'COMBO PRICE' : 'LIMITED OFFER'}
                                </motion.div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    {images[activeImage] ? (
                                        <Image
                                            src={images[activeImage]}
                                            alt={offer.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                                            <Package className="text-gold/20 mr-2" />
                                            <span className="text-white/20 font-sans text-[10px] uppercase tracking-[0.2em]">Exquisite Collection</span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto hide-scrollbar lg:max-h-[80px]">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative aspect-[3/4] w-24 flex-shrink-0 overflow-hidden border-2 transition-all duration-500 ${activeImage === i ? 'border-gold' : 'border-transparent opacity-40 hover:opacity-70'
                                            }`}
                                    >
                                        <Image src={img} alt={`Slide ${i + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-[42%] flex flex-col h-full lg:overflow-y-auto lg:pr-6 custom-scrollbar"
                        data-lenis-prevent
                    >
                        <div className="mb-10 lg:mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-3 mb-6"
                            >
                                <span className="h-px w-8 bg-gold/40" />
                                <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold font-bold">
                                    {offer.offer_type.replace('_', ' ')}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-display text-4xl md:text-5xl text-white font-medium italic mb-6 uppercase"
                            >
                                {offer.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-6"
                            >
                                <div className="space-y-1">
                                    <span className="block font-sans text-[9px] uppercase tracking-widest text-white/30 truncate">Proposition Value</span>
                                    <span className="block font-serif text-3xl text-white">
                                        {formatPrice(sellingPriceValue)}
                                    </span>
                                </div>

                                {totalOriginalPrice > sellingPriceValue && (
                                    <>
                                        <div className="h-10 w-px bg-white/10" />
                                        <div className="space-y-1">
                                            <span className="block font-sans text-[9px] uppercase tracking-widest text-white/30">Total Value</span>
                                            <span className="block font-body text-xl text-white/30 line-through">
                                                {formatPrice(totalOriginalPrice)}
                                            </span>
                                        </div>
                                        <div className="bg-gold/10 px-4 py-2 border border-gold/20">
                                            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                                                Save {formatPrice(totalOriginalPrice - sellingPriceValue)}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-10" />

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-12"
                        >
                            <h3 className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/40 mb-4">Curated Details</h3>
                            <p className="font-body text-base text-white/70 leading-relaxed max-w-lg">
                                {offer.description || "A masterfully curated proposition for the discerning gentleman. Experience the nexus of traditional craftsmanship and contemporary luxury at exceptional value."}
                            </p>
                        </motion.div>

                        {/* Offer Specific Implementation */}
                        <div className="mb-12">
                            {offer.offer_type === 'combo' && (
                                <div className="space-y-6">
                                    <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold border-b border-gold/10 pb-4">Bundle Composition</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {offer.combo_items?.map((item, idx) => (
                                            <Link key={item.id} href={`/shop?offer=${offer.id}`} className="group flex items-center gap-6 p-4 bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all duration-500">
                                                <div className="relative w-20 h-24 bg-[#0A0A0A] overflow-hidden shrink-0 border border-white/5">
                                                    {item.product?.images?.[0] && (
                                                        <Image src={item.product.images[0]} alt={item.product?.name || 'Product'} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <span className="font-sans text-[8px] uppercase tracking-widest text-gold/60 mb-1">Item {idx + 1}</span>
                                                    <h4 className="font-sans text-sm text-white group-hover:text-gold transition-colors">{item.product?.name}</h4>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <div className="px-2 py-0.5 border border-white/10 rounded-sm">
                                                            <span className="font-sans text-[8px] uppercase tracking-tighter text-white/40">Qty: {item.quantity}</span>
                                                        </div>
                                                        <Check size={10} className="text-gold opacity-50" />
                                                    </div>
                                                </div>
                                                <ArrowRight size={14} className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {offer.offer_type === 'bogo' && (
                                <div className="space-y-6">
                                    <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold border-b border-gold/10 pb-4">The Proposition</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Buy Part(s) */}
                                        <div className="p-6 bg-white/[0.03] border border-white/5 space-y-4">
                                            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/40">Acquisition</span>
                                            <div className="flex flex-col gap-3">
                                                {buyItems.map((item, idx) => (
                                                    <div key={item.id} className="flex flex-col gap-1">
                                                        <h4 className="font-sans text-sm md:text-md text-white uppercase line-clamp-1">{item.product?.name || 'Primary Piece'}</h4>
                                                        {item.quantity > 1 && <span className="text-[10px] text-white/40">Quantity: {item.quantity}</span>}
                                                    </div>
                                                ))}
                                                <span className="font-sans text-[10px] text-gold uppercase tracking-widest mt-2">{buyItemsCount > 1 ? 'Buy These' : 'Buy One'}</span>
                                            </div>
                                        </div>
                                        {/* Free Part(s) */}
                                        <div className="p-6 bg-gold/5 border border-gold/10 space-y-4 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                                <Award size={40} className="text-gold" />
                                            </div>
                                            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold/60">Complementary</span>
                                            <div className="flex flex-col gap-3">
                                                {freeItems.map((item, idx) => (
                                                    <div key={item.id} className="flex flex-col gap-1">
                                                        <h4 className="font-sans text-sm md:text-md text-white uppercase line-clamp-1">{item.product?.name || 'Secondary Piece'}</h4>
                                                        {item.quantity > 1 && <span className="text-[10px] text-white/40">Quantity: {item.quantity}</span>}
                                                    </div>
                                                ))}
                                                <span className="font-sans text-[11px] text-gold uppercase tracking-widest font-bold mt-2">Get Free</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {offer.offer_type === 'product_offer' && offer.product && (
                                <div className="p-8 bg-white/[0.02] border border-white/5 flex items-center justify-between group">
                                    <div className="space-y-2">
                                        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold">Featured Item</span>
                                        <h4 className="font-sans text-xl text-white uppercase">{offer.product.name}</h4>
                                    </div>
                                    <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                                        <Tag size={20} className="text-gold group-hover:text-black transition-colors" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA Section */}
                        <div className="mt-auto space-y-6">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleWhatsAppOrder}
                                className="w-full bg-[#25D366] text-white font-sans text-[11px] font-bold uppercase tracking-[0.3em] py-6 flex items-center justify-center gap-4 group transition-shadow hover:shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                            >
                                <MessageSquare size={20} />
                                Order on WhatsApp
                            </motion.button>

                            <div className="grid grid-cols-2 gap-4 pb-24 md:pb-0">
                                <Link
                                    href="/store"
                                    className="flex flex-col p-4 border border-white/5 hover:border-white/20 transition-all group"
                                >
                                    <MapPin size={14} className="text-white/30 mb-3 group-hover:text-gold transition-colors" />
                                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-white/40 mb-1">Experience In-Store</span>
                                    <span className="font-sans text-[9px] text-white group-hover:text-gold transition-colors">Visit KL-59 Showroom →</span>
                                </Link>
                                <div className="flex flex-col p-4 border border-white/5">
                                    <ShieldCheck size={14} className="text-white/30 mb-3" />
                                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-white/40 mb-1">Authenticity Guaranteed</span>
                                    <span className="font-sans text-[9px] text-white">Genuine Boutique Pieces</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Bottom Bar Overlay */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-50 md:hidden backdrop-blur-sm border-t border-white/5">
                <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] text-white font-sans text-[11px] font-bold uppercase tracking-[0.3em] py-5 flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
                >
                    <MessageSquare size={16} />
                    Order via WhatsApp
                </button>
            </div>
        </main>
    )
}
