// ============================================================
// KL-59 Men's Fashion — TypeScript Types
// ============================================================

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    display_order: number;
    created_at: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    mrp: number;
    selling_price: number;
    discount_percent: number;
    sizes: string[];
    colors: string[];
    color_images: Record<string, string>;
    images: string[];
    is_featured: boolean;
    is_new_arrival: boolean;
    is_on_offer: boolean;
    is_published: boolean;
    created_at: string;
    updated_at: string;

    // Virtual fields for joined data
    product_categories?: ProductCategory[];
    categories?: Category[];
}

export interface ProductCategory {
    product_id: string;
    category_id: string;
    is_primary: boolean;
    category?: Category;
}

export type OfferType = 'product_offer' | 'combo';
export type DiscountType = 'percentage' | 'flat';

export interface Offer {
    id: string;
    offer_type: OfferType;
    title: string;
    description: string | null;
    banner_image: string | null;
    discount_type: DiscountType;
    discount_value: number | null;
    combo_price: number | null;
    product_id: string | null;
    start_date: string | null;
    end_date: string | null;
    is_active: boolean;
    created_at: string;

    // Joined data
    product?: Product;
    combo_items?: ComboItem[];
}

export interface ComboItem {
    id: string;
    offer_id: string;
    product_id: string;
    quantity: number;
    display_order: number;
    product?: Product;
}


export interface StoreInfo {
    id: string;
    store_name: string;
    tagline: string;
    hero_tagline: string;
    hero_subtitle: string;
    about_text: string | null;
    about_quote: string;
    address: string | null;
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    working_hours: string | null;
    instagram: string | null;
    google_maps_url: string | null;
    google_maps_embed: string | null;
    logo: string | null;
    hero_image: string | null;
    hero_video: string | null;
    stats_customers: string;
    stats_brands: string;
    stats_rating: string;
}

export interface OutfitLook {
    id: string;
    title: string;
    description: string | null;
    product_id: string | null;
    product?: Product;
    model_image: string;
    thumbnail: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
}
