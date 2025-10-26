/**
 * @fileoverview The root layout for the application.
 * @fileoverview O layout raiz para a aplicação.
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

/**
 * @const {Metadata}
 * @description The metadata for the application.
 * @description Os metadados para a aplicação.
 */
export const metadata: Metadata = {
  title: 'TCU Study - Sistema de Estudos para Concurso',
  description:
    'Webapp completa de questões, revisão e flashcards para o concurso do TCU',
  keywords: 'TCU, concurso público, CEBRASPE, questões, flashcards, estudos',
  authors: [{ name: 'TCU Study Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
}

/**
 * @interface RootLayoutProps
 * @description The props for the RootLayout component.
 * @description As props para o componente RootLayout.
 */
interface RootLayoutProps {
  /**
   * @property {React.ReactNode} children - The child components to be rendered within the layout.
   * @property {React.ReactNode} children - Os componentes filhos a serem renderizados dentro do layout.
   */
  children: React.ReactNode
}

/**
 * @function RootLayout
 * @description The root layout component that wraps the entire application.
 * @param {RootLayoutProps} props - The props for the component.
 * @returns {JSX.Element} The rendered root layout component.
 */
/**
 * @function RootLayout
 * @description O componente de layout raiz que envolve toda a aplicação.
 * @param {RootLayoutProps} props - As props para o componente.
 * @returns {JSX.Element} O componente de layout raiz renderizado.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-primary-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">TCU Study</h1>
              <p className="text-sm text-primary-100">
                Sistema de Estudos para Concurso
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="bg-secondary-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm text-secondary-300">
                &copy; {new Date().getFullYear()} TCU Study. Todos os direitos
                reservados.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
