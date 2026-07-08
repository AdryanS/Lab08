'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Account created, but login failed. Please try logging in.')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#000000] px-8">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,42,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex w-full max-w-[420px] flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <Link href="/" className="font-ibm-mono text-xs font-semibold tracking-widest text-white">
            ✦ INDIE GEN
          </Link>
          <h1 className="mt-4 font-ibm-mono text-2xl font-semibold tracking-wider text-white">
            SIGN UP
          </h1>
          <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666]">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-[Geist_Mono] text-[10px] tracking-widest text-[#444444]">
              USERNAME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your-name"
              className="h-12 border border-[#2A2A2A] bg-[#1A1A1A] px-4 font-[Geist] text-sm text-white placeholder:text-[#444444] outline-none focus:border-[#FF6B00] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[Geist_Mono] text-[10px] tracking-widest text-[#444444]">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="h-12 border border-[#2A2A2A] bg-[#1A1A1A] px-4 font-[Geist] text-sm text-white placeholder:text-[#444444] outline-none focus:border-[#FF6B00] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[Geist_Mono] text-[10px] tracking-widest text-[#444444]">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              minLength={6}
              className="h-12 border border-[#2A2A2A] bg-[#1A1A1A] px-4 font-[Geist] text-sm text-white placeholder:text-[#444444] outline-none focus:border-[#FF6B00] transition-colors"
            />
          </div>

          {error && (
            <p className="font-[Geist_Mono] text-[11px] text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 w-full items-center justify-center bg-[#FF6B00] font-ibm-mono text-[13px] font-semibold tracking-[3px] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#2A2A2A]" />
          <span className="font-[Geist_Mono] text-[10px] tracking-wider text-[#444444]">OR</span>
          <div className="h-px flex-1 bg-[#2A2A2A]" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="flex h-11 items-center justify-center border border-[#2A2A2A] font-[Geist_Mono] text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors"
          >
            CONTINUE WITH GITHUB
          </button>
          {/* <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex h-11 items-center justify-center border border-[#2A2A2A] font-[Geist_Mono] text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors"
          >
            CONTINUE WITH GOOGLE
          </button> */}
        </div>

        <p className="text-center font-[Geist_Mono] text-[10px] tracking-wide text-[#444444]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#FF6B00] hover:underline">
            LOG IN
          </Link>
        </p>
      </div>
    </div>
  )
}
