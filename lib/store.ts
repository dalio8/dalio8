import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Questao,
  RespostaUsuario,
  Estatisticas,
  ProgressoMateria,
  Materia,
  RespostaCorreta
} from '@/types'
import { questoesMockadas } from '@/data/questoes-mockadas'

interface EstudoState {
  // Estado das questões
  questoes: Questao[]
  questaoAtualIndex: number
  questaoAtual: Questao | null

  // Estado das respostas
  respostas: RespostaUsuario[]
  respostaAtual: RespostaCorreta | null
  mostrarFeedback: boolean

  // Estatísticas e progresso
  estatisticas: Estatisticas

  // Ações
  inicializarQuestoes: () => void
  proximaQuestao: () => void
  voltarQuestao: () => void
  irParaQuestao: (index: number) => void
  responderQuestao: (resposta: RespostaCorreta) => void
  limparResposta: () => void
  calcularEstatisticas: () => void
  resetarProgresso: () => void
  filtrarPorMateria: (materia?: Materia) => void
}

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
          r => r.questao_id !== questaoAtual.id
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
        const total_acertos = respostas.filter(r => r.correto).length
        const total_erros = respostas.filter(r => !r.correto).length
        const percentual_geral = total_questoes_respondidas > 0
          ? (total_acertos / total_questoes_respondidas) * 100
          : 0

        // Calcular progresso por matéria
        const materias = Object.values(Materia)
        const por_materia: ProgressoMateria[] = materias.map(materia => {
          const questoesMateria = questoes.filter(q => q.materia === materia)
          const respostasMateria = respostas.filter(r => {
            const questao = questoes.find(q => q.id === r.questao_id)
            return questao?.materia === materia
          })

          const acertos = respostasMateria.filter(r => r.correto).length
          const erros = respostasMateria.filter(r => !r.correto).length
          const percentual = respostasMateria.length > 0
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
          }
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
          }
        })
      },

      // Filtrar questões por matéria
      filtrarPorMateria: (materia?: Materia) => {
        const questoesFiltradas = materia
          ? questoesMockadas.filter(q => q.materia === materia)
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
    }
  )
)
