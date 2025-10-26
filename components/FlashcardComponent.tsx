'use client'

import { useState } from 'react'
import { Flashcard } from '@/types'
import Badge from './Badge'

interface FlashcardComponentProps {
  flashcard: Flashcard
}

export default function FlashcardComponent({ flashcard }: FlashcardComponentProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Badges de informação */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <Badge variant="primary">{flashcard.materia}</Badge>
        <Badge variant="secondary">{flashcard.topico}</Badge>
      </div>

      {/* Container do Flashcard com perspectiva */}
      <div
        className="perspective-1000 cursor-pointer"
        onClick={handleFlip}
        onKeyDown={handleKeyPress}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? 'Mostrar frente do cartão' : 'Mostrar verso do cartão'}
      >
        <div
          className={`
            relative w-full h-80 md:h-96
            transition-transform duration-600 preserve-3d
            ${isFlipped ? 'rotate-y-180' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Frente do card */}
          <div
            className="
              absolute inset-0 w-full h-full
              bg-gradient-to-br from-primary-500 to-primary-700
              rounded-2xl shadow-2xl
              flex items-center justify-center
              p-8
              backface-hidden
            "
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <div className="text-white text-sm font-semibold mb-4 opacity-90">
                FRENTE
              </div>
              <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
                {flashcard.frente}
              </p>
              <div className="mt-8 text-white text-sm opacity-75">
                Clique para ver a resposta
              </div>
            </div>
          </div>

          {/* Verso do card */}
          <div
            className="
              absolute inset-0 w-full h-full
              bg-gradient-to-br from-success to-green-700
              rounded-2xl shadow-2xl
              flex items-center justify-center
              p-8
              backface-hidden
            "
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-center">
              <div className="text-white text-sm font-semibold mb-4 opacity-90">
                VERSO
              </div>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                {flashcard.verso}
              </p>
              <div className="mt-8 text-white text-sm opacity-75">
                Clique para voltar
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de qual lado está visível */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 bg-secondary-100 px-4 py-2 rounded-full">
          <span className="text-sm text-secondary-600 font-medium">
            {isFlipped ? '📖 Verso' : '📝 Frente'}
          </span>
        </div>
      </div>
    </div>
  )
}
