'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

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

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-montserrat font-bold text-2xl text-gray-900">Settings</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* Store Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-montserrat font-semibold text-lg text-gray-900">Store Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Store Name</label>
            <input defaultValue={storeName} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Tagline</label>
            <input defaultValue={tagline} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-montserrat font-semibold text-lg text-gray-900">Hero Section</h2>
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Hero Tagline</label>
          <input defaultValue={heroTagline} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Hero Subtitle</label>
          <input defaultValue={heroSubtitle} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Hero Image / Video</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Upload hero background</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-montserrat font-semibold text-lg text-gray-900">Contact Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Phone</label>
            <input defaultValue={phone} placeholder="+91 XXXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">WhatsApp Number</label>
            <input defaultValue={whatsapp} placeholder="91XXXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Address</label>
          <textarea defaultValue={address} rows={2} placeholder="Store address" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Working Hours</label>
            <input defaultValue={workingHours} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Instagram Handle</label>
            <input defaultValue={instagram} placeholder="@kl59fashion" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Maps */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-montserrat font-semibold text-lg text-gray-900">Google Maps</h2>
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Google Maps URL</label>
          <input placeholder="https://goo.gl/maps/..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Embed Code</label>
          <textarea rows={3} placeholder='<iframe src="..." />' className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  )
}
