'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface BogoCardProps {
    name: string
    buyProduct: {
        name: string
        image: string
    }
    getProduct: {
        name: string
        image: string
    }
    savingsValue: string | number
    description?: string
    bannerImage?: string | null
    onShopNow: () => void
}

export function BogoCardCompact({
    name,
    buyProduct,
    getProduct,
    savingsValue,
    description,
    bannerImage,
    onShopNow
}: BogoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#141414] border border-white/5 overflow-hidden h-[480px] flex flex-col"
        >
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-20" />

            {/* Main Visual Area */}
            <div className="relative flex-1 overflow-hidden cursor-pointer" onClick={onShopNow}>
                {bannerImage ? (
                    <motion.img
                        src={bannerImage}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                ) : (
                    <div className="grid grid-cols-[60%_40%] h-full">
                        <div className="relative overflow-hidden border-r border-white/5">
                            <motion.img
                                src={buyProduct.image}
                                alt={buyProduct.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[8px] uppercase tracking-[0.2em] font-medium text-white/90">
                                Buy
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="bg-[#0a0a0a] flex flex-col justify-center items-center p-6 text-center relative">
                            <div className="space-y-1">
                                <span className="block font-sans text-[10px] uppercase tracking-[0.4em] text-white/40">Buy</span>
                                <span className="block font-serif text-4xl lg:text-5xl text-white leading-none">ONE</span>
                                <div className="w-8 h-px bg-gold/30 my-4" />
                                <span className="block font-sans text-[10px] uppercase tracking-[0.4em] text-white/40">Get One</span>
                                <span className="block font-accent italic text-3xl lg:text-4xl text-gold leading-none">Free</span>
                            </div>

                            {/* Mini Product Thumb */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-16 border border-white/10 overflow-hidden bg-white/5 group-hover:border-gold/30 transition-colors">
                                <img src={getProduct.image} alt="" className="w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 bg-gold/10 pointer-events-none" />
                                <div className="absolute top-0 left-0 w-full bg-gold/20 py-0.5 text-[6px] uppercase tracking-tighter text-white font-bold text-center">Free</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-8 space-y-4 bg-[#141414] border-t border-white/5 transition-colors duration-500 group-hover:bg-[#1a1a1a]">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold font-medium">{name}</h3>
                        <p className="font-serif text-lg text-white/90 line-clamp-1">{description || `Special Edition BOGO Offer`}</p>
                    </div>
                    <div className="text-right">
                        <span className="block font-sans text-[9px] uppercase tracking-widest text-white/30 mb-1">Savings</span>
                        <span className="block font-serif text-xl text-white">₹{savingsValue}</span>
                    </div>
                </div>

                <button
                    onClick={onShopNow}
                    className="w-full py-4 border border-gold/40 text-[10px] uppercase tracking-[0.3em] text-white hover:bg-gold hover:border-gold hover:text-black transition-all duration-700 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                >
                    <span className="relative z-10">BUY NOW</span>
                    <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-2" />
                </button>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-colors duration-700 pointer-events-none" />
        </motion.div>
    )
}

export function BogoCardWide({
    name,
    buyProduct,
    getProduct,
    savingsValue,
    description,
    bannerImage,
    onShopNow
}: BogoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden min-h-[400px] flex flex-col lg:flex-row"
        >
            {/* Banner Priority */}
            {bannerImage ? (
                <div
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={onShopNow}
                >
                    <img
                        src={bannerImage}
                        alt={name}
                        className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                </div>
            ) : null}

            {/* Visual Section (Left) - Only if no banner */}
            {!bannerImage && (
                <div
                    className="lg:w-1/2 relative flex border-r border-white/5 aspect-[4/3] min-h-[400px] lg:h-auto overflow-hidden cursor-pointer"
                    onClick={onShopNow}
                >
                    <div className="w-1/2 relative overflow-hidden">
                        <motion.img
                            src={buyProduct.image}
                            alt={buyProduct.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.3em] font-medium text-white/90">
                            Buy
                        </div>
                    </div>
                    <div className="w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10" />
                    <div className="w-1/2 relative overflow-hidden">
                        <motion.img
                            src={getProduct.image}
                            alt={getProduct.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            style={{ transitionDelay: '100ms' }}
                        />
                        <div className="absolute top-6 right-6 z-20 px-4 py-1.5 bg-gold/60 backdrop-blur-md border border-gold/20 text-[9px] uppercase tracking-[0.3em] font-bold text-white">
                            Free
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
            )}

            {/* Content Section (Right/Overlay) */}
            <div className={`relative flex-1 p-10 lg:p-16 flex flex-col justify-center items-start z-10 ${bannerImage ? 'lg:w-2/3' : 'lg:w-1/2'}`}>
                <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-block px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-[9px] uppercase tracking-[0.3em] font-medium"
                        >
                            Exclusive BOGO
                        </motion.span>
                        <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
                            Buy One, <span className="font-accent italic text-gold">Get One</span>
                        </h2>
                        <p className="font-sans text-[11px] text-white/40 uppercase tracking-[0.2em]">{name}</p>
                    </div>

                    <p className="font-body text-sm text-white/60 leading-relaxed italic">
                        {description || `Elevate your wardrobe with our curated ${name}. Purchase the premium selection and receive a matching complement on us.`}
                    </p>

                    <div className="flex items-center gap-12 pt-4">
                        <div className="space-y-1">
                            <span className="block font-sans text-[9px] uppercase tracking-widest text-white/30">Total Value</span>
                            <span className="block font-serif text-3xl text-gold">₹{savingsValue} <span className="text-xs text-white/40 ml-1 font-sans">FREE</span></span>
                        </div>

                        <button
                            onClick={onShopNow}
                            className="px-10 py-4 bg-white text-black font-sans text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-gold hover:text-white transition-all duration-700 flex items-center gap-3 group/btn"
                        >
                            BUY NOW
                            <ArrowRight size={14} className="transition-transform duration-500 group-hover/btn:translate-x-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
    )
}
