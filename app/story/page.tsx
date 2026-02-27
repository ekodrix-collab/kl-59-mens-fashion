'use client'

import { motion } from 'framer-motion'
import { RevealText, ScrollRevealText } from '@/components/ui/reveal-text'
import { RevealImage } from '@/components/ui/reveal-image'

export default function StoryPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1441984908747-d44f85a44111?auto=format&fit=crop&q=90&w=2000" 
            alt="KL-59 Heritage" 
            className="w-full h-full object-cover grayscale-[0.2] opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <div className="relative z-10 text-center px-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-sans text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-8 block"
          >
            ESTABLISHED IN EXCELLENCE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="font-display text-6xl md:text-8xl text-white leading-none"
          >
            The <span className="italic">Heritage</span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6"
        >
          <div className="w-12 h-px bg-gold/50" />
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white">Scroll to Explore Story</span>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-40">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <RevealImage
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=90&w=1200"
              alt="Craftsmanship"
              className="aspect-[3/4]"
            />

            <div className="max-w-xl">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8 block">THE CRAFT</span>
              <h2 className="font-display text-4xl md:text-6xl text-white mb-12 leading-tight">
                Style that speaks <br /><span className="italic font-medium text-white/80">before you do.</span>
              </h2>
              <p className="font-body text-lg text-muted leading-relaxed opacity-80 mb-12">
                KL-59 was established with a singular vision: to define the modern masculine silhouette through uncompromising craftsmanship and timeless design. We believe that true luxury lies in the details—the precision of a stitch, the hand-feel of pima cotton, and the character of raw denim.
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <span className="font-display text-3xl text-gold block mb-2">01.</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white font-bold">Material Integrity</span>
                </div>
                <div>
                  <span className="font-display text-3xl text-gold block mb-2">02.</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white font-bold">Tailored Precision</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 bg-dark text-white overflow-hidden relative border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <div className="mb-24">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-6 block">OUR PHILOSOPHY</span>
            <h2 className="font-display text-4xl md:text-6xl text-white">The Core <span className="italic">Tenets</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { title: 'Artisanal Quality', desc: 'Every piece is a testament to the artisans who dedicate years to perfecting their craft, from loom to final press.' },
              { title: 'Modern Silhouette', desc: 'We reinterpret classic masculine forms for the contemporary era, balancing architectural structure with ease.' },
              { title: 'Global Collective', desc: 'Inspired by the textures of travel and the rhythm of the city, KL-59 is a brand for the global citizen.' },
            ].map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group border-l border-white/10 pl-10 hover:border-gold transition-colors duration-500"
              >
                <h3 className="font-display text-2xl mb-6 group-hover:text-gold transition-colors">{v.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed group-hover:text-white/80 transition-colors">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 text-center">
        <ScrollRevealText
          text="Begin Your Journey"
          className="font-display text-5xl md:text-7xl text-white mb-16 leading-tight"
        />
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <a href="/shop" className="px-12 py-5 bg-white text-black font-sans text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-black transition-all duration-500 min-w-[240px]">
            Explore Collection
          </a>
          <a href="/store" className="px-12 py-5 border border-white/20 text-white font-sans text-[10px] uppercase tracking-[0.4em] font-bold hover:border-gold hover:text-gold transition-all duration-500 min-w-[240px]">
            Locate Showroom
          </a>
        </div>
      </section>
    </main>
  )
}
