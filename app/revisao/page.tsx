/**
 * @fileoverview The review page of the application.
 * @fileoverview A página de revisão da aplicação.
 */

'use client'

import { useEffect, useState } from 'react'
import { useEstudoStore } from '@/lib/store'
import { Materia } from '@/types'
import Card from '@/components/Card'
import Button from '@/components/Button'
import ProgressBar from '@/components/ProgressBar'
import Badge from '@/components/Badge'

/**
 * @function RevisaoPage
 * @description The page for reviewing statistics and progress.
 * @returns {JSX.Element} The rendered review page.
 */
/**
 * @function RevisaoPage
 * @description A página para revisar estatísticas e progresso.
 * @returns {JSX.Element} A página de revisão renderizada.
 */
export default function RevisaoPage() {
  const {
    questoes,
    estatisticas,
    inicializarQuestoes,
    filtrarPorMateria,
    resetarProgresso,
  } = useEstudoStore()

  const [materiaSelecionada, setMateriaSelecionada] = useState<Materia | null>(
    null,
  )

  useEffect(() => {
    if (questoes.length === 0) {
      inicializarQuestoes()
    }
  }, [questoes.length, inicializarQuestoes])

  const handleSelecionarMateria = (materia: Materia) => {
    setMateriaSelecionada(materia)
  }

  const handleIniciarEstudo = () => {
    if (materiaSelecionada) {
      filtrarPorMateria(materiaSelecionada)
    } else {
      filtrarPorMateria(undefined) // Todas as matérias
    }
    window.location.href = '/questoes'
  }

  const handleResetarProgresso = () => {
    if (
      confirm(
        'Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.',
      )
    ) {
      resetarProgresso()
      setMateriaSelecionada(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
          Área de Revisão
        </h1>
        <p className="text-secondary-600">
          Acompanhe seu progresso e escolha o que estudar
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <Card padding="lg" className="mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">
          Estatísticas Gerais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-700">
              {estatisticas.total_questoes_respondidas}
            </div>
            <div className="text-sm text-secondary-600 mt-2">
              Questões Respondidas
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-success">
              {estatisticas.total_acertos}
            </div>
            <div className="text-sm text-secondary-600 mt-2">Acertos</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-error">
              {estatisticas.total_erros}
            </div>
            <div className="text-sm text-secondary-600 mt-2">Erros</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-primary-700">
              {estatisticas.percentual_geral.toFixed(1)}%
            </div>
            <div className="text-sm text-secondary-600 mt-2">
              Taxa de Acerto
            </div>
          </div>
        </div>

        {/* Barra de progresso geral */}
        <ProgressBar
          progress={estatisticas.percentual_geral}
          label="Desempenho Geral"
          showPercentage
          color="primary"
          size="lg"
        />
      </Card>

      {/* Progresso por Matéria */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">
          Progresso por Matéria
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {estatisticas.por_materia.map((prog) => (
            <Card
              key={prog.materia}
              padding="lg"
              hover
              className={`
                cursor-pointer transition-all
                ${
                  materiaSelecionada === prog.materia
                    ? 'ring-2 ring-primary-500 shadow-lg'
                    : ''
                }
              `}
              onClick={() => handleSelecionarMateria(prog.materia)}
              role="button"
              tabIndex={0}
              aria-label={`Selecionar matéria ${prog.materia}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {prog.materia}
                    </h3>
                    {materiaSelecionada === prog.materia && (
                      <Badge variant="primary">Selecionada</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-secondary-600">Total: </span>
                      <span className="font-semibold">
                        {prog.total_questoes}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary-600">Respondidas: </span>
                      <span className="font-semibold">
                        {prog.questoes_respondidas}
                      </span>
                    </div>
                    <div>
                      <span className="text-success font-semibold">
                        ✓ {prog.acertos}
                      </span>
                    </div>
                    <div>
                      <span className="text-error font-semibold">
                        ✗ {prog.erros}
                      </span>
                    </div>
                  </div>

                  <ProgressBar
                    progress={prog.percentual_acerto}
                    showPercentage
                    color={
                      prog.percentual_acerto >= 70
                        ? 'success'
                        : prog.percentual_acerto >= 50
                          ? 'warning'
                          : 'error'
                    }
                    size="md"
                  />
                </div>

                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-primary-700">
                    {prog.percentual_acerto.toFixed(0)}%
                  </div>
                  <div className="text-xs text-secondary-600 mt-1">
                    Taxa de Acerto
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Ações */}
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            Ações de Estudo
          </h2>

          {materiaSelecionada && (
            <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-sm text-primary-900">
                📚 Matéria selecionada: <strong>{materiaSelecionada}</strong>
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" fullWidth onClick={handleIniciarEstudo}>
              {materiaSelecionada
                ? `Estudar ${materiaSelecionada}`
                : 'Estudar Todas as Matérias'}
            </Button>

            {materiaSelecionada && (
              <Button
                variant="secondary"
                onClick={() => setMateriaSelecionada(null)}
              >
                Limpar Seleção
              </Button>
            )}

            <Button variant="error" onClick={handleResetarProgresso}>
              Resetar Progresso
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-secondary-200">
            <p className="text-sm text-secondary-600 text-center">
              💡 Dica: Selecione uma matéria específica para focar seus estudos
              ou estude todas de uma vez!
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
