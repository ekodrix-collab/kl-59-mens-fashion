'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntroSeen } from '@/hooks/use-intro-seen'

export default function PreIntro() {
  const { seen, markSeen } = useIntroSeen()
  const [show, setShow] = useState(false)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!seen) {
      setShow(true)
      const timer1 = setTimeout(() => setPhase(1), 300)
      const timer2 = setTimeout(() => setPhase(2), 700)
      const timer3 = setTimeout(() => setPhase(3), 1000)
      const timer4 = setTimeout(() => setPhase(4), 1400)
      const timer5 = setTimeout(() => {
        markSeen()
        setShow(false)
      }, 2000)
      return () => {
        clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3);
        clearTimeout(timer4); clearTimeout(timer5);
      }
    } else {
      setShow(false)
    }
  }, [seen, markSeen])

  const skip = useCallback(() => {
    markSeen()
    setShow(false)
  }, [markSeen])

  useEffect(() => {
    if (!show) return
    const handler = () => skip()
    window.addEventListener('click', handler)
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('click', handler)
      window.removeEventListener('keydown', handler)
    }
  }, [show, skip])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Split panels for reveal */}
          {phase >= 4 && (
            <>
              <motion.div
                className="absolute inset-0 bg-brand-black z-10"
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '50%', left: 0 }}
              />
              <motion.div
                className="absolute inset-0 bg-brand-black z-10"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '50%', right: 0, left: '50%' }}
              />
            </>
          )}

          {/* Logo */}
          <div className="flex flex-col items-center gap-1 relative z-20">
            <div className="flex items-center gap-2">
              {/* KL */}
              <motion.span
                className="font-montserrat font-black text-5xl md:text-5xl text-white"
                initial={{ opacity: 0, x: -60 }}
                animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                KL
              </motion.span>

              {/* Gold Dash */}
              <motion.span
                className="h-[2px] bg-accent"
                initial={{ scaleX: 0, width: 40 }}
                animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: 'center' }}
              />

              {/* 59 */}
              <motion.span
                className="font-montserrat font-black text-5xl md:text-5xl text-white"
                initial={{ opacity: 0, x: 60 }}
                animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                59
              </motion.span>
            </div>

            {/* Subtitle */}
            <motion.div
              className="flex overflow-hidden"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
            >
              {"MEN'S FASHION".split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="font-montserrat font-normal text-sm md:text-sm tracking-[0.3em] uppercase text-text-subtle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
