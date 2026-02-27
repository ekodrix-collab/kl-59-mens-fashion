'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Package, Tag, Grid3X3, Settings, LogOut } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Categories', href: '/admin/categories', icon: Grid3X3 },
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-gray-900 text-white fixed inset-y-0 left-0 z-40">
        <div className="p-6">
          <div className="flex items-center gap-1.5">
            <span className="font-montserrat font-black text-lg">KL</span>
            <span className="w-4 h-[2px] bg-accent" />
            <span className="font-montserrat font-black text-lg">59</span>
          </div>
          <p className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-gray-400 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-white border-l-2 border-accent' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 w-full transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-60">
        {/* Admin Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <h2 className="font-montserrat font-semibold text-sm text-gray-800">
            {navItems.find(item => pathname.startsWith(item.href))?.label || 'Admin'}
          </h2>
          <span className="text-sm text-gray-500">Welcome, Admin</span>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
