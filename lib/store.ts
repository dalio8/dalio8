/**
 * @fileoverview Zustand store for managing the application's study state.
 * @fileoverview Store Zustand para gerenciar o estado de estudo da aplicação.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Questao,
  RespostaUsuario,
  Estatisticas,
  ProgressoMateria,
  Materia,
  RespostaCorreta,
} from '@/types'
import { questoesMockadas } from '@/data/questoes-mockadas'

/**
 * @interface EstudoState
 * @description Represents the state and actions of the study store.
 * @description Representa o estado e as ações do store de estudo.
 */
interface EstudoState {
  /**
   * @property {Questao[]} questoes - The list of questions.
   * @property {Questao[]} questoes - A lista de questões.
   */
  questoes: Questao[]
  /**
   * @property {number} questaoAtualIndex - The index of the current question.
   * @property {number} questaoAtualIndex - O índice da questão atual.
   */
  questaoAtualIndex: number
  /**
   * @property {Questao | null} questaoAtual - The current question object.
   * @property {Questao | null} questaoAtual - O objeto da questão atual.
   */
  questaoAtual: Questao | null

  /**
   * @property {RespostaUsuario[]} respostas - The list of user's answers.
   * @property {RespostaUsuario[]} respostas - A lista de respostas do usuário.
   */
  respostas: RespostaUsuario[]
  /**
   * @property {RespostaCorreta | null} respostaAtual - The current selected answer.
   * @property {RespostaCorreta | null} respostaAtual - A resposta atual selecionada.
   */
  respostaAtual: RespostaCorreta | null
  /**
   * @property {boolean} mostrarFeedback - Flag to show/hide feedback.
   * @property {boolean} mostrarFeedback - Flag para mostrar/ocultar feedback.
   */
  mostrarFeedback: boolean

  /**
   * @property {Estatisticas} estatisticas - The user's statistics.
   * @property {Estatisticas} estatisticas - As estatísticas do usuário.
   */
  estatisticas: Estatisticas

  /**
   * @function inicializarQuestoes
   * @description Initializes the questions from the mock data.
   * @description Inicializa as questões a partir dos dados mockados.
   */
  inicializarQuestoes: () => void
  /**
   * @function proximaQuestao
   * @description Moves to the next question.
   * @description Avança para a próxima questão.
   */
  proximaQuestao: () => void
  /**
   * @function voltarQuestao
   * @description Moves to the previous question.
   * @description Volta para a questão anterior.
   */
  voltarQuestao: () => void
  /**
   * @function irParaQuestao
   * @param {number} index - The index of the question to go to.
   * @description Navigates to a specific question.
   * @description Navega para uma questão específica.
   */
  irParaQuestao: (index: number) => void
  /**
   * @function responderQuestao
   * @param {RespostaCorreta} resposta - The user's answer.
   * @description Submits an answer for the current question.
   * @description Submete uma resposta para a questão atual.
   */
  responderQuestao: (resposta: RespostaCorreta) => void
  /**
   * @function limparResposta
   * @description Clears the current answer.
   * @description Limpa a resposta atual.
   */
  limparResposta: () => void
  /**
   * @function calcularEstatisticas
   * @description Calculates and updates the statistics.
   * @description Calcula e atualiza as estatísticas.
   */
  calcularEstatisticas: () => void
  /**
   * @function resetarProgresso
   * @description Resets the user's progress.
   * @description Reseta o progresso do usuário.
   */
  resetarProgresso: () => void
  /**
   * @function filtrarPorMateria
   * @param {Materia} [materia] - The subject to filter by.
   * @description Filters the questions by subject.
   * @description Filtra as questões por matéria.
   */
  filtrarPorMateria: (materia?: Materia) => void
}

/**
 * @constant useEstudoStore
 * @description Zustand store for managing study state with persistence.
 * @description Store Zustand para gerenciar o estado de estudo com persistência.
 */
export const useEstudoStore = create<EstudoState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      questoes: [],
      questaoAtualIndex: 0,
      questaoAtual: null,
      respostas: [],
      respostaAtual: null,
      mostrarFeedback: false,
      estatisticas: {
        total_questoes_respondidas: 0,
        total_acertos: 0,
        total_erros: 0,
        percentual_geral: 0,
        por_materia: [],
      },

      // Inicializar questões
      inicializarQuestoes: () => {
        set({
          questoes: questoesMockadas,
          questaoAtual: questoesMockadas[0] || null,
          questaoAtualIndex: 0,
        })
      },

      // Navegar para próxima questão
      proximaQuestao: () => {
        const { questoes, questaoAtualIndex } = get()
        const novoIndex = Math.min(questaoAtualIndex + 1, questoes.length - 1)

        set({
          questaoAtualIndex: novoIndex,
          questaoAtual: questoes[novoIndex],
          respostaAtual: null,
          mostrarFeedback: false,
        })
      },

      // Voltar para questão anterior
      voltarQuestao: () => {
        const { questoes, questaoAtualIndex } = get()
        const novoIndex = Math.max(questaoAtualIndex - 1, 0)

        set({
          questaoAtualIndex: novoIndex,
          questaoAtual: questoes[novoIndex],
          respostaAtual: null,
          mostrarFeedback: false,
        })
      },

      // Ir para questão específica
      irParaQuestao: (index: number) => {
        const { questoes } = get()
        if (index >= 0 && index < questoes.length) {
          set({
            questaoAtualIndex: index,
            questaoAtual: questoes[index],
            respostaAtual: null,
            mostrarFeedback: false,
          })
        }
      },

      // Responder questão
      responderQuestao: (resposta: RespostaCorreta) => {
        const { questaoAtual, respostas } = get()

        if (!questaoAtual) return

        const correto = resposta === questaoAtual.resposta_correta

        const novaResposta: RespostaUsuario = {
          questao_id: questaoAtual.id,
          resposta_escolhida: resposta,
          correto,
          data: new Date(),
        }

        // Remover resposta anterior para esta questão (se existir)
        const respostasFiltradas = respostas.filter(
          (r) => r.questao_id !== questaoAtual.id,
        )

        set({
          respostaAtual: resposta,
          mostrarFeedback: true,
          respostas: [...respostasFiltradas, novaResposta],
        })

        // Recalcular estatísticas
        get().calcularEstatisticas()
      },

      // Limpar resposta atual
      limparResposta: () => {
        set({
          respostaAtual: null,
          mostrarFeedback: false,
        })
      },

      // Calcular estatísticas
      calcularEstatisticas: () => {
        const { respostas, questoes } = get()

        const total_questoes_respondidas = respostas.length
        const total_acertos = respostas.filter((r) => r.correto).length
        const total_erros = respostas.filter((r) => !r.correto).length
        const percentual_geral =
          total_questoes_respondidas > 0
            ? (total_acertos / total_questoes_respondidas) * 100
            : 0

        // Calcular progresso por matéria
        const materias = Object.values(Materia)
        const por_materia: ProgressoMateria[] = materias.map((materia) => {
          const questoesMateria = questoes.filter((q) => q.materia === materia)
          const respostasMateria = respostas.filter((r) => {
            const questao = questoes.find((q) => q.id === r.questao_id)
            return questao?.materia === materia
          })

          const acertos = respostasMateria.filter((r) => r.correto).length
          const erros = respostasMateria.filter((r) => !r.correto).length
          const percentual =
            respostasMateria.length > 0
              ? (acertos / respostasMateria.length) * 100
              : 0

          return {
            materia,
            total_questoes: questoesMateria.length,
            questoes_respondidas: respostasMateria.length,
            acertos,
            erros,
            percentual_acerto: percentual,
          }
        })

        set({
          estatisticas: {
            total_questoes_respondidas,
            total_acertos,
            total_erros,
            percentual_geral,
            por_materia,
            ultima_sessao: new Date(),
          },
        })
      },

      // Resetar progresso
      resetarProgresso: () => {
        set({
          respostas: [],
          respostaAtual: null,
          mostrarFeedback: false,
          questaoAtualIndex: 0,
          questaoAtual: questoesMockadas[0] || null,
          estatisticas: {
            total_questoes_respondidas: 0,
            total_acertos: 0,
            total_erros: 0,
            percentual_geral: 0,
            por_materia: [],
          },
        })
      },

      // Filtrar questões por matéria
      filtrarPorMateria: (materia?: Materia) => {
        const questoesFiltradas = materia
          ? questoesMockadas.filter((q) => q.materia === materia)
          : questoesMockadas

        set({
          questoes: questoesFiltradas,
          questaoAtualIndex: 0,
          questaoAtual: questoesFiltradas[0] || null,
          respostaAtual: null,
          mostrarFeedback: false,
        })
      },
    }),
    {
      name: 'tcu-study-storage', // Nome da chave no localStorage
      partialize: (state) => ({
        respostas: state.respostas,
        estatisticas: state.estatisticas,
      }), // Persistir apenas respostas e estatísticas
    },
  ),
)
