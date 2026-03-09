'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import { deleteCloudinaryImages } from '@/lib/cloudinary'
import type { Product, ProductCategory } from '@/types'

const supabase = createClient()

export function useProducts(options?: { categorySlug?: string; featured?: boolean }) {
    const queryClient = useQueryClient()

    const productsQuery = useQuery({
        queryKey: ['products', options],
        queryFn: async () => {
            let query = supabase
                .from('products')
                .select(`
          *,
          product_categories (
            *,
            category:categories (*)
          )
        `)
                .order('created_at', { ascending: false })

            if (options?.featured) {
                query = query.eq('is_featured', true)
            }

            if (options?.categorySlug) {
                // This is a bit more complex with junction tables in Supabase
                // We might need to filter by category slug
                const { data: catData } = await supabase
                    .from('categories')
                    .select('id')
                    .eq('slug', options.categorySlug)
                    .single()

                if (catData) {
                    query = query.filter('product_categories.category_id', 'eq', catData.id)
                }
            }

            const { data, error } = await query

            if (error) throw error

            // Post-process to flatten categories for easier use if needed
            return data as Product[]
        },
    })

    const getProductBySlug = (slug: string) => useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          product_categories (
            *,
            category:categories (*)
          )
        `)
                .eq('slug', slug)
                .single()

            if (error) throw error
            return data as Product
        },
        enabled: !!slug
    })

    const getProductById = (id: string) => useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          product_categories (
            *,
            category:categories (*)
          )
        `)
                .eq('id', id)
                .single()

            if (error) throw error
            return data as Product
        },
        enabled: !!id
    })

    const ensureUniqueSlug = async (name: string, currentId?: string) => {
        let slug = slugify(name)
        let uniqueSlug = slug
        let counter = 1

        while (true) {
            const query = supabase
                .from('products')
                .select('id')
                .eq('slug', uniqueSlug)

            if (currentId) {
                query.not('id', 'eq', currentId)
            }

            const { data, error } = await query.maybeSingle()

            if (error) throw error
            if (!data) return uniqueSlug

            uniqueSlug = `${slug}-${counter}`
            counter++
        }
    }

    const createProduct = useMutation({
        mutationFn: async (newProduct: any & { category_ids?: string[], primary_category_id?: string }) => {
            const { category_ids, primary_category_id, ...productData } = newProduct

            // Ensure unique slug
            const uniqueSlug = await ensureUniqueSlug(productData.name)
            productData.slug = uniqueSlug

            // 1. Insert product
            const { data: product, error: pError } = await supabase
                .from('products')
                .insert(productData)
                .select()
                .single()

            if (pError) throw pError

            // 2. Insert junction records if categories provided
            if (category_ids && category_ids.length > 0) {
                const junctions = category_ids.map((catId: string) => ({
                    product_id: product.id,
                    category_id: catId,
                    is_primary: catId === primary_category_id
                }))

                const { error: jError } = await supabase
                    .from('product_categories')
                    .insert(junctions)

                if (jError) throw jError
            }

            return product as Product
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    const updateProduct = useMutation({
        mutationFn: async (updatedProduct: any & { id: string, category_ids?: string[], primary_category_id?: string }) => {
            const { id, category_ids, primary_category_id, ...productData } = updatedProduct

            // Ensure unique slug if name changed or slug is being updated
            if (productData.name) {
                const uniqueSlug = await ensureUniqueSlug(productData.name, id)
                productData.slug = uniqueSlug
            }

            // 0. Handle image deletion if images changed
            if (productData.images) {
                const { data: currentProduct } = await supabase
                    .from('products')
                    .select('images')
                    .eq('id', id)
                    .single()

                if (currentProduct && currentProduct.images) {
                    const removedImages = currentProduct.images.filter(
                        (img: string) => !productData.images.includes(img)
                    )
                    if (removedImages.length > 0) {
                        await deleteCloudinaryImages(removedImages)
                    }
                }
            }

            // 1. Update product
            const { data: product, error: pError } = await supabase
                .from('products')
                .update(productData)
                .eq('id', id)
                .select()
                .single()

            if (pError) throw pError

            // 2. Update junction records (delete and re-insert for simplicity)
            if (category_ids) {
                await supabase.from('product_categories').delete().eq('product_id', id)

                const junctions = category_ids.map((catId: string) => ({
                    product_id: id,
                    category_id: catId,
                    is_primary: catId === primary_category_id
                }))

                const { error: jError } = await supabase
                    .from('product_categories')
                    .insert(junctions)

                if (jError) throw jError
            }

            return product as Product
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', data.id] })
            queryClient.invalidateQueries({ queryKey: ['product', data.slug] })
        },
    })

    const deleteProduct = useMutation({
        mutationFn: async (id: string) => {
            // 0. Get product images before deleting
            const { data: product } = await supabase
                .from('products')
                .select('images')
                .eq('id', id)
                .single()

            if (product && product.images && product.images.length > 0) {
                await deleteCloudinaryImages(product.images)
            }

            const { error } = await supabase.from('products').delete().eq('id', id)
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    return {
        productsQuery,
        getProductBySlug,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    }
}
