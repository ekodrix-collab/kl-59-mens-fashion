'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { PLACEHOLDER_PRODUCTS, PLACEHOLDER_CATEGORIES } from '@/lib/constants'

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-montserrat font-bold text-2xl text-gray-900">Products</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">MRP</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 font-montserrat text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PLACEHOLDER_PRODUCTS.map((product) => {
                const cat = PLACEHOLDER_CATEGORIES.find(c => c.id === product.category_id)
                return (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-16 rounded-lg bg-gray-200" />
                    </td>
                    <td className="px-6 py-4 text-sm font-inter font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm font-inter text-gray-500">{cat?.name || '—'}</td>
                    <td className="px-6 py-4 text-sm font-inter text-gray-500">₹{product.mrp.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm font-inter font-medium text-gray-900">₹{product.selling_price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${product.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {product.is_published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/products/${product.id}`} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors">
                          <Pencil size={16} />
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
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
