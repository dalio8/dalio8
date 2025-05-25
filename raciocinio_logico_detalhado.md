# Detalhamento dos Subtópicos de RACIOCÍNIO LÓGICO do Edital

## 1. Estruturas lógicas.

*   **Explicação:** Refere-se aos componentes fundamentais do pensamento lógico e à organização de ideias para formar argumentos válidos. Inclui a compreensão de proposições (sentenças V ou F), conectivos lógicos (e, ou, se...então, etc.), quantificadores (todo, algum) e a estrutura de argumentos (premissas levando a uma conclusão). A validade de um argumento depende da forma lógica, não necessariamente da verdade das premissas.
*   **Exemplo:**
    *   Premissa 1: Se o alarme toca (p), então há um problema (q). (p → q)
    *   Premissa 2: O alarme toca (p).
    *   Conclusão: Logo, há um problema (q).

## 2. Lógica de argumentação: analogias, inferências, deduções e conclusões.

*   **Explicação:** Foca nos processos de raciocínio para construir e avaliar argumentos.
    *   **Analogias:** Raciocínio baseado em semelhanças entre diferentes situações para inferir outras semelhanças. A força depende da relevância das semelhanças.
        *   Ex: "Assim como o motor de um carro precisa de manutenção para funcionar bem, o corpo humano também precisa de cuidados para se manter saudável."
    *   **Inferências:** Processo de chegar a uma proposição (conclusão) a partir de premissas.
    *   **Deduções:** Tipo de inferência onde, se as premissas são verdadeiras, a conclusão é *necessariamente* verdadeira. Parte do geral para o específico.
        *   Ex: "Todos os homens são mortais. Sócrates é homem. Logo, Sócrates é mortal."
    *   **Induções:** Tipo de inferência onde as premissas fornecem forte evidência para a conclusão, mas não a garantem. Parte do específico para o geral. A conclusão é provável.
        *   Ex: "Observei 100 corvos e todos eram pretos. Logo, todos os corvos são pretos." (Conclusão provável, mas não garantida).
    *   **Conclusões:** Proposição final de um argumento, sustentada pelas premissas.

## 3. Lógica sentencial (ou proposicional).

*   **Explicação:** Ramo da lógica que estuda as relações entre proposições e como são combinadas por conectivos lógicos, focando no valor de verdade (V/F) das proposições compostas.

    *   **3.1 Proposições simples e compostas.**
        *   **Simples (Atômicas):** Expressam uma única ideia, não contêm outras proposições. (Ex: "p: O dia está ensolarado.")
        *   **Compostas (Moleculares):** Formadas pela combinação de proposições simples com conectivos lógicos. (Ex: "p ∧ q: O dia está ensolarado E eu vou à praia.")

    *   **3.2 Tabelas verdade.**
        *   **Explicação:** Mostram o valor de verdade (V/F) de uma proposição composta para todas as combinações possíveis de valores de verdade de suas componentes.
        *   **Conectivos Principais:**
            *   **Negação (¬p):** Inverte o valor de p.
            *   **Conjunção (p ∧ q - "e"):** V somente se p e q são V.
            *   **Disjunção Inclusiva (p ∨ q - "ou"):** F somente se p e q são F.
            *   **Disjunção Exclusiva (p ⊕ q - "ou...ou..."):** V somente se p e q têm valores diferentes.
            *   **Condicional (p → q - "se p, então q"):** F somente se p é V e q é F.
            *   **Bicondicional (p ↔ q - "p se e somente se q"):** V somente se p e q têm o mesmo valor.
        *   **Tautologia:** Sempre V. **Contradição:** Sempre F. **Contingência:** Pode ser V ou F.

    *   **3.3 Equivalências.**
        *   **Explicação:** Duas proposições são logicamente equivalentes (⇔ ou ≡) se têm a mesma tabela verdade.
        *   **Exemplos:**
            *   ¬(¬p) ⇔ p (Dupla Negação)
            *   (p → q) ⇔ (¬p ∨ q) (Condicional como Disjunção)
            *   (p → q) ⇔ (¬q → ¬p) (Contrapositiva)
            *   ¬(p → q) ⇔ (p ∧ ¬q) (Negação da Condicional)

    *   **3.4 Leis de De Morgan.**
        *   **Explicação:** Regras para negar conjunções e disjunções.
            *   ¬(p ∧ q) ⇔ (¬p ∨ ¬q)
            *   ¬(p ∨ q) ⇔ (¬p ∧ ¬q)

    *   **3.5 Diagramas lógicos.**
        *   **Explicação:** Representações visuais (geralmente Diagramas de Venn) de proposições e relações entre conjuntos, usados para analisar argumentos, especialmente com quantificadores.
        *   **Representações:**
            *   "Todo A é B": Círculo A dentro do círculo B.
            *   "Nenhum A é B": Círculos A e B separados.
            *   "Algum A é B": Interseção entre os círculos A e B.
            *   "Algum A não é B": Parte de A fora de B.

## 4. Lógica de primeira ordem.

*   **Explicação:** Extensão da lógica proposicional que analisa a estrutura interna das proposições, introduzindo predicados (propriedades/relações), variáveis (x, y), constantes (objetos específicos) e quantificadores (∀ - para todo; ∃ - existe).
*   **Exemplo:**
    *   "Todos os cães latem": ∀x (Cão(x) → Late(x))
    *   "Existe um número par que é primo": ∃x (Número(x) ∧ Par(x) ∧ Primo(x)) (Este é o número 2)

## 5. Princípios de contagem e probabilidade.

*   **Explicação:**
    *   **Princípios de Contagem (Análise Combinatória):**
        *   **Princípio Fundamental da Contagem (Multiplicativo):** Se uma tarefa tem n1 modos, e outra n2 modos, o total de modos para ambas é n1 × n2.
        *   **Permutações (Pn = n!):** Arranjos ordenados de n objetos distintos. A ordem importa.
        *   **Arranjos (An,p = n!/(n-p)!):** Seleção ordenada de p objetos de n. A ordem importa.
        *   **Combinações (Cn,p = n!/(p!(n-p)!)):** Seleção de p objetos de n. A ordem NÃO importa.
            *Ex: Formar uma comissão de 3 pessoas a partir de um grupo de 5: C5,3.*
    *   **Probabilidade:**
        *   Mede a chance de um evento ocorrer (número entre 0 e 1).
        *   **P(A) = (Casos Favoráveis a A) / (Total de Casos Possíveis)** (para eventos equiprováveis).
        *   **Espaço Amostral (S):** Todos os resultados possíveis.
        *   **Evento (A):** Subconjunto de S.
        *   **União de Eventos:** P(A ∪ B) = P(A) + P(B) - P(A ∩ B).
        *   **Probabilidade Condicional:** P(A|B) = P(A ∩ B) / P(B).
        *   **Eventos Independentes:** P(A ∩ B) = P(A) × P(B).

## 6. Operações com conjuntos.

*   **Explicação:** Um conjunto é uma coleção de objetos distintos (elementos).
    *   **Operações:**
        *   **União (A ∪ B):** Elementos em A OU em B OU em ambos.
        *   **Interseção (A ∩ B):** Elementos em A E em B.
        *   **Diferença (A - B):** Elementos em A mas NÃO em B.
        *   **Complementar (A'):** Elementos do universo U que NÃO estão em A (A' = U - A).
    *   **Cardinalidade:** n(A ∪ B) = n(A) + n(B) - n(A ∩ B).
    *   **Diagramas de Venn:** Usados para visualizar operações.

## 7. Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais.

*   **Explicação:** Aplicação de princípios lógicos para resolver problemas em contextos numéricos, espaciais ou de organização de dados.
    *   **Problemas Aritméticos:** Envolvem números, operações, sequências, proporções, lógica de divisibilidade. Ex: "Descubra o próximo número na sequência 2, 5, 11, 23, __." (Padrão: multiplicar por 2 e somar 1, ou adicionar 3, 6, 12... Próximo é 47).
    *   **Problemas Geométricos:** Envolvem formas, figuras, posições, visualização espacial, sequências de figuras. Ex: "Dada uma figura que é rotacionada 90º em cada passo, qual será a próxima posição?"
    *   **Problemas Matriciais:** Envolvem informações em tabelas ou matrizes, buscando padrões ou preenchendo elementos faltantes. Ex:
        | A | C | E |
        |---|---|---|
        | B | D | F |
        | G | I | ? |
        (Considerando a ordem alfabética, ? = K).
        Pode também envolver tabelas de associação lógica (ex: correlacionar nomes, profissões e cidades com base em dicas).
