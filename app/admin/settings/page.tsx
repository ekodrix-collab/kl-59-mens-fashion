'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [storeName] = useState("KL-59")
  const [tagline] = useState("Men's Fashion")
  const [heroTagline] = useState("Redefine Your Style")
  const [heroSubtitle] = useState("Premium men's fashion that makes a statement.")
  const [phone] = useState('')
  const [whatsapp] = useState('')
  const [address] = useState('')
  const [instagram] = useState('')
  const [workingHours] = useState('10:00 AM - 9:00 PM')

  const inputClass = "w-full bg-rich-black/50 backdrop-blur-sm px-6 py-4 border border-white/10 text-sm font-body text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 rounded-none";
  const labelClass = "block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-3";

  return (
    <div className="max-w-4xl space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-sans text-2xl md:text-3xl text-white font-light tracking-tight">System Configuration</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Manage Store Parameters</p>
        </div>
        <button className="px-8 py-4 bg-white text-black font-sans text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-500 whitespace-nowrap">
          Commit Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Store Info */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Brand Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Registered Entity</label>
              <input defaultValue={storeName} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Brand Slogan</label>
              <input defaultValue={tagline} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Hero Exhibition</h2>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Primary Dispatch</label>
              <input defaultValue={heroTagline} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Secondary Dispatch</label>
              <input defaultValue={heroSubtitle} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Cinematic Asset</label>
              <div className="border border-dashed border-white/20 bg-white/5 p-12 text-center hover:border-gold transition-colors cursor-pointer group">
                <p className="text-sm font-sans text-white/70 group-hover:text-gold transition-colors">Replace exhibition media</p>
                <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-white/40 mt-2">MP4 or WEBM • Max 10MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Communications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Voice Line</label>
              <input defaultValue={phone} placeholder="+91 XXXXXXXXXX" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Client Services (WhatsApp)</label>
              <input defaultValue={whatsapp} placeholder="91XXXXXXXXXX" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Physical Headquarters</label>
            <textarea defaultValue={address} rows={3} placeholder="Mailing Designation" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Operational Window</label>
              <input defaultValue={workingHours} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Social presence</label>
              <input defaultValue={instagram} placeholder="@" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Maps */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Geolocation Data</h2>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Maps Pointer</label>
              <input placeholder="https://goo.gl/maps/..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Integration Script</label>
              <textarea rows={4} placeholder='<iframe src="..." />' className={inputClass} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
