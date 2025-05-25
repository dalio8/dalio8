# Detalhamento dos Subtópicos de "2. Bancos de dados" (Edital Perito Criminal Federal – Área 3)

Este tópico aborda os sistemas utilizados para armazenar, gerenciar e recuperar grandes volumes de dados de forma estruturada ou não.

---

## 2.1 Arquitetura, modelos lógicos e representação física.

*   **Explicação:** Trata dos diferentes níveis de abstração e organização de um Sistema de Gerenciamento de Banco de Dados (SGBD).
    *   **Arquitetura de Banco de Dados (ANSI-SPARC de três níveis):**
        *   **Nível Externo (Visão do Usuário):** Como usuários individuais veem os dados (subesquemas). Ex: Vendedor vê apenas dados de clientes e pedidos.
        *   **Nível Conceitual (Lógico):** Estrutura lógica de todo o banco para a comunidade de usuários (entidades, atributos, relacionamentos, restrições). Definido pelo DBA. Ex: Modelo Entidade-Relacionamento (MER).
        *   **Nível Interno (Físico):** Como os dados são fisicamente armazenados (estruturas de armazenamento, índices, organização de arquivos). Ex: Arquivos de dados, índices B-tree.
        *   **Independência de Dados:**
            *   **Lógica:** Modificar esquema conceitual sem alterar esquemas externos/aplicações.
            *   **Física:** Modificar esquema interno sem alterar esquema conceitual/externo.
    *   **Modelos Lógicos de Banco de Dados:** Descrevem dados, relacionamentos e restrições abstratamente.
        *   **Relacional:** Dados em tabelas (relações) com linhas (tuplas) e colunas (atributos). Relacionamentos por chaves estrangeiras.
        *   **Entidade-Relacionamento (MER):** Modelo conceitual de alto nível (entidades, atributos, relacionamentos).
        *   **Orientado a Objetos:** Dados como objetos com atributos e métodos.
        *   **Hierárquico/Rede (Legados):** Estruturas de árvore ou grafos mais restritos.
        *   **NoSQL:** Chave-valor, documental, colunar, grafos.
    *   **Representação Física:** Como os dados lógicos são armazenados fisicamente.
        *   **Organização de Arquivos:** Sequencial, indexado, hash.
        *   **Estruturas de Índice:** B-trees, hash indexes para acesso rápido.
        *   **Alocação de Blocos, Compressão, Particionamento.**
*   **Relevância Forense:**
    *   Compreender a arquitetura ajuda a saber onde e como os dados são armazenados e acessados.
    *   Modelos lógicos (especialmente relacional) são cruciais para consultas SQL eficazes.
    *   A representação física é vital para recuperação de dados em baixo nível (arquivos corrompidos, dados deletados em espaço não alocado ou índices).

---

## 2.2 Bancos de dados multidimensionais: conceitos envolvidos.

*   **Explicação:** Projetados para OLAP (Online Analytical Processing), analisando dados sob múltiplas perspectivas (dimensões) em cubos de dados.
    *   **Conceitos Chave:**
        *   **Dimensões:** Perspectivas de análise (Tempo, Produto, Localização). Possuem **Hierarquias** (Ano → Mês → Dia).
        *   **Medidas (Fatos):** Valores numéricos analisados (Quantidade Vendida, Valor da Venda).
        *   **Cubo de Dados (Hypercube):** Estrutura lógica que organiza medidas ao longo das dimensões.
        *   **Operações OLAP:** `Slice` (fatiar), `Dice` (subcubo), `Drill-down` (detalhar), `Roll-up` (sumarizar), `Pivot` (girar).
    *   **Implementações:**
        *   **MOLAP (Multidimensional OLAP):** Dados em arrays multidimensionais. Rápido, menos flexível.
        *   **ROLAP (Relational OLAP):** Dados em bancos relacionais (star/snowflake schema). Mais flexível, consultas SQL.
        *   **HOLAP (Hybrid OLAP):** Combina MOLAP (agregados) e ROLAP (detalhes).
*   **Relevância Forense:**
    *   Comuns em sistemas de BI, data warehouses, ERPs. Úteis em investigações de fraudes corporativas, lavagem de dinheiro.
    *   Operações OLAP podem ser usadas pelo perito para explorar dados e identificar padrões suspeitos ou anomalias.
    *   Extração de dados pode requerer ferramentas de BI ou linguagens como MDX. Logs de auditoria OLAP podem existir.

---

## 2.3 SGBDs relacionais.

*   **Explicação:** Sistemas que implementam o modelo relacional (dados em tabelas com linhas/colunas, relacionamentos por chaves).
    *   **Características:** Estrutura tabular, Chaves Primárias (identificador único da linha), Chaves Estrangeiras (referenciam chave primária de outra tabela), Normalização (minimizar redundância), ACID (Atomicidade, Consistência, Isolamento, Durabilidade das transações), Linguagem SQL.
    *   **Exemplos:** Oracle, MySQL, PostgreSQL, SQL Server, SQLite.
*   **Relevância Forense:**
    *   Fonte primária de evidências em muitas aplicações.
    *   Análise de conteúdo de tabelas, recuperação de registros deletados (que podem permanecer em páginas não alocadas ou fragmentos).
    *   Análise de esquema do banco, logs do SGBD (erros, consultas, transações), identificação de usuários e permissões.

    ---
    #### 2.3.1 SQLite.
    *   **Explicação:** SGBD relacional **embarcado**, **sem servidor**, **autocontido** (banco de dados em um **único arquivo**), **transacional** (ACID), **configuração zero**.
        *   Amplamente usado em aplicativos móveis (Android/iOS), navegadores web (histórico, cookies), softwares desktop, sistemas embarcados.
    *   **Relevância Forense:**
        *   **Onipresença:** Arquivos `.db`, `.sqlite`, `.sqlite3` são fontes ricas de evidências em quase todos os dispositivos.
            *   Navegadores: Histórico, cookies, cache, downloads (ex: `places.sqlite` do Firefox).
            *   Apps Móveis: Mensagens (WhatsApp), contatos, registros de chamadas, dados de redes sociais.
        *   **Análise de Arquivos SQLite:**
            *   Ferramentas especializadas (DB Browser for SQLite, Autopsy) para visualização e consulta.
            *   **Recuperação de Dados Deletados:** Dados podem permanecer em:
                *   **Páginas não alocadas (Unallocated Pages).**
                *   **Listas de páginas livres (Freeblock List / Freelist Pages).**
                *   **Journal (`.db-journal`) / WAL (`.db-wal` - Write-Ahead Log):** Arquivos de log que registram alterações antes de serem escritas no BD principal. Podem conter cópias de páginas com dados deletados ou modificados. O WAL é mais comum e permite maior concorrência.
            *   **Carving de Páginas:** Recuperação de páginas SQLite de fluxos de dados brutos.
        *   Estrutura Interna: Arquivo organizado em páginas; primeira página é o cabeçalho; tabelas e índices são B-trees.

---

## 2.4 Linguagem de consulta estruturada (SQL).

*   **Explicação:** Linguagem padrão para interagir com bancos de dados relacionais (definir, consultar, manipular, controlar dados).
    *   **Subconjuntos:**
        *   **DDL (Data Definition Language):** `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`.
        *   **DML (Data Manipulation Language):** `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
        *   **DQL (Data Query Language):** Foco no `SELECT`.
        *   **DCL (Data Control Language):** `GRANT`, `REVOKE`.
        *   **TCL (Transaction Control Language):** `COMMIT`, `ROLLBACK`, `SAVEPOINT`.
    *   **Cláusulas `SELECT` comuns:** `FROM`, `WHERE` (filtrar), `GROUP BY` (agrupar), `HAVING` (filtrar grupos), `ORDER BY` (classificar), `JOIN` (combinar tabelas).
    *   **Funções de Agregação:** `COUNT()`, `SUM()`, `AVG()`, `MAX()`, `MIN()`.
*   **Relevância Forense:**
    *   **Essencial para extração de dados:** Permite consultas precisas e eficientes.
    *   **Filtragem e Busca:** Cláusula `WHERE` para encontrar registros específicos.
    *   **Correlação de Dados:** `JOIN`s para conectar informações de diferentes tabelas.
    *   **Análise de Padrões:** `GROUP BY` e funções de agregação.
    *   Compreensão de ataques de Injeção de SQL.

---

## 2.5 Transações: características e análise de logs.

*   **Explicação:**
    *   **Transação:** Sequência de operações de BD tratada como unidade lógica e atômica (tudo ou nada).
    *   **Propriedades ACID:**
        *   **Atomicidade:** Ou todas as operações são concluídas (commit) ou nenhuma é (rollback).
        *   **Consistência:** Leva o BD de um estado válido para outro, preservando a integridade.
        *   **Isolamento:** Transações concorrentes não interferem umas nas outras indevidamente.
        *   **Durabilidade:** Alterações de transações confirmadas (commit) são permanentes e sobrevivem a falhas.
    *   **Logs de Transação:** Registro sequencial de todas as transações e suas operações. Crucial para ACID e recuperação de falhas.
        *   **Conteúdo:** ID da transação, tipo de operação, tabela/registro afetado, valores antigos (before image) e novos (after image), timestamps.
        *   **Write-Ahead Logging (WAL):** Registros de log são escritos no disco *antes* das alterações nos arquivos de dados principais.
*   **Relevância Forense:**
    *   **Trilha de Auditoria Detalhada:** Histórico de modificações de dados (quem, o quê, quando).
    *   **Recuperação de Dados Deletados/Modificados:** "Before images" no log podem reconstruir estados anteriores.
    *   **Análise de Atividades Suspeitas:** Sequências de transações podem revelar padrões (tentativas de fraude, exclusões em massa).
    *   **Ordem dos Eventos:** Timestamps ajudam a estabelecer cronologia.
    *   **Localização dos Logs:** Varia (ex: `.LDF` no SQL Server, redo logs no Oracle, WAL no PostgreSQL/SQLite).
    *   **Desafios:** Logs podem ser grandes, complexos, truncados ou em formatos proprietários.

---

## 2.6 NOSQL.

*   **Explicação:** "Not Only SQL". Categoria de SGBDs que diferem do modelo relacional, visando escalabilidade horizontal, modelos de dados flexíveis e, por vezes, consistência eventual.
    *   **Características Comuns:** Esquemas flexíveis (schema-less), escalabilidade horizontal (scale-out), alta disponibilidade, consistência eventual (Teorema CAP: Consistência, Disponibilidade, Tolerância a Particionamento - escolher duas).
    *   **Principais Tipos:**
        *   **Chave-Valor (Key-Value Stores):** Pares chave-valor. Simples e rápido. (Ex: Redis, DynamoDB).
            *   *Forense:* Caches, sessões, perfis. Extrair e interpretar valores.
        *   **Documentais (Document Stores):** Dados em documentos (JSON, BSON, XML). Estruturas flexíveis. (Ex: MongoDB, Couchbase).
            *   *Forense:* CMS, catálogos, logs de apps. Extrair documentos, consultar campos.
        *   **Colunares (Column-Family / Wide-Column Stores):** Dados organizados por colunas. Otimizado para consultas em subconjuntos de colunas. (Ex: Cassandra, HBase).
            *   *Forense:* Big data, séries temporais. Reconstruir "linhas", correlacionar dados.
        *   **De Grafos (Graph Databases):** Armazena e navega por relacionamentos (nós, arestas, propriedades). (Ex: Neo4j, Neptune).
            *   *Forense:* Análise de redes sociais, detecção de fraudes, redes criminosas. Explorar caminhos e conexões.
*   **Relevância Forense:**
    *   Crescente utilização exige conhecimento do perito.
    *   Diversidade de formatos e ferramentas; não há uma SQL universal.
    *   Recuperação de dados deletados é complexa e específica para cada tipo.
    *   Logs do BD NoSQL e do aplicativo são cruciais. Coleta e correlação em sistemas distribuídos é um desafio.
    *   Consistência eventual pode complicar a análise do estado dos dados em um momento específico.
    *   Extração e interpretação podem requerer APIs específicas ou linguagens de consulta proprietárias (ex: Cypher para Neo4j).

---
