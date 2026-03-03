import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 font-body text-[13px] text-[#555555]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-[#333333]">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#C8A97E] transition-colors duration-300"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#888888]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
