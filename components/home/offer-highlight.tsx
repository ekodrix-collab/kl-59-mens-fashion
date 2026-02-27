"use client";

import { motion } from "framer-motion";

export function OfferHighlight() {
  return (
    <section className="bg-dark py-32 md:py-48 flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-5xl text-white font-medium block mb-6"
        >
          The Denim Edit
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-5xl md:text-8xl text-gold font-bold uppercase tracking-tight mb-8"
        >
          Flat 50% Off
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-body text-muted text-base md:text-lg font-light max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Our entire denim collection at half price. Premium fits, unbeatable value. Limited time only.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a
            href="/collections/denim"
            className="inline-block border border-white px-12 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-colors"
          >
            Shop The Edit
          </a>
        </motion.div>
      </div>
    </section>
  );
}
