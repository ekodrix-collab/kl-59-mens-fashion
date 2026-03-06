import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  display: 'swap',
  preload: true,
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL &&
      !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://www.kl-59mensfashion.in'
  ),

  title: {
    default: "KL-59 Men's Fashion | Premium Men's Clothing Store",
    template: "%s | KL-59 Men's Fashion",
  },

  description:
    "Shop premium men's denim, shirts, t-shirts, casual wear & formals at KL-59. Handpicked quality fashion at unbeatable prices. Visit our store in Taliparamba, Kannur or order via WhatsApp.",

  keywords: [
    'KL-59',
    'KL 59',
    'KL59',
    "men's fashion",
    "men's clothing",
    "men's denim jeans",
    "premium men's wear",
    "men's shirts",
    "men's t-shirts",
    "casual wear for men",
    "formal wear for men",
    "men's clothing store",
    "buy men's clothes online",
    "affordable men's fashion",
    "men's fashion Kannur",
    "clothing store Kannur",
    "men's fashion Taliparamba",
    "clothing store Taliparamba",
    "denim jeans online",
    "men's fashion India",
    "men's fashion Kerala",
    "menswear Kerala",
    "WhatsApp shopping",
    "order clothes WhatsApp",
    "luxury menswear",
    "premium denim",
    "tailored shirts",
  ],

  authors: [{ name: "KL-59 Men's Fashion" }],
  creator: 'Ekodrix',
  publisher: "KL-59 Men's Fashion",

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "KL-59",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kl-59mensfashion.in',
    siteName: "KL-59 Men's Fashion",
    title: "KL-59 Men's Fashion | Premium Men's Clothing Store",
    description:
      "Shop premium men's denim, shirts, t-shirts & casual wear. Quality fashion at unbeatable prices. Order via WhatsApp.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "KL-59 Men's Fashion — Premium Men's Clothing",
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "KL-59 Men's Fashion | Premium Men's Clothing",
    description:
      "Premium men's fashion at unbeatable prices. Denim, shirts, t-shirts & more.",
    images: ['/og-image.jpg'],
    creator: '@kl59fashion',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: '/',
  },

  category: 'fashion',

  verification: {
    google: 'wUzqzfr9KmqA9YMtF4FjftqJKNvmyAX3UbpjSjGzJP4',
  },
}

import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { NavbarWrapper } from '@/components/layout/navbar-wrapper'
import { QueryProvider } from '@/components/providers/query-provider'
import { PreLoader } from '@/components/home/pre-loader'

import { Toaster } from 'react-hot-toast'
import { PWARegistration } from '@/components/providers/pwa-registration'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-body antialiased bg-rich-black text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:bg-[#C8A97E] focus:text-black focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <QueryProvider>
          <PreLoader />
          <SmoothScroll>
            <NavbarWrapper>
              <main id="main-content">
                {children}
              </main>
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
          <PWARegistration />
        </QueryProvider>
      </body>
    </html>
  );
}