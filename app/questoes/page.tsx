/**
 * @fileoverview The questions page of the application.
 * @fileoverview A página de questões da aplicação.
 */

'use client'

import { useEffect } from 'react'
import { useEstudoStore } from '@/lib/store'
import QuestaoCard from '@/components/QuestaoCard'
import Button from '@/components/Button'
import ProgressBar from '@/components/ProgressBar'

/**
 * @function QuestoesPage
 * @description The page for answering questions.
 * @returns {JSX.Element} The rendered questions page.
 */
/**
 * @function QuestoesPage
 * @description A página para responder questões.
 * @returns {JSX.Element} A página de questões renderizada.
 */
export default function QuestoesPage() {
  const {
    questoes,
    questaoAtual,
    questaoAtualIndex,
    respostaAtual,
    mostrarFeedback,
    estatisticas,
    inicializarQuestoes,
    proximaQuestao,
    voltarQuestao,
    responderQuestao,
  } = useEstudoStore()

  // Inicializar questões ao carregar a página
  useEffect(() => {
    if (questoes.length === 0) {
      inicializarQuestoes()
    }
  }, [questoes.length, inicializarQuestoes])

  if (!questaoAtual) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-secondary-600">Carregando questões...</p>
        </div>
      </div>
    )
  }

  const progresso = ((questaoAtualIndex + 1) / questoes.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra de progresso superior */}
      <div className="mb-8">
        <ProgressBar
          progress={progresso}
          label={`Questão ${questaoAtualIndex + 1} de ${questoes.length}`}
          showPercentage
          color="primary"
          size="md"
        />
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border border-secondary-200">
          <div className="text-sm text-secondary-600 mb-1">
            Total Respondidas
          </div>
          <div className="text-2xl font-bold text-primary-700">
            {estatisticas.total_questoes_respondidas}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-secondary-200">
          <div className="text-sm text-secondary-600 mb-1">Acertos</div>
          <div className="text-2xl font-bold text-success">
            {estatisticas.total_acertos}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-secondary-200">
          <div className="text-sm text-secondary-600 mb-1">Taxa de Acerto</div>
          <div className="text-2xl font-bold text-primary-700">
            {estatisticas.percentual_geral.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Card da questão */}
      <QuestaoCard
        questao={questaoAtual}
        onResponder={responderQuestao}
        respostaUsuario={respostaAtual}
        mostrarFeedback={mostrarFeedback}
      />

      {/* Navegação entre questões */}
      <div className="max-w-4xl mx-auto mt-8 flex justify-between items-center gap-4">
        <Button
          variant="secondary"
          onClick={voltarQuestao}
          disabled={questaoAtualIndex === 0}
          aria-label="Questão anterior"
        >
          ← Anterior
        </Button>

        <div className="text-sm text-secondary-600">
          {questaoAtualIndex + 1} / {questoes.length}
        </div>

        <Button
          variant="primary"
          onClick={proximaQuestao}
          disabled={questaoAtualIndex === questoes.length - 1}
          aria-label="Próxima questão"
        >
          Próxima →
        </Button>
      </div>

      {/* Mensagem final */}
      {questaoAtualIndex === questoes.length - 1 && mostrarFeedback && (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-primary-50 border-2 border-primary-300 rounded-lg text-center">
          <h3 className="text-xl font-bold text-primary-900 mb-2">
            🎉 Parabéns! Você completou todas as questões!
          </h3>
          <p className="text-secondary-700 mb-4">
            Continue praticando para melhorar seus resultados.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => (window.location.href = '/revisao')}
            >
              Ir para Revisão
            </Button>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = '/flashcards')}
            >
              Ver Flashcards
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
