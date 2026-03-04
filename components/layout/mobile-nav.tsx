'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Tag, MapPin } from 'lucide-react'
import { useScrollDirection } from '@/hooks/use-scroll-direction'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/shop', icon: ShoppingBag, label: 'Shop' },
  { href: '/offers', icon: Tag, label: 'Offers' },
  { href: '/contact', icon: MapPin, label: 'Store' },
]

import { useOffers } from '@/hooks/use-offers'

export default function MobileNav() {
  const pathname = usePathname()
  const scrollDirection = useScrollDirection()
  const { offersQuery } = useOffers()
  const { data: offers } = offersQuery
  const hasActiveOffers = offers?.some(o => o.is_active)

  // Filter items based on active offers
  const activeNavItems = navItems.filter(item =>
    item.label !== 'Offers' || hasActiveOffers
  )

  // Hide on admin pages
  if (pathname.startsWith('/admin')) return null

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'
        }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-white/90 backdrop-blur-xl border-t border-border-light h-16 flex items-center justify-around">
        {activeNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent' : 'text-text-muted'
                }`}
            >
              <item.icon size={20} fill={isActive ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-montserrat font-medium">{item.label}</span>
              {isActive && <span className="w-1 h-1 rounded-full bg-accent -mt-0.5" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
