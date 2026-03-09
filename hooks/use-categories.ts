'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { deleteCloudinaryImages } from '@/lib/cloudinary'
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

            // 0. Handle image deletion if images changed
            const { data: currentCategory } = await supabase
                .from('categories')
                .select('image, banner_image')
                .eq('id', id)
                .single()

            if (currentCategory) {
                if (image && currentCategory.image && image !== currentCategory.image) {
                    await deleteCloudinaryImages(currentCategory.image)
                }
                if (banner_image && currentCategory.banner_image && banner_image !== currentCategory.banner_image) {
                    await deleteCloudinaryImages(currentCategory.banner_image)
                }
            }

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
            // 0. Get images before deleting
            const { data: category } = await supabase
                .from('categories')
                .select('image, banner_image')
                .eq('id', id)
                .single()

            if (category) {
                const imagesToDelete = []
                if (category.image) imagesToDelete.push(category.image)
                if (category.banner_image) imagesToDelete.push(category.banner_image)

                if (imagesToDelete.length > 0) {
                    await deleteCloudinaryImages(imagesToDelete)
                }
            }

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
