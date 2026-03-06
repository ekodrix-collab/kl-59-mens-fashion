import { Metadata } from 'next'
import { StoryView } from '@/components/story/story-view'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kl-59mensfashion.in'

export const metadata: Metadata = {
  title: "Our Story | The Heritage of KL-59",
  description: "Discover the heritage of KL-59. A legacy of uncompromising craftsmanship, modern silhouettes, and the pursuit of sartorial excellence since inception.",
  alternates: {
    canonical: '/story',
  },
  openGraph: {
    title: "The KL-59 Story | Artisanal Menswear Heritage",
    description: "Defining the modern masculine silhouette through craftsmanship and timeless design.",
    url: `${SITE_URL}/story`,
    siteName: "KL-59 Men's Fashion",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: "KL-59 Heritage",
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The KL-59 Story | Menswear Heritage",
    description: "A legacy of uncompromising craftsmanship and modern silhouettes.",
    images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80'],
  },
}

export default function Page() {
  return <StoryView />
}
