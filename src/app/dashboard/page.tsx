'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function Dashboard() {
  const supabase = createClient()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('name, class')
        .eq('id', user.id)
        .single()

      setProfile(data)
      setLoading(false)
    }
    load()
  }, [router, supabase])

  if (loading) return <p className="text-center mt-20">Carregando...</p>

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2">Olá, {profile?.name}</h1>
        <p className="text-gray-500 mb-6">
          Turma: {profile?.class || 'não definida'}
        </p>
        <p className="text-gray-700">
          Aqui você verá seus livros emprestados e disponíveis.
        </p>
      </div>
    </main>
  )
}
