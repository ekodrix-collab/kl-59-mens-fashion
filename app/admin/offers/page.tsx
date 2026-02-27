'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const placeholderOffers = [
  { id: '1', title: 'Winter Archive Selection', discount: '50% OFF', category: 'Denim', active: true, end: '2025-12-31' },
  { id: '2', title: 'Heritage Collection', discount: 'B2G1', category: 'Shirts', active: true, end: '2025-11-30' },
  { id: '3', title: 'New Season Preview', discount: '60% OFF', category: 'All', active: true, end: '' },
  { id: '4', title: 'Evening Formals', discount: '40% OFF', category: 'Formals', active: false, end: '' },
]

export default function AdminOffersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Active Campaigns</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Manage Store Offers</p>
        </div>
        <Link href="/admin/offers/new" className="group flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500">
          <Plus size={14} strokeWidth={2} /> New Campaign
        </Link>
      </div>

      <div className="bg-rich-black/50 backdrop-blur-sm border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-black/40">
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Campaign Title</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Benefit</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Scope</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">State</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Deadline</th>
              <th className="text-right px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Modify</th>
            </tr>
          </thead>
          <tbody>
            {placeholderOffers.map((offer) => (
              <tr key={offer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6 text-sm font-sans text-white group-hover:text-gold transition-colors">{offer.title}</td>
                <td className="px-8 py-6">
                  <span className="bg-white/5 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5">{offer.discount}</span>
                </td>
                <td className="px-8 py-6 text-[11px] font-sans uppercase tracking-[0.1em] text-white/50">{offer.category}</td>
                <td className="px-8 py-6">
                  <span className={`inline-flex px-3 py-1 border text-[9px] uppercase tracking-[0.2em] ${offer.active ? 'border-gold/30 text-gold bg-gold/5' : 'border-white/20 text-white/50 bg-white/5'}`}>
                    {offer.active ? 'Live' : 'Archived'}
                  </span>
                </td>
                <td className="px-8 py-6 text-[11px] font-sans text-white/30 uppercase tracking-[0.1em]">{offer.end || 'Indefinite'}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-white/40 hover:text-gold transition-colors">
                      <Pencil size={16} strokeWidth={1.5} />
                    </button>
                    <button className="text-white/40 hover:text-red-500 transition-colors">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
