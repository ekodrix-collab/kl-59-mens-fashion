"use client";

import { motion } from "framer-motion";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { RevealImage } from "@/components/ui/reveal-image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export function ModernProductCard({ product, fullWidth }: { product: any; fullWidth?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col gap-4"
        >
            <Link href={`/shop/${product.slug}`} className="block relative overflow-hidden bg-dark-soft">
                <RevealImage
                    src={product.images[0]}
                    alt={product.name}
                    aspectRatio={fullWidth ? "landscape" : "portrait"}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {product.is_new_arrival && (
                    <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 z-10">
                        New
                    </div>
                )}
                {product.discount_percent > 0 && (
                    <div className="absolute top-4 left-4 bg-offer-red text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 z-10 flex items-center gap-1">
                        {product.discount_percent}% Off
                    </div>
                )}
            </Link>

            <div className="flex flex-col gap-3 mt-2">
                <div className="flex justify-between items-start gap-4">
                    <Link href={`/shop/${product.slug}`} className="flex flex-col gap-1.5 flex-1">
                        <h3 className="font-sans text-base md:text-lg text-white font-medium group-hover:text-gold transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="font-sans text-[10px] md:text-[11px] text-muted uppercase tracking-wider">
                            {product.collection?.name || 'Collection'}
                        </p>
                    </Link>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="font-body text-base md:text-lg text-white font-medium">
                            {formatPrice(product.selling_price)}
                        </span>
                        {product.mrp > product.selling_price && (
                            <span className="font-body text-xs text-subtle line-through">
                                {formatPrice(product.mrp)}
                            </span>
                        )}
                    </div>
                </div>

                {/* WhatsApp Buy Now Button */}
                <a
                    href={generateWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full flex items-center justify-center gap-2 border border-dark-border bg-transparent hover:bg-gold text-white hover:text-black hover:border-gold transition-all duration-300 py-3 md:py-3.5 px-4 font-sans text-xs uppercase tracking-widest font-medium group/btn"
                >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 absolute right-4 md:right-6 hidden sm:block" />
                </a>
            </div>
        </motion.div>
    );
}
