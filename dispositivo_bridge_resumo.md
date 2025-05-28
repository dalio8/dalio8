# Bridges (Pontes) de Rede para Concursos (Perito em Informática - CEBRASPE)

## 1. Definição e Camada OSI de Operação

Uma **Bridge (Ponte)** é um dispositivo de interconexão de redes que opera primariamente na **Camada 2 (Enlace de Dados)** do Modelo OSI. Sua principal função é conectar dois ou mais segmentos de uma mesma rede local (LAN), permitindo a comunicação entre dispositivos nesses segmentos e filtrando o tráfego para reduzir o congestionamento. As bridges tomam decisões de encaminhamento com base nos endereços MAC (Media Access Control) dos quadros Ethernet.

## 2. Funcionamento Detalhado

### 2.1. Aprendizado e Uso de Endereços MAC (Tabela de Endereços MAC)

As bridges constroem e mantêm dinamicamente uma **tabela de endereços MAC** (também conhecida como tabela de encaminhamento ou, em um contexto mais moderno e relacionado aos switches, tabela CAM). Esta tabela mapeia os endereços MAC dos dispositivos da rede às portas da bridge pelas quais esses dispositivos podem ser alcançados.

*   **Processo de Aprendizado (Learning):**
    1.  Quando um quadro Ethernet chega a uma porta da bridge, esta examina o **endereço MAC de origem** do quadro.
    2.  A bridge registra esse endereço MAC de origem e a porta pela qual o quadro chegou em sua tabela de endereços MAC. Isso permite que a bridge aprenda a localização dos dispositivos na rede.
    3.  As entradas na tabela de endereços MAC geralmente possuem um **tempo de envelhecimento (aging time)**. Se uma entrada não for utilizada (ou seja, nenhum quadro com aquele MAC de origem for visto naquela porta) por um certo período, ela é removida.

*   **Processo de Encaminhamento e Filtragem (Forwarding/Filtering):**
    1.  Quando um quadro chega a uma porta, a bridge examina o **endereço MAC de destino** do quadro.
    2.  A bridge consulta sua tabela de endereços MAC:
        *   **Se o endereço MAC de destino é encontrado na tabela e está associado a uma porta DIFERENTE da porta de origem do quadro:** A bridge **encaminha (forwards)** o quadro apenas para a porta de destino correta.
        *   **Se o endereço MAC de destino é encontrado na tabela e está associado à MESMA porta pela qual o quadro chegou:** Isso significa que o dispositivo de origem e o de destino estão no mesmo segmento de rede. A bridge **filtra (filters)** o quadro, ou seja, o descarta, pois não há necessidade de encaminhá-lo para outros segmentos. Isso ajuda a isolar o tráfego dentro de cada segmento.
        *   **Se o endereço MAC de destino NÃO é encontrado na tabela (MAC desconhecido) ou se o endereço MAC de destino é um endereço de broadcast (FF:FF:FF:FF:FF:FF) ou multicast (para o qual a bridge não tem informações específicas de encaminhamento):** A bridge realiza **flooding (inundação)**, enviando o quadro para **todas as outras portas**, exceto a porta pela qual o quadro original foi recebido.

### 2.2. Segmentação de Domínios de Colisão

*   **Conceito:** Um domínio de colisão é uma área da rede onde os quadros podem colidir se dois ou mais dispositivos tentarem transmitir simultaneamente no mesmo meio físico compartilhado.
*   **Função da Bridge:** Cada porta de uma bridge (e cada segmento de rede conectado a ela) constitui um **domínio de colisão separado**.
*   **Benefício:** Ao conectar dois segmentos de rede com uma bridge, as colisões que ocorrem em um segmento não se propagam para o outro. Isso reduz a frequência de colisões e melhora o desempenho da rede em comparação com o uso de repetidores ou hubs, que simplesmente regeneram e retransmitem todos os sinais (incluindo colisões) para todas as portas.

### 2.3. Tratamento de Domínios de Broadcast

*   Por padrão, uma bridge **não segmenta domínios de broadcast**. Um quadro de broadcast recebido em uma porta será encaminhado para todas as outras portas da bridge. Portanto, todos os segmentos conectados por bridges (sem funcionalidades adicionais como VLANs, que são mais típicas de switches) pertencem ao mesmo domínio de broadcast.

## 3. Tipos de Bridges

Existem principalmente dois tipos de bridges com base em como elas tomam decisões de encaminhamento:

1.  **Bridge Transparente (Transparent Bridge ou Learning Bridge):**
    *   **Funcionamento:** É o tipo mais comum. Opera de forma "transparente" para os dispositivos da rede, o que significa que os dispositivos não precisam ter conhecimento da existência da bridge.
    *   **Aprendizado:** Constrói sua tabela de endereços MAC dinamicamente, observando os endereços MAC de origem dos quadros que passam por ela, conforme descrito anteriormente.
    *   **Encaminhamento/Filtragem:** Toma decisões de encaminhamento/filtragem com base na tabela de endereços MAC aprendida.
    *   **Spanning Tree Protocol (STP):** Bridges transparentes utilizam o STP (IEEE 802.1D) para prevenir loops de encaminhamento em redes com topologias redundantes (múltiplos caminhos entre segmentos). O STP garante que exista apenas um caminho ativo entre quaisquer dois segmentos da rede, bloqueando portas redundantes para evitar que os quadros circulem indefinidamente.

2.  **Bridge de Rota de Origem (Source-Routing Bridge):**
    *   **Funcionamento:** Utilizada principalmente em redes Token Ring (IEEE 802.5). Neste tipo de bridge, a decisão de roteamento não é tomada pela bridge em si, mas é determinada pelo host de origem.
    *   **Descoberta de Rota:** O host de origem envia um quadro de descoberta que percorre a rede para encontrar o destino. Cada bridge que o quadro atravessa adiciona sua informação de identificação ao quadro.
    *   **Encaminhamento:** Quando o quadro de descoberta retorna à origem (após encontrar o destino), ele contém a rota completa. O host de origem então inclui essa informação de rota nos quadros de dados subsequentes, e as bridges ao longo do caminho utilizam essa informação para encaminhar os quadros.
    *   **Menos comum em redes Ethernet.**

Outras classificações mencionadas incluem:
*   **Pontes Simples:** Tipicamente conectam apenas dois segmentos de rede.
*   **Pontes Multiporta:** Possuem mais de duas portas, permitindo a conexão de múltiplos segmentos de rede. Funcionalmente, aproximam-se muito dos switches modernos.

## 4. Principais Diferenças entre Bridges e Switches

Embora bridges e switches operem na Camada 2 e realizem funções similares de encaminhamento baseado em endereços MAC, existem diferenças importantes, especialmente quando comparamos bridges tradicionais com switches modernos:

*   **Número de Portas:**
    *   **Bridges:** Tradicionalmente, possuíam um número limitado de portas (geralmente 2 a 4, mas podendo ser mais em bridges multiporta).
    *   **Switches:** Geralmente oferecem uma densidade de portas muito maior (de 4 a 48 portas ou mais).

*   **Base de Decisão (Software vs. Hardware/ASICs):**
    *   **Bridges (mais antigas):** Muitas vezes, tomavam decisões de encaminhamento e filtragem baseadas em software, utilizando uma CPU de propósito geral. Isso resultava em maior latência e menor taxa de processamento de quadros.
    *   **Switches:** Implementam a lógica de comutação (incluindo a consulta à tabela CAM e o encaminhamento de quadros) em hardware especializado, utilizando **ASICs (Application-Specific Integrated Circuits)**. Isso permite o processamento de quadros em "wire speed" (velocidade do cabo) com latência muito baixa.

*   **Eficiência e Desempenho:**
    *   **Bridges:** Devido ao processamento por software, tendiam a ser mais lentas e com maior latência.
    *   **Switches:** O uso de ASICs torna os switches significativamente mais rápidos e eficientes, capazes de lidar com um volume de tráfego muito maior.

*   **Domínios de Colisão:**
    *   Ambos segmentam domínios de colisão. Em um switch, cada porta é tipicamente um domínio de colisão separado. Bridges multiporta também oferecem essa segmentação.

*   **Métodos de Comutação:**
    *   Switches modernos implementam métodos de comutação mais avançados (store-and-forward, cut-through, fragment-free, adaptive) para otimizar o desempenho, o que nem sempre era o caso em bridges mais antigas.

*   **Funcionalidades Adicionais:**
    *   Switches modernos, especialmente os gerenciáveis, oferecem uma gama muito maior de funcionalidades avançadas, como VLANs, QoS (Quality of Service), IGMP Snooping, agregação de link (link aggregation), etc., que não eram comuns em bridges tradicionais.

**Conclusão sobre a Diferença:** Pode-se dizer que os switches modernos são uma evolução das bridges multiporta, implementando a funcionalidade de encaminhamento da Camada 2 de forma muito mais eficiente e com um conjunto de recursos mais rico, graças ao uso de hardware dedicado (ASICs). Na prática atual, o termo "bridge" é menos comum para descrever dispositivos de interconexão de LANs, tendo sido amplamente substituído pelo termo "switch" para dispositivos de Camada 2.

Este resumo foca nos aspectos do funcionamento das bridges, sua camada de operação, e a comparação com switches, visando a preparação para o concurso de Perito em Informática.
