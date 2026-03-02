'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, Check, Upload, Image as ImageIcon, X } from 'lucide-react'
import { useStoreInfo } from '@/hooks/use-store-info'

export default function AdminSettingsPage() {
  const { storeInfoQuery, updateStoreInfo } = useStoreInfo()
  const { data: storeInfo, isLoading } = storeInfoQuery

  const [formData, setFormData] = useState<any>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (storeInfo) {
      setFormData(storeInfo)
    }
  }, [storeInfo])

  const handleAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string = 'store_image', type: 'image' | 'video' = 'image') => {
    const file = e.target.files?.[0]
    if (!file || !formData?.id) return

    setIsUploading(true)
    try {
      const timestamp = Math.round(new Date().getTime() / 1000)
      const paramsToSign = { timestamp }
      const signRes = await fetch('/api/admin/cloudinary-sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign })
      })
      const { signature } = await signRes.json()

      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('api_key', '175967811318335') 
      uploadData.append('timestamp', timestamp.toString())
      uploadData.append('signature', signature)

      const cloudName = 'du6cwjfyw' 
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`, {
        method: 'POST',
        body: uploadData
      })
      const data = await uploadRes.json()

      if (data.secure_url) {
        let finalUrl = data.secure_url;
        if (type === 'image') {
          finalUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
        }
        
        setFormData((prev: any) => ({ ...prev, [field]: finalUrl }));
        await updateStoreInfo.mutateAsync({ ...formData, [field]: finalUrl });
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (err) {
      console.error('Upload failed:', err)
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} upload failed.`)
    } finally {
      setIsUploading(false)
    }
  }

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
        {/* Brand Identity */}
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

        {/* Store Visuals */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70">Store Visuals</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setUploadMode('file')}
                className={`text-[9px] uppercase tracking-widest ${uploadMode === 'file' ? 'text-gold' : 'text-white/30'}`}
              >
                Upload File
              </button>
              <button 
                onClick={() => setUploadMode('url')}
                className={`text-[9px] uppercase tracking-widest ${uploadMode === 'url' ? 'text-gold' : 'text-white/30'}`}
              >
                Paste Link
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <label className={labelClass}>Interior / Boutique Shot</label>
            
            {uploadMode === 'url' ? (
              <div className="space-y-4">
                <input 
                  id="store_image" 
                  value={formData.store_image || ''} 
                  onChange={handleChange} 
                  placeholder="Paste URL from Gallery here..." 
                  className={inputClass} 
                />
                <p className="text-[8px] uppercase tracking-widest text-white/20 italic">
                  💡 Hint: Copy a URL from the "Gallery" tab and paste it here.
                </p>
                {formData.store_image && (
                  <div className="aspect-[21/9] w-full border border-white/10 overflow-hidden">
                    <img src={formData.store_image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative group">
                <div className="aspect-[21/9] w-full bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden relative group-hover:border-gold/30 transition-colors duration-500">
                  {formData.store_image ? (
                    <>
                      <img 
                        src={formData.store_image} 
                        alt="Store Preview" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-6 py-3 bg-white/10 backdrop-blur-md rounded border border-white/20 text-white font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                        >
                          Change Visual
                        </button>
                      </div>
                    </>
                  ) : (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex flex-col items-center gap-4 text-white/30 hover:text-gold transition-colors p-12 w-full h-full"
                    >
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform duration-500">
                        {isUploading ? <Loader2 className="animate-spin text-gold" size={24} /> : <ImageIcon size={24} />}
                      </div>
                      <div className="text-center">
                        <span className="font-sans text-[10px] uppercase tracking-widest block mb-1">
                          {isUploading ? 'Processing Asset...' : 'Upload Boutique Interior'}
                        </span>
                        <span className="font-sans text-[8px] uppercase tracking-widest opacity-40">HEIC, WEBP, JPG supported</span>
                      </div>
                    </button>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => handleAssetUpload(e, 'store_image', 'image')} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Catalog Visuals */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70">Catalog / Shop Visuals</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setUploadMode('file')}
                className={`text-[9px] uppercase tracking-widest ${uploadMode === 'file' ? 'text-gold' : 'text-white/30'}`}
              >
                Upload File
              </button>
              <button 
                onClick={() => setUploadMode('url')}
                className={`text-[9px] uppercase tracking-widest ${uploadMode === 'url' ? 'text-gold' : 'text-white/30'}`}
              >
                Paste Link
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <label className={labelClass}>Catalog Hero Image</label>
            
            {uploadMode === 'url' ? (
              <div className="space-y-4">
                <input 
                  id="hero_image" 
                  value={formData.hero_image || ''} 
                  onChange={handleChange} 
                  placeholder="Paste URL from Gallery here..." 
                  className={inputClass} 
                />
                {formData.hero_image && (
                  <div className="aspect-[21/9] w-full border border-white/10 overflow-hidden">
                    <img src={formData.hero_image} alt="Catalog Hero Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative group">
                <div className="aspect-[21/9] w-full bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden relative group-hover:border-gold/30 transition-colors duration-500">
                  {formData.hero_image ? (
                    <>
                      <img 
                        src={formData.hero_image} 
                        alt="Catalog Hero Preview" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <button 
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e: any) => handleAssetUpload(e, 'hero_image', 'image');
                            input.click();
                          }}
                          className="px-6 py-3 bg-white/10 backdrop-blur-md rounded border border-white/20 text-white font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                        >
                          Change Catalog Hero
                        </button>
                      </div>
                    </>
                  ) : (
                    <button 
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e: any) => handleAssetUpload(e, 'hero_image', 'image');
                        input.click();
                      }}
                      disabled={isUploading}
                      className="flex flex-col items-center gap-4 text-white/30 hover:text-gold transition-colors p-12 w-full h-full"
                    >
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform duration-500">
                        {isUploading ? <Loader2 className="animate-spin text-gold" size={24} /> : <ImageIcon size={24} />}
                      </div>
                      <div className="text-center">
                        <span className="font-sans text-[10px] uppercase tracking-widest block mb-1">
                          {isUploading ? 'Processing Asset...' : 'Upload Catalog Hero'}
                        </span>
                        <span className="font-sans text-[8px] uppercase tracking-widest opacity-40">High-Resolution recommended</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Homepage Banner */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Homepage Banner</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Main Headline (Italic)</label>
                <input id="tagline" value={formData.tagline} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Secondary Headline</label>
                <input id="hero_tagline" value={formData.hero_tagline} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className={labelClass}>Hero Video (Cinema Background)</label>
              <div className="flex gap-4 mb-4">
                <button 
                  onClick={() => setUploadMode('file')}
                  className={`text-[9px] uppercase tracking-widest ${uploadMode === 'file' ? 'text-gold' : 'text-white/30'}`}
                >
                  Upload MP4
                </button>
                <button 
                  onClick={() => setUploadMode('url')}
                  className={`text-[9px] uppercase tracking-widest ${uploadMode === 'url' ? 'text-gold' : 'text-white/30'}`}
                >
                  Paste Video Link
                </button>
              </div>

              {uploadMode === 'url' ? (
                <input 
                  id="hero_video" 
                  value={formData.hero_video || ''} 
                  onChange={handleChange} 
                  placeholder="https://.../video.mp4" 
                  className={inputClass} 
                />
              ) : (
                <div 
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'video/mp4,video/webm';
                    input.onchange = (e: any) => handleAssetUpload(e, 'hero_video', 'video');
                    input.click();
                  }}
                  className="aspect-video w-full bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 transition-all group overflow-hidden"
                >
                  {formData.hero_video ? (
                    <video src={formData.hero_video} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" muted loop autoPlay />
                  ) : (
                    <div className="text-center p-6">
                      <Upload className="mx-auto mb-4 text-white/20 group-hover:text-gold transition-colors" size={32} />
                      <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">
                        {isUploading ? 'Uploading Cinematic...' : 'Upload Hero Video (MP4)'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Story Section Management */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 border-b border-white/10 pb-4">Story Page Content</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Hero Title</label>
                <input id="story_hero_title" value={formData.story_hero_title} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hero Subtitle (Gold)</label>
                <input id="story_hero_subtitle" value={formData.story_hero_subtitle} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Main Section Title</label>
                <input id="story_main_title" value={formData.story_main_title} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Section Subtitle (Small Gold)</label>
                <input id="story_main_subtitle" value={formData.story_main_subtitle} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Brand Narrative (Long Paragraph)</label>
              <textarea id="story_main_content" value={formData.story_main_content} onChange={handleChange} rows={6} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className={labelClass}>Story Hero Background</label>
                <div 
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => handleAssetUpload(e, 'story_hero_image', 'image');
                    input.click();
                  }}
                  className="aspect-video w-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-gold/30 transition-all group overflow-hidden"
                >
                  <img src={formData.story_hero_image} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Story Hero" />
                </div>
              </div>
              <div className="space-y-4">
                <label className={labelClass}>Editorial Craft Image</label>
                <div 
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => handleAssetUpload(e, 'story_main_image', 'image');
                    input.click();
                  }}
                  className="aspect-video w-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-gold/30 transition-all group overflow-hidden"
                >
                  <img src={formData.story_main_image} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Story Main" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-rich-black/30 p-8 border border-white/5 space-y-8">
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
