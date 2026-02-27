"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RevealImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  once?: boolean;
}

export function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  aspectRatio = "portrait",
  once = true,
}: RevealImageProps) {
  const aspectClass = {
    portrait: "aspect-[2/3]",
    landscape: "aspect-[16/9]",
    square: "aspect-square",
  }[aspectRatio];

  return (
    <div className={cn("relative overflow-hidden group bg-rich-black", aspectClass, className)}>
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 1200}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
