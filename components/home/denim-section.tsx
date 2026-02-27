'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/scroll-reveal'
import TextReveal from '@/components/ui/text-reveal'

export default function DenimSection() {
  return (
    <section className="relative py-40 overflow-hidden bg-brand-black">
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03]">
        <span className="font-editorial text-[30vw] text-white leading-none whitespace-nowrap">
          DENIM 59
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.img 
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=90&w=1200" 
                alt="Premium Denim" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <div className="absolute top-10 right-10 flex flex-col items-center">
                <span className="font-editorial text-accent text-6xl italic leading-none">59</span>
                <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white mt-2">Series</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="max-w-xl">
            <span className="font-montserrat text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 block">
              HERITAGE PRODUCT
            </span>
            <h2 className="font-editorial text-4xl md:text-7xl text-white mb-10 leading-[1.1]">
              The <span className="italic">Gold Standard</span> of Denim.
            </h2>
            
            <TextReveal 
              text="Engineered for comfort. Designed for legacy. Our denim collection represents the intersection of rugged craftsmanship and modern sophistication."
              className="font-inter text-text-subtle text-lg font-light leading-relaxed mb-12"
            />

            <div className="space-y-6 mb-16">
              {[
                { label: 'Japanese Heritage Indigo', val: 'Premium Dyes' },
                { label: '14oz High-Tension Denim', val: 'Built for Life' },
                { label: 'Onyx Hardware Finish', val: 'Subtle Luxury' },
              ].map((spec, i) => (
                <motion.div 
                  key={spec.label}
                  className="flex items-center justify-between border-b border-white/10 pb-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                >
                  <span className="font-montserrat text-[11px] uppercase tracking-widest text-white/60">{spec.label}</span>
                  <span className="font-editorial italic text-accent text-sm">{spec.val}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/shop?category=denim" className="group flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-brand-black transition-all duration-500">
                <ArrowRight size={20} className="transform group-hover:rotate-[-45deg] transition-transform duration-500" />
              </div>
              <div>
                <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-white block mb-1">Explore Denim</span>
                <span className="font-inter text-[11px] text-text-subtle">See the technical specs</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
