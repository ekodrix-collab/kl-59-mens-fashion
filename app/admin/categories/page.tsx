'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'
import { PLACEHOLDER_CATEGORIES } from '@/lib/constants'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(PLACEHOLDER_CATEGORIES)
  const [newName, setNewName] = useState('')

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Collections</h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Manage Site Taxonomy</p>
      </div>

      {/* Add category */}
      <div className="flex gap-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 bg-rich-black/50 backdrop-blur-sm border border-white/10 px-6 py-4 text-sm font-sans text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[10px]"
          placeholder="New Collection Name..."
        />
        <button className="flex items-center gap-2 px-8 py-4 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500 whitespace-nowrap">
          <Plus size={14} strokeWidth={2} /> Create
        </button>
      </div>

      {/* List */}
      <div className="bg-rich-black/50 backdrop-blur-sm border border-white/5 divide-y divide-white/5">
        {categories.map((cat, i) => (
          <div key={cat.id} className="flex items-center gap-6 px-8 py-5 hover:bg-white/5 transition-colors group">
            <GripVertical size={16} strokeWidth={1.5} className="text-white/20 cursor-grab hover:text-white transition-colors" />
            <span className="flex-1 font-sans text-sm text-white group-hover:text-gold transition-colors">{cat.name}</span>
            <span className="text-[10px] text-white/30 font-sans uppercase tracking-[0.2em]">{cat.slug}</span>
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white/40 hover:text-gold transition-colors"><Pencil size={16} strokeWidth={1.5} /></button>
              <button className="text-white/40 hover:text-red-500 transition-colors"><Trash2 size={16} strokeWidth={1.5} /></button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-sans mt-4">Drag to reorder. Ordering reflects onto main navigation.</p>
    </div>
  )
}
