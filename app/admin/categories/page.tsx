'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'
import { PLACEHOLDER_CATEGORIES } from '@/lib/constants'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(PLACEHOLDER_CATEGORIES)
  const [newName, setNewName] = useState('')

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-montserrat font-bold text-2xl text-gray-900">Categories</h1>

      {/* Add category */}
      <div className="flex gap-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New category name..."
        />
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Plus size={16} /> Add
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {categories.map((cat, i) => (
          <div key={cat.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 group">
            <GripVertical size={16} className="text-gray-300 cursor-grab" />
            <span className="flex-1 font-inter text-sm text-gray-900">{cat.name}</span>
            <span className="text-xs text-gray-400 font-inter">{cat.slug}</span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 font-inter">💡 Drag to reorder. Categories appear on the site in this order.</p>
    </div>
  )
}
