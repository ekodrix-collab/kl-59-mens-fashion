'use client'

import Link from 'next/link'

export default function OfferMarquee() {
  const content = "FLAT 50% OFF DENIM ★ FREE DELIVERY IN CITY ★ NEW ARRIVALS WEEKLY ★ COMBO DEALS LIVE ★ FLAT 50% OFF DENIM ★ FREE DELIVERY IN CITY ★ NEW ARRIVALS WEEKLY ★ COMBO DEALS LIVE"

  return (
    <Link href="/offers" className="block fixed top-0 left-0 right-0 z-[60] bg-accent h-9 overflow-hidden">
      <div className="h-full flex items-center hover:[animation-play-state:paused]">
        <div
          className="whitespace-nowrap animate-marquee"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          <span className="font-montserrat font-medium text-[11px] uppercase tracking-[0.15em] text-brand-black">
            {content} ★ {content}
          </span>
        </div>
      </div>
    </Link>
  )
}
