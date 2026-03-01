'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useProducts } from '@/hooks/use-products'
import { useState } from 'react'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { LoadingScreen } from '@/components/ui/loading-screen'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { productsQuery, deleteProduct } = useProducts()
  const { data: products, isPending } = productsQuery

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteProduct.mutateAsync(deleteId)
      setDeleteId(null)
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  const filteredProducts = products?.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isPending && !products) {
    return <LoadingScreen fullScreen={false} />
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Products</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Manage your items</p>
        </div>
        <Link href="/admin/products/new" className="group flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500">
          <Plus size={14} strokeWidth={2} /> Add Product
        </Link>
      </div>

      {/* Premium Search */}
      <div className="relative">
        <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="SEARCH PRODUCTS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-rich-black/50 backdrop-blur-sm border border-white/10 text-xs font-sans uppercase tracking-[0.2em] text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20"
        />
      </div>

      {/* Premium Table */}
      <div className="bg-rich-black/50 backdrop-blur-sm border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Preview</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Product Name</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Categories</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Price</th>
                <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Status</th>
                <th className="text-right px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((product) => {
                const primaryCat = product.product_categories?.find(pc => pc.is_primary)?.category?.name
                return (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="w-12 h-16 bg-white/5 border border-white/10 overflow-hidden">
                        {product.images?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" />
                        ) : (
                          <div className="w-full h-full bg-white/5" />
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-sans text-white group-hover:text-gold transition-colors">{product.name}</td>
                    <td className="px-8 py-6 text-[11px] font-sans uppercase tracking-[0.1em] text-white/50">
                      {primaryCat || (product.product_categories?.length ? 'Multiple' : '—')}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-body text-white">₹{product.selling_price.toLocaleString('en-IN')}</span>
                        {product.mrp > product.selling_price && (
                          <span className="text-[10px] font-body text-white/30 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1 border text-[9px] uppercase tracking-[0.2em] ${product.is_published ? 'border-gold/30 text-gold bg-gold/5' : 'border-white/20 text-white/50 bg-white/5'}`}>
                        {product.is_published ? 'Active' : 'Archived'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-4">
                        <Link href={`/admin/products/${product.id}`} className="text-white/40 hover:text-gold transition-colors">
                          <Pencil size={16} strokeWidth={1.5} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="text-white/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
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

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        isLoading={deleteProduct.isPending}
      />
    </div>
  )
}
