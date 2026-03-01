import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { ProductDetailView } from '@/components/product/product-detail-view'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        *,
        category:categories (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

async function getRelatedProducts(product: any) {
  const supabase = await createClient()
  const primaryCat = product.product_categories?.find((pc: any) => pc.is_primary)?.category_id
  
  if (!primaryCat) return []

  const { data } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        *,
        category:categories (*)
      )
    `)
    .eq('is_published', true)
    .neq('id', product.id)
    .filter('product_categories.category_id', 'eq', primaryCat)
    .limit(4)

  return data || []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return { title: 'Product Not Found' }

  const description = product.description || `Discover the ${product.name} at KL-59 Men's Fashion. Premium quality, modern design.`
  const image = product.images?.[0]

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | KL-59`,
      description,
      url: `https://kl-59-mens-fashion.vercel.app/shop/${slug}`,
      siteName: "KL-59 Men's Fashion",
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: image ? [image] : [],
    },
  }
}

export default async function ShopProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const related = await getRelatedProducts(product)

  return <ProductDetailView product={product} related={related} />
}
