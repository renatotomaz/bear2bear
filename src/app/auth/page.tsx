'use client'
import { useState, useEffect } from 'react'  
import { createClient } from '@/lib/supabase'
import { syncUserProfile } from '@/lib/profile'


export default function AuthPage() {
  const supabase = createClient()

  useEffect(() => {
  const { data: listener } = supabase.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN') {
      await syncUserProfile()
      window.location.href = '/dashboard'
    }
  })
  return () => listener.subscription.unsubscribe()
}, [])



  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    if (!error) setSent(true)
    else alert(error.message)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    })
    if (error) alert(error.message)
  }

  if (sent)
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-center text-gray-700">
          Verifique o link enviado para <strong>{email}</strong>.
        </p>
      </main>
    )

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-80 space-y-3 rounded-2xl bg-white p-5 shadow"
      >
        <h1 className="text-lg font-semibold">Entrar</h1>

        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-2 text-white"
        >
          Enviar link mágico
        </button>

        <div className="text-center text-sm text-gray-400">ou</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-xl border border-gray-300 py-2 text-sm"
        >
          Entrar com Google
        </button>
      </form>
    </main>
  )
}
