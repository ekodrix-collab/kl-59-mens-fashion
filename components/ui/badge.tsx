import { cn } from '@/lib/utils'

interface BadgeProps {
  variant: 'new' | 'discount' | 'featured'
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  new: 'bg-accent text-brand-black',
  discount: 'bg-discount-bg text-discount-text',
  featured: 'bg-brand-black text-text-light',
}

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full font-montserrat font-semibold text-[10px] uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
