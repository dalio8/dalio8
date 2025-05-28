# Sistemas Distribuídos para Concursos (Perito em Informática - CEBRASPE)

## 1. Definição e Conceito

Um **sistema distribuído** é uma coleção de computadores autônomos (nós de processamento) interconectados por uma rede de comunicação, que se apresentam aos seus usuários como um sistema único e coerente. Cada nó possui sua própria memória e processador, e a comunicação entre eles ocorre através da troca de mensagens. O objetivo principal é permitir que recursos sejam compartilhados e que tarefas possam ser executadas de forma colaborativa ou paralela entre os nós.

## 2. Características Fundamentais

Os sistemas distribuídos possuem características intrínsecas que os definem e os diferenciam de sistemas centralizados:

*   **Concorrência (Paralelismo):**
    *   Múltiplos componentes (processos ou nós) podem executar tarefas simultaneamente.
    *   Isso permite o processamento paralelo de diferentes partes de uma aplicação ou a execução de múltiplas aplicações concorrentes, potencialmente melhorando o desempenho e a vazão (throughput) do sistema.
    *   Exige mecanismos de coordenação e sincronização para gerenciar o acesso a recursos compartilhados e evitar conflitos.

*   **Falta de Relógio Global (No Global Clock):**
    *   Não existe um único relógio global que sincronize todos os eventos em todos os nós do sistema. Cada nó possui seu próprio relógio físico.
    *   A comunicação em rede possui latências variáveis e imprevisíveis.
    *   Isso torna a ordenação de eventos em diferentes nós uma tarefa complexa.
    *   Algoritmos de sincronização de relógios (como NTP) e de ordenação de eventos (como timestamps lógicos de Lamport ou vetoriais) são necessários para estabelecer uma ordem causal ou total aproximada dos eventos.

*   **Falhas Independentes (Independent Failures):**
    *   Os componentes de um sistema distribuído (nós, links de rede) podem falhar independentemente uns dos outros.
    *   A falha de um componente não necessariamente leva à falha do sistema inteiro, se o sistema for projetado com tolerância a falhas.
    *   O sistema deve ser capaz de detectar falhas (muitas vezes difícil, pois uma falha pode ser indistinguível de uma lentidão extrema na rede) e se recuperar delas ou continuar operando de forma degradada.

## 3. Objetivos dos Sistemas Distribuídos

Os principais objetivos ao projetar e construir sistemas distribuídos incluem:

*   **Transparência:**
    *   **Conceito:** Ocultar a natureza distribuída do sistema dos usuários e aplicações, fazendo com que ele pareça um sistema centralizado único.
    *   **Tipos de Transparência:**
        *   **Acesso:** Acessar recursos locais e remotos da mesma forma.
        *   **Localização:** Usuários não precisam saber onde os recursos estão fisicamente localizados.
        *   **Migração:** Recursos podem ser movidos dentro do sistema sem afetar como são acessados.
        *   **Replicação:** Usuários não precisam saber que múltiplas cópias de um recurso existem.
        *   **Concorrência:** Múltiplos usuários podem compartilhar recursos automaticamente sem interferência.
        *   **Falha:** Aplicações podem continuar operando (possivelmente com desempenho reduzido) apesar da falha de alguns componentes.
        *   **Escala:** O sistema pode crescer em escala sem que a estrutura do sistema ou das aplicações precise mudar.
*   **Abertura (Openness):**
    *   **Conceito:** A capacidade do sistema de ser estendido e interoperar com outros sistemas, geralmente através do uso de interfaces e protocolos padronizados.
    *   **Características:**
        *   Interfaces bem definidas e publicadas.
        *   Suporte a heterogeneidade (diferentes hardwares, sistemas operacionais, linguagens de programação).
        *   Facilidade de adicionar novos serviços ou componentes.
*   **Escalabilidade (Scalability):**
    *   **Conceito:** A capacidade do sistema de manter seu desempenho e usabilidade mesmo quando há um aumento significativo no número de usuários, recursos ou dados.
    *   **Dimensões da Escalabilidade:**
        *   **Tamanho:** Adicionar mais usuários e recursos.
        *   **Geográfica:** Distribuir o sistema por áreas maiores.
        *   **Administrativa:** Gerenciar o sistema mesmo com múltiplas unidades administrativas independentes.
    *   Técnicas para alcançar escalabilidade incluem replicação, particionamento (sharding) e caching.
*   **Tolerância a Falhas (Fault Tolerance):**
    *   **Conceito:** A capacidade do sistema de continuar operando corretamente (ou de forma degradada aceitável) na presença de falhas em alguns de seus componentes.
    *   **Técnicas:**
        *   **Detecção de Falhas:** Identificar quando um componente falhou.
        *   **Mascaramento de Falhas:** Ocultar a falha dos usuários (ex: usando redundância).
        *   **Recuperação de Falhas:** Restaurar o sistema a um estado funcional após uma falha.
        *   **Redundância:** Manter múltiplas cópias de hardware, software ou dados.

## 4. Desafios dos Sistemas Distribuídos

A construção de sistemas distribuídos apresenta desafios significativos:

*   **Complexidade:**
    *   Projetar, implementar e depurar sistemas distribuídos é inerentemente mais complexo do que sistemas centralizados devido à concorrência, falta de relógio global, falhas parciais e comunicação em rede.
    *   A ausência de um estado global compartilhado e facilmente acessível dificulta o raciocínio sobre o comportamento do sistema.
*   **Segurança:**
    *   A comunicação em rede introduz vulnerabilidades a ataques (ex: interceptação de mensagens, negação de serviço).
    *   Autenticação, autorização e comunicação segura (criptografia) são cruciais.
    *   Proteger recursos distribuídos e garantir a integridade dos dados em múltiplos nós é complexo.
*   **Sincronização:**
    *   A falta de um relógio global torna a coordenação e a ordenação de eventos um desafio.
    *   Manter a consistência de dados replicados em diferentes nós requer algoritmos de sincronização complexos.
    *   Evitar deadlocks e race conditions em acesso concorrente a recursos compartilhados.
*   **Detecção e Tratamento de Falhas:**
    *   Distinguir entre um nó lento e um nó que falhou pode ser difícil.
    *   Garantir que o sistema se recupere de falhas parciais de forma consistente.
*   **Concorrência:**
    *   Gerenciar o acesso simultâneo a recursos compartilhados por múltiplos processos ou usuários distribuídos.

## 5. Modelos de Arquitetura

Diferentes modelos são usados para estruturar sistemas distribuídos:

*   **Cliente-Servidor (Client-Server):**
    *   **Conceito:** Os processos são divididos em clientes e servidores.
        *   **Servidor:** Fornece serviços ou recursos. Espera por requisições dos clientes.
        *   **Cliente:** Solicita serviços ou recursos do servidor.
    *   **Comunicação:** O cliente inicia a comunicação enviando uma requisição ao servidor, que a processa e retorna uma resposta.
    *   **Características:** Arquitetura centralizada (em termos de serviço), mais simples de gerenciar em alguns aspectos. Pode se tornar um gargalo se o servidor ficar sobrecarregado.
    *   **Variações:** Modelo de duas camadas (cliente-servidor direto), três camadas (cliente, servidor de aplicação, servidor de banco de dados), N-camadas.

*   **Peer-to-Peer (P2P):**
    *   **Conceito:** Todos os nós (peers) são iguais e podem atuar tanto como cliente quanto como servidor.
    *   **Comunicação:** Os peers se comunicam diretamente entre si, sem a necessidade de um servidor central.
    *   **Características:** Descentralizado, mais robusto a falhas de um único ponto, escalável. Pode ser mais complexo para gerenciar a descoberta de recursos e a consistência dos dados.
    *   **Exemplos:** Redes de compartilhamento de arquivos (BitTorrent), algumas criptomoedas.

*   **Baseados em Middleware:**
    *   **Conceito:** Uma camada de software (middleware) que se situa entre o sistema operacional e as aplicações distribuídas. O middleware fornece um modelo de programação de mais alto nível e oculta a heterogeneidade e a complexidade da comunicação em rede subjacente.
    *   **Objetivo:** Facilitar o desenvolvimento de aplicações distribuídas, fornecendo serviços comuns como comunicação, nomeação, segurança, transações, etc.
    *   **Exemplos de Tecnologias de Middleware:**
        *   **CORBA (Common Object Request Broker Architecture):** Padrão para interoperabilidade entre objetos distribuídos em diferentes linguagens e plataformas. Define uma Interface Definition Language (IDL) e um Object Request Broker (ORB) para mediar as chamadas.
        *   **RMI (Remote Method Invocation - Java):** Permite que um objeto Java em uma máquina virtual chame métodos de um objeto em outra máquina virtual Java como se fossem chamadas locais.
        *   **Web Services (SOAP, REST):** Tecnologias baseadas em XML/JSON e HTTP para comunicação entre aplicações na web.
        *   **Message Queues (Filas de Mensagens):** Permitem comunicação assíncrona entre componentes.

## 6. Conceitos Importantes

*   **Consistência de Dados:**
    *   **Conceito:** Garante que, em um sistema com dados replicados (múltiplas cópias do mesmo dado em diferentes nós), todas as cópias sejam consistentes e que as leituras retornem valores esperados.
    *   **Desafio:** Manter a consistência em face de atualizações concorrentes e falhas parciais.
    *   **Modelos de Consistência:**
        *   **Consistência Forte (Strong Consistency):**
            *   Garante que qualquer leitura retorne o valor da escrita mais recente. Todas as réplicas são atualizadas atomicamente e imediatamente.
            *   Ex: Consistência Linearizável (operações parecem ocorrer instantaneamente em alguma ordem global).
            *   Difícil de alcançar em sistemas distribuídos de larga escala devido à latência.
        *   **Consistência Eventual (Eventual Consistency):**
            *   Garante que, se nenhuma nova atualização for feita em um dado item, eventualmente todas as leituras para aquele item retornarão o último valor atualizado. Não há garantia sobre o tempo que levará para a convergência.
            *   Mais fácil de implementar e oferece maior disponibilidade e escalabilidade em sistemas distribuídos.
            *   Usada em muitos sistemas NoSQL e aplicações web de larga escala.
        *   **Outros Modelos:** Consistência Sequencial, Consistência Causal, etc., que oferecem diferentes garantias entre a forte e a eventual.

*   **Replicação:**
    *   **Conceito:** Manter múltiplas cópias (réplicas) de dados ou serviços em diferentes nós do sistema.
    *   **Objetivos:**
        *   **Aumento da Disponibilidade:** Se um nó com uma réplica falhar, outras réplicas ainda estarão disponíveis.
        *   **Melhora do Desempenho:** Requisições podem ser direcionadas para a réplica mais próxima ou menos carregada.
        *   **Tolerância a Falhas.**
        *   **Escalabilidade.**
    *   **Desafios:**
        *   Manter a consistência entre as réplicas quando os dados são atualizados.
        *   Gerenciar a criação e remoção de réplicas.
        *   Escolher a estratégia de atualização das réplicas (síncrona ou assíncrona).

Este resumo abrange os principais conceitos de Sistemas Distribuídos relevantes para o concurso. É crucial complementar com a resolução de questões específicas da banca CEBRASPE para entender a profundidade e o estilo de cobrança.
