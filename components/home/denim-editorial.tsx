"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { COLLECTION_IMAGES } from "@/lib/data";
import { RevealImage } from "@/components/ui/reveal-image";
import { MagneticElement } from "@/components/ui/magnetic-element";

export function DenimEditorial() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="bg-black py-0 md:py-0 min-h-[80vh] flex flex-col md:flex-row overflow-hidden">
      {/* Left: Image */}
      <div className="relative w-full md:w-1/2 h-[60vh] md:h-auto overflow-hidden">
        <motion.div style={{ y }} className="absolute -inset-[10%] w-[120%] h-[120%]">
          <Image
            src={COLLECTION_IMAGES.denim}
            alt="Denim Collection Editorial"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-black/20"
        />
      </div>

      {/* Right: Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-black">
        <div className="max-w-md">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-6"
          >
            Denim
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white font-bold leading-tight mb-8"
          >
            Built to <br /> <span className="italic font-medium">Last</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-[1px] bg-gold origin-left mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-muted font-light text-base leading-relaxed mb-10"
          >
            Premium denim for the modern man. From slim selvedge to relaxed fits, our denim is crafted to age with character.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col gap-10"
          >
            <span className="font-sans text-xl text-gold font-medium">Starting ₹999</span>
            
            <MagneticElement>
              <a
                href="/collections/denim"
                className="inline-block border border-white px-12 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-colors"
              >
                Shop Denim
              </a>
            </MagneticElement>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
