# Roteadores para Concursos (Perito em Informática - CEBRASPE)

## 1. Definição e Camada OSI de Operação

Um **Roteador (Router)** é um dispositivo de interconexão de redes que opera primariamente na **Camada 3 (Rede)** do Modelo OSI. Sua principal função é encaminhar pacotes de dados entre diferentes redes de computadores, tomando decisões de encaminhamento com base nos endereços IP de destino dos pacotes e nas informações contidas em sua tabela de roteamento. Roteadores são essenciais para a interconexão de redes locais (LANs) e para o funcionamento da Internet.

## 2. Funcionamento Detalhado

### 2.1. Processo de Encaminhamento de Pacotes

Quando um roteador recebe um pacote de dados em uma de suas interfaces:

1.  **Análise do Cabeçalho IP:** O roteador examina o cabeçalho do pacote IP, principalmente o **endereço IP de destino**.
2.  **Consulta à Tabela de Roteamento:** O roteador consulta sua tabela de roteamento para encontrar a melhor rota para o endereço IP de destino. A tabela de roteamento contém entradas que associam redes de destino (ou endereços IP específicos) à interface de saída que deve ser usada e, frequentemente, ao endereço IP do próximo roteador (next hop) no caminho.
3.  **Decisão de Encaminhamento:**
    *   **Rota Encontrada:** Se uma rota correspondente ao endereço IP de destino é encontrada, o roteador encaminha o pacote para a interface de saída apropriada. Antes de encaminhar, o roteador:
        *   **Decrementa o TTL (Time To Live):** O campo TTL no cabeçalho IP é decrementado em uma unidade. Se o TTL chegar a zero, o pacote é descartado para evitar loops de roteamento (e uma mensagem ICMP Time Exceeded é geralmente enviada de volta à origem).
        *   **Recalcula o Checksum do Cabeçalho IP:** Como o TTL foi modificado, o checksum do cabeçalho IP precisa ser recalculado.
        *   **Re-encapsulamento (Camada 2):** O pacote IP é então encapsulado em um novo quadro da camada de enlace apropriado para a interface de saída (ex: um novo quadro Ethernet com o endereço MAC do próximo salto ou do host de destino, se estiver na mesma rede local da interface de saída).
    *   **Nenhuma Rota Encontrada:** Se nenhuma rota para o destino for encontrada na tabela de roteamento, o pacote é descartado. Uma mensagem ICMP Destination Unreachable (Host ou Network Unreachable) é geralmente enviada de volta ao remetente do pacote.
4.  **Envio do Pacote:** O novo quadro da camada de enlace contendo o pacote IP é transmitido pela interface de saída selecionada.

### 2.2. Construção da Tabela de Roteamento

A tabela de roteamento é o "mapa" que o roteador utiliza para tomar decisões de encaminhamento. Ela pode ser construída de duas maneiras principais:

*   **Rotas Estáticas (Static Routes):**
    *   **Definição:** São rotas configuradas manualmente pelo administrador da rede. O administrador especifica a rede de destino, a máscara de sub-rede, a interface de saída e/ou o endereço IP do próximo salto.
    *   **Características:**
        *   Simples de configurar em redes pequenas e estáveis.
        *   Não se adaptam automaticamente a mudanças na topologia da rede (ex: falha de um link ou roteador).
        *   Maior controle administrativo sobre as rotas.
        *   Menor sobrecarga de processamento no roteador, pois não há troca de informações de roteamento.
        *   Geralmente possuem uma **distância administrativa (AD)** menor (indicando preferência) em relação às rotas dinâmicas, a menos que configurado de outra forma.

*   **Rotas Dinâmicas (Dynamic Routes):**
    *   **Definição:** São rotas aprendidas automaticamente pelos roteadores através da troca de informações com outros roteadores usando **protocolos de roteamento**.
    *   **Características:**
        *   Adaptam-se automaticamente a mudanças na topologia da rede.
        *   Mais complexos de configurar e gerenciar inicialmente.
        *   Consomem recursos da CPU do roteador e largura de banda da rede para a troca de mensagens de protocolo.
    *   **Protocolos de Roteamento:**
        *   **Protocolos de Gateway Interior (IGP - Interior Gateway Protocols):** Usados para trocar informações de roteamento *dentro* de um Sistema Autônomo (AS - Autonomous System), que é uma coleção de redes sob uma administração comum.
            *   **RIP (Routing Information Protocol):**
                *   **Finalidade:** Protocolo de roteamento por **vetor de distância** (distance-vector).
                *   **Métrica:** Contagem de saltos (hops) - número de roteadores no caminho até a rede de destino. O caminho com menos saltos é o preferido.
                *   **Características:** Simples, mas lento para convergir e limitado a redes menores (máximo de 15 saltos por padrão). Envia atualizações completas da tabela de roteamento periodicamente para os vizinhos.
            *   **OSPF (Open Shortest Path First):**
                *   **Finalidade:** Protocolo de roteamento por **estado do link** (link-state).
                *   **Métrica:** Custo, que pode ser baseado na largura de banda do link. O algoritmo SPF (Shortest Path First - Dijkstra) é usado para calcular o caminho mais curto.
                *   **Características:** Mais complexo que o RIP, mas mais rápido para convergir e mais escalável para redes maiores. Roteadores OSPF constroem um mapa completo da topologia da rede (dentro de sua área) trocando informações de estado do link (LSAs - Link-State Advertisements). Suporta o conceito de **áreas** para hierarquizar o roteamento em grandes redes.
        *   **Protocolos de Gateway Exterior (EGP - Exterior Gateway Protocols):** Usados para trocar informações de roteamento *entre* Sistemas Autônomos diferentes na Internet.
            *   **BGP (Border Gateway Protocol):**
                *   **Finalidade:** Protocolo de roteamento por **vetor de caminho** (path-vector). É o protocolo de roteamento fundamental da Internet.
                *   **Métrica:** Não usa métricas simples como contagem de saltos ou custo. As decisões de roteamento são baseadas em políticas complexas definidas pelos administradores de rede dos ASs, atributos de caminho (como AS-Path, Next-Hop, Local Preference, MED).
                *   **Características:** Altamente escalável e robusto, projetado para lidar com o tamanho e a complexidade da Internet. Foca na escolha de rotas baseadas em políticas, em vez de apenas o caminho "mais curto".

A tabela de roteamento pode conter uma mistura de rotas estáticas e dinâmicas. Se múltiplas rotas para o mesmo destino existirem, o roteador usa a **distância administrativa** (um valor de confiabilidade da fonte da rota) para decidir qual rota instalar na tabela. Se as distâncias administrativas forem iguais, a métrica do protocolo é usada.

## 3. Função de Segmentação de Domínios

*   **Domínio de Colisão:**
    *   Um roteador, assim como um switch, segmenta domínios de colisão. Cada interface de um roteador (conectada a um segmento de rede diferente) representa um domínio de colisão separado. Isso significa que colisões em um segmento de rede conectado a uma interface do roteador não afetam os outros segmentos conectados a outras interfaces.

*   **Domínio de Broadcast:**
    *   Esta é uma das funções mais importantes dos roteadores. Ao contrário dos switches (que, sem VLANs, propagam broadcasts para todas as portas), **cada interface de um roteador define um domínio de broadcast separado**.
    *   Quando um roteador recebe um quadro de broadcast em uma de suas interfaces, ele **não** o encaminha para suas outras interfaces. Isso impede que o tráfego de broadcast de uma rede local se espalhe para outras redes, o que é crucial para a escalabilidade e o desempenho das redes, especialmente da Internet.

## 4. Camada do Modelo OSI

Conforme mencionado, o roteador opera primariamente na **Camada 3 (Rede)** do Modelo OSI. É nesta camada que ocorrem o endereçamento lógico (IP) e as decisões de roteamento.

## 5. Conceitos Adicionais

*   **TTL (Time To Live):**
    *   Um campo no cabeçalho do pacote IP (8 bits no IPv4).
    *   Seu valor é decrementado em pelo menos uma unidade por cada roteador que o pacote atravessa.
    *   Quando o TTL de um pacote chega a zero, o roteador que o processa descarta o pacote e envia uma mensagem ICMP "Time Exceeded" de volta ao remetente original.
    *   **Finalidade:** Prevenir que pacotes fiquem circulando indefinidamente em loops de roteamento na rede.

*   **Métricas de Roteamento (Routing Metrics):**
    *   Valores usados pelos protocolos de roteamento dinâmico para determinar o "melhor" caminho para uma rede de destino quando múltiplas rotas existem.
    *   Cada protocolo de roteamento pode usar métricas diferentes. Exemplos:
        *   **RIP:** Contagem de saltos (hops).
        *   **OSPF:** Custo (geralmente inversamente proporcional à largura de banda do link).
        *   **EIGRP:** Uma métrica composta que considera largura de banda, atraso, confiabilidade e carga.
    *   O caminho com a menor métrica é geralmente o preferido.

*   **Gateway Padrão (Default Gateway):**
    *   **Definição:** É o endereço IP do roteador na rede local ao qual os hosts enviam pacotes destinados a redes externas (redes que não estão diretamente conectadas à rede local do host).
    *   **Funcionamento:** Quando um host precisa enviar um pacote para um endereço IP que não pertence à sua própria sub-rede, ele envia o pacote para o endereço MAC do seu gateway padrão. O gateway padrão (roteador) então assume a responsabilidade de encaminhar o pacote para o destino final ou para o próximo roteador no caminho.
    *   **Configuração:** Os hosts em uma rede local precisam ter o endereço IP do gateway padrão configurado (manualmente ou via DHCP) para poderem se comunicar com o exterior da sua rede local.

Este resumo focado em roteadores aborda os principais aspectos de seu funcionamento, características e conceitos relevantes para o concurso de Perito em Informática.
