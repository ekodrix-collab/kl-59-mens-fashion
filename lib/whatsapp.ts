const WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919895884796";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kl-59mensfashion.in";

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
        ? `Hi KL-59! 👔

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

    return `${base}&text=${encodeWhatsAppMessage(msg)}`;
}

/**
 * Encodes a message for WhatsApp, ensuring emojis and special characters are handled correctly.
 */
export function encodeWhatsAppMessage(msg: string): string {
    return encodeURIComponent(
        new TextDecoder().decode(
            new TextEncoder().encode(msg)
        )
    );
}

/**
 * Generates a WhatsApp URL for an offer.
 */
export function generateOfferWhatsAppURL(offer: any): string {
    const number = WHATSAPP_NUMBER;
    const base = `https://api.whatsapp.com/send?phone=${number}`;

    const buyItemsCount = offer.offer_type === 'bogo' ? (offer.combo_price ? Number(offer.combo_price) : 1) : 0;
    const buyItems = offer.offer_type === 'bogo' ? offer.combo_items?.slice(0, buyItemsCount) || [] : [];
    const freeItems = offer.offer_type === 'bogo' ? offer.combo_items?.slice(buyItemsCount) || [] : [];

    let msg = `Hi KL-59! 👔\n\nI am interested in this offer:\n\n`;

    if (offer.offer_type === 'combo') {
        msg += `🎁 *COMBO: ${offer.title.toUpperCase()}*\n`;
        msg += `💰 Price: Rs. ${(offer.combo_price || 0).toLocaleString("en-IN")}\n`;
        msg += `📦 Includes: ${offer.combo_items?.map((i: any) => `${i.product?.name} (x${i.quantity})`).join(', ')}\n`;
    } else if (offer.offer_type === 'bogo') {
        msg += `🔥 *BOGO: ${offer.title.toUpperCase()}*\n`;
        const buyItemsText = buyItems.map((i: any) => `${i.product?.name}${i.quantity > 1 ? ` (x${i.quantity})` : ''}`).join(', ') || 'Item';
        const freeItemsText = freeItems.map((i: any) => `${i.product?.name}${i.quantity > 1 ? ` (x${i.quantity})` : ''}`).join(', ') || 'Free Item';
        msg += `🛒 Buy: ${buyItemsText}\n`;
        msg += `🎁 Get Free: ${freeItemsText}\n`;
    } else {
        msg += `🏷️ *OFFER: ${offer.title.toUpperCase()}*\n`;
        msg += `👕 Product: ${offer.product?.name}\n`;
        msg += `💰 Offer Price: Rs. ${(offer.product?.selling_price || 0).toLocaleString("en-IN")}\n`;
    }

    msg += `\n🔗 View on site: ${SITE_URL}/offers/${offer.id}\n\nIs it available? 🙏`;

    return `${base}&text=${encodeWhatsAppMessage(msg)}`;
}

/**
 * Generates a WhatsApp URL for a combo.
 */
export function generateComboWhatsAppURL(offer: any): string {
    const number = WHATSAPP_NUMBER;
    const base = `https://api.whatsapp.com/send?phone=${number}`;

    const totalOriginalPrice = offer.combo_items?.reduce((sum: number, item: any) => sum + ((item.product?.selling_price || 0) * item.quantity), 0) || 0;
    const finalComboPrice = offer.combo_price || totalOriginalPrice;
    const itemsList = offer.combo_items?.map((i: any) => `${i.product?.name} (x${i.quantity})`).join(', ') || '';
    const savings = totalOriginalPrice > finalComboPrice ? `\n🏷️ You Save: Rs. ${(totalOriginalPrice - finalComboPrice).toLocaleString("en-IN")}` : '';

    const msg = `Hi KL-59! 👔

I would like to order this combo from your collection:

🎁 *COMBO: ${offer.title.toUpperCase()}*
------------------
💰 Combo Price: Rs. ${finalComboPrice.toLocaleString("en-IN")}${savings}
📦 Includes: ${itemsList}
------------------

🔗 ${SITE_URL}/offers/${offer.id}

Looking forward to your response! 🙏`;

    return `${base}&text=${encodeWhatsAppMessage(msg)}`;
}