# Detalhamento dos Subtópicos de "8. Segurança de redes de computadores" (Edital Perito Criminal Federal – Área 3)

Este tópico aborda as tecnologias, protocolos, técnicas e frameworks utilizados para proteger redes de computadores contra ameaças, detectar e responder a incidentes de segurança, e analisar ataques. Para um perito em informática forense, este conhecimento é crucial para investigar incidentes de segurança de rede, analisar logs de dispositivos de segurança, entender como os ataques ocorrem e como as defesas funcionam (ou falham).

---

## 8.1 Firewall, sistemas de prevenção e detecção de intrusão (IPS e IDS), antivírus, EDR, XDR, SOAR, SIEM, NAT, proxy, VPN.

*   **Explicação:** Conjunto de tecnologias e sistemas de segurança usados para proteger redes e endpoints.
    *   **Firewall (Parede de Fogo):**
        *   **Conceito:** Dispositivo de segurança de rede (hardware ou software) que monitora e controla o tráfego de rede de entrada e saída com base em um conjunto predefinido de regras de segurança. Atua como uma barreira entre uma rede interna confiável e redes externas não confiáveis (como a Internet).
        *   **Tipos/Funcionalidades:**
            *   **Filtragem de Pacotes (Packet Filtering):** Examina cabeçalhos de pacotes (IP de origem/destino, porta de origem/destino, protocolo) e permite ou bloqueia com base em regras.
            *   **Inspeção de Estado (Stateful Inspection):** Mantém o estado das conexões ativas e toma decisões de filtragem com base no contexto da conexão, além das regras.
            *   **Gateway de Nível de Aplicação (Application-Level Gateway ou Proxy Firewall):** Atua como intermediário para aplicações específicas (ex: HTTP, FTP), inspecionando o conteúdo do tráfego.
            *   **Firewall de Próxima Geração (NGFW - Next-Generation Firewall):** Combina funcionalidades tradicionais com inspeção profunda de pacotes (DPI - Deep Packet Inspection), prevenção de intrusão (IPS), controle de aplicações, etc.
        *   **Relevância Forense:** Logs de firewall são cruciais para identificar tráfego permitido/bloqueado, tentativas de conexão, origem/destino de ataques, e para reconstruir a linha do tempo de um incidente de rede.
    *   **Sistemas de Detecção de Intrusão (IDS - Intrusion Detection System):**
        *   **Conceito:** Dispositivo ou software que monitora o tráfego de rede ou atividades em um sistema em busca de atividades maliciosas ou violações de políticas. Seu objetivo principal é **detectar** e **alertar**.
        *   **Tipos:**
            *   **NIDS (Network IDS - IDS de Rede):** Monitora o tráfego em um segmento de rede.
            *   **HIDS (Host-based IDS - IDS Baseado em Host):** Monitora a atividade em um host individual (ex: logs do sistema, acesso a arquivos).
        *   **Métodos de Detecção:**
            *   **Baseado em Assinaturas (Signature-based):** Procura por padrões conhecidos de ataques (assinaturas).
            *   **Baseado em Anomalias (Anomaly-based):** Estabelece uma linha de base do comportamento normal e alerta sobre desvios.
            *   **Baseado em Políticas (Policy-based):** Alerta sobre atividades que violam políticas de segurança definidas.
        *   **Relevância Forense:** Logs de IDS fornecem alertas sobre possíveis intrusões, tipos de ataques detectados, IPs de origem, e podem ajudar a identificar o início de um comprometimento.
    *   **Sistemas de Prevenção de Intrusão (IPS - Intrusion Prevention System):**
        *   **Conceito:** Similar ao IDS, mas além de detectar, o IPS pode **bloquear ou prevenir ativamente** as ameaças detectadas em tempo real.
        *   **Posicionamento:** Geralmente posicionado "em linha" (inline) no fluxo de tráfego para poder interceptar e bloquear.
        *   **Relevância Forense:** Logs de IPS mostram quais ameaças foram detectadas e bloqueadas, ajudando a entender os vetores de ataque e a eficácia das defesas.
    *   **Antivírus (AV):**
        *   **Conceito:** Software projetado para detectar, prevenir e remover software malicioso (malware), como vírus, worms, trojans, spyware.
        *   **Métodos de Detecção:** Baseado em assinaturas (arquivos de definição de vírus), heurística (análise de comportamento suspeito), análise em nuvem.
        *   **Relevância Forense:** Logs de antivírus em hosts podem indicar detecções de malware, arquivos em quarentena, e o tipo de ameaça. A falha do AV em detectar um malware também é uma informação relevante.
    *   **EDR (Endpoint Detection and Response - Detecção e Resposta em Endpoints):**
        *   **Conceito:** Solução de segurança que monitora continuamente os endpoints (desktops, laptops, servidores) para detectar atividades suspeitas e ameaças avançadas (como fileless malware, APTs), e fornece capacidades de investigação e resposta a incidentes nesses endpoints. Coleta dados detalhados de telemetria do endpoint.
        *   **Funcionalidades:** Detecção baseada em comportamento/anomalias, análise de processos, monitoramento de rede do endpoint, gravação de atividades, busca por ameaças (threat hunting), isolamento de endpoints, remediação.
        *   **Relevância Forense:** Logs e dados de telemetria do EDR são extremamente valiosos para investigações forenses em endpoints, fornecendo uma visão granular das atividades, processos executados, conexões de rede, e como um ataque se desenrolou no host.
    *   **XDR (Extended Detection and Response - Detecção e Resposta Estendida):**
        *   **Conceito:** Evolução do EDR, que integra e correlaciona dados de segurança de múltiplas fontes além dos endpoints, como rede (NIDS/NIPS), nuvem, e-mail e identidade. Visa fornecer uma visão mais holística e unificada das ameaças.
        *   **Relevância Forense:** Oferece uma capacidade de investigação mais ampla, permitindo correlacionar eventos de diferentes camadas de segurança para rastrear ataques complexos.
    *   **SOAR (Security Orchestration, Automation and Response - Orquestração, Automação e Resposta de Segurança):**
        *   **Conceito:** Plataforma que permite às equipes de segurança definir, padronizar e automatizar fluxos de trabalho de resposta a incidentes (playbooks). Integra-se com outras ferramentas de segurança (SIEM, EDR, firewalls) para orquestrar ações de resposta.
        *   **Relevância Forense:** Logs de plataformas SOAR podem mostrar como um incidente foi tratado, quais ações foram tomadas (automática ou manualmente), e os tempos de resposta. Pode ajudar a entender a cronologia da resposta ao incidente.
    *   **SIEM (Security Information and Event Management - Gerenciamento de Informações e Eventos de Segurança):**
        *   **Conceito:** Sistema que coleta, agrega, analisa e correlaciona dados de logs de diversas fontes de segurança (firewalls, IDS/IPS, servidores, endpoints, aplicações) em tempo real para fornecer alertas, relatórios e dashboards sobre a postura de segurança e possíveis incidentes.
        *   **Funcionalidades:** Coleta de logs, normalização, correlação de eventos, geração de alertas, armazenamento de logs de longo prazo, busca e análise de logs.
        *   **Relevância Forense:** O SIEM é uma fonte centralizada de logs de segurança, crucial para investigações. Permite buscar por eventos específicos, correlacionar atividades em diferentes sistemas e reconstruir a linha do tempo de um ataque.
    *   **NAT (Network Address Translation - Tradução de Endereços de Rede):**
        *   **Conceito:** Técnica usada em roteadores ou firewalls para modificar informações de endereço de rede (IP e/ou porta) nos cabeçalhos de pacotes enquanto eles transitam por um dispositivo de roteamento. Permite que múltiplos dispositivos em uma rede privada (com endereços IP privados) compartilhem um único endereço IP público para acessar a Internet.
        *   **Tipos:** NAT Estático (mapeamento um-para-um), NAT Dinâmico (mapeia IPs privados para um pool de IPs públicos), PAT (Port Address Translation ou NAT Overload - mapeia múltiplos IPs privados para um único IP público usando diferentes números de porta).
        *   **Relevância Forense:** Logs de NAT (geralmente no firewall ou roteador) são essenciais para mapear um endereço IP privado e porta (usados internamente) para um endereço IP público e porta (vistos na Internet) em um determinado momento. Isso é crucial para identificar qual dispositivo interno foi responsável por uma comunicação externa específica.
    *   **Proxy (Servidor Proxy):**
        *   **Conceito:** Servidor intermediário que atua como um gateway entre um usuário final (ou rede local) e a Internet (ou outra rede). As requisições dos clientes são enviadas ao proxy, que então as encaminha ao servidor de destino. As respostas do servidor de destino retornam ao proxy, que as repassa ao cliente.
        *   **Tipos/Funcionalidades:** Proxy web (para tráfego HTTP/HTTPS), proxy reverso (protege servidores web), proxy anônimo (oculta IP do cliente), proxy transparente. Pode realizar caching, filtragem de conteúdo, autenticação.
        *   **Relevância Forense:** Logs de proxy (especialmente proxy web) são uma fonte rica de informações sobre a atividade de navegação na web dos usuários, incluindo sites visitados, URLs, timestamps, e às vezes, dados transmitidos.
    *   **VPN (Virtual Private Network - Rede Privada Virtual):**
        *   **Conceito:** Cria um "túnel" seguro e criptografado sobre uma rede pública (como a Internet) para conectar usuários remotos ou escritórios remotos a uma rede privada.
        *   **Protocolos Comuns:** IPsec, OpenVPN, L2TP/IPsec, SSL/TLS VPNs.
        *   **Relevância Forense:** Logs de VPN (no servidor VPN) podem mostrar quem se conectou, quando, de qual endereço IP de origem, e qual endereço IP foi atribuído ao cliente na rede VPN. O tráfego dentro do túnel VPN é criptografado, dificultando a análise direta do conteúdo, mas os metadados da conexão e os logs do servidor são importantes.

---

## 8.2 Protocolos IPSEC, DNSSEC, DMARC, DKIM, SPF.

*   **Explicação:** Protocolos de segurança projetados para adicionar camadas de proteção a protocolos de rede existentes ou para validar a autenticidade de comunicações.
    *   **IPsec (Internet Protocol Security - Segurança do Protocolo de Internet):**
        *   **Conceito:** Conjunto de protocolos para proteger as comunicações IP na camada de rede, fornecendo confidencialidade (criptografia), integridade (verificação de que os dados não foram alterados) e autenticidade (verificação da origem dos dados) para pacotes IP. Frequentemente usado para criar VPNs.
        *   **Componentes Principais:**
            *   **AH (Authentication Header - Cabeçalho de Autenticação):** Fornece integridade e autenticidade dos dados, mas não confidencialidade.
            *   **ESP (Encapsulating Security Payload - Carga de Segurança Encapsulada):** Fornece confidencialidade (criptografia) e, opcionalmente, integridade e autenticidade.
            *   **IKE (Internet Key Exchange - Troca de Chaves da Internet):** Protocolo usado para negociar as associações de segurança (SAs - Security Associations) e as chaves criptográficas entre os pares IPsec.
        *   **Modos de Operação:** Modo Transporte (protege apenas o payload do pacote IP original) e Modo Túnel (protege todo o pacote IP original, encapsulando-o em um novo pacote IP).
        *   **Relevância Forense:** O tráfego IPsec é criptografado, dificultando a análise do conteúdo. No entanto, a análise dos pacotes IKE (negociação de chaves) e dos cabeçalhos ESP/AH (se não totalmente criptografados) pode revelar informações sobre os endpoints da comunicação e os parâmetros de segurança usados. Logs de dispositivos que implementam IPsec (firewalls, roteadores VPN) são cruciais.
    *   **DNSSEC (Domain Name System Security Extensions - Extensões de Segurança do Sistema de Nomes de Domínio):**
        *   **Conceito:** Conjunto de especificações para adicionar segurança ao protocolo DNS, permitindo que as respostas DNS sejam autenticadas criptograficamente. Visa proteger contra ataques de envenenamento de cache DNS (DNS cache poisoning) e falsificação de respostas DNS (DNS spoofing).
        *   **Como Funciona:** Usa assinaturas digitais para verificar a autenticidade e integridade dos dados DNS. Zonas DNS são assinadas com chaves privadas, e as chaves públicas correspondentes são publicadas como registros DNS (DNSKEY). Uma cadeia de confiança é estabelecida a partir da zona raiz do DNS.
        *   **Registros DNS Adicionais:** RRSIG (assinatura do conjunto de registros), DNSKEY (chave pública), DS (Delegation Signer - para ligar zonas pai e filho), NSEC/NSEC3 (para autenticar a negação de existência de um registro).
        *   **Relevância Forense:** Em investigações de ataques que envolvem manipulação de DNS, verificar se o DNSSEC estava habilitado e funcionando corretamente para os domínios envolvidos pode ser importante. A presença de registros DNSSEC em capturas de tráfego ou logs de servidor DNS pode ser analisada.
    *   **SPF (Sender Policy Framework - Estrutura de Política do Remetente):**
        *   **Conceito:** Sistema de validação de e-mail projetado para detectar e bloquear a falsificação de e-mail (e-mail spoofing). Permite que o proprietário de um domínio especifique quais servidores de e-mail (endereços IP ou nomes de host) estão autorizados a enviar e-mails em nome desse domínio.
        *   **Como Funciona:** O proprietário do domínio publica um registro SPF (um registro TXT especial) no DNS. Quando um servidor de e-mail recebe uma mensagem, ele verifica o registro SPF do domínio do remetente (no cabeçalho "MAIL FROM" ou "HELO") para ver se o IP do servidor de envio está autorizado.
        *   **Resultados da Verificação:** Pass, Fail, SoftFail, Neutral.
        *   **Relevância Forense:** Na análise de e-mails de phishing ou spam, verificar os resultados da validação SPF (geralmente presentes nos cabeçalhos do e-mail, como `Received-SPF`) pode ajudar a determinar se o e-mail é potencialmente falsificado ou se originou de um servidor não autorizado.
    *   **DKIM (DomainKeys Identified Mail - Correio Identificado por Chaves de Domínio):**
        *   **Conceito:** Método de autenticação de e-mail que permite que uma organização assuma a responsabilidade por uma mensagem de uma forma que possa ser validada pelo destinatário. Usa criptografia de chave pública para assinar digitalmente partes do e-mail (cabeçalhos e corpo).
        *   **Como Funciona:** O servidor de envio adiciona uma assinatura DKIM ao cabeçalho do e-mail. O seletor e o domínio da assinatura são usados pelo servidor receptor para consultar a chave pública DKIM no DNS do domínio do remetente (em um registro TXT). Se a assinatura for válida, indica que o e-mail não foi alterado em trânsito e que foi autorizado pelo proprietário do domínio.
        *   **Relevância Forense:** A presença e validade de uma assinatura DKIM (no cabeçalho `DKIM-Signature`) em um e-mail pode ajudar a verificar sua autenticidade e integridade (pelo menos das partes assinadas). Uma falha na validação DKIM pode indicar falsificação ou adulteração.
    *   **DMARC (Domain-based Message Authentication, Reporting and Conformance - Autenticação de Mensagens Baseada em Domínio, Relatórios e Conformidade):**
        *   **Conceito:** Política de autenticação de e-mail construída sobre SPF e DKIM. Permite que o proprietário de um domínio especifique qual política deve ser aplicada pelos servidores de e-mail receptores quando uma mensagem falha nas verificações SPF e/ou DKIM (ex: nenhuma ação, quarentena, rejeição). Também fornece um mecanismo para que os receptores enviem relatórios de volta ao proprietário do domínio sobre a atividade de e-mail.
        *   **Como Funciona:** O proprietário do domínio publica um registro DMARC (um registro TXT especial no DNS, ex: `_dmarc.example.com`). O registro DMARC especifica a política (p=none, p=quarantine, p=reject) e os endereços para envio de relatórios agregados (RUA) e forenses/de falha (RUF).
        *   **Alinhamento de Identificadores:** DMARC requer que o domínio no cabeçalho "From:" (visível ao usuário) esteja alinhado com o domínio validado por SPF e/ou DKIM.
        *   **Relevância Forense:** Registros DMARC e os relatórios gerados podem ser úteis para organizações que investigam o uso indevido de seus domínios em campanhas de phishing ou spam. Para o perito analisando um e-mail recebido, os resultados da verificação DMARC (geralmente no cabeçalho `Authentication-Results`) são importantes para avaliar a autenticidade.

---

## 8.3 Monitoramento e análise de tráfego: sniffers, traffic shaping.

*   **Explicação:**
    *   **Monitoramento e Análise de Tráfego:** Processo de capturar, inspecionar e analisar o tráfego de dados que flui por uma rede para entender o que está acontecendo, detectar problemas, identificar atividades suspeitas ou maliciosas, e coletar evidências.
    *   **Sniffers (Analisadores de Protocolo ou Farejadores de Pacotes):**
        *   **Conceito:** Ferramentas de software ou hardware que interceptam e registram (capturam) pacotes de dados que trafegam por uma interface de rede. Permitem que o tráfego seja visualizado em detalhes, incluindo cabeçalhos de protocolo e, em alguns casos, o conteúdo dos dados.
        *   **Funcionamento:** Uma placa de rede precisa estar em "modo promíscuo" para capturar todo o tráfego em um segmento de rede compartilhado (com hub) ou o tráfego destinado/originado dela. Em redes comutadas (switched), técnicas como port mirroring (SPAN), network taps ou ARP spoofing são necessárias para capturar tráfego de outros hosts.
        *   **Ferramentas Comuns:** Wireshark (GUI, o mais popular), tcpdump (linha de comando, poderoso), ngrep.
        *   **Relevância Forense:** Essenciais para investigações de rede. Permitem:
            *   Reconstruir sessões de comunicação.
            *   Identificar protocolos, endereços IP/MAC, portas usadas.
            *   Extrair arquivos transferidos (se não criptografados).
            *   Analisar o payload de pacotes em busca de dados sensíveis, comandos maliciosos, ou conteúdo de exploração de vulnerabilidades.
            *   Detectar varreduras de rede, ataques DoS, ou comunicação de malware com servidores C2.
    *   **Traffic Shaping (Modelagem de Tráfego):**
        *   **Conceito:** Técnica de gerenciamento de largura de banda que atrasa certos tipos de pacotes para otimizar o desempenho da rede, garantir Qualidade de Serviço (QoS) para aplicações críticas, ou para impor limites de taxa de dados. Não é primariamente uma ferramenta de segurança, mas de gerenciamento de rede.
        *   **Como Funciona:** Os pacotes são enfileirados e sua transmissão é agendada ou limitada com base em políticas (ex: priorizar tráfego VoIP sobre downloads de arquivos grandes).
        *   **Relevância Forense:**
            *   **Impacto na Análise:** Se o traffic shaping estiver ativo, ele pode alterar os padrões de temporização do tráfego, o que pode ser relevante ao analisar a latência ou a sequência de eventos.
            *   **Logs de Dispositivos de Shaping:** Dispositivos que realizam traffic shaping podem gerar logs sobre o tráfego classificado e as ações tomadas, o que pode, em alguns casos, fornecer informações sobre os tipos de tráfego presentes na rede.
            *   **Uso Malicioso (Indireto):** Em cenários muito específicos, um atacante interno com controle sobre dispositivos de shaping poderia, teoricamente, usá-los para degradar seletivamente o desempenho de serviços de segurança ou de monitoramento, embora isso seja incomum.

---

## 8.4 Segurança de redes sem fio: EAP, WEP, WPA, WPA2, WPA3, autenticação baseada em contexto, protocolo 802.1X.

*   **Explicação:** Mecanismos e protocolos para proteger redes sem fio (principalmente Wi-Fi) contra acesso não autorizado e para garantir a confidencialidade e integridade dos dados transmitidos.
    *   **WEP (Wired Equivalent Privacy - Privacidade Equivalente à Cabeada):**
        *   **Conceito:** Protocolo de segurança antigo para redes Wi-Fi (802.11). Usa criptografia RC4 com chaves estáticas (de 64 ou 128 bits, mas com um vetor de inicialização (IV) de 24 bits, tornando a chave efetiva menor e mais fraca).
        *   **Status:** Totalmente inseguro e quebrado. Vulnerabilidades conhecidas permitem que as chaves WEP sejam descobertas em minutos. **Não deve ser usado.**
    *   **WPA (Wi-Fi Protected Access - Acesso Protegido Wi-Fi):**
        *   **Conceito:** Padrão intermediário criado para substituir o WEP, oferecendo melhor segurança.
        *   **Criptografia:** Usa TKIP (Temporal Key Integrity Protocol - Protocolo de Integridade de Chave Temporal), que também é baseado em RC4, mas com melhorias como chaves por pacote e um Message Integrity Check (MIC - Verificação de Integridade de Mensagem) chamado Michael.
        *   **Status:** Também considerado inseguro e vulnerável a ataques. **Deve ser evitado.**
    *   **WPA2 (Wi-Fi Protected Access II):**
        *   **Conceito:** Padrão de segurança mais robusto que sucedeu o WPA. Requer hardware Wi-Fi mais novo na época de seu lançamento.
        *   **Criptografia:** Implementa o padrão de criptografia AES (Advanced Encryption Standard - Padrão de Criptografia Avançado) no modo CCMP (Counter Mode Cipher Block Chaining Message Authentication Code Protocol - Protocolo de Código de Autenticação de Mensagem com Encadeamento de Blocos de Cifra em Modo Contador). Considerado forte.
        *   **Modos:**
            *   **WPA2-Personal (ou WPA2-PSK - Pre-Shared Key):** Usa uma senha (frase secreta) compartilhada entre o AP e os clientes. Vulnerável a ataques de dicionário ou força bruta se a senha for fraca.
            *   **WPA2-Enterprise:** Usa autenticação 802.1X com um servidor RADIUS (ver abaixo), fornecendo autenticação individual para cada usuário. Mais seguro para ambientes corporativos.
    *   **WPA3 (Wi-Fi Protected Access III):**
        *   **Conceito:** Sucessor do WPA2, com melhorias significativas de segurança.
        *   **Melhorias:**
            *   **Proteção contra Ataques de Dicionário Offline:** Usa SAE (Simultaneous Authentication of Equals - Autenticação Simultânea de Iguais), substituindo o PSK, tornando ataques de adivinhação de senha muito mais difíceis.
            *   **Criptografia Individualizada de Dados em Redes Abertas:** Mesmo em redes Wi-Fi abertas (sem senha), o WPA3 pode fornecer criptografia individual para cada conexão de usuário (usando Wi-Fi Enhanced Open™, baseado em Opportunistic Wireless Encryption - OWE).
            *   **Modos de Segurança Mais Fortes para Redes Corporativas:** Criptografia de 192 bits em WPA3-Enterprise.
            *   **Easy Connect:** Simplifica o processo de conexão de dispositivos IoT.
    *   **EAP (Extensible Authentication Protocol - Protocolo de Autenticação Extensível):**
        *   **Conceito:** Um framework de autenticação, não um método específico. Fornece uma arquitetura para transportar informações de autenticação entre um suplicante (cliente sem fio), um autenticador (ponto de acesso) e um servidor de autenticação (geralmente RADIUS).
        *   **Uso:** Usado no WPA/WPA2/WPA3-Enterprise em conjunto com o 802.1X.
        *   **Métodos EAP Comuns:** EAP-TLS (usa certificados digitais de ambos os lados), EAP-TTLS/MSCHAPv2 (cria um túnel TLS e autentica o cliente com credenciais de nome de usuário/senha), PEAP/MSCHAPv2 (similar ao EAP-TTLS).
    *   **Protocolo 802.1X:**
        *   **Conceito:** Padrão IEEE para Controle de Acesso à Rede Baseado em Porta (PNAC - Port-Based Network Access Control). Fornece um mecanismo de autenticação para dispositivos que desejam se conectar a uma LAN ou WLAN.
        *   **Atores:**
            *   **Suplicante (Supplicant):** Dispositivo cliente que solicita acesso.
            *   **Autenticador (Authenticator):** Dispositivo de rede (ex: switch, ponto de acesso Wi-Fi) que controla o acesso à rede.
            *   **Servidor de Autenticação (Authentication Server):** Servidor (geralmente RADIUS - Remote Authentication Dial-In User Service) que verifica as credenciais do suplicante e autoriza ou nega o acesso.
        *   **Funcionamento:** O autenticador bloqueia o acesso à rede até que o suplicante seja autenticado pelo servidor de autenticação usando um método EAP.
    *   **Autenticação Baseada em Contexto (Context-Aware Authentication):**
        *   **Conceito:** Método de autenticação adaptativo que considera informações contextuais adicionais além das credenciais tradicionais (como senha ou biometria) para tomar decisões de acesso. O nível de autenticação ou as permissões concedidas podem variar com base no contexto.
        *   **Fatores Contextuais:** Localização geográfica do usuário (geolocalização), endereço IP, tipo de dispositivo, horário do acesso, comportamento do usuário, postura de segurança do dispositivo.
        *   **Exemplo:** Se um usuário tenta acessar um sistema corporativo de uma rede desconhecida ou de um país incomum, pode ser solicitado um fator de autenticação adicional, mesmo que a senha esteja correta.
*   **Relevância Forense:**
    *   **Investigação de Acesso Não Autorizado a Redes Sem Fio:** Identificar o tipo de segurança usado (WEP, WPA, WPA2, WPA3) e se foi comprometido (ex: chave WEP quebrada, senha PSK fraca adivinhada).
    *   **Logs de Ponto de Acesso (AP) e Servidor RADIUS:** Contêm informações sobre tentativas de autenticação (sucesso/falha), endereços MAC de clientes, métodos EAP usados, atribuição de endereços IP.
    *   **Análise de Tráfego Capturado:** Se o tráfego de uma rede sem fio protegida for capturado, a chave de criptografia (PSK ou chaves derivadas em Enterprise) é necessária para descriptografar os dados. O handshake de autenticação (ex: 4-way handshake do WPA2-PSK) pode ser analisado para tentativas de quebra de senha offline.
    *   **Ataques Específicos a Wi-Fi:** Investigar ataques como `Evil Twin` (AP falso), `KRACK` (ataque ao WPA2), ataques de desautenticação.
    *   **Autenticação Baseada em Contexto:** Logs desses sistemas podem fornecer informações ricas sobre o contexto de um acesso, o que pode ser útil para identificar atividades anômalas ou confirmar a legitimidade de um acesso.

---

## 8.5 Ataques a redes de computadores.

*   **Explicação:** Ações maliciosas que visam comprometer a confidencialidade, integridade ou disponibilidade (CIA - Confidentiality, Integrity, Availability) de redes e dos dados que nelas trafegam.

    ---
    #### 8.5.1 DoS, DDoS, botnets, phishing, zero-day exploits, ping da morte, UDP Flood, MAC flooding, IP spoofing, ARP spoofing, buffer overflow, SQL injection, Cross-Site Scripting (XSS), DNS Poisoning.
    *   **Explicação:**
        *   **DoS (Denial of Service - Negação de Serviço):** Ataque que visa tornar um recurso de rede (servidor, site, link de comunicação) indisponível para seus usuários legítimos, sobrecarregando-o com tráfego ou explorando uma vulnerabilidade que o faça parar de funcionar.
        *   **DDoS (Distributed Denial of Service - Negação de Serviço Distribuída):** Variante do DoS onde o ataque é originado de múltiplos sistemas comprometidos (muitas vezes uma botnet) coordenados, tornando mais difícil bloquear a origem e aumentando o volume do ataque.
        *   **Botnets (Redes de Robôs):** Redes de computadores comprometidos (zumbis ou bots) controlados remotamente por um atacante (botmaster). Usadas para realizar ataques DDoS, enviar spam, minerar criptomoedas, etc.
        *   **Phishing (Pescaria Eletrônica):** Fraude online onde o atacante tenta enganar usuários para que revelem informações sensíveis (senhas, dados bancários, números de cartão de crédito) se passando por uma entidade confiável (banco, empresa, serviço online) através de e-mails, mensagens instantâneas ou sites falsos.
        *   **Zero-Day Exploits (Explorações de Dia Zero):** Ataques que exploram vulnerabilidades de software que são desconhecidas pelo desenvolvedor do software ou para as quais ainda não existe uma correção (patch) disponível publicamente. "Dia zero" refere-se ao fato de que o desenvolvedor tem zero dias para corrigir o problema antes que ele seja explorado.
        *   **Ping da Morte (Ping of Death):** Ataque DoS legado que enviava um pacote ICMP echo request (ping) malformado e superdimensionado, que podia causar o travamento de sistemas operacionais mais antigos e vulneráveis.
        *   **UDP Flood (Inundação UDP):** Ataque DoS que envia um grande número de pacotes UDP para portas aleatórias ou específicas de um host alvo. O sistema alvo tenta processar esses pacotes, verificando se há aplicações escutando nessas portas e respondendo com pacotes ICMP "Destination Unreachable", consumindo seus recursos.
        *   **MAC Flooding (Inundação MAC):** Ataque contra switches de rede. O atacante envia um grande número de quadros Ethernet com diferentes endereços MAC de origem falsos, tentando esgotar a tabela CAM (Content Addressable Memory - Memória Endereçável por Conteúdo) do switch, que armazena os mapeamentos MAC-porta. Se a tabela CAM encher, o switch pode começar a operar como um hub (fail-open mode), enviando todo o tráfego para todas as portas, permitindo que o atacante capture tráfego de outros usuários (sniffing).
        *   **IP Spoofing (Falsificação de IP):** Criação de pacotes IP com um endereço IP de origem falso, com o objetivo de ocultar a identidade do remetente ou se passar por outro sistema. Usado em alguns tipos de ataques DoS ou para contornar filtros de firewall baseados em IP.
        *   **ARP Spoofing (Envenenamento de Cache ARP - ARP Cache Poisoning):** Ataque em redes locais onde o atacante envia mensagens ARP falsificadas para associar seu endereço MAC ao endereço IP de outro host (como o gateway padrão). Isso pode desviar o tráfego da vítima para o atacante, permitindo ataques Man-in-the-Middle (MitM) ou sniffing.
        *   **Buffer Overflow (Estouro de Buffer):** Vulnerabilidade de software que ocorre quando um programa tenta escrever mais dados em um buffer (uma área de memória de tamanho fixo) do que ele pode comportar. Os dados excedentes podem sobrescrever áreas adjacentes da memória, potencialmente corrompendo dados, causando o travamento do programa, ou permitindo a execução de código malicioso (se o atacante conseguir sobrescrever um endereço de retorno na pilha ou um ponteiro de função com o endereço de seu próprio código malicioso - shellcode).
        *   **SQL Injection (Injeção de SQL):** Vulnerabilidade em aplicações web que usam bancos de dados SQL. Ocorre quando a aplicação insere dados fornecidos pelo usuário diretamente em uma consulta SQL sem validação ou sanitização adequada. Um atacante pode injetar comandos SQL maliciosos para manipular o banco de dados (ler, modificar, deletar dados), ou até mesmo obter controle do servidor de banco de dados.
        *   **Cross-Site Scripting (XSS - Script entre Sites):** Vulnerabilidade em aplicações web que permite que um atacante injete scripts maliciosos (geralmente JavaScript) em páginas web visualizadas por outros usuários. Quando o script é executado no navegador da vítima, ele pode roubar cookies de sessão, redirecionar para sites falsos, ou realizar outras ações em nome da vítima.
            *   *Tipos:* XSS Refletido (script injetado é refletido de volta do servidor para o navegador da vítima), XSS Armazenado (script malicioso é permanentemente armazenado no servidor e servido a múltiplos usuários), XSS Baseado em DOM (vulnerabilidade no código JavaScript do lado do cliente).
        *   **DNS Poisoning (Envenenamento de Cache DNS) ou DNS Spoofing (Falsificação de DNS):** Ataque que corrompe as informações em um servidor DNS ou no cache DNS de um cliente, fazendo com que nomes de domínio sejam resolvidos para endereços IP incorretos (controlados pelo atacante). Isso pode redirecionar usuários para sites falsos (phishing, distribuição de malware).
    *   **Relevância Forense:**
        *   **Identificação do Tipo de Ataque:** Crucial para entender o objetivo do atacante, os sistemas afetados e as técnicas de investigação apropriadas.
        *   **Análise de Logs:** Logs de firewalls, IDS/IPS, servidores web, servidores DNS, bancos de dados e hosts são essenciais para detectar e analisar esses ataques.
        *   **Análise de Tráfego de Rede:** Capturas de pacotes podem revelar a natureza de ataques DoS/DDoS, tentativas de spoofing, ou o tráfego gerado por exploits.
        *   **Análise de Malware:** Muitos desses ataques são o resultado da execução de malware (ex: botnets para DDoS, trojans que realizam SQL injection).
        *   **Análise de Vulnerabilidades:** Em casos de buffer overflow, SQL injection, XSS, a investigação pode envolver a identificação da vulnerabilidade no software que permitiu o ataque.
        *   **Rastreamento de Origem:** Desafiador em muitos casos (IP spoofing, botnets, TOR), mas a análise de múltiplos pontos de dados pode ajudar.

    ---
    #### 8.5.2 MITRE ATT&CK.
    *   **Explicação:**
        *   **Conceito:** MITRE ATT&CK® (Adversarial Tactics, Techniques, and Common Knowledge - Táticas, Técnicas Adversariais e Conhecimento Comum) é uma base de conhecimento globalmente acessível de táticas e técnicas de adversários baseada em observações do mundo real. É desenvolvida e mantida pela MITRE Corporation.
        *   **Estrutura:** Organizada em matrizes. As principais são:
            *   **Enterprise:** Cobre o comportamento de adversários em redes corporativas Windows, macOS e Linux, e também em ambientes de nuvem.
            *   **Mobile:** Foca em táticas e técnicas usadas contra dispositivos móveis.
            *   **ICS (Industrial Control Systems - Sistemas de Controle Industrial):** Foca em ambientes de tecnologia operacional (OT).
        *   **Componentes da Matriz:**
            *   **Táticas (Tactics):** Representam o objetivo tático de curto prazo do adversário, o "porquê" de uma ação. (Ex: Acesso Inicial, Execução, Persistência, Escalação de Privilégio, Defesa Evasiva, Acesso a Credenciais, Descoberta, Movimentação Lateral, Coleta, Comando e Controle, Exfiltração, Impacto).
            *   **Técnicas (Techniques):** Descrevem *como* um adversário atinge um objetivo tático. Cada tática tem um conjunto de técnicas associadas. (Ex: Dentro da tática "Acesso Inicial", uma técnica pode ser "Spearphishing Attachment" ou "Exploit Public-Facing Application").
            *   **Sub-técnicas (Sub-techniques):** Detalham ainda mais como uma técnica específica pode ser implementada.
            *   **Procedimentos (Procedures):** São as implementações específicas de técnicas e sub-técnicas por grupos de adversários particulares ou malwares. O ATT&CK não lista exaustivamente todos os procedimentos, mas fornece exemplos.
        *   **Uso:**
            *   **Modelagem de Ameaças e Defesa:** Ajuda as organizações a entenderem como os adversários operam e a avaliarem suas defesas contra técnicas específicas.
            *   **Detecção e Resposta a Incidentes:** Fornece uma linguagem comum para descrever o comportamento do adversário. Pode ser usado para mapear detecções de ferramentas de segurança para técnicas ATT&CK.
            *   **Inteligência de Ameaças (Threat Intelligence):** Para caracterizar grupos de adversários e suas TTPs.
            *   **Planejamento de Red Teaming / Testes de Penetração:** Para simular ataques realistas.
*   **Relevância Forense:**
    *   **Análise de Incidentes:** Após um incidente, mapear as atividades observadas (a partir de logs, análise de malware, etc.) para as táticas e técnicas do ATT&CK ajuda a:
        *   **Entender o Escopo Completo do Ataque:** Identificar quais fases do ciclo de vida do ataque foram alcançadas (ex: o atacante conseguiu acesso inicial, mas foi detectado antes da exfiltração de dados?).
        *   **Identificar Lacunas na Detecção/Defesa:** Se uma técnica usada pelo atacante não foi detectada, isso aponta para uma área de melhoria.
        *   **Comunicar sobre o Incidente:** Fornece uma estrutura e terminologia padronizada para descrever o ataque para outras equipes ou organizações.
    *   **Caça a Ameaças (Threat Hunting):** Usar o ATT&CK para proativamente procurar por evidências de técnicas de adversários na rede ou nos endpoints, mesmo antes de um alerta ser gerado.
    *   **Atribuição (Auxílio):** Embora o ATT&CK não seja diretamente uma ferramenta de atribuição, o conhecimento das TTPs preferidas por certos grupos de ameaças (que são mapeadas no ATT&CK) pode contribuir para hipóteses de atribuição.
    *   **Relatórios Forenses:** Estruturar as descobertas de uma investigação forense usando o framework ATT&CK pode tornar o relatório mais claro, abrangente e acionável.

---

## 8.6. Frameworks de segurança da informação e segurança cibernética: CIS Controls e NIST CyberSecurity Framework (CSF).

*   **Explicação:** Frameworks que fornecem diretrizes, melhores práticas e controles para ajudar as organizações a gerenciar e melhorar sua postura de segurança da informação e cibersegurança.
    *   **CIS Controls (Center for Internet Security Controls):**
        *   **Conceito:** Um conjunto priorizado de ações de defesa cibernética que formam uma base de defesa comprovada contra os ataques mais comuns. São práticos e acionáveis.
        *   **Estrutura:** Organizados em Controles (anteriormente 20, agora 18 na v8) e Salvaguardas (anteriormente Sub-Controles, agora chamadas Safeguards). Os Controles são agrupados em Grupos de Implementação (IGs - Implementation Groups) que ajudam as organizações a priorizar sua implementação com base em seu perfil de risco e recursos.
            *   **IG1 (Higiene Cibernética Básica):** Defesas essenciais que toda organização deve implementar.
            *   **IG2 e IG3:** Controles adicionais para organizações com mais recursos ou maior perfil de risco.
        *   **Exemplos de Controles (v8):** Inventário e Controle de Ativos Empresariais, Inventário e Controle de Ativos de Software, Proteção de Dados, Configuração Segura de Ativos e Software Empresariais, Gerenciamento de Contas, Gerenciamento de Controle de Acesso, Gerenciamento Contínuo de Vulnerabilidades, Gerenciamento de Logs de Auditoria, Proteções de E-mail e Navegador Web, Defesas contra Malware, Recuperação de Dados, Gerenciamento de Segurança de Rede, Monitoramento e Defesa de Rede, Teste de Penetração.
    *   **NIST CyberSecurity Framework (CSF - Estrutura de Cibersegurança do NIST):**
        *   **Conceito:** Desenvolvido pelo National Institute of Standards and Technology (NIST) dos EUA, fornece uma estrutura de alto nível de padrões, diretrizes e melhores práticas para ajudar as organizações a gerenciar riscos de cibersegurança. É voluntário e projetado para ser adaptável a diferentes setores e tamanhos de organização.
        *   **Componentes Principais:**
            *   **Núcleo do Framework (Framework Core):** Conjunto de atividades de cibersegurança, resultados desejados e referências aplicáveis que são comuns em diversos setores. Organizado em cinco **Funções** concorrentes e contínuas:
                1.  **Identificar (Identify):** Desenvolver o entendimento organizacional para gerenciar riscos de cibersegurança para sistemas, ativos, dados e capacidades.
                2.  **Proteger (Protect):** Desenvolver e implementar as salvaguardas apropriadas para garantir a entrega de serviços de infraestrutura crítica.
                3.  **Detectar (Detect):** Desenvolver e implementar as atividades apropriadas para identificar a ocorrência de um evento de cibersegurança.
                4.  **Responder (Respond):** Desenvolver e implementar as atividades apropriadas para agir em relação a um evento de cibersegurança detectado.
                5.  **Recuperar (Recover):** Desenvolver e implementar os planos apropriados para resiliência e para restaurar quaisquer capacidades ou serviços que foram prejudicados devido a um evento de cibersegurança.
                *   Cada Função é subdividida em **Categorias** (ex: Gerenciamento de Ativos, Controle de Acesso dentro da Função Proteger) e **Subcategorias** (resultados específicos de cibersegurança). Para cada Subcategoria, há **Referências Informativas** a outros padrões (como ISO 27001, CIS Controls, COBIT).
            *   **Níveis de Implementação do Framework (Framework Implementation Tiers):** Descrevem o grau de rigor e sofisticação com que uma organização implementa suas práticas de gerenciamento de risco de cibersegurança (Parcial, Risco Informado, Repetível, Adaptativo).
            *   **Perfis do Framework (Framework Profiles):** Representam o alinhamento dos padrões, diretrizes e práticas de uma organização com os resultados do Núcleo do Framework. Um perfil pode descrever o estado atual ("as is") ou o estado desejado ("to be") de cibersegurança.
*   **Relevância Forense:**
    *   **Contexto para Investigação:** Similar às normas ISO 27001/2, esses frameworks ajudam a entender as práticas de segurança que uma organização deveria ter.
    *   **Avaliação de Lacunas de Segurança:** Após um incidente, o perito pode usar o CIS Controls ou o NIST CSF para avaliar onde as defesas da organização falharam em relação às melhores práticas.
    *   **Identificação de Controles Relevantes para Evidência:** Ambos os frameworks recomendam controles relacionados a logging, monitoramento, gerenciamento de ativos, que são cruciais para a forense. Se uma organização segue esses frameworks, é mais provável que existam logs e outras evidências úteis.
    *   **Comunicação e Relatórios:** Usar a terminologia e a estrutura desses frameworks pode ajudar a comunicar as descobertas forenses de forma clara e a fazer recomendações de melhoria.
    *   **NIST CSF e Resposta a Incidentes/Recuperação:** As funções "Responder" e "Recuperar" do NIST CSF são diretamente relevantes para a forense digital e a resposta a incidentes, fornecendo um guia sobre as atividades que devem ser realizadas.

---

## 8.7 Ameaças persistentes avançadas (APTs).

*   **Explicação:**
    *   **Conceito:** APT (Advanced Persistent Threat - Ameaça Persistente Avançada) refere-se a um ator de ameaça (geralmente um grupo bem financiado e organizado, muitas vezes patrocinado por um estado-nação ou grande organização criminosa) que possui capacidades sofisticadas e recursos significativos para criar, executar e manter campanhas de ataque prolongadas e direcionadas contra alvos específicos (organizações, indústrias, governos).
    *   **Características das APTs:**
        *   **Avançadas (Advanced):** Usam uma ampla gama de vetores de ataque, incluindo técnicas de engenharia social, exploração de vulnerabilidades (incluindo zero-days), malware customizado e ferramentas de hacking. Podem desenvolver suas próprias ferramentas ou adaptar as existentes.
        *   **Persistentes (Persistent):** O objetivo não é um ataque rápido de "bater e correr". As APTs buscam manter acesso de longo prazo e não detectado aos sistemas do alvo para atingir seus objetivos estratégicos (espionagem, roubo de propriedade intelectual, sabotagem, vigilância). Usam técnicas para manter a persistência (ex: backdoors, tarefas agendadas, modificação de binários do sistema).
        *   **Ameaça (Threat):** Envolvem tanto a capacidade (recursos e habilidades) quanto a intenção de causar dano ou atingir objetivos específicos.
    *   **Ciclo de Vida Típico de um Ataque APT (pode variar):**
        1.  **Reconhecimento (Reconnaissance):** Coleta de informações sobre o alvo (OSINT, varredura de rede, engenharia social).
        2.  **Acesso Inicial (Initial Compromise):** Obter o primeiro ponto de entrada na rede do alvo (ex: spear phishing, exploração de vulnerabilidade, watering hole).
        3.  **Estabelecimento de Ponto de Apoio (Establish Foothold):** Instalar malware (backdoor, RAT - Remote Access Trojan) para garantir acesso persistente.
        4.  **Escalação de Privilégios (Privilege Escalation):** Obter privilégios mais altos no sistema comprometido ou na rede.
        5.  **Reconhecimento Interno (Internal Reconnaissance):** Mapear a rede interna, identificar ativos valiosos.
        6.  **Movimentação Lateral (Lateral Movement):** Mover-se de um sistema comprometido para outros dentro da rede.
        7.  **Manutenção de Presença/Persistência (Maintain Presence):** Garantir que o acesso seja mantido ao longo do tempo, mesmo se alguns pontos de acesso forem descobertos.
        8.  **Conclusão da Missão/Exfiltração (Complete Mission/Exfiltration):** Atingir o objetivo final (roubar dados, sabotar sistemas) e, frequentemente, exfiltrar os dados coletados de forma furtiva.
*   **Relevância Forense:**
    *   **Investigações Complexas e de Longo Prazo:** Incidentes envolvendo APTs são geralmente muito mais complexos e demorados de investigar do que ataques de malware comuns.
    *   **Foco em TTPs:** A análise forense de ataques APT foca em entender as Táticas, Técnicas e Procedimentos (TTPs) do adversário, em vez de apenas analisar uma amostra de malware isolada. O framework MITRE ATT&CK é muito útil aqui.
    *   **Detecção de Sinais Fracos:** APTs são projetadas para serem furtivas. A detecção pode depender da correlação de múltiplos eventos de baixo nível e anomalias ao longo do tempo.
    *   **Análise de Múltiplos Hosts e Fontes de Log:** A investigação geralmente abrange muitos sistemas na rede e requer a coleta e análise de logs de diversas fontes.
    *   **Malware Customizado:** APTs frequentemente usam malware customizado ou modificado que pode não ser detectado por assinaturas de AV tradicionais. Engenharia reversa profunda é necessária.
    *   **Exfiltração de Dados:** Identificar os métodos e canais usados para exfiltrar dados (ex: DNS tunneling, comunicação criptografada com servidores C2 externos, uso de serviços de nuvem legítimos).
    *   **Atribuição:** A atribuição de ataques APT a grupos específicos ou nações é um desafio complexo que envolve não apenas análise técnica, mas também inteligência de ameaças e considerações geopolíticas.
    *   **Limpeza e Remediação:** Remover completamente uma APT de uma rede comprometida é muito difícil devido às suas técnicas de persistência.

---
