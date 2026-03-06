import { Metadata } from 'next'
import { StoreView } from '@/components/store/store-view'
import { StoreJsonLd } from '@/components/seo/json-ld'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kl-59mensfashion.in'

export const metadata: Metadata = {
  title: "Visit Our Store | KL-59 Men's Fashion Taliparamba, Kannur",
  description:
    "Visit KL-59 Men's Fashion in Taliparamba, Kannur, Kerala (NH). Open Mon-Sat 10AM-9PM, Sun 11AM-8PM. Premium men's clothing store. Call or WhatsApp us at +91 9895884796.",
  alternates: {
    canonical: '/store',
  },
  openGraph: {
    title: "Visit Our Store | KL-59 Men's Fashion",
    description: "Visit KL-59 at Kannur. Premium men's fashion store.",
    url: `${SITE_URL}/store`,
    siteName: "KL-59 Men's Fashion",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'KL-59 Showroom',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Visit the KL-59 Store | Kannur",
    description: "Premium men's fashion store in Kannur, Kerala.",
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'],
  },
}

export default function Page() {
  return (
    <>
      <StoreJsonLd />
      <StoreView />
    </>
  )
}
