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
  title: "KL-59 Men's Fashion | Premium Men's Clothing",
  description: "Exquisite tailoring and modern fashion for the contemporary man. Shop premium denim, shirts, t-shirts, casuals, and formals at KL-59.",
  openGraph: {
    title: "KL-59 Men's Fashion | Premium Men's Clothing",
    description: "Exquisite tailoring and modern fashion for the contemporary man.",
    url: 'https://kl59.in',
    siteName: "KL-59 Men's Fashion",
    type: 'website',
  },
}

import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { NavbarWrapper } from '@/components/layout/navbar-wrapper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-body antialiased bg-black text-white">
        <SmoothScroll>
          <NavbarWrapper>
            {children}
          </NavbarWrapper>
        </SmoothScroll>
      </body>
    </html>
  )
}


