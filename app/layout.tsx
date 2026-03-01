import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "KL-59 Men's Fashion | Luxury Menswear & Premium Clothing",
    template: "%s | KL-59 Men's Fashion"
  },
  description: "Experience the pinnacle of men's luxury fashion at KL-59. Boutique collection of premium denim, tailored shirts, formal wear, and contemporary casuals. Designed for defined living.",
  keywords: ["Mens Fashion", "Luxury Clothing", "Premium Denim", "Tailored Shirts", "Formal Wear", "Kannur Fashion", "KL-59", "Menswear Kerala"],
  authors: [{ name: "KL-59 Men's Fashion" }],
  creator: "Ekodrix",
  publisher: "KL-59",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kl59.in'),
  openGraph: {
    title: "KL-59 Men's Fashion | Luxury Menswear",
    description: "Exquisite tailoring and modern fashion for the contemporary man. Discover our curated collection.",
    url: 'https://kl59.in',
    siteName: "KL-59 Men's Fashion",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "KL-59 Men's Fashion Gallery",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "KL-59 Men's Fashion | Luxury Menswear",
    description: "Exquisite tailoring and modern fashion for the contemporary man.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { NavbarWrapper } from '@/components/layout/navbar-wrapper'
import { QueryProvider } from '@/components/providers/query-provider'
import { PreLoader } from '@/components/home/pre-loader'

import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-body antialiased bg-rich-black text-white">
        <QueryProvider>
          <PreLoader />
          <SmoothScroll>
            <NavbarWrapper>
              {children}
            </NavbarWrapper>
          </SmoothScroll>
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0px',
                fontFamily: 'var(--font-inter)',
                fontSize: '12px',
                letterSpacing: '0em',
              },
              success: {
                iconTheme: {
                  primary: '#C1A162',
                  secondary: '#000',
                },
              }
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}