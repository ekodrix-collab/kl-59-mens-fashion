export const SITE = {
    name: 'KL-59',
    tagline: "Men's Fashion",
    fullName: "KL-59 Men's Fashion",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kl59.in',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919895884796',
}

export const NAV_LINKS = [
    { label: 'Catalogue', href: '/shop' },
    { label: 'Editorial', href: '/offers' },
    { label: 'Heritage', href: '/about' },
    { label: 'Concierge', href: '/contact' },
]

export const ADMIN_NAV_LINKS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Products', href: '/admin/products', icon: 'Package' },
    { label: 'Offers', href: '/admin/offers', icon: 'Tag' },
    { label: 'Categories', href: '/admin/categories', icon: 'Grid3X3' },
    { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
]

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

export const PLACEHOLDER_PRODUCTS = [
    {
        id: '1', name: 'Raw Selvage Denim', slug: 'raw-selvage-denim',
        description: 'Heavyweight Japanese denim with a deep indigo wash. Designed to age with character, featuring reinforced stitching and onyx hardware.',
        category_id: '1', mrp: 4999, selling_price: 2499, discount_percent: 50,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Deep Indigo', 'Midnight Black'],
        color_images: {}, images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=90&w=1200'], is_featured: true,
        is_new_arrival: true, is_on_offer: true, is_published: true,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '2', name: 'Oxford Tailored Shirt', slug: 'oxford-tailored-shirt',
        description: 'The definitive white shirt. Breathable Egyptian cotton with a sharp, minimalist collar. A cornerstone of the modern wardrobe.',
        category_id: '2', mrp: 3499, selling_price: 1899, discount_percent: 45,
        sizes: ['M', 'L', 'XL'], colors: ['Pure White', 'Sky Dusk', 'Slate'],
        color_images: {}, images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=90&w=1200'], is_featured: true,
        is_new_arrival: false, is_on_offer: true, is_published: true,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '3', name: 'Pima Cotton Essential', slug: 'pima-cotton-essential',
        description: 'Ultra-soft pima cotton with a structured fit. Minimalist silhouette that maintains its form throughout the day.',
        category_id: '3', mrp: 1499, selling_price: 899, discount_percent: 40,
        sizes: ['S', 'M', 'L', 'XL'], colors: ['Obsidian', 'Bone', 'Desert'],
        color_images: {}, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=90&w=1200'], is_featured: true,
        is_new_arrival: true, is_on_offer: false, is_published: true,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '4', name: 'Architectural Formal Trousers', slug: 'architectural-formal-trousers',
        description: 'Structured tailoring with a focus on silhouette. Italian-sourced wool blend with hidden seam details.',
        category_id: '5', mrp: 5499, selling_price: 2999, discount_percent: 45,
        sizes: ['M', 'L', 'XL', 'XXL'], colors: ['Charcoal', 'Midnight', 'Stone'],
        color_images: {}, images: ['https://images.unsplash.com/photo-1594932224010-3a13df2c62e5?auto=format&fit=crop&q=90&w=1200'], is_featured: true,
        is_new_arrival: false, is_on_offer: false, is_published: true,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '5', name: 'Linen Vacation Series', slug: 'linen-vacation-series',
        description: 'Relaxed linen construction for high-summer. Airy, textured, and effortlessly sophisticated.',
        category_id: '4', mrp: 2999, selling_price: 1599, discount_percent: 46,
        sizes: ['S', 'M', 'L', 'XL'], colors: ['Sand', 'White', 'Sage'],
        color_images: {}, images: ['https://images.unsplash.com/photo-1516822246374-6e19117609ff?auto=format&fit=crop&q=90&w=1200'], is_featured: false,
        is_new_arrival: true, is_on_offer: true, is_published: true,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '6', name: 'Heritage Worker Jacket', slug: 'heritage-worker-jacket',
        description: 'A tribute to utility. Heavyweight canvas with architectural pocketing and a vintage-wash finish.',
        category_id: '1', mrp: 6499, selling_price: 3499, discount_percent: 46,
        sizes: ['M', 'L', 'XL'], colors: ['Burnt Umber', 'Deep Navy'],
        color_images: {}, images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=90&w=1200'], is_featured: true,
        is_new_arrival: false, is_on_offer: true, is_published: true,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
]

export const PLACEHOLDER_CATEGORIES = [
    { id: '1', name: 'Denim', slug: 'denim', image: null, display_order: 1, created_at: '' },
    { id: '2', name: 'Shirts', slug: 'shirts', image: null, display_order: 2, created_at: '' },
    { id: '3', name: 'Basics', slug: 't-shirts', image: null, display_order: 3, created_at: '' },
    { id: '4', name: 'Casuals', slug: 'casual-wear', image: null, display_order: 4, created_at: '' },
    { id: '5', name: 'Formals', slug: 'formals', image: null, display_order: 5, created_at: '' },
    { id: '6', name: 'Series', slug: 'accessories', image: null, display_order: 6, created_at: '' },
]
