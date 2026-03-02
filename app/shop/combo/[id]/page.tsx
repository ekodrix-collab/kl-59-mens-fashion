import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { ComboDetailView } from '@/components/product/combo-detail-view'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{ id: string }>
}

async function getComboOffer(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('offers')
        .select(`
      *,
      combo_items (
        *,
        product:products (*)
      )
    `)
        .eq('id', id)
        .single()

    if (error || !data || data.offer_type !== 'combo') return null
    return data
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const offer = await getComboOffer(id)

    if (!offer) return { title: 'Combo Offer Not Found' }

    const description = offer.description || `Discover the ${offer.title} combo at KL-59 Men's Fashion. Premium quality, exceptional value.`
    const primaryImage = offer.banner_image || offer.combo_items?.[0]?.product?.images?.[0]

    return {
        title: offer.title,
        description,
        openGraph: {
            title: `${offer.title} | Combo Offers | KL-59`,
            description,
            url: `${(process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')) ? process.env.NEXT_PUBLIC_SITE_URL : 'https://kl-59-mens-fashion.vercel.app'}/shop/combo/${id}`,
            siteName: "KL-59 Men's Fashion",
            images: primaryImage ? [
                {
                    url: primaryImage,
                    width: 1200,
                    height: 630,
                    alt: offer.title,
                }
            ] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: offer.title,
            description,
            images: primaryImage ? [primaryImage] : [],
        },
    }
}

export default async function ComboOfferPage({ params }: PageProps) {
    const { id } = await params
    const offer = await getComboOffer(id)

    if (!offer) notFound()

    return <ComboDetailView offer={offer as any} />
}
