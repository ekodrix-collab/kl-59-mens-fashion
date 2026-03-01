'use client'

import { useState, useEffect } from 'react'
import { Loader2, Check } from 'lucide-react'
import { useStoreInfo } from '@/hooks/use-store-info'

export default function AdminSettingsPage() {
  const { storeInfoQuery, updateStoreInfo } = useStoreInfo()
  const { data: storeInfo, isLoading } = storeInfoQuery

  const [formData, setFormData] = useState<any>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    if (storeInfo) {
      setFormData(storeInfo)
    }
  }, [storeInfo])

  const handleSave = async () => {
    if (!formData || !formData.id) return
    setSaveStatus('saving')
    try {
      await updateStoreInfo.mutateAsync(formData)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Error saving settings')
      setSaveStatus('idle')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev: any) => ({ ...prev, [id]: value }))
  }

  if (isLoading || !formData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  const inputClass = "w-full bg-rich-black/50 backdrop-blur-sm px-6 py-4 border border-white/10 text-sm font-body text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 rounded-none";
  const labelClass = "block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-3";

  return (
    <div className="max-w-4xl space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Store Settings</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Update your store details</p>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">Store Settings</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Update your store details</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="px-8 py-4 bg-white text-black font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-500 whitespace-nowrap min-w-[160px] flex items-center justify-center gap-2"
        >
          {saveStatus === 'saving' && <Loader2 size={12} className="animate-spin" />}
          {saveStatus === 'saved' && <Check size={12} />}
          {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Store Info */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Brand Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Shop Name</label>
              <input id="store_name" value={formData.store_name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Brand Slogan</label>
              <input id="tagline" value={formData.tagline} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Homepage Banner</h2>
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Homepage Banner</h2>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Main Headline</label>
              <input id="hero_tagline" value={formData.hero_tagline} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Subheadline</label>
              <input id="hero_subtitle" value={formData.hero_subtitle} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Contact Details</h2>

          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Contact Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Phone Number</label>
              <input id="phone" value={formData.phone || ''} onChange={handleChange} placeholder="+91 XXXXXXXXXX" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input id="whatsapp" value={formData.whatsapp || ''} onChange={handleChange} placeholder="91XXXXXXXXXX" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Store Address</label>
            <textarea id="address" value={formData.address || ''} onChange={handleChange} rows={3} placeholder="Full Store Address" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Working Hours</label>
              <input id="working_hours" value={formData.working_hours || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Instagram Handle</label>
              <input id="instagram" value={formData.instagram || ''} onChange={handleChange} placeholder="@" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Maps */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Store Location</h2>
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Store Location</h2>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Google Maps Link</label>
              <input id="google_maps_url" value={formData.google_maps_url || ''} onChange={handleChange} placeholder="https://goo.gl/maps/..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Maps Embed Code</label>
              <textarea id="google_maps_embed" value={formData.google_maps_embed || ''} onChange={handleChange} rows={4} placeholder='<iframe src="..." />' className={inputClass} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
