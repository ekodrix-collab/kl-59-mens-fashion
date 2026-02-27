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
