'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Placeholder — will use Supabase Auth when configured
    if (!email || !password) {
      setError('Please enter email and password')
      setLoading(false)
      return
    }

    // For demo, accept any login and redirect
    setTimeout(() => {
      router.push('/admin/dashboard')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Premium Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center justify-center mb-12">
          <Logo size="large" />
          <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.4em] text-muted">
            Workspace Access
          </p>
        </div>

        <div className="bg-rich-black/80 backdrop-blur-md border border-white/10 p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="space-y-4">
              <label className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Email / ID</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-body focus:outline-none focus:border-gold transition-colors"
                placeholder="admin@kl59.in"
              />
            </div>

            <div className="space-y-4 relative">
              <label className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Passkey</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-body focus:outline-none focus:border-gold transition-colors pr-10"
                  style={{ letterSpacing: '0.2em' }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white pb-2 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-sans mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-white text-black font-sans text-[11px] font-medium uppercase tracking-[0.3em] py-4 hover:bg-gold hover:text-white transition-colors duration-500 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Enter System'}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
            Secure Area • Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  )
}
