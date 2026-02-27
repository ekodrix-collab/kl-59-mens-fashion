'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

const offers = [
  { 
    id: '1', 
    title: 'Archive Selects', 
    subtitle: 'Season One / Selection',
    description: 'A curated reduction on our definitive denim series.', 
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
    discount: '50% Reduction'
  },
  { 
    id: '2', 
    title: 'The Shirt Shop', 
    subtitle: 'Crafted Essentials',
    description: 'Volume and silhouette exploration in pure cotton.', 
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    discount: 'Complimentary Styling'
  },
  { 
    id: '3', 
    title: 'New Heritage', 
    subtitle: 'Summer 2025',
    description: 'Modern interpretations of classic masculine forms.', 
    image: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=800',
    discount: 'Exclusive Access'
  },
]

export default function OfferCards() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div className="max-w-xl">
            <span className="font-montserrat text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 block">
              EDITORIAL CAMPAIGNS
            </span>
            <h2 className="font-editorial text-5xl md:text-7xl text-text-primary leading-[1.1]">
              Current <span className="italic">Propositions</span>.
            </h2>
          </div>
          <Link href="/offers" className="group flex items-center gap-4 font-montserrat text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted hover:text-text-primary mt-10 md:mt-0 pb-1 border-b border-text-muted/20">
            View All Campaigns
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {offers.map((offer, i) => (
            <ScrollReveal key={offer.id} delay={i * 0.15}>
              <Link href="/offers" className="group block relative aspect-[4/5] overflow-hidden bg-brand-light">
                <motion.img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/10 transition-colors duration-700" />
                
                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="font-montserrat text-[9px] uppercase tracking-[0.3em] text-white/70">
                      {offer.subtitle}
                    </span>
                    <span className="font-editorial italic text-accent text-sm">
                      {offer.discount}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-editorial text-white text-3xl md:text-4xl mb-4 leading-tight">
                      {offer.title}
                    </h3>
                    <p className="font-inter text-xs text-white/60 max-w-[200px] mb-8 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                      {offer.description}
                    </p>
                    <div className="w-10 h-[1.5px] bg-accent group-hover:w-full transition-all duration-700 ease-editorial" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
