'use client'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3 fixed top-0 left-0 right-0 z-50">
      <h1
        className="text-lg font-semibold cursor-pointer select-none"
        onClick={() => router.push('/dashboard')}
      >
        📚 Bear2Bear
      </h1>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-black"
      >
        Sair
      </button>
    </header>
  )
}
