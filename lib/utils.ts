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

/**
 * Optimizes a Cloudinary URL by injecting f_auto and q_auto:best parameters.
 * If the URL is not from Cloudinary, it returns the original URL.
 */
export function optimizeImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (typeof url !== 'string') return '';

    // Check if it's a Cloudinary URL
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
        // Ensure we use best quality and auto format
        let optimized = url;

        // Remove existing optimization params to prevent conflicts
        optimized = optimized.replace(/\/q_auto:[^/]+\//g, '/');
        optimized = optimized.replace(/\/q_auto\//g, '/');
        optimized = optimized.replace(/\/f_auto\//g, '/');

        // Inject new optimization parameters after '/upload/'
        return optimized.replace('/upload/', '/upload/f_auto,q_auto:best/');
    }

    return url;
}

/**
 * Optimizes a Cloudinary Video URL.
 */
export function optimizeVideoUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (typeof url !== 'string') return '';

    if (url.includes('cloudinary.com') && (url.includes('/upload/') || url.includes('/video/'))) {
        // Cloudinary videos often use /video/ or /upload/
        const match = url.match(/\/(upload|video)\//);
        if (match) {
            const type = match[1];
            return url.replace(`/${type}/`, `/${type}/f_auto,q_auto:best/`);
        }
    }

    return url;
}
