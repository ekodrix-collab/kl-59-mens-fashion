'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center gap-1.5 justify-center mb-2">
            <span className="font-montserrat font-black text-2xl text-gray-900">KL</span>
            <span className="w-6 h-[2px] bg-accent" />
            <span className="font-montserrat font-black text-2xl text-gray-900">59</span>
          </div>
          <p className="font-montserrat text-xs tracking-[0.2em] uppercase text-gray-400">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@kl59.in"
            />
          </div>

          <div>
            <label className="block font-montserrat text-xs font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-inter">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-montserrat font-semibold text-sm rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
