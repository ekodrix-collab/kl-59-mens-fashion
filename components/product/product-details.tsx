"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { MagneticElement } from "@/components/ui/magnetic-element";
import { MessageSquare } from "lucide-react";
import { WhatsAppDrawer } from "./whatsapp-drawer";

export function ProductGallery({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-rich-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeImage]}
              alt="Product Image"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={cn(
              "relative aspect-[2/3] w-20 flex-shrink-0 overflow-hidden bg-rich-black border-2 transition-all",
              activeImage === i ? "border-gold" : "border-transparent"
            )}
          >
            <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductInfo({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOrderClick = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      setError("Please select a size");
      return;
    }
    setError("");
    setIsDrawerOpen(true);
  };

  const confirmWhatsAppOrder = () => {
    const url = generateWhatsAppURL(product, selectedSize, selectedColor);
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold block mb-4">
          {product.collection.name}
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-white font-medium mb-6">
          {product.name}
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-body text-2xl text-white">
            {formatPrice(product.selling_price)}
          </span>
          {product.mrp > product.selling_price && (
            <>
              <span className="font-body text-lg text-subtle line-through">
                {formatPrice(product.mrp)}
              </span>
              <span className="font-body text-sm text-gold">
                You save {formatPrice(product.mrp - product.selling_price)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/5" />

      <p className="font-body text-muted text-base font-light leading-relaxed">
        {product.description}
      </p>

      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            Select Color
          </span>
          <div className="flex gap-4">
            {product.colors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "px-4 py-2 border font-sans text-[11px] uppercase tracking-wider transition-all",
                  selectedColor === color ? "border-gold text-gold" : "border-white/10 text-white"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-subtle">
            Select Size
          </span>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "w-12 h-12 flex items-center justify-center border font-sans text-xs uppercase tracking-wider transition-all",
                  selectedSize === size ? "bg-white text-black border-white" : "border-white/10 text-white hover:border-white/30"
                )}
              >
                {size}
              </button>
            ))}
          </div>
          {error && <span className="text-offer-red text-xs mt-1">{error}</span>}
        </div>
      )}

      <div className="mt-8 pb-24 md:pb-0">
        <MagneticElement>
          <button
            onClick={handleOrderClick}
            className="hidden md:flex w-full bg-[#25D366] text-white font-sans text-[12px] font-medium uppercase tracking-[0.2em] py-5 transition-colors items-center justify-center gap-3 hover:bg-[#20bd5a]"
          >
            <MessageSquare size={18} />
            Order on WhatsApp
          </button>
        </MagneticElement>
      </div>

      {/* Mobile Sticky Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-rich-black via-rich-black to-transparent z-50 md:hidden">
        <button
          onClick={handleOrderClick}
          className="w-full bg-[#25D366] text-white font-sans text-[11px] font-medium uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
        >
          <MessageSquare size={16} />
          Order on WhatsApp
        </button>
      </div>

      <WhatsAppDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onConfirm={confirmWhatsAppOrder}
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </div>
  );
}
