'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

// This route is deprecated. Redirect to /shop/[slug]
export default function ProductRedirect() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  useEffect(() => {
    router.replace(`/shop/${slug}`)
  }, [slug, router])

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-gold" size={32} />
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/30">Redirecting...</span>
      </div>
    </main>
  )
}
