'use client'

import { RevealImage } from '@/components/ui/reveal-image'
import { Plus, Loader2 } from 'lucide-react'
import { useOffers } from '@/hooks/use-offers'
import { useRouter } from 'next/navigation'
import { BogoCardWide } from '@/components/offers/bogo-card'
import ComboCard from '@/components/products/combo-card'
import { motion } from 'framer-motion'

export function OffersView() {
  const { offersQuery } = useOffers()
  const { data: offers, isPending } = offersQuery
  const router = useRouter()

  const activeOffers = offers?.filter(o => o.is_active) || []

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  const bogoOffers = activeOffers.filter(o => o.offer_type === 'bogo')
  const comboOffers = activeOffers.filter(o => o.offer_type === 'combo')
  const otherOffers = activeOffers.filter(o => o.offer_type !== 'bogo' && o.offer_type !== 'combo')

  return (
    <section className="bg-black py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="space-y-40">
          {bogoOffers.length > 0 && (
            <div className="space-y-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold font-medium">Buy One Get One Free</h2>
                <div className="flex-1 h-px bg-gold/20" />
              </div>

              <div className="grid grid-cols-1 gap-16">
                {bogoOffers.map((offer) => {
                  const items = offer.combo_items || []
                  const buyItemsCount = offer.combo_price ? Number(offer.combo_price) : 1;
                  const buyItems = items.slice(0, buyItemsCount);
                  const freeItems = items.slice(buyItemsCount);

                  const cardProps = {
                    name: offer.title,
                    buyProducts: buyItems.map(item => ({
                      name: item.product?.name || 'Product',
                      image: item.product?.images?.[0] || '',
                      count: item.quantity
                    })),
                    getProducts: freeItems.map(item => ({
                      name: item.product?.name || 'Product',
                      image: item.product?.images?.[0] || '',
                      count: item.quantity
                    })),
                    savingsValue: offer.discount_value || 0,
                    description: offer.description || undefined,
                    bannerImage: offer.banner_image,
                    onShopNow: () => router.push(`/offers/${offer.id}`)
                  }

                  return <BogoCardWide key={offer.id} {...cardProps} />
                })}
              </div>
            </div>
          )}

          {comboOffers.length > 0 && (
            <div className="space-y-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold font-medium">Combo Collections</h2>
                <div className="flex-1 h-px bg-gold/20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {comboOffers.map((offer) => (
                  <ComboCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          )}

          {/* ── Product Offers (existing magazine layout) ── */}
          {otherOffers.length > 0 && otherOffers.map((offer, i) => (
            <div key={offer.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}>
              <div className="lg:w-[60%] relative aspect-[16/9] w-full bg-white/5">
                {offer.banner_image ? (
                  <div
                    className="w-full h-full cursor-pointer"
                    onClick={() => router.push(offer.product_id ? `/product/${offer.product_id}` : `/offers/${offer.id}`)}
                  >
                    <RevealImage
                      src={offer.banner_image}
                      alt={offer.title}
                      className="w-full h-full"
                      aspectRatio="landscape"
                    />
                  </div>
                ) : offer.offer_type === 'combo' && offer.combo_items && offer.combo_items.length > 0 ? (
                  <div
                    className="w-full h-full flex items-center justify-center bg-zinc-950 p-6 md:p-10 gap-2 md:gap-4 overflow-hidden border border-white/5 cursor-pointer"
                    onClick={() => router.push(`/offers/${offer.id}`)}
                  >
                    {offer.combo_items.slice(0, 3).map((item, idx, arr) => (
                      <div key={item.id} className="flex items-center w-full h-full">
                        <div className="relative w-full h-full aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 shrink">
                          {item.product?.images?.[0] ? (
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px] uppercase">No Img</div>
                          )}
                        </div>
                        {idx < arr.length - 1 && (
                          <div className="flex items-center justify-center px-2 md:px-4 shrink-0">
                            <Plus className="text-gold opacity-50 w-4 h-4 md:w-6 md:h-6" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : offer.offer_type === 'product_offer' && offer.product?.images?.[0] ? (
                  <div
                    className="w-full h-full cursor-pointer"
                    onClick={() => router.push(`/product/${offer.product_id}`)}
                  >
                    <img src={offer.product.images[0]} alt={offer.product.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center border border-white/5 uppercase tracking-widest text-[10px] text-white/20">
                    No Preview Available
                  </div>
                )}
                <div className="absolute top-8 left-8 z-10">
                  <span className="bg-white text-black px-6 py-2 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
                    {offer.offer_type === 'combo' ? (() => {
                      const totalOriginal = (offer.combo_items || []).reduce((acc, item) =>
                        acc + (item.product?.selling_price || 0) * (item.quantity || 1), 0);
                      const savings = totalOriginal - (offer.combo_price || 0);
                      return `Save ₹${savings}`;
                    })() : offer.offer_type === 'bogo'
                      ? `Save ₹${offer.discount_value || 0}`
                      : offer.discount_value
                        ? `${offer.discount_value}${offer.discount_type === 'percentage' ? '%' : '₹'} OFF`
                        : 'Special Offer'}
                  </span>
                </div>
              </div>

              <div className="lg:w-[40%] text-left">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold mb-4 block"
                >
                  {offer.offer_type === 'combo' ? 'Combo Deal' : 'Special Offer'}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight italic"
                >
                  {offer.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-sans text-white/40 text-sm mb-12 max-w-md leading-relaxed tracking-wide"
                >
                  {offer.description || "Discover premium collections at exceptional value. Each piece is curated to offer both timeless elegance and contemporary flair."}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => router.push(offer.product_id ? `/product/${offer.product_id}` : `/offers/${offer.id}`)}
                  className="px-12 py-5 border border-white/20 text-white font-sans text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-700"
                >
                  BUY NOW
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
