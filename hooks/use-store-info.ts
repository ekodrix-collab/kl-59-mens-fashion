'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { StoreInfo } from '@/types'

const supabase = createClient()

export function useStoreInfo() {
    const queryClient = useQueryClient()

    const storeInfoQuery = useQuery({
        queryKey: ['store-info'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('store_info')
                .select('*')
                .single()

            if (error) throw error
            return data as StoreInfo
        },
    })

    const updateStoreInfo = useMutation({
        mutationFn: async (updatedInfo: Partial<StoreInfo> & { id: string }) => {
            const { data, error } = await supabase
                .from('store_info')
                .update(updatedInfo)
                .eq('id', updatedInfo.id)
                .select()
                .single()

            if (error) throw error
            return data as StoreInfo
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['store-info'] })
        },
    })

    return {
        storeInfoQuery,
        updateStoreInfo,
    }
}
