const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

export function getOptimizedUrl(
    url: string,
    width: number,
    height: number
): string {
    if (!cloudName || !url) return url || '/images/placeholder.jpg'

    // If already a Cloudinary URL, modify the transformations
    if (url.includes('res.cloudinary.com')) {
        const parts = url.split('/upload/')
        if (parts.length === 2) {
            return `${parts[0]}/upload/w_${width},h_${height},c_fill,f_auto,q_auto/${parts[1]}`
        }
    }

    return url
}

export function cloudinaryLoader({
    src,
    width,
    quality,
}: {
    src: string
    width: number
    quality?: number
}): string {
    if (!cloudName) return src
    const q = quality || 'auto'
    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${q},w_${width}/${src}`
}

// ─── SEO-Optimized Image Helpers ───────────────────────────────────

/**
 * Optimize a Cloudinary URL with auto-format, auto-quality, and specified width.
 * Serves WebP/AVIF depending on browser support = faster loading = better SEO.
 */
export function optimizeImage(url: string, width: number = 800): string {
    if (!url || !url.includes('cloudinary.com')) return url

    // Insert transformations before /upload/ path
    return url.replace(
        '/upload/',
        `/upload/f_auto,q_auto,w_${width},c_fill,g_auto/`
    )
}

/**
 * Generate multiple optimized sizes for responsive images.
 * Use with Next.js Image `sizes` prop for optimal loading.
 */
export function optimizeImageSizes(url: string) {
    return {
        thumbnail: optimizeImage(url, 400),
        medium: optimizeImage(url, 800),
        large: optimizeImage(url, 1200),
        full: optimizeImage(url, 1920),
    }
}
