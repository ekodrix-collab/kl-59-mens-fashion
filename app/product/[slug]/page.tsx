import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductRedirectPage({ params }: PageProps) {
  const { slug } = await params
  
  // Permanently redirect old /product/[slug] links to /shop/[slug]
  redirect(`/shop/${slug}`)
}
