'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'

interface ImageRevealProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'center'
  duration?: number
  delay?: number
  className?: string
}

const clipPaths: Record<string, { initial: string; animate: string }> = {
  left: { initial: 'inset(0 100% 0 0)', animate: 'inset(0 0% 0 0)' },
  right: { initial: 'inset(0 0 0 100%)', animate: 'inset(0 0 0 0%)' },
  top: { initial: 'inset(100% 0 0 0)', animate: 'inset(0% 0 0 0)' },
  bottom: { initial: 'inset(0 0 100% 0)', animate: 'inset(0 0 0% 0)' },
  center: { initial: 'inset(50% 50% 50% 50%)', animate: 'inset(0% 0% 0% 0%)' },
}

export default function ImageReveal({
  children,
  direction = 'left',
  duration = 0.8,
  delay = 0,
  className = '',
}: ImageRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const clip = clipPaths[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clip.initial }}
      animate={isInView ? { clipPath: clip.animate } : { clipPath: clip.initial }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
