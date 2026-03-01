import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

    // Static routes
    const routes = [
        '',
        '/shop',
        '/story',
        '/offers',
        '/store',
        '/collections/denim',
        '/collections/shirts',
        '/collections/linen',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic product routes
    try {
        const supabase = await createClient()
        const { data: products } = await supabase
            .from('products')
            .select('slug, updated_at')
            .eq('is_published', true)

        if (products) {
            const productRoutes = products.map((product) => ({
                url: `${baseUrl}/shop/${product.slug}`,
                lastModified: new Date(product.updated_at || new Date()),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }))
            return [...routes, ...productRoutes]
        }
    } catch (error) {
        console.error('Sitemap generation error:', error)
    }

    return routes
}
