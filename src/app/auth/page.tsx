'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/useAuth'
import Navbar from '@/components/Navbar'

export default function AuthPage() {
  const { user, loading, supabase } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[auth] signInWithOtp submit:', { email })
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
    })
    if (error) {
      console.error('[auth] signInWithOtp error:', error.message)
      alert(error.message)
    } else {
      console.log('[auth] magic link sent')
      setSent(true)
    }
  }

  const handleGoogle = async () => {
    console.log('[auth] signInWithOAuth google start')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: process.env.NEXT_PUBLIC_SITE_URL },
    })
    if (error) {
      console.error('[auth] signInWithOAuth error:', error.message)
      alert(error.message)
    }
  }

  if (loading) return <p className="text-center mt-20">Carregando…</p>

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar aparece somente se autenticado */}
      {user && <Navbar />}

      <div className={`mx-auto max-w-sm ${user ? 'pt-24' : 'pt-16'}`}>
        {!user && (
          <form onSubmit={handleLogin} className="w-full space-y-3 rounded-2xl bg-white p-5 shadow">
            <h1 className="text-lg font-semibold">Entrar</h1>

            <input
              className="w-full rounded-xl border border-gray-300 px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />

            <button type="submit" className="w-full rounded-xl bg-black py-2 text-white">
              Enviar link mágico
            </button>

            <div className="text-center text-sm text-gray-400">ou</div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full rounded-xl border border-gray-300 py-2 text-sm"
            >
              Entrar com Google
            </button>

            {sent && (
              <p className="text-sm text-gray-600">
                Verifique o link enviado para <strong>{email}</strong>.
              </p>
            )}
          </form>
        )}

        {user && (
          <div className="rounded-2xl bg-white p-5 shadow">
            <p className="mb-3">Você já está autenticado ({user.email ?? user.id}).</p>
            <a
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-black px-4 text-white"
            >
              Ir para o dashboard
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
