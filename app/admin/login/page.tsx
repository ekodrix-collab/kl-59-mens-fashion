'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!email || !password) {
      setError('Please enter your credentials')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      if (data.user) {
        // We can still set this for any legacy code, but middleware will now use the cookie
        localStorage.setItem('kl59_admin_auth', 'true')
        router.push('/admin/dashboard')
        router.refresh() // Ensure server-side navigation knows about the new session
      }
    } catch (err) {
      setError('Connection failed. Please check your internet.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* === Animated Background === */}
      <div className="absolute inset-0 z-0">
        {/* Slow orbiting gold gradient */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
            top: '-20%',
            left: '-20%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Slow orbiting white gradient */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-15%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* === Login Card === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] mx-4 sm:mx-6"
      >
        {/* Top accent line */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={mounted ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Logo Section */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Logo size="large" />
          <div className="flex items-center gap-3 mt-8">
            <div className="w-8 h-[1px] bg-white/10" />
            <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-white/30">
              Admin Portal
            </p>
            <div className="w-8 h-[1px] bg-white/10" />
          </div>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Card inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          <div className="relative p-8 sm:p-10">
            <form onSubmit={handleLogin} className="flex flex-col gap-7">
              {/* Email Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                  <Mail size={12} strokeWidth={1.5} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3.5 text-white text-sm font-light focus:outline-none focus:border-gold/50 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-white/20"
                    placeholder="admin@kl59.in"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                  <Lock size={12} strokeWidth={1.5} />
                  Passkey
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3.5 text-white text-sm font-light focus:outline-none focus:border-gold/50 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-white/20 pr-12"
                    style={{ letterSpacing: showPassword ? '0' : '0.25em' }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold transition-colors duration-300 p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'password' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded px-4 py-3"
                  >
                    <p className="text-red-400 text-xs font-sans">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative mt-2 w-full overflow-hidden rounded group disabled:opacity-50"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/90 via-[#e6c44d] to-gold/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <div className="relative flex items-center justify-center gap-3 py-4 px-6">
                  {loading ? (
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-black">
                        Authenticating
                      </span>
                    </motion.div>
                  ) : (
                    <>
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-black">
                        Access Dashboard
                      </span>
                      <ArrowRight size={14} className="text-black group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Security Badge */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-2 text-white/20">
            <Shield size={12} strokeWidth={1.5} />
            <p className="font-sans text-[8px] uppercase tracking-[0.4em]">
              256-bit Encrypted • Authorized Access Only
            </p>
          </div>
          <div className="flex items-center gap-4 text-white/10">
            <div className="w-12 h-[1px] bg-white/5" />
            <p className="font-sans text-[7px] uppercase tracking-[0.3em]">
              KL-59 Enterprise
            </p>
            <div className="w-12 h-[1px] bg-white/5" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
