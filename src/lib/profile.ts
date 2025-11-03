import { createClient } from '@/lib/supabase'

export async function syncUserProfile() {
  const supabase = createClient()

  // Pega o usuário autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Tenta buscar o perfil existente
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Se não houver perfil, cria um novo
  if (!profile) {
    await supabase.from('profiles').insert([
      {
        id: user.id,
        name: user.user_metadata?.full_name || user.email,
        class: null,
      },
    ])
  }

  return user
}
