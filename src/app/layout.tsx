import './globals.css'

export const metadata = {
  title: 'Bear2Bear',
  description: 'Biblioteca colaborativa escolar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
