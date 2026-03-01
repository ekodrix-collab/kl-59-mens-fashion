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
            "Hi KL-59! 👋\n\nI'm browsing your website and would like to know more about your products."
        )}`;
    }

    const msg = `Hi KL-59! 👋

I'd like to order:

🛍️ *${product.name}*
💰 ₹${product.selling_price.toLocaleString("en-IN")} (MRP ₹${product.mrp.toLocaleString("en-IN")} — ${product.discount_percent}% OFF)
📏 Size: ${selectedSize || "Not selected"}
🎨 Color: ${selectedColor || "Not selected"}

Please confirm availability!

🔗 ${SITE_URL}/product/${product.slug}`;

    return `${base}?text=${encodeURIComponent(msg)}`;
}
