"use client";

import { ScrollRevealText } from "@/components/ui/reveal-text";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStoreInfo } from "@/hooks/use-store-info";

export function BrandStatement() {
  const { storeInfoQuery } = useStoreInfo();
  const { data: storeInfo } = storeInfoQuery;

  return (
    <section className="bg-black py-20 md:py-40 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-20">
          <ScrollRevealText
            text={storeInfo?.hero_tagline || "We don't follow trends. We set them."}
            className="font-display text-4xl md:text-6xl text-white font-medium italic leading-tight"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-gold text-2xl mb-8"
        >
          ✦
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="font-body text-base md:text-lg text-muted font-light max-w-xl mx-auto mb-10 leading-relaxed">
            {storeInfo?.hero_subtitle || "KL-59 is more than a store. It's a destination for men who understand that great style doesn't need a great price tag."}
          </p>

          <Link
            href="/story"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold hover:text-white transition-colors group inline-flex items-center"
          >
            Our Story
            <span className="ml-2 translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
