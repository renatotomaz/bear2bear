import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Bear2Bear',
  description: 'Biblioteca colaborativa escolar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}


// export default function RootLayout({ children }: { children: React.ReactNode }) {
// return (
// <html lang="pt-BR">
// <body className="min-h-screen bg-gray-50 text-gray-900">
// <header className="border-b bg-white">
// <nav className="mx-auto max-w-5xl flex gap-4 p-3">
// <Link href="/">Catálogo</Link>
// <Link href="/my-books">Meus livros</Link>
// <Link href="/requests">Empréstimos</Link>
// <Link href="/auth">Entrar</Link>
// </nav>
// </header>
// <main className="mx-auto max-w-5xl p-4">{children}</main>
// </body>
// </html>
// )
// }