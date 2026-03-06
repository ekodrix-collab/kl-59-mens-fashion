'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Category } from '@/types'

const supabase = createClient()

export function useCategories() {
    const queryClient = useQueryClient()

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            return data as Category[]
        },
    })

    const createCategory = useMutation({
        mutationFn: async (newCategory: Omit<Category, 'id' | 'created_at'>) => {
            const { name, slug, image, banner_image, display_order } = newCategory
            const { data, error } = await supabase
                .from('categories')
                .insert({ name, slug, image, banner_image, display_order })
                .select()
                .single()

            if (error) throw error
            return data as Category
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    const updateCategory = useMutation({
        mutationFn: async (category: Partial<Category> & { id: string }) => {
            const { id, name, slug, image, banner_image, display_order } = category
            const { data, error } = await supabase
                .from('categories')
                .update({ name, slug, image, banner_image, display_order })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data as Category
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    const deleteCategory = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('categories').delete().eq('id', id)
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    return {
        categoriesQuery,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}
