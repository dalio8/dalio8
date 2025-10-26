/**
 * Tipos e interfaces para o sistema de estudos TCU
 */

// Enumeração de matérias disponíveis
export enum Materia {
  CONTROLE_EXTERNO = 'Controle Externo',
  DIREITO_CONSTITUCIONAL = 'Direito Constitucional',
  AFO = 'Administração Financeira e Orçamentária',
  DIREITO_ADMINISTRATIVO = 'Direito Administrativo',
  AUDITORIA = 'Auditoria Governamental',
}

// Tipo para resposta (Certo ou Errado - padrão CEBRASPE)
export type RespostaCorreta = 'CERTO' | 'ERRADO'

// Tipo para status da resposta do usuário
export type StatusResposta = 'correto' | 'incorreto' | null

// Interface para tópico dentro de uma matéria
export interface Topico {
  id: string
  nome: string
  descricao?: string
}

// Interface principal para Questão
export interface Questao {
  id: string
  materia: Materia
  topico: string
  enunciado: string
  resposta_correta: RespostaCorreta
  justificativa_detalhada: string
  flashcard_resumo: string
  ano?: number
  banca: 'CEBRASPE' | 'CESPE'
  dificuldade?: 'fácil' | 'média' | 'difícil'
  tags?: string[]
}

// Interface para Flashcard
export interface Flashcard {
  id: string
  questao_id: string
  frente: string // Termo/pergunta
  verso: string // Explicação/resposta
  materia: Materia
  topico: string
}

// Interface para progresso do usuário por matéria
export interface ProgressoMateria {
  materia: Materia
  total_questoes: number
  questoes_respondidas: number
  acertos: number
  erros: number
  percentual_acerto: number
}

// Interface para estatísticas gerais
export interface Estatisticas {
  total_questoes_respondidas: number
  total_acertos: number
  total_erros: number
  percentual_geral: number
  por_materia: ProgressoMateria[]
  ultima_sessao?: Date
}

// Interface para resposta do usuário (histórico)
export interface RespostaUsuario {
  questao_id: string
  resposta_escolhida: RespostaCorreta
  correto: boolean
  data: Date
  tempo_resposta?: number // em segundos
}

// Interface para sessão de estudo
export interface SessaoEstudo {
  id: string
  data_inicio: Date
  data_fim?: Date
  questoes_ids: string[]
  respostas: RespostaUsuario[]
  materia_foco?: Materia
}

// Tipo para filtro de questões
export interface FiltroQuestoes {
  materia?: Materia
  topico?: string
  dificuldade?: 'fácil' | 'média' | 'difícil'
  apenas_nao_respondidas?: boolean
  apenas_erradas?: boolean
}

// Interface para dados de revisão
export interface ItemRevisao {
  questao: Questao
  ultima_resposta?: RespostaUsuario
  prioridade: 'alta' | 'média' | 'baixa'
  proxima_revisao?: Date
}
