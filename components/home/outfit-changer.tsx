'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { generateWhatsAppURL } from '@/lib/whatsapp'

const looks = [
  { id: '1', title: 'The Modern Tailor', description: 'Sharp lines and effortless confidence. Featuring our signature black denim and cotton polo.', price: 1299, mrp: 2499, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000', thumb: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=200' },
  { id: '2', title: 'Onyx Evening', description: 'Command the night. A triple-black ensemble for those who lead by presence.', price: 1499, mrp: 2299, image: 'https://images.unsplash.com/photo-1594932224010-3a13df2c62e5?auto=format&fit=crop&q=80&w=1000', thumb: 'https://images.unsplash.com/photo-1594932224010-3a13df2c62e5?auto=format&fit=crop&q=80&w=200' },
  { id: '3', title: 'Sand & Slate', description: 'Neutral tones meeting premium textures. The ultimate casual luxury.', price: 899, mrp: 1799, image: 'https://images.unsplash.com/photo-1516822246374-6e19117609ff?auto=format&fit=crop&q=80&w=1000', thumb: 'https://images.unsplash.com/photo-1516822246374-6e19117609ff?auto=format&fit=crop&q=80&w=200' },
  { id: '4', title: 'Urban Legend', description: 'Rugged yet refined. Our distressed denim jacket paired with heritage casuals.', price: 1999, mrp: 3499, image: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=1000', thumb: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=200' },
  { id: '5', title: 'The Icon', description: 'Simple, effective, timeless. The cornerstone of the KL-59 wardrobe.', price: 449, mrp: 799, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000', thumb: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200' },
]

export default function OutfitChanger() {
  const [active, setActive] = useState(0)
  const current = looks[active]

  return (
    <section className="py-24 bg-brand-black overflow-hidden">
      <ScrollReveal>
        <p className="text-center font-montserrat font-semibold text-[13px] uppercase tracking-[0.2em] text-accent mb-3">Interactive</p>
        <h2 className="text-center font-playfair font-bold text-3xl md:text-[40px] text-white mb-16">Style Your Look</h2>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Model image */}
          <div className="lg:w-[45%] relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  exit={{ clipPath: 'inset(0% 0% 0% 100%)' }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                  <img 
                    src={current.image} 
                    alt={current.title} 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-[55%] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-montserrat font-semibold text-2xl text-white mb-4">{current.title}</h3>
                <p className="font-inter font-light text-base text-text-subtle leading-relaxed mb-6">{current.description}</p>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-inter text-base line-through text-text-muted">₹{current.mrp.toLocaleString('en-IN')}</span>
                  <span className="font-montserrat font-semibold text-2xl text-white">₹{current.price.toLocaleString('en-IN')}</span>
                  <span className="text-discount-bg font-montserrat font-bold text-sm">
                    {Math.round(((current.mrp - current.price) / current.mrp) * 100)}% OFF
                  </span>
                </div>

                <button
                  onClick={() => window.open(generateWhatsAppURL(), '_blank')}
                  className="w-full lg:w-auto px-8 py-4 bg-whatsapp text-white font-montserrat font-semibold text-sm uppercase tracking-wider rounded-xl hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Order on WhatsApp
                </button>

                <p className="text-center text-text-subtle text-xs mt-4 font-inter">─── ✦ ───</p>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-8 justify-center lg:justify-start overflow-x-auto">
              {looks.map((look, i) => (
                <button
                  key={look.id}
                  onClick={() => setActive(i)}
                  className={`relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-500 ${
                    i === active ? 'ring-2 ring-accent scale-105 z-10' : 'opacity-40 hover:opacity-100 grayscale'
                  }`}
                >
                  <img src={look.thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <p className="text-center lg:text-left text-text-subtle text-xs mt-3 font-inter tracking-[0.1em]">
              ← Click to change look →
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
