"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn, optimizeImageUrl } from "@/lib/utils";

interface RevealImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string; // Container classes (aspect ratio etc)
  imageClassName?: string; // Direct image classes
  aspectRatio?: "portrait" | "landscape" | "square" | "auto" | "video";
  once?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  aspectRatio = "portrait",
  once = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: RevealImageProps) {
  const aspectClass = {
    portrait: "aspect-[2/3]",
    landscape: "aspect-[16/9]",
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto h-full w-full",
  }[aspectRatio];

  const optimizedUrl = optimizeImageUrl(src);

  return (
    <div className={cn("relative overflow-hidden group bg-white/5", aspectClass, className)}>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once, amount: 0.01 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full relative"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          {aspectRatio === "auto" && width && height ? (
            <Image
              src={optimizedUrl}
              alt={alt}
              width={width}
              height={height}
              className={cn("w-full h-full object-cover", imageClassName)}
              priority={priority}
              sizes={sizes}
            />
          ) : (
            <Image
              src={optimizedUrl}
              alt={alt}
              fill
              className={cn("w-full h-full object-cover", imageClassName)}
              priority={priority}
              sizes={sizes}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
