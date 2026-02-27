'use client'

import { MapPin, Phone, MessageCircle, Clock, Instagram } from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export default function StoreSection() {
  return (
    <section className="py-24 bg-brand-black">
      <ScrollReveal>
        <p className="text-center font-montserrat font-semibold text-[13px] uppercase tracking-[0.2em] text-accent mb-3">Visit Us</p>
        <h2 className="text-center font-playfair font-bold text-3xl md:text-4xl text-white mb-16">Experience KL-59 In Person</h2>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Map */}
          <ScrollReveal className="lg:w-[55%]">
            <div className="h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-brand-tertiary flex items-center justify-center">
              <div className="text-center text-text-subtle">
                <MapPin size={48} className="mx-auto mb-4 text-accent opacity-50" />
                <p className="font-inter text-sm">Google Maps embed will appear here</p>
                <p className="font-inter text-xs text-text-muted mt-1">Configure in Admin → Settings</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={0.2} className="lg:w-[45%]">
            <div className="space-y-2 mb-8">
              <h3 className="font-montserrat font-bold text-xl text-white">KL-59</h3>
              <p className="font-montserrat text-sm text-text-subtle">Men&apos;s Fashion</p>
            </div>

            <div className="w-12 h-[2px] bg-accent mb-8" />

            <div className="space-y-5">
              <div className="flex items-start gap-4 text-text-subtle hover:text-text-light transition-colors">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <div className="font-inter text-sm">
                  <p>Store Address</p>
                  <p>City, State - PIN</p>
                </div>
              </div>

              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-4 text-text-subtle hover:text-text-light transition-colors">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span className="font-inter text-sm">+91 XXXXXXXXXX</span>
              </a>

              <a href="#" className="flex items-center gap-4 text-text-subtle hover:text-text-light transition-colors">
                <MessageCircle size={18} className="text-accent flex-shrink-0" />
                <span className="font-inter text-sm">WhatsApp</span>
              </a>

              <div className="flex items-center gap-4 text-text-subtle">
                <Clock size={18} className="text-accent flex-shrink-0" />
                <span className="font-inter text-sm">10:00 AM - 9:00 PM</span>
              </div>

              <a href="#" className="flex items-center gap-4 text-text-subtle hover:text-text-light transition-colors">
                <Instagram size={18} className="text-accent flex-shrink-0" />
                <span className="font-inter text-sm">@kl59fashion</span>
              </a>
            </div>

            <div className="mt-8">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-accent text-accent font-montserrat font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-accent hover:text-brand-black transition-all duration-300"
              >
                Get Directions
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
