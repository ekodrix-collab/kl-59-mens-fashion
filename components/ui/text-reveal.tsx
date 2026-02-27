'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'

interface TextRevealProps {
  text: string
  mode?: 'word' | 'char'
  staggerDelay?: number
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function TextReveal({
  text,
  mode = 'word',
  staggerDelay = 0.05,
  className = '',
  tag = 'p',
}: TextRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.4 })
  const items = mode === 'word' ? text.split(' ') : text.split('')
  const separator = mode === 'word' ? '\u00A0' : ''

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const Tag = tag as keyof JSX.IntrinsicElements

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {items.map((item, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block' }}>
          {item}{separator}
        </motion.span>
      ))}
    </motion.div>
  )
}
