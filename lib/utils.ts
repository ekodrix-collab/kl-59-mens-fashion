import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(price)
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str
    return str.slice(0, length) + '...'
}

export function generateWhatsAppLink(product: any): string {
    const phoneNumber = "919876543210"; // Placeholder, can be changed later
    const message = `Hi, I am interested in buying: ${product.name} (Code: ${product.slug}).\nPrice: ${formatPrice(product.selling_price)}\nIs it available?`;

    // Encode the message to be URL safe
    const encodedMessage = encodeURIComponent(message);

    // Return the WhatsApp URL
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
