const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919895884796";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kl59.in";

interface ProductForWhatsApp {
    name: string;
    selling_price: number;
    mrp: number;
    discount_percent: number;
    slug: string;
}

export function generateWhatsAppURL(
    product?: ProductForWhatsApp,
    selectedSize?: string,
    selectedColor?: string,
    customNumber?: string | null
): string {
    const number = customNumber || WHATSAPP_NUMBER;
    const base = `https://wa.me/${number}`;

    if (!product) {
        return `${base}?text=${encodeURIComponent(
            "Hello KL-59! 👋\n\nI am exploring your exquisite collection on your website and would appreciate more information regarding your products. Could you please assist me?"
        )}`;
    }

    const msg = `Hi KL-59! ✨

I would like to place an order for the following item from your collection:

� *${product.name.toUpperCase()}*
──────────────────
💰 Price: ₹${product.selling_price.toLocaleString("en-IN")}
📏 Size: ${selectedSize || "Default"}
🎨 Color: ${selectedColor || "As shown"}
📦 Availability: Please confirm

Item Details: ${SITE_URL}/product/${product.slug}

Looking forward to your response! 🙏`;

    return `${base}?text=${encodeURIComponent(msg)}`;
}
