'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, Loader2, Plus, Search, Check, ArrowLeft } from 'lucide-react'
import { useOffers } from '@/hooks/use-offers'
import { useProducts } from '@/hooks/use-products'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'
import { OfferType, DiscountType } from '@/types'
import Link from 'next/link'

export default function NewOfferPage() {
    const router = useRouter()
    const { createOffer } = useOffers()
    const { productsQuery } = useProducts()
    const { data: products } = productsQuery

    const [offerType, setOfferType] = useState<OfferType>('product_offer')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [discountType, setDiscountType] = useState<DiscountType>('percentage')
    const [discountValue, setDiscountValue] = useState('')
    const [comboPrice, setComboPrice] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [bannerImage, setBannerImage] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [status, setStatus] = useState(true)

    // For Product Offer
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

    // For Combo Offer
    const [comboItems, setComboItems] = useState<{ product_id: string; quantity: number }[]>([])


    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            setBannerImage(url)
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Failed to upload banner image')
        } finally {
            setIsUploading(false)
        }
    }

    const handleCreate = async () => {
        if (!title) {
            alert('Title is required')
            return
        }

        try {
            const payload: any = {
                offer_type: offerType,
                title,
                description,
                banner_image: bannerImage,
                discount_type: discountType,
                discount_value: discountValue ? Number(discountValue) : null,
                combo_price: comboPrice ? Number(comboPrice) : null,
                start_date: startDate || null,
                end_date: endDate || null,
                is_active: status,
            }

            if (offerType === 'product_offer') {
                payload.product_id = selectedProductId
            } else if (offerType === 'combo') {
                payload.combo_items = comboItems
            }

            await createOffer.mutateAsync(payload)
            router.push('/admin/offers')
        } catch (error) {
            console.error('Failed to create offer:', error)
            alert('Error creating offer. See console.')
        }
    }

    const inputClass = "w-full bg-rich-black/50 backdrop-blur-sm px-6 py-4 border border-white/10 text-sm font-body text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 rounded-none";
    const labelClass = "block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-3";

    return (
        <div className="max-w-4xl pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/offers" className="text-white/40 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Create New Offer</h1>
            </div>

            <div className="space-y-12">
                {/* Type Selection */}
                <div className="bg-rich-black/30 p-8 border border-white/5">
                    <label className={labelClass}>Offer Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(['product_offer', 'combo'] as OfferType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setOfferType(type)}
                                className={`px-6 py-4 border text-[10px] uppercase tracking-[0.2em] transition-all ${offerType === type
                                    ? 'border-gold bg-gold/5 text-gold'
                                    : 'border-white/10 text-white/40 hover:border-white/30'
                                    }`}
                            >
                                {type.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
                    <div>
                        <label className={labelClass}>Offer Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Summer Clearance Sale"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className={inputClass}
                            placeholder="Tell customers about the offer..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Banner Image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-[21/9] bg-black/40 border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-colors group overflow-hidden relative"
                        >
                            {bannerImage ? (
                                <>
                                    <img src={bannerImage} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[9px] uppercase tracking-[0.2em] text-white">Change Image</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {isUploading ? (
                                        <Loader2 className="animate-spin text-gold" size={24} />
                                    ) : (
                                        <Upload className="text-white/20 group-hover:text-gold transition-colors mb-2" size={24} strokeWidth={1.5} />
                                    )}
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Upload Banner Image</span>
                                </>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                </div>

                {/* Offer Specific Configuration */}
                <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
                    <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">Configuration</h3>

                    {offerType !== 'combo' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className={labelClass}>Discount Type</label>
                                <div className="flex border border-white/10">
                                    <button
                                        onClick={() => setDiscountType('percentage')}
                                        className={`flex-1 py-3 text-[10px] uppercase tracking-[0.1em] transition-colors ${discountType === 'percentage' ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5'}`}
                                    >
                                        Percentage (%)
                                    </button>
                                    <button
                                        onClick={() => setDiscountType('flat')}
                                        className={`flex-1 py-3 text-[10px] uppercase tracking-[0.1em] transition-colors ${discountType === 'flat' ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5'}`}
                                    >
                                        Flat (₹)
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Discount Value</label>
                                <input
                                    type="number"
                                    value={discountValue}
                                    onChange={(e) => setDiscountValue(e.target.value)}
                                    className={inputClass}
                                    placeholder={discountType === 'percentage' ? 'e.g. 20' : 'e.g. 500'}
                                />
                            </div>
                        </div>
                    )}

                    {offerType === 'combo' && (
                        <div>
                            <label className={labelClass}>Combo Final Price (₹)</label>
                            <input
                                type="number"
                                value={comboPrice}
                                onChange={(e) => setComboPrice(e.target.value)}
                                className={inputClass}
                                placeholder="e.g. 2999"
                            />
                        </div>
                    )}

                    {/* Product Selection */}
                    {offerType === 'product_offer' && (
                        <div>
                            <label className={labelClass}>Select Product</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {products?.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => setSelectedProductId(p.id)}
                                        className={`flex items-center gap-4 p-4 border transition-all cursor-pointer ${selectedProductId === p.id
                                            ? 'border-gold bg-gold/5'
                                            : 'border-white/5 bg-black/20 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="w-10 h-10 bg-white/5 overflow-hidden flex-shrink-0">
                                            {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] text-white truncate">{p.name}</p>
                                            <p className="text-[9px] text-white/40">₹{p.selling_price}</p>
                                        </div>
                                        {selectedProductId === p.id && <Check size={14} className="text-gold" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {offerType === 'combo' && (
                        <div>
                            <label className={labelClass}>Select Products for Combo</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {products?.map(p => {
                                    const item = comboItems.find(i => i.product_id === p.id)
                                    return (
                                        <div
                                            key={p.id}
                                            className={`flex items-center gap-4 p-4 border transition-all ${item ? 'border-gold bg-gold/5' : 'border-white/5 bg-black/20'
                                                }`}
                                        >
                                            <div className="w-10 h-10 bg-white/5 overflow-hidden flex-shrink-0">
                                                {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] text-white truncate">{p.name}</p>
                                                <p className="text-[9px] text-white/40">₹{p.selling_price}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {item ? (
                                                    <>
                                                        <button
                                                            onClick={() => setComboItems(prev => prev.map(i => i.product_id === p.id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i).filter(i => i.quantity > 0))}
                                                            className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-[10px] text-white w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => setComboItems(prev => prev.map(i => i.product_id === p.id ? { ...i, quantity: i.quantity + 1 } : i))}
                                                            className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold"
                                                        >
                                                            +
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => setComboItems(prev => [...prev, { product_id: p.id, quantity: 1 }])}
                                                        className="px-3 py-1 border border-white/10 text-[9px] uppercase tracking-wider text-white/60 hover:border-gold hover:text-gold"
                                                    >
                                                        Add
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Timeline & Status */}
                <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClass}>Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className={`${inputClass} [color-scheme:dark]`}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className={`${inputClass} [color-scheme:dark]`}
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                        <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${status ? 'bg-gold border-gold' : 'border-white/30 group-hover:border-gold'}`}>
                            {status && <div className="w-2 h-2 bg-black" />}
                        </div>
                        <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} className="hidden" />
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">Active Status</span>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-8">
                    <button
                        onClick={handleCreate}
                        disabled={createOffer.isPending}
                        className="px-12 py-4 bg-white text-black font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-500 disabled:opacity-50 flex items-center gap-3"
                    >
                        {createOffer.isPending ? <Loader2 className="animate-spin" size={14} /> : null}
                        Create Offer
                    </button>
                    <button
                        onClick={() => router.push('/admin/offers')}
                        className="px-12 py-4 border border-white/20 text-white font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:border-white transition-colors duration-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
