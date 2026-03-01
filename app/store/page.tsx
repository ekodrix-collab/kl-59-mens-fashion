import { Metadata } from 'next'
import { StoreView } from '@/components/store/store-view'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

export const metadata: Metadata = {
  title: "Visit Our Atelier | KL-59 Store Concierge",
  description: "Experience the KL-59 aesthetic in person. Visit our heritage showroom for personalized styling consultations and an exclusive look at our latest series.",
  openGraph: {
    title: "KL-59 Heritage Showroom | Personal Styling Concierge",
    description: "Visit our physical atelier in Kannur for a curated luxury shopping experience.",
    url: `${SITE_URL}/store`,
    siteName: "KL-59 Men's Fashion",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: "KL-59 Showroom",
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Visit the KL-59 Atelier | Store Concierge",
    description: "Experience luxury menswear in person at our flagship showroom.",
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'],
  },
}

export default function Page() {
  return <StoreView />
}
