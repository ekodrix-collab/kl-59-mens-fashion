'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '@/hooks/use-media-query'

export default function CustomCursor() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [hoverText, setHoverText] = useState('')
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 })

  useEffect(() => {
    if (!isDesktop) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor="view"]')
      if (interactive) {
        setIsHovering(true)
        const cursorText = interactive.getAttribute('data-cursor') || ''
        setHoverText(cursorText === 'view' ? 'VIEW' : '')
      } else {
        setIsHovering(false)
        setHoverText('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.style.cursor = ''
    }
  }, [isDesktop, cursorX, cursorY])

  if (!isDesktop) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Outer circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference border border-white flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering ? '#C8A97E' : '#ffffff',
        }}
        transition={{ duration: 0.2 }}
      >
        {hoverText && (
          <span className="font-montserrat font-medium text-[10px] uppercase text-white">
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  )
}
