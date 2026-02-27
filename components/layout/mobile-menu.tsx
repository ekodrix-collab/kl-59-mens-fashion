'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { Phone, MapPin, Instagram } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-brand-black z-[70] flex flex-col"
          >
            {/* Close */}
            <div className="flex justify-end p-6">
              <button onClick={onClose} className="text-accent hover:text-white transition-colors text-2xl">
                ✕
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-montserrat font-bold text-[32px] uppercase tracking-[0.2em] text-text-light hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 border-t border-border-dark"
            >
              <div className="flex flex-col gap-3 text-text-muted text-sm font-montserrat">
                <a href="tel:+919895884796" className="flex items-center gap-3 hover:text-text-light transition-colors">
                  <Phone size={16} className="text-accent" /> +91 9895884796
                </a>
                <span className="flex items-center gap-3">
                  <MapPin size={16} className="text-accent" /> Store Location
                </span>
                <a href="#" className="flex items-center gap-3 hover:text-text-light transition-colors">
                  <Instagram size={16} className="text-accent" /> @kl59fashion
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
