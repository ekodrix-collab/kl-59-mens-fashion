'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import { useMediaQuery } from '@/hooks/use-media-query'
import { motion, AnimatePresence } from 'framer-motion'
import MobileMenu from './mobile-menu'

interface HeaderProps {
  variant?: 'light' | 'dark'
}

function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex flex-col items-center">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className={`font-editorial text-3xl tracking-[0.1em] transition-colors duration-500 ${light ? 'text-white' : 'text-text-primary'}`}>
          KL
        </span>
        <div className="flex flex-col items-center gap-1">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            className={`h-[1px] ${light ? 'bg-white/30' : 'bg-brand-black/20'}`}
          />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-full h-[1px] bg-accent origin-center" 
          />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            className={`h-[1px] ${light ? 'bg-white/30' : 'bg-brand-black/20'}`}
          />
        </div>
        <span className={`font-editorial text-3xl tracking-[0.1em] transition-colors duration-500 ${light ? 'text-white' : 'text-text-primary'}`}>
          59
        </span>
      </div>
      <div className="overflow-hidden mt-1 px-4">
        <motion.span 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className={`block font-montserrat font-bold text-[8px] tracking-[0.6em] uppercase transition-colors duration-500 ${light ? 'text-accent' : 'text-text-primary'}`}
        >
          Established 59
        </motion.span>
      </div>
    </Link>
  )
}

export { Logo }

export default function Header({ variant = 'light' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // In dark variant, logo/text starts dark. In light variant, logo/text starts white.
  // Once scrolled, everything is always dark (for the white sticky bg).
  const isLightMode = variant === 'light' && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-editorial pt-9 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl py-2 shadow-sm'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-10 flex items-center justify-between h-12">
          {/* Menu Button (Left) */}
          <div className="flex-1 hidden md:flex">
            <button 
              onClick={() => setMenuOpen(true)}
              className={`font-montserrat text-[10px] uppercase tracking-[0.3em] font-bold group flex items-center gap-3 transition-colors ${isLightMode ? 'text-white' : 'text-text-primary'}`}
            >
              <div className="flex flex-col gap-1 w-5">
                <span className={`h-px w-full transition-all duration-500 origin-left group-hover:bg-accent ${isLightMode ? 'bg-white' : 'bg-text-primary'}`} />
                <span className={`h-px w-3 transition-all duration-500 group-hover:w-full group-hover:bg-accent ${isLightMode ? 'bg-white' : 'bg-text-primary'}`} />
              </div>
              Menu
            </button>
          </div>

          {/* Logo (Center) */}
          <div className="flex-shrink-0">
            <Logo light={isLightMode} />
          </div>

          {/* Nav Icons / Action (Right) */}
          <div className="flex-1 flex justify-end gap-10 items-center">
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-montserrat font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 group ${
                    isLightMode ? 'text-white' : 'text-text-primary'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <button 
              className={`font-montserrat text-[10px] uppercase tracking-[0.3em] font-bold md:hidden ${isLightMode ? 'text-white' : 'text-text-primary'}`}
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
