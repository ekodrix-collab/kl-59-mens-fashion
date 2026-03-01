'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollRevealText } from '@/components/ui/reveal-text'
import { RevealImage } from '@/components/ui/reveal-image'

import { useStoreInfo } from '@/hooks/use-store-info'
import { optimizeVideoUrl, optimizeImageUrl } from "@/lib/utils";

export function StoryView() {
  const { storeInfoQuery } = useStoreInfo()
  const { data: storeInfo, isLoading } = storeInfoQuery

  const videoUrl = optimizeVideoUrl(storeInfo?.story_video || "https://res.cloudinary.com/dnd76mj4h/video/upload/v1740810842/kl59/hero-cinematic_p8j9v7.mp4");

  const philosophy = storeInfo?.philosophy_json || [
    { title: 'Artisanal Quality', desc: 'Every piece is a testament to the artisans who dedicate years to perfecting their craft, from loom to final press.' },
    { title: 'Modern Silhouette', desc: 'We reinterpret classic masculine forms for the contemporary era, balancing architectural structure with ease.' },
    { title: 'Global Collective', desc: 'Inspired by the textures of travel and the rhythm of the city, KL-59 is a brand for the global citizen.' },
  ]

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={storeInfo?.story_hero_image || "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80"}
            className="w-full h-full object-cover opacity-60"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </motion.div>
        
        <div className="relative z-10 text-center px-10">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-px bg-gold/40 mx-auto mb-8"
          />
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-sans text-[10px] uppercase tracking-[0.8em] text-gold font-bold mb-8 block"
          >
            {storeInfo?.story_hero_subtitle || "ESTABLISHED IN EXCELLENCE"}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="font-display text-7xl md:text-[120px] text-white leading-none tracking-tighter"
          >
            {storeInfo?.story_hero_title ? (
              <>
                {storeInfo.story_hero_title.split(' ').slice(0, -1).join(' ')} <span className="italic font-serif font-light text-white/90">{storeInfo.story_hero_title.split(' ').slice(-1)}</span>
              </>
            ) : (
              <>The <span className="italic font-serif font-light text-white/90">Heritage</span></>
            )}
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
              src={storeInfo?.story_main_image || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80"}
              alt="Craftsmanship"
              className="aspect-[3/4]"
            />

            <div className="max-w-xl">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8 block">
                {storeInfo?.story_main_subtitle || "THE CRAFT"}
              </span>
              <h2 className="font-display text-5xl md:text-7xl text-white mb-12 leading-[1.1] tracking-tight">
                {storeInfo?.story_main_title ? (
                  <>
                    {storeInfo.story_main_title.split(' ').slice(0, -1).join(' ')} <br /><span className="italic font-serif font-light text-gold/90">{storeInfo.story_main_title.split(' ').slice(-1)}</span>
                  </>
                ) : (
                  <>Style that speaks <br /><span className="italic font-serif font-light text-gold/90">before you do.</span></>
                )}
              </h2>
              <p className="font-body text-lg text-muted leading-relaxed opacity-80 mb-12">
                {storeInfo?.story_main_content || "KL-59 was established with a singular vision: to define the modern masculine silhouette through uncompromising craftsmanship and timeless design. We believe that true luxury lies in the details—the precision of a stitch, the hand-feel of pima cotton, and the character of raw denim."}
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
            <h2 className="font-display text-5xl md:text-7xl text-white">The Core <span className="italic font-serif font-light text-gold/80">Tenets</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {philosophy.map((v: any, i: number) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group border-l border-white/10 pl-10 hover:border-gold transition-colors duration-500"
              >
                <h3 className="font-display text-2xl mb-6 group-hover:text-gold transition-colors duration-500">{v.title}</h3>
                <p className="font-body text-[13px] text-muted leading-relaxed group-hover:text-white/70 transition-colors duration-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 text-center">
        <ScrollRevealText
          text="Begin Your Journey"
          className="font-display text-6xl md:text-9xl text-white mb-16 leading-none tracking-tighter"
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
