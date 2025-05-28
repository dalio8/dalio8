# Switches de Rede para Concursos (Perito em Informática - CEBRASPE)

## 1. Introdução e Camada OSI de Operação

Um **Switch** (ou comutador) é um dispositivo de interconexão de redes de computadores que opera predominantemente na **Camada 2 (Enlace de Dados)** do Modelo OSI. Sua principal função é conectar múltiplos dispositivos em uma rede local (LAN), permitindo a comunicação eficiente entre eles através do encaminhamento de quadros (frames) Ethernet.

## 2. Funcionamento da Tabela CAM (Content Addressable Memory)

O coração da operação de um switch é a sua **tabela de endereços MAC**, também conhecida como **tabela CAM (Content Addressable Memory)**. Esta tabela armazena o mapeamento entre os endereços MAC dos dispositivos conectados e as portas do switch às quais eles estão fisicamente ligados.

*   **Aprendizado de Endereços MAC:**
    1.  Quando um quadro Ethernet chega a uma porta do switch, este examina o **endereço MAC de origem** do quadro.
    2.  Se o endereço MAC de origem ainda não estiver na tabela CAM, o switch adiciona uma nova entrada, associando esse endereço MAC à porta pela qual o quadro foi recebido.
    3.  Se o endereço MAC de origem já existir na tabela, mas associado a uma porta diferente (indicando que o dispositivo mudou de porta), o switch atualiza a entrada.
    4.  As entradas na tabela CAM geralmente possuem um **tempo de envelhecimento (aging time)**. Se uma entrada não for atualizada (ou seja, nenhum quadro com aquele MAC de origem for visto naquela porta) por um certo período, ela é removida para evitar que a tabela fique cheia com entradas obsoletas.

*   **Uso da Tabela CAM para Encaminhamento:**
    1.  Quando um quadro Ethernet chega a uma porta do switch, este examina o **endereço MAC de destino** do quadro.
    2.  O switch consulta a tabela CAM para encontrar a porta associada a esse endereço MAC de destino.
    3.  **Se o endereço MAC de destino for encontrado na tabela CAM:** O switch encaminha o quadro **apenas** para a porta específica onde o dispositivo de destino está conectado. Isso é chamado de **encaminhamento unicast seletivo** e é a principal vantagem do switch sobre um hub (que simplesmente repete o quadro para todas as portas).
    4.  **Se o endereço MAC de destino NÃO for encontrado na tabela CAM (MAC desconhecido):** O switch não sabe em qual porta o dispositivo de destino está. Neste caso, ele realiza um **flooding (inundação)**, enviando o quadro para **todas as outras portas**, exceto a porta pela qual o quadro original foi recebido. Quando o dispositivo de destino responder, seu endereço MAC de origem será aprendido e adicionado à tabela CAM.

## 3. Tratamento de Quadros

Os switches tratam diferentes tipos de quadros da seguinte maneira:

*   **Quadros Unicast:**
    *   **Destino Conhecido:** Se o endereço MAC de destino está na tabela CAM, o quadro é encaminhado somente para a porta associada.
    *   **Destino Desconhecido (Unknown Unicast):** Se o endereço MAC de destino não está na tabela CAM, o quadro é inundado (flooded) para todas as portas, exceto a de origem.

*   **Quadros Multicast:**
    *   **Funcionamento Básico (sem otimizações):** Por padrão, muitos switches L2 tratam quadros multicast (endereços MAC de destino que representam um grupo de dispositivos) de forma similar a quadros broadcast, inundando-os para todas as portas (exceto a de origem).
    *   **Com IGMP Snooping:** Switches gerenciáveis mais avançados podem implementar o **IGMP Snooping**. Com essa funcionalidade, o switch "escuta" as mensagens do protocolo IGMP (Internet Group Management Protocol) trocadas entre os hosts e o roteador multicast. Isso permite que o switch aprenda quais portas estão interessadas em receber tráfego multicast para grupos específicos. Com base nessa informação, o switch encaminha os quadros multicast apenas para as portas que têm membros do grupo multicast correspondente, evitando o flooding desnecessário.

*   **Quadros Broadcast:**
    *   Quadros com endereço MAC de destino de broadcast (FF:FF:FF:FF:FF:FF) são sempre inundados (flooded) para **todas as portas**, exceto a porta pela qual o quadro foi recebido.
    *   Switches, por padrão, não segmentam domínios de broadcast. Todos os dispositivos conectados a um switch (ou a múltiplos switches interconectados sem VLANs) pertencem ao mesmo domínio de broadcast.

## 4. Segmentação de Domínios de Colisão

*   **Conceito:** Um domínio de colisão é uma seção da rede onde os pacotes de dados podem colidir uns com os outros se dois dispositivos tentarem transmitir simultaneamente no mesmo meio compartilhado.
*   **Funcionamento do Switch:** Cada porta de um switch opera em um **domínio de colisão separado**. Isso significa que as colisões que ocorrem em uma porta não afetam as outras portas.
*   **Benefício:** Ao segmentar a rede em múltiplos domínios de colisão menores, os switches reduzem drasticamente a probabilidade de colisões, melhorando o desempenho geral da rede, especialmente em comparação com hubs (que operam em um único domínio de colisão para todas as portas).
*   **Full-Duplex:** A maioria das portas de switch pode operar em modo full-duplex, onde um dispositivo pode enviar e receber dados simultaneamente, eliminando completamente as colisões naquela porta específica.

## 5. Uso de VLANs para Segmentar Domínios de Broadcast

*   **Conceito de Domínio de Broadcast:** Um domínio de broadcast é uma área lógica de uma rede de computadores onde qualquer dispositivo conectado pode transmitir diretamente para qualquer outro dispositivo no mesmo domínio sem a necessidade de um dispositivo de roteamento. Quadros de broadcast enviados por um dispositivo são recebidos por todos os outros dispositivos no mesmo domínio de broadcast.
*   **VLAN (Virtual Local Area Network):**
    *   **Definição:** Uma VLAN permite que uma única infraestrutura de switch físico seja logicamente dividida em múltiplas redes locais virtuais separadas. Cada VLAN é um domínio de broadcast independente.
    *   **Funcionamento:**
        *   As portas do switch são atribuídas a VLANs específicas.
        *   O tráfego de broadcast, multicast (sem otimizações específicas como IGMP Snooping configurado por VLAN) e unicast desconhecido originado em uma VLAN é confinado apenas às portas que pertencem à mesma VLAN.
        *   Para que dispositivos em VLANs diferentes se comuniquem, é necessário um dispositivo de Camada 3, como um roteador ou um switch L3.
        *   **Tagging (IEEE 802.1Q):** Quando o tráfego de múltiplas VLANs precisa atravessar um único link entre switches (um "trunk link"), os quadros são marcados (tagged) com um identificador de VLAN para que o switch receptor saiba a qual VLAN o quadro pertence.
*   **Benefícios das VLANs:**
    *   **Segmentação de Domínios de Broadcast:** Reduz o tráfego de broadcast e melhora o desempenho da rede.
    *   **Segurança:** Isola grupos de usuários ou dispositivos, impedindo que o tráfego de uma VLAN seja visível para outra sem roteamento explícito.
    *   **Flexibilidade:** Permite agrupar logicamente dispositivos independentemente de sua localização física.
    *   **Organização:** Melhora a organização da rede e facilita o gerenciamento.

## 6. Métodos de Comutação (Switching Methods)

Os switches utilizam diferentes métodos para encaminhar os quadros Ethernet:

1.  **Store-and-Forward (Armazenar e Encaminhar):**
    *   **Funcionamento:** O switch recebe o quadro Ethernet inteiro em um buffer interno, verifica a integridade do quadro (calculando o CRC - Cyclic Redundancy Check) e, se o quadro estiver livre de erros, consulta a tabela CAM para determinar a porta de destino e o encaminha. Se erros forem detectados, o quadro é descartado.
    *   **Vantagens:** Maior integridade dos dados, pois quadros corrompidos são filtrados e não propagados pela rede.
    *   **Desvantagens:** Maior latência, pois o switch precisa receber o quadro inteiro antes de iniciar o encaminhamento. A latência varia com o tamanho do quadro.

2.  **Cut-Through (Corte Direto):**
    *   **Funcionamento:** O switch começa a encaminhar o quadro assim que lê o endereço MAC de destino no cabeçalho do quadro, sem esperar que o restante do quadro seja recebido. Não realiza verificação de erros (CRC) antes de encaminhar.
    *   **Vantagens:** Menor latência, pois o encaminhamento começa quase imediatamente. A latência é constante, independentemente do tamanho do quadro.
    *   **Desvantagens:** Pode propagar quadros corrompidos (incluindo "runts" - quadros menores que o mínimo permitido) e quadros com erros de CRC, pois não os verifica antes de encaminhar.

3.  **Fragment-Free (Livre de Fragmentos):**
    *   **Funcionamento:** É uma variação do cut-through. O switch espera receber os primeiros 64 bytes do quadro antes de encaminhá-lo. A maioria das colisões e erros de transmissão são detectados nos primeiros 64 bytes de um quadro Ethernet.
    *   **Vantagens:** Oferece uma latência menor que o store-and-forward, ao mesmo tempo que filtra a maioria dos quadros resultantes de colisões (fragmentos).
    *   **Desvantagens:** Ainda pode propagar alguns quadros com erros que ocorrem após os primeiros 64 bytes.

4.  **Adaptive Switching (Comutação Adaptativa):**
    *   **Funcionamento:** Alguns switches podem operar de forma adaptativa, alternando entre os métodos store-and-forward e cut-through (ou fragment-free) com base nas condições atuais da rede. Por exemplo, pode operar em cut-through para baixa latência e mudar para store-and-forward se detectar uma alta taxa de erros em uma porta.
    *   **Vantagens:** Tenta combinar o melhor dos dois mundos, otimizando para latência ou para integridade conforme necessário.

Switches modernos de alta performance frequentemente utilizam técnicas cut-through ou adaptativas para minimizar a latência, especialmente em ambientes de data center. A escolha do método de comutação pode impactar o desempenho da rede, dependendo das características do tráfego e dos requisitos da aplicação.

Este resumo cobre os principais aspectos do funcionamento dos switches de rede, relevante para concursos como o de Perito em Informática.
