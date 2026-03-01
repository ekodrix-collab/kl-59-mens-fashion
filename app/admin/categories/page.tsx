'use client'

import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, GripVertical, Loader2, Image as ImageIcon, X, Check } from 'lucide-react'
import { useCategories } from '@/hooks/use-categories'
import { slugify } from '@/lib/utils'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'
import { LoadingScreen } from '@/components/ui/loading-screen'

export default function AdminCategoriesPage() {
  const { categoriesQuery, createCategory, updateCategory, deleteCategory } = useCategories()
  const { data: categories, isLoading } = categoriesQuery

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    image: ''
  })

  const [isUploading, setIsUploading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCreate = async () => {
    if (!formData.name.trim()) return
    try {
      await createCategory.mutateAsync({
        name: formData.name,
        slug: slugify(formData.name),
        image: formData.image,
        display_order: categories ? categories.length : 0
      })
      resetForm()
      setIsAdding(false)
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) return
    try {
      await updateCategory.mutateAsync({
        id,
        name: formData.name,
        slug: slugify(formData.name),
        image: formData.image
      })
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Failed to update category:', error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteCategory.mutateAsync(deleteId)
      setDeleteId(null)
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      setFormData(prev => ({ ...prev, image: url }))
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Image upload failed. Please check your Cloudinary settings.')
    } finally {
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', image: '' })
  }

  const startEdit = (cat: any) => {
    setEditingId(cat.id)
    setFormData({
      name: cat.name,
      image: cat.image || ''
    })
  }

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Categories</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Manage product categories</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => { resetForm(); setIsAdding(true); setEditingId(null); }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500"
          >
            <Plus size={14} strokeWidth={2} /> Add Category
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-rich-black/50 backdrop-blur-sm border border-gold/20 p-8 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-medium">
              {editingId ? 'Edit Category' : 'New Category'}
            </h3>
            <button onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }} className="text-white/20 hover:text-white">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2 font-medium font-sans">Category Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 px-5 py-3 text-sm font-sans text-white focus:outline-none focus:border-gold transition-colors"
                  placeholder="e.g. Denim"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2 font-medium font-sans">Category Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video bg-black/40 border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-colors group overflow-hidden relative"
              >
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white">Change Image</span>
                    </div>
                  </>
                ) : (
                  <>
                    {isUploading ? (
                      <Loader2 className="animate-spin text-gold" size={24} />
                    ) : (
                      <ImageIcon className="text-white/20 group-hover:text-gold transition-colors mb-2" size={24} strokeWidth={1.5} />
                    )}
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Click to upload</span>
                  </>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }}
              className="px-8 py-3 border border-white/10 text-white text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
              disabled={isUploading || createCategory.isPending || updateCategory.isPending}
              className="px-8 py-3 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500 flex items-center gap-2"
            >
              {(createCategory.isPending || updateCategory.isPending) && <Loader2 className="animate-spin" size={14} />}
              {editingId ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-rich-black/50 backdrop-blur-sm border border-white/5 divide-y divide-white/5">
        {categories?.map((cat, i) => (
          <div key={cat.id} className="flex items-center gap-6 px-8 py-6 hover:bg-white/5 transition-colors group">
            <GripVertical size={16} strokeWidth={1.5} className="text-white/20 cursor-grab hover:text-white transition-colors" />

            <div className="w-12 h-12 bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={14} className="text-white/10" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-sans text-sm text-white group-hover:text-gold transition-colors truncate">{cat.name}</h4>
              <p className="text-[10px] text-white/30 font-sans uppercase tracking-[0.1em] truncate mt-0.5">{cat.slug}</p>
            </div>

            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEdit(cat)}
                className="text-white/40 hover:text-gold transition-colors"
              >
                <Pencil size={16} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setDeleteId(cat.id)}
                className="text-white/40 hover:text-red-500 transition-colors"
                disabled={deleteCategory.isPending}
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}

        {categories?.length === 0 && (
          <div className="px-8 py-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-white/20">No categories found.</p>
          </div>
        )}
      </div>

      <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-sans mt-4">Drag to reorder. Order appears in store navigation.</p>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This will not delete the products in it, but they will lose this association."
        confirmText="Delete"
        isLoading={deleteCategory.isPending}
      />
    </div>
  )
}
