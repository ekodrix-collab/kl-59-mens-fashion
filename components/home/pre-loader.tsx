"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";

export function PreLoader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Check session storage to play only once
    const hasPlayed = sessionStorage.getItem("kl59_intro");
    if (hasPlayed) {
      setComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setComplete(true);
      sessionStorage.setItem("kl59_intro", "true");
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setComplete(true);
    sessionStorage.setItem("kl59_intro", "true");
  };

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black cursor-pointer overflow-hidden"
          onClick={handleSkip}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-sans font-black text-2xl md:text-5xl text-white tracking-wider"
              >
                KL
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                className="w-5 md:w-8 h-[1.5px] bg-gold origin-center"
              />
              <motion.span
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-sans font-black text-2xl md:text-5xl text-white tracking-wider"
              >
                59
              </motion.span>
            </div>
            <motion.span
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="font-sans font-normal text-[9px] md:text-xs uppercase text-muted tracking-[0.25em]"
            >
              Men&apos;s Fashion
            </motion.span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 text-[10px] uppercase tracking-[0.2em] text-muted"
          >
            Click to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
