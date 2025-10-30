'use client'
import { useState, useEffect } from 'react'  
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const supabase = createClient()

   useEffect(() => {
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 10) + '...')
  }, [])

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (!error) setSent(true)
    else alert(error.message)
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
      </form>
    </main>
  )
}
