'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Hide cursor on admin routes or touch devices
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    if (isTouchDevice || isAdmin) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if we are hovering over an interactive element or image
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'img' ||
        target.tagName.toLowerCase() === 'video' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible, isTouchDevice, isAdmin])

  if (isTouchDevice || isAdmin || !isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: position.x - (isHovering ? 24 : 8),
        y: position.y - (isHovering ? 24 : 8),
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 700,
        damping: 40,
        mass: 0.1,
      }}
    >
      <div 
        className={`rounded-full border transition-all duration-300 ${
          isHovering 
            ? 'w-12 h-12 border-white/50 bg-white/10 backdrop-blur-sm' 
            : 'w-4 h-4 border-white bg-white'
        }`}
      />
    </motion.div>
  )
}
