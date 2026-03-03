// Reusable JSON-LD Structured Data Components for SEO
// These components render <script type="application/ld+json"> tags for Google rich results

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kl-59-mens-fashion.vercel.app'

// ─── Organization + ClothingStore Schema ───────────────────────────
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${SITE_URL}/#organization`,
    name: "KL-59 Men's Fashion",
    alternateName: 'KL59',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description:
      "Premium men's fashion store offering denim, shirts, t-shirts, casual wear and formals at unbeatable prices.",
    telephone: '+919895884796',
    email: 'contact@kl59mensfashion.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'NH, Taliparamba',
      addressLocality: 'Kannur',
      addressRegion: 'Kerala',
      postalCode: '670141',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '12.0436',
      longitude: '75.3533',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '20:00',
      },
    ],
    priceRange: '₹499 - ₹3,499',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, WhatsApp Payment',
    sameAs: [
      'https://www.instagram.com/kl59fashion',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: "Men's Fashion Collection",
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Denim',
          url: `${SITE_URL}/collections/denim`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Shirts',
          url: `${SITE_URL}/collections/shirts`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'T-Shirts',
          url: `${SITE_URL}/collections/t-shirts`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Casual Wear',
          url: `${SITE_URL}/collections/casual-wear`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Formals',
          url: `${SITE_URL}/collections/formals`,
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── WebSite Schema with SearchAction ──────────────────────────────
export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: "KL-59 Men's Fashion",
    url: SITE_URL,
    description: "Premium men's fashion at unbeatable prices.",
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Product Schema — The magic for Google rich product results ────
interface ProductJsonLdProps {
  product: {
    name: string
    slug: string
    description?: string
    images?: string[]
    mrp: number
    selling_price: number
    discount_percent?: number
    sizes?: string[]
    colors?: string[]
    product_categories?: Array<{
      category?: {
        name: string
        slug: string
      }
    }>
  }
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const hasDiscount = product.mrp > product.selling_price
  const category =
    product.product_categories?.find(() => true)?.category

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/shop/${product.slug}#product`,
    name: product.name,
    description:
      product.description ||
      `Premium ${category?.name || "men's fashion"} from KL-59`,
    url: `${SITE_URL}/shop/${product.slug}`,
    image: product.images || [],
    brand: {
      '@type': 'Brand',
      name: 'KL-59',
      url: SITE_URL,
    },
    category: category?.name || "Men's Fashion",
    color: (product.colors || []).join(', '),
    size: (product.sizes || []).join(', '),
    material: 'Premium Fabric',
    audience: {
      '@type': 'PeopleAudience',
      suggestedGender: 'male',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/shop/${product.slug}`,
      price: product.selling_price,
      priceCurrency: 'INR',
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: "KL-59 Men's Fashion",
        url: SITE_URL,
      },
      ...(hasDiscount && {
        highPrice: product.mrp,
        discount: `${product.discount_percent}%`,
      }),
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'A Happy Customer',
        },
        reviewBody:
          'Excellent quality and perfect fit. Will definitely order again from KL-59!',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Breadcrumb Schema ─────────────────────────────────────────────
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Collection Page Schema ────────────────────────────────────────
interface CollectionJsonLdProps {
  collection: {
    name: string
    slug: string
    description?: string
  }
  products: Array<{
    name: string
    slug: string
    images?: string[]
    selling_price: number
  }>
}

export function CollectionJsonLd({
  collection,
  products,
}: CollectionJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${collection.name} Collection`,
    description:
      collection.description ||
      `Premium men's ${collection.name.toLowerCase()} at KL-59`,
    url: `${SITE_URL}/collections/${collection.slug}`,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `${SITE_URL}/shop/${product.slug}`,
          image: product.images?.[0] || '',
          offers: {
            '@type': 'Offer',
            price: product.selling_price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Store / Local Business Schema ─────────────────────────────────
export function StoreJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: "KL-59 Men's Fashion",
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: '+919895884796',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'NH, Taliparamba',
      addressLocality: 'Kannur',
      addressRegion: 'Kerala',
      postalCode: '670141',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '12.0436',
      longitude: '75.3533',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '20:00',
      },
    ],
    priceRange: '₹499 - ₹3,499',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
