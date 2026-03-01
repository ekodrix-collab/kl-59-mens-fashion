'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, MessageCircle, Clock, ArrowRight, Loader2 } from 'lucide-react'
import { RevealImage } from '@/components/ui/reveal-image'
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { useStoreInfo } from '@/hooks/use-store-info'

export function StoreView() {
  const { storeInfoQuery } = useStoreInfo()
  const { data: storeInfo, isLoading } = storeInfoQuery

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    )
  }

  const contactItems = [
    { 
      icon: MapPin, 
      title: 'Heritage Showroom', 
      content: storeInfo?.address || 'NH, Taliparamba, Kannur, Kerala - 670141', 
      subtitle: 'Global Flagship Store' 
    },
    { 
      icon: Clock, 
      title: 'Concierge Hours', 
      content: storeInfo?.working_hours || '10:00 AM - 9:00 PM', 
      subtitle: 'Daily Access' 
    },
    { 
      icon: Phone, 
      title: 'Direct Access', 
      content: storeInfo?.phone || '+91 9895884796', 
      subtitle: 'Immediate Assistance' 
    },
    { 
      icon: MessageCircle, 
      title: 'Digital Atelier', 
      content: 'WhatsApp Consultation', 
      subtitle: 'Personal Styling' 
    },
  ]

  return (
    <main className="pt-32 bg-black min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto px-10 mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6 block"
          >
            STORE CONCIERGE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-[100px] text-white leading-none tracking-tight"
          >
            In-Store <span className="italic font-serif font-light text-gold/90">Experience</span>
          </motion.h1>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-body text-sm text-link-muted leading-relaxed max-w-xs"
        >
          {storeInfo?.about_text || "Visit our physical atelier for a personalized styling experience. Our consultants are available to guide you through the current series."}
        </motion.p>
      </div>

      <div className="max-w-[1400px] mx-auto px-10 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Contact Details */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-10">
            {contactItems.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-white/5 pb-10 hover:border-gold/30 transition-colors duration-700"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-10 group-hover:bg-gold group-hover:border-gold transition-all duration-700">
                  <item.icon size={18} className="text-white group-hover:text-black transition-colors" />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold block mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {item.subtitle}
                </span>
                <h3 className="font-display text-2xl mb-4 text-white group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
                <p className="font-body text-sm text-subtle leading-relaxed group-hover:translate-x-2 transition-transform duration-700 delay-75">
                  {item.content}
                </p>
              </motion.div>
            ))}
            
            <div className="md:col-span-2 pt-10">
              <a 
                href={generateWhatsAppURL()} 
                className="group relative flex items-center justify-center w-full py-6 bg-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative z-10 flex items-center gap-4 text-black group-hover:text-black transition-colors duration-500">
                  <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold">Initiate Consultation</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </a>
            </div>
          </div>

          {/* Visual Storefront / Map */}
          <div className="lg:col-span-7 relative group overflow-hidden">
            <RevealImage 
              src={storeInfo?.store_image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=90&w=1600"} 
              alt="KL-59 Flagship Store" 
              className="h-full min-h-[500px] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <a 
              href="https://www.google.com/maps/search/?api=1&query=KL-59+Mens+Fashion+Taliparamba+Kannur"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col items-center justify-center group-hover:bg-gold transition-all duration-500"
            >
              <MapPin size={24} className="text-white group-hover:text-black mb-2" />
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white group-hover:text-black font-bold">Directions</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
