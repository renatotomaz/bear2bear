'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function Callback() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    ;(async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      if (error) {
        console.error('[auth] exchangeCodeForSession error:', error.message)
        alert('Erro ao validar login. Tente novamente.')
      } else {
        console.log('[auth] Sessão restaurada com sucesso!')
        router.replace('/dashboard')
      }
    })()
  }, [router, supabase])

  return <p className="mt-20 text-center">Processando login...</p>
}
