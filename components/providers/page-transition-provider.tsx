'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          enter: { duration: 0.4, ease: 'easeOut' },
          exit: { duration: 0.2, ease: 'easeIn' },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
