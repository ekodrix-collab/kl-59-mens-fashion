'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  className?: string
}

const directionMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 30,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const dir = directionMap[direction]
  const scale = distance / 30

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dir.x * scale, y: dir.y * scale }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dir.x * scale, y: dir.y * scale }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
