"use client";

import { motion } from "framer-motion";
import { useOffers } from "@/hooks/use-offers";

interface OfferHighlightProps {
  priorityType?: 'combo' | 'bogo';
  onlyIfBothExist?: boolean;
}

export function OfferHighlight({ priorityType, onlyIfBothExist }: OfferHighlightProps) {
  const { offersQuery } = useOffers();
  const { data: offers } = offersQuery;

  // Filter active offers
  const activeOffers = offers?.filter(o => o.is_active) || [];

  let activeOffer = null;

  if (priorityType) {
    // Strictly find the latest offer of the requested type
    activeOffer = activeOffers.find(o => o.offer_type === priorityType);
  } else {
    // Default fallback: show the newest active offer of any type if no priority is set
    activeOffer = activeOffers[0];
  }

  if (!activeOffer) return null;

  const isBogo = activeOffer.offer_type === 'bogo';
  const isCombo = activeOffer.offer_type === 'combo';
  const comboItems = activeOffer.combo_items || [];
  const singleProduct = activeOffer.product;

  // Calculate combo savings: (Original Total) - Combo Price
  const comboSavings = isCombo ? comboItems.reduce((acc, item) => {
    const price = item.product?.selling_price || 0;
    return acc + (price * (item.quantity || 1));
  }, 0) - (activeOffer.combo_price || 0) : 0;

  return (
    <section className="bg-black py-24 md:py-40 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {activeOffer.banner_image ? (
              <div className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] bg-zinc-900 overflow-hidden">
                <img
                  src={activeOffer.banner_image}
                  alt={activeOffer.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ) : isBogo && comboItems.length >= 1 ? (
              <div className="relative aspect-[4/5] flex items-center justify-center bg-zinc-950 p-8">
                {/* Buy Product */}
                <motion.div
                  initial={{ rotate: -5, x: -20, opacity: 0 }}
                  whileInView={{ rotate: -8, x: -40, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative z-10 w-[70%] aspect-[3/4] shadow-2xl border border-white/10"
                >
                  <img src={comboItems[0].product?.images?.[0]} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 text-[8px] uppercase tracking-widest text-white border border-white/10">Buy</div>
                </motion.div>

                {/* Get Product (Free) */}
                <motion.div
                  initial={{ rotate: 5, x: 20, opacity: 0 }}
                  whileInView={{ rotate: 12, x: 60, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="absolute z-20 w-[60%] aspect-[3/4] shadow-2xl border border-white/20"
                >
                  <img src={comboItems[1]?.product?.images?.[0] || comboItems[0].product?.images?.[0]} alt="" className="w-full h-full object-cover" />
                  <div className="absolute -top-2 -right-2 bg-gold px-4 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-xl">Free</div>
                </motion.div>
                <div className="absolute top-4 left-4 z-20 bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-2xl">Complete Bundle</div>
              </div>
            ) : isCombo && comboItems.length > 0 ? (
              <div className="relative aspect-[4/5] bg-zinc-950 p-6 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4 pt-12"
                  >
                    <div className="aspect-[3/4] bg-zinc-900 overflow-hidden border border-white/10 shadow-xl group/item relative">
                      <img src={comboItems[0]?.product?.images?.[0]} className="w-full h-full object-cover grayscale-[0.3] group-hover/item:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-[7px] uppercase tracking-widest text-white/60 truncate">{comboItems[0]?.product?.name}</p>
                      </div>
                    </div>
                    {comboItems[2] && (
                      <div className="aspect-[3/4] bg-zinc-900 overflow-hidden border border-white/10 shadow-xl group/item relative">
                        <img src={comboItems[2]?.product?.images?.[0]} className="w-full h-full object-cover grayscale-[0.3] group-hover/item:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-[7px] uppercase tracking-widest text-white/60 truncate">{comboItems[2]?.product?.name}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="aspect-[3/4] bg-zinc-900 overflow-hidden border border-white/10 shadow-xl group/item relative">
                      <img src={comboItems[1]?.product?.images?.[0] || comboItems[0]?.product?.images?.[0]} className="w-full h-full object-cover grayscale-[0.3] group-hover/item:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-[7px] uppercase tracking-widest text-white/60 truncate">{comboItems[1]?.product?.name || comboItems[0]?.product?.name}</p>
                      </div>
                    </div>
                    {comboItems.length > 3 && (
                      <div className="aspect-[3/4] bg-zinc-800 flex items-center justify-center border border-dashed border-white/10">
                        <span className="font-sans text-[10px] text-white/30 uppercase tracking-[0.2em]">+{comboItems.length - 2} More</span>
                      </div>
                    )}
                  </motion.div>
                </div>
                <div className="absolute top-6 right-6 z-30 bg-gold px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-white">Combo Deal</div>
              </div>
            ) : singleProduct?.images?.[0] ? (
              <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden group">
                <img
                  src={singleProduct.images[0]}
                  alt={singleProduct.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ) : (
              <div className="aspect-[4/5] bg-zinc-950 border border-white/5 flex items-center justify-center">
                <span className="text-white/10 uppercase tracking-widest text-xs italic">Limited Edition Collections</span>
              </div>
            )}

            {/* Aesthetic Accents */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-block px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-[0.4em] font-medium"
                >
                  Featured Offer
                </motion.span>

                <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
                  <span className="block italic opacity-80 mb-2">{activeOffer.title}</span>
                  <span className="block font-sans font-bold text-gold tracking-tight text-5xl md:text-7xl uppercase">
                    {(() => {
                      if (activeOffer.offer_type === 'bogo') {
                        return activeOffer.discount_value
                          ? `Save ₹${activeOffer.discount_value}`
                          : "Buy 1 Get 1 Free";
                      }

                      if (activeOffer.offer_type === 'combo') {
                        return comboSavings > 0
                          ? `Save ₹${comboSavings}`
                          : activeOffer.combo_price
                            ? `Only ₹${activeOffer.combo_price}`
                            : "Combo Deal";
                      }

                      // Product Offer / Default
                      if (activeOffer.discount_value) {
                        return activeOffer.discount_type === 'percentage'
                          ? `Flat ${activeOffer.discount_value}% Off`
                          : `₹${activeOffer.discount_value} Off`;
                      }

                      // Fallback: If no discount value but we have a product, show savings between MRP and Selling Price
                      const p = activeOffer.product;
                      if (p && p.mrp > p.selling_price) {
                        return `Save ₹${p.mrp - p.selling_price}`;
                      }

                      return "Exclusive Deal";
                    })()}
                  </span>
                </h2>
              </div>

              <p className="font-body text-white/50 text-base md:text-lg leading-relaxed max-w-lg italic">
                {activeOffer.description || "Indulge in our curated selection of premium menswear. Crafted for those who demand excellence in every detail."}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
                <a
                  href={activeOffer.product_id ? `/product/${activeOffer.product_id}` : `/offers/${activeOffer.id}`}
                  className="inline-block bg-white text-black px-12 py-5 font-sans text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-all duration-500 shadow-xl"
                >
                  Shop The Offer
                </a>

                <a
                  href="/shop"
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-500 py-2 border-b border-transparent hover:border-white/20"
                >
                  View All Collections
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
