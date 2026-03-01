"use client";

import { motion } from "framer-motion";
import { MagneticElement } from "@/components/ui/magnetic-element";
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { useStoreInfo } from "@/hooks/use-store-info";

const FALLBACK_STORE_IMAGE = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80";

export function VisitStore() {
  const { storeInfoQuery } = useStoreInfo();
  const { data: storeInfo } = storeInfoQuery;

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
      <img
        src={storeInfo?.store_image || FALLBACK_STORE_IMAGE}
        alt="KL-59 Store"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-linear scale-110"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-6"
        >
          Visit Us
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl text-white font-light mb-12 tracking-tight"
        >
          Explore the <span className="italic font-serif">Flagship</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6 text-white/80 font-sans text-[10px] uppercase tracking-[0.2em] mb-16"
        >
          <div className="flex flex-col gap-2">
            <span className="text-gold font-bold text-[10px] tracking-[0.3em]">Location</span>
            <span className="text-white font-medium">{storeInfo?.address || 'Kozhikode, Kerala'}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gold font-bold text-[10px] tracking-[0.3em]">Inquiry Hours</span>
            <span className="text-white font-medium">{storeInfo?.working_hours || 'Mon-Sat 10AM-9PM'}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-6 items-center justify-center"
        >
          <MagneticElement>
            <a
              href={storeInfo?.google_maps_url || "https://maps.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white px-10 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-colors"
            >
              Get Directions
            </a>
          </MagneticElement>

          <MagneticElement>
            <a
              href={generateWhatsAppURL(undefined, undefined, undefined, storeInfo?.whatsapp)}
              className="inline-block border border-white px-10 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-colors"
            >
              WhatsApp Us
            </a>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  );
}
