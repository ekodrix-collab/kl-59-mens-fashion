import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { optimizeImageUrl } from '@/lib/utils'

const categories = [
  { 
    name: 'Denim Heritage', 
    slug: 'denim', 
    span: 'md:col-span-2 md:row-span-2', 
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1200',
    delay: 0 
  },
  { 
    name: 'Essential Shirts', 
    slug: 'shirts', 
    span: 'md:col-span-2', 
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1200',
    delay: 0.1 
  },
  { 
    name: 'Modern Casuals', 
    slug: 'casual-wear', 
    span: 'md:col-span-1', 
    image: 'https://images.unsplash.com/photo-1516822246374-6e19117609ff?auto=format&fit=crop&q=80&w=800',
    delay: 0.2 
  },
  { 
    name: 'Tailored Formals', 
    slug: 'formals', 
    span: 'md:col-span-1', 
    image: 'https://images.unsplash.com/photo-1594932224010-3a13df2c62e5?auto=format&fit=crop&q=80&w=800',
    delay: 0.3 
  },
]

export default function CategoriesBento() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="max-w-xl">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">
              The Architecture
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-white font-light leading-tight">
              Defined by <span className="italic font-serif text-gold/80">Intent</span>.
            </h2>
          </div>
          <Link href="/shop" className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-gold transition-all border-b border-white/10 pb-2 mt-8 md:mt-0">
            View Full Archive
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[350px_350px] gap-6">
          {categories.map((cat) => (
            <ScrollReveal key={cat.slug} delay={cat.delay} className={`${cat.span} group cursor-pointer`}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="relative block w-full h-full overflow-hidden"
              >
                <motion.div className="absolute inset-0 z-0 h-full w-full">
                  <Image 
                    src={optimizeImageUrl(cat.image)} 
                    alt={cat.name} 
                    fill
                    className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/10 transition-colors duration-700 z-10" />
                
                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                  <div className="overflow-hidden">
                    <h3 className="font-editorial text-white text-2xl md:text-3xl mb-2 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-editorial">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="w-12 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
