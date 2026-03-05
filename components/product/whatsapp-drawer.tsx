'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, ShieldCheck, Truck, Clock } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

interface WhatsAppDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  product: any
  selectedSize: string
  selectedColor: string
}

export function WhatsAppDrawer({
  isOpen,
  onClose,
  onConfirm,
  product,
  selectedSize,
  selectedColor,
}: WhatsAppDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-rich-black border-l border-white/10 z-[110] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
                Order Review
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white transition-colors text-white/50 hover:text-white"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-10" data-lenis-prevent>

              {/* Product Summary */}
              <div className="flex gap-6">
                <div className="relative w-24 aspect-[2/3] bg-white/5 border border-white/10">
                  {product.images?.[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold mb-2">{product.collection?.name || 'Collection'}</span>
                  <h3 className="font-display text-2xl text-white mb-2">{product.name}</h3>
                  <span className="font-body text-white/70">{formatPrice(product.selling_price)}</span>
                </div>
              </div>

              {/* Selections */}
              <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
                <div>
                  <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">Size</span>
                  <span className="font-sans text-sm text-white">{selectedSize || 'Not selected'}</span>
                </div>
                {selectedColor && (
                  <div>
                    <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">Color</span>
                    <span className="font-sans text-sm text-white">{selectedColor}</span>
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="space-y-6 flex-1">
                <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 mb-6 border-b border-white/10 pb-2">Bespoke Delivery Process</h4>

                <div className="flex gap-4 items-start pb-4">
                  <ShieldCheck size={20} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                  <div>
                    <h5 className="font-sans text-xs uppercase tracking-widest text-white mb-1">Authentic Guarantee</h5>
                    <p className="font-body text-sm text-white/50 font-light">Every artifact is quality checked before dispatch.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start pb-4">
                  <MessageSquare size={20} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                  <div>
                    <h5 className="font-sans text-xs uppercase tracking-widest text-white mb-1">Concierge Service</h5>
                    <p className="font-body text-sm text-white/50 font-light">Confirm sizing and details directly with our stylist via WhatsApp.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Truck size={20} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                  <div>
                    <h5 className="font-sans text-xs uppercase tracking-widest text-white mb-1">Express Dispatch</h5>
                    <p className="font-body text-sm text-white/50 font-light">Orders are secured upon WhatsApp confirmation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-white/10 bg-black/50">
              <button
                onClick={() => {
                  onClose();
                  onConfirm();
                }}
                className="w-full bg-[#25D366] text-white font-sans text-[11px] font-medium uppercase tracking-[0.3em] py-5 transition-colors flex items-center justify-center gap-3 hover:bg-[#20bd5a]"
              >
                <MessageSquare size={16} />
                Start Concierge Chat
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
