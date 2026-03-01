'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, Loader2, Check } from 'lucide-react'
import { SIZES } from '@/lib/constants'
import { slugify } from '@/lib/utils'
import { useCategories } from '@/hooks/use-categories'
import { useProducts } from '@/hooks/use-products'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'

export default function NewProductPage() {
  const router = useRouter()
  const { categoriesQuery } = useCategories()
  const { data: categories } = categoriesQuery
  const { createProduct } = useProducts()

  const [name, setName] = useState('')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [primaryCategoryId, setPrimaryCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [mrp, setMrp] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [colorInput, setColorInput] = useState('')
  const [featured, setFeatured] = useState(false)
  const [newArrival, setNewArrival] = useState(false)
  const [onOffer, setOnOffer] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const discount = mrp && sellingPrice && Number(mrp) > 0
    ? Math.round(((Number(mrp) - Number(sellingPrice)) / Number(mrp)) * 100)
    : 0

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds(prev => {
      const isSelected = prev.includes(id)
      const next = isSelected ? prev.filter(x => x !== id) : [...prev, id]
      if (id === primaryCategoryId && isSelected) setPrimaryCategoryId('')
      if (next.length === 1 && !primaryCategoryId) setPrimaryCategoryId(next[0])
      return next
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file))
      const urls = await Promise.all(uploadPromises)
      setImages(prev => [...prev, ...urls])
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload some images')
    } finally {
      setIsUploading(false)
    }
  }

  const addColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput.trim())) {
      setColors([...colors, colorInput.trim()])
      setColorInput('')
    }
  }

  const handlePublish = async (isPublished: boolean = true) => {
    if (!name || selectedCategoryIds.length === 0 || !mrp || !sellingPrice) {
      alert('Please fill required fields (Name, Category, MRP, Selling Price)')
      return
    }

    try {
      await createProduct.mutateAsync({
        name,
        slug: slugify(name),
        description,
        mrp: Number(mrp),
        selling_price: Number(sellingPrice),
        discount_percent: discount,
        sizes: selectedSizes,
        colors,
        images,
        is_featured: featured,
        is_new_arrival: newArrival,
        is_on_offer: onOffer,
        is_published: isPublished,
        category_ids: selectedCategoryIds,
        primary_category_id: primaryCategoryId || selectedCategoryIds[0]
      })
      router.push('/admin/products')
    } catch (error) {
      console.error('Failed to create product:', error)
      alert('Error creating product. See console.')
    }
  }

  const inputClass = "w-full bg-rich-black/50 backdrop-blur-sm px-6 py-4 border border-white/10 text-sm font-body text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 rounded-none";
  const labelClass = "block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-3";

  return (
    <div className="max-w-4xl pb-20">
      <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight mb-8">Add New Product</h1>

      <div className="space-y-8 bg-rich-black/30 p-8 border border-white/5">
        {/* Name */}
        <div>
          <label className={labelClass}>Product Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="e.g. Classic Slim Fit Denim"
          />
          {name && <p className="text-[10px] font-body text-gold mt-2">Slug: {slugify(name)}</p>}
        </div>

        {/* Multi-Category Selection */}
        <div>
          <label className={labelClass}>Categories * (Select at least one, click star to set primary)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories?.map(c => (
              <div
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                className={`flex items-center justify-between px-4 py-3 border text-[11px] font-sans uppercase tracking-wider transition-all cursor-pointer ${selectedCategoryIds.includes(c.id)
                    ? 'border-gold bg-gold/5 text-gold'
                    : 'border-white/10 text-white/40 hover:border-white/30'
                  }`}
              >
                <span>{c.name}</span>
                {selectedCategoryIds.includes(c.id) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setPrimaryCategoryId(c.id)
                    }}
                    className={`ml-2 p-1 hover:scale-110 transition-transform ${primaryCategoryId === c.id ? 'text-gold fill-gold' : 'text-white/20'}`}
                  >
                    <Check size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={inputClass}
            placeholder="Describe the piece..."
          />
        </div>

        {/* Images */}
        <div>
          <label className={labelClass}>Product Photos</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((url, i) => (
              <div key={i} className="relative w-24 h-32 border border-white/10 overflow-hidden group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-black/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <label className="border border-dashed border-white/20 bg-white/5 p-12 text-center hover:border-gold transition-colors cursor-pointer group flex flex-col items-center">
            {isUploading ? (
              <Loader2 className="animate-spin text-gold mb-4" size={24} />
            ) : (
              <Upload size={24} strokeWidth={1.5} className="mx-auto text-white/30 mb-4 group-hover:text-gold transition-colors" />
            )}
            <p className="text-sm font-sans text-white/70">Click to upload images</p>
            <input type="file" multiple onChange={handleImageUpload} className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>MRP (₹) *</label>
            <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} className={inputClass} placeholder="0.00" />
          </div>
          <div>
            <label className={labelClass}>Selling Price (₹) *</label>
            <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className={inputClass} placeholder="0.00" />
          </div>
        </div>
        {discount > 0 && (
          <span className="inline-block border border-gold/30 text-gold bg-gold/5 text-[10px] uppercase font-sans tracking-[0.2em] px-4 py-1.5">{discount}% OFF</span>
        )}

        {/* Sizes */}
        <div>
          <label className={labelClass}>Available Sizes</label>
          <div className="flex flex-wrap gap-3">
            {SIZES.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-12 h-12 flex items-center justify-center text-[10px] font-sans uppercase tracking-widest border transition-colors duration-300 ${selectedSizes.includes(size) ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/20 hover:border-white hover:text-white'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className={labelClass}>Colors</label>
          <div className="flex gap-2 mb-4 flex-wrap">
            {colors.map(c => (
              <span key={c} className="flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
                {c}
                <button onClick={() => setColors(colors.filter(x => x !== c))} className="text-white/40 hover:text-red-500 transition-colors">
                  <X size={12} strokeWidth={2} />
                </button>
              </span>
            ))}
          </div>
          <input
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
            className={inputClass}
            placeholder="Type color and press Enter"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-8 py-4">
          {[
            { label: 'Featured', value: featured, set: setFeatured },
            { label: 'New Arrival', value: newArrival, set: setNewArrival },
            { label: 'On Offer', value: onOffer, set: setOnOffer },
          ].map(t => (
            <label key={t.label} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${t.value ? 'bg-gold border-gold' : 'border-white/30 group-hover:border-gold'}`}>
                {t.value && <div className="w-2 h-2 bg-black" />}
              </div>
              <input type="checkbox" checked={t.value} onChange={(e) => t.set(e.target.checked)} className="hidden" />
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">{t.label}</span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-8 border-t border-white/10">
          <button
            onClick={() => handlePublish(true)}
            disabled={createProduct.isPending}
            className="px-8 py-4 bg-white text-black font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-500 disabled:opacity-50"
          >
            {createProduct.isPending ? 'Publishing...' : 'Publish Product'}
          </button>
          <button
            onClick={() => handlePublish(false)}
            disabled={createProduct.isPending}
            className="px-8 py-4 border border-white/20 text-white font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:border-white transition-colors duration-500 disabled:opacity-50"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  )
}
