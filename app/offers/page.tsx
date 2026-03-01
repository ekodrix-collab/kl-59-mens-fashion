'use client'

import { motion } from 'framer-motion'
import { RevealImage } from '@/components/ui/reveal-image'
import { Loader2 } from 'lucide-react'
import { useOffers } from '@/hooks/use-offers'

export default function OffersPage() {
  const { offersQuery } = useOffers()
  const { data: offers, isPending } = offersQuery

  // Filter or sort offers if needed, here we take all active ones
  const activeOffers = offers?.filter(o => o.is_active) || []

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  return (
    <main className="pt-24 bg-black min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-10 mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6 block"
        >
          SEASONAL CAMPAIGNS
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-8xl text-white leading-tight"
        >
          Exclusive <span className="italic font-medium">Propositions</span>
        </motion.h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-10 space-y-40 pb-40">
        {activeOffers.length > 0 ? (
          activeOffers.map((offer, i) => (
            <div key={offer.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}>
              <div className="lg:w-[60%] relative aspect-[16/9] w-full bg-white/5">
                {offer.banner_image ? (
                  <RevealImage
                    src={offer.banner_image}
                    alt={offer.title}
                    className="w-full h-full"
                    aspectRatio="landscape"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center border border-white/5 uppercase tracking-widest text-[10px] text-white/20">
                    No Preview Available
                  </div>
                )}
                <div className="absolute top-8 left-8 z-10">
                  <span className="bg-white text-black px-6 py-2 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
                    {offer.offer_type === 'combo'
                      ? `₹${offer.combo_price}`
                      : `${offer.discount_value}${offer.discount_type === 'percentage' ? '%' : '₹'} OFF`}
                  </span>
                </div>
              </div>

              <div className="lg:w-[40%] text-left">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6 block"
                >
                  {offer.offer_type.replace('_', ' ')} / SEASON {new Date().getFullYear()}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight"
                >
                  {offer.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-body text-base text-muted leading-relaxed mb-12 max-w-sm"
                >
                  {offer.description || "Limited time offer. Premium fits, unbeatable value."}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <a href="/shop" className="group flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-white hover:text-gold transition-colors">
                    Explore Proposition
                    <span className="inline-block transform group-hover:translate-x-2 transition-transform">→</span>
                  </a>
                </motion.div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-40 border border-dashed border-white/5 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center mb-6">
              <span className="text-white/10 text-2xl">%</span>
            </div>
            <h3 className="font-display text-2xl text-white/20">No Active <span className="italic">Campaigns</span></h3>
            <p className="font-sans text-[9px] uppercase tracking-widest text-white/10 mt-2">Check back later for seasonal offers and exclusive propositions.</p>
          </div>
        )}
      </div>
    </main>
  )
}
