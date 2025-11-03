'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Dashboard() {
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('name, class')
        .eq('id', user.id)
        .single()
      setProfile(data)
    }
    loadProfile()
  }, [])

  if (!profile) return <p>Carregando...</p>

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Olá, {profile.name}</h1>
      <p className="text-gray-500">Turma: {profile.class || 'não definida'}</p>
    </main>
  )
}
