'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MagneticButton from '@/components/ui/magnetic-button'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Visual background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=90&w=2400')",
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "circOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/20 to-transparent" />
      </div>

      <div className="relative z-10 container-main w-full h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <span className="font-montserrat text-[11px] uppercase tracking-[0.5em] text-accent font-semibold mb-6 block">
              EST. 2025 • PREMIUM TAILORING
            </span>
            <h1 className="font-editorial text-white text-[7vw] md:text-[5vw] leading-[1] mb-2">
              Confidently
            </h1>
            <h1 className="font-editorial text-accent text-[7vw] md:text-[5vw] leading-[1] italic ml-[5vw] mb-8">
              Luxurious.
            </h1>
          </motion.div>

          <motion.p
            className="font-inter text-text-subtle text-lg md:text-xl max-w-lg mb-12 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            A curated collection of modern essentials designed for the man who understands the power of presence.
          </motion.p>

          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <MagneticButton>
              <Link
                href="/shop"
                className="group relative px-12 py-5 bg-white text-brand-black font-montserrat text-xs uppercase tracking-[0.2em] font-bold overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Discover Now</span>
                <div className="absolute inset-0 bg-brand-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </MagneticButton>
            
            <Link href="/about" className="font-montserrat text-[11px] uppercase tracking-[0.2em] text-white hover:text-accent transition-colors border-b border-white/30 pb-1">
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <motion.div 
        className="absolute left-10 bottom-0 w-px bg-gradient-to-t from-accent to-transparent h-1/3 hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.2, duration: 1.5 }}
        style={{ transformOrigin: 'bottom' }}
      />
    </section>
  )
}
