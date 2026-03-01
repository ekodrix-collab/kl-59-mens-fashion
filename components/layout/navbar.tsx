"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticElement } from "@/components/ui/magnetic-element";

const navLinks = [
  { name: "Catalogue", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Offers", href: "/offers" },
  { name: "Story", href: "/story" },
  { name: "Store", href: "/store" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide nav on home hero
  const showNav = !isHome || scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: showNav ? 0 : -100, 
          opacity: showNav ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-40 h-16 transition-colors duration-500",
          scrolled ? "bg-black/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 lg:px-10 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="small" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-[12px] uppercase tracking-[0.2em] transition-colors relative group",
                  pathname.startsWith(link.href) ? "text-gold" : "text-white hover:text-gold"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 w-full h-[1px] bg-gold origin-left transition-transform duration-300",
                  pathname.startsWith(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-gold transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

import { useStoreInfo } from "@/hooks/use-store-info";

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { storeInfoQuery } = useStoreInfo();
  const { data: storeInfo } = storeInfoQuery;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black flex flex-col p-6"
    >
      <div className="flex justify-end">
        <button onClick={onClose} className="text-white p-2">
          <X size={32} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-12 pl-4">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="font-display text-4xl text-white hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="w-12 h-[1px] bg-gold" />
          <div className="flex flex-col gap-2 text-muted font-body text-[13px] font-light">
            <span>📱 {storeInfo?.phone || '+91 9895884796'}</span>
            <span>📍 {storeInfo?.address ? storeInfo.address.split(',')[0].trim() : 'Kerala, India'}</span>
            <span>📷 {storeInfo?.instagram || '@kl59fashion'}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
