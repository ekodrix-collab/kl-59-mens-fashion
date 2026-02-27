"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HERO_IMAGES } from "@/lib/data";
import { Logo } from "@/components/ui/logo";
import { MagneticElement } from "@/components/ui/magnetic-element";
import Link from "next/link";

export function HeroVideo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 5, ease: "linear" }
            }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[index]}
              alt="Luxury Fashion Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-end pb-24 md:pb-32 px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <Logo size="large" />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans font-light text-xs md:text-sm uppercase tracking-[0.3em] text-muted mb-12 text-center"
        >
          Crafted for the Modern Man
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <MagneticElement>
            <Link
              href="/collections"
              className="inline-block border border-white/30 px-10 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              Explore Collection
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-8 bg-white/40 animate-pulse-slow origin-top" />
          <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
