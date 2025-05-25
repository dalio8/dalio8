# Detalhamento dos Subtópicos de "1. Fundamentos da computação" (Edital Perito Criminal Federal – Área 3)

## 1. Fundamentos da computação.

Este tópico abrange os conceitos essenciais sobre o funcionamento dos computadores, desde sua estrutura física e lógica até os softwares básicos que os gerenciam e as tecnologias que permitem seu uso eficiente e escalável.

---

### 1.1 Organização e arquitetura de computadores.

*   **Explicação:**
    *   **Organização de Computadores:** Descreve *como* os componentes de hardware (CPU, memória, E/S, barramentos) são interconectados e funcionam juntos para implementar as especificações da arquitetura. Foca nos aspectos de implementação, sinais de controle, interfaces e tecnologia de memória.
        *   **Exemplo Técnico:** A forma como a Unidade de Gerenciamento de Memória (MMU) traduz endereços virtuais para físicos, a hierarquia de barramentos (PCIe, SATA, USB) e seus protocolos de comunicação, os ciclos de clock e a sincronização entre componentes.
    *   **Arquitetura de Computadores:** Descreve *o que* o computador faz do ponto de vista do programador. Inclui o conjunto de instruções (ISA), tipos de dados, modos de endereçamento, organização da memória visível ao software e registradores.
        *   **Exemplo Técnico:** A arquitetura x86-64 define instruções como `MOV`, `ADD`, `JMP`, registradores de 64 bits como `RAX`, `RBX`, e o modelo de memória segmentada/paginada. A arquitetura ARMv8-A (usada em muitos smartphones) tem um conjunto de instruções diferente (A64) e uma organização de registradores distinta.
*   **Relevância Forense:**
    *   Entender a ISA ajuda a analisar código malicioso (malware) em baixo nível (assembly).
    *   O conhecimento da organização da memória (caches L1/L2/L3, RAM) é vital para a análise de memória volátil, onde fragmentos de dados cruciais (chaves de criptografia, senhas) podem residir temporariamente.
    *   A análise de como os dispositivos de E/S são organizados e endereçados pode ser crucial na aquisição de dados de sistemas embarcados ou danificados.
    *   Compreender a arquitetura de armazenamento (controladores de disco, interfaces) auxilia na interpretação de como os dados são fisicamente gravados e acessados.

---

### 1.2 Sistemas operacionais: arquiteturas e componentes.

*   **Explicação:** O Sistema Operacional (SO) é o software que gerencia o hardware e o software do computador, fornecendo uma interface entre eles e o usuário/aplicativos.
    *   **Arquiteturas de SO:**
        *   **Monolítica:** Kernel único e grande, com todos os serviços rodando no mesmo espaço de endereço privilegiado. (Ex: MS-DOS, Linux tradicionalmente).
        *   **Em Camadas:** Estrutura hierárquica de camadas, cada uma provendo serviços para a camada superior.
        *   **Microkernel:** Kernel mínimo com apenas funções essenciais (comunicação interprocessos, gerenciamento básico de memória). Serviços como drivers e sistemas de arquivos rodam como processos de usuário. (Ex: Minix 3, QNX).
        *   **Híbrida (Modular):** Combina um kernel central com módulos carregáveis dinamicamente. (Ex: Windows NT/XP/.../11, macOS, Linux moderno com módulos).
    *   **Componentes Principais:** Kernel, Gerenciador de Memória, Gerenciador de Arquivos, Gerenciador de E/S.
*   **Relevância Forense:**
    *   A arquitetura do SO impacta onde os artefatos forenses são armazenados (logs, registros, estruturas de dados do kernel).
    *   O conhecimento específico do SO de um dispositivo apreendido é fundamental para saber como extrair dados, analisar processos, permissões e interações de baixo nível.
    *   Rootkits e malwares avançados frequentemente exploram ou modificam componentes da arquitetura do SO (especialmente o kernel) para se ocultarem ou ganharem privilégios.

    ---
    #### 1.2.1 Kernel.
    *   **Explicação:** Núcleo do SO, executando em modo privilegiado. Gerencia processos, memória de baixo nível, dispositivos, interrupções e fornece a interface de chamadas de sistema (system calls) para os aplicativos.
        *   **Detalhes Técnicos:** Modos de execução (kernel mode vs. user mode), tabela de vetores de interrupção, despachante de interrupções, API de chamadas de sistema (ex: `fork()`, `exec()`, `open()`, `read()` no POSIX; Native API no Windows).
    *   **Relevância Forense:**
        *   **Análise de Rootkits:** Muitos rootkits modificam ou se aninham no kernel para interceptar chamadas de sistema, ocultar processos/arquivos ou registrar atividades.
        *   **Dump de Memória do Kernel:** Contém informações críticas sobre o estado do sistema: lista de processos, módulos carregados (drivers), conexões de rede, tabelas de sistema, buffers.
        *   **Drivers Maliciosos:** Drivers operam no nível do kernel e podem ser usados para comprometer o sistema.

    ---
    #### 1.2.2 Gerenciador de memória.
    *   **Explicação:** Aloca e gerencia a memória principal (RAM) entre processos e o SO, garantindo proteção e otimização.
        *   **Detalhes Técnicos:**
            *   **Memória Virtual:** Uso de espaço em disco (swap/arquivo de paginação) para estender a RAM.
            *   **Paginação:** Divisão da memória em páginas (virtuais) e frames (físicos); tabelas de páginas (Page Tables) mapeiam endereços virtuais para físicos. A TLB (Translation Lookaside Buffer) é um cache para essas traduções.
            *   **Segmentação:** Divisão da memória em segmentos lógicos (código, dados, pilha).
            *   **Algoritmos de Alocação:** First-fit, best-fit, worst-fit para alocação contígua; algoritmos de substituição de página (LRU, FIFO) para memória virtual.
            *   **Proteção de Memória:** Uso de bits de permissão nas tabelas de página, limites de segmento.
    *   **Relevância Forense:**
        *   **Análise de RAM (Live Forensics):** Encontrar processos ativos, senhas em claro, chaves de criptografia, conteúdo de arquivos abertos, histórico de comandos, tráfego de rede recente.
        *   **Arquivo de Paginação/Swap (`pagefile.sys`, `/dev/swap`):** Pode conter páginas de memória de processos que foram movidas para o disco, persistindo informações valiosas mesmo após o processo ser encerrado ou o sistema desligado.
        *   **Análise de Heap e Pilha:** Estruturas de memória de processos que podem conter dados de tempo de execução, argumentos de função, variáveis locais.
        *   **Data Carving:** Recuperação de arquivos ou fragmentos de dados diretamente do espaço não alocado da memória ou do arquivo de paginação.

    ---
    #### 1.2.3 Gerenciador de arquivos.
    *   **Explicação:** Fornece uma visão lógica e organizada do armazenamento secundário, permitindo a criação, acesso e manipulação de arquivos e diretórios. Abstrai os detalhes físicos do hardware.
        *   **Detalhes Técnicos:** Conceitos de arquivo (sequência de bytes), diretório (estrutura hierárquica), metadados (atributos do arquivo), operações de arquivo (CRUD - Create, Read, Update, Delete), controle de acesso (permissões).
    *   **Relevância Forense:**
        *   **Análise de Sistemas de Arquivos (detalhado no item 1.7):** Identificação de arquivos (existentes, deletados, ocultos), análise de metadados (MAC times - Modification, Access, Creation/Change), recuperação de arquivos deletados, análise de slack space e espaço não alocado.
        *   **Artefatos do Sistema de Arquivos:** Journal, MFT (NTFS), inodes (EXT), FAT (FAT32/exFAT) são fontes primárias de evidência.
        *   **Timestamps:** Cruciais para construir linhas do tempo de atividades. O perito deve entender como cada SO e sistema de arquivos gerencia e atualiza esses timestamps (ex: granularidade, fuso horário).

    ---
    #### 1.2.4 Gerenciador de E/S (Entrada/Saída).
    *   **Explicação:** Gerencia a comunicação entre a CPU/memória e os dispositivos periféricos (discos, teclado, rede, USB).
        *   **Detalhes Técnicos:** Drivers de dispositivo, interrupções de E/S, DMA (Direct Memory Access), buffering, caching de E/S, spooling, portas de E/S, E/S mapeada em memória.
    *   **Relevância Forense:**
        *   **Logs de Dispositivos USB:** O SO (ex: Registro do Windows) mantém registros de dispositivos USB conectados, incluindo Vendor ID, Product ID, número de série e timestamps de conexão/desconexão.
        *   **Análise de Drivers:** Drivers maliciosos podem interceptar ou manipular dados de E/S.
        *   **Artefatos de Rede:** O gerenciador de E/S lida com a placa de rede; logs de firewall, configurações de rede e estado das conexões são relevantes.
        *   **Impressão Digital de Dispositivos:** Informações sobre dispositivos conectados podem ajudar a traçar a origem de dados ou identificar hardware específico usado em um crime.

    ---
    #### 1.2.5 Middleware.
    *   **Explicação:** Software que se situa entre o SO e os aplicativos, fornecendo serviços comuns para interoperabilidade e comunicação em ambientes distribuídos ou heterogêneos.
        *   **Exemplos Técnicos:**
            *   **MOM (Message-Oriented Middleware):** Apache Kafka, RabbitMQ (logs de filas de mensagens).
            *   **ORB (Object Request Broker) para RPC:** CORBA, DCOM (logs de chamadas remotas).
            *   **Servidores de Aplicação J2EE/Jakarta EE:** WildFly, WebSphere (logs de aplicação, logs de transação, configurações de segurança).
            *   **APIs Web (REST, SOAP):** Logs de gateways de API, logs de servidores web.
    *   **Relevância Forense:**
        *   **Logs de Transação e Aplicação:** Middleware frequentemente gera logs detalhados que podem rastrear interações de usuários, fluxos de dados e atividades maliciosas em sistemas corporativos complexos.
        *   **Análise de Configurações:** Configurações de segurança do middleware podem revelar vulnerabilidades.
        *   **Rastreamento de Ataques Distribuídos:** Em ataques que atravessam múltiplos sistemas, o middleware pode ser um ponto chave de análise para entender o fluxo do ataque.

---

### 1.3 Processadores.

*   **Explicação:** A Unidade Central de Processamento (CPU) executa as instruções dos programas. Componentes: Unidade de Controle (UC), Unidade Lógica e Aritmética (ULA), Registradores.

    ---
    #### 1.3.1 Arquiteturas paralelas: Multiprocessamento e Multicore.
    *   **Explicação:**
        *   **Multiprocessamento:** Uso de múltiplas CPUs físicas em um sistema, compartilhando memória e periféricos.
            *   **SMP (Symmetric Multiprocessing):** CPUs iguais com acesso uniforme à memória. Comum em desktops/servidores.
        *   **Multicore:** Um único chip de processador com múltiplos núcleos de processamento independentes. Cada núcleo age como uma CPU para o SO.
    *   **Relevância Forense:**
        *   A análise de logs pode mostrar a atribuição de processos/threads a CPUs/núcleos específicos, ajudando a entender a concorrência e a ordem de eventos.
        *   Malware pode ser projetado para explorar o paralelismo (ex: para quebra de senhas) ou se vincular a um núcleo específico.
        *   Cada núcleo pode ter seus próprios caches L1/L2, potencialmente contendo dados voláteis distintos.

    ---
    #### 1.3.2 Hyper-Threading (HT).
    *   **Explicação:** Tecnologia da Intel (SMT em AMD) que permite a um único núcleo físico executar múltiplos threads de hardware (processadores lógicos) simultaneamente, compartilhando alguns recursos de execução mas duplicando outros (como registradores de estado).
    *   **Relevância Forense:**
        *   Ao analisar informações do sistema, é crucial distinguir entre núcleos físicos e processadores lógicos.
        *   Pode impactar a análise de dados em caches, pois threads lógicos no mesmo núcleo compartilham caches mais próximos.

    ---
    #### 1.3.3 GPUs: arquitetura CUDA e aplicações em processamento vetorial.
    *   **Explicação:**
        *   **GPU (Graphics Processing Unit):** Processador massivamente paralelo com centenas/milhares de núcleos menores, otimizado para tarefas de paralelismo de dados, como gráficos e computação de propósito geral (GPGPU).
        *   **CUDA (Compute Unified Device Architecture):** Plataforma da NVIDIA para programação de GPUs, permitindo o uso de C/C++ para desenvolver kernels que rodam em paralelo em muitos threads na GPU.
        *   **Processamento Vetorial:** Operações aplicadas simultaneamente a múltiplos elementos de vetores/matrizes, onde GPUs se destacam.
    *   **Relevância Forense:**
        *   **Quebra de Senhas:** Ferramentas como Hashcat e John the Ripper usam GPUs (via CUDA ou OpenCL) para acelerar drasticamente a quebra de hashes de senha por força bruta ou dicionário.
        *   **Mineração de Criptomoedas:** Malware pode usar a GPU da vítima para minerar criptomoedas, e a análise do uso da GPU ou a presença de software de mineração são indicadores.
        *   **Análise de Dados da VRAM:** A memória da GPU (VRAM) pode conter artefatos gráficos ou dados de computação recentes, embora sua análise seja complexa.
        *   **Aceleração de Tarefas Forenses:** GPUs podem ser usadas para acelerar a indexação de dados, busca por padrões, ou processamento de imagens/vídeos em investigações.

---

### 1.4 Sistemas Distribuídos.

*   **Explicação:** Coleção de computadores autônomos em rede que colaboram para uma tarefa comum, aparecendo como um único sistema. Características: compartilhamento de recursos, concorrência, escalabilidade, tolerância a falhas.

    ---
    #### 1.4.1 Modelos de memória compartilhada.
    *   **Explicação:** (Distributed Shared Memory - DSM) Abstração que permite a processos em diferentes nós de um sistema distribuído acessarem um espaço de endereço de memória como se fosse local, mesmo que a memória esteja fisicamente distribuída. O sistema DSM gerencia a consistência dos dados entre os nós.
        *   **Detalhes Técnicos:** Modelos de consistência de memória (sequencial, causal, release, fraca) definem como e quando as atualizações de dados se tornam visíveis para outros processos. Protocolos de coerência de cache (write-invalidate, write-update) são usados para manter os dados consistentes.
    *   **Relevância Forense:**
        *   Em investigações de sistemas corporativos ou em nuvem, entender DSM ajuda a rastrear dados e transações que se espalham por múltiplos nós.
        *   Logs de sistemas DSM podem revelar acessos a dados, movimentação de páginas de memória entre nós e problemas de sincronização, que podem ser relevantes para entender uma atividade maliciosa ou uma falha de sistema.
        *   A localização de uma cópia "mestre" ou a versão mais atualizada de um dado pode depender do modelo de consistência e do protocolo de DSM em uso.

---

### 1.5 Tecnologias de virtualização: emuladores, máquinas virtuais, contêineres.

*   **Explicação:** Criação de uma versão virtual de recursos computacionais.
    *   **Emuladores:** Simulam o hardware de um sistema (guest) em outro com hardware diferente (host), traduzindo instruções. (Ex: QEMU, DOSBox, emuladores de console).
    *   **Máquinas Virtuais (VMs):** Criam um ambiente computacional completo e isolado com SO guest próprio, rodando sobre um **hypervisor** (Tipo 1: bare-metal como ESXi, Hyper-V; Tipo 2: hosted como VirtualBox, VMware Workstation).
    *   **Contêineres:** Virtualização no nível do SO, compartilhando o kernel do host, mas com espaços de usuário isolados. Incluem o aplicativo e suas dependências, mas não um SO guest. (Ex: Docker, Kubernetes para orquestração).
*   **Relevância Forense:**
    *   **Análise de Malware:** VMs são usadas como sandboxes. Malware pode tentar evadir a detecção em VMs.
    *   **Imagens de VM:** Discos virtuais (VMDK, VDI, VHDX, QCOW2) são imagens de disco completas, analisáveis com ferramentas forenses.
    *   **Contêineres:** Artefatos podem estar em imagens de contêiner, volumes, logs do orquestrador (Kubernetes) e do runtime (Docker). A natureza efêmera é um desafio.
    *   **Logs do Hypervisor/Orquestrador:** Informações sobre criação, snapshots, migração, configuração de rede de VMs/contêineres.
    *   **Esteganografia/Ocultação:** Criminosos podem usar VMs/contêineres para esconder atividades, esperando que apenas o sistema host seja analisado.
    *   **RAM de VMs:** A memória RAM de uma VM pode ser "dumpada" e analisada.

---

### 1.6 RAID: tipos, características e aplicações.

*   **Explicação:** (Redundant Array of Independent Disks) Combina múltiplos discos físicos em unidades lógicas para desempenho, capacidade e/ou tolerância a falhas.
    *   **Tipos Comuns:**
        *   **RAID 0 (Striping):** Dados divididos entre discos. Melhor desempenho, sem redundância. Falha de 1 disco = perda total.
        *   **RAID 1 (Mirroring):** Dados duplicados em discos. Alta redundância, bom desempenho de leitura. Custo de 50% da capacidade.
        *   **RAID 5 (Striping com Paridade Distribuída):** Dados e paridade distribuídos. Tolera falha de 1 disco. Bom equilíbrio. Requer min. 3 discos.
        *   **RAID 6 (Striping com Dupla Paridade Distribuída):** Similar ao RAID 5, mas tolera falha de 2 discos. Requer min. 4 discos.
        *   **RAID 10 (RAID 1+0):** Combina espelhamento e fracionamento. Bom desempenho e redundância. Requer min. 4 discos.
    *   **Implementação:** Hardware (controlador dedicado) ou Software (SO).
*   **Relevância Forense:**
    *   **Aquisição Complexa:** Requer imagem forense de *todos* os discos membros.
    *   **Reconstrução Virtual:** Software forense é usado para reconstruir o array a partir das imagens, necessitando conhecer o tipo de RAID, ordem dos discos, tamanho do bloco (chunk/stripe size) e algoritmo de paridade.
    *   **Parâmetros do RAID:** A falha em identificar corretamente os parâmetros do RAID (especialmente em configurações não padrão ou danificadas) pode levar à impossibilidade de reconstruir os dados ou à reconstrução incorreta.
    *   **Recuperação de Dados de Arrays Degradados/Falhados:** Se um RAID 5 perde um disco, os dados ainda são recuperáveis. Se perde dois, a recuperação é muito mais complexa e pode envolver a reconstrução da paridade ou o carving de dados.
    *   **Metadados do RAID:** Controladores de hardware ou implementações de software podem armazenar metadados sobre a configuração do RAID nos próprios discos (geralmente no início ou fim).

---

### 1.7 Sistemas de arquivos NTFS, FAT32, exFAT, EXT3, EXT4, XFS: características, organização e metadados.

*   **Explicação:** Estrutura lógica que o SO usa para organizar, armazenar e acessar arquivos em dispositivos de armazenamento.
    *   **NTFS (Windows):**
        *   **Características:** Journaling, ACLs, MFT, ADS, compressão, EFS.
        *   **Organização:** MFT (Master File Table) como catálogo central. Cada arquivo/diretório é uma entrada na MFT.
        *   **Metadados (Atributos da MFT):** `$STANDARD_INFORMATION` (timestamps MACb - Modification, Access, Change (MFT entry), Birth/Creation), `$FILE_NAME` (nome, timestamps do arquivo pai), `$DATA` (dados ou ponteiros), `$SECURITY_DESCRIPTOR` (ACLs), `$LogFile` (journal), `$UsnJrnl` (Update Sequence Number Journal).
        *   **ADS (Alternate Data Streams):** Fluxos de dados ocultos associados a um arquivo, visíveis apenas com ferramentas específicas. Usados por malware.
    *   **FAT32 (Dispositivos removíveis, sistemas legados):**
        *   **Características:** Simples, compatível, sem journaling robusto, limitação de tamanho de arquivo (4GB).
        *   **Organização:** File Allocation Table (FAT) mapeia clusters. Diretórios são arquivos especiais.
        *   **Metadados:** Entradas de diretório (nome, atributos, data/hora de criação/modificação, primeiro cluster). Timestamps de acesso com baixa resolução.
    *   **exFAT (Dispositivos removíveis modernos):**
        *   **Características:** Sucessor do FAT32, para mídias flash, sem limite de 4GB, melhor gerenciamento de espaço. Sem journaling robusto.
        *   **Organização:** Similar ao FAT32, mas mais escalável. Usa uma FAT e entradas de diretório.
        *   **Metadados:** Timestamps mais precisos que FAT32, incluindo UTC offset.
    *   **EXT3 (Linux):**
        *   **Características:** Journaling, permissões Unix.
        *   **Organização:** Grupos de blocos, superbloco, inodes (armazenam metadados do arquivo e ponteiros para blocos de dados), diretórios (lista de nomes e inodes).
        *   **Metadados (Inode):** Tipo, permissões, UID, GID, timestamps MAC (Modification, Access, Change - inode), tamanho, ponteiros de bloco. Journal armazena transações.
    *   **EXT4 (Linux):**
        *   **Características:** Melhorias sobre EXT3: volumes/arquivos maiores, **extents** (intervalos contíguos de blocos), alocação atrasada, timestamps de nanossegundos.
        *   **Organização:** Similar ao EXT3, mas com extents em vez de apenas ponteiros diretos/indiretos nos inodes para arquivos maiores.
    *   **XFS (Linux, servidores):**
        *   **Características:** Alto desempenho, journaling, escalável para volumes/arquivos muito grandes, usa B+ trees extensivamente.
        *   **Organização:** Grupos de alocação, inodes dinâmicos, journaling de metadados.
*   **Relevância Forense (Geral):**
    *   **Identificação do Sistema de Arquivos:** Crucial para escolher as ferramentas e técnicas corretas.
    *   **Análise de Metadados:** Datas e horas (MAC times), propriedade, permissões são fundamentais para reconstruir eventos e atribuir atividades. É vital entender como cada sistema de arquivos armazena e atualiza esses timestamps.
    *   **Recuperação de Arquivos Deletados:** Técnicas variam:
        *   NTFS: Entradas da MFT podem persistir; o bitmap de alocação de clusters é verificado.
        *   FAT/exFAT: Primeiro caractere do nome do arquivo é alterado; entradas da FAT são zeradas.
        *   EXT3/4: Ponteiros de bloco no inode são zerados; o journal pode ajudar.
    *   **Análise do Journal:** Pode revelar operações recentes (criação, deleção, modificação de arquivos) mesmo que os dados ou metadados principais tenham sido alterados ou o arquivo "deletado".
    *   **Slack Space e Espaço Não Alocado:** Podem conter fragmentos de arquivos anteriores.
    *   **Timelines:** Criação de linhas do tempo detalhadas da atividade do sistema de arquivos.

---

### 1.8 Computação quântica: conceitos envolvidos.

*   **Explicação:** Paradigma de computação que usa princípios da mecânica quântica.
    *   **Conceitos Chave:**
        *   **Qubit:** Unidade básica. Pode estar em **superposição** (0, 1, ou ambos).
        *   **Emaranhamento (Entanglement):** Qubits interligados, estado de um afeta o outro instantaneamente.
        *   **Portas Quânticas:** Operações em qubits.
        *   **Algoritmos Quânticos:**
            *   **Algoritmo de Shor:** Fatora inteiros grandes (ameaça à criptografia RSA/ECC).
            *   **Algoritmo de Grover:** Busca em bancos de dados não ordenados (aceleração quadrática).
    *   **Desafios:** Decoerência (perda de estado quântico), correção de erros, escalabilidade.
*   **Relevância Forense:**
    *   **Ameaça à Criptografia Atual:** A principal preocupação é a capacidade futura de computadores quânticos quebrarem sistemas de criptografia de chave pública amplamente utilizados hoje (RSA, Diffie-Hellman, curvas elípticas). Dados criptografados interceptados hoje podem ser decifrados no futuro ("harvest now, decrypt later").
    *   **Criptografia Pós-Quântica (PQC):** Desenvolvimento de algoritmos resistentes a ataques quânticos. Peritos podem encontrar sistemas usando PQC no futuro.
    *   **Análise Forense de Sistemas Quânticos (Especulativo/Futuro):** Se/quando a computação quântica se tornar comum, a análise forense desses sistemas exigirá novas metodologias e ferramentas.
    *   **Conhecimento Conceitual:** Para o concurso, espera-se um entendimento dos conceitos básicos e, principalmente, das implicações para a segurança da informação e criptografia, e não a capacidade de operar ou programar um computador quântico.

---
