'use client'

import { useState, useCallback } from 'react'

export function useDynamicColor() {
    const [accentColor, setAccentColor] = useState<string>('#C8A97E')

    const extractColor = useCallback((imageUrl: string) => {
        if (!imageUrl || typeof document === 'undefined') return

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
                if (!ctx) return

                canvas.width = 1
                canvas.height = 1
                ctx.drawImage(img, 0, 0, 1, 1)
                const imageData = ctx.getImageData(0, 0, 1, 1)
                const [r, g, b] = Array.from(imageData.data)

                const color = `rgb(${r}, ${g}, ${b})`
                setAccentColor(color)
                document.documentElement.style.setProperty('--accent-dynamic', color)
            } catch (e) {
                console.error('DynColor Error:', e)
            }
        }
        img.src = imageUrl
    }, [])

    const resetColor = useCallback(() => {
        setAccentColor('#C8A97E')
        document.documentElement.style.setProperty('--accent-dynamic', '#C8A97E')
    }, [])

    return { accentColor, extractColor, resetColor }
}
