/**
 * @fileoverview Mock data for the questions in the TCU study system.
 * @fileoverview Dados mockados para as questões do sistema de estudos TCU.
 */

import { Flashcard, Questao, Materia } from '@/types'

/**
 * @const {Questao[]}
 * @description An array of mock questions in the CEBRASPE format (Right or Wrong).
 * It contains a mix of questions from different subjects.
 * @description Um array de questões mockadas no formato CEBRASPE (Certo ou Errado).
 * Contém uma mistura de questões de diferentes matérias.
 */
export const questoesMockadas: Questao[] = [
  // QUESTÃO 1 - CERTA - Controle Externo
  {
    id: 'q001',
    materia: Materia.CONTROLE_EXTERNO,
    topico: 'Competências do TCU',
    enunciado:
      'De acordo com a Constituição Federal, compete ao Tribunal de Contas da União apreciar, para fins de registro, a legalidade dos atos de admissão de pessoal, a qualquer título, na administração direta e indireta, incluídas as fundações instituídas e mantidas pelo Poder Público, excetuadas as nomeações para cargo de provimento em comissão.',
    resposta_correta: 'CERTO',
    justificativa_detalhada:
      'A assertiva está CORRETA e reproduz fielmente o art. 71, III, da Constituição Federal. O TCU tem competência para apreciar a legalidade dos atos de admissão de pessoal na administração direta e indireta, exceto as nomeações para cargos em comissão, que não passam pelo controle prévio do Tribunal. Esta é uma importante atribuição constitucional do TCU no exercício do controle externo.',
    flashcard_resumo:
      'TCU aprecia legalidade de atos de admissão de pessoal (exceto cargos em comissão) - Art. 71, III, CF/88',
    ano: 2024,
    banca: 'CEBRASPE',
    dificuldade: 'média',
    tags: ['TCU', 'Competências', 'Admissão de Pessoal', 'CF/88'],
  },

  // QUESTÃO 2 - ERRADA - Direito Constitucional
  {
    id: 'q002',
    materia: Materia.DIREITO_CONSTITUCIONAL,
    topico: 'Poder Constituinte Derivado',
    enunciado:
      'O poder constituinte derivado reformador é ilimitado, podendo alterar qualquer dispositivo da Constituição Federal, inclusive as cláusulas pétreas, desde que observado o procedimento qualificado de aprovação de emendas constitucionais.',
    resposta_correta: 'ERRADO',
    justificativa_detalhada:
      'A assertiva está ERRADA. O poder constituinte derivado reformador é LIMITADO, não podendo alterar as cláusulas pétreas previstas no art. 60, §4º da CF/88 (forma federativa de Estado, voto direto, secreto, universal e periódico, separação dos Poderes e direitos e garantias individuais). Além das limitações materiais (cláusulas pétreas), há também limitações circunstanciais (não pode haver emenda durante intervenção federal, estado de defesa ou estado de sítio) e formais/procedimentais (quórum qualificado, dois turnos, 3/5 dos votos).',
    flashcard_resumo:
      'Poder Constituinte Derivado é LIMITADO: não pode alterar cláusulas pétreas (art. 60, §4º, CF/88)',
    ano: 2024,
    banca: 'CEBRASPE',
    dificuldade: 'média',
    tags: ['Poder Constituinte', 'Cláusulas Pétreas', 'Emendas Constitucionais'],
  },

  // QUESTÃO 3 - CERTA - AFO
  {
    id: 'q003',
    materia: Materia.AFO,
    topico: 'Lei de Diretrizes Orçamentárias',
    enunciado:
      'A Lei de Diretrizes Orçamentárias compreenderá as metas e prioridades da administração pública federal, incluindo as despesas de capital para o exercício financeiro subsequente, orientará a elaboração da lei orçamentária anual e disporá sobre as alterações na legislação tributária.',
    resposta_correta: 'CERTO',
    justificativa_detalhada:
      'A assertiva está CORRETA e reproduz o art. 165, §2º da Constituição Federal. A LDO tem três funções principais: 1) estabelecer metas e prioridades (incluindo despesas de capital); 2) orientar a elaboração da LOA; e 3) dispor sobre alterações na legislação tributária. A LDO é a lei que faz a ponte entre o PPA (planejamento de longo prazo - 4 anos) e a LOA (execução anual do orçamento), sendo aprovada anualmente.',
    flashcard_resumo:
      'LDO: metas e prioridades + orienta LOA + alterações tributárias (Art. 165, §2º, CF/88)',
    ano: 2024,
    banca: 'CEBRASPE',
    dificuldade: 'fácil',
    tags: ['LDO', 'Orçamento Público', 'CF/88'],
  },

  // QUESTÃO 4 - CERTA - Direito Constitucional
  {
    id: 'q004',
    materia: Materia.DIREITO_CONSTITUCIONAL,
    topico: 'Funções Essenciais à Justiça - Ministério Público',
    enunciado:
      'São funções institucionais do Ministério Público promover o inquérito civil e a ação civil pública, para a proteção do patrimônio público e social, do meio ambiente e de outros interesses difusos e coletivos.',
    resposta_correta: 'CERTO',
    justificativa_detalhada:
      'A assertiva está CORRETA, conforme o art. 129, III da Constituição Federal. O Ministério Público tem como uma de suas principais funções institucionais a promoção do inquérito civil (procedimento investigatório administrativo) e da ação civil pública (instrumento judicial) para proteção de interesses difusos, coletivos e individuais homogêneos, incluindo patrimônio público e social, meio ambiente, consumidor, entre outros. Esta é uma atribuição exclusiva do MP na esfera cível.',
    flashcard_resumo:
      'MP promove inquérito civil e ação civil pública para proteção de interesses difusos e coletivos (Art. 129, III, CF/88)',
    ano: 2024,
    banca: 'CEBRASPE',
    dificuldade: 'fácil',
    tags: ['Ministério Público', 'Ação Civil Pública', 'Inquérito Civil'],
  },

  // QUESTÃO 5 - ERRADA - Controle Externo
  {
    id: 'q005',
    materia: Materia.CONTROLE_EXTERNO,
    topico: 'Julgamento de Contas',
    enunciado:
      'As decisões do Tribunal de Contas da União que resultem em imputação de débito ou multa têm eficácia de sentença judicial, não sendo necessária a propositura de ação de execução pelo Ministério Público ou pela Fazenda Pública para sua cobrança.',
    resposta_correta: 'ERRADO',
    justificativa_detalhada:
      'A assertiva está ERRADA. Embora as decisões do TCU que imputam débito ou multa tenham eficácia de título executivo (art. 71, §3º da CF/88), a cobrança NÃO é automática. É necessária a propositura de AÇÃO DE EXECUÇÃO pela Fazenda Pública (e não pelo Ministério Público) para efetivar a cobrança judicial. O TCU apenas JULGA as contas e determina o débito/multa, mas não executa. A execução cabe à Advocacia-Geral da União ou às Procuradorias dos órgãos interessados.',
    flashcard_resumo:
      'Decisões TCU com débito/multa = título executivo, mas PRECISA de ação de execução pela Fazenda Pública (Art. 71, §3º, CF/88)',
    ano: 2024,
    banca: 'CEBRASPE',
    dificuldade: 'média',
    tags: ['TCU', 'Decisões', 'Título Executivo', 'Execução'],
  },
]

/**
 * @typedef {object} FiltrosBusca
 * @property {Materia} [materia] - The subject to filter by.
 * @property {string} [topico] - The topic to filter by.
 * @property {'fácil' | 'média' | 'difícil'} [dificuldade] - The difficulty to filter by.
 */

/**
 * @typedef {object} FiltrosBusca
 * @property {Materia} [materia] - A matéria para filtrar.
 * @property {string} [topico] - O tópico para filtrar.
 * @property {'fácil' | 'média' | 'difícil'} [dificuldade] - A dificuldade para filtrar.
 */

/**
 * @function buscarQuestoes
 * @description A helper function to search for questions based on filters.
 * @param {FiltrosBusca} [filtros] - The filters to apply.
 * @returns {Questao[]} An array of questions that match the filters.
 */
/**
 * @function buscarQuestoes
 * @description Uma função auxiliar para buscar questões com base em filtros.
 * @param {FiltrosBusca} [filtros] - Os filtros a serem aplicados.
 * @returns {Questao[]} Um array de questões que correspondem aos filtros.
 */
export function buscarQuestoes(filtros?: {
  materia?: Materia
  topico?: string
  dificuldade?: 'fácil' | 'média' | 'difícil'
}): Questao[] {
  let resultado = [...questoesMockadas]

  if (filtros?.materia) {
    resultado = resultado.filter((q) => q.materia === filtros.materia)
  }

  if (filtros?.topico) {
    resultado = resultado.filter((q) => q.topico === filtros.topico)
  }

  if (filtros?.dificuldade) {
    resultado = resultado.filter((q) => q.dificuldade === filtros.dificuldade)
  }

  return resultado
}

/**
 * @function gerarFlashcards
 * @description Generates flashcards automatically from the mock questions.
 * @returns {Flashcard[]} An array of generated flashcards.
 */
/**
 * @function gerarFlashcards
 * @description Gera flashcards automaticamente a partir das questões mockadas.
 * @returns {Flashcard[]} Um array de flashcards gerados.
 */
export function gerarFlashcards(): Flashcard[] {
  return questoesMockadas.map((q) => ({
    id: `fc-${q.id}`,
    questao_id: q.id,
    frente: q.enunciado.substring(0, 150) + '...', // Termo resumido
    verso: q.flashcard_resumo,
    materia: q.materia,
    topico: q.topico,
  }))
}
