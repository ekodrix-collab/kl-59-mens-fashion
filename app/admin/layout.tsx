'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Package, Tag, Grid3X3, Settings, LogOut, AlertTriangle, X, Image as ImageIcon, Menu } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Collections', href: '/admin/categories', icon: Grid3X3 },
  { label: 'Gallery', href: '/admin/media', icon: ImageIcon },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const confirmSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    localStorage.removeItem('kl59_admin_auth')
    router.push('/admin/login')
    router.refresh()
  }

  // Robust Auth Guard
  useEffect(() => {
    const checkAuth = () => {
      if (pathname === '/admin/login') {
        setIsCheckingAuth(false)
        return
      }

      const isAuth = localStorage.getItem('kl59_admin_auth') === 'true'
      if (!isAuth) {
        router.replace('/admin/login')
      } else {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Don't show anything on login page except the children
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show nothing while checking auth to prevent layout flicker
  if (isCheckingAuth) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  }

  const SidebarContent = () => (
    <>
      <div className="p-8 flex items-center justify-between border-b border-white/5">
        <div>
          <Logo size="small" />
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/40 mt-6 lg:mt-6 mt-1">Control Panel</p>
        </div>
        <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto" data-lenis-prevent>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 text-sm transition-all duration-300 ${isActive
                ? 'text-gold bg-white/5 border-l-2 border-gold font-medium'
                : 'text-white/50 hover:text-white hover:bg-white/5 font-light'
                }`}
            >
              <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} />
              <span className="font-sans uppercase tracking-widest text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/5 mt-auto">
        <button
          onClick={() => {
            setMobileMenuOpen(false)
            setShowSignOutModal(true)
          }}
          className="flex items-center gap-4 px-4 py-3 text-white/50 hover:text-red-400 hover:bg-red-500/5 w-full transition-colors text-left uppercase tracking-widest text-[10px] font-sans"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-rich-black border-r border-white/10 text-white fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-rich-black border-r border-white/10 text-white z-50 flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Admin Header */}
        <header className="bg-rich-black/50 backdrop-blur-md border-b border-white/10 px-6 lg:px-8 py-5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="font-sans font-medium uppercase tracking-[0.2em] text-[10px] sm:text-xs text-white">
              {navItems.find(item => pathname.startsWith(item.href))?.label || 'Administration'}
            </h2>
          </div>
          <span className="text-[10px] font-sans uppercase tracking-widest text-gold border border-gold/30 px-3 py-1 rounded-full bg-gold/5">
            Admin Access
          </span>
        </header>

        <main className="flex-1 p-8 bg-[#0a0a0a]">
          {children}
        </main>
      </div>

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignOutModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-rich-black/95 backdrop-blur-xl border border-white/10 rounded-lg w-full max-w-sm overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                {/* Top accent */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                {/* Close button */}
                <button
                  onClick={() => setShowSignOutModal(false)}
                  className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="p-8 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                    <AlertTriangle size={24} className="text-red-400" />
                  </div>

                  <h3 className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-white mb-2">
                    Sign Out
                  </h3>
                  <p className="font-sans text-xs text-white/40 leading-relaxed mb-8">
                    Are you sure you want to end your admin session? You will need to log in again to access the panel.
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setShowSignOutModal(false)}
                      className="flex-1 py-3 border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-sans text-[10px] uppercase tracking-[0.2em] transition-all rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmSignOut}
                      className="flex-1 py-3 bg-red-500/90 hover:bg-red-500 text-white font-sans text-[10px] uppercase tracking-[0.2em] transition-all rounded flex items-center justify-center gap-2"
                    >
                      <LogOut size={12} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
