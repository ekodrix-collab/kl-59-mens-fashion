import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { ProductDetailView } from '@/components/product/product-detail-view'
import { notFound } from 'next/navigation'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import Breadcrumb from '@/components/ui/breadcrumb'

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

// Generate static paths for ISR — makes product pages load instantly
export async function generateStaticParams() {
  try {
    const supabase = await createClient()
    const { data: products } = await supabase
      .from('products')
      .select('slug')
      .eq('is_published', true)

    return (products || []).map((product) => ({
      slug: product.slug,
    }))
  } catch {
    return []
  }
}

// Dynamic metadata — THIS IS WHAT GOOGLE READS
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return { title: 'Product Not Found' }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'
  const category = product.product_categories?.find((pc: any) => pc.is_primary)?.category ||
    product.product_categories?.[0]?.category

  const hasDiscount = product.mrp > product.selling_price
  const priceText = hasDiscount
    ? `₹${product.selling_price} (${product.discount_percent}% OFF — MRP ₹${product.mrp})`
    : `₹${product.selling_price}`

  const title = product.name
  const description = `${product.description || `Premium ${category?.name || "men's fashion"} from KL-59.`} Available sizes: ${(product.sizes || []).join(', ')}. Order on WhatsApp or visit our store in Kannur.`

  const images = (product.images || []).map((img: string, i: number) => ({
    url: img,
    width: 800,
    height: 1067,
    alt: `${product.name}${i > 0 ? ` — View ${i + 1}` : ''} — KL-59 Men's Fashion`,
    type: 'image/jpeg',
  }))

  return {
    title,
    description,
    alternates: {
      canonical: `/shop/${slug}`,
    },
    openGraph: {
      title: `${product.name} — ${priceText}`,
      description,
      url: `${SITE_URL}/shop/${slug}`,
      type: 'article',
      images: images.length > 0 ? images : [{ url: '/og-image.jpg' }],
      siteName: "KL-59 Men's Fashion",
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — ${priceText}`,
      description: description.slice(0, 200),
      images: product.images?.[0] ? [product.images[0]] : ['/og-image.jpg'],
    },
    other: {
      'product:price:amount': String(product.selling_price),
      'product:price:currency': 'INR',
      'product:availability': 'in stock',
      'product:brand': 'KL-59',
      'product:category': category?.name || "Men's Fashion",
    },
  }
}

export default async function ShopProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const related = await getRelatedProducts(product)
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

  const category = product.product_categories?.find((pc: any) => pc.is_primary)?.category ||
    product.product_categories?.[0]?.category

  return (
    <>
      {/* Product structured data for Google rich results */}
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          {
            name: category?.name || 'Collections',
            url: `${SITE_URL}/collections/${category?.slug || ''}`,
          },
          { name: product.name, url: `${SITE_URL}/shop/${product.slug}` },
        ]}
      />

      <div className="pt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              {
                label: category?.name || 'Collections',
                href: `/collections/${category?.slug || ''}`,
              },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <ProductDetailView product={product} related={related} />
    </>
  )
}
