import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

  try {
    const supabase = await createClient()
    const { data: category } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!category) {
      const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      return {
        title: `${name} Collection`,
        description: `Shop premium men's ${name.toLowerCase()} at KL-59. Quality fashion at unbeatable prices.`,
        alternates: { canonical: `/collections/${slug}` },
      }
    }

    const title = `${category.name} Collection — Men's ${category.name}`
    const description = `Shop premium men's ${category.name.toLowerCase()} at KL-59. Handpicked quality at unbeatable prices. Starting from ₹499. Order via WhatsApp or visit our store.`

    return {
      title,
      description,
      alternates: {
        canonical: `/collections/${slug}`,
      },
      openGraph: {
        title: `${category.name} | KL-59 Men's Fashion`,
        description,
        url: `${SITE_URL}/collections/${slug}`,
        images: category.image
          ? [{ url: category.image, width: 1200, height: 630, alt: `${category.name} Collection` }]
          : [{ url: '/og-image.jpg' }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${category.name} Collection | KL-59`,
        description,
        images: category.image ? [category.image] : ['/og-image.jpg'],
      },
    }
  } catch {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return {
      title: `${name} Collection`,
      alternates: { canonical: `/collections/${slug}` },
    }
  }
}

export default async function CollectionSlugLayout({ children }: LayoutProps) {
  return <>{children}</>
}
