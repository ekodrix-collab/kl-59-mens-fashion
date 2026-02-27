'use client'

import Link from 'next/link'
import { Package, Tag, Grid3X3, Plus, ArrowUpRight } from 'lucide-react'
import { PLACEHOLDER_PRODUCTS, PLACEHOLDER_CATEGORIES } from '@/lib/constants'

const stats = [
  { label: 'Total Inventory', value: '8', icon: Package, accent: 'text-gold' },
  { label: 'Active Campaigns', value: '4', icon: Tag, accent: 'text-white' },
  { label: 'Collections', value: '6', icon: Grid3X3, accent: 'text-white/50' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">System Overview</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Real-time metrics</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/products/new" className="group flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500">
            <Plus size={14} strokeWidth={2} /> New Product
          </Link>
          <Link href="/admin/offers/new" className="group flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-[10px] font-medium uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors duration-500">
            <Plus size={14} strokeWidth={2} /> New Campaign
          </Link>
        </div>
      </div>

      {/* Premium Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-rich-black/50 backdrop-blur-sm border border-white/5 p-8 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between mb-8">
              <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/50 ${stat.accent}`}>
                <stat.icon size={16} strokeWidth={1.5} />
              </div>
              <ArrowUpRight size={16} className="text-white/20" />
            </div>
            <p className="font-display text-4xl text-white font-medium">{stat.value}</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-3">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Premium Minimal Table */}
      <div className="bg-rich-black/50 backdrop-blur-sm border border-white/5">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white">Recent Artifacts</h2>
          <Link href="/admin/products" className="text-[10px] uppercase tracking-[0.2em] text-gold hover:text-white transition-colors flex items-center gap-2">
            View Register <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Designation</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Collection</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Reference</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Value</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">State</th>
              </tr>
            </thead>
            <tbody>
              {PLACEHOLDER_PRODUCTS.slice(0, 5).map((p) => {
                const cat = PLACEHOLDER_CATEGORIES.find(c => c.id === p.category_id)
                return (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 text-sm font-sans text-white group-hover:text-gold transition-colors">{p.name}</td>
                    <td className="px-8 py-6 text-[11px] font-sans uppercase tracking-widest text-white/50">{cat?.name || '—'}</td>
                    <td className="px-8 py-6 text-[12px] font-body text-white/30">₹{p.mrp.toLocaleString('en-IN')}</td>
                    <td className="px-8 py-6 text-sm font-body text-white">₹{p.selling_price.toLocaleString('en-IN')}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1 border text-[9px] uppercase tracking-[0.2em] ${p.is_published ? 'border-gold/30 text-gold bg-gold/5' : 'border-white/20 text-white/50 bg-white/5'}`}>
                        {p.is_published ? 'Active' : 'Archived'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
