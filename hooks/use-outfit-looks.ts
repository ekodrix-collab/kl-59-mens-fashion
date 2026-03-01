'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { OutfitLook } from '@/types'

const supabase = createClient()

export function useOutfitLooks() {
    const queryClient = useQueryClient()

    const outfitLooksQuery = useQuery({
        queryKey: ['outfit-looks'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('outfit_looks')
                .select('*, product:products(*)')
                .order('display_order', { ascending: true })

            if (error) throw error
            return data as OutfitLook[]
        },
    })

    const createLook = useMutation({
        mutationFn: async (newLook: Omit<OutfitLook, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('outfit_looks')
                .insert(newLook)
                .select()
                .single()

            if (error) throw error
            return data as OutfitLook
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['outfit-looks'] })
        },
    })

    const updateLook = useMutation({
        mutationFn: async (look: Partial<OutfitLook> & { id: string }) => {
            const { data, error } = await supabase
                .from('outfit_looks')
                .update(look)
                .eq('id', look.id)
                .select()
                .single()

            if (error) throw error
            return data as OutfitLook
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['outfit-looks'] })
        },
    })

    const deleteLook = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('outfit_looks').delete().eq('id', id)
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['outfit-looks'] })
        },
    })

    return {
        outfitLooksQuery,
        createLook,
        updateLook,
        deleteLook,
    }
}
