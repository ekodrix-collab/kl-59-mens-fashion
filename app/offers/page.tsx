'use client'

import { motion } from 'framer-motion'
import { RevealImage } from '@/components/ui/reveal-image'
import { RevealText } from '@/components/ui/reveal-text'

const campaigns = [
  { 
    id: '1', 
    title: 'Archive Selects', 
    subtitle: 'Denim Series / Season One',
    desc: 'An exploration of structural denim. Experience 50% reduction on our definitive slim and relaxed silhouettes for a limited time.', 
    discount: '50% OFF', 
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=90&w=1600'
  },
  { 
    id: '2', 
    title: 'The Shirt Shop', 
    subtitle: 'Formalities / Summer 25',
    desc: 'Volume and light. Egyptian cotton shirts redefined for the modern masculine form. Complimentary personalized styling with every purchase.', 
    discount: 'Styling Inc.', 
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=90&w=1200'
  },
  { 
    id: '3', 
    title: 'Modern Basics', 
    subtitle: 'Essentialism / Drop 03',
    desc: 'The fundamental wardrobe. Pima cotton essentials crafted for longevity. Explore up to 40% off the basic series.', 
    discount: '40% OFF', 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=90&w=1200'
  },
]

export default function OffersPage() {
  return (
    <main className="pt-32 bg-black min-h-screen text-white">
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
        {campaigns.map((campaign, i) => (
          <div key={campaign.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}>
            <div className="lg:w-[60%] relative aspect-[16/9] w-full">
              <RevealImage 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-full"
                aspectRatio="landscape"
              />
              <div className="absolute top-8 left-8 z-10">
                <span className="bg-white text-black px-6 py-2 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
                  {campaign.discount}
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
                {campaign.subtitle}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight"
              >
                {campaign.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-body text-base text-muted leading-relaxed mb-12 max-w-sm"
              >
                {campaign.desc}
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
        ))}
      </div>
    </main>
  )
}
