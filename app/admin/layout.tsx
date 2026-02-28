'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Package, Tag, Grid3X3, Settings, LogOut } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Collections', href: '/admin/categories', icon: Grid3X3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-rich-black border-r border-white/10 text-white fixed inset-y-0 left-0 z-40">
        <div className="p-8 flex flex-col items-start border-b border-white/5">
          <Logo size="small" />
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/40 mt-6">Control Panel</p>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 text-sm transition-all duration-300 ${
                  isActive 
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

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-4 px-4 py-3 text-white/50 hover:text-white hover:bg-white/5 w-full transition-colors text-left uppercase tracking-widest text-[10px] font-sans">
            <LogOut size={16} strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Admin Header */}
        <header className="bg-rich-black/50 backdrop-blur-md border-b border-white/10 px-8 py-5 flex items-center justify-between sticky top-0 z-30">
          <h2 className="font-sans font-medium uppercase tracking-[0.2em] text-xs text-white">
            {navItems.find(item => pathname.startsWith(item.href))?.label || 'Administration'}
          </h2>
          <span className="text-[10px] font-sans uppercase tracking-widest text-gold border border-gold/30 px-3 py-1 rounded-full bg-gold/5">
            Admin Access
          </span>
        </header>

        <main className="flex-1 p-8 bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  )
}
