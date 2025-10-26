import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TCU Study - Sistema de Estudos para Concurso',
  description: 'Webapp completa de questões, revisão e flashcards para o concurso do TCU',
  keywords: 'TCU, concurso público, CEBRASPE, questões, flashcards, estudos',
  authors: [{ name: 'TCU Study Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-primary-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">TCU Study</h1>
              <p className="text-sm text-primary-100">Sistema de Estudos para Concurso</p>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-secondary-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm text-secondary-300">
                &copy; {new Date().getFullYear()} TCU Study. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
