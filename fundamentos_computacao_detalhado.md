# Detalhamento dos Subtópicos de "1. Fundamentos da computação" (Edital Perito Criminal Federal – Área 3)

## 1. Fundamentos da computação.

Este tópico abrange os conceitos essenciais sobre o funcionamento dos computadores, desde sua estrutura física e lógica até os programas básicos que os gerenciam e as tecnologias que permitem seu uso eficiente e escalável.

---

### 1.1 Organização e arquitetura de computadores.

*   **Explicação:**
    *   **Organização de Computadores:** Descreve *como* os componentes físicos (Unidade Central de Processamento (UCP), memória, Entrada/Saída (E/S), barramentos) são interconectados e funcionam juntos para implementar as especificações da arquitetura. Foca nos aspectos de implementação, sinais de controle, interfaces e tecnologia de memória.
        *   **Exemplo Técnico:** A forma como a Unidade de Gerenciamento de Memória (MMU) traduz endereços virtuais para físicos, a hierarquia de barramentos (PCI Express (PCIe), SATA, Barramento Serial Universal (USB)) e seus protocolos de comunicação, os ciclos de relógio (clock) e a sincronização entre componentes.
    *   **Arquitetura de Computadores:** Descreve *o que* o computador faz do ponto de vista do programador. Inclui a Arquitetura do Conjunto de Instruções (ISA), tipos de dados, modos de endereçamento, organização da memória visível aos programas e registradores.
        *   **Exemplo Técnico:** A arquitetura x86-64 define instruções como `MOV`, `ADD`, `JMP`, registradores de 64 bits como `RAX`, `RBX`, e o modelo de memória segmentada/paginada. A arquitetura ARMv8-A (usada em muitos telefones inteligentes) tem um conjunto de instruções diferente (A64) e uma organização de registradores distinta.
*   **Relevância Forense:**
    *   Entender a Arquitetura do Conjunto de Instruções (ISA) ajuda a analisar software malicioso (malware) em baixo nível (linguagem de montagem - assembly).
    *   O conhecimento da organização da memória (memória cache L1/L2/L3, Memória de Acesso Aleatório (RAM)) é vital para a análise de memória volátil, onde fragmentos de dados cruciais (chaves de criptografia, senhas) podem residir temporariamente.
    *   A análise de como os dispositivos de Entrada/Saída (E/S) são organizados e endereçados pode ser crucial na aquisição de dados de sistemas embarcados ou danificados.
    *   Compreender a arquitetura de armazenamento (controladores de disco, interfaces) auxilia na interpretação de como os dados são fisicamente gravados e acessados.

---

### 1.2 Sistemas operacionais: arquiteturas e componentes.

*   **Explicação:** O Sistema Operacional (SO) é o programa que gerencia os componentes físicos e os programas do computador, fornecendo uma interface entre eles e o usuário/aplicativos.
    *   **Arquiteturas de SO:**
        *   **Monolítica:** Núcleo do Sistema Operacional único e grande, com todos os serviços rodando no mesmo espaço de endereço privilegiado. (Ex: MS-DOS, Linux tradicionalmente).
        *   **Em Camadas:** Estrutura hierárquica de camadas, cada uma provendo serviços para a camada superior.
        *   **Micronúcleo (Microkernel):** Núcleo do Sistema Operacional mínimo com apenas funções essenciais (comunicação interprocessos, gerenciamento básico de memória). Serviços como drivers (programas de dispositivo) e sistemas de arquivos rodam como processos de usuário. (Ex: Minix 3, QNX).
        *   **Híbrida (Modular):** Combina um núcleo do sistema operacional central com módulos carregáveis dinamicamente. (Ex: Windows NT/XP/.../11, macOS, Linux moderno com módulos).
    *   **Componentes Principais:** Núcleo do Sistema Operacional (Kernel), Gerenciador de Memória, Gerenciador de Arquivos, Gerenciador de Entrada/Saída (E/S).
*   **Relevância Forense:**
    *   A arquitetura do SO impacta onde os artefatos forenses são armazenados (arquivos de registro, registros do sistema, estruturas de dados do núcleo do sistema operacional).
    *   O conhecimento específico do SO de um dispositivo apreendido é fundamental para saber como extrair dados, analisar processos, permissões e interações de baixo nível.
    *   Rootkits (conjuntos de software malicioso para acesso privilegiado) e softwares maliciosos avançados frequentemente exploram ou modificam componentes da arquitetura do SO (especialmente o núcleo do sistema operacional) para se ocultarem ou ganharem privilégios.

    ---
    #### 1.2.1 Núcleo do Sistema Operacional (Kernel).
    *   **Explicação:** Componente central do SO, executando em modo privilegiado. Gerencia processos, memória de baixo nível, dispositivos, interrupções e fornece a interface de chamadas de sistema (system calls) para os aplicativos.
        *   **Detalhes Técnicos:** Modos de execução (modo núcleo (kernel mode) vs. modo usuário (user mode)), tabela de vetores de interrupção, despachante de interrupções, Interface de Programação de Aplicativos (API) de chamadas de sistema (ex: `fork()`, `exec()`, `open()`, `read()` no POSIX; Native API no Windows).
    *   **Relevância Forense:**
        *   **Análise de Rootkits:** Muitos rootkits modificam ou se aninham no núcleo do sistema operacional para interceptar chamadas de sistema, ocultar processos/arquivos ou registrar atividades.
        *   **Despejo de Memória (Dump) do Núcleo do Sistema Operacional:** Contém informações críticas sobre o estado do sistema: lista de processos, módulos carregados (drivers), conexões de rede, tabelas de sistema, memórias temporárias (buffers).
        *   **Drivers (Programas de Dispositivo) Maliciosos:** Drivers operam no nível do núcleo do sistema operacional e podem ser usados para comprometer o sistema.

    ---
    #### 1.2.2 Gerenciador de memória.
    *   **Explicação:** Aloca e gerencia a memória principal (RAM) entre processos e o SO, garantindo proteção e otimização.
        *   **Detalhes Técnicos:**
            *   **Memória Virtual:** Uso de espaço em disco (memória de troca (swap)/arquivo de paginação) para estender a RAM.
            *   **Paginação:** Divisão da memória em páginas (virtuais) e quadros (frames) (físicos); tabelas de páginas (Page Tables) mapeiam endereços virtuais para físicos. A TLB (Buffer de Tradução Antecipada - Translation Lookaside Buffer) é uma memória cache para essas traduções.
            *   **Segmentação:** Divisão da memória em segmentos lógicos (código, dados, pilha).
            *   **Algoritmos de Alocação:** Primeiro ajuste (First-fit), melhor ajuste (best-fit), pior ajuste (worst-fit) para alocação contígua; algoritmos de substituição de página (LRU - Menos Recentemente Usado (Least Recently Used), FIFO - Primeiro a Entrar, Primeiro a Sair (First-In, First-Out)) para memória virtual.
            *   **Proteção de Memória:** Uso de bits de permissão nas tabelas de página, limites de segmento.
    *   **Relevância Forense:**
        *   **Análise de RAM (Forense em Tempo Real - Live Forensics):** Encontrar processos ativos, senhas em claro, chaves de criptografia, conteúdo de arquivos abertos, histórico de comandos, tráfego de rede recente.
        *   **Arquivo de Paginação/Memória de Troca (`pagefile.sys`, `/dev/swap`):** Pode conter páginas de memória de processos que foram movidas para o disco, persistindo informações valiosas mesmo após o processo ser encerrado ou o sistema desligado.
        *   **Análise de Monte (Heap) e Pilha (Stack):** Estruturas de memória de processos que podem conter dados de tempo de execução, argumentos de função, variáveis locais.
        *   **Escavação de Dados (Data Carving):** Recuperação de arquivos ou fragmentos de dados diretamente do espaço não alocado da memória ou do arquivo de paginação.

    ---
    #### 1.2.3 Gerenciador de arquivos.
    *   **Explicação:** Fornece uma visão lógica e organizada do armazenamento secundário, permitindo a criação, acesso e manipulação de arquivos e diretórios. Abstrai os detalhes físicos dos componentes físicos.
        *   **Detalhes Técnicos:** Conceitos de arquivo (sequência de bytes), diretório (estrutura hierárquica), metadados (atributos do arquivo), operações de arquivo (CRUD - Criar (Create), Ler (Read), Atualizar (Update), Deletar (Delete)), controle de acesso (permissões).
    *   **Relevância Forense:**
        *   **Análise de Sistemas de Arquivos (detalhado no item 1.7):** Identificação de arquivos (existentes, deletados, ocultos), análise de metadados (registros de data e hora MAC - Modificação (Modification), Acesso (Access), Criação/Alteração (Creation/Change)), recuperação de arquivos deletados, análise de espaço ocioso (slack space) e espaço não alocado.
        *   **Artefatos do Sistema de Arquivos:** Registro cronológico (Journal), Tabela Mestra de Arquivos (MFT) (NTFS), inodes (EXT), Tabela de Alocação de Arquivos (FAT) (FAT32/exFAT) são fontes primárias de evidência.
        *   **Registros de Data e Hora (Timestamps):** Cruciais para construir linhas do tempo de atividades. O perito deve entender como cada SO e sistema de arquivos gerencia e atualiza esses registros (ex: granularidade, fuso horário).

    ---
    #### 1.2.4 Gerenciador de E/S (Entrada/Saída).
    *   **Explicação:** Gerencia a comunicação entre a UCP/memória e os dispositivos periféricos (discos, teclado, rede, USB).
        *   **Detalhes Técnicos:** Drivers (programas de dispositivo), interrupções de E/S, Acesso Direto à Memória (DMA - Direct Memory Access), armazenamento temporário (buffering), armazenamento em cache (caching) de E/S, enfileiramento (spooling), portas de E/S, E/S mapeada em memória.
    *   **Relevância Forense:**
        *   **Arquivos de Registro de Dispositivos USB:** O SO (ex: Registro do Windows) mantém registros de dispositivos USB conectados, incluindo Identificador do Fornecedor (Vendor ID), Identificador do Produto (Product ID), número de série e registros de data e hora de conexão/desconexão.
        *   **Análise de Drivers (Programas de Dispositivo):** Drivers maliciosos podem interceptar ou manipular dados de E/S.
        *   **Artefatos de Rede:** O gerenciador de E/S lida com a placa de interface de rede; arquivos de registro da parede de fogo (firewall), configurações de rede e estado das conexões são relevantes.
        *   **Impressão Digital de Dispositivos:** Informações sobre dispositivos conectados podem ajudar a traçar a origem de dados ou identificar componentes físicos específicos usado em um crime.

    ---
    #### 1.2.5 Middleware (Software de Camada Média).
    *   **Explicação:** Programa que se situa entre o SO e os aplicativos, fornecendo serviços comuns para interoperabilidade e comunicação em ambientes distribuídos ou heterogêneos.
        *   **Exemplos Técnicos:**
            *   **MOM (Middleware Orientado a Mensagens - Message-Oriented Middleware):** Apache Kafka, RabbitMQ (arquivos de registro de filas de mensagens).
            *   **ORB (Agente de Requisição de Objetos - Object Request Broker) para RPC (Chamada de Procedimento Remoto - Remote Procedure Call):** CORBA, DCOM (arquivos de registro de chamadas remotas).
            *   **Servidores de Aplicações J2EE/Jakarta EE:** WildFly, WebSphere (arquivos de registro da aplicação, arquivos de registro de transação, configurações de segurança).
            *   **APIs Web (REST, SOAP):** Arquivos de registro de portais de interconexão de APIs (Gateways de API), arquivos de registro de servidores web.
    *   **Relevância Forense:**
        *   **Arquivos de Registro de Transação e Aplicação:** O middleware frequentemente gera arquivos de registro detalhados que podem rastrear interações de usuários, fluxos de dados e atividades maliciosas em sistemas corporativos complexos.
        *   **Análise de Configurações:** Configurações de segurança do middleware podem revelar vulnerabilidades.
        *   **Rastreamento de Ataques Distribuídos:** Em ataques que atravessam múltiplos sistemas, o middleware pode ser um ponto chave de análise para entender o fluxo do ataque.

---

### 1.3 Processadores.

*   **Explicação:** A Unidade Central de Processamento (UCP) executa as instruções dos programas. Componentes: Unidade de Controle (UC), Unidade Lógica e Aritmética (ULA), Registradores.

    ---
    #### 1.3.1 Arquiteturas paralelas: Multiprocessamento e Multinúcleo (Multicore).
    *   **Explicação:**
        *   **Multiprocessamento:** Uso de múltiplas UCPs físicas em um sistema, compartilhando memória e periféricos.
            *   **SMP (Multiprocessamento Simétrico - Symmetric Multiprocessing):** UCPs iguais com acesso uniforme à memória. Comum em computadores pessoais/servidores.
        *   **Multinúcleo (Multicore):** Um único chip de processador com múltiplos núcleos de processamento independentes. Cada núcleo age como uma UCP para o SO.
    *   **Relevância Forense:**
        *   A análise de arquivos de registro pode mostrar a atribuição de processos/linhas de execução (threads) a UCPs/núcleos específicos, ajudando a entender a concorrência e a ordem de eventos.
        *   Software malicioso pode ser projetado para explorar o paralelismo (ex: para quebra de senhas) ou se vincular a um núcleo específico.
        *   Cada núcleo pode ter suas próprias memórias cache L1/L2, potencialmente contendo dados voláteis distintos.

    ---
    #### 1.3.2 Hyper-Threading (HT).
    *   **Explicação:** Tecnologia da Intel (Multithreading Simultâneo (SMT - Simultaneous Multithreading) em AMD) que permite a um único núcleo físico executar múltiplos threads de hardware (processadores lógicos) simultaneamente, compartilhando alguns recursos de execução mas duplicando outros (como registradores de estado).
    *   **Relevância Forense:**
        *   Ao analisar informações do sistema, é crucial distinguir entre núcleos físicos e processadores lógicos.
        *   Pode impactar a análise de dados em memórias cache, pois threads lógicos no mesmo núcleo compartilham memórias cache mais próximas.

    ---
    #### 1.3.3 GPUs: arquitetura CUDA e aplicações em processamento vetorial.
    *   **Explicação:**
        *   **GPU (Unidade de Processamento Gráfico - Graphics Processing Unit):** Processador massivamente paralelo com centenas/milhares de núcleos menores, otimizado para tarefas de paralelismo de dados, como gráficos e Computação de Propósito Geral em Unidades de Processamento Gráfico (GPGPU - General-Purpose computing on Graphics Processing Units).
        *   **CUDA (Arquitetura de Dispositivo de Computação Unificada - Compute Unified Device Architecture):** Plataforma da NVIDIA para programação de GPUs, permitindo o uso de C/C++ para desenvolver núcleos de processamento (kernels) que rodam em paralelo em muitos threads na GPU.
        *   **Processamento Vetorial:** Operações aplicadas simultaneamente a múltiplos elementos de vetores/matrizes, onde GPUs se destacam.
    *   **Relevância Forense:**
        *   **Quebra de Senhas:** Ferramentas como Hashcat e John the Ripper usam GPUs (via CUDA ou Linguagem de Computação Aberta (OpenCL - Open Computing Language)) para acelerar drasticamente a quebra de hashes de senha por força bruta ou dicionário.
        *   **Mineração de Criptomoedas:** Software malicioso pode usar a GPU da vítima para minerar criptomoedas, e a análise do uso da GPU ou a presença de software de mineração são indicadores.
        *   **Análise de Dados da VRAM (RAM de Vídeo):** A memória da GPU (VRAM) pode conter artefatos gráficos ou dados de computação recentes, embora sua análise seja complexa.
        *   **Aceleração de Tarefas Forenses:** GPUs podem ser usadas para acelerar a indexação de dados, busca por padrões, ou processamento de imagens/vídeos em investigações.

---

### 1.4 Sistemas Distribuídos.

*   **Explicação:** Coleção de computadores autônomos em rede que colaboram para uma tarefa comum, aparecendo como um único sistema. Características: compartilhamento de recursos, concorrência, escalabilidade, tolerância a falhas.

    ---
    #### 1.4.1 Modelos de memória compartilhada.
    *   **Explicação:** (Memória Compartilhada Distribuída (MCD) - Distributed Shared Memory (DSM)) Abstração que permite a processos em diferentes nós de um sistema distribuído acessarem um espaço de endereço de memória como se fosse local, mesmo que a memória esteja fisicamente distribuída. O sistema MCD gerencia a consistência dos dados entre os nós.
        *   **Detalhes Técnicos:** Modelos de consistência de memória (sequencial, causal, de liberação (release), fraca) definem como e quando as atualizações de dados se tornam visíveis para outros processos. Protocolos de coerência de cache (invalidação de escrita (write-invalidate), atualização de escrita (write-update)) são usados para manter os dados consistentes.
    *   **Relevância Forense:**
        *   Em investigações de sistemas corporativos ou em nuvem, entender MCD ajuda a rastrear dados e transações que se espalham por múltiplos nós.
        *   Arquivos de registro de sistemas MCD podem revelar acessos a dados, movimentação de páginas de memória entre nós e problemas de sincronização, que podem ser relevantes para entender uma atividade maliciosa ou uma falha de sistema.
        *   A localização de uma cópia "mestra" ou a versão mais atualizada de um dado pode depender do modelo de consistência e do protocolo de MCD em uso.

---

### 1.5 Tecnologias de virtualização: emuladores, máquinas virtuais, contêineres.

*   **Explicação:** Criação de uma versão virtual de recursos computacionais.
    *   **Emuladores:** Simulam os componentes físicos de um sistema (convidado ou guest) em outro com componentes físicos diferentes (hospedeiro ou host), traduzindo instruções. (Ex: QEMU, DOSBox, emuladores de console).
    *   **Máquinas Virtuais (MVs):** Criam um ambiente computacional completo e isolado com SO convidado próprio, rodando sobre um **hypervisor** (Monitor de Máquina Virtual) (Tipo 1: diretamente nos componentes físicos (bare-metal) como ESXi, Hyper-V; Tipo 2: hospedado (hosted) como um aplicativo em um SO hospedeiro como VirtualBox, VMware Workstation).
    *   **Contêineres:** Virtualização no nível do SO, compartilhando o núcleo do sistema operacional do hospedeiro, mas com espaços de usuário isolados. Incluem o aplicativo e suas dependências, mas não um SO convidado. (Ex: Docker, Kubernetes para orquestração).
*   **Relevância Forense:**
    *   **Análise de Software Malicioso:** MVs são usadas como ambientes isolados de testes (sandboxes). Software malicioso pode tentar evadir a detecção em MVs.
    *   **Imagens de MV:** Discos virtuais (VMDK, VDI, VHDX, QCOW2) são imagens de disco completas, analisáveis com ferramentas forenses.
    *   **Contêineres:** Artefatos podem estar em imagens de contêiner, volumes, arquivos de registro do orquestrador (Kubernetes) e do tempo de execução (runtime) do contêiner (Docker). A natureza efêmera é um desafio.
    *   **Arquivos de Registro do Hypervisor/Orquestrador:** Informações sobre criação, instantâneos (snapshots), migração, configuração de rede de MVs/contêineres.
    *   **Esteganografia/Ocultação:** Criminosos podem usar MVs/contêineres para esconder atividades, esperando que apenas o sistema hospedeiro seja analisado.
    *   **RAM de MVs:** A RAM de uma MV pode ser "despejada" (dumped) e analisada.

---

### 1.6 RAID: tipos, características e aplicações.

*   **Explicação:** (RAID - Conjunto Redundante de Discos Independentes - Redundant Array of Independent Disks) Combina múltiplos discos físicos em unidades lógicas para desempenho, capacidade e/ou tolerância a falhas.
    *   **Tipos Comuns:**
        *   **RAID 0 (Fracionamento - Striping):** Dados divididos entre discos. Melhor desempenho, sem redundância. Falha de 1 disco = perda total.
        *   **RAID 1 (Espelhamento - Mirroring):** Dados duplicados em discos. Alta redundância, bom desempenho de leitura. Custo de 50% da capacidade.
        *   **RAID 5 (Fracionamento com Paridade Distribuída):** Dados e paridade distribuídos. Tolera falha de 1 disco. Bom equilíbrio. Requer min. 3 discos.
        *   **RAID 6 (Fracionamento com Dupla Paridade Distribuída):** Similar ao RAID 5, mas tolera falha de 2 discos. Requer min. 4 discos.
        *   **RAID 10 (RAID 1+0):** Combina espelhamento e fracionamento. Bom desempenho e redundância. Requer min. 4 discos.
    *   **Implementação:** Componentes físicos (controlador dedicado) ou Programas (SO).
*   **Relevância Forense:**
    *   **Aquisição Complexa:** Requer imagem forense de *todos* os discos membros.
    *   **Reconstrução Virtual:** Programas forenses são usados para reconstruir o conjunto (array) a partir das imagens, necessitando conhecer o tipo de RAID, ordem dos discos, tamanho do bloco (bloco de fracionamento (chunk/stripe size)) e algoritmo de paridade.
    *   **Parâmetros do RAID:** A falha em identificar corretamente os parâmetros do RAID (especialmente em configurações não padrão ou danificadas) pode levar à impossibilidade de reconstruir os dados ou à reconstrução incorreta.
    *   **Recuperação de Dados de Conjuntos Degradados/Falhados:** Se um RAID 5 perde um disco, os dados ainda são recuperáveis. Se perde dois, a recuperação é muito mais complexa e pode envolver a reconstrução da paridade ou a escavação de dados.
    *   **Metadados do RAID:** Controladores de componentes físicos ou implementações de programas podem armazenar metadados sobre a configuração do RAID nos próprios discos (geralmente no início ou fim).

---

### 1.7 Sistemas de arquivos NTFS, FAT32, exFAT, EXT3, EXT4, XFS: características, organização e metadados.

*   **Explicação:** Estrutura lógica que o SO usa para organizar, armazenar e acessar arquivos em dispositivos de armazenamento.
    *   **NTFS (Sistema de Arquivos de Nova Tecnologia - New Technology File System) (Windows):**
        *   **Características:** Sistema de arquivos com registro cronológico (journaling), Listas de Controle de Acesso (ACLs - Access Control Lists), Tabela Mestra de Arquivos (MFT), Fluxos de Dados Alternativos (ADS), compressão, Sistema de Arquivos com Criptografia (EFS - Encrypting File System).
        *   **Organização:** Tabela Mestra de Arquivos (MFT) como catálogo central. Cada arquivo/diretório é uma entrada na MFT.
        *   **Metadados (Atributos da MFT):** `$STANDARD_INFORMATION` (registros de data e hora MACb - Modificação, Acesso, Alteração (entrada da MFT), Nascimento/Criação), `$FILE_NAME` (nome, registros de data e hora do arquivo pai), `$DATA` (dados ou ponteiros), `$SECURITY_DESCRIPTOR` (ACLs), `$LogFile` (arquivo de registro cronológico), `$UsnJrnl` (Registro Cronológico de Número de Sequência de Atualização - Update Sequence Number Journal).
        *   **ADS (Fluxos de Dados Alternativos - Alternate Data Streams):** Fluxos de dados ocultos associados a um arquivo, visíveis apenas com ferramentas específicas. Usados por software malicioso.
    *   **FAT32 (Tabela de Alocação de Arquivos de 32 bits - File Allocation Table 32-bit) (Dispositivos removíveis, sistemas legados):**
        *   **Características:** Simples, compatível, sem registro cronológico robusto, limitação de tamanho de arquivo (4GB).
        *   **Organização:** Tabela de Alocação de Arquivos (FAT) mapeia agrupamentos de blocos (clusters). Diretórios são arquivos especiais.
        *   **Metadados:** Entradas de diretório (nome, atributos, data/hora de criação/modificação, primeiro cluster). Registros de data e hora de acesso com baixa resolução.
    *   **exFAT (Tabela de Alocação de Arquivos Estendida - Extended File Allocation Table) (Dispositivos removíveis modernos):**
        *   **Características:** Sucessor do FAT32, para mídias flash (memória rápida), sem limite de 4GB, melhor gerenciamento de espaço. Sem registro cronológico robusto.
        *   **Organização:** Similar ao FAT32, mas mais escalável. Usa uma FAT e entradas de diretório.
        *   **Metadados:** Registros de data e hora mais precisos que FAT32, incluindo deslocamento UTC (Tempo Universal Coordenado).
    *   **EXT3 (Terceiro Sistema de Arquivos Estendido - Third Extended File System) (Linux):**
        *   **Características:** Sistema de arquivos com registro cronológico, permissões Unix.
        *   **Organização:** Grupos de blocos, superbloco, inodes (armazenam metadados do arquivo e ponteiros para blocos de dados), diretórios (lista de nomes e inodes).
        *   **Metadados (Inode):** Tipo, permissões, Identificador de Usuário (UID), Identificador de Grupo (GID), registros de data e hora MAC (Modificação, Acesso, Alteração - inode), tamanho, ponteiros de bloco. O registro cronológico armazena transações.
    *   **EXT4 (Quarto Sistema de Arquivos Estendido - Fourth Extended File System) (Linux):**
        *   **Características:** Melhorias sobre EXT3: volumes/arquivos maiores, **extensões (extents)** (intervalos contíguos de blocos), alocação atrasada, registros de data e hora de nanossegundos.
        *   **Organização:** Similar ao EXT3, mas com extensões em vez de apenas ponteiros diretos/indiretos nos inodes para arquivos maiores.
    *   **XFS (Sistema de Arquivos XFS - XFS File System) (Linux, servidores):**
        *   **Características:** Alto desempenho, sistema de arquivos com registro cronológico, escalável para volumes/arquivos muito grandes, usa árvores B+ (B+ trees) extensivamente.
        *   **Organização:** Grupos de alocação, inodes dinâmicos, registro cronológico de metadados.
*   **Relevância Forense (Geral):**
    *   **Identificação do Sistema de Arquivos:** Crucial para escolher as ferramentas e técnicas corretas.
    *   **Análise de Metadados:** Datas e horas (registros MAC), propriedade, permissões são fundamentais para reconstruir eventos e atribuir atividades. É vital entender como cada sistema de arquivos armazena e atualiza esses registros de data e hora.
    *   **Recuperação de Arquivos Deletados:** Técnicas variam:
        *   NTFS: Entradas da MFT podem persistir; o bitmap de alocação de clusters é verificado.
        *   FAT/exFAT: Primeiro caractere do nome do arquivo é alterado; entradas da FAT são zeradas.
        *   EXT3/4: Ponteiros de bloco no inode são zerados; o registro cronológico pode ajudar.
    *   **Análise do Registro Cronológico (Journal):** Pode revelar operações recentes (criação, deleção, modificação de arquivos) mesmo que os dados ou metadados principais tenham sido alterados ou o arquivo "deletado".
    *   **Espaço Ocioso (Slack Space) e Espaço Não Alocado:** Podem conter fragmentos de arquivos anteriores.
    *   **Linhas do Tempo (Timelines):** Criação de linhas do tempo detalhadas da atividade do sistema de arquivos.

---

### 1.8 Computação quântica: conceitos envolvidos.

*   **Explicação:** Paradigma de computação que usa princípios da mecânica quântica.
    *   **Conceitos Chave:**
        *   **Qubit (Bit Quântico):** Unidade básica. Pode estar em **superposição quântica** (0, 1, ou ambos).
        *   **Emaranhamento Quântico (Entanglement):** Qubits interligados, estado de um afeta o outro instantaneamente.
        *   **Portas Quânticas:** Operações em qubits.
        *   **Algoritmos Quânticos:**
            *   **Algoritmo de Shor:** Fatora inteiros grandes (ameaça à criptografia RSA/ECC).
            *   **Algoritmo de Grover:** Busca em bancos de dados não ordenados (aceleração quadrática).
    *   **Desafios:** Decoerência (perda de estado quântico), correção de erros, escalabilidade.
*   **Relevância Forense:**
    *   **Ameaça à Criptografia Atual:** A principal preocupação é a capacidade futura de computadores quânticos quebrarem sistemas de criptografia de chave pública amplamente utilizados hoje (RSA, Diffie-Hellman, curvas elípticas). Dados criptografados interceptados hoje podem ser decifrados no futuro ("coletar agora, decifrar depois" - "harvest now, decrypt later").
    *   **Criptografia Pós-Quântica (PQC):** Desenvolvimento de algoritmos resistentes a ataques quânticos. Peritos podem encontrar sistemas usando PQC no futuro.
    *   **Análise Forense de Sistemas Quânticos (Especulativo/Futuro):** Se/quando a computação quântica se tornar comum, a análise forense desses sistemas exigirá novas metodologias e ferramentas.
    *   **Conhecimento Conceitual:** Para o concurso, espera-se um entendimento dos conceitos básicos e, principalmente, das implicações para a segurança da informação e criptografia, e não a capacidade de operar ou programar um computador quântico.

---

[end of fundamentos_computacao_detalhado.md]

[end of fundamentos_computacao_detalhado.md]

[end of fundamentos_computacao_detalhado.md]

[end of fundamentos_computacao_detalhado.md]

[end of fundamentos_computacao_detalhado.md]
