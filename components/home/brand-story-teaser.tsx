'use client'

import Link from 'next/link'
import TextReveal from '@/components/ui/text-reveal'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'

export default function BrandStoryTeaser() {
  const { ref, isInView } = useInView({ threshold: 0.4 })

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <TextReveal
          text="Style that speaks before you do"
          className="font-cormorant italic text-2xl md:text-[28px] text-text-primary leading-relaxed justify-center mb-8"
          staggerDelay={0.05}
        />

        <motion.p
          className="text-accent text-sm mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          ─── ✦ ───
        </motion.p>

        <ScrollReveal delay={1}>
          <p className="font-inter text-base text-text-muted leading-relaxed mb-8">
            KL-59 is more than a store — it&apos;s a destination for men who understand that great style doesn&apos;t need a great price tag. We curate fashion that speaks confidence.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1.2}>
          <Link
            href="/about"
            className="font-montserrat font-medium text-[13px] uppercase tracking-[0.1em] text-accent hover:underline"
          >
            Our Story →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
