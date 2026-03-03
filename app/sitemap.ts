import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

    // Static routes with proper priorities
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/collections`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/offers`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/story`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/store`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    try {
        const supabase = await createClient()

        // Fetch all published products — HIGH priority for indexing
        const { data: products } = await supabase
            .from('products')
            .select('slug, updated_at')
            .eq('is_published', true)

        // Fetch all active categories/collections
        const { data: categories } = await supabase
            .from('categories')
            .select('slug, created_at')

        // Fetch active offers
        const { data: offers } = await supabase
            .from('offers')
            .select('id, created_at')
            .eq('is_active', true)

        // Product pages — HIGHEST PRIORITY after homepage
        const productPages: MetadataRoute.Sitemap = (products || []).map((p) => ({
            url: `${baseUrl}/shop/${p.slug}`,
            lastModified: new Date(p.updated_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))

        // Collection pages
        const collectionPages: MetadataRoute.Sitemap = (categories || []).map((c) => ({
            url: `${baseUrl}/collections/${c.slug}`,
            lastModified: new Date(c.created_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

        // Offer detail pages
        const offerPages: MetadataRoute.Sitemap = (offers || []).map((o) => ({
            url: `${baseUrl}/offers/${o.id}`,
            lastModified: new Date(o.created_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

        return [...staticPages, ...collectionPages, ...productPages, ...offerPages]
    } catch (error) {
        console.error('Sitemap generation error:', error)
    }

    return staticPages
}
