/**
 * @fileoverview The flashcards page of the application.
 * @fileoverview A página de flashcards da aplicação.
 */

'use client'

import { useState, useEffect } from 'react'
import { gerarFlashcards } from '@/data/questoes-mockadas'
import FlashcardComponent from '@/components/FlashcardComponent'
import Button from '@/components/Button'
import { Flashcard } from '@/types'

/**
 * @function FlashcardsPage
 * @description The page for reviewing flashcards.
 * @returns {JSX.Element} The rendered flashcards page.
 */
/**
 * @function FlashcardsPage
 * @description A página para revisar flashcards.
 * @returns {JSX.Element} A página de flashcards renderizada.
 */
export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const cards = gerarFlashcards() as Flashcard[]
    setFlashcards(cards)
  }, [])

  if (flashcards.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-secondary-600">Carregando flashcards...</p>
        </div>
      </div>
    )
  }

  const currentFlashcard = flashcards[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(flashcards.length - 1, prev + 1))
  }

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length)
    setCurrentIndex(randomIndex)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
          Flashcards de Estudo
        </h1>
        <p className="text-secondary-600">
          Revise os conceitos de forma rápida e eficiente
        </p>
      </div>

      {/* Contador */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-secondary-200">
          <span className="text-lg font-semibold text-primary-700">
            {currentIndex + 1}
          </span>
          <span className="text-secondary-500">/</span>
          <span className="text-lg text-secondary-700">
            {flashcards.length}
          </span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <FlashcardComponent flashcard={currentFlashcard} />
      </div>

      {/* Controles de navegação */}
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Flashcard anterior"
          >
            ← Anterior
          </Button>

          <Button
            variant="primary"
            onClick={handleRandom}
            aria-label="Flashcard aleatório"
          >
            🔀 Aleatório
          </Button>

          <Button
            variant="secondary"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            aria-label="Próximo flashcard"
          >
            Próximo →
          </Button>
        </div>

        {/* Barra de progresso */}
        <div className="mt-6">
          <div className="w-full bg-secondary-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
              }}
              role="progressbar"
              aria-valuenow={(((currentIndex + 1) / flashcards.length) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="text-center mt-2 text-sm text-secondary-600">
            {Math.round(((currentIndex + 1) / flashcards.length) * 100)}%
            revisado
          </div>
        </div>
      </div>

      {/* Dica de uso */}
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <p className="text-sm text-primary-900 text-center">
          💡 <strong>Dica:</strong> Use os flashcards para memorizar os
          conceitos principais. Clique no cartão para virar e revelar a
          resposta!
        </p>
      </div>
    </div>
  )
}
