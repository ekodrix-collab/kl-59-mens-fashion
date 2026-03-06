import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kl-59mensfashion.in'

export const metadata: Metadata = {
  title: 'Shop All',
  description:
    "Browse the complete KL-59 men's fashion catalogue. Premium denim, shirts, t-shirts, casual wear & formals. Handpicked styles at unbeatable prices. Order via WhatsApp.",
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: "Shop All | KL-59 Men's Fashion",
    description: "Browse our complete collection of premium men's fashion.",
    url: `${SITE_URL}/shop`,
    images: [{ url: '/og-image.jpg' }],
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
