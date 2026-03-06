const WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919895884796";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost'))
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://www.kl-59mensfashion.in";

interface ProductForWhatsApp {
    name: string;
    selling_price: number;
    mrp: number;
    discount_percent: number;
    slug: string;
    images?: string[];
}

export function generateWhatsAppURL(
    product?: ProductForWhatsApp,
    selectedSize?: string,
    selectedColor?: string,
    customNumber?: string | null
): string {

    const number = customNumber || WHATSAPP_NUMBER;
    const base = `https://api.whatsapp.com/send?phone=${number}`;

    const msg = product
        ? `Hi KL-59! ✨

I would like to place an order for the following item from your collection:

👕 *${product.name.toUpperCase()}*
------------------
💰 Price: Rs. ${product.selling_price.toLocaleString("en-IN")}
📏 Size: ${selectedSize || "Default"}
🎨 Color: ${selectedColor || "As shown"}
📦 Availability: Please confirm
------------------

Looking forward to your response! 🙏

🔗 *VIEW PIECE ON SITE*
${SITE_URL}/shop/${product.slug}`
        : `Hello KL-59! 👋

I am exploring your exquisite collection and would like more details. Please assist me.`;

    // ✅ UTF-8 safe but NOT double encoded
    const encodedMessage = encodeURIComponent(
        new TextDecoder().decode(
            new TextEncoder().encode(msg)
        )
    );

    return `${base}&text=${encodedMessage}`;
}