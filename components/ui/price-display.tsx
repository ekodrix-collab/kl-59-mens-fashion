import { formatPrice } from '@/lib/utils'

interface PriceDisplayProps {
  mrp: number
  sellingPrice: number
  discountPercent: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: { mrp: 'text-[13px]', price: 'text-lg', savings: 'text-xs' },
  md: { mrp: 'text-sm', price: 'text-xl', savings: 'text-sm' },
  lg: { mrp: 'text-base', price: 'text-[28px]', savings: 'text-sm' },
}

export default function PriceDisplay({ mrp, sellingPrice, discountPercent, size = 'md' }: PriceDisplayProps) {
  const s = sizeStyles[size]
  const hasDiscount = mrp > sellingPrice

  return (
    <div>
      <div className="flex items-baseline gap-2">
        {hasDiscount && (
          <span className={`font-inter line-through text-text-muted ${s.mrp}`}>
            {formatPrice(mrp)}
          </span>
        )}
        <span className={`font-montserrat font-semibold text-text-primary ${s.price}`}>
          {formatPrice(sellingPrice)}
        </span>
      </div>
      {hasDiscount && (
        <p className={`text-discount-bg font-inter font-medium mt-1 ${s.savings}`}>
          You save {formatPrice(mrp - sellingPrice)} ({discountPercent}% OFF)
        </p>
      )}
    </div>
  )
}
