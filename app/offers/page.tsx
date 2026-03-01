import { Metadata } from 'next'
import { OffersView } from '@/components/offers/offers-view'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

export const metadata: Metadata = {
  title: "Exclusive Offers | KL-59 Seasonal Campaigns",
  description: "Explore exclusive propositions and seasonal campaigns at KL-59. Premium curation, uncompromising style, and exceptional value for the modern man.",
  openGraph: {
    title: "KL-59 Exclusive Propositions | Seasonal Campaigns",
    description: "Limited-time offers on premium menswear. Experience luxury fashion with exceptional value.",
    url: `${SITE_URL}/offers`,
    siteName: "KL-59 Men's Fashion",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "KL-59 Exclusive Offers",
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "KL-59 Exclusive Offers | Seasonal Campaigns",
    description: "Limited-time offers on premium menswear collections.",
    images: ['/images/og-image.jpg'],
  },
}

export default function Page() {
  return <OffersView />
}
