# Arquitetura de Computadores para Concursos (Perito em Informática - CEBRASPE)

## 1. Arquitetura de Von Neumann

A Arquitetura de Von Neumann, proposta pelo matemático John von Neumann, é um modelo de arquitetura de computador que se caracteriza por possuir uma única unidade de armazenamento tanto para instruções quanto para dados. Isso significa que programas e os dados que eles manipulam residem no mesmo espaço de memória física.

**Componentes Principais:**

1.  **Unidade Central de Processamento (CPU):** Responsável por executar as instruções. É composta por:
    *   **Unidade de Controle (UC):** Busca as instruções na memória, decodifica-as e coordena a execução.
    *   **Unidade Lógica e Aritmética (ULA):** Realiza operações lógicas (AND, OR, NOT) e aritméticas (soma, subtração).
    *   **Registradores:** Pequenas unidades de memória de alta velocidade dentro da CPU, usadas para armazenar temporariamente dados e instruções em processamento.

2.  **Memória Principal:** Armazena tanto as instruções dos programas quanto os dados que esses programas utilizam. É acessada pela CPU para buscar instruções e para ler/escrever dados.

3.  **Sistema de Entrada e Saída (E/S):** Permite a comunicação do computador com o mundo externo (usuários, outros dispositivos). Inclui periféricos como teclado, mouse, monitor, discos rígidos, etc.

4.  **Barramentos:** Conjunto de vias de comunicação que interligam os diferentes componentes do computador (CPU, memória, dispositivos de E/S). Existem três tipos principais de barramentos:
    *   **Barramento de Dados:** Transporta os dados entre a CPU, a memória e os dispositivos de E/S.
    *   **Barramento de Endereços:** Transporta os endereços de memória que a CPU deseja acessar para leitura ou escrita.
    *   **Barramento de Controle:** Transporta sinais de controle e status entre os componentes (ex: sinais de leitura/escrita, interrupções).

**Ciclo de Instrução (Ciclo de Von Neumann):**

O funcionamento básico de um processador Von Neumann segue um ciclo repetitivo:

1.  **Busca (Fetch):** A UC busca a próxima instrução a ser executada da memória principal, utilizando o endereço armazenado no Contador de Programa (PC).
2.  **Decodificação (Decode):** A UC interpreta a instrução buscada para determinar qual operação deve ser realizada.
3.  **Busca de Operandos (Fetch Operands):** Se a instrução requer dados da memória, a UC busca esses dados.
4.  **Execução (Execute):** A ULA executa a operação definida pela instrução, utilizando os operandos buscados.
5.  **Armazenamento de Resultado (Store Result):** O resultado da execução é armazenado em um registrador ou na memória principal.
6.  O PC é atualizado para apontar para a próxima instrução, e o ciclo recomeça.

**Vantagens:**

*   **Simplicidade e Custo:** A arquitetura é mais simples de implementar e, consequentemente, mais barata, devido ao uso compartilhado da memória e dos barramentos.
*   **Flexibilidade:** Programas podem ser tratados como dados, permitindo que sejam modificados, criados ou analisados por outros programas (base para compiladores, montadores, etc.).

**Desvantagens:**

*   **Gargalo de Von Neumann:** A principal desvantagem. Como instruções e dados compartilham o mesmo barramento para acesso à memória, há uma limitação na taxa de transferência entre a CPU e a memória. A CPU frequentemente precisa esperar por dados ou instruções da memória, o que limita a velocidade geral do processamento. Esse gargalo se torna mais crítico à medida que a velocidade da CPU aumenta em relação à velocidade da memória.

## 2. Arquiteturas RISC e CISC

RISC (Reduced Instruction Set Computer) e CISC (Complex Instruction Set Computer) são duas filosofias distintas de design de conjuntos de instruções para processadores.

### 2.1. CISC (Complex Instruction Set Computer)

**Filosofia:** Prover um conjunto de instruções grande e complexo, onde cada instrução pode realizar múltiplas operações de baixo nível (como carregar da memória, realizar uma operação aritmética e armazenar na memória) em um único comando. A ideia era aproximar as instruções de máquina das operações de linguagens de alto nível, facilitando a escrita de compiladores e reduzindo o tamanho do código em assembly.

**Características Principais:**

*   **Grande número de instruções:** Muitas instruções, algumas bastante específicas e raramente utilizadas.
*   **Instruções de formato variável:** As instruções podem ter tamanhos diferentes.
*   **Múltiplos ciclos por instrução:** Muitas instruções levam vários ciclos de clock para serem executadas, dependendo da sua complexidade e dos acessos à memória.
*   **Diversos modos de endereçamento:** Suporte a uma variedade de formas de acessar operandos na memória (direto, indireto, indexado, etc.).
*   **Uso de microcódigo:** Instruções complexas são frequentemente implementadas como uma sequência de microinstruções (microcódigo) armazenadas em uma memória de controle (ROM) dentro da CPU.
*   **Menor número de registradores:** Comparado ao RISC, pois as operações podem acessar a memória diretamente com mais frequência.

**Vantagens:**

*   **Compiladores (inicialmente):** Acreditava-se que facilitaria a criação de compiladores, pois as instruções de máquina eram mais próximas das construções de linguagens de alto nível.
*   **Densidade de Código:** Programas em assembly ou código de máquina tendem a ser menores, pois cada instrução realiza mais trabalho. Isso era importante quando a memória era cara e limitada.
*   **Compatibilidade Retroativa:** Fabricantes como a Intel (com a família x86) mantiveram compatibilidade com versões anteriores, o que é um fator de mercado importante.

**Desvantagens:**

*   **Complexidade do Hardware:** O design da CPU é mais complexo devido à necessidade de decodificar e executar uma vasta gama de instruções e modos de endereçamento.
*   **Desempenho:** Instruções complexas podem levar muitos ciclos de clock, e nem sempre as instruções mais eficientes são escolhidas pelos compiladores.
*   **Dificuldade de Pipelining Eficaz:** A variabilidade no formato e no tempo de execução das instruções torna o pipelining (técnica de sobrepor a execução de múltiplas instruções) mais difícil de implementar eficientemente.
*   **Apenas uma pequena parte das instruções é frequentemente usada:** Estudos mostraram que muitos programas utilizam apenas um subconjunto limitado das instruções complexas disponíveis.

**Exemplos:** Intel x86 (usado na maioria dos desktops e servidores), Motorola 68000.

### 2.2. RISC (Reduced Instruction Set Computer)

**Filosofia:** Favorecer um conjunto de instruções pequeno, simples e otimizado, onde cada instrução executa uma única operação e geralmente em um único ciclo de clock. A complexidade é transferida do hardware para o software (compilador).

**Características Principais:**

*   **Pequeno número de instruções:** Conjunto de instruções reduzido e padronizado.
*   **Instruções de formato fixo:** Todas as instruções têm o mesmo tamanho, simplificando a decodificação.
*   **Execução em um único ciclo (idealmente):** A maioria das instruções é projetada para ser executada em um único ciclo de clock.
*   **Arquitetura Load/Store:** Apenas instruções específicas (LOAD e STORE) acessam a memória. Operações aritméticas e lógicas ocorrem apenas entre registradores.
*   **Grande número de registradores:** Para facilitar o armazenamento de operandos e resultados intermediários, minimizando acessos à memória.
*   **Controle por hardware (Hardwired):** A lógica de controle é implementada diretamente no hardware, em vez de microcódigo, o que é mais rápido.
*   **Pipelining eficiente:** O formato fixo e a execução em ciclo único facilitam a implementação de pipelines eficientes.

**Vantagens:**

*   **Desempenho:** Execução mais rápida de instruções individuais e melhor aproveitamento do pipelining levam a um maior throughput.
*   **Simplicidade do Hardware:** CPUs mais simples, com menos transistores, o que pode levar a um menor custo de fabricação e menor consumo de energia.
*   **Compiladores Otimizados:** Compiladores modernos são capazes de gerar código altamente otimizado para arquiteturas RISC, aproveitando o grande número de registradores.
*   **Menor tempo de projeto:** A simplicidade do design pode levar a ciclos de desenvolvimento mais curtos.

**Desvantagens:**

*   **Densidade de Código:** Programas em código de máquina podem ser maiores, pois mais instruções simples são necessárias para realizar tarefas complexas que uma única instrução CISC poderia fazer. Isso pode aumentar a demanda por memória e largura de banda.
*   **Dependência do Compilador:** O desempenho depende fortemente da qualidade do compilador para otimizar o código e gerenciar os registradores eficientemente.

**Exemplos:** ARM (amplamente usado em dispositivos móveis e embarcados), MIPS, PowerPC, SPARC, RISC-V.

**Tendências Atuais:**

A distinção entre RISC e CISC tem se tornado menos nítida. Processadores CISC modernos, como os x86 da Intel e AMD, internamente traduzem instruções CISC complexas em sequências de micro-operações (µops) semelhantes a instruções RISC, que são então executadas por um núcleo otimizado com técnicas de pipelining e execução superescalar. Por outro lado, algumas arquiteturas RISC adicionaram instruções mais complexas para tarefas específicas.

## 3. Memória Cache

Memória cache é uma pequena quantidade de memória de alta velocidade, volátil, posicionada entre a CPU e a memória principal (RAM). Sua função é armazenar cópias dos dados e instruções da RAM que são acessados com mais frequência ou que têm alta probabilidade de serem requisitados em breve pela CPU.

**Princípio de Funcionamento:**

O uso de cache é baseado no **Princípio da Localidade de Referência**, que possui duas componentes:

1.  **Localidade Temporal:** Se um item (dado ou instrução) foi referenciado recentemente, é provável que seja referenciado novamente em breve.
2.  **Localidade Espacial:** Se um item foi referenciado, é provável que itens em posições de memória próximas a ele sejam referenciados em breve (ex: elementos de um vetor, instruções sequenciais de um programa).

**Operação Básica:**

1.  Quando a CPU precisa de um dado ou instrução, ela primeiro verifica se ele está na cache (**Cache Hit**).
2.  Se estiver (Cache Hit), a CPU acessa o dado diretamente da cache, que é muito mais rápido do
    que acessar a RAM. A porcentagem de acessos que resultam em Cache Hit é chamada de **Taxa de Acerto (Hit Rate)**.
3.  Se não estiver (**Cache Miss**), a CPU busca o dado da RAM. Uma cópia desse dado (geralmente um bloco de dados contendo o item requisitado e vizinhos) é então transferida da RAM para a cache, para que acessos futuros a ele (ou a dados próximos) sejam mais rápidos.

**Níveis de Cache:**

Processadores modernos geralmente possuem múltiplos níveis de cache, organizados hierarquicamente:

*   **Cache L1 (Level 1):** É a menor e mais rápida cache, geralmente embutida no próprio núcleo da CPU. Costuma ser dividida em cache de instruções (L1i) e cache de dados (L1d) para otimizar o fluxo de busca de instruções e dados.
    *   **Tamanho Típico:** Dezenas de KB (ex: 32KB, 64KB, 128KB por núcleo).
    *   **Velocidade:** Extremamente rápida, acessada em poucos ciclos de clock.

*   **Cache L2 (Level 2):** Maior e um pouco mais lenta que a L1, mas ainda significativamente mais rápida que a RAM. Pode ser exclusiva para cada núcleo ou compartilhada entre alguns núcleos.
    *   **Tamanho Típico:** Centenas de KB a poucos MB (ex: 256KB, 512KB, 1MB, 2MB por núcleo ou compartilhado).
    *   **Velocidade:** Mais lenta que L1, mas muito mais rápida que a RAM.

*   **Cache L3 (Level 3):** Maior e mais lenta que a L2, geralmente compartilhada por todos os núcleos da CPU. Serve como um último nível de cache antes de acessar a RAM. Nem todos os processadores possuem L3.
    *   **Tamanho Típico:** Vários MB (ex: 8MB, 16MB, 32MB, 64MB ou mais, compartilhado).
    *   **Velocidade:** Mais lenta que L2, mas ainda mais rápida que a RAM.

*   **Cache L4 (Level 4):** Menos comum, pode existir em alguns sistemas como um nível adicional de cache, às vezes fora do chip da CPU, utilizando eDRAM (embedded DRAM) por exemplo.

**Políticas de Mapeamento (Como os blocos da RAM são mapeados para as linhas da Cache):**

1.  **Mapeamento Direto:** Cada bloco da memória principal só pode ser mapeado para uma linha específica da cache.
    *   **Vantagem:** Simples e barato de implementar.
    *   **Desvantagem:** Pode levar a colisões (conflitos), onde blocos que mapeiam para a mesma linha da cache se substituem constantemente, mesmo que outras linhas estejam livres, diminuindo a taxa de acerto.

2.  **Mapeamento Totalmente Associativo:** Um bloco da memória principal pode ser carregado em qualquer linha da cache.
    *   **Vantagem:** Máxima flexibilidade, reduz conflitos e pode levar a uma melhor taxa de acerto.
    *   **Desvantagem:** Complexo e caro de implementar, pois requer a comparação da tag do endereço com todas as linhas da cache simultaneamente.

3.  **Mapeamento Associativo por Conjunto (N-way Set Associative):** Um meio-termo entre o direto e o totalmente associativo. A cache é dividida em conjuntos (sets), cada um contendo N linhas. Um bloco da memória principal é mapeado para um conjunto específico, mas pode ocupar qualquer uma das N linhas dentro desse conjunto.
    *   **Vantagem:** Bom equilíbrio entre desempenho e custo/complexidade. Reduz conflitos em comparação com o mapeamento direto, sem a complexidade total do mapeamento associativo.
    *   **Desvantagem:** Mais complexo que o mapeamento direto.

**Políticas de Substituição (Qual bloco remover da cache quando ela está cheia e ocorre um Cache Miss):**

*   **LRU (Least Recently Used):** Substitui o bloco que foi usado menos recentemente.
*   **FIFO (First-In, First-Out):** Substitui o bloco que está na cache há mais tempo.
*   **LFU (Least Frequently Used):** Substitui o bloco que foi acessado menos vezes.
*   **Aleatória:** Substitui um bloco escolhido aleatoriamente.

**Políticas de Escrita (Como as atualizações nos dados da cache são refletidas na RAM):**

1.  **Write-Through (Escrita Direta):** Toda escrita na cache é imediatamente replicada na memória principal.
    *   **Vantagem:** Simplicidade e consistência entre cache e RAM.
    *   **Desvantagem:** Pode gerar muito tráfego para a RAM e ser mais lento, pois a CPU precisa esperar a escrita na RAM ser concluída.

2.  **Write-Back (Escrita Posterior):** As escritas são feitas apenas na cache. O bloco modificado (marcado com um "dirty bit") só é escrito de volta na RAM quando precisa ser substituído na cache.
    *   **Vantagem:** Reduz o tráfego para a RAM e acelera as operações de escrita, pois a CPU não precisa esperar. Múltiplas escritas no mesmo bloco só resultam em uma única escrita na RAM.
    *   **Desvantagem:** Mais complexo de implementar e pode haver inconsistência temporária entre a cache e a RAM até que o bloco "sujo" seja escrito. Requer protocolos de coerência de cache em sistemas multiprocessados.

**Políticas de Escrita em Caso de "Write Miss" (O que fazer quando a CPU tenta escrever em um endereço que não está na cache):**

1.  **Write Allocate (Alocar na Escrita):** O bloco é primeiro carregado da RAM para a cache e, em seguida, a operação de escrita é realizada na cache. Geralmente usado com a política de write-back.
2.  **No-Write Allocate (Não Alocar na Escrita) / Write-Around:** O bloco é escrito diretamente na RAM, sem ser carregado para a cache. Geralmente usado com a política de write-through.

**Coerência de Cache:** Em sistemas multiprocessadores, onde cada processador pode ter sua própria cache, é crucial manter a consistência dos dados entre as caches e a memória principal. Protocolos de coerência de cache (ex: MESI) são usados para garantir que todas as cópias de um dado sejam consistentes.

**Vantagens da Memória Cache:**

*   **Aumento Significativo de Desempenho:** Reduz o tempo médio de acesso à memória, permitindo que a CPU opere mais próxima de sua velocidade máxima.
*   **Redução do Tráfego para a RAM:** Diminui a necessidade de acessos à memória principal, liberando o barramento de memória para outras operações.

**Desvantagens da Memória Cache:**

*   **Custo:** Memórias SRAM (usadas em caches) são mais caras por bit do que DRAM (usadas na RAM).
*   **Complexidade:** O gerenciamento da cache (políticas de mapeamento, substituição, escrita, coerência) adiciona complexidade ao design do processador e do sistema.
*   **Previsibilidade:** Em alguns cenários de tempo real, o comportamento do cache pode ser difícil de prever, o que pode ser um problema.

## 4. Barramentos (Buses)

Barramento, em arquitetura de computadores, é um subsistema de comunicação que transfere dados, endereços e sinais de controle entre os diversos componentes de um sistema computacional (CPU, memória, dispositivos de E/S) ou entre computadores.

**Componentes de um Barramento:**

*   **Linhas de Dados:** Transportam os dados propriamente ditos. A largura do barramento de dados (número de linhas) determina quantos bits podem ser transferidos simultaneamente (ex: 32 bits, 64 bits).
*   **Linhas de Endereço:** Especificam a origem ou o destino dos dados na memória principal ou nos dispositivos de E/S. A largura do barramento de endereços determina a quantidade máxima de memória que pode ser endereçada (ex: um barramento de 32 bits pode endereçar 2^32 bytes = 4GB de memória).
*   **Linhas de Controle:** Transmitem sinais de temporização e comando que sincronizam e gerenciam as operações no barramento. Exemplos:
    *   Sinais de leitura/escrita de memória.
    *   Sinais de requisição/concessão de barramento (para arbitragem).
    *   Sinais de interrupção.
    *   Sinais de clock.

**Tipos de Barramentos (Classificação Funcional):**

1.  **Barramento Interno (ou Barramento do Processador / Front-Side Bus - FSB em sistemas mais antigos):**
    *   Conecta a CPU à memória cache (L2 ou L3, se externa ao chip da CPU em designs mais antigos) e ao controlador de memória (ponte norte em chipsets tradicionais).
    *   Caracteriza-se por alta velocidade e grande largura de banda para atender às demandas da CPU.
    *   Em sistemas modernos, com o controlador de memória integrado à CPU e caches L1/L2/L3 no chip da CPU, a comunicação direta CPU-RAM usa links ponto-a-ponto de alta velocidade (ex: DDR). O termo FSB é menos relevante, sendo substituído por tecnologias como QPI (Intel) ou HyperTransport (AMD) para comunicação entre CPUs ou com o chipset.

2.  **Barramento de Memória:**
    *   Conecta o controlador de memória aos slots da memória RAM.
    *   Responsável por transferir dados entre a CPU (via controlador de memória) e a memória principal.

3.  **Barramento de Entrada e Saída (E/S) (ou Barramento de Expansão):**
    *   Permite a conexão de periféricos à placa-mãe através de slots de expansão (ex: PCI, PCIe) ou interfaces integradas.
    *   Existem diversos padrões, com diferentes velocidades e larguras de banda.

**Características dos Barramentos:**

*   **Largura (Width):** Número de bits que podem ser transferidos simultaneamente. Quanto maior a largura, maior a taxa de transferência de dados.
*   **Frequência (Clock Speed):** Medida em Hertz (Hz), indica o número de ciclos de transferência de dados por segundo. Maior frequência geralmente significa maior taxa de transferência.
*   **Taxa de Transferência (Throughput / Bandwidth):** Quantidade de dados que pode ser transferida por unidade de tempo. Geralmente calculada como: `Frequência × Largura (em bytes) × Número de Transferências por Ciclo`.
*   **Tipo de Transferência:**
    *   **Paralela:** Múltiplos bits são transferidos simultaneamente por linhas separadas. Vantajoso para altas taxas de transferência em curtas distâncias, mas sofre com problemas de sincronismo (skew) e interferência em altas frequências e longas distâncias.
    *   **Serial:** Bits são transferidos um após o outro por um ou poucos pares de linhas. Mais imune a ruídos e problemas de sincronismo em altas frequências, permitindo maiores taxas de transferência em distâncias maiores. Exemplos: SATA, USB, PCIe.
*   **Método de Arbitragem:** Define como o acesso ao barramento é controlado quando múltiplos dispositivos desejam usá-lo ao mesmo tempo.
    *   **Centralizada:** Um árbitro de barramento decide qual dispositivo ganha acesso.
    *   **Distribuída:** Os dispositivos cooperam para decidir quem usa o barramento.
*   **Temporização:**
    *   **Síncrona:** As operações são coordenadas por um sinal de clock comum a todos os dispositivos no barramento.
    *   **Assíncrona:** As operações não são controladas por um clock comum, mas por sinais de handshaking entre o transmissor e o receptor.

**Hierarquia de Barramentos:**

Computadores modernos utilizam uma hierarquia de barramentos para acomodar as diferentes velocidades e necessidades de transferência dos diversos componentes. Barramentos mais rápidos e caros são usados para componentes críticos como CPU e memória, enquanto barramentos mais lentos e baratos são usados para periféricos menos exigentes. Chipsets (ou seus equivalentes integrados à CPU) atuam como pontes entre esses diferentes barramentos.

**Exemplos de Barramentos de Expansão:**

*   **ISA (Industry Standard Architecture):** Antigo (8-bit e 16-bit), lento, usado em PCs mais antigos.
*   **PCI (Peripheral Component Interconnect):** Substituiu o ISA, mais rápido (32-bit ou 64-bit), ainda encontrado em alguns sistemas, mas largamente substituído pelo PCIe.
*   **AGP (Accelerated Graphics Port):** Barramento dedicado para placas de vídeo, mais rápido que o PCI para essa finalidade, mas substituído pelo PCIe.
*   **PCI Express (PCIe):** Padrão atual, barramento serial de alta velocidade, usa "lanes" (pistas) que podem ser agrupadas para aumentar a largura de banda (x1, x4, x8, x16). Conecta placas de vídeo, SSDs NVMe, placas de rede de alta velocidade, etc.
*   **USB (Universal Serial Bus):** Barramento serial para conectar periféricos externos (mouse, teclado, impressoras, pen drives).
*   **SATA (Serial ATA):** Barramento serial para conectar dispositivos de armazenamento internos (HDs, SSDs).

**Vantagens dos Barramentos:**

*   **Modularidade:** Permitem a fácil adição e remoção de componentes e periféricos.
*   **Padronização:** Padrões de barramento garantem a interoperabilidade entre dispositivos de diferentes fabricantes.
*   **Custo-Efetividade:** Permitem que diferentes componentes com diferentes requisitos de velocidade compartilhem vias de comunicação.

**Desvantagens dos Barramentos:**

*   **Gargalo Potencial:** Um barramento compartilhado pode se tornar um gargalo se muitos dispositivos tentarem usá-lo simultaneamente.
*   **Limitações de Velocidade e Distância:** Barramentos paralelos, em particular, têm limitações em altas frequências e longas distâncias.
*   **Complexidade da Arbitragem:** Gerenciar o acesso ao barramento pode adicionar complexidade.
---

Este resumo abrange os principais conceitos de cada subtópico, focando nos aspectos relevantes para um concurso de Perito em Informática. É importante complementar este estudo com questões de concursos anteriores da banca CEBRASPE para familiarizar-se com o estilo de cobrança.
