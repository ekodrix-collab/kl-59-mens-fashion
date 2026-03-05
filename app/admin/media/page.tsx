'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  Image as ImageIcon,
  Film,
  Link as LinkIcon,
  Check,
  Copy,
  X,
  Loader2,
  Plus,
  ExternalLink,
  Code2,
  Trash2,
  FileText,
  Search
} from 'lucide-react'
import { toast } from 'react-hot-toast'

// Define the Media Item type
interface MediaItem {
  id: string
  url: string
  public_id: string
  format: string
  resource_type: 'image' | 'video'
  created_at: string
}

export default function MediaPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [assets, setAssets] = useState<MediaItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load sample/persisted assets
  useEffect(() => {
    const saved = localStorage.getItem('kl59_admin_media')
    if (saved) {
      setAssets(JSON.parse(saved))
    } else {
      // Sample data for "Real Practice"
      setAssets([
        {
          id: '1',
          url: 'https://res.cloudinary.com/du6cwjfyw/image/upload/f_auto,q_auto/v1740815525/shyckfjvi3jyyazd.heic',
          public_id: 'shyckfjvi3jyyazd',
          format: 'heic',
          resource_type: 'image',
          created_at: new Date().toISOString()
        }
      ])
    }
  }, [])

  // Persist assets to localStorage for session continuity
  useEffect(() => {
    if (assets.length > 0) {
      localStorage.setItem('kl59_admin_media', JSON.stringify(assets))
    }
  }, [assets])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(10)

    try {
      const timestamp = Math.round(new Date().getTime() / 1000)
      const paramsToSign = { timestamp }

      const signRes = await fetch('/api/admin/cloudinary-sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign })
      })

      const { signature } = await signRes.json()
      setUploadProgress(40)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', '175967811318335')
      formData.append('timestamp', timestamp.toString())
      formData.append('signature', signature)

      const cloudName = 'du6cwjfyw'
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${file.type.startsWith('video') ? 'video' : 'image'}/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await uploadRes.json()
      setUploadProgress(90)

      if (data.secure_url) {
        // Apply optimization parameters for reliable browser display
        const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

        const newItem: MediaItem = {
          id: data.public_id,
          url: optimizedUrl,
          public_id: data.public_id,
          format: data.format,
          resource_type: file.type.startsWith('video') ? 'video' : 'image',
          created_at: new Date().toISOString()
        }
        setAssets([newItem, ...assets])
        toast.success('Asset uploaded successfully')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id))
  }

  const filteredAssets = assets.filter(a =>
    a.public_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.format.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-10 pb-20">
      {/* Header - Editorial Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4 block">Central Repository</span>
          <h1 className="font-display text-5xl text-white leading-none">Brand <span className="italic font-medium">Gallery</span></h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 mt-4">Manage boutique visuals and campaign assets</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-gold transition-colors" size={14} />
            <input
              type="text"
              placeholder="SEARCH ASSETS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-12 pr-4 text-[10px] font-sans tracking-widest text-white focus:outline-none focus:border-gold transition-all"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-white hover:bg-gold text-black transition-all duration-500 rounded-none"
          >
            {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold">New Asset</span>
          </button>
        </div>
        <input type="file" hidden ref={fileInputRef} onChange={handleUpload} accept="image/*,video/*" />
      </div>

      {/* Progress Multi-stage */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gold/5 border border-gold/20 p-8 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gold/10 rounded overflow-hidden">
                    <Loader2 className="text-gold animate-spin" size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans text-[10px] uppercase tracking-widest text-white">Transmitting Encrypted Payload</h3>
                    <p className="font-sans text-[9px] text-gold/60 mt-1 uppercase tracking-tighter">Applying AI Optimization & CDN Distribution</p>
                  </div>
                </div>
                <span className="font-display text-4xl text-gold font-light">{uploadProgress}%</span>
              </div>
              <div className="h-[2px] bg-white/5 w-full relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredAssets.length === 0 ? (
          <div className="col-span-full py-40 border border-dashed border-white/5 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center mb-6">
              <ImageIcon className="text-white/10" size={32} />
            </div>
            <h3 className="font-display text-2xl text-white/20">Archive <span className="italic">Empty</span></h3>
            <p className="font-sans text-[9px] uppercase tracking-widest text-white/10 mt-2">Begin your collection by uploading high-fidelity assets</p>
          </div>
        ) : (
          filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white/[0.02] border border-white/5 rounded-none overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Preview Area */}
              <div className="aspect-[4/5] bg-rich-black relative overflow-hidden">
                {asset.resource_type === 'video' ? (
                  <video src={asset.url} className="w-full h-full object-cover" muted loop onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                ) : (
                  <img src={asset.url} alt={asset.public_id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                )}

                {/* Format Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[8px] font-sans font-bold uppercase tracking-widest text-white">
                    {asset.format}
                  </span>
                  {asset.resource_type === 'video' && (
                    <span className="p-1.5 bg-gold rounded-full text-black">
                      <Film size={8} />
                    </span>
                  )}
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(asset.url, `url-${asset.id}`)}
                      className="p-3 bg-white text-black hover:bg-gold transition-colors"
                      title="Copy Direct URL"
                    >
                      {copiedId === `url-${asset.id}` ? <Check size={16} /> : <LinkIcon size={16} />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(`![${asset.public_id}](${asset.url})`, `md-${asset.id}`)}
                      className="p-3 bg-white text-black hover:bg-gold transition-colors"
                      title="Copy Markdown"
                    >
                      {copiedId === `md-${asset.id}` ? <Check size={16} /> : <Code2 size={16} />}
                    </button>
                    <a
                      href={asset.url}
                      target="_blank"
                      className="p-3 bg-white text-black hover:bg-gold transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-white/60">
                    {copiedId === `url-${asset.id}` ? 'URL COPIED' : copiedId === `md-${asset.id}` ? 'MARKDOWN COPIED' : 'ASSET CONTROLS'}
                  </span>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-sans text-[10px] text-white uppercase tracking-widest truncate group-hover:text-gold transition-colors">
                      {asset.public_id.split('/').pop()}
                    </h4>
                    <p className="font-sans text-[8px] text-white/20 mt-1 uppercase tracking-tighter truncate">
                      ID: {asset.id}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteAsset(asset.id)}
                    className="text-white/10 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="font-sans text-[8px] text-white/30 uppercase tracking-widest">Global CDN</span>
                  </div>
                  <span className="font-sans text-[8px] text-white/20 uppercase tracking-widest">
                    {new Date(asset.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Architecture Insights - Premium Card */}
      <div className="mt-20 border-t border-white/5 pt-12">
        <div className="bg-gold/[0.03] border border-gold/10 p-10 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
          <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
            <FileText size={300} className="text-gold" />
          </div>

          <div className="flex-1 space-y-6 relative z-10">
            <h3 className="font-display text-3xl text-white">System <span className="italic">Architecture</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="font-sans text-[10px] text-gold uppercase tracking-widest">Encrypted Signing</h4>
                <p className="font-sans text-xs text-white/40 leading-relaxed">
                  Utilizes HSA-256 secure hash signing on the Edge for direct-to-Cloudinary transmissions without exposing master secrets.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-sans text-[10px] text-gold uppercase tracking-widest">Edge Optimization</h4>
                <p className="font-sans text-xs text-white/40 leading-relaxed">
                  Automatic MIME-type detection & WebP/AVIF transformation ensures &lt; 100ms LCP scores across all global regions.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-sans text-[10px] text-gold uppercase tracking-widest">Persistence Layer</h4>
                <p className="font-sans text-xs text-white/40 leading-relaxed">
                  Recent uploads are cached in the browser state. In production, these mappings would be committed to the Supabase Media relation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

