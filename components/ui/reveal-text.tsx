"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export function RevealText({ text, className, once = true }: RevealTextProps) {
  const words = text.split(" ");

  return (
    <div className={cn("flex flex-wrap gap-x-[0.2em] gap-y-0", className)}>
      {words.map((word, i) => (
        <Word key={i} index={i} once={once}>
          {word}
        </Word>
      ))}
    </div>
  );
}

function Word({ children, index, once }: { children: string; index: number; once: boolean }) {
  return (
    <span className="relative inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once }}
        transition={{
          duration: 0.8,
          delay: index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function ScrollRevealText({ text, className }: RevealTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.2"],
  });

  const words = text.split(" ");

  return (
    <div ref={container} className={cn("flex flex-wrap justify-center", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <WordProgress key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </WordProgress>
        );
      })}
    </div>
  );
}

function WordProgress({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="mx-[0.15em]">
      {children}
    </motion.span>
  );
}
