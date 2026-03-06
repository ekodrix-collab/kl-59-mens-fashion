'use client'

import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, GripVertical, Loader2, Image as ImageIcon, X, Check, LayoutTemplate } from 'lucide-react'
import { useCategories } from '@/hooks/use-categories'
import { slugify } from '@/lib/utils'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { ImageCropModal } from '@/components/ui/image-crop-modal'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { toast } from 'react-hot-toast'

type UploadTarget = 'image' | 'banner_image'

export default function AdminCategoriesPage() {
  const { categoriesQuery, createCategory, updateCategory, deleteCategory } = useCategories()
  const { data: categories, isLoading } = categoriesQuery

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    banner_image: '',
  })

  // Uploading state per target
  const [uploadingTarget, setUploadingTarget] = useState<UploadTarget | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Crop modal state
  const [cropFile, setCropFile] = useState<File | null>(null)
  const [cropTarget, setCropTarget] = useState<UploadTarget | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  // ── CRUD ─────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!formData.name.trim()) return
    try {
      await createCategory.mutateAsync({
        name: formData.name,
        slug: slugify(formData.name),
        image: formData.image,
        banner_image: formData.banner_image,
        display_order: categories ? categories.length : 0,
      })
      toast.success('Category created successfully')
      resetForm()
      setIsAdding(false)
    } catch (error) {
      console.error('Failed to create category:', error)
      toast.error('Failed to create category. Please try again.')
    }
  }

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) return
    try {
      await updateCategory.mutateAsync({
        id,
        name: formData.name,
        slug: slugify(formData.name),
        image: formData.image,
        banner_image: formData.banner_image,
      })
      toast.success('Category updated successfully')
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error('Failed to update category:', error)
      toast.error('Failed to update category. Please try again.')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteCategory.mutateAsync(deleteId)
      toast.success('Category deleted successfully')
      setDeleteId(null)
    } catch (error) {
      console.error('Failed to delete category:', error)
      toast.error('Failed to delete category. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', image: '', banner_image: '' })
  }

  const startEdit = (cat: any) => {
    setEditingId(cat.id)
    setFormData({
      name: cat.name,
      image: cat.image || '',
      banner_image: cat.banner_image || '',
    })
  }

  // ── IMAGE UPLOAD WITH CROP ────────────────────────────────────
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, target: UploadTarget) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Reset input so re-selecting same file triggers onChange
    e.target.value = ''
    setCropFile(file)
    setCropTarget(target)
  }

  const handleCropApplied = async (croppedFile: File) => {
    const target = cropTarget!
    setCropFile(null)
    setCropTarget(null)
    setUploadingTarget(target)
    try {
      const url = await uploadToCloudinary(croppedFile)
      setFormData(prev => ({ ...prev, [target]: url }))
      toast.success(target === 'image' ? 'Category image uploaded' : 'Banner image uploaded')
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Image upload failed. Please check your settings.')
    } finally {
      setUploadingTarget(null)
    }
  }

  const handleCropCancelled = () => {
    setCropFile(null)
    setCropTarget(null)
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

          {/* Name field */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2 font-medium font-sans">Category Name</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/40 border border-white/10 px-5 py-3 text-sm font-sans text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. Denim"
            />
          </div>

          {/* Two image upload zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Category Image (square) */}
            <div className="space-y-3">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-0.5 font-medium font-sans">Category Image</label>
                <p className="text-[8px] uppercase tracking-[0.15em] text-white/20 font-sans">Used on landing page cards · Square</p>
              </div>
              <div
                onClick={() => imageInputRef.current?.click()}
                className="aspect-square bg-black/40 border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-colors group overflow-hidden relative"
              >
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white">Change Image</span>
                    </div>
                  </>
                ) : (
                  <>
                    {uploadingTarget === 'image' ? (
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
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, 'image')}
              />
            </div>

            {/* Banner Image (wide) */}
            <div className="space-y-3">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-0.5 font-medium font-sans">Banner Image</label>
                <p className="text-[8px] uppercase tracking-[0.15em] text-white/20 font-sans">Used as collection page header · Wide</p>
              </div>
              <div
                onClick={() => bannerInputRef.current?.click()}
                className="aspect-video bg-black/40 border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-colors group overflow-hidden relative"
              >
                {formData.banner_image ? (
                  <>
                    <img src={formData.banner_image} alt="Banner Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white">Change Banner</span>
                    </div>
                  </>
                ) : (
                  <>
                    {uploadingTarget === 'banner_image' ? (
                      <Loader2 className="animate-spin text-gold" size={24} />
                    ) : (
                      <LayoutTemplate className="text-white/20 group-hover:text-gold transition-colors mb-2" size={24} strokeWidth={1.5} />
                    )}
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Click to upload</span>
                  </>
                )}
              </div>
              <input
                type="file"
                ref={bannerInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, 'banner_image')}
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
              disabled={!!uploadingTarget || createCategory.isPending || updateCategory.isPending}
              className="px-8 py-3 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500 flex items-center gap-2"
            >
              {(createCategory.isPending || updateCategory.isPending) && <Loader2 className="animate-spin" size={14} />}
              {editingId ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-rich-black/50 backdrop-blur-sm border border-white/5 divide-y divide-white/5">
        {categories?.map((cat) => (
          <div key={cat.id} className="flex items-center gap-6 px-8 py-6 hover:bg-white/5 transition-colors group">
            <GripVertical size={16} strokeWidth={1.5} className="text-white/20 cursor-grab hover:text-white transition-colors" />

            {/* Category card image thumbnail */}
            <div className="w-12 h-12 bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={14} className="text-white/10" />
                </div>
              )}
            </div>

            {/* Banner thumbnail (smaller, pill indicator) */}
            <div className="w-20 h-12 bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden hidden sm:block" title="Banner image">
              {cat.banner_image ? (
                <img src={cat.banner_image} alt={`${cat.name} banner`} className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <LayoutTemplate size={14} className="text-white/10" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-sans text-sm text-white group-hover:text-gold transition-colors truncate">{cat.name}</h4>
              <p className="text-[10px] text-white/30 font-sans uppercase tracking-[0.1em] truncate mt-0.5">{cat.slug}</p>
            </div>

            {/* Image status indicators */}
            <div className="hidden md:flex items-center gap-3 text-[8px] uppercase tracking-[0.15em] font-sans">
              <span className={`px-2 py-1 border ${cat.image ? 'border-gold/30 text-gold/60' : 'border-white/10 text-white/20'}`}>
                Card {cat.image ? '✓' : '—'}
              </span>
              <span className={`px-2 py-1 border ${cat.banner_image ? 'border-gold/30 text-gold/60' : 'border-white/10 text-white/20'}`}>
                Banner {cat.banner_image ? '✓' : '—'}
              </span>
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

      {/* Image Crop Modal */}
      <ImageCropModal
        file={cropFile}
        aspectRatio={cropTarget === 'image' ? 2 / 3 : undefined}
        label={cropTarget === 'image' ? 'Crop Category Image' : 'Crop Banner Image'}
        onCrop={handleCropApplied}
        onCancel={handleCropCancelled}
      />
    </div>
  )
}
