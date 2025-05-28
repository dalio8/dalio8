# Protocolos de Rede para Concursos (Perito em Informática - CEBRASPE)

Este resumo aborda os principais protocolos de rede, suas funções, camadas de operação e características chave, com foco no Modelo TCP/IP e mencionando o Modelo OSI quando relevante.

## Protocolos da Camada de Internet (Rede)

### 1. IP (Internet Protocol)

*   **Função Principal:** Responsável pelo endereçamento lógico dos dispositivos na rede e pelo roteamento de pacotes de dados (datagramas) desde a origem até o destino, através de múltiplas redes interconectadas (internetworking). É a base da comunicação na Internet.
*   **Camada:**
    *   TCP/IP: Camada de Internet (ou Rede).
    *   OSI: Camada de Rede (Camada 3).
*   **Características Chave:**
    *   **Não orientado à conexão (Connectionless):** Não estabelece uma conexão prévia antes de enviar dados. Cada pacote é tratado de forma independente.
    *   **Não confiável (Unreliable):** Não garante a entrega dos pacotes. Pacotes podem ser perdidos, duplicados, ou chegar fora de ordem. A confiabilidade é responsabilidade de protocolos de camadas superiores (como o TCP).
    *   **Melhor Esforço (Best Effort Delivery):** O IP tenta entregar os pacotes, mas não há garantias.
    *   **Endereçamento:** Utiliza endereços IP (IPv4 ou IPv6) para identificar unicamente os hosts na rede.
    *   **Fragmentação:** Pode dividir pacotes grandes em fragmentos menores para transmissão por redes com diferentes MTUs (Maximum Transmission Unit).
    *   **Cabeçalho IPv4:** Inclui campos como Versão, Tamanho do Cabeçalho (IHL), Tipo de Serviço (ToS), Comprimento Total, Identificação, Flags, Offset de Fragmento, Tempo de Vida (TTL), Protocolo (indica o protocolo da camada superior, ex: TCP, UDP, ICMP), Checksum do Cabeçalho, Endereço IP de Origem e Destino, e Opções (raramente usadas).

### 2. ICMP (Internet Control Message Protocol)

*   **Função Principal:** Usado por hosts e roteadores para comunicar informações de controle e erro sobre o processamento de datagramas IP. Não transporta dados de aplicação.
*   **Camada:**
    *   TCP/IP: Considerado parte da Camada de Internet (opera "sobre" o IP, mas suas mensagens são processadas pela lógica IP).
    *   OSI: Camada de Rede (Camada 3).
*   **Características Chave:**
    *   **Mensagens de Controle e Erro:** Envia mensagens como:
        *   **Echo Request / Echo Reply:** Usadas pelo utilitário `ping` para testar a conectividade entre hosts.
        *   **Destination Unreachable:** Informa que um host ou rede de destino não pode ser alcançado.
        *   **Time Exceeded:** Indica que o TTL (Time To Live) de um pacote expirou ou que o tempo de remontagem de fragmentos foi excedido.
        *   **Redirect:** Informa a um host sobre uma rota melhor para um destino.
        *   **Source Quench (obsoleto):** Usado para controle de congestionamento (raramente implementado).
    *   **Encapsulamento:** Mensagens ICMP são encapsuladas dentro de datagramas IP.
    *   **Não é um protocolo de transporte:** Não é usado para trocar dados entre aplicações finais.
*   **Estrutura do Datagrama ICMP:** Contém um cabeçalho (Tipo, Código, Checksum, Resto do Cabeçalho) e, para mensagens de erro, geralmente inclui o cabeçalho IP e os primeiros 8 bytes do datagrama IP original que causou o erro.

### 3. ARP (Address Resolution Protocol)

*   **Função Principal:** Resolver (mapear) um endereço da camada de rede (endereço IP) para um endereço da camada de enlace (endereço físico/MAC address) em redes locais (broadcast).
*   **Camada:**
    *   TCP/IP: Opera na interface entre a Camada de Enlace e a Camada de Internet.
    *   OSI: Geralmente associado à Camada de Enlace (Camada 2), mas com interações com a Camada de Rede (Camada 3).
*   **Características Chave:**
    *   **Resolução de Endereços:** Quando um host precisa enviar um pacote IP para outro host na mesma rede local, ele conhece o endereço IP de destino, mas precisa do endereço MAC de destino para construir o quadro da camada de enlace.
    *   **Funcionamento:**
        1.  **Requisição ARP (ARP Request):** O host de origem envia uma mensagem ARP Request em broadcast na rede local, perguntando "Quem tem o endereço IP X? Por favor, me diga seu endereço MAC."
        2.  **Resposta ARP (ARP Reply):** O host com o endereço IP X responde com uma mensagem ARP Reply diretamente (unicast) para o host de origem, informando seu endereço MAC.
    *   **Cache ARP:** Os hosts mantêm uma tabela (cache ARP) com os mapeamentos IP-MAC recentes para evitar repetir o processo ARP para destinos já conhecidos. As entradas no cache ARP geralmente têm um tempo de vida.
    *   **Escopo Local:** O ARP opera apenas dentro de uma mesma sub-rede física (domínio de broadcast). Não é roteado.
    *   **Proxy ARP:** Um roteador pode responder a requisições ARP em nome de hosts em outra rede, permitindo que hosts em sub-redes diferentes se comuniquem sem conhecer a topologia da sub-rede (embora seu uso tenha diminuído com técnicas de roteamento mais sofisticadas).
    *   **RARP (Reverse ARP):** Protocolo obsoleto que fazia o oposto (MAC para IP), substituído principalmente pelo DHCP.
    *   **IPv6:** No IPv6, a funcionalidade do ARP é substituída pelo NDP (Neighbor Discovery Protocol), que utiliza mensagens ICMPv6.

## Protocolos da Camada de Transporte

### 4. TCP (Transmission Control Protocol)

*   **Função Principal:** Fornecer um serviço de comunicação confiável, orientado à conexão, e ordenado para a transferência de um fluxo de bytes entre aplicações rodando em hosts diferentes.
*   **Camada:**
    *   TCP/IP: Camada de Transporte.
    *   OSI: Camada de Transporte (Camada 4).
*   **Características Chave:**
    *   **Orientado à Conexão:** Requer o estabelecimento de uma conexão (handshake de três vias: SYN, SYN-ACK, ACK) antes da transferência de dados e um processo de finalização da conexão (four-way handshake).
    *   **Confiável:** Garante que os dados cheguem ao destino sem erros, na ordem correta e sem perdas ou duplicações. Utiliza:
        *   **Números de Sequência:** Para ordenar os segmentos e detectar perdas.
        *   **Confirmações (Acknowledgements - ACKs):** O receptor envia ACKs para confirmar o recebimento de segmentos.
        *   **Retransmissão:** Segmentos perdidos ou corrompidos são retransmitidos.
        *   **Checksum:** Para detecção de erros no cabeçalho e nos dados.
    *   **Controle de Fluxo:** Utiliza um mecanismo de janela deslizante (sliding window) para evitar que o transmissor sobrecarregue o receptor. O receptor anuncia o tamanho de sua janela de recepção.
    *   **Controle de Congestionamento:** Implementa algoritmos (ex: slow start, congestion avoidance, fast retransmit, fast recovery) para evitar e responder ao congestionamento na rede, ajustando a taxa de envio de dados.
    *   **Full-Duplex:** Permite a transferência de dados em ambas as direções simultaneamente sobre a mesma conexão.
    *   **Portas:** Utiliza números de porta para identificar as aplicações de origem e destino (multiplexação/demultiplexação).
    *   **Segmentação:** Divide o fluxo de bytes da aplicação em segmentos TCP.
    *   **Cabeçalho TCP:** Inclui campos como Porta de Origem, Porta de Destino, Número de Sequência, Número de Confirmação, Tamanho do Cabeçalho, Flags (SYN, ACK, FIN, RST, PSH, URG), Janela de Recepção, Checksum, Ponteiro de Urgência e Opções.

### 5. UDP (User Datagram Protocol)

*   **Função Principal:** Fornecer um serviço de comunicação simples, rápido e sem conexão para a transferência de datagramas entre aplicações.
*   **Camada:**
    *   TCP/IP: Camada de Transporte.
    *   OSI: Camada de Transporte (Camada 4).
*   **Características Chave:**
    *   **Não Orientado à Conexão (Connectionless):** Não estabelece uma conexão prévia. Cada datagrama é enviado de forma independente.
    *   **Não Confiável (Unreliable):** Não garante a entrega, a ordem ou a ausência de duplicação dos datagramas. A confiabilidade, se necessária, deve ser implementada pela aplicação.
    *   **Melhor Esforço (Best Effort Delivery):** Similar ao IP, o UDP tenta entregar os datagramas, mas sem garantias.
    *   **Leve (Lightweight):** Possui um cabeçalho muito pequeno (8 bytes) e pouca sobrecarga de processamento.
    *   **Rápido:** A ausência de mecanismos de confiabilidade e controle de fluxo/congestionamento o torna mais rápido que o TCP para certas aplicações.
    *   **Portas:** Utiliza números de porta para multiplexação/demultiplexação de dados de diferentes aplicações.
    *   **Datagramas:** As mensagens são tratadas como datagramas indivisíveis.
    *   **Suporte a Broadcast e Multicast:** Pode ser usado para enviar dados para múltiplos destinos simultaneamente.
    *   **Cabeçalho UDP:** Inclui Porta de Origem, Porta de Destino, Comprimento (do cabeçalho UDP + dados) e Checksum (opcional no IPv4, obrigatório no IPv6 para alguns casos).
*   **Usos Típicos:** Aplicações que priorizam velocidade e baixa latência sobre confiabilidade total, como streaming de vídeo e áudio (onde pequenas perdas podem ser toleráveis), jogos online, DNS, DHCP, SNMP, VoIP.

## Protocolos da Camada de Aplicação

### 6. HTTP (Hypertext Transfer Protocol)

*   **Função Principal:** Protocolo para transferência de recursos hipermídia (como documentos HTML) na World Wide Web. É a base da comunicação de dados para a Web.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação.
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Cliente-Servidor:** Opera em um modelo requisição-resposta, onde o cliente (navegador) envia requisições para um servidor web, que responde com os recursos solicitados ou uma mensagem de erro.
    *   **Sem Estado (Stateless):** Por padrão, cada requisição HTTP é independente e o servidor não mantém informações sobre requisições anteriores do mesmo cliente. Estados podem ser mantidos através de cookies, sessões do lado do servidor ou parâmetros na URL.
    *   **Porta Padrão:** TCP porta 80.
    *   **Métodos de Requisição:**
        *   `GET`: Solicita uma representação do recurso especificado.
        *   `POST`: Envia dados para serem processados pelo recurso especificado (ex: submissão de formulários).
        *   `PUT`: Atualiza ou cria um recurso no servidor com os dados fornecidos.
        *   `DELETE`: Remove o recurso especificado.
        *   `HEAD`: Similar ao GET, mas solicita apenas os cabeçalhos da resposta, sem o corpo.
        *   `OPTIONS`: Descreve as opções de comunicação para o recurso alvo.
        *   `CONNECT`: Estabelece um túnel para o servidor identificado pelo recurso alvo (usado para HTTPS através de proxies).
        *   `TRACE`: Realiza um teste de loop-back da mensagem ao longo do caminho para o recurso alvo.
    *   **Códigos de Status HTTP:** Respostas do servidor incluem códigos numéricos indicando o resultado da requisição (ex: 200 OK, 404 Not Found, 500 Internal Server Error).
    *   **Cabeçalhos HTTP:** Contêm metadados sobre a requisição ou resposta (ex: User-Agent, Content-Type, Content-Length, Cache-Control, Cookies).
    *   **Conexões Persistentes (HTTP/1.1+):** Permitem que múltiplas requisições/respostas sejam enviadas pela mesma conexão TCP, reduzindo a latência.
    *   **HTTP/2 e HTTP/3:** Versões mais recentes que introduzem melhorias como multiplexação de requisições, compressão de cabeçalhos e uso do QUIC (sobre UDP para HTTP/3).

### 7. HTTPS (Hypertext Transfer Protocol Secure)

*   **Função Principal:** Versão segura do HTTP, que utiliza uma camada adicional de segurança (TLS/SSL) para criptografar a comunicação entre o cliente e o servidor.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação (HTTP) sobre uma camada de segurança (TLS/SSL) que opera entre a Aplicação e o Transporte.
    *   OSI: Camada de Aplicação (HTTP) com segurança provida por protocolos que atuam conceitualmente entre as camadas de Apresentação e Sessão (TLS/SSL).
*   **Características Chave:**
    *   **Segurança:** Criptografa os dados transmitidos, incluindo cabeçalhos e corpo das mensagens HTTP, protegendo contra interceptação (eavesdropping) e ataques man-in-the-middle.
    *   **Autenticação do Servidor:** Utiliza certificados digitais emitidos por Autoridades Certificadoras (CAs) para verificar a identidade do servidor web ao qual o cliente está se conectando.
    *   **Autenticação do Cliente (Opcional):** Pode também autenticar o cliente através de certificados digitais.
    *   **Integridade dos Dados:** Garante que os dados não foram modificados durante a transmissão.
    *   **Porta Padrão:** TCP porta 443.
    *   **Funcionamento:** O HTTP é encapsulado dentro de uma conexão TLS/SSL. O handshake TLS/SSL ocorre antes que qualquer dado HTTP seja trocado.

### 8. DNS (Domain Name System)

*   **Função Principal:** Sistema hierárquico e distribuído para traduzir nomes de domínio legíveis por humanos (ex: `www.wikipedia.org`) em endereços IP numéricos (ex: `208.80.154.224`) e vice-versa (DNS reverso). Essencial para a navegação na Internet.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação.
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Hierárquico e Distribuído:** A base de dados de nomes de domínio é distribuída entre múltiplos servidores DNS organizados hierarquicamente:
        *   **Servidores Raiz (Root Servers):** No topo da hierarquia, conhecem os servidores dos domínios de topo.
        *   **Servidores de Domínio de Topo (TLD Servers):** Gerenciam domínios de topo como `.com`, `.org`, `.br`. Conhecem os servidores autoritativos para os domínios de segundo nível.
        *   **Servidores Autoritativos:** Contêm os registros DNS originais para um domínio específico.
    *   **Resolução de Nomes:**
        *   **Consulta Recursiva:** O cliente DNS (resolver) pergunta a um servidor DNS local, que se encarrega de encontrar o endereço IP, consultando outros servidores DNS (raiz, TLD, autoritativo) em nome do cliente.
        *   **Consulta Iterativa:** O cliente DNS (ou o servidor local) pergunta a um servidor, que responde com o endereço de outro servidor para consultar, e assim por diante, até que o endereço IP seja encontrado.
    *   **Cache DNS:** Servidores DNS (e clientes) armazenam em cache os resultados de consultas recentes para acelerar futuras requisições para os mesmos nomes de domínio (respeitando um TTL - Time To Live).
    *   **Porta Padrão:** UDP porta 53 (para consultas e respostas rápidas). TCP porta 53 também pode ser usada para transferências de zona (AXFR) ou respostas maiores.
    *   **Registros de Recurso (Resource Records - RR):** Contêm as informações no DNS. Tipos comuns incluem:
        *   `A`: Mapeia um nome de host para um endereço IPv4.
        *   `AAAA`: Mapeia um nome de host para um endereço IPv6.
        *   `CNAME` (Canonical Name): Cria um alias de um nome de domínio para outro.
        *   `MX` (Mail Exchange): Especifica os servidores de e-mail para um domínio.
        *   `NS` (Name Server): Especifica os servidores DNS autoritativos para um domínio.
        *   `PTR` (Pointer): Usado para DNS reverso (IP para nome).
        *   `SOA` (Start of Authority): Contém informações administrativas sobre a zona DNS.
        *   `TXT`: Permite associar texto arbitrário a um domínio (usado para SPF, DKIM, etc.).
    *   **DNS Reverso (Reverse Lookup):** Resolve um endereço IP para um nome de domínio (usando registros PTR na zona `in-addr.arpa.` para IPv4 ou `ip6.arpa.` para IPv6).

### 9. DHCP (Dynamic Host Configuration Protocol)

*   **Função Principal:** Automatizar a atribuição de endereços IP e outras configurações de rede (máscara de sub-rede, gateway padrão, servidores DNS) para dispositivos (clientes DHCP) em uma rede.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação.
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Cliente-Servidor:** O cliente DHCP solicita configurações de um servidor DHCP.
    *   **Atribuição Dinâmica de Endereços:** Permite que endereços IP sejam atribuídos a dispositivos de forma automática e temporária (concessão ou lease).
    *   **Processo DORA (Discover, Offer, Request, Acknowledge):**
        1.  **DHCPDISCOVER:** Cliente envia uma mensagem em broadcast para encontrar servidores DHCP.
        2.  **DHCPOFFER:** Servidores DHCP respondem com uma oferta de configuração IP.
        3.  **DHCPREQUEST:** Cliente seleciona uma oferta e solicita formalmente o endereço IP.
        4.  **DHCPACK (Acknowledge):** Servidor DHCP confirma a concessão do endereço IP e envia os parâmetros de configuração.
    *   **Concessão (Lease):** Endereços IP são concedidos por um período limitado. O cliente deve renovar a concessão antes que ela expire.
    *   **Tipos de Alocação:**
        *   **Dinâmica:** Endereços são atribuídos de um pool por um tempo limitado.
        *   **Automática:** Endereços são atribuídos permanentemente a um dispositivo na primeira vez que ele se conecta.
        *   **Manual (Reserva):** O administrador mapeia um endereço IP específico para um endereço MAC específico.
    *   **Portas Padrão:** UDP porta 67 (servidor) e UDP porta 68 (cliente).
    *   **Opções DHCP:** Permitem que o servidor forneça informações adicionais além do endereço IP (ex: servidores DNS, gateway, nome de domínio, servidores WINS, etc.).
    *   **Retransmissão DHCP (DHCP Relay Agent):** Permite que clientes DHCP em uma sub-rede obtenham configurações de um servidor DHCP em outra sub-rede.

### 10. SMTP (Simple Mail Transfer Protocol)

*   **Função Principal:** Protocolo padrão para o envio de mensagens de correio eletrônico (e-mail) entre servidores de e-mail (MTAs - Mail Transfer Agents) e de um cliente de e-mail (MUA - Mail User Agent) para um servidor de e-mail.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação.
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Orientado à Conexão:** Utiliza o TCP para garantir a entrega confiável das mensagens.
    *   **Porta Padrão:** TCP porta 25. Portas alternativas para envio seguro (com STARTTLS ou sobre SSL/TLS) incluem 587 (submission) e 465 (SMTPS - obsoleto mas ainda usado).
    *   **Protocolo de "Empurrar" (Push Protocol):** O cliente SMTP inicia a conexão e "empurra" a mensagem para o servidor.
    *   **Comandos em Texto Simples:** A comunicação entre cliente e servidor é feita através de comandos baseados em texto (ex: `HELO`, `EHLO`, `MAIL FROM:`, `RCPT TO:`, `DATA`, `QUIT`).
    *   **Não lida com o recebimento/leitura de e-mails da caixa postal pelo usuário final:** Para isso, são usados protocolos como POP3 ou IMAP.
    *   **MIME (Multipurpose Internet Mail Extensions):** Usado para suportar o envio de conteúdo não-texto (anexos, diferentes conjuntos de caracteres).
    *   **SMTP-AUTH:** Extensão para autenticação do cliente antes de permitir o envio de e-mails, para combater spam.

### 11. POP3 (Post Office Protocol version 3)

*   **Função Principal:** Protocolo usado por clientes de e-mail para recuperar mensagens de correio eletrônico de um servidor de e-mail (caixa postal).
*   **Camada:**
    *   TCP/IP: Camada de Aplicação.
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Orientado à Conexão:** Utiliza o TCP.
    *   **Porta Padrão:** TCP porta 110. Porta 995 para POP3S (POP3 sobre SSL/TLS).
    *   **Modo de Operação "Offline":**
        1.  Cliente se conecta ao servidor.
        2.  Autentica-se.
        3.  Baixa todas as mensagens para o dispositivo local.
        4.  Por padrão (mas configurável), apaga as mensagens do servidor após o download.
        5.  Desconecta-se.
        *   As mensagens são então lidas e gerenciadas localmente.
    *   **Simples:** Funcionalidade básica de download e exclusão de e-mails.
    *   **Menos adequado para acesso a partir de múltiplos dispositivos:** Como as mensagens são geralmente removidas do servidor, acessá-las de outro dispositivo pode não ser possível.

### 12. IMAP (Internet Message Access Protocol)

*   **Função Principal:** Protocolo usado por clientes de e-mail para acessar e gerenciar mensagens de correio eletrônico armazenadas em um servidor de e-mail.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação.
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Orientado à Conexão:** Utiliza o TCP.
    *   **Porta Padrão:** TCP porta 143. Porta 993 para IMAPS (IMAP sobre SSL/TLS).
    *   **Modo de Operação "Online":**
        *   As mensagens permanecem no servidor por padrão. O cliente acessa e manipula as mensagens diretamente no servidor.
        *   Permite que múltiplos clientes acessem a mesma caixa de correio simultaneamente, mantendo o estado das mensagens (lida, não lida, respondida, etc.) sincronizado entre eles.
    *   **Gerenciamento de Pastas no Servidor:** Permite criar, renomear e excluir pastas (caixas de correio) no servidor.
    *   **Acesso a Partes da Mensagem:** Permite que o cliente baixe apenas partes de uma mensagem (ex: apenas o cabeçalho, ou o texto sem os anexos), útil para conexões lentas.
    *   **Pesquisa no Servidor:** Permite que o cliente solicite ao servidor para pesquisar mensagens com base em critérios específicos.
    *   **Mais Complexo que o POP3:** Oferece mais funcionalidades e flexibilidade.

### 13. FTP (File Transfer Protocol)

*   **Função Principal:** Protocolo para transferência de arquivos entre um cliente e um servidor em uma rede TCP/IP.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação.
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Orientado à Conexão:** Utiliza TCP.
    *   **Duas Conexões:**
        *   **Conexão de Controle (Control Connection):** Estabelecida na porta TCP 21 do servidor. Usada para enviar comandos (ex: `USER`, `PASS`, `LIST`, `RETR`, `STOR`) e receber respostas do servidor. Permanece aberta durante toda a sessão.
        *   **Conexão de Dados (Data Connection):** Usada para a transferência real dos arquivos. É estabelecida dinamicamente.
            *   **Modo Ativo:** O cliente informa ao servidor um endereço IP e porta onde ele está ouvindo. O servidor inicia a conexão de dados para o cliente (a partir da porta 20 do servidor). Pode ser problemático com firewalls no lado do cliente.
            *   **Modo Passivo (PASV):** O cliente envia um comando `PASV` ao servidor. O servidor responde com um endereço IP e porta onde ele está ouvindo. O cliente inicia a conexão de dados para o servidor. Geralmente funciona melhor com firewalls.
    *   **Autenticação:** Requer nome de usuário e senha. Suporta acesso anônimo (`anonymous` ou `ftp` como usuário).
    *   **Modos de Transferência:**
        *   **ASCII:** Para arquivos de texto (realiza conversões de final de linha entre diferentes sistemas).
        *   **Binário (Image):** Para arquivos não-texto (executáveis, imagens, etc.). Transfere byte a byte sem modificação.
    *   **Comandos:** `GET` (baixar), `PUT` (enviar), `DELETE` (apagar), `LS` ou `DIR` (listar diretório), `CD` (mudar diretório), `MKDIR` (criar diretório), `PWD` (mostrar diretório atual).
    *   **Não é seguro por padrão:** Comandos e dados (incluindo senhas) são transmitidos em texto claro. Para segurança, usar FTPS (FTP sobre SSL/TLS) ou SFTP (SSH File Transfer Protocol, que é um protocolo diferente, não relacionado diretamente ao FTP).

Este resumo abrange os principais protocolos de rede solicitados, suas camadas e características, visando a preparação para o concurso de Perito em Informática.
