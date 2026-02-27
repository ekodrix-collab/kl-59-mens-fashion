'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const placeholderOffers = [
  { id: '1', title: 'Denim Festival', discount: '50% OFF', category: 'Denim', active: true, end: '2025-12-31' },
  { id: '2', title: 'Buy 2 Get 1 Free', discount: 'B2G1', category: 'Shirts', active: true, end: '2025-11-30' },
  { id: '3', title: 'New Season Sale', discount: '60% OFF', category: 'All', active: true, end: '' },
  { id: '4', title: 'Formal Friday', discount: '40% OFF', category: 'Formals', active: false, end: '' },
]

export default function AdminOffersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-montserrat font-bold text-2xl text-gray-900">Offers</h1>
        <Link href="/admin/offers/new" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Plus size={16} /> New Offer
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Discount</th>
              <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">End Date</th>
              <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {placeholderOffers.map((offer) => (
              <tr key={offer.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-inter font-medium text-gray-900">{offer.title}</td>
                <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{offer.discount}</span></td>
                <td className="px-6 py-4 text-sm font-inter text-gray-500">{offer.category}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${offer.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-inter text-gray-500">{offer.end || '—'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600"><Pencil size={16} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
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
