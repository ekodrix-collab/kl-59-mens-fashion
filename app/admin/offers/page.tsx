'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { useOffers } from '@/hooks/use-offers'
import { useState } from 'react'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function AdminOffersPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { offersQuery, deleteOffer } = useOffers()
  const { data: offers, isPending } = offersQuery

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteOffer.mutateAsync(deleteId)
      setDeleteId(null)
    } catch (error) {
      console.error('Failed to delete offer:', error)
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Offers</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Manage your store offers</p>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Offers</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Manage your store offers</p>
        </div>
        <Link href="/admin/offers/new" className="group flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-500">
          <Plus size={14} strokeWidth={2} /> New Offer
          <Plus size={14} strokeWidth={2} /> New Offer
        </Link>
      </div>

      <div className="bg-rich-black/50 backdrop-blur-sm border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-black/40">
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Offer Name</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Discount</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Type</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Status</th>
              <th className="text-left px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">End Date</th>
              <th className="text-right px-8 py-5 font-sans text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers?.map((offer) => (
              <tr key={offer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6 text-sm font-sans text-white group-hover:text-gold transition-colors">{offer.title}</td>
                <td className="px-8 py-6">
                  <span className="bg-white/5 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5">
                    {offer.offer_type === 'combo' ? `₹${offer.combo_price}` : `${offer.discount_value}${offer.discount_type === 'percentage' ? '%' : '₹'} OFF`}
                  </span>
                </td>
                <td className="px-8 py-6 text-[11px] font-sans uppercase tracking-[0.1em] text-white/50">{offer.offer_type}</td>
                <td className="px-8 py-6">
                  <span className={`inline-flex px-3 py-1 border text-[9px] uppercase tracking-[0.2em] ${offer.is_active ? 'border-gold/30 text-gold bg-gold/5' : 'border-white/20 text-white/50 bg-white/5'}`}>
                    {offer.is_active ? 'Live' : 'Archived'}
                  </span>
                </td>
                <td className="px-8 py-6 text-[11px] font-sans text-white/30 uppercase tracking-[0.1em]">{offer.end_date || 'No End Date'}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/offers/${offer.id}`}
                      className="text-white/40 hover:text-gold transition-colors"
                    >
                      <Pencil size={16} strokeWidth={1.5} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(offer.id)}
                      className="text-white/40 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Offer"
        message="Are you sure you want to delete this offer? This will stop the promotion immediately."
        confirmText="Delete"
        isLoading={deleteOffer.isPending}
      />
    </div>
  )
}
