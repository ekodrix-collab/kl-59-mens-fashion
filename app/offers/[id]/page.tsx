import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { OfferDetailView } from '@/components/offers/offer-detail-view'
import { notFound } from 'next/navigation'
import type { Offer } from '@/types'

interface PageProps {
    params: Promise<{ id: string }>
}

async function getOffer(id: string): Promise<Offer | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('offers')
        .select(`
      *,
      product:products!product_id (*),
      combo_items (*, product:products!product_id (*))
    `)
        .eq('id', id)
        .single()

    if (error || !data) return null
    return data as Offer
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const offer = await getOffer(id)

    if (!offer) return { title: 'Offer Not Found | KL-59' }

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kl-59mensfashion.in'
    const title = `${offer.title} | Exclusive Offer at KL-59`
    const description = offer.description || `Explore this exclusive ${offer.offer_type} at KL-59 Men's Fashion. Premium curation and exceptional value.`
    const image = offer.banner_image || offer.product?.images?.[0] || '/images/og-image.jpg'

    return {
        title,
        description,
        alternates: {
            canonical: `/offers/${id}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/offers/${id}`,
            siteName: "KL-59 Men's Fashion",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: offer.title,
                }
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    }
}

export default async function OfferPage({ params }: PageProps) {
    const { id } = await params
    const offer = await getOffer(id)

    if (!offer) notFound()

    return <OfferDetailView offer={offer} />
}
