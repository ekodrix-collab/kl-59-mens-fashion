'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

interface StatItemProps {
  value: string
  label: string
  suffix?: string
}

function StatItem({ value, label, suffix = '' }: StatItemProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
    const isDecimal = value.includes('.')
    const hasSuffix = value.includes('+') || value.includes('★')

    const controls = animate(0, numericValue, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (isDecimal) {
          setDisplayValue(v.toFixed(1))
        } else {
          setDisplayValue(Math.floor(v).toString())
        }
      },
    })

    return () => controls.stop()
  }, [isInView, value])

  const extra = value.includes('+') ? '+' : value.includes('★') ? ' ★' : ''

  return (
    <div className="text-center flex-1">
      <span ref={ref} className="font-montserrat font-bold text-4xl md:text-5xl text-text-primary">
        {displayValue}{extra}
      </span>
      <p className="font-inter text-sm text-text-muted mt-2">{label}</p>
    </div>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <StatItem value="500+" label="Happy Customers" />
        <div className="hidden md:block w-px h-16 bg-accent/30" />
        <StatItem value="50+" label="Premium Brands" />
        <div className="hidden md:block w-px h-16 bg-accent/30" />
        <StatItem value="4.8" label="Google Rating" />
      </div>
    </section>
  )
}
