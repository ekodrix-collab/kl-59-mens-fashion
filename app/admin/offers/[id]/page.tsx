'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Upload, X, Loader2, Check, ArrowLeft } from 'lucide-react'
import { useOffers } from '@/hooks/use-offers'
import { useProducts } from '@/hooks/use-products'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'
import { OfferType, DiscountType } from '@/types'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const OFFER_TYPES: { value: OfferType; label: string; desc: string }[] = [
    { value: 'combo', label: 'Combo Deal', desc: 'Bundle at a fixed price' },
    { value: 'bogo', label: 'Buy One Get One', desc: 'Free product with purchase' },
]

export default function EditOfferPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const { getOfferById, updateOffer } = useOffers()
    const { data: offer, isLoading: offerLoading } = getOfferById(id)
    const { productsQuery } = useProducts()
    const { data: products } = productsQuery

    const [offerType, setOfferType] = useState<OfferType>('combo')
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

    // Product Offer
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

    // Combo
    const [comboItems, setComboItems] = useState<{ product_id: string; quantity: number }[]>([])

    // BOGO
    const [bogoBuyItems, setBogoBuyItems] = useState<{ product_id: string; quantity: number }[]>([])
    const [bogoFreeItems, setBogoFreeItems] = useState<{ product_id: string; quantity: number }[]>([])
    const [bogoSavingsValue, setBogoSavingsValue] = useState('')

    // Auto-calculate BOGO savings
    useEffect(() => {
        if (offerType === 'bogo') {
            const total = bogoFreeItems.reduce((sum, item) => {
                const product = products?.find(p => p.id === item.product_id)
                return sum + (product?.selling_price || 0) * item.quantity
            }, 0)
            setBogoSavingsValue(total > 0 ? total.toString() : '')
        }
    }, [bogoFreeItems, offerType, products])

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (offer) {
            setOfferType(offer.offer_type)
            setTitle(offer.title)
            setDescription(offer.description || '')
            setDiscountType(offer.discount_type)
            setDiscountValue(offer.discount_value?.toString() || '')
            setComboPrice(offer.combo_price?.toString() || '')
            setStartDate(offer.start_date?.split('T')[0] || '')
            setEndDate(offer.end_date?.split('T')[0] || '')
            setBannerImage(offer.banner_image || '')
            setStatus(offer.is_active)
            setSelectedProductId(offer.product_id)

            if (offer.offer_type === 'combo' && offer.combo_items) {
                setComboItems(offer.combo_items.map(i => ({ product_id: i.product_id, quantity: i.quantity })))
            }

            if (offer.offer_type === 'bogo' && offer.combo_items) {
                const buyCount = offer.combo_price ? Number(offer.combo_price) : 1
                setBogoBuyItems(offer.combo_items.slice(0, buyCount).map(i => ({ product_id: i.product_id, quantity: i.quantity })))
                setBogoFreeItems(offer.combo_items.slice(buyCount).map(i => ({ product_id: i.product_id, quantity: i.quantity })))
                setBogoSavingsValue(offer.discount_value?.toString() || '')
            }
        }
    }, [offer])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setIsUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            setBannerImage(url)
            toast.success('Banner image uploaded')
        } catch (error) {
            console.error('Upload failed:', error)
            toast.error('Failed to upload banner image')
        } finally {
            setIsUploading(false)
        }
    }

    const handleSave = async () => {
        if (!title) { alert('Title is required'); return }

        try {
            const payload: any = {
                id,
                offer_type: offerType,
                title,
                description,
                banner_image: bannerImage || null,
                discount_type: discountType,
                discount_value: offerType === 'bogo'
                    ? (bogoSavingsValue ? Number(bogoSavingsValue) : null)
                    : (discountValue ? Number(discountValue) : null),
                combo_price: offerType === 'bogo'
                    ? bogoBuyItems.length
                    : (comboPrice ? Number(comboPrice) : null),
                start_date: startDate || null,
                end_date: endDate || null,
                is_active: status,
            }

            // Force flat discount for BOGO and Combo
            if (offerType === 'bogo' || offerType === 'combo') {
                payload.discount_type = 'flat'
            }

            if (offerType === 'product_offer') {
                payload.product_id = selectedProductId
            } else if (offerType === 'combo') {
                payload.combo_items = comboItems
            } else if (offerType === 'bogo') {
                const items = [
                    ...bogoBuyItems.map(item => ({ product_id: item.product_id, quantity: item.quantity })),
                    ...bogoFreeItems.map(item => ({ product_id: item.product_id, quantity: item.quantity }))
                ]
                payload.combo_items = items
            }

            await updateOffer.mutateAsync(payload)
            toast.success('Offer updated successfully')
            router.push('/admin/offers')
        } catch (error) {
            console.error('Failed to update offer:', error)
            toast.error('Failed to update offer. Please try again.')
        }
    }

    if (offerLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-gold" size={32} />
            </div>
        )
    }

    const inputClass = "w-full bg-rich-black/50 backdrop-blur-sm px-6 py-4 border border-white/10 text-sm font-body text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 rounded-none"
    const labelClass = "block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-3"

    const ProductPicker = ({
        label,
        selectedId,
        onSelect,
    }: {
        label: string
        selectedId: string | null
        onSelect: (id: string) => void
    }) => (
        <div>
            <label className={labelClass}>{label}</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent>
                {products?.map(p => (
                    <div
                        key={p.id}
                        onClick={() => onSelect(p.id)}
                        className={`flex items-center gap-3 p-3 border transition-all cursor-pointer ${selectedId === p.id
                            ? 'border-gold bg-gold/5'
                            : 'border-white/5 bg-black/20 hover:border-white/20'
                            }`}
                    >
                        <div className="w-9 h-9 bg-white/5 overflow-hidden flex-shrink-0">
                            {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-white truncate">{p.name}</p>
                            <p className="text-[9px] text-white/40">₹{p.selling_price}</p>
                        </div>
                        {selectedId === p.id && <Check size={13} className="text-gold flex-shrink-0" />}
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <div className="max-w-4xl pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/offers" className="text-white/40 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Edit Offer</h1>
            </div>

            <div className="space-y-12">
                {/* ── Type (read-only) ── */}
                <div className="bg-rich-black/30 p-8 border border-white/5 opacity-50 pointer-events-none">
                    <label className={labelClass}>Offer Type (Cannot change type after creation)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {OFFER_TYPES.map(({ value, label, desc }) => (
                            <button key={value} className={`px-5 py-4 border text-left ${offerType === value ? 'border-gold bg-gold/5' : 'border-white/10'}`}>
                                <span className={`block font-sans text-[10px] uppercase tracking-[0.2em] font-medium mb-1 ${offerType === value ? 'text-gold' : 'text-white/40'}`}>{label}</span>
                                <span className="block font-sans text-[9px] text-white/30">{desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Basic Info ── */}
                <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
                    <div>
                        <label className={labelClass}>Offer Title *</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="e.g. Buy Any Shirt, Get Trousers Free" />
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass} placeholder="Tell customers about the offer..." />
                    </div>
                    <div>
                        <label className={labelClass}>Banner Image (Optional)</label>
                        <div onClick={() => fileInputRef.current?.click()} className="aspect-[21/9] bg-black/40 border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-colors group overflow-hidden relative">
                            {bannerImage ? (
                                <>
                                    <img src={bannerImage} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                                        <span className="text-[9px] uppercase tracking-[0.2em] text-white">Campaign Banner</span>
                                        <button onClick={(e) => { e.stopPropagation(); setBannerImage('') }} className="p-2 hover:text-red-500 transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {isUploading ? <Loader2 className="animate-spin text-gold" size={24} /> : <Upload className="text-white/20 group-hover:text-gold transition-colors mb-2" size={24} strokeWidth={1.5} />}
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Upload Optional Banner Image</span>
                                </>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                </div>

                {/* ── Offer Configuration ── */}
                <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
                    <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-medium">Configuration</h3>

                    {/* Product Offer */}
                    {offerType === 'product_offer' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className={labelClass}>Discount Type</label>
                                    <div className="flex border border-white/10">
                                        <button onClick={() => setDiscountType('percentage')} className={`flex-1 py-3 text-[10px] uppercase tracking-[0.1em] transition-colors ${discountType === 'percentage' ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5'}`}>Percentage (%)</button>
                                        <button onClick={() => setDiscountType('flat')} className={`flex-1 py-3 text-[10px] uppercase tracking-[0.1em] transition-colors ${discountType === 'flat' ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5'}`}>Flat (₹)</button>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Discount Value</label>
                                    <input type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className={inputClass} placeholder={discountType === 'percentage' ? 'e.g. 20' : 'e.g. 500'} required />
                                </div>
                            </div>
                            <ProductPicker label="Select Product *" selectedId={selectedProductId} onSelect={setSelectedProductId} />
                        </>
                    )}

                    {/* Combo */}
                    {offerType === 'combo' && (
                        <>
                            <div>
                                <label className={labelClass}>Combo Final Price (₹)</label>
                                <input type="number" value={comboPrice} onChange={(e) => setComboPrice(e.target.value)} className={inputClass} placeholder="e.g. 2999" />
                            </div>
                            <div>
                                <label className={labelClass}>Select Products for Combo</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent>
                                    {products?.map(p => {
                                        const item = comboItems.find(i => i.product_id === p.id)
                                        return (
                                            <div key={p.id} className={`flex items-center gap-4 p-4 border transition-all ${item ? 'border-gold bg-gold/5' : 'border-white/5 bg-black/20'}`}>
                                                <div className="w-10 h-10 bg-white/5 overflow-hidden flex-shrink-0">{p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] text-white truncate">{p.name}</p>
                                                    <p className="text-[9px] text-white/40">₹{p.selling_price}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item ? (
                                                        <>
                                                            <button onClick={() => setComboItems(prev => { const n = prev.map((i: any) => i.product_id === p.id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i).filter((i: any) => i.quantity > 0); const total = n.reduce((a: number, i: any) => { const pr = products?.find(x => x.id === i.product_id); return a + (pr?.selling_price || 0) * i.quantity }, 0); setComboPrice(total.toString()); return n })} className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold">-</button>
                                                            <span className="text-[10px] text-white w-4 text-center">{item.quantity}</span>
                                                            <button onClick={() => setComboItems(prev => { const n = prev.map((i: any) => i.product_id === p.id ? { ...i, quantity: i.quantity + 1 } : i); const total = n.reduce((a: number, i: any) => { const pr = products?.find(x => x.id === i.product_id); return a + (pr?.selling_price || 0) * i.quantity }, 0); setComboPrice(total.toString()); return n })} className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold">+</button>
                                                        </>
                                                    ) : (
                                                        <button onClick={() => setComboItems(prev => { const n = [...prev, { product_id: p.id, quantity: 1 }]; const total = n.reduce((a: number, i: any) => { const pr = products?.find(x => x.id === i.product_id); return a + (pr?.selling_price || 0) * i.quantity }, 0); setComboPrice(total.toString()); return n })} className="px-3 py-1 border border-white/10 text-[9px] uppercase tracking-wider text-white/60 hover:border-gold hover:text-gold">Add</button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {/* BOGO */}
                    {offerType === 'bogo' && (
                        <div className="space-y-8">
                            <div className="border border-gold/20 bg-gold/5 px-5 py-4">
                                <p className="font-sans text-[10px] text-gold/80 leading-relaxed">
                                    <span className="font-semibold text-gold uppercase tracking-wider block mb-1">BOGO Configuration</span>
                                    Customer purchases the "Buy" product(s) and receives the "Get (Free)" product(s) at no extra cost.
                                </p>
                            </div>

                            <div>
                                <label className={labelClass}>Buy Product(s) (Customer Purchases)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent>
                                    {products?.map(p => {
                                        const item = bogoBuyItems.find(i => i.product_id === p.id)
                                        return (
                                            <div key={p.id} className={`flex items-center gap-4 p-4 border transition-all ${item ? 'border-gold bg-gold/5' : 'border-white/5 bg-black/20'}`}>
                                                <div className="w-10 h-10 bg-white/5 overflow-hidden flex-shrink-0">{p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] text-white truncate">{p.name}</p>
                                                    <p className="text-[9px] text-white/40">₹{p.selling_price}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item ? (
                                                        <>
                                                            <button onClick={() => setBogoBuyItems(prev => prev.map(i => i.product_id === p.id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i).filter(i => i.quantity > 0))} className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold">-</button>
                                                            <span className="text-[10px] text-white w-4 text-center">{item.quantity}</span>
                                                            <button onClick={() => setBogoBuyItems(prev => prev.map(i => i.product_id === p.id ? { ...i, quantity: i.quantity + 1 } : i))} className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold">+</button>
                                                        </>
                                                    ) : (
                                                        <button onClick={() => setBogoBuyItems(prev => [...prev, { product_id: p.id, quantity: 1 }])} className="px-3 py-1 border border-white/10 text-[9px] uppercase tracking-wider text-white/60 hover:border-gold hover:text-gold">Add</button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-gold/10" />
                                <span className="font-accent italic text-gold text-sm px-2">+</span>
                                <div className="flex-1 h-px bg-gold/10" />
                            </div>

                            <div>
                                <label className={labelClass}>Get (Free) Product(s) — Given at no cost</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent>
                                    {products?.map(p => {
                                        const item = bogoFreeItems.find(i => i.product_id === p.id)
                                        return (
                                            <div key={p.id} className={`flex items-center gap-4 p-4 border transition-all ${item ? 'border-gold bg-gold/5' : 'border-white/5 bg-black/20'}`}>
                                                <div className="w-10 h-10 bg-white/5 overflow-hidden flex-shrink-0">{p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] text-white truncate">{p.name}</p>
                                                    <p className="text-[9px] text-white/40">₹{p.selling_price}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item ? (
                                                        <>
                                                            <button onClick={() => setBogoFreeItems(prev => prev.map(i => i.product_id === p.id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i).filter(i => i.quantity > 0))} className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold">-</button>
                                                            <span className="text-[10px] text-white w-4 text-center">{item.quantity}</span>
                                                            <button onClick={() => setBogoFreeItems(prev => prev.map(i => i.product_id === p.id ? { ...i, quantity: i.quantity + 1 } : i))} className="w-6 h-6 border border-white/10 flex items-center justify-center text-white hover:border-gold">+</button>
                                                        </>
                                                    ) : (
                                                        <button onClick={() => setBogoFreeItems(prev => [...prev, { product_id: p.id, quantity: 1 }])} className="px-3 py-1 border border-white/10 text-[9px] uppercase tracking-wider text-white/60 hover:border-gold hover:text-gold">Add</button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Savings Value (₹) — Auto-calculated</label>
                                <input type="number" value={bogoSavingsValue} readOnly className={`${inputClass} opacity-70 cursor-not-allowed`} placeholder="Will be calculated automatically" />
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Timeline & Status ── */}
                <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClass}>Start Date</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
                        </div>
                        <div>
                            <label className={labelClass}>End Date</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
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

                {/* ── Actions ── */}
                <div className="flex gap-4 pt-8">
                    <button onClick={handleSave} disabled={updateOffer.isPending} className="px-12 py-4 bg-white text-black font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-500 disabled:opacity-50 flex items-center gap-3">
                        {updateOffer.isPending ? <Loader2 className="animate-spin" size={14} /> : null}
                        Save Changes
                    </button>
                    <button onClick={() => router.push('/admin/offers')} className="px-12 py-4 border border-white/20 text-white font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:border-white transition-colors duration-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
