"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/ui/logo";
import { MagneticElement } from "@/components/ui/magnetic-element";
import Link from "next/link";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60 grayscale-[0.3]"
          poster="https://images.unsplash.com/photo-1441984908747-d44f85a44111?auto=format&fit=crop&q=90&w=2000"
        >
          <source 
            src="https://videos.pexels.com/video-files/6765484/6765484-hd_1280_720_25fps.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://videos.pexels.com/video-files/6765484/6765484-sd_960_540_25fps.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-end pb-24 md:pb-32 px-6 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mb-8"
        >
          <Logo size="large" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="font-display text-4xl md:text-5xl lg:text-7xl text-white font-medium mb-12 max-w-3xl mx-auto italic leading-[1.1] tracking-tight"
        >
          The Art of <br className="md:hidden" /> Modern Masculinity.
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
          className="flex flex-col items-center gap-12"
        >
          <MagneticElement>
            <Link
              href="/collections"
              className="group relative inline-block overflow-hidden border border-white/20 px-12 py-5 transition-all duration-500 hover:border-white"
            >
              <span className="relative z-10 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-white">
                Explore Collection
              </span>
              <div className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-500 group-hover:h-full" />
              <div className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-500 group-hover:h-full">
                 <span className="absolute inset-0 flex items-center justify-center font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-black opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Collection
                </span>
              </div>
            </Link>
          </MagneticElement>

          <div className="flex gap-10 md:gap-16 items-center">
            {['Denim', 'Shirts', 'Shoes'].map((cat, i) => (
              <Link
                key={cat}
                href={`/collections/${cat.toLowerCase()}`}
                className="group flex flex-col items-center gap-2"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-white/40 group-hover:text-gold transition-colors duration-500">
                  {cat}
                </span>
                <div className="w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.3 }}
           transition={{ delay: 2 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">Scroll to Explore Story</span>
        </motion.div>
      </div>
    </section>
  );
}
