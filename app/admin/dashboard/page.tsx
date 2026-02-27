'use client'

import Link from 'next/link'
import { Package, Tag, Grid3X3, Plus } from 'lucide-react'
import { PLACEHOLDER_PRODUCTS, PLACEHOLDER_CATEGORIES } from '@/lib/constants'

const stats = [
  { label: 'Total Products', value: '8', icon: Package, color: 'bg-blue-50 text-blue-600' },
  { label: 'Active Offers', value: '4', icon: Tag, color: 'bg-green-50 text-green-600' },
  { label: 'Categories', value: '6', icon: Grid3X3, color: 'bg-purple-50 text-purple-600' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-montserrat font-bold text-2xl text-gray-900">Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus size={16} /> Add Product
          </Link>
          <Link href="/admin/offers/new" className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Plus size={16} /> New Offer
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="font-montserrat font-bold text-3xl text-gray-900">{stat.value}</p>
            <p className="font-inter text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-montserrat font-semibold text-lg text-gray-900">Recent Products</h2>
          <Link href="/admin/products" className="text-blue-600 text-sm hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">MRP</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {PLACEHOLDER_PRODUCTS.slice(0, 5).map((p) => {
                const cat = PLACEHOLDER_CATEGORIES.find(c => c.id === p.category_id)
                return (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-inter font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 text-sm font-inter text-gray-500">{cat?.name || '—'}</td>
                    <td className="px-6 py-4 text-sm font-inter text-gray-500">₹{p.mrp.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm font-inter font-medium text-gray-900">₹{p.selling_price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.is_published ? 'Live' : 'Draft'}
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
