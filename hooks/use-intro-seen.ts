'use client'

import { useState, useEffect, useCallback } from 'react'

export function useIntroSeen() {
    const [seen, setSeen] = useState(true) // default true to prevent flash

    useEffect(() => {
        const introSeen = localStorage.getItem('intro_seen')
        setSeen(introSeen === 'true')
    }, [])

    const markSeen = useCallback(() => {
        localStorage.setItem('intro_seen', 'true')
        setSeen(true)
    }, [])

    return { seen, markSeen }
}
