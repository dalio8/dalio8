# Detalhamento dos Subtópicos de "6. Redes de computadores" (Edital Perito Criminal Federal – Área 3)

Este tópico aborda os conceitos, tecnologias, protocolos e arquiteturas que fundamentam a comunicação de dados entre computadores e outros dispositivos. Para um perito em informática forense, o conhecimento de redes é indispensável para analisar tráfego de rede capturado, investigar intrusões, rastrear comunicações, identificar a origem de ataques e entender como os dados são transmitidos e protegidos (ou não) em ambientes de rede.

---

## 6.1 Tipos, tecnologias e topologias de redes de computadores.

*   **Explicação:**
    *   **Tipos de Redes (Classificação por Abrangência Geográfica):**
        *   **PAN (Personal Area Network - Rede de Área Pessoal):** Rede de curtíssimo alcance, geralmente conectando dispositivos pessoais de um indivíduo (ex: fones de ouvido Bluetooth conectados a um celular, um mouse sem fio a um notebook).
            *   *Tecnologias Comuns:* Bluetooth, Zigbee, infravermelho.
        *   **LAN (Local Area Network - Rede Local):** Rede que abrange uma área geográfica limitada, como um escritório, uma residência, um prédio ou um campus universitário. Caracterizada por altas taxas de transmissão e baixa latência.
            *   *Tecnologias Comuns:* Ethernet (cabos par trançado, fibra óptica), Wi-Fi (IEEE 802.11).
        *   **MAN (Metropolitan Area Network - Rede Metropolitana):** Interliga múltiplas LANs dentro de uma cidade ou região metropolitana. Pode ser usada por provedores de serviços para oferecer conectividade a empresas e residências.
            *   *Tecnologias Comuns:* Fibra óptica, WiMAX, tecnologias de operadoras (ex: Metro Ethernet).
        *   **WAN (Wide Area Network - Rede de Longa Distância):** Cobre uma grande área geográfica, como um país, um continente ou o globo. A Internet é o maior exemplo de WAN. Caracterizada por taxas de transmissão variáveis e latências maiores que LANs.
            *   *Tecnologias Comuns:* Linhas dedicadas (alugadas de operadoras), MPLS (Multiprotocol Label Switching), Frame Relay (legado), ATM (Asynchronous Transfer Mode - Modo de Transferência Assíncrono) (legado), satélite.
        *   **Outros Tipos:**
            *   **WLAN (Wireless Local Area Network - Rede Local Sem Fio):** Uma LAN implementada sem fios, geralmente usando Wi-Fi.
            *   **SAN (Storage Area Network - Rede de Área de Armazenamento):** Rede dedicada de alta velocidade para conectar servidores a dispositivos de armazenamento (ex: disk arrays, tape libraries).
            *   **VPN (Virtual Private Network - Rede Privada Virtual):** Cria uma conexão segura e criptografada sobre uma rede pública (como a Internet), permitindo acesso remoto a uma rede privada.
    *   **Tecnologias de Redes:** Referem-se aos métodos e padrões usados para transmitir dados.
        *   **Ethernet:** Padrão dominante para LANs cabeadas, especificando cabeamento, sinalização e formatos de quadro (frames). Velocidades variam (10 Mbps, 100 Mbps, 1 Gbps, 10 Gbps, etc.).
        *   **Wi-Fi (IEEE 802.11):** Padrão para WLANs, usando ondas de rádio. Diversas variantes (802.11a/b/g/n/ac/ax) com diferentes frequências e taxas de dados.
        *   **Bluetooth:** Para PANs, comunicação de curto alcance entre dispositivos.
        *   **Fibra Óptica:** Transmissão de dados usando pulsos de luz através de cabos de vidro ou plástico. Alta largura de banda, longa distância, imune a interferência eletromagnética.
        *   **DSL (Digital Subscriber Line - Linha de Assinante Digital):** Tecnologia para acesso à Internet de banda larga sobre linhas telefônicas de cobre.
        *   **Redes Celulares (GSM, CDMA, LTE, 5G):** Tecnologias para comunicação de dados móveis.
    *   **Topologias de Redes:** Descrevem o arranjo físico ou lógico dos nós (dispositivos) e das conexões em uma rede.
        *   **Topologia Física:** Como os cabos são fisicamente dispostos.
            *   **Barramento (Bus):** Todos os nós compartilham um único cabo central. Simples, mas uma falha no cabo principal afeta toda a rede. Propagação de sinal para todos os nós, colisões são um problema (requer CSMA/CD em Ethernet legada).
            *   **Anel (Ring):** Os nós são conectados em um círculo fechado. Os dados circulam em uma direção. Falha de um nó ou cabo pode interromper o anel (a menos que haja redundância, como em anéis duplos).
            *   **Estrela (Star):** Todos os nós são conectados a um dispositivo central (hub, switch ou roteador). Falha de um cabo afeta apenas o nó conectado; falha do dispositivo central paralisa a rede. Mais fácil de gerenciar e solucionar problemas. É a topologia física mais comum em LANs modernas.
            *   **Malha (Mesh):** Cada nó é conectado a múltiplos outros nós.
                *   **Malha Total (Full Mesh):** Cada nó se conecta a todos os outros. Alta redundância e tolerância a falhas, mas custo de cabeamento elevado.
                *   **Malha Parcial (Partial Mesh):** Alguns nós são conectados a múltiplos outros, mas não a todos.
            *   **Árvore (Tree) ou Hierárquica:** Combinação da topologia em estrela e barramento, formando uma estrutura hierárquica.
            *   **Híbrida:** Combinação de duas ou mais topologias.
        *   **Topologia Lógica:** Como os dados são transmitidos entre os nós, independentemente da disposição física.
            *   **Barramento Lógico:** Todos os nós recebem todos os frames transmitidos (ex: Wi-Fi em modo ad-hoc, Ethernet com hub).
            *   **Anel Lógico:** Os dados passam de nó em nó em uma sequência lógica (ex: Token Ring, FDDI).
*   **Relevância Forense:**
    *   **Identificação do Ambiente de Rede:** Compreender o tipo e a topologia da rede onde ocorreu um incidente é crucial para planejar a investigação, coletar evidências (ex: logs de switches, roteadores, firewalls) e entender o escopo do comprometimento.
    *   **Análise de Tráfego:** O tipo de rede e tecnologia influencia como o tráfego de rede é capturado e analisado. Em redes comutadas (switched), a captura de tráfego requer técnicas específicas (port mirroring, taps).
    *   **Rastreamento de Conexões:** A topologia ajuda a entender como um invasor pode ter se movido pela rede ou como dados foram exfiltrados.
    *   **Vulnerabilidades Específicas:** Diferentes tecnologias e topologias podem ter vulnerabilidades específicas (ex: sniffing em redes com hubs, ataques a protocolos de roteamento em WANs).
    *   **Redes Sem Fio:** Investigar redes Wi-Fi requer análise de pontos de acesso, logs de autenticação, e possivelmente a captura de tráfego aéreo.

---

## 6.2 Técnicas básicas de comunicação.

*   **Explicação:** Refere-se aos princípios e métodos pelos quais os dados são trocados entre dois ou mais dispositivos em uma rede.
    *   **Modos de Transmissão:**
        *   **Simplex:** A comunicação ocorre em apenas uma direção. Um dispositivo é sempre o transmissor e o outro é sempre o receptor.
            *   *Exemplo:* Transmissão de rádio ou TV.
        *   **Half-duplex (Semi-duplex):** A comunicação pode ocorrer em ambas as direções, mas não simultaneamente. Os dispositivos alternam entre transmitir e receber.
            *   *Exemplo:* Walkie-talkies, Ethernet com hubs (devido ao CSMA/CD).
        *   **Full-duplex (Duplex Completo):** A comunicação pode ocorrer em ambas as direções simultaneamente.
            *   *Exemplo:* Conversa telefônica, Ethernet com switches.
    *   **Tipos de Transmissão (quanto ao número de receptores):**
        *   **Unicast:** Transmissão de um único remetente para um único destinatário.
        *   **Broadcast:** Transmissão de um único remetente para todos os outros nós na rede (ou em um domínio de broadcast).
        *   **Multicast:** Transmissão de um único remetente para um grupo específico de destinatários que se registraram para receber a transmissão.
        *   **Anycast:** Transmissão de um remetente para o nó mais próximo (em termos de métrica de roteamento) de um grupo de nós que compartilham o mesmo endereço anycast. Usado em DNS e IPv6.
    *   **Sinalização:** Como os dados (bits 0 e 1) são representados em um meio físico (elétrico, óptico, rádio).
        *   **Analógica vs. Digital:** Sinais analógicos variam continuamente; sinais digitais têm níveis discretos. Dados de computador são digitais, mas podem ser transmitidos sobre meios analógicos usando modulação (e demodulação na recepção).
        *   **Codificação de Linha (Line Coding):** Técnicas para representar bits digitais como sinais elétricos (ex: NRZ, Manchester, AMI).
    *   **Multiplexação:** Técnica que permite que múltiplos sinais de comunicação compartilhem um único meio de transmissão.
        *   **FDM (Frequency Division Multiplexing - Multiplexação por Divisão de Frequência):** O espectro de frequência do meio é dividido em canais menores, cada um transportando um sinal diferente.
        *   **TDM (Time Division Multiplexing - Multiplexação por Divisão de Tempo):** Cada sinal recebe um pequeno intervalo de tempo (time slot) para transmitir no meio, em um padrão de rodízio.
        *   **WDM (Wavelength Division Multiplexing - Multiplexação por Divisão de Comprimento de Onda):** Usada em fibra óptica, onde diferentes comprimentos de onda (cores) de luz carregam sinais diferentes simultaneamente.
    *   **Controle de Erros:** Técnicas para detectar e, possivelmente, corrigir erros que ocorrem durante a transmissão de dados (ex: bits de paridade, CRC - Cyclic Redundancy Check, checksums).
    *   **Controle de Fluxo:** Mecanismos para evitar que um transmissor rápido sobrecarregue um receptor lento (ex: stop-and-wait, sliding window).
*   **Relevância Forense:**
    *   **Análise de Tráfego de Rede:** O modo de transmissão afeta como os dados são capturados e interpretados. Entender se uma comunicação era unicast, broadcast ou multicast ajuda a determinar o escopo da comunicação.
    *   **Recuperação de Dados Corrompidos:** O conhecimento sobre técnicas de controle de erros pode ser útil ao tentar reconstruir pacotes de dados danificados ou fragmentados.
    *   **Interpretação de Protocolos:** Muitos protocolos de rede implementam suas próprias formas de controle de fluxo e erro, e entender esses mecanismos é crucial para a análise de protocolos.
    *   **Ataques de Rede:** Alguns ataques podem explorar as características das técnicas de comunicação (ex: inundação de broadcast (broadcast storm), ataques de negação de serviço explorando controle de fluxo).

---

## 6.3 Técnicas de comutação de circuitos, pacotes e células.

*   **Explicação:** Comutação (Switching) refere-se aos métodos usados em redes para direcionar dados do remetente ao destinatário através de múltiplos nós intermediários (comutadores, roteadores).
    *   **Comutação de Circuitos (Circuit Switching):**
        *   **Conceito:** Um caminho de comunicação dedicado (circuito) é estabelecido entre o remetente e o destinatário antes que a transmissão de dados comece. Esse circuito permanece alocado exclusivamente para essa comunicação durante toda a sua duração, mesmo que não haja dados sendo transmitidos. Ao final da comunicação, o circuito é liberado.
        *   **Fases:** Estabelecimento do circuito, transferência de dados, desconexão do circuito.
        *   **Características:** Largura de banda garantida, atraso de transmissão constante, mas pode haver desperdício de recursos se o circuito estiver ocioso. O tempo de estabelecimento do circuito pode ser significativo.
        *   **Exemplo Clássico:** Rede telefônica pública comutada (PSTN) tradicional.
    *   **Comutação de Pacotes (Packet Switching):**
        *   **Conceito:** Os dados a serem transmitidos são divididos em blocos menores chamados pacotes. Cada pacote contém um cabeçalho com informações de endereçamento (origem, destino) e controle, além dos dados do usuário. Os pacotes são enviados individualmente pela rede e podem seguir rotas diferentes até o destino, onde são reagrupados na ordem correta. Os nós intermediários (roteadores) recebem, armazenam temporariamente (store-and-forward) e encaminham os pacotes.
        *   **Características:** Uso mais eficiente dos recursos da rede (o mesmo link pode ser compartilhado por múltiplas comunicações). Não há tempo de estabelecimento de circuito dedicado. Maior flexibilidade e robustez (pode contornar falhas). No entanto, pode haver atrasos variáveis (jitter) e perda de pacotes devido a congestionamento.
        *   **Tipos:**
            *   **Datagrama (Datagram Packet Switching):** Cada pacote é tratado independentemente e pode seguir rotas diferentes. Não há garantia de ordem de chegada ou entrega. (Ex: IP)
            *   **Circuito Virtual (Virtual Circuit Packet Switching):** Uma rota lógica (circuito virtual) é estabelecida antes da transmissão dos pacotes, mas os recursos do link ainda são compartilhados. Todos os pacotes da mesma comunicação seguem a mesma rota lógica. Combina aspectos da comutação de circuitos e de datagramas. (Ex: Frame Relay, ATM).
        *   **Exemplo Clássico:** A Internet (baseada no protocolo IP).
    *   **Comutação de Células (Cell Switching):**
        *   **Conceito:** Um caso especial da comutação de pacotes onde os pacotes, chamados células, têm um tamanho pequeno e fixo.
        *   **Características:** O tamanho fixo das células simplifica o processamento nos comutadores e permite um gerenciamento de tráfego mais previsível, sendo adequado para transportar diferentes tipos de tráfego (voz, vídeo, dados) com diferentes requisitos de qualidade de serviço (QoS).
        *   **Exemplo Clássico:** ATM (Asynchronous Transfer Mode - Modo de Transferência Assíncrono), que usa células de 53 bytes.
*   **Relevância Forense:**
    *   **Análise de Tráfego de Rede:** A maioria das redes modernas (incluindo a Internet) usa comutação de pacotes. A análise forense de tráfego de rede envolve a captura, reconstrução e análise desses pacotes (ex: usando Wireshark).
    *   **Rastreamento de Comunicações:** Entender como os pacotes são roteados e como os endereços são usados é fundamental para rastrear a origem e o destino de comunicações suspeitas.
    *   **Recuperação de Sessões:** Em comutação de pacotes, o perito pode precisar reagrupar pacotes para reconstruir sessões de comunicação (ex: uma página web, um arquivo transferido, uma conversa de chat).
    *   **Ataques de Rede:** Muitos ataques (DoS, Man-in-the-Middle) exploram as características da comutação de pacotes.
    *   Embora a comutação de circuitos e células (ATM) sejam menos comuns hoje em redes de dados de usuário final, elas ainda podem ser encontradas em infraestruturas de telecomunicações ou redes legadas, e o conhecimento conceitual pode ser útil.

---

## 6.4 Elementos de interconexão: gateways, hubs, repetidores, bridges, switches, roteadores.

*   **Explicação:** Dispositivos de hardware usados para conectar diferentes segmentos de rede ou diferentes redes, permitindo a comunicação entre eles. Operam em diferentes camadas do modelo OSI.
    *   **Repetidores (Repeaters):**
        *   **Função:** Regeneram e retransmitem sinais de rede para estender o alcance de uma LAN. Operam na **Camada 1 (Física)** do modelo OSI.
        *   **Características:** Não filtram tráfego nem entendem endereços MAC ou IP. Simplesmente amplificam o sinal (incluindo ruído). Aumentam o domínio de colisão.
        *   **Uso:** Legado, em redes Ethernet antigas para superar limitações de comprimento de cabo.
    *   **Hubs (Concentradores):**
        *   **Função:** Ponto central de conexão para dispositivos em uma LAN com topologia em estrela. Operam na **Camada 1 (Física)**.
        *   **Características:** Quando um sinal chega em uma porta, ele é retransmitido para todas as outras portas (funcionam como um repetidor multiportas). Todos os dispositivos conectados a um hub compartilham a mesma largura de banda e o mesmo domínio de colisão (o que pode levar a colisões e degradar o desempenho).
        *   **Uso:** Legado, amplamente substituídos por switches.
    *   **Pontes (Bridges):**
        *   **Função:** Conectam dois ou mais segmentos de LAN, tomando decisões de encaminhamento com base nos endereços MAC (Media Access Control - Controle de Acesso ao Meio) dos dispositivos. Operam na **Camada 2 (Enlace de Dados)**.
        *   **Características:** Aprendem os endereços MAC dos dispositivos em cada segmento e filtram o tráfego, encaminhando quadros (frames) apenas para o segmento onde o dispositivo de destino está localizado. Reduzem colisões, pois cada segmento conectado a uma porta da ponte é um domínio de colisão separado.
        *   **Uso:** Usadas para segmentar LANs maiores e melhorar o desempenho. Precursoras dos switches.
    *   **Switches (Comutadores):**
        *   **Função:** Dispositivo central em LANs modernas que conecta múltiplos dispositivos, aprendendo os endereços MAC conectados a cada uma de suas portas e encaminhando quadros (frames) diretamente para a porta do dispositivo de destino. Operam principalmente na **Camada 2 (Enlace de Dados)**. Alguns switches avançados (Layer 3 switches) também podem realizar funções de roteamento (Camada 3).
        *   **Características:** Cada porta de um switch é um domínio de colisão separado, o que melhora significativamente o desempenho em comparação com hubs. Permitem comunicação full-duplex. Criam tabelas MAC (CAM tables) para mapear endereços MAC para portas.
        *   **Uso:** Padrão para conectar dispositivos em LANs.
    *   **Roteadores (Routers):**
        *   **Função:** Encaminham pacotes de dados entre diferentes redes (ex: entre uma LAN e a Internet, ou entre diferentes sub-redes dentro de uma organização). Operam na **Camada 3 (Rede)**.
        *   **Características:** Usam endereços IP para tomar decisões de roteamento. Mantêm tabelas de roteamento para determinar o melhor caminho para encaminhar os pacotes. Não encaminham broadcasts por padrão (cada interface de um roteador é um domínio de broadcast separado). Podem realizar tradução de endereços de rede (NAT).
        *   **Uso:** Conectar LANs à Internet, interconectar diferentes redes.
    *   **Gateways (Portais de Interconexão):**
        *   **Função:** Termo genérico para um dispositivo ou software que atua como um ponto de entrada/saída entre duas redes ou sistemas diferentes que podem usar protocolos ou formatos de dados distintos. Pode operar em múltiplas camadas do modelo OSI, dependendo da funcionalidade.
        *   **Características:** Realizam tradução de protocolos, formatos de dados ou endereços. Um roteador é um tipo de gateway (gateway de rede). Outros exemplos incluem gateways de e-mail (que conectam diferentes sistemas de e-mail), gateways de VoIP (que conectam redes de voz sobre IP a redes telefônicas tradicionais).
        *   **Uso:** Interconectar redes heterogêneas.
*   **Relevância Forense:**
    *   **Logs de Dispositivos:** Switches gerenciáveis, roteadores e gateways (especialmente firewalls, que são um tipo de gateway) frequentemente mantêm logs de tráfego, conexões, eventos de segurança, tentativas de acesso, que são fontes cruciais de evidência.
        *   *Exemplo:* Logs de um roteador podem mostrar quais endereços IP internos acessaram quais endereços IP externos. Logs de um switch podem mostrar quais endereços MAC foram vistos em quais portas.
    *   **Análise de Tráfego de Rede:**
        *   **Hubs:** Em redes com hubs (raras hoje), todo o tráfego é visível para todos os nós no mesmo segmento, facilitando a captura (sniffing).
        *   **Switches:** Para capturar tráfego em redes comutadas, técnicas como `port mirroring` (SPAN port) no switch, `MAC flooding` (ataque para forçar o switch a agir como hub, menos eficaz em switches modernos), ou o uso de `network taps` (dispositivos de derivação de rede) são necessárias.
    *   **Tabela MAC (CAM Table) do Switch:** Pode conter um histórico recente de quais endereços MAC foram associados a quais portas do switch, ajudando a localizar fisicamente um dispositivo ou identificar spoofing de MAC.
    *   **Tabela ARP e Tabela de Roteamento do Roteador:** A tabela ARP (Address Resolution Protocol - Protocolo de Resolução de Endereços) mapeia endereços IP para endereços MAC na rede local. A tabela de roteamento mostra como o roteador encaminha pacotes para redes remotas. Ambas podem ser úteis.
    *   **Identificação da Topologia de Rede:** Entender quais dispositivos de interconexão estão presentes e como estão conectados ajuda a mapear a rede e o fluxo de dados.
    *   **Configurações de Segurança:** Configurações de ACLs em roteadores e switches, regras de firewall em gateways, podem indicar políticas de segurança e como elas podem ter sido contornadas ou exploradas.

---

## 6.5 Arquiteturas e protocolos de redes.

*   **Explicação:** Este subtópico foca nos modelos conceituais que organizam as funções de rede em camadas e nos conjuntos de regras (protocolos) que governam a comunicação de dados.

    ---
    #### 6.5.1 Modelo OSI e arquitetura TCP/IP.
    *   **Modelo OSI (Open Systems Interconnection - Interconexão de Sistemas Abertos):**
        *   **Conceito:** Modelo de referência de 7 camadas desenvolvido pela ISO (International Organization for Standardization) para padronizar as funções de uma rede de telecomunicações ou sistema de computação, independentemente da tecnologia subjacente. É um modelo conceitual, não uma implementação de protocolo.
        *   **Camadas (de baixo para cima):**
            1.  **Física (Physical):** Transmissão de bits brutos sobre o meio físico (cabos, fibra, rádio). Define características elétricas, mecânicas, funcionais do meio. (Ex: Ethernet (cabos), RS-232).
            2.  **Enlace de Dados (Data Link):** Transferência confiável de quadros (frames) de dados entre dois nós diretamente conectados. Detecção e correção de erros na camada física. Controle de acesso ao meio (MAC). (Ex: Ethernet (MAC), PPP, HDLC).
            3.  **Rede (Network):** Endereçamento lógico (IP), roteamento de pacotes através de múltiplas redes, controle de congestionamento. (Ex: IP, ICMP, IGMP).
            4.  **Transporte (Transport):** Fornece comunicação fim-a-fim confiável (TCP) ou não confiável (UDP) entre processos em diferentes hosts. Segmentação e remontagem de dados, controle de fluxo, controle de erros. (Ex: TCP, UDP, SCTP).
            5.  **Sessão (Session):** Estabelecimento, gerenciamento e encerramento de sessões (diálogos) entre aplicações. Sincronização. (Ex: NetBIOS, RPC).
            6.  **Apresentação (Presentation):** Formatação e representação dos dados (ex: conversão de caracteres ASCII/EBCDIC, criptografia, compressão). Garante que os dados sejam compreensíveis para a camada de aplicação. (Ex: SSL/TLS, JPEG, MPEG).
            7.  **Aplicação (Application):** Fornece a interface para os aplicativos do usuário acessarem os serviços de rede. (Ex: HTTP, FTP, SMTP, DNS).
    *   **Arquitetura TCP/IP (Transmission Control Protocol/Internet Protocol - Protocolo de Controle de Transmissão/Protocolo de Internet):**
        *   **Conceito:** Conjunto de protocolos que forma a base da Internet. É um modelo mais prático e amplamente implementado em comparação com o OSI.
        *   **Camadas (geralmente 4, às vezes 5 camadas são descritas):**
            1.  **Enlace (Link ou Network Access/Interface):** Combina as camadas Física e Enlace do modelo OSI. Lida com a transmissão de dados no meio físico e o endereçamento físico (MAC). (Ex: Ethernet, Wi-Fi, drivers de dispositivo).
            2.  **Internet (ou Rede):** Equivalente à camada de Rede do OSI. Responsável pelo endereçamento lógico (IP) e roteamento de pacotes. (Ex: IP, ICMP, ARP).
            3.  **Transporte (Transport):** Equivalente à camada de Transporte do OSI. Fornece comunicação fim-a-fim. (Ex: TCP, UDP).
            4.  **Aplicação (Application):** Combina as camadas de Sessão, Apresentação e Aplicação do modelo OSI. Contém os protocolos usados diretamente pelos aplicativos. (Ex: HTTP, FTP, SMTP, DNS, SSH).
    *   **Relevância Forense:**
        *   **Framework para Análise:** Ambos os modelos fornecem um framework para entender como os dados são encapsulados e processados à medida que viajam pela rede. Na análise de pacotes, é comum referenciar as camadas para descrever onde um protocolo ou informação está localizado (ex: "o endereço IP está na camada de Rede").
        *   **Encapsulamento e Desencapsulamento:** Os dados da camada superior são encapsulados com cabeçalhos pela camada inferior. Entender esse processo é crucial para dissecar pacotes de rede e extrair informações de cada camada (ex: extrair um arquivo de uma sessão TCP que foi transmitida sobre IP e Ethernet).
        *   **Localização de Artefatos:** Diferentes artefatos forenses são encontrados em diferentes camadas (ex: endereços MAC na camada de Enlace, endereços IP na camada de Rede, portas na camada de Transporte, dados de aplicação na camada de Aplicação).
        *   **Ataques em Camadas Específicas:** Ataques de rede frequentemente visam vulnerabilidades em protocolos de camadas específicas (ex: ARP spoofing na camada de Enlace, IP spoofing na camada de Rede, SYN flood na camada de Transporte, injeção de SQL na camada de Aplicação).

    ---
    #### 6.5.2 Arquitetura cliente-servidor.
    *   **Explicação:** Modelo de computação distribuída onde as tarefas e cargas de trabalho são divididas entre:
        *   **Servidores (Servers):** Provedores de recursos ou serviços. São programas (ou máquinas dedicadas) que aguardam e respondem a requisições de clientes. (Ex: servidor web, servidor de banco de dados, servidor de arquivos, servidor de e-mail).
        *   **Clientes (Clients):** Solicitantes de recursos ou serviços. São programas (ou máquinas) que iniciam a comunicação com um servidor para obter um serviço. (Ex: navegador web, cliente de e-mail, aplicativo de banco de dados).
        *   **Comunicação:** O cliente envia uma requisição ao servidor através da rede. O servidor processa a requisição e envia uma resposta de volta ao cliente.
    *   **Características:** Centralização de recursos e gerenciamento no servidor, escalabilidade (pode-se adicionar mais clientes ou melhorar o servidor).
    *   **Relevância Forense:**
        *   **Logs do Servidor:** Servidores (web, e-mail, banco de dados) geralmente mantêm logs detalhados de requisições de clientes, acessos, erros, que são fontes primárias de evidência para investigar atividades de usuários, intrusões ou exfiltração de dados.
        *   **Logs do Cliente:** Aplicações cliente também podem manter logs de suas interações com servidores.
        *   **Análise de Tráfego de Rede:** Capturar e analisar o tráfego entre clientes e servidores pode revelar a natureza das requisições e respostas, dados transmitidos, e possíveis atividades maliciosas (ex: um cliente comprometido se comunicando com um servidor C2 de um malware).
        *   **Identificação de Pontos de Falha ou Comprometimento:** Em uma arquitetura cliente-servidor, o comprometimento do servidor pode afetar muitos clientes. O comprometimento de um cliente pode ser usado para atacar o servidor.
        *   **Ataques Comuns:** Ataques de negação de serviço (DoS/DDoS) contra servidores, exploração de vulnerabilidades em software de servidor ou cliente.

    ---
    #### 6.5.3 Ethernet.
    *   **Explicação:** Família de tecnologias de rede de computadores para Redes Locais (LANs), padronizada pelo IEEE 802.3. É a tecnologia de LAN cabeada mais difundida.
        *   **Características:**
            *   **Endereçamento MAC:** Usa endereços MAC de 48 bits (gravados no hardware da placa de rede - NIC) para identificar dispositivos na rede local.
            *   **Formato de Quadro (Frame):** Define a estrutura dos quadros Ethernet, que encapsulam pacotes da camada de rede (ex: pacotes IP). Um quadro Ethernet típico inclui: Preâmbulo, Endereço MAC de Destino, Endereço MAC de Origem, Tipo/Comprimento (EtherType, para indicar o protocolo da camada superior, ex: IP, ARP), Dados (Payload) e Sequência de Verificação de Quadro (FCS - Frame Check Sequence, para detecção de erros).
            *   **CSMA/CD (Carrier Sense Multiple Access with Collision Detection - Acesso Múltiplo com Detecção de Portadora e Detecção de Colisão):** Mecanismo de controle de acesso ao meio usado em redes Ethernet compartilhadas (com hubs ou em topologias de barramento legadas). Antes de transmitir, um nó "ouve" o meio; se estiver livre, transmite. Se dois nós transmitem ao mesmo tempo, ocorre uma colisão. Os nós detectam a colisão, param de transmitir, enviam um sinal de congestionamento (jam signal) e esperam um tempo aleatório antes de tentar retransmitir.
            *   **Switched Ethernet:** Em redes modernas com switches, cada porta do switch é um domínio de colisão separado, e o CSMA/CD é menos relevante, pois os switches encaminham os quadros diretamente para o destino, e a comunicação full-duplex é comum.
        *   **Velocidades:** 10 Mbps (Ethernet), 100 Mbps (Fast Ethernet), 1 Gbps (Gigabit Ethernet), 10 Gbps (10 Gigabit Ethernet), e mais rápidas.
        *   **Cabeamento:** Originalmente coaxial, mas predominantemente par trançado (UTP/STP com conectores RJ45) e fibra óptica.
    *   **Relevância Forense:**
        *   **Análise de Tráfego de Rede:** Quadros Ethernet são a unidade básica de dados capturada por sniffers de rede em LANs. O perito analisa os cabeçalhos Ethernet para ver os endereços MAC de origem e destino, o que pode ajudar a identificar os dispositivos físicos envolvidos em uma comunicação dentro da rede local.
        *   **Identificação de Dispositivos:** O endereço MAC (parte OUI - Organizationally Unique Identifier) pode indicar o fabricante da placa de rede.
        *   **Ataques na Camada de Enlace:** ARP spoofing, MAC flooding, VLAN hopping exploram vulnerabilidades ou características da Ethernet e dos switches.
        *   **Logs de Switches:** Podem registrar informações sobre endereços MAC, portas, VLANs, e eventos de segurança.

    ---
    #### 6.5.4 Redes peer-to-peer (P2P).
    *   **Explicação:** Arquitetura de rede distribuída onde os participantes (pares ou peers) compartilham diretamente uma parte de seus recursos (como poder de processamento, armazenamento em disco ou largura de banda da rede) com outros participantes, sem a necessidade de um servidor central coordenador. Cada nó pode atuar tanto como cliente quanto como servidor.
        *   **Características:**
            *   **Descentralização:** Não há um ponto central de controle ou falha (em P2P puro).
            *   **Auto-organização:** Os pares podem descobrir uns aos outros e se conectar dinamicamente.
            *   **Escalabilidade:** O desempenho pode aumentar à medida que mais pares se juntam à rede, pois mais recursos se tornam disponíveis.
            *   **Compartilhamento de Recursos:** O propósito principal é o compartilhamento de arquivos, poder de processamento, etc.
        *   **Tipos de Redes P2P:**
            *   **Não Estruturadas:** Conexões entre pares são formadas ad-hoc (ex: Gnutella). A busca por recursos pode envolver inundação de consultas (query flooding).
            *   **Estruturadas:** Os pares e/ou os recursos são organizados de forma específica (ex: usando Tabelas Hash Distribuídas - DHTs, como no BitTorrent) para permitir busca eficiente.
            *   **Híbridas:** Combinam elementos de P2P com algum grau de centralização (ex: um servidor central para descoberta de pares, mas a transferência de arquivos é P2P, como no Napster original).
        *   **Aplicações Comuns:** Compartilhamento de arquivos (BitTorrent, eMule), criptomoedas (Bitcoin, Ethereum usam redes P2P para propagar transações e blocos), telefonia via Internet (algumas implementações iniciais do Skype), streaming de vídeo P2P.
    *   **Relevância Forense:**
        *   **Investigação de Compartilhamento Ilegal de Arquivos:** Redes P2P são frequentemente usadas para distribuir material protegido por direitos autorais (músicas, filmes, software) ou conteúdo ilegal (pornografia infantil).
        *   **Identificação de Pares:** Rastrear endereços IP de pares envolvidos em atividades ilegais é um desafio comum. O perito pode analisar o tráfego de rede, logs de clientes P2P ou metadados de torrents.
        *   **Análise de Software P2P:** Engenharia reversa de clientes P2P para entender como eles descobrem pares, transferem dados e armazenam informações localmente.
        *   **Comunicação de Malware:** Alguns malwares usam redes P2P para comunicação de Comando e Controle (C2), tornando mais difícil derrubar a infraestrutura do botnet, pois não há um servidor C2 central.
        *   **Desafios:** A natureza descentralizada e muitas vezes anônima (ou pseudo-anônima) das redes P2P pode dificultar a investigação. O tráfego pode ser criptografado.

    ---
    #### 6.5.5 Comunicação sem fio: padrões 802.11, Bluetooth.
    *   **Explicação:** Tecnologias que permitem a comunicação de dados sem o uso de cabos, utilizando ondas de rádio.
        *   **Padrões IEEE 802.11 (Wi-Fi):**
            *   **Conceito:** Conjunto de padrões para Redes Locais Sem Fio (WLANs). Define as camadas Física e de Enlace de Dados (subcamada MAC) para comunicação sem fio.
            *   **Componentes:**
                *   **Estação (STA):** Dispositivo com capacidade Wi-Fi (notebook, smartphone).
                *   **Ponto de Acesso (AP - Access Point):** Dispositivo que conecta estações sem fio a uma rede cabeada (LAN) ou atua como um hub central para a comunicação entre estações sem fio.
                *   **BSS (Basic Service Set - Conjunto de Serviços Básico):** Um AP e as estações associadas a ele.
                *   **ESS (Extended Service Set - Conjunto de Serviços Estendido):** Múltiplos BSSs interconectados para formar uma única rede lógica.
                *   **SSID (Service Set Identifier - Identificador do Conjunto de Serviços):** Nome da rede Wi-Fi.
            *   **Principais Padrões (evolução):**
                *   `802.11b`: 2.4 GHz, até 11 Mbps.
                *   `802.11a`: 5 GHz, até 54 Mbps.
                *   `802.11g`: 2.4 GHz, até 54 Mbps (compatível com b).
                *   `802.11n` (Wi-Fi 4): 2.4 GHz e/ou 5 GHz, usa MIMO (Multiple-Input Multiple-Output - Múltiplas Entradas Múltiplas Saídas) para taxas de dados mais altas (ex: 150-600 Mbps).
                *   `802.11ac` (Wi-Fi 5): 5 GHz, usa MIMO mais avançado, canais mais largos, até Gbps.
                *   `802.11ax` (Wi-Fi 6/6E): 2.4 GHz, 5 GHz e 6 GHz (Wi-Fi 6E). Melhor eficiência em ambientes densos (OFDMA), taxas mais altas.
            *   **Segurança Wi-Fi:**
                *   **WEP (Wired Equivalent Privacy - Privacidade Equivalente à Cabeada):** Legado, inseguro, facilmente quebrável.
                *   **WPA (Wi-Fi Protected Access - Acesso Protegido Wi-Fi):** Melhoria sobre WEP, usava TKIP. Também vulnerável.
                *   **WPA2:** Usa AES (Advanced Encryption Standard - Padrão de Criptografia Avançado) com CCMP, considerado seguro se uma senha forte for usada.
                *   **WPA3:** Melhorias de segurança sobre WPA2, incluindo proteção contra ataques de dicionário offline e criptografia individualizada de dados em redes abertas.
        *   **Bluetooth:**
            *   **Conceito:** Padrão de comunicação sem fio de curto alcance para Redes de Área Pessoal (PANs), projetado para conectar dispositivos como telefones, fones de ouvido, teclados, mouses, alto-falantes.
            *   **Características:** Baixo consumo de energia (especialmente Bluetooth Low Energy - BLE). Opera na banda de 2.4 GHz (ISM). Usa saltos de frequência adaptativos (frequency hopping) para reduzir interferência.
            *   **Versões:** Evoluiu com diferentes versões (1.0, 2.0+EDR, 3.0+HS, 4.0 (BLE), 5.0 e mais recentes), aumentando a taxa de dados, alcance e introduzindo novas funcionalidades como BLE.
            *   **Pareamento (Pairing):** Processo de estabelecer uma conexão segura entre dois dispositivos Bluetooth.
    *   **Relevância Forense:**
        *   **Wi-Fi:**
            *   **Logs de Pontos de Acesso (AP):** Podem conter endereços MAC de dispositivos conectados, horários de conexão/desconexão, endereços IP atribuídos.
            *   **Logs de Servidores RADIUS/Autenticação:** Em redes corporativas, podem registrar tentativas de login e autenticação na rede Wi-Fi.
            *   **Análise de Tráfego Wi-Fi Capturado:** Se o tráfego foi capturado (requer placa de rede sem fio em modo monitor e, para tráfego criptografado, a chave de descriptografia), pode revelar comunicações, sites visitados, etc.
            *   **Artefatos em Dispositivos Cliente:** Listas de redes Wi-Fi conhecidas (SSIDs), senhas salvas (geralmente criptografadas), localizações geográficas associadas a SSIDs.
            *   **Ataques a Redes Wi-Fi:** Investigar ataques como `deauthentication attacks`, `evil twin APs`, quebra de senhas WPA/WPA2.
        *   **Bluetooth:**
            *   **Logs de Pareamento em Dispositivos:** SOs de computadores e smartphones podem registrar informações sobre dispositivos Bluetooth pareados (nome do dispositivo, endereço MAC Bluetooth).
            *   **Transferência de Arquivos:** Bluetooth pode ser usado para transferir arquivos entre dispositivos; a análise dos sistemas de arquivos pode revelar esses arquivos.
            *   **Comunicação de Proximidade:** O fato de dois dispositivos terem sido pareados via Bluetooth pode indicar proximidade física em um determinado momento.
            *   **Vulnerabilidades Bluetooth:** Ataques como `Bluejacking` (envio de mensagens não solicitadas) ou `Bluesnarfing` (acesso não autorizado a informações) são menos comuns hoje, mas o conhecimento é útil.

    ---
    #### 6.5.6 Redes móveis de dados (celular).
    *   **Explicação:** Tecnologias que permitem que dispositivos móveis (smartphones, tablets, modems USB) acessem a Internet e outros serviços de dados através da infraestrutura das operadoras de telefonia celular.
        *   **Gerações:**
            *   **2G (Segunda Geração):** Foco em voz digital, com dados limitados (GPRS, EDGE). (Ex: GSM).
            *   **3G (Terceira Geração):** Maior velocidade de dados, permitindo navegação na web e aplicativos multimídia. (Ex: UMTS, HSPA).
            *   **4G (Quarta Geração) / LTE (Long Term Evolution - Evolução de Longo Prazo):** Altas velocidades de dados, foco em IP para todos os serviços.
            *   **5G (Quinta Geração):** Velocidades ainda maiores, latência muito baixa, capacidade para conectar um grande número de dispositivos (IoT). Usa faixas de frequência mais altas (mmWave) e tecnologias como `massive MIMO` e `network slicing`.
        *   **Componentes da Rede Celular (simplificado):**
            *   **Dispositivo Móvel (UE - User Equipment):** Smartphone, tablet. Contém o cartão SIM/USIM.
            *   **Estação Rádio Base (BTS/NodeB/eNodeB/gNodeB):** Antena que se comunica com os dispositivos móveis em uma determinada área (célula).
            *   **Rede de Acesso (RAN - Radio Access Network):** Inclui as estações rádio base e controladores que gerenciam o acesso via rádio.
            *   **Rede Central (Core Network):** Gerencia autenticação, mobilidade, sessões de dados, interconexão com outras redes (como a Internet). (Ex: MSC, SGSN, GGSN em redes mais antigas; EPC em LTE; 5GC em 5G).
        *   **Identificadores:**
            *   **IMSI (International Mobile Subscriber Identity - Identidade Internacional do Assinante Móvel):** Identificador único do assinante, armazenado no SIM card.
            *   **IMEI (International Mobile Equipment Identity - Identidade Internacional de Equipamento Móvel):** Identificador único do aparelho celular.
            *   **MSISDN (Mobile Station International Subscriber Directory Number - Número Internacional do Assinante do Diretório da Estação Móvel):** O número de telefone do usuário.
    *   **Relevância Forense:**
        *   **Registros da Operadora (CDR - Call Detail Records / Registros de Detalhe de Chamada; IPDR - IP Detail Records / Registros de Detalhe de IP):** São cruciais. Podem fornecer:
            *   Histórico de chamadas e SMS (origem, destino, data/hora, duração).
            *   Localização aproximada do dispositivo móvel no momento das chamadas/SMS ou durante sessões de dados (com base na(s) célula(s) / ERB(s) a que estava conectado - triangulação pode ser possível).
            *   Detalhes de sessões de dados (endereços IP atribuídos ao dispositivo, volume de dados, timestamps de início/fim da sessão).
            *   **Esses registros são obtidos mediante ordem judicial.**
        *   **Análise do Dispositivo Móvel:**
            *   Logs de conexão de rede, configurações de APN (Access Point Name - Nome do Ponto de Acesso).
            *   Dados de aplicativos que usam a rede móvel.
            *   Informações do cartão SIM (IMSI, contatos).
        *   **Rastreamento de Dispositivos:** Usando IMEI para identificar um aparelho específico, ou IMSI/MSISDN para um assinante.
        *   **Compreensão de como os dados são transmitidos e onde os logs são gerados** na infraestrutura da operadora é importante, mesmo que o acesso direto a essa infraestrutura seja limitado.

    ---
    #### 6.5.7 Protocolos IP, TCP, UDP, SCTP, ARP, TLS, SSL, OSPF, BGP, DNS, DHCP, ICMP, FTP, SFTP, SSH, HTTP, HTTPS, SMTP, IMAP, POP3.

*   **Explicação:** Conjunto de regras e convenções que governam a comunicação de dados em redes. Cada protocolo tem uma função específica e opera em uma ou mais camadas do modelo OSI/TCP/IP.
    *   **Camada de Rede (Internet no TCP/IP):**
        *   **IP (Internet Protocol - Protocolo de Internet):** Principal protocolo da camada de rede. Responsável pelo endereçamento lógico (endereços IP) e roteamento de pacotes (datagramas) através da rede. Não garante entrega, ordem ou integridade (best-effort delivery). Versões: IPv4 (endereços de 32 bits), IPv6 (endereços de 128 bits).
            *   *Relevância Forense:* Cabeçalhos IP em pacotes capturados contêm endereços IP de origem e destino, que são fundamentais para rastrear comunicações.
        *   **ICMP (Internet Control Message Protocol - Protocolo de Mensagens de Controle da Internet):** Usado por dispositivos de rede para enviar mensagens de erro (ex: destino inacessível, tempo excedido) ou mensagens operacionais (ex: ping (echo request/reply), traceroute). Opera em conjunto com o IP.
            *   *Relevância Forense:* Pacotes ICMP podem indicar problemas de rede, tentativas de varredura (ping sweep) ou ataques (ex: Smurf attack, ping of death - legados). Traceroute usa ICMP para mapear rotas.
        *   **ARP (Address Resolution Protocol - Protocolo de Resolução de Endereços):** Em redes locais IPv4, mapeia endereços IP para endereços MAC físicos. Um host envia uma requisição ARP broadcast ("Quem tem o IP X?") e o host com esse IP responde com seu endereço MAC.
            *   *Relevância Forense:* Tabelas ARP em hosts e roteadores podem mostrar mapeamentos IP-MAC recentes. Ataques de ARP spoofing (envenenamento de cache ARP) podem desviar tráfego (Man-in-the-Middle).
    *   **Camada de Transporte:**
        *   **TCP (Transmission Control Protocol - Protocolo de Controle de Transmissão):** Fornece comunicação orientada à conexão, confiável e ordenada entre aplicações. Garante entrega de dados, controla fluxo e congestionamento. Usa um handshake de três vias (three-way handshake: SYN, SYN-ACK, ACK) para estabelecer conexões e um processo de finalização (FIN, ACK, FIN, ACK). Os dados são divididos em segmentos.
            *   *Relevância Forense:* A maioria do tráfego da Internet (web, e-mail, FTP) usa TCP. A análise de fluxos TCP permite reconstruir sessões, extrair arquivos, identificar problemas de conexão. Cabeçalhos TCP contêm portas de origem/destino, números de sequência/confirmação.
        *   **UDP (User Datagram Protocol - Protocolo de Datagrama do Usuário):** Fornece comunicação não orientada à conexão, não confiável (best-effort). Não garante entrega, ordem ou controle de fluxo. Simples e rápido. Os dados são enviados como datagramas.
            *   *Relevância Forense:* Usado por DNS, DHCP, SNMP, alguns jogos online, streaming de vídeo/áudio. A análise de tráfego UDP foca nos datagramas individuais.
        *   **SCTP (Stream Control Transmission Protocol - Protocolo de Transmissão de Controle de Fluxo):** Protocolo de transporte que combina características do TCP (confiabilidade, ordenação) e UDP (orientação a mensagens, múltiplos fluxos independentes dentro de uma associação). Usado em algumas redes de telecomunicações (ex: SS7 sobre IP) e aplicações que exigem múltiplos fluxos.
            *   *Relevância Forense:* Menos comum, mas pode ser encontrado em contextos específicos.
    *   **Camada de Aplicação (Segurança):**
        *   **SSL (Secure Sockets Layer - Camada de Soquetes Seguros) / TLS (Transport Layer Security - Segurança da Camada de Transporte):** Protocolos criptográficos que fornecem comunicação segura sobre uma rede de computadores. Operam entre a camada de Transporte e a camada de Aplicação (ou como parte da camada de Aplicação). Usam certificados digitais para autenticação e criptografia de chave pública/simétrica para confidencialidade e integridade dos dados. SSL é o predecessor do TLS e é considerado inseguro.
            *   *Relevância Forense:* Essencial para entender comunicações criptografadas (HTTPS, SMTPS, etc.). A análise de handshakes TLS pode revelar informações sobre os certificados usados, algoritmos de criptografia negociados. Se o tráfego TLS for descriptografado (ex: com acesso à chave privada do servidor ou através de ataques Man-in-the-Middle), o conteúdo pode ser analisado.
    *   **Protocolos de Roteamento (Camada de Rede/Internet):**
        *   **OSPF (Open Shortest Path First - Abrir o Caminho Mais Curto Primeiro):** Protocolo de roteamento de estado de link (link-state) interno (IGP - Interior Gateway Protocol). Cada roteador constrói um mapa da topologia da rede e calcula as melhores rotas.
            *   *Relevância Forense:* Em investigações de rede corporativa, a configuração e os logs do OSPF podem revelar a topologia da rede interna e como o tráfego é roteado.
        *   **BGP (Border Gateway Protocol - Protocolo de Gateway de Borda):** Protocolo de roteamento de vetor de caminho (path-vector) externo (EGP - Exterior Gateway Protocol). Usado para trocar informações de roteamento entre Sistemas Autônomos (ASs) na Internet.
            *   *Relevância Forense:* Ataques a BGP (sequestro de prefixos IP) podem desviar tráfego em larga escala na Internet. A análise de anúncios BGP pode ser relevante em investigações de incidentes de grande escala.
    *   **Protocolos da Camada de Aplicação:**
        *   **DNS (Domain Name System - Sistema de Nomes de Domínio):** Resolve nomes de domínio legíveis por humanos (ex: www.exemplo.com) para endereços IP numéricos, e vice-versa. Usa UDP (principalmente para consultas) e TCP (para transferências de zona). Porta 53.
            *   *Relevância Forense:* Logs de DNS (em servidores DNS ou em clientes) são cruciais para identificar quais sites um dispositivo acessou ou tentou acessar. Malware frequentemente usa DNS para encontrar seus servidores C2. Técnicas como `DNS tunneling` podem ser usadas para exfiltrar dados.
        *   **DHCP (Dynamic Host Configuration Protocol - Protocolo de Configuração Dinâmica de Host):** Atribui automaticamente endereços IP e outras configurações de rede (máscara de sub-rede, gateway padrão, servidores DNS) a dispositivos em uma rede. Usa UDP. Portas 67 (servidor), 68 (cliente).
            *   *Relevância Forense:* Logs de DHCP (em servidores DHCP) podem mostrar qual endereço IP foi atribuído a qual endereço MAC em um determinado momento, ajudando a correlacionar atividade de rede com um dispositivo físico.
        *   **FTP (File Transfer Protocol - Protocolo de Transferência de Arquivos):** Usado para transferir arquivos entre um cliente e um servidor. Usa TCP. Portas 20 (dados) e 21 (controle). Transmite senhas e dados em texto claro (inseguro).
            *   *Relevância Forense:* Análise de tráfego FTP pode revelar arquivos transferidos e credenciais. Logs de servidores FTP.
        *   **SFTP (SSH File Transfer Protocol ou Secure File Transfer Protocol):** Protocolo seguro para transferência de arquivos que roda sobre SSH. Criptografa tanto comandos quanto dados.
            *   *Relevância Forense:* Mais difícil de analisar o conteúdo do tráfego devido à criptografia, mas os logs do servidor SFTP (se disponíveis) podem mostrar atividades de transferência de arquivos.
        *   **SSH (Secure Shell - Shell Seguro):** Protocolo para login remoto seguro, transferência de arquivos e tunelamento de outros protocolos. Criptografa toda a comunicação. Usa TCP. Porta 22.
            *   *Relevância Forense:* Logs de autenticação SSH (ex: `/var/log/auth.log` ou `secure` no Linux) podem mostrar tentativas de login bem-sucedidas e falhas. O tráfego em si é criptografado.
        *   **HTTP (Hypertext Transfer Protocol - Protocolo de Transferência de Hipertexto):** Protocolo fundamental da World Wide Web para solicitar e transmitir páginas web e outros recursos. Usa TCP. Porta 80. Comunicação em texto claro.
            *   *Relevância Forense:* Análise de tráfego HTTP (logs de proxy, logs de servidor web, pacotes capturados) pode revelar sites visitados, arquivos baixados, dados de formulários submetidos (incluindo senhas, se não HTTPS).
        *   **HTTPS (HTTP Secure - HTTP Seguro):** HTTP sobre SSL/TLS. Criptografa a comunicação HTTP. Usa TCP. Porta 443.
            *   *Relevância Forense:* O conteúdo do tráfego é criptografado. A análise foca nos metadados da conexão TLS (certificados, IPs, nomes de domínio via SNI - Server Name Indication), e nos logs do servidor web (que ainda registram as requisições, mesmo que o conteúdo detalhado não seja visível no tráfego).
        *   **SMTP (Simple Mail Transfer Protocol - Protocolo de Transferência de Correio Simples):** Usado para enviar e-mails entre servidores de e-mail. Usa TCP. Porta 25.
            *   *Relevância Forense:* Cabeçalhos de e-mail contêm informações de servidores SMTP que retransmitiram a mensagem. Logs de servidores SMTP são cruciais para rastrear a origem e o trânsito de e-mails.
        *   **IMAP (Internet Message Access Protocol - Protocolo de Acesso a Mensagens da Internet):** Usado por clientes de e-mail para acessar e gerenciar e-mails armazenados em um servidor de e-mail. Permite que as mensagens permaneçam no servidor. Usa TCP. Porta 143 (IMAP) ou 993 (IMAPS - IMAP sobre SSL/TLS).
            *   *Relevância Forense:* Análise de tráfego IMAP (se não criptografado) ou logs do servidor IMAP podem revelar e-mails acessados, movidos, deletados.
        *   **POP3 (Post Office Protocol version 3 - Protocolo de Correio versão 3):** Usado por clientes de e-mail para baixar e-mails de um servidor para o dispositivo local. Geralmente remove as mensagens do servidor após o download. Usa TCP. Porta 110 (POP3) ou 995 (POP3S - POP3 sobre SSL/TLS).
            *   *Relevância Forense:* Similar ao IMAP, mas com foco no download de mensagens.

---

## 6.6 Redes TOR.

*   **Explicação:**
    *   **TOR (The Onion Router - O Roteador Cebola):** É um software livre e uma rede aberta que ajuda a defender contra a análise de tráfego, uma forma de vigilância de rede que ameaça a liberdade pessoal e a privacidade, atividades e relacionamentos confidenciais de negócios e a segurança do estado.
    *   **Funcionamento (Roteamento em Camadas - Onion Routing):**
        1.  O cliente TOR obtém uma lista de nós TOR (roteadores cebola) de um servidor de diretório.
        2.  O cliente escolhe um caminho aleatório através de vários nós TOR (geralmente 3: nó de entrada/guarda, nó do meio, nó de saída).
        3.  Os dados são criptografados em múltiplas camadas, como as camadas de uma cebola. Cada nó no caminho só consegue descriptografar uma camada para saber qual é o próximo nó no circuito. Nenhum nó intermediário conhece simultaneamente a origem e o destino final dos dados (exceto em certas condições e ataques).
        4.  O nó de saída (exit node) envia o tráfego descriptografado para o destino final na Internet pública. Para o servidor de destino, o tráfego parece originar-se do nó de saída.
    *   **Objetivos:** Prover anonimato (ou pseudo-anonimato) para os usuários, proteger contra a análise de tráfego e censura na Internet.
    *   **Serviços Ocultos (Onion Services):** Permitem que sites e outros serviços sejam hospedados de forma anônima dentro da rede TOR, usando endereços especiais `.onion`. O acesso a esses serviços também é feito através da rede TOR, e a localização do servidor e do cliente permanecem ocultas um do outro.
*   **Relevância Forense:**
    *   **Uso por Criminosos:** A rede TOR é frequentemente usada por criminosos para atividades ilícitas, como acesso à dark web (para mercados de drogas, armas, dados roubados, pornografia infantil), comunicação anônima, e para ocultar a origem de ataques cibernéticos ou o controle de botnets.
    *   **Desafios na Investigação:**
        *   **Anonimato:** Rastrear a origem real do tráfego TOR é extremamente difícil, pois o design da rede visa impedir isso.
        *   **Nós de Saída (Exit Nodes):** O tráfego malicioso que emerge de um nó de saída TOR terá o IP desse nó como origem aparente, o que pode levar a investigações infrutíferas contra o operador do nó de saída (que geralmente é um voluntário e não o autor da atividade maliciosa).
    *   **Análise de Dispositivos:**
        *   Identificar a presença do software cliente TOR em um dispositivo suspeito.
        *   Analisar o histórico de navegação do navegador TOR (Tor Browser, que é baseado no Firefox ESR) ou outros artefatos locais que possam indicar o uso da rede TOR ou acesso a serviços `.onion`.
        *   Arquivos de configuração do TOR, caches de descritores de nós.
    *   **Análise de Tráfego de Rede:**
        *   Identificar tráfego TOR (mesmo que criptografado) entrando ou saindo de uma rede local pode indicar que um dispositivo interno está se conectando à rede TOR. O tráfego TOR usa portas TCP específicas (comumente 9001, 9030, mas pode usar 443).
        *   Bloquear o acesso à rede TOR é uma medida comum em redes corporativas, mas pode ser contornado usando pontes (bridges) TOR.
    *   **Investigação de Serviços Ocultos:** Identificar e localizar servidores que hospedam serviços `.onion` é uma tarefa complexa que pode envolver técnicas avançadas de investigação, exploração de vulnerabilidades no serviço oculto, ou análise de metadados.

---

## 6.7 Computação em nuvem.

*   **Explicação:** Modelo que permite acesso ubíquo, conveniente e sob demanda, via rede, a um conjunto compartilhado de recursos computacionais configuráveis (ex: redes, servidores, armazenamento, aplicativos e serviços) que podem ser rapidamente provisionados e liberados com mínimo esforço de gerenciamento ou interação do provedor de serviços. (Definição do NIST - National Institute of Standards and Technology - Instituto Nacional de Padrões e Tecnologia).
    *   **Características Essenciais (NIST):**
        *   **Autoatendimento sob Demanda (On-demand self-service):** O usuário pode provisionar recursos automaticamente, conforme necessário, sem interação humana com o provedor.
        *   **Amplo Acesso à Rede (Broad network access):** Os recursos estão disponíveis através da rede e acessíveis por mecanismos padrão (ex: navegadores, aplicativos móveis).
        *   **Pool de Recursos (Resource pooling):** Os recursos do provedor são agrupados para servir múltiplos consumidores usando um modelo multi-inquilino (multi-tenant), com diferentes recursos físicos e virtuais dinamicamente atribuídos e reatribuídos de acordo com a demanda. Há um senso de independência de localização (o cliente geralmente não sabe ou controla a localização exata dos recursos).
        *   **Elasticidade Rápida (Rapid elasticity):** Os recursos podem ser elasticamente provisionados e liberados, em alguns casos automaticamente, para escalar rapidamente para cima ou para baixo de acordo com a demanda.
        *   **Serviço Mensurado (Measured service):** O uso de recursos é monitorado, controlado e relatado, fornecendo transparência tanto para o provedor quanto para o consumidor do serviço utilizado (ex: pagamento por uso).
    *   **Modelos de Serviço:**
        *   **SaaS (Software as a Service - Software como Serviço):** O consumidor usa os aplicativos do provedor rodando na infraestrutura da nuvem. Os aplicativos são acessíveis a partir de vários dispositivos clientes através de uma interface de cliente leve, como um navegador web (ex: e-mail baseado na web, CRM online, Google Workspace, Microsoft 365). O consumidor não gerencia a infraestrutura da nuvem subjacente.
        *   **PaaS (Platform as a Service - Plataforma como Serviço):** O consumidor implanta na infraestrutura da nuvem aplicativos criados ou adquiridos pelo consumidor, usando linguagens de programação, bibliotecas, serviços e ferramentas suportadas pelo provedor. O consumidor não gerencia a infraestrutura da nuvem subjacente (rede, servidores, SO, armazenamento), mas tem controle sobre os aplicativos implantados e, possivelmente, configurações do ambiente de hospedagem de aplicativos. (Ex: AWS Elastic Beanstalk, Google App Engine, Heroku).
        *   **IaaS (Infrastructure as a Service - Infraestrutura como Serviço):** O consumidor provisiona processamento, armazenamento, redes e outros recursos computacionais fundamentais onde o consumidor pode implantar e executar software arbitrário, que pode incluir sistemas operacionais e aplicativos. O consumidor não gerencia a infraestrutura da nuvem subjacente, mas tem controle sobre os sistemas operacionais, armazenamento e aplicativos implantados; e possivelmente controle limitado de componentes de rede selecionados (ex: firewalls de host). (Ex: Amazon Web Services (AWS) EC2, Microsoft Azure VMs, Google Compute Engine).
    *   **Modelos de Implantação:**
        *   **Nuvem Privada (Private Cloud):** A infraestrutura da nuvem é provisionada para uso exclusivo por uma única organização composta por múltiplos consumidores (ex: unidades de negócio). Pode ser possuída, gerenciada e operada pela organização, por um terceiro, ou alguma combinação deles, e pode existir no local (on-premises) ou fora dele.
        *   **Nuvem Comunitária (Community Cloud):** A infraestrutura da nuvem é provisionada para uso exclusivo por uma comunidade específica de consumidores de organizações que compartilham preocupações (ex: missão, requisitos de segurança, política e considerações de conformidade).
        *   **Nuvem Pública (Public Cloud):** A infraestrutura da nuvem é provisionada para uso aberto pelo público em geral. Pertence, é gerenciada e operada por uma organização empresarial, acadêmica ou governamental, ou alguma combinação delas. Existe nas instalações do provedor da nuvem.
        *   **Nuvem Híbrida (Hybrid Cloud):** A infraestrutura da nuvem é uma composição de duas ou mais infraestruturas de nuvem distintas (privada, comunitária ou pública) que permanecem entidades únicas, mas são unidas por tecnologia padronizada ou proprietária que permite a portabilidade de dados e aplicativos (ex: bursting de nuvem para balanceamento de carga entre nuvens).
*   **Relevância Forense:**
    *   **Jurisdição e Localização dos Dados:** Os dados na nuvem podem estar fisicamente localizados em diferentes países, levantando questões complexas de jurisdição, leis de privacidade aplicáveis e acesso legal aos dados.
    *   **Coleta de Evidências:**
        *   A aquisição de dados da nuvem geralmente envolve a cooperação com o Provedor de Serviços em Nuvem (CSP - Cloud Service Provider), muitas vezes através de ordens judiciais.
        *   O perito pode precisar analisar dados de múltiplas fontes: máquinas virtuais, armazenamento de objetos (S3, Azure Blob), bancos de dados como serviço, logs de aplicativos, logs do provedor de nuvem (ex: AWS CloudTrail, Azure Monitor logs).
        *   Ferramentas específicas para forense em nuvem estão surgindo, mas a abordagem muitas vezes requer o uso das APIs e ferramentas de gerenciamento do próprio CSP.
    *   **Logs na Nuvem:**
        *   **Logs de Infraestrutura (Provedor):** Registram eventos relacionados à infraestrutura da nuvem gerenciada pelo provedor (ex: logins no console de gerenciamento da nuvem, criação/exclusão de VMs, alterações de configuração de rede).
        *   **Logs de Aplicação e SO (Cliente):** Logs gerados pelos sistemas e aplicativos do cliente rodando na nuvem. A responsabilidade pela coleta e preservação desses logs pode ser do cliente.
        *   A correlação de logs de diferentes fontes é essencial.
    *   **Modelo de Responsabilidade Compartilhada (Shared Responsibility Model):** É crucial entender quais aspectos da segurança e do gerenciamento de dados são de responsabilidade do CSP e quais são do cliente, pois isso impacta onde as evidências podem ser encontradas e quem é responsável por sua preservação.
        *   *IaaS:* O cliente tem mais responsabilidade (SO, aplicativos, dados).
        *   *PaaS:* Responsabilidade compartilhada (o provedor gerencia a plataforma, o cliente os aplicativos e dados).
        *   *SaaS:* O provedor tem a maior parte da responsabilidade.
    *   **Análise de Snapshots e Backups:** Snapshots de VMs e backups de armazenamento na nuvem podem ser fontes valiosas de dados históricos.
    *   **Desafios:** Volatilidade (recursos podem ser rapidamente provisionados e desprovisionados), multilocação (dados de múltiplos clientes no mesmo hardware físico, exigindo isolamento e privacidade), complexidade da cadeia de custódia, e a dependência do CSP para acesso a certas informações.
    *   **Ataques em Ambientes de Nuvem:** Exploração de configurações incorretas (ex: buckets de armazenamento abertos), roubo de credenciais de acesso à nuvem, ataques a APIs da nuvem, malware projetado para ambientes de nuvem.

---
