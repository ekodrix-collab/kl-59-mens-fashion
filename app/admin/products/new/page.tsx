'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X } from 'lucide-react'
import { PLACEHOLDER_CATEGORIES, SIZES } from '@/lib/constants'
import { slugify } from '@/lib/utils'

export default function NewProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [mrp, setMrp] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [colorInput, setColorInput] = useState('')
  const [featured, setFeatured] = useState(false)
  const [newArrival, setNewArrival] = useState(false)
  const [onOffer, setOnOffer] = useState(false)

  const discount = mrp && sellingPrice && Number(mrp) > 0
    ? Math.round(((Number(mrp) - Number(sellingPrice)) / Number(mrp)) * 100)
    : 0

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  const addColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput.trim())) {
      setColors([...colors, colorInput.trim()])
      setColorInput('')
    }
  }

  // Premium input class
  const inputClass = "w-full bg-rich-black/50 backdrop-blur-sm px-6 py-4 border border-white/10 text-sm font-body text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 rounded-none";
  const labelClass = "block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-3";

  return (
    <div className="max-w-4xl">
      <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight mb-8">Add New Product</h1>

      <div className="space-y-8 bg-rich-black/30 p-8 border border-white/5">
        {/* Name */}
        <div>
          <label className={labelClass}>Product Designation *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="e.g. Classic Slim Fit Denim"
          />
          {name && <p className="text-[10px] font-body text-gold mt-2">Slug: {slugify(name)}</p>}
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>Collection *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-rich-black text-white/50">Select collection</option>
            {PLACEHOLDER_CATEGORIES.map(c => (
              <option key={c.id} value={c.id} className="bg-rich-black text-white">{c.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Editorial Description</label>
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
          <label className={labelClass}>Visual Assets</label>
          <div className="border border-dashed border-white/20 bg-white/5 p-12 text-center hover:border-gold transition-colors cursor-pointer group">
            <Upload size={24} strokeWidth={1.5} className="mx-auto text-white/30 mb-4 group-hover:text-gold transition-colors" />
            <p className="text-sm font-sans text-white/70">Click or drag high-res images to upload</p>
            <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-white/40 mt-2">Max 5MB per image • JPEG, PNG, WebP</p>
          </div>
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
                className={`w-12 h-12 flex items-center justify-center text-[10px] font-sans uppercase tracking-widest border transition-colors duration-300 ${
                  selectedSizes.includes(size) ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/20 hover:border-white hover:text-white'
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
            { label: 'Featured Highlight', value: featured, set: setFeatured },
            { label: 'New Arrival', value: newArrival, set: setNewArrival },
            { label: 'Active Campaign', value: onOffer, set: setOnOffer },
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
          <button className="px-8 py-4 bg-white text-black font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-500">
            Publish Artifact
          </button>
          <button className="px-8 py-4 border border-white/20 text-white font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:border-white transition-colors duration-500">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  )
}
