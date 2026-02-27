import ScrollReveal from './scroll-reveal'

interface SectionHeadingProps {
  label: string
  title: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeading({ label, title, centered = true, light = false, className = '' }: SectionHeadingProps) {
  return (
    <ScrollReveal className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      <p className={`font-montserrat font-semibold text-[13px] uppercase tracking-[0.2em] mb-3 ${light ? 'text-accent' : 'text-accent'}`}>
        {label}
      </p>
      <h2 className={`font-montserrat font-bold text-4xl md:text-[36px] ${light ? 'text-text-light' : 'text-text-primary'}`}>
        {title}
      </h2>
    </ScrollReveal>
  )
}
