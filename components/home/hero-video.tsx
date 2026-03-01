"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/ui/logo";
import { MagneticElement } from "@/components/ui/magnetic-element";
import Link from "next/link";
import { useStoreInfo } from "@/hooks/use-store-info";
import { optimizeVideoUrl } from "@/lib/utils";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { storeInfoQuery } = useStoreInfo();
  const { data: storeInfo } = storeInfoQuery;

  const videoUrl = optimizeVideoUrl(storeInfo?.hero_video || "https://res.cloudinary.com/dnd76mj4h/video/upload/v1740810842/kl59/hero-cinematic_p8j9v7.mp4");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, [videoUrl]);

  return (
    <section className="relative h-screen min-h-[660px] md:min-h-0 h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoUrl}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60 grayscale-[0.3]"
          poster={storeInfo?.hero_image || "https://images.unsplash.com/photo-1441984908747-d44f85a44111?auto=format&fit=crop&q=90&w=2000"}
        >
          {storeInfo?.hero_video ? (
            <source src={videoUrl} type="video/mp4" />
          ) : (
            <>
              <source src="https://videos.pexels.com/video-files/6765484/6765484-hd_1280_720_25fps.mp4" type="video/mp4" />
              <source src="https://videos.pexels.com/video-files/6765484/6765484-sd_960_540_25fps.mp4" type="video/mp4" />
            </>
          )}
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center md:justify-end pb-12 md:pb-32 px-6 text-center">
        <div className="flex flex-col items-center flex-1 justify-center max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mb-8 scale-90 md:scale-100"
          >
            <Logo size="large" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-7xl text-white font-light mb-12 italic leading-[1.1] tracking-tight"
          >
            {storeInfo?.tagline || "Modern Menswear for Defined Living."}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
            className="flex flex-col items-center gap-12"
          >
            <MagneticElement>
              <Link
                href="/shop"
                className="group relative inline-block overflow-hidden border border-white/20 px-14 py-6 transition-all duration-700 hover:border-white"
              >
                <span className="relative z-10 font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-white group-hover:text-black transition-colors duration-500">
                  Explore Collection
                </span>
                <div className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-500 ease-out group-hover:h-full" />
              </Link>
            </MagneticElement>

            <div className="flex gap-10 md:gap-20 items-center">
              {[
                { label: 'Denim', slug: 'denim' },
                { label: 'Tailoring', slug: 'formals' },
                { label: 'Essentials', slug: 't-shirts' }
              ].map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  className="group flex flex-col items-center gap-3"
                >
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-white/70 md:text-white/40 group-hover:text-gold transition-colors duration-700">
                    {cat.label}
                  </span>
                  <div className="w-0 h-[1px] bg-gold/50 transition-all duration-700 group-hover:w-8" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-gold/50 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 hidden md:block">Scroll to Explore Story</span>
        </motion.div>
      </div>
    </section>
  );
}
