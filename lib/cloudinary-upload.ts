export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // You might need to change this if you have a custom preset
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!)

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    )

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Upload failed')
    }

    const data = await response.json()
    return data.secure_url
}
