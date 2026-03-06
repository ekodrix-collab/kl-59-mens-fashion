'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import { X, Check, Loader2 } from 'lucide-react'

interface ImageCropModalProps {
    /** Raw File object selected by the user */
    file: File | null
    /** Target aspect ratio (e.g. 1 for square, 16/9 for banner). Undefined = free crop. */
    aspectRatio?: number
    /** Label shown in the modal header */
    label?: string
    onCrop: (croppedFile: File) => void
    onCancel: () => void
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
    return centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
        mediaWidth,
        mediaHeight
    )
}

export function ImageCropModal({ file, aspectRatio, label = 'Crop Image', onCrop, onCancel }: ImageCropModalProps) {
    const [imgSrc, setImgSrc] = useState<string>('')
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [isCropping, setIsCropping] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    // Load selected file into a data URL
    useEffect(() => {
        if (!file) return
        const reader = new FileReader()
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() ?? ''))
        reader.readAsDataURL(file)
        return () => reader.abort()
    }, [file])

    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget
        const initialCrop = aspectRatio
            ? centerAspectCrop(width, height, aspectRatio)
            : { unit: '%' as const, x: 5, y: 5, width: 90, height: 90 }
        setCrop(initialCrop)
    }, [aspectRatio])

    const handleApply = useCallback(async () => {
        if (!imgRef.current || !completedCrop || !file) return
        setIsCropping(true)

        const image = imgRef.current
        const canvas = document.createElement('canvas')
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        canvas.width = Math.round(completedCrop.width * scaleX)
        canvas.height = Math.round(completedCrop.height * scaleY)

        const ctx = canvas.getContext('2d')
        if (!ctx) { setIsCropping(false); return }

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        )

        canvas.toBlob((blob) => {
            setIsCropping(false)
            if (!blob) return
            const ext = file.name.split('.').pop() || 'jpg'
            const croppedFile = new File([blob], `cropped-${Date.now()}.${ext}`, { type: blob.type })
            onCrop(croppedFile)
        }, file.type || 'image/jpeg', 0.95)
    }, [completedCrop, file, onCrop])

    if (!file || !imgSrc) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 w-full max-w-2xl flex flex-col overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-medium">{label}</span>
                    <button onClick={onCancel} className="text-white/30 hover:text-white transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Crop Area */}
                <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-black/40 min-h-0" style={{ maxHeight: '65vh' }}>
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspectRatio}
                        className="max-w-full max-h-full"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Crop preview"
                            onLoad={onImageLoad}
                            className="max-w-full max-h-full object-contain"
                            style={{ maxHeight: '55vh' }}
                        />
                    </ReactCrop>
                </div>

                {/* Hint */}
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-sans text-center py-3 border-t border-white/5">
                    {aspectRatio === (2 / 3) ? 'Portrait crop (2:3) — used for category cards' : aspectRatio ? 'Wide crop — used for banner header' : 'Free crop'}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 border border-white/10 text-white text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        disabled={!completedCrop || isCropping}
                        className="px-6 py-2.5 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isCropping ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        Apply Crop
                    </button>
                </div>
            </div>
        </div>
    )
}
