/**
 * @fileoverview A component to display a question card with options to answer and feedback.
 * @fileoverview Um componente para exibir um card de questão com opções de resposta e feedback.
 */

'use client'

import { useState, useEffect } from 'react'
import { Questao, RespostaCorreta } from '@/types'
import Card from './Card'
import Button from './Button'
import Badge from './Badge'

/**
 * @interface QuestaoCardProps
 * @description The props for the QuestaoCard component.
 * @description As props para o componente QuestaoCard.
 */
interface QuestaoCardProps {
  /**
   * @property {Questao} questao - The question object to display.
   * @property {Questao} questao - O objeto da questão a ser exibido.
   */
  questao: Questao
  /**
   * @function onResponder
   * @param {RespostaCorreta} resposta - The user's answer.
   * @description A callback function to be called when the user answers the question.
   * @description Uma função de callback a ser chamada quando o usuário responde a questão.
   */
  onResponder: (resposta: RespostaCorreta) => void
  /**
   * @property {RespostaCorreta | null} [respostaUsuario] - The user's answer to the question.
   * @property {RespostaCorreta | null} [respostaUsuario] - A resposta do usuário para a questão.
   */
  respostaUsuario?: RespostaCorreta | null
  /**
   * @property {boolean} mostrarFeedback - Whether to show feedback for the user's answer.
   * @property {boolean} mostrarFeedback - Se deve mostrar feedback para a resposta do usuário.
   */
  mostrarFeedback: boolean
}

/**
 * @function QuestaoCard
 * @description A component to display a question, handle user answers, and show feedback.
 * @param {QuestaoCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered question card component.
 */
/**
 * @function QuestaoCard
 * @description Um componente para exibir uma questão, lidar com as respostas do usuário e mostrar feedback.
 * @param {QuestaoCardProps} props - As props para o componente.
 * @returns {JSX.Element} O componente de card de questão renderizado.
 */
export default function QuestaoCard({
  questao,
  onResponder,
  respostaUsuario,
  mostrarFeedback,
}: QuestaoCardProps) {
  const [animacao, setAnimacao] = useState(false)

  useEffect(() => {
    setAnimacao(true)
    const timer = setTimeout(() => setAnimacao(false), 300)
    return () => clearTimeout(timer)
  }, [questao.id])

  const respostaCorreta = questao.resposta_correta
  const acertou = respostaUsuario === respostaCorreta

  // Função para determinar a classe do botão baseado no feedback
  const getButtonClass = (opcao: RespostaCorreta) => {
    if (!mostrarFeedback || !respostaUsuario) {
      return respostaUsuario === opcao ? 'ring-2 ring-primary-500' : ''
    }

    // Mostrar feedback
    if (opcao === respostaCorreta) {
      return 'bg-success hover:bg-green-600 text-white border-success'
    }

    if (opcao === respostaUsuario && !acertou) {
      return 'bg-error hover:bg-red-600 text-white border-error'
    }

    return 'opacity-50'
  }

  return (
    <Card
      padding="lg"
      className={`max-w-4xl mx-auto ${animacao ? 'animate-slide-in' : ''}`}
    >
      {/* Header com informações da questão */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="primary">{questao.materia}</Badge>
        <Badge variant="secondary">{questao.topico}</Badge>
        <Badge variant="secondary">{questao.banca}</Badge>
        {questao.ano && <Badge variant="secondary">Ano: {questao.ano}</Badge>}
        {questao.dificuldade && (
          <Badge
            variant={
              questao.dificuldade === 'fácil'
                ? 'success'
                : questao.dificuldade === 'média'
                ? 'warning'
                : 'error'
            }
          >
            {questao.dificuldade}
          </Badge>
        )}
      </div>

      {/* Enunciado da questão */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
          Questão
        </h2>
        <p className="text-base leading-relaxed text-secondary-800">
          {questao.enunciado}
        </p>
      </div>

      {/* Botões de resposta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => onResponder('CERTO')}
          disabled={mostrarFeedback}
          className={getButtonClass('CERTO')}
          aria-label="Marcar como Certo"
        >
          <span className="flex items-center justify-center gap-2">
            {mostrarFeedback && respostaCorreta === 'CERTO' && (
              <span className="text-2xl">✓</span>
            )}
            {mostrarFeedback &&
              respostaUsuario === 'CERTO' &&
              respostaCorreta !== 'CERTO' && (
                <span className="text-2xl">✗</span>
              )}
            CERTO
          </span>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => onResponder('ERRADO')}
          disabled={mostrarFeedback}
          className={getButtonClass('ERRADO')}
          aria-label="Marcar como Errado"
        >
          <span className="flex items-center justify-center gap-2">
            {mostrarFeedback && respostaCorreta === 'ERRADO' && (
              <span className="text-2xl">✓</span>
            )}
            {mostrarFeedback &&
              respostaUsuario === 'ERRADO' &&
              respostaCorreta !== 'ERRADO' && (
                <span className="text-2xl">✗</span>
              )}
            ERRADO
          </span>
        </Button>
      </div>

      {/* Feedback visual e justificativa */}
      {mostrarFeedback && respostaUsuario && (
        <div
          className={`
            p-6 rounded-lg border-2 animate-fade-in
            ${
              acertou
                ? 'bg-green-50 border-success text-green-900'
                : 'bg-red-50 border-error text-red-900'
            }
          `}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">{acertou ? '✓' : '✗'}</span>
            <div>
              <h3 className="font-bold text-lg mb-1">
                {acertou
                  ? 'Parabéns! Você acertou!'
                  : 'Ops! Resposta incorreta'}
              </h3>
              <p className="text-sm font-medium">
                Resposta correta: <strong>{respostaCorreta}</strong>
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Justificativa:</h4>
            <p className="text-sm leading-relaxed">
              {questao.justificativa_detalhada}
            </p>
          </div>

          {/* Flashcard resumo */}
          <div className="mt-4 p-4 bg-white rounded-lg border border-secondary-200">
            <h4 className="font-semibold mb-2 text-primary-700">
              💡 Resumo para Flashcard:
            </h4>
            <p className="text-sm text-secondary-700">
              {questao.flashcard_resumo}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
