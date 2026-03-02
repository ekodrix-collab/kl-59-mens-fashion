'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Offer, ComboItem } from '@/types'

const supabase = createClient()

export function useOffers(type?: string) {
    const queryClient = useQueryClient()

    const offersQuery = useQuery({
        queryKey: ['offers', type],
        queryFn: async () => {
            let query = supabase
                .from('offers')
                .select(`
          *,
          product:products!product_id (*),
          combo_items (*, product:products!product_id (*))
        `)
                .order('created_at', { ascending: false })

            if (type) {
                query = query.eq('offer_type', type)
            }

            const { data, error } = await query

            if (error) throw error
            return data as Offer[]
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    })

    const getOfferById = (id: string | null) => useQuery({
        queryKey: ['offer', id],
        queryFn: async () => {
            if (!id) return null
            const { data, error } = await supabase
                .from('offers')
                .select(`
          *,
          product:products!product_id (*),
          combo_items (*, product:products!product_id (*))
        `)
                .eq('id', id)
                .single()

            if (error) throw error
            return data as Offer
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })

    const createOffer = useMutation({
        mutationFn: async (newOffer: any) => {
            const { combo_items, ...offerData } = newOffer

            // 1. Insert offer
            const { data: offer, error: oError } = await supabase
                .from('offers')
                .insert(offerData)
                .select()
                .single()

            if (oError) throw oError

            // 2. Insert bundle items if applicable (for combo and bogo)
            if ((offerData.offer_type === 'combo' || offerData.offer_type === 'bogo') && combo_items && combo_items.length > 0) {
                const items = combo_items.map((item: any, idx: number) => ({
                    offer_id: offer.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    display_order: idx
                }))
                const { error: comboError } = await supabase.from('combo_items').insert(items)
                if (comboError) throw comboError
            }

            return offer as Offer
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] })
        },
    })

    const updateOffer = useMutation({
        mutationFn: async (updatedOffer: any & { id: string }) => {
            const { id, combo_items, ...offerData } = updatedOffer

            // 1. Update basic fields
            const { data, error } = await supabase
                .from('offers')
                .update(offerData)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error

            // 2. Update combo items if provided
            if ((offerData.offer_type === 'combo' || offerData.offer_type === 'bogo') && combo_items) {
                // Delete old items
                await supabase.from('combo_items').delete().eq('offer_id', id)

                // Insert new ones
                if (combo_items.length > 0) {
                    const items = combo_items.map((item: any, idx: number) => ({
                        offer_id: id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        display_order: idx
                    }))
                    const { error: comboError } = await supabase.from('combo_items').insert(items)
                    if (comboError) throw comboError
                }
            }

            return data as Offer
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['offers'] })
            queryClient.invalidateQueries({ queryKey: ['offer', data.id] })
        },
    })

    const deleteOffer = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('offers').delete().eq('id', id)
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] })
        },
    })

    return {
        offersQuery,
        getOfferById,
        createOffer,
        updateOffer,
        deleteOffer
    }
}
