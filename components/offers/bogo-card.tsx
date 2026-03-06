'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'

interface BogoCardProps {
    name: string
    buyProducts: {
        name: string
        image: string
        count?: number
    }[]
    getProducts: {
        name: string
        image: string
        count?: number
    }[]
    savingsValue: string | number
    description?: string
    bannerImage?: string | null
    onShopNow: () => void
}

export function BogoCardCompact({
    name,
    buyProducts,
    getProducts,
    savingsValue,
    description,
    bannerImage,
    onShopNow
}: BogoCardProps) {
    const totalBuyCount = buyProducts.reduce((acc, p) => acc + (p.count || 1), 0)
    const totalGetCount = getProducts.reduce((acc, p) => acc + (p.count || 1), 0)
    const isStandardBogo = buyProducts.length === 1 && getProducts.length === 1 && totalBuyCount === 1 && totalGetCount === 1
    const isB2G1 = buyProducts.length === 2 && getProducts.length === 1 && totalBuyCount === 2 && totalGetCount === 1

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#141414] border border-white/5 overflow-hidden min-h-[550px] flex flex-col"
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
                    <div className={isStandardBogo ? "grid grid-cols-[60%_40%] h-full" : "relative min-h-[350px]"}>
                        {isStandardBogo ? (
                            <>
                                <div className="relative overflow-hidden border-r border-white/5">
                                    <motion.img
                                        src={buyProducts[0].image}
                                        alt={buyProducts[0].name}
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
                                        <img src={getProducts[0].image} alt="" className="w-full h-full object-cover opacity-60" />
                                        <img src={buyProducts[0].image} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute top-0 left-0 w-full bg-black/40 py-0.5 text-[6px] uppercase tracking-tighter text-white font-bold text-center">
                                            Buy
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full bg-gold/20 py-0.5 text-[6px] uppercase tracking-tighter text-white font-bold text-center">
                                            Free
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : isB2G1 ? (
                            <div className="w-full h-full flex items-center justify-center bg-black p-4 gap-3 min-h-[400px]">
                                {/* Left Side: 2 Buy Stacked Vertically */}
                                <div className="flex-1 flex flex-col gap-3 h-full">
                                    {buyProducts.map((p, idx) => (
                                        <div key={`buy-split-compact-${idx}`} className="flex-1 relative overflow-hidden border border-white/10 group/item aspect-[3/4]">
                                            <img src={p.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 text-[6px] uppercase tracking-widest text-white border border-white/10 font-bold">Buy</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Middle: Arrow indicator */}
                                <div className="flex-shrink-0">
                                    <ArrowRight size={16} className="text-gold opacity-50" />
                                </div>

                                {/* Right Side: 1 Free Centered Vertically */}
                                <div className="flex-1 flex items-center h-full">
                                    <div className="w-full aspect-[3/4] relative overflow-hidden border border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] group/item">
                                        <img src={getProducts[0].image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute top-1 left-1 px-2 py-0.5 bg-gold text-[6px] uppercase tracking-widest text-black font-bold">Free</div>
                                        <div className="absolute inset-0 bg-gold/5" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="min-h-[400px] flex flex-col items-center justify-center bg-black p-4 md:p-6 gap-3">
                                {/* Buy Group */}
                                <div className="w-full space-y-2">
                                    <span className="block text-[7px] uppercase tracking-[0.2em] text-gold/60 font-medium text-center">You Buy</span>
                                    <div className={`grid ${buyProducts.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 w-full`}>
                                        {buyProducts.map((p, idx) => (
                                            <div key={`buy-${idx}`} className="relative aspect-[3/4] overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                                <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 text-[6px] uppercase tracking-widest text-white border border-white/10 font-bold">Buy</div>
                                                {p.count && p.count > 1 && (
                                                    <div className="absolute bottom-1 right-1 bg-gold px-1 text-[7px] font-bold text-black shadow-lg">x{p.count}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Arrow Indicator */}
                                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-gold/20 bg-gold/5">
                                    <ArrowRight size={12} className="text-gold rotate-90" />
                                </div>

                                {/* Free Group */}
                                <div className="w-full space-y-2">
                                    <span className="block text-[7px] uppercase tracking-[0.2em] text-gold font-bold text-center">You Get Free</span>
                                    <div className={`grid ${getProducts.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 w-full`}>
                                        {getProducts.map((p, idx) => (
                                            <div key={`get-${idx}`} className="relative aspect-[3/4] overflow-hidden border border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:border-gold/60 transition-colors">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                                <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-gold text-[6px] uppercase tracking-widest text-black font-bold">Free Item</div>
                                                {p.count && p.count > 1 && (
                                                    <div className="absolute bottom-1 right-1 bg-black px-1 text-[7px] font-bold text-white border border-white/10">x{p.count}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="p-6 space-y-4 bg-[#141414] border-t border-white/5 transition-colors duration-500 group-hover:bg-[#1a1a1a]">
                <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[8px] uppercase tracking-widest font-bold mb-1">
                        Limited Time Offer
                    </span>
                    <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold font-medium">{isB2G1 ? "Buy 2, Get 1 Free" : name}</h3>
                    <p className="font-serif text-lg text-white/90 line-clamp-1">{isB2G1 ? "Buy any 2 selected items and get 1 free." : (description || `Special Edition BOGO Offer`)}</p>
                </div>

                <div className="space-y-4 pt-2">
                    <div className="text-center">
                        <span className="block font-sans text-[9px] uppercase tracking-widest text-gold/60 font-medium mb-1">You Save</span>
                        <span className="block font-serif text-2xl text-white">₹{savingsValue} <span className="text-[10px] text-gold ml-1 font-sans font-bold">FREE</span></span>
                    </div>

                    <button
                        onClick={onShopNow}
                        className="w-full py-4 bg-white text-black font-sans text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all duration-700 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group/btn shadow-xl shadow-white/5 whitespace-nowrap"
                    >
                        <span className="relative z-10">Shop This Offer</span>
                        <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-2 flex-shrink-0" />
                    </button>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-colors duration-700 pointer-events-none" />
        </motion.div>
    )
}

export function BogoCardWide({
    name,
    buyProducts,
    getProducts,
    savingsValue,
    description,
    bannerImage,
    onShopNow
}: BogoCardProps) {
    const totalBuyCount = buyProducts.reduce((acc, p) => acc + (p.count || 1), 0)
    const totalGetCount = getProducts.reduce((acc, p) => acc + (p.count || 1), 0)
    const isStandardBogo = buyProducts.length === 1 && getProducts.length === 1 && totalBuyCount === 1 && totalGetCount === 1
    const isB2G1 = buyProducts.length === 2 && getProducts.length === 1 && totalBuyCount === 2 && totalGetCount === 1

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
                    className={`lg:w-1/2 relative flex border-r border-white/5 ${isStandardBogo ? 'aspect-[4/3]' : 'lg:aspect-[4/3] min-h-[600px]'} lg:h-auto overflow-hidden cursor-pointer bg-[#050505]`}
                    onClick={onShopNow}
                >
                    {isStandardBogo ? (
                        <>
                            <div className="w-1/2 relative overflow-hidden">
                                <motion.img
                                    src={buyProducts[0].image}
                                    alt={buyProducts[0].name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.3em] font-medium text-white/90">
                                    Buy
                                </div>
                            </div>
                            <div className="w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10" />
                            <div className="w-1/2 relative overflow-hidden">
                                <motion.img
                                    src={getProducts[0].image}
                                    alt={getProducts[0].name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    style={{ transitionDelay: '100ms' }}
                                />
                                <div className="absolute top-6 right-6 z-20 px-4 py-1.5 bg-gold/60 backdrop-blur-md border border-gold/20 text-[9px] uppercase tracking-[0.3em] font-bold text-white">
                                    Free
                                </div>
                            </div>
                        </>
                    ) : isB2G1 ? (
                        <div className="w-full h-full flex items-center justify-center bg-black p-6 md:p-8 gap-4 md:gap-8">
                            {/* Left Side: 2 Buy Stacked Vertically */}
                            <div className="flex-1 flex flex-col gap-4 h-full max-h-[500px]">
                                {buyProducts.map((p, idx) => (
                                    <div key={`buy-split-${idx}`} className="flex-1 relative overflow-hidden border border-white/10 group/item">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                                        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-black/80 text-[7px] uppercase tracking-[0.2em] text-white border border-white/10 font-bold">Buy Item {idx + 1}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Middle: Arrow indicator */}
                            <div className="flex-shrink-0">
                                <ArrowRight size={24} className="text-gold opacity-50" />
                            </div>

                            {/* Right Side: 1 Free Center */}
                            <div className="flex-1 h-full max-h-[500px] flex items-center">
                                <div className="w-full aspect-[3/4] relative overflow-hidden border border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.2)] group/item">
                                    <img src={getProducts[0].image} alt={getProducts[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gold text-[7px] uppercase tracking-[0.3em] text-black font-bold shadow-lg">Free Item</div>
                                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full min-h-[600px] lg:h-full flex flex-col md:flex-row items-center justify-center bg-black p-6 md:p-10 gap-6 md:gap-10">
                            {/* Buy Group */}
                            <div className="flex-1 w-full space-y-4">
                                <span className="block text-[9px] uppercase tracking-[0.3em] text-gold/60 font-medium text-center md:text-left">You Buy</span>
                                <div className={`grid ${buyProducts.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 w-full`}>
                                    {buyProducts.map((p, idx) => (
                                        <div key={`buy-${idx}`} className="relative aspect-[3/4] overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 text-[7px] uppercase tracking-widest text-white border border-white/10 font-bold">Buy</div>
                                            {p.count && p.count > 1 && (
                                                <div className="absolute bottom-2 right-2 bg-gold px-1.5 py-0.5 text-[9px] font-bold text-black shadow-lg">x{p.count}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Directional Indicator */}
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-gold/20 bg-gold/5">
                                <ArrowRight size={24} className="text-gold rotate-90 md:rotate-0" />
                            </div>

                            {/* Free Group */}
                            <div className="flex-1 w-full space-y-4">
                                <span className="block text-[9px] uppercase tracking-[0.3em] text-gold font-bold text-center md:text-left">You Get Free</span>
                                <div className={`grid ${getProducts.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 w-full`}>
                                    {getProducts.map((p, idx) => (
                                        <div key={`get-${idx}`} className="relative aspect-[3/4] overflow-hidden border border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.2)] group-hover:border-gold/60 transition-colors">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-gold text-[7px] uppercase tracking-widest text-black font-bold shadow-lg">Free Item</div>
                                            {p.count && p.count > 1 && (
                                                <div className="absolute bottom-2 right-2 bg-black px-1.5 py-0.5 text-[9px] font-bold text-white border border-white/10">x{p.count}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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
                            className="inline-block px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-[9px] uppercase tracking-[0.3em] font-bold"
                        >
                            Limited Time Offer
                        </motion.span>
                        <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
                            Buy {buyProducts.length}, Get {getProducts.length} Free
                        </h2>
                        <p className="font-sans text-[11px] text-white/40 uppercase tracking-[0.2em]">{name}</p>
                    </div>

                    <p className="font-body text-sm text-white/60 leading-relaxed italic">
                        {description || `Elevate your wardrobe with our curated ${name}. Purchase the premium selection and receive a matching complement on us.`}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 pt-8 w-full">
                        <div className="space-y-1 text-center sm:text-left">
                            <span className="block font-sans text-[9px] uppercase tracking-widest text-gold/60 font-medium">You Save</span>
                            <span className="block font-serif text-3xl text-white">₹{savingsValue} <span className="text-xs text-gold ml-1 font-sans font-bold">FREE</span></span>
                        </div>

                        <button
                            onClick={onShopNow}
                            className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-white text-black font-sans text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all duration-700 flex items-center justify-center gap-2 sm:gap-3 group/btn shadow-xl shadow-white/5 whitespace-nowrap"
                        >
                            Shop This Offer
                            <ArrowRight size={14} className="transition-transform duration-500 group-hover/btn:translate-x-2 flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
    )
}
