/**
 * @fileoverview Defines the types and interfaces for the TCU study system.
 * @fileoverview Define os tipos e interfaces para o sistema de estudos TCU.
 */

/**
 * @enum {string}
 * @description Available subjects in the system.
 * @description Matérias disponíveis no sistema.
 */
export enum Materia {
  /** External Control */
  CONTROLE_EXTERNO = 'Controle Externo',
  /** Constitutional Law */
  DIREITO_CONSTITUCIONAL = 'Direito Constitucional',
  /** Financial and Budgetary Administration */
  AFO = 'Administração Financeira e Orçamentária',
  /** Administrative Law */
  DIREITO_ADMINISTRATIVO = 'Direito Administrativo',
  /** Government Auditing */
  AUDITORIA = 'Auditoria Governamental',
}

/**
 * @typedef {'CERTO' | 'ERRADO'} RespostaCorreta
 * @description Represents the correct answer type (Right or Wrong - CEBRASPE standard).
 * @description Representa o tipo de resposta correta (Certo ou Errado - padrão CEBRASPE).
 */
export type RespostaCorreta = 'CERTO' | 'ERRADO'

/**
 * @typedef {'correto' | 'incorreto' | null} StatusResposta
 * @description Represents the status of the user's answer.
 * @description Representa o status da resposta do usuário.
 */
export type StatusResposta = 'correto' | 'incorreto' | null

/**
 * @interface Topico
 * @description Represents a topic within a subject.
 * @description Representa um tópico dentro de uma matéria.
 */
export interface Topico {
  /**
   * @property {string} id - The unique identifier for the topic.
   * @property {string} id - O identificador único para o tópico.
   */
  id: string
  /**
   * @property {string} nome - The name of the topic.
   * @property {string} nome - O nome do tópico.
   */
  nome: string
  /**
   * @property {string} [descricao] - An optional description of the topic.
   * @property {string} [descricao] - Uma descrição opcional do tópico.
   */
  descricao?: string
}

/**
 * @interface Questao
 * @description Represents a question in the system.
 * @description Representa uma questão no sistema.
 */
export interface Questao {
  /**
   * @property {string} id - The unique identifier for the question.
   * @property {string} id - O identificador único para a questão.
   */
  id: string
  /**
   * @property {Materia} materia - The subject of the question.
   * @property {Materia} materia - A matéria da questão.
   */
  materia: Materia
  /**
   * @property {string} topico - The topic of the question.
   * @property {string} topico - O tópico da questão.
   */
  topico: string
  /**
   * @property {string} enunciado - The statement of the question.
   * @property {string} enunciado - O enunciado da questão.
   */
  enunciado: string
  /**
   * @property {RespostaCorreta} resposta_correta - The correct answer to the question.
   * @property {RespostaCorreta} resposta_correta - A resposta correta da questão.
   */
  resposta_correta: RespostaCorreta
  /**
   * @property {string} justificativa_detalhada - The detailed justification for the answer.
   * @property {string} justificativa_detalhada - A justificativa detalhada para a resposta.
   */
  justificativa_detalhada: string
  /**
   * @property {string} flashcard_resumo - A summary for the flashcard.
   * @property {string} flashcard_resumo - Um resumo para o flashcard.
   */
  flashcard_resumo: string
  /**
   * @property {number} [ano] - The year the question was created.
   * @property {number} [ano] - O ano em que a questão foi criada.
   */
  ano?: number
  /**
   * @property {'CEBRASPE' | 'CESPE'} banca - The examination board.
   * @property {'CEBRASPE' | 'CESPE'} banca - A banca examinadora.
   */
  banca: 'CEBRASPE' | 'CESPE'
  /**
   * @property {'fácil' | 'média' | 'difícil'} [dificuldade] - The difficulty level of the question.
   * @property {'fácil' | 'média' | 'difícil'} [dificuldade] - O nível de dificuldade da questão.
   */
  dificuldade?: 'fácil' | 'média' | 'difícil'
  /**
   * @property {string[]} [tags] - Optional tags for the question.
   * @property {string[]} [tags] - Tags opcionais para a questão.
   */
  tags?: string[]
}

/**
 * @interface Flashcard
 * @description Represents a flashcard.
 * @description Representa um flashcard.
 */
export interface Flashcard {
  /**
   * @property {string} id - The unique identifier for the flashcard.
   * @property {string} id - O identificador único para o flashcard.
   */
  id: string
  /**
   * @property {string} questao_id - The ID of the related question.
   * @property {string} questao_id - O ID da questão relacionada.
   */
  questao_id: string
  /**
   * @property {string} frente - The front of the flashcard (term/question).
   * @property {string} frente - A frente do flashcard (termo/pergunta).
   */
  frente: string // Termo/pergunta
  /**
   * @property {string} verso - The back of the flashcard (explanation/answer).
   * @property {string} verso - O verso do flashcard (explicação/resposta).
   */
  verso: string // Explicação/resposta
  /**
   * @property {Materia} materia - The subject of the flashcard.
   * @property {Materia} materia - A matéria do flashcard.
   */
  materia: Materia
  /**
   * @property {string} topico - The topic of the flashcard.
   * @property {string} topico - O tópico do flashcard.
   */
  topico: string
}

/**
 * @interface ProgressoMateria
 * @description Represents the user's progress in a subject.
 * @description Representa o progresso do usuário em uma matéria.
 */
export interface ProgressoMateria {
  /**
   * @property {Materia} materia - The subject.
   * @property {Materia} materia - A matéria.
   */
  materia: Materia
  /**
   * @property {number} total_questoes - The total number of questions for the subject.
   * @property {number} total_questoes - O número total de questões da matéria.
   */
  total_questoes: number
  /**
   * @property {number} questoes_respondidas - The number of questions answered by the user.
   * @property {number} questoes_respondidas - O número de questões respondidas pelo usuário.
   */
  questoes_respondidas: number
  /**
   * @property {number} acertos - The number of correct answers.
   * @property {number} acertos - O número de acertos.
   */
  acertos: number
  /**
   * @property {number} erros - The number of incorrect answers.
   * @property {number} erros - O número de erros.
   */
  erros: number
  /**
   * @property {number} percentual_acerto - The percentage of correct answers.
   * @property {number} percentual_acerto - O percentual de acertos.
   */
  percentual_acerto: number
}

/**
 * @interface Estatisticas
 * @description Represents the user's overall statistics.
 * @description Representa as estatísticas gerais do usuário.
 */
export interface Estatisticas {
  /**
   * @property {number} total_questoes_respondidas - The total number of questions answered.
   * @property {number} total_questoes_respondidas - O número total de questões respondidas.
   */
  total_questoes_respondidas: number
  /**
   * @property {number} total_acertos - The total number of correct answers.
   * @property {number} total_acertos - O número total de acertos.
   */
  total_acertos: number
  /**
   * @property {number} total_erros - The total number of incorrect answers.
   * @property {number} total_erros - O número total de erros.
   */
  total_erros: number
  /**
   * @property {number} percentual_geral - The overall percentage of correct answers.
   * @property {number} percentual_geral - O percentual geral de acertos.
   */
  percentual_geral: number
  /**
   * @property {ProgressoMateria[]} por_materia - The progress per subject.
   * @property {ProgressoMateria[]} por_materia - O progresso por matéria.
   */
  por_materia: ProgressoMateria[]
  /**
   * @property {Date} [ultima_sessao] - The date of the last session.
   * @property {Date} [ultima_sessao] - A data da última sessão.
   */
  ultima_sessao?: Date
}

/**
 * @interface RespostaUsuario
 * @description Represents a user's answer to a question (history).
 * @description Representa a resposta de um usuário a uma questão (histórico).
 */
export interface RespostaUsuario {
  /**
   * @property {string} questao_id - The ID of the question.
   * @property {string} questao_id - O ID da questão.
   */
  questao_id: string
  /**
   * @property {RespostaCorreta} resposta_escolhida - The answer chosen by the user.
   * @property {RespostaCorreta} resposta_escolhida - A resposta escolhida pelo usuário.
   */
  resposta_escolhida: RespostaCorreta
  /**
   * @property {boolean} correto - Whether the answer was correct.
   * @property {boolean} correto - Se a resposta foi correta.
   */
  correto: boolean
  /**
   * @property {Date} data - The date of the answer.
   * @property {Date} data - A data da resposta.
   */
  data: Date
  /**
   * @property {number} [tempo_resposta] - The response time in seconds.
   * @property {number} [tempo_resposta] - O tempo de resposta em segundos.
   */
  tempo_resposta?: number // em segundos
}

/**
 * @interface SessaoEstudo
 * @description Represents a study session.
 * @description Representa uma sessão de estudo.
 */
export interface SessaoEstudo {
  /**
   * @property {string} id - The unique identifier for the session.
   * @property {string} id - O identificador único para a sessão.
   */
  id: string
  /**
   * @property {Date} data_inicio - The start date of the session.
   * @property {Date} data_inicio - A data de início da sessão.
   */
  data_inicio: Date
  /**
   * @property {Date} [data_fim] - The end date of the session.
   * @property {Date} [data_fim] - A data de fim da sessão.
   */
  data_fim?: Date
  /**
   * @property {string[]} questoes_ids - The IDs of the questions in the session.
   * @property {string[]} questoes_ids - Os IDs das questões na sessão.
   */
  questoes_ids: string[]
  /**
   * @property {RespostaUsuario[]} respostas - The user's answers in the session.
   * @property {RespostaUsuario[]} respostas - As respostas do usuário na sessão.
   */
  respostas: RespostaUsuario[]
  /**
   * @property {Materia} [materia_foco] - The focus subject of the session.
   * @property {Materia} [materia_foco] - A matéria de foco da sessão.
   */
  materia_foco?: Materia
}

/**
 * @interface FiltroQuestoes
 * @description Represents a filter for questions.
 * @description Representa um filtro para questões.
 */
export interface FiltroQuestoes {
  /**
   * @property {Materia} [materia] - The subject to filter by.
   * @property {Materia} [materia] - A matéria para filtrar.
   */
  materia?: Materia
  /**
   * @property {string} [topico] - The topic to filter by.
   * @property {string} [topico] - O tópico para filtrar.
   */
  topico?: string
  /**
   * @property {'fácil' | 'média' | 'difícil'} [dificuldade] - The difficulty to filter by.
   * @property {'fácil' | 'média' | 'difícil'} [dificuldade] - A dificuldade para filtrar.
   */
  dificuldade?: 'fácil' | 'média' | 'difícil'
  /**
   * @property {boolean} [apenas_nao_respondidas] - Whether to show only unanswered questions.
   * @property {boolean} [apenas_nao_respondidas] - Se deve mostrar apenas questões não respondidas.
   */
  apenas_nao_respondidas?: boolean
  /**
   * @property {boolean} [apenas_erradas] - Whether to show only incorrectly answered questions.
   * @property {boolean} [apenas_erradas] - Se deve mostrar apenas questões respondidas incorretamente.
   */
  apenas_erradas?: boolean
}

/**
 * @interface ItemRevisao
 * @description Represents a review item.
 * @description Representa um item de revisão.
 */
export interface ItemRevisao {
  /**
   * @property {Questao} questao - The question to be reviewed.
   * @property {Questao} questao - A questão a ser revisada.
   */
  questao: Questao
  /**
   * @property {RespostaUsuario} [ultima_resposta] - The last answer given by the user.
   * @property {RespostaUsuario} [ultima_resposta] - A última resposta dada pelo usuário.
   */
  ultima_resposta?: RespostaUsuario
  /**
   * @property {'alta' | 'média' | 'baixa'} prioridade - The review priority.
   * @property {'alta' | 'média' | 'baixa'} prioridade - A prioridade de revisão.
   */
  prioridade: 'alta' | 'média' | 'baixa'
  /**
   * @property {Date} [proxima_revisao] - The date of the next review.
   * @property {Date} [proxima_revisao] - A data da próxima revisão.
   */
  proxima_revisao?: Date
}
