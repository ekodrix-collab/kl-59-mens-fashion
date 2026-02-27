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

  return (
    <div className="max-w-3xl">
      <h1 className="font-montserrat font-bold text-2xl text-gray-900 mb-8">Add New Product</h1>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Product Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Classic Slim Fit Denim Jeans"
          />
          {name && <p className="text-xs text-gray-400 mt-1">Slug: {slugify(name)}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {PLACEHOLDER_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Images</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">📷 Click or drag images to upload</p>
            <p className="text-xs text-gray-400 mt-1">Max 5MB per image • JPEG, PNG, WebP</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">MRP (₹) *</label>
            <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Selling Price (₹) *</label>
            <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        {discount > 0 && (
          <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">{discount}% OFF</span>
        )}

        {/* Sizes */}
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Available Sizes</label>
          <div className="flex gap-2">
            {SIZES.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  selectedSizes.includes(size) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:border-blue-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Colors</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {colors.map(c => (
              <span key={c} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                {c} <button onClick={() => setColors(colors.filter(x => x !== c))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type color and press Enter"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'Featured', value: featured, set: setFeatured },
            { label: 'New Arrival', value: newArrival, set: setNewArrival },
            { label: 'On Offer', value: onOffer, set: setOnOffer },
          ].map(t => (
            <label key={t.label} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={t.value} onChange={(e) => t.set(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-inter text-gray-700">{t.label}</span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-montserrat font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors">
            Publish Product
          </button>
          <button className="px-6 py-3 border border-gray-200 text-gray-700 font-montserrat font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors">
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  )
}
