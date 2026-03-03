import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

export const metadata: Metadata = {
  title: 'Collections',
  description:
    "Explore KL-59 men's fashion collections — Premium Denim, Shirts, T-Shirts, Casual Wear & Formals. Handpicked styles for the modern man.",
  alternates: {
    canonical: '/collections',
  },
  openGraph: {
    title: "Collections | KL-59 Men's Fashion",
    description: "Explore our curated men's fashion collections.",
    url: `${SITE_URL}/collections`,
    images: [{ url: '/og-image.jpg' }],
  },
}

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
