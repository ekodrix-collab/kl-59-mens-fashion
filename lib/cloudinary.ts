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

/**
 * Extracts the public ID from a Cloudinary URL.
 */
export function extractPublicId(url: string): string | null {
    if (!url || !url.includes('cloudinary.com')) return null

    // Cloudinary URL format: https://res.cloudinary.com/cloud_name/image/upload/v12345678/folder/public_id.jpg
    // We need everything after /upload/ (excluding version and extension)
    const parts = url.split('/upload/')
    if (parts.length !== 2) return null

    // Parts[1] is something like "v12345678/folder/public_id.jpg" or "folder/public_id.jpg"
    let publicIdWithExt = parts[1]

    // Remove version if it exists (starts with 'v' followed by digits)
    if (publicIdWithExt.match(/^v\d+\//)) {
        publicIdWithExt = publicIdWithExt.replace(/^v\d+\//, '')
    }

    // Remove extension
    const lastDotIndex = publicIdWithExt.lastIndexOf('.')
    if (lastDotIndex === -1) return publicIdWithExt
    return publicIdWithExt.substring(0, lastDotIndex)
}

/**
 * Calls the internal API to delete one or more images from Cloudinary.
 */
export async function deleteCloudinaryImages(urls: string | string[], resourceType: 'image' | 'video' = 'image') {
    const urlArray = Array.isArray(urls) ? urls : [urls]
    const publicIds = urlArray
        .map(url => extractPublicId(url))
        .filter((id): id is string => id !== null)

    if (publicIds.length === 0) return

    try {
        await Promise.all(
            publicIds.map(async (publicId) => {
                const response = await fetch('/api/admin/cloudinary-delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ public_id: publicId, resource_type: resourceType }),
                })

                if (!response.ok) {
                    const error = await response.json()
                    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error)
                }
            })
        )
    } catch (error) {
        console.error('Error in deleteCloudinaryImages:', error)
    }
}
