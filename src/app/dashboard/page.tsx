'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function Dashboard() {
  const supabase = createClient()
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log('[dashboard] getUser:', { userId: user?.id, email: user?.email })
      if (!user) {
        router.push('/auth')
        return
      }
      setReady(true)
    })()
  }, [router, supabase])

  if (!ready) return <p className="text-center mt-20">Carregando…</p>

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-24 text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </main>
  )
}
