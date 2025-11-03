'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export function useAuth() {
  const supabase = createClient()
  const [user, setUser] = useState<null | { id: string; email?: string }>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data: sess } = await supabase.auth.getSession()
      console.log('[auth] getSession:', {
        hasSession: !!sess.session,
        userId: sess.session?.user.id,
        email: sess.session?.user.email,
      })
      setUser(sess.session ? { id: sess.session.user.id, email: sess.session.user.email ?? undefined } : null)
      setLoading(false)
    })()

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[auth] onAuthStateChange:', {
        event,
        hasSession: !!session,
        userId: session?.user.id,
        email: session?.user.email,
      })
      setUser(session ? { id: session.user.id, email: session.user.email ?? undefined } : null)
    })
    return () => sub.subscription.unsubscribe()
  }, [supabase])

  return { user, loading, supabase }
}
