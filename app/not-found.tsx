import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-12 flex justify-center">
          <Logo />
        </div>

        <h1 className="font-display text-7xl md:text-9xl text-white mb-4">404</h1>
        <p className="font-body text-lg text-muted mb-12 uppercase tracking-widest">Page not found</p>

        <Link
          href="/"
          className="inline-block px-10 py-4 border border-white text-white font-sans font-medium text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
        >
          Return to Experience
        </Link>
      </div>
    </div>
  )
}
