# Sistemas Operacionais para Concursos (Perito em Informática - CEBRASPE)

## 1. Kernel (Núcleo)

O **kernel** é o componente central de um sistema operacional (SO). Ele atua como uma ponte entre o software (aplicativos) e o hardware do computador. Suas principais responsabilidades incluem o gerenciamento dos recursos do sistema de forma segura e eficiente.

**Principais Funções do Kernel:**

*   **Gerenciamento de Processos:** Controla a criação, execução, suspensão e término de processos.
*   **Gerenciamento de Memória:** Aloca e gerencia o acesso à memória principal (RAM) pelos processos.
*   **Gerenciamento de Dispositivos de E/S:** Controla a comunicação entre os processos e os dispositivos de hardware (discos, teclado, rede, etc.) através dos drivers de dispositivo.
*   **Chamadas de Sistema (System Calls):** Fornece uma interface para que os aplicativos solicitem serviços do kernel (ex: ler um arquivo, criar um processo).
*   **Segurança e Proteção:** Isola processos uns dos outros e protege o próprio kernel de acessos indevidos.

**Tipos de Kernel:**

1.  **Kernel Monolítico:**
    *   **Conceito:** Todos os serviços essenciais do sistema operacional (gerenciamento de processos, memória, arquivos, E/S, drivers de dispositivo, rede) residem e executam no mesmo espaço de endereçamento do kernel (espaço do núcleo).
    *   **Vantagens:**
        *   **Desempenho:** A comunicação entre os componentes é rápida, pois ocorre por meio de chamadas de função diretas dentro do mesmo espaço de endereçamento.
        *   **Simplicidade (inicial):** Pode ser mais simples de projetar e implementar inicialmente, pois todos os componentes têm acesso direto uns aos outros.
    *   **Desvantagens:**
        *   **Manutenção e Extensibilidade:** Difícil de modificar ou adicionar novas funcionalidades, pois o código é fortemente acoplado.
        *   **Robustez:** Uma falha em um componente (ex: um driver de dispositivo defeituoso) pode comprometer todo o sistema operacional.
        *   **Tamanho:** O kernel tende a ser grande, ocupando mais espaço na memória.
    *   **Exemplos:** Linux (embora use módulos carregáveis, sua arquitetura fundamental é monolítica), MS-DOS, kernels Unix tradicionais.

2.  **Microkernel (Micronúcleo):**
    *   **Conceito:** O kernel é minimizado para conter apenas as funções mais essenciais, como gerenciamento básico de processos (criação, escalonamento de baixo nível), gerenciamento de memória de baixo nível e comunicação entre processos (IPC). Outros serviços (drivers, sistemas de arquivos, gerenciamento de rede) são executados como processos separados no espaço do usuário (servidores).
    *   **Vantagens:**
        *   **Modularidade e Extensibilidade:** Mais fácil de adicionar ou remover funcionalidades, pois os serviços são módulos independentes.
        *   **Robustez e Segurança:** Uma falha em um servidor (ex: driver) geralmente não derruba todo o sistema; o servidor pode ser reiniciado. Maior isolamento entre componentes.
        *   **Manutenção:** Código menor e mais organizado facilita a manutenção.
    *   **Desvantagens:**
        *   **Desempenho:** A comunicação entre processos (cliente e servidor de SO) é mais lenta do que chamadas de função diretas em um kernel monolítico, devido à sobrecarga da IPC e trocas de contexto entre modo usuário e modo núcleo.
        *   **Complexidade (inicial):** O design da IPC e a coordenação entre múltiplos servidores podem ser complexos.
    *   **Exemplos:** Minix, QNX, Mach (base do XNU no macOS, que é híbrido), L4.

3.  **Kernel Híbrido:**
    *   **Conceito:** Tenta combinar as vantagens dos kernels monolíticos e microkernels. Alguns serviços (como pilha de rede ou sistema de arquivos) podem rodar no espaço do núcleo para melhor desempenho, enquanto outros (como drivers de dispositivo menos críticos ou serviços de interface gráfica) podem rodar no espaço do usuário.
    *   **Vantagens:**
        *   Melhor desempenho que um microkernel puro, pois serviços críticos rodam no espaço do núcleo.
        *   Maior modularidade e robustez que um kernel monolítico puro.
    *   **Desvantagens:**
        *   A distinção entre o que roda no núcleo e no espaço do usuário pode ser complexa.
        *   Pode herdar algumas das desvantagens de ambos os modelos, dependendo da implementação.
    *   **Exemplos:** Windows NT (e seus sucessores como Windows XP, 7, 10, 11), XNU (kernel do macOS e iOS), BeOS.

**Outros Tipos (Menos Comuns):**

*   **Nanokernel:** Leva o conceito de microkernel ao extremo, delegando quase todos os serviços, incluindo controladores de interrupção básicos, para drivers de dispositivo.
*   **Exokernel:** Não abstrai o hardware. Em vez disso, aloca recursos de hardware diretamente aos aplicativos, que podem então usar bibliotecas de sistema operacional para simular as abstrações desejadas.

## 2. Gerenciamento de Memória

O gerenciamento de memória é uma das funções mais críticas do sistema operacional. Ele controla como a memória principal (RAM) é alocada e utilizada pelos processos, garantindo que cada processo tenha seu próprio espaço de endereçamento protegido e que a memória seja utilizada de forma eficiente.

**Principais Técnicas e Conceitos:**

### 2.1. Alocação de Memória

*   **Alocação Contígua Simples:** Cada processo recebe um único bloco contíguo de memória. Sofre de fragmentação externa.
*   **Particionamento:**
    *   **Partições Fixas (Estáticas):** A memória é dividida em partições de tamanho fixo na inicialização do sistema. Um processo é carregado em uma partição grande o suficiente. Pode levar à fragmentação interna (espaço desperdiçado dentro de uma partição alocada).
    *   **Partições Variáveis (Dinâmicas):** As partições são criadas dinamicamente para o tamanho exato do processo. Leva à fragmentação externa (pequenos blocos livres entre processos alocados, que podem ser difíceis de usar).
        *   **Algoritmos de Alocação para Partições Variáveis:**
            *   **First-fit:** Aloca o primeiro buraco livre que seja grande o suficiente.
            *   **Best-fit:** Aloca o menor buraco livre que seja grande o suficiente. Tende a deixar buracos muito pequenos.
            *   **Worst-fit:** Aloca o maior buraco livre. Tende a deixar buracos de tamanho útil.
            *   **Next-fit:** Similar ao first-fit, mas começa a busca a partir da última alocação feita.

### 2.2. Fragmentação

*   **Fragmentação Interna:** Ocorre quando um processo é alocado em um bloco de memória maior do que o necessário, resultando em espaço desperdiçado *dentro* do bloco alocado. Comum em paginação e partições fixas.
*   **Fragmentação Externa:** Ocorre quando existem blocos de memória livre suficientes no total para satisfazer uma requisição, mas eles não são contíguos, tornando-os inutilizáveis para um processo que necessita de um bloco contíguo. Comum em segmentação e partições variáveis.
    *   **Compactação:** Técnica para reunir todos os blocos livres em um único bloco grande, movendo os processos alocados. É custosa em termos de tempo de CPU.

### 2.3. Paginação

*   **Conceito:** A memória física é dividida em blocos de tamanho fixo chamados **frames (ou molduras de página)**. O espaço de endereçamento lógico de um processo (memória virtual) também é dividido em blocos de mesmo tamanho chamados **páginas**.
*   **Funcionamento:** Quando um processo é executado, suas páginas são carregadas em frames disponíveis na memória física. Esses frames não precisam ser contíguos.
*   **Tabela de Páginas (Page Table):** Cada processo possui uma tabela de páginas que mapeia os endereços de página virtuais para os endereços de frame físicos. Cada entrada na tabela de páginas contém o número do frame onde a página correspondente está armazenada, além de bits de controle (ex: bit de presença/validade, bit de modificação/dirty, bits de proteção).
*   **Vantagens:**
    *   Elimina a fragmentação externa (qualquer frame livre pode ser usado).
    *   Permite que um processo tenha um espaço de endereçamento lógico maior que a memória física disponível (base para a memória virtual).
    *   Compartilhamento de memória facilitado (múltiplas entradas de tabela de páginas podem apontar para o mesmo frame).
*   **Desvantagens:**
    *   Pode ocorrer fragmentação interna (na última página de um processo).
    *   Custo de acesso à tabela de páginas (que reside na memória).

### 2.4. Translation Lookaside Buffer (TLB)

*   **Conceito:** É uma pequena cache de hardware de alta velocidade, associada à Unidade de Gerenciamento de Memória (MMU), que armazena as traduções de endereços virtuais para físicos usadas recentemente.
*   **Funcionamento:** Quando a CPU gera um endereço virtual, a MMU primeiro consulta o TLB.
    *   **TLB Hit:** Se a tradução está no TLB, o endereço físico é obtido rapidamente.
    *   **TLB Miss:** Se a tradução não está no TLB, a MMU consulta a tabela de páginas na memória principal. A tradução obtida é então armazenada no TLB para acessos futuros (substituindo uma entrada existente se o TLB estiver cheio).
*   **Propósito:** Reduzir o tempo de tradução de endereços, evitando acessos frequentes à tabela de páginas na memória principal.

### 2.5. Segmentação

*   **Conceito:** A memória é dividida em segmentos de tamanho variável, onde cada segmento corresponde a uma unidade lógica do programa (ex: segmento de código, segmento de dados, segmento de pilha).
*   **Funcionamento:** Os endereços lógicos são compostos por um número de segmento e um deslocamento (offset) dentro desse segmento. Cada segmento tem um endereço base na memória física e um limite (tamanho).
*   **Tabela de Segmentos:** Cada processo possui uma tabela de segmentos que armazena o endereço base, o limite e os bits de proteção para cada segmento.
*   **Vantagens:**
    *   Suporte à organização lógica do programa.
    *   Facilita o compartilhamento de segmentos entre processos (ex: bibliotecas de código).
    *   Permite diferentes níveis de proteção para diferentes tipos de segmentos.
*   **Desvantagens:**
    *   Sofre de fragmentação externa, pois os segmentos têm tamanhos variáveis.
    *   A alocação e desalocação de segmentos de tamanhos variados podem ser complexas.

### 2.6. Segmentação com Paginação

Combina as vantagens da segmentação e da paginação. O espaço de endereçamento de um processo é primeiro dividido em segmentos e, em seguida, cada segmento é dividido em páginas. A tradução de endereço envolve uma tabela de segmentos e tabelas de páginas. É uma abordagem comum em arquiteturas como x86.

### 2.7. Memória Virtual

*   **Conceito:** Técnica que permite a execução de processos que podem não estar completamente carregados na memória física. Cria a ilusão para o programador de que o sistema possui uma memória principal muito maior do que a fisicamente disponível.
*   **Funcionamento:** Utiliza a memória secundária (normalmente disco rígido, na forma de uma área de troca ou *swap space*/arquivo de paginação) para armazenar partes de processos que não estão atualmente em uso na RAM.
    *   **Paginação por Demanda (Demand Paging):** As páginas de um processo são carregadas da memória secundária para a RAM apenas quando são referenciadas (demandadas). Se uma página referenciada não está na RAM, ocorre uma **falha de página (page fault)**.
    *   **Tratamento de Falha de Página:**
        1.  O SO interrompe o processo.
        2.  Verifica se o endereço virtual é válido.
        3.  Localiza a página na memória secundária.
        4.  Encontra um frame livre na RAM (ou seleciona um frame para substituição usando um algoritmo).
        5.  Se o frame selecionado estiver "sujo" (modificado), seu conteúdo é escrito de volta na memória secundária (swap-out).
        6.  A página necessária é carregada da memória secundária para o frame selecionado na RAM (swap-in).
        7.  A tabela de páginas é atualizada.
        8.  O processo é reiniciado a partir da instrução que causou a falha.
*   **Vantagens:**
    *   Permite executar programas maiores que a memória física.
    *   Aumenta o grau de multiprogramação (mais processos podem residir parcialmente na memória).
    *   Alocação de memória mais eficiente, pois apenas as partes ativas do programa precisam estar na RAM.
*   **Desvantagens:**
    *   Sobrecarga devido ao tratamento de falhas de página e operações de E/S com a memória secundária.
    *   **Thrashing:** Se um sistema passa a maior parte do tempo trocando páginas entre a RAM e o disco (devido à falta de frames suficientes para os processos ativos), o desempenho degrada drasticamente.

### 2.8. Algoritmos de Substituição de Página

Quando ocorre uma falha de página e não há frames livres, o SO deve escolher uma página na RAM para ser substituída (enviada para o swap). Alguns algoritmos comuns:

*   **FIFO (First-In, First-Out):** Substitui a página que está na memória há mais tempo. Simples, mas pode remover páginas frequentemente usadas.
*   **LRU (Least Recently Used):** Substitui a página que não foi usada por mais tempo. Bom desempenho, mas difícil de implementar perfeitamente (requer hardware de suporte ou aproximações).
*   **LFU (Least Frequently Used):** Substitui a página que foi usada menos vezes.
*   **Clock (Segunda Chance):** Variação do FIFO que dá uma "segunda chance" para páginas que foram referenciadas recentemente.
*   **NRU (Not Recently Used):** Aproximação do LRU, classifica as páginas com base em bits de referência e modificação.
*   **Algoritmo Ótimo (OPT/MIN):** Substitui a página que não será usada por mais tempo no futuro. Ideal, mas impossível de implementar na prática, pois requer conhecimento futuro. Usado como base de comparação.

### 2.9. Garbage Collection (Coleta de Lixo)

*   **Conceito:** Gerenciamento automático de memória em algumas linguagens de programação (ex: Java, C#). O coletor de lixo identifica e libera automaticamente a memória que foi alocada por um programa, mas não está mais sendo referenciada (lixo).
*   **Objetivo:** Evitar vazamentos de memória (memory leaks) e o acesso a ponteiros inválidos (dangling pointers) que podem ocorrer com o gerenciamento manual de memória.

## 3. Gerenciamento de Arquivos

O sistema de gerenciamento de arquivos é a parte do sistema operacional responsável por organizar e controlar o armazenamento e o acesso a arquivos e diretórios em dispositivos de armazenamento secundário (discos rígidos, SSDs, etc.).

**Conceitos Fundamentais:**

*   **Arquivo:** Uma coleção nomeada de informações relacionadas, registrada em armazenamento secundário. Do ponto de vista do usuário, é a menor unidade lógica de armazenamento.
*   **Diretório (Pasta):** Uma estrutura que agrupa arquivos e outros diretórios, permitindo uma organização hierárquica dos dados.
*   **Metadados:** Informações sobre o arquivo, como nome, tipo, tamanho, datas de criação/modificação, permissões, proprietário, localização no disco.

**Funções do Sistema de Gerenciamento de Arquivos:**

*   Criar, excluir, ler, escrever e modificar arquivos e diretórios.
*   Mapear arquivos para o armazenamento físico (blocos no disco).
*   Gerenciar o espaço livre no dispositivo de armazenamento.
*   Fornecer mecanismos de proteção e controle de acesso.
*   Manter a integridade e consistência dos dados.

**Operações Comuns com Arquivos:**

*   **Criar (Create):** Criar um novo arquivo vazio ou com conteúdo inicial.
*   **Escrever (Write):** Gravar dados em um arquivo.
*   **Ler (Read):** Ler dados de um arquivo.
*   **Reposicionar (Seek):** Mover o ponteiro de arquivo para uma posição específica dentro do arquivo.
*   **Excluir (Delete/Remove):** Remover um arquivo do sistema de arquivos.
*   **Truncar (Truncate):** Apagar o conteúdo de um arquivo, mantendo seus atributos, ou reduzir seu tamanho.
*   **Abrir (Open):** Preparar um arquivo para acesso, retornando um descritor de arquivo.
*   **Fechar (Close):** Liberar os recursos associados a um arquivo aberto.
*   **Renomear (Rename):** Alterar o nome de um arquivo ou diretório.
*   **Listar Diretório (List):** Exibir o conteúdo de um diretório.

**Atributos de Arquivos:**

*   **Nome:** Identificador simbólico do arquivo.
*   **Tipo:** Indica a natureza do arquivo (executável, texto, imagem, etc.).
*   **Tamanho:** Quantidade de dados no arquivo.
*   **Localização:** Ponteiro para a localização física do arquivo no dispositivo.
*   **Proteção (Permissões):** Define quem pode ler, escrever ou executar o arquivo (ex: rwxr-xr--).
*   **Datas/Horas:** Criação, última modificação, último acesso.
*   **Proprietário/Grupo:** Identifica o usuário e o grupo donos do arquivo.

**Sistemas de Arquivos (File Systems):**

Um sistema de arquivos define a estrutura lógica e as regras para armazenar e organizar arquivos em um dispositivo.

*   **FAT (File Allocation Table):**
    *   **FAT12, FAT16, FAT32:** Versões mais antigas, simples, usadas em disquetes, pen drives e cartões de memória. FAT32 superou limitações de tamanho de partição e arquivo do FAT16, mas ainda tem um limite de 4GB por arquivo.
    *   **Características:** Tabela de alocação de arquivos que indica quais blocos (clusters) pertencem a cada arquivo. Simples, mas propenso à fragmentação e com recursos limitados de segurança e recuperação.
*   **exFAT (Extended File Allocation Table):**
    *   **Características:** Evolução do FAT32, projetado para dispositivos de armazenamento flash (pen drives, cartões SD de alta capacidade). Remove o limite de 4GB por arquivo e suporta tamanhos de volume maiores. Otimizado para dispositivos flash.
*   **NTFS (New Technology File System):**
    *   **Características:** Sistema de arquivos padrão para as versões modernas do Windows (NT, XP, Vista, 7, 8, 10, 11, Server).
    *   **Recursos Avançados:**
        *   **Journaling:** Mantém um log de alterações antes de aplicá-las, melhorando a recuperação em caso de falhas.
        *   **Segurança:** Listas de Controle de Acesso (ACLs) para permissões granulares de arquivos e diretórios.
        *   **Compressão de Arquivos:** Permite comprimir arquivos e pastas individualmente.
        *   **Criptografia (EFS - Encrypting File System):** Permite criptografar arquivos e pastas.
        *   **Cotas de Disco:** Limita o espaço em disco que um usuário pode utilizar.
        *   **Links Simbólicos e Hard Links.**
        *   **Suporte a arquivos grandes e volumes grandes.**
*   **Sistemas de Arquivos do Linux (ext*, XFS, Btrfs, etc.):**
    *   **ext2 (Second Extended Filesystem):** Um dos primeiros sistemas de arquivos padrão do Linux. Robusto, mas sem journaling.
    *   **ext3 (Third Extended Filesystem):** Adicionou journaling ao ext2, melhorando a recuperação após falhas.
    *   **ext4 (Fourth Extended Filesystem):** Evolução do ext3, com suporte a volumes e arquivos maiores, melhor desempenho, extents (para reduzir fragmentação), e outras melhorias. É o padrão em muitas distribuições Linux.
    *   **XFS:** Sistema de arquivos de alto desempenho, com bom suporte para arquivos grandes e paralelismo. Originalmente desenvolvido pela SGI.
    *   **Btrfs (B-tree File System):** Sistema de arquivos moderno com recursos avançados como snapshots, copy-on-write, compressão transparente, RAID integrado e verificação de integridade de dados.
*   **HFS+ (Hierarchical File System Plus):** Usado em versões mais antigas do macOS. Com journaling e outros recursos.
*   **APFS (Apple File System):** Sistema de arquivos moderno da Apple, otimizado para SSDs, usado no macOS High Sierra e posteriores, iOS, tvOS e watchOS. Oferece criptografia forte, snapshots, compartilhamento de espaço, etc.

**Estrutura de Diretórios:**

*   **Hierárquica:** Organiza arquivos e diretórios em uma estrutura de árvore, com um diretório raiz no topo.
*   **Caminho (Path):** Sequência de diretórios que leva a um arquivo ou diretório específico (ex: `/home/usuario/documentos/arquivo.txt` ou `C:\Usuarios\Nome\Documentos\arquivo.docx`).

## 4. Gerenciamento de Processos

Um **processo** é um programa em execução. É uma entidade dinâmica que representa uma instância de um programa, juntamente com seu estado atual, dados e recursos alocados pelo sistema operacional.

**Componentes de um Processo:**

*   **Código do Programa (Segmento de Texto):** As instruções de máquina.
*   **Dados Atuais:** Variáveis globais (segmento de dados), pilha (stack) para variáveis locais e informações de chamadas de função, e heap para memória alocada dinamicamente.
*   **Contador de Programa (PC):** Indica a próxima instrução a ser executada.
*   **Conteúdo dos Registradores da CPU.**
*   **Bloco de Controle de Processo (BCP / PCB - Process Control Block):** Estrutura de dados mantida pelo SO que armazena todas as informações sobre um processo.

**Bloco de Controle de Processo (BCP):** Contém informações vitais sobre o processo, como:

*   **ID do Processo (PID):** Identificador único.
*   **Estado do Processo:** (ver abaixo).
*   **Contador de Programa (PC).**
*   **Valores dos Registradores da CPU.**
*   **Informações de Escalonamento:** Prioridade, ponteiros para filas de escalonamento.
*   **Informações de Gerenciamento de Memória:** Ponteiros para tabelas de página/segmento.
*   **Informações Contábeis:** Tempo de CPU usado, limites de tempo.
*   **Informações de E/S:** Lista de dispositivos de E/S alocados, arquivos abertos.

**Estados de um Processo:**

Um processo passa por diferentes estados durante seu ciclo de vida:

1.  **Novo (New):** O processo está sendo criado.
2.  **Pronto (Ready):** O processo está pronto para executar e aguardando ser alocado à CPU pelo escalonador.
3.  **Executando (Running):** As instruções do processo estão sendo executadas pela CPU.
4.  **Esperando/Bloqueado (Waiting/Blocked):** O processo está esperando por algum evento ocorrer (ex: conclusão de uma operação de E/S, recebimento de um sinal, liberação de um recurso).
5.  **Terminado (Terminated/Exit):** O processo concluiu sua execução ou foi finalizado pelo SO.

**Transições de Estado:**

*   Novo → Pronto: Após a criação e inicialização.
*   Pronto → Executando: Quando o escalonador seleciona o processo.
*   Executando → Pronto: Quando ocorre uma preempção (ex: quantum expirou, processo de maior prioridade chegou).
*   Executando → Esperando: Quando o processo solicita uma operação de E/S ou espera por um evento.
*   Executando → Terminado: Quando o processo finaliza sua execução normal ou é abortado.
*   Esperando → Pronto: Quando o evento pelo qual o processo esperava ocorre.

**Escalonamento de Processos (Scheduling):**

O escalonador de processos é o componente do SO que decide qual processo na fila de prontos deve ser alocado à CPU.

**Tipos de Escalonadores:**

*   **Escalonador de Longo Prazo (Job Scheduler):** Seleciona processos do disco (pool de jobs) para serem carregados na memória (fila de prontos). Controla o grau de multiprogramação.
*   **Escalonador de Curto Prazo (CPU Scheduler):** Seleciona um processo da fila de prontos para ser executado na CPU. Executado com muita frequência.
*   **Escalonador de Médio Prazo (Swapper):** Remove processos da memória (swap out) para reduzir o grau de multiprogramação ou libera espaço, e posteriormente os reintroduz (swap in). Relacionado à memória virtual.

**Objetivos do Escalonamento:**

*   **Justiça (Fairness):** Garantir que cada processo receba uma parcela justa do tempo da CPU.
*   **Eficiência da CPU (CPU Utilization):** Manter a CPU o mais ocupada possível.
*   **Vazão (Throughput):** Maximizar o número de processos concluídos por unidade de tempo.
*   **Tempo de Turnaround:** Minimizar o tempo total desde a submissão de um processo até sua conclusão.
*   **Tempo de Espera (Waiting Time):** Minimizar o tempo que um processo passa na fila de prontos.
*   **Tempo de Resposta (Response Time):** Minimizar o tempo desde a submissão de uma requisição até a primeira resposta ser produzida (importante para sistemas interativos).

**Algoritmos de Escalonamento:**

*   **Preemptivos:** O SO pode interromper um processo em execução para alocar a CPU a outro (ex: por quantum ou prioridade).
*   **Não Preemptivos:** Um processo em execução mantém a CPU até que ele a libere voluntariamente (terminando ou bloqueando).

1.  **First-Come, First-Served (FCFS) / First-In, First-Out (FIFO):**
    *   Não preemptivo. Processos são atendidos na ordem de chegada.
    *   Simples, mas pode levar ao "efeito comboio" (processos curtos esperando por processos longos).
2.  **Shortest Job First (SJF):**
    *   Pode ser não preemptivo ou preemptivo (Shortest Remaining Time First - SRTF).
    *   Escalona o processo com o menor tempo de execução (ou tempo restante) estimado.
    *   Ótimo para minimizar o tempo médio de espera, mas difícil de prever o tempo de execução futuro e pode levar à inanição (starvation) de processos longos.
3.  **Round Robin (RR):**
    *   Preemptivo. Cada processo recebe uma pequena unidade de tempo da CPU (quantum ou time slice). Se o processo não terminar nesse quantum, ele é movido para o final da fila de prontos.
    *   Adequado para sistemas de tempo compartilhado, garante um tempo de resposta razoável. O desempenho depende do tamanho do quantum.
4.  **Escalonamento por Prioridade:**
    *   Pode ser preemptivo ou não preemptivo. Cada processo tem uma prioridade, e a CPU é alocada ao processo com a maior prioridade (menor número de prioridade, em algumas implementações).
    *   Pode levar à inanição de processos de baixa prioridade. Solução: aging (aumentar a prioridade de processos que esperam por muito tempo).
5.  **Múltiplas Filas (Multilevel Queue Scheduling):**
    *   A fila de prontos é dividida em várias filas separadas, cada uma com seu próprio algoritmo de escalonamento (ex: uma fila para processos interativos com RR, outra para processos batch com FCFS).
    *   O escalonamento entre as filas pode ser por prioridade fixa.
6.  **Múltiplas Filas com Realimentação (Multilevel Feedback Queue Scheduling):**
    *   Permite que um processo mude de fila. Se um processo usa muito tempo de CPU, pode ser movido para uma fila de prioridade mais baixa. Se espera por muito tempo, pode ser movido para uma fila de prioridade mais alta. Tenta equilibrar justiça e tempo de resposta.

**Comunicação entre Processos (IPC - Inter-Process Communication):**

Mecanismos que permitem que processos cooperantes troquem dados e informações.

*   **Memória Compartilhada (Shared Memory):**
    *   Uma região da memória é designada como compartilhada por dois ou mais processos.
    *   Os processos podem ler e escrever nessa área diretamente.
    *   Rápido, pois não envolve o kernel diretamente na transferência de dados (após a configuração inicial).
    *   Requer mecanismos de sincronização (ex: semáforos, mutexes) para evitar condições de corrida.
*   **Troca de Mensagens (Message Passing):**
    *   Processos se comunicam enviando e recebendo mensagens através do kernel.
    *   Mais simples de implementar para o programador em termos de sincronização, pois o kernel gerencia a comunicação.
    *   Pode ser mais lento devido à sobrecarga do kernel.
    *   **Mecanismos:**
        *   **Pipes:** Canais de comunicação unidirecionais.
            *   **Pipes Anônimos:** Usados entre processos relacionados (pai e filho).
            *   **Pipes Nomeados (FIFOs):** Permitem comunicação entre processos não relacionados, usando um nome no sistema de arquivos.
        *   **Filas de Mensagens (Message Queues):** Permitem que processos troquem mensagens de forma assíncrona. As mensagens são armazenadas em uma fila até serem lidas.
        *   **Sockets:** Usados para comunicação em rede, mas também podem ser usados para IPC local.
        *   **Chamada de Procedimento Remoto (RPC - Remote Procedure Call):** Permite que um processo chame uma função/procedimento em outro processo (local ou remoto) como se fosse uma chamada local.

**Sincronização entre Processos:** Mecanismos para coordenar o acesso a recursos compartilhados e evitar condições de corrida e deadlocks. Exemplos: semáforos, mutexes, monitores, variáveis de condição.

**Criação de Processos:**

*   Um processo pode criar outros processos (processos filhos).
*   No Unix/Linux, a chamada de sistema `fork()` cria uma cópia do processo pai. A chamada `exec()` substitui a imagem do processo atual por um novo programa.

## 5. Gerenciamento de Entrada e Saída (E/S)

O sistema de gerenciamento de E/S do SO controla a interação entre a CPU/memória e os diversos dispositivos periféricos. Ele abstrai as complexidades do hardware dos dispositivos para os aplicativos.

**Componentes:**

*   **Drivers de Dispositivo (Device Drivers):** Software específico para cada tipo de dispositivo que entende como se comunicar com o hardware daquele dispositivo. Ele traduz as requisições genéricas de E/S do SO em comandos específicos para o controlador do dispositivo.
*   **Controladores de Dispositivo:** Hardware (chips eletrônicos) que controla a operação física de um dispositivo de E/S.
*   **Portas de E/S e Barramentos:** Permitem a conexão física e a transferência de dados entre os dispositivos e o sistema.

**Técnicas de Transferência de E/S:**

1.  **E/S Programada (Programmed I/O - PIO):**
    *   **Funcionamento:** A CPU tem controle total sobre a operação de E/S. Ela envia comandos para o controlador do dispositivo, verifica o status do dispositivo em loop (polling) até que ele esteja pronto, e então transfere os dados, um byte ou uma palavra por vez.
    *   **Vantagens:** Simples de implementar.
    *   **Desvantagens:** Ineficiente, pois a CPU gasta muito tempo em polling, ficando indisponível para outras tarefas enquanto espera pelo dispositivo (busy-waiting).

2.  **E/S Controlada por Interrupção (Interrupt-Driven I/O):**
    *   **Funcionamento:** A CPU inicia a operação de E/S e continua executando outras tarefas. Quando o dispositivo de E/S completa a operação (ou precisa de atenção), ele envia um sinal de interrupção para a CPU. A CPU então suspende o processo atual, trata a interrupção (geralmente transferindo os dados ou sinalizando a conclusão da E/S para o processo que a solicitou) e depois retoma o processo interrompido ou seleciona outro.
    *   **Vantagens:** Mais eficiente que a E/S programada, pois a CPU não fica presa em polling e pode realizar outras tarefas.
    *   **Desvantagens:** A transferência de dados ainda é feita pela CPU, o que pode ser um gargalo para grandes volumes de dados. O tratamento de interrupções tem uma certa sobrecarga.

3.  **Acesso Direto à Memória (DMA - Direct Memory Access):**
    *   **Funcionamento:** Permite que um controlador de DMA (hardware especializado) transfira blocos de dados diretamente entre um dispositivo de E/S e a memória principal, sem a intervenção constante da CPU.
        1.  A CPU configura o controlador de DMA com o endereço de memória de origem/destino, o número de bytes a serem transferidos e a direção da transferência.
        2.  O controlador de DMA assume o controle do barramento de memória (ou usa um barramento dedicado) e realiza a transferência dos dados.
        3.  A CPU fica livre para executar outras tarefas durante a transferência.
        4.  Quando a transferência é concluída, o controlador de DMA envia uma interrupção para a CPU.
    *   **Vantagens:** Muito eficiente para transferir grandes volumes de dados, pois libera a CPU da tarefa de transferência byte a byte. Reduz significativamente a sobrecarga da CPU.
    *   **Desvantagens:** Requer hardware de controlador de DMA. Pode introduzir problemas de **coerência de cache**, pois a memória pode ser modificada pelo DMA sem que a cache da CPU seja atualizada (ou vice-versa). Soluções para coerência de cache incluem hardware de snooping ou invalidação/flush de cache gerenciado pelo software.

**Outros Aspectos do Gerenciamento de E/S:**

*   **Buffering:** Uso de áreas de memória temporária (buffers) para armazenar dados durante a transferência entre dispositivos de diferentes velocidades.
*   **Caching:** Similar ao buffering, mas armazena cópias de dados que são acessados com frequência para acelerar acessos futuros.
*   **Spooling:** Coloca jobs de E/S (ex: impressão) em uma fila em disco, permitindo que o dispositivo os acesse quando estiver livre e liberando os processos solicitantes mais rapidamente.
*   **Interface de Dispositivo Uniforme:** O SO tenta fornecer uma interface padronizada para os aplicativos acessarem diferentes tipos de dispositivos, escondendo as particularidades de cada hardware.
---

Este resumo abrange os principais conceitos de cada subtópico de Sistemas Operacionais, focando nos aspectos relevantes para um concurso de Perito em Informática. É fundamental complementar este estudo com a resolução de questões de concursos anteriores da banca CEBRASPE para se familiarizar com o estilo de cobrança e a profundidade dos temas.
