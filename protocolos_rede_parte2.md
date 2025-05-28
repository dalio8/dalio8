# Protocolos de Rede Avançados para Concursos (Perito em Informática - CEBRASPE)

Este resumo aborda os protocolos de rede SSH e TLS/SSL, suas funções, camadas de operação e características chave, com foco no Modelo TCP/IP e mencionando o Modelo OSI quando relevante.

## Protocolos da Camada de Aplicação / Segurança

### 1. SSH (Secure Shell)

*   **Função Principal:** É um protocolo de rede criptográfico projetado para fornecer comunicação segura sobre uma rede insegura. Sua aplicação mais comum é o acesso remoto a shells (terminais) em sistemas operacionais do tipo Unix, permitindo a execução de comandos e a administração remota de servidores de forma segura.
*   **Camada:**
    *   TCP/IP: Camada de Aplicação (pois define a forma como as aplicações de terminal remoto e transferência de arquivos se comunicam).
    *   OSI: Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Segurança:** Utiliza criptografia forte para proteger a confidencialidade e a integridade dos dados transmitidos entre o cliente SSH e o servidor SSH. Substituiu protocolos inseguros como Telnet e rlogin, que transmitiam dados (incluindo senhas) em texto claro.
    *   **Autenticação:**
        *   **Autenticação do Servidor:** O cliente verifica a identidade do servidor usando a chave pública do servidor (geralmente armazenada em `~/.ssh/known_hosts` no cliente após a primeira conexão).
        *   **Autenticação do Cliente:** O servidor autentica o usuário através de vários métodos:
            *   **Senha:** O usuário fornece uma senha, que é transmitida de forma criptografada.
            *   **Chave Pública:** O usuário possui um par de chaves (pública e privada). A chave pública é armazenada no servidor (ex: no arquivo `~/.ssh/authorized_keys` do usuário). O cliente prova que possui a chave privada correspondente sem enviá-la pela rede. Este método é geralmente mais seguro e pode dispensar o uso de senhas.
    *   **Porta Padrão:** TCP porta 22.
    *   **Arquitetura Cliente-Servidor:** Um programa cliente SSH (ex: `ssh` no Linux/macOS, PuTTY no Windows) conecta-se a um daemon SSH (servidor, ex: `sshd`) no host remoto.
    *   **Versões:**
        *   **SSH-1:** Versão mais antiga, considerada obsoleta e insegura devido a vulnerabilidades conhecidas.
        *   **SSH-2:** Versão atual e mais segura, com melhorias significativas na criptografia e autenticação.
    *   **Funcionalidades Adicionais:**
        *   **Tunelamento (Port Forwarding):** Permite encapsular o tráfego de outros protocolos dentro de uma conexão SSH segura. Pode ser usado para:
            *   **Local Port Forwarding:** Redirecionar uma porta local para um serviço em um servidor remoto ou em outra máquina acessível pelo servidor remoto.
            *   **Remote Port Forwarding:** Redirecionar uma porta no servidor remoto para um serviço na máquina local do cliente ou em outra máquina acessível pelo cliente.
        *   **X11 Forwarding:** Permite executar aplicações gráficas (X11) de um servidor remoto e exibi-las na máquina local do cliente de forma segura.
        *   **Transferência de Arquivos Segura:**
            *   **SFTP (SSH File Transfer Protocol):** Um protocolo de transferência de arquivos que roda sobre SSH, fornecendo uma interface para navegar, transferir e gerenciar arquivos de forma segura. Não deve ser confundido com FTPS (FTP sobre SSL/TLS).
            *   **SCP (Secure Copy Protocol):** Um meio mais simples de transferir arquivos sobre SSH, baseado no comando `rcp` do Berkeley.
    *   **Gerenciamento de Chaves:** Utilitários como `ssh-keygen` são usados para criar pares de chaves pública/privada. `ssh-agent` e `ssh-add` podem ser usados para gerenciar chaves privadas e evitar a digitação repetida de senhas de chaves.

### 2. TLS/SSL (Transport Layer Security / Secure Sockets Layer)

*   **Função Principal:** São protocolos criptográficos projetados para fornecer segurança na comunicação sobre uma rede de computadores. O TLS é o sucessor do SSL. Eles garantem a privacidade (confidencialidade), integridade dos dados e autenticação das partes envolvidas (geralmente, pelo menos do servidor). São usados para proteger o tráfego de protocolos da camada de aplicação, como HTTP (resultando no HTTPS), SMTP, FTP, etc.
*   **Camada:**
    *   TCP/IP: Operam entre a Camada de Aplicação e a Camada de Transporte. As aplicações usam TLS/SSL como se fosse uma camada de transporte segura.
    *   OSI: Conceitualmente, suas funcionalidades se encaixam principalmente na Camada de Apresentação (Camada 6) devido à criptografia e formatação de dados, e também na Camada de Sessão (Camada 5) para o estabelecimento e gerenciamento da conexão segura. No entanto, são frequentemente acessados por protocolos da Camada de Aplicação (Camada 7).
*   **Características Chave:**
    *   **Privacidade/Confidencialidade:** Os dados transmitidos são criptografados usando criptografia simétrica. As chaves para essa criptografia são geradas unicamente para cada sessão e são negociadas durante o processo de handshake.
    *   **Integridade dos Dados:** Cada mensagem transmitida inclui um código de autenticação de mensagem (MAC - Message Authentication Code) ou similar (como em AEAD - Authenticated Encryption with Associated Data) para evitar a perda não detectada ou alteração dos dados durante a transmissão.
    *   **Autenticação:**
        *   **Autenticação do Servidor:** O servidor apresenta um certificado digital X.509 ao cliente. O cliente verifica a validade do certificado (emitido por uma Autoridade Certificadora - CA - confiável, dentro do período de validade, não revogado, e correspondente ao nome de domínio acessado).
        *   **Autenticação do Cliente (Opcional):** O cliente também pode apresentar um certificado digital ao servidor para autenticação mútua.
    *   **Handshake Protocol:**
        1.  **Negociação:** Cliente e servidor negociam a versão do protocolo TLS/SSL, o conjunto de cifras (cipher suite - algoritmos de troca de chaves, criptografia simétrica, função hash para MAC) a ser usado.
        2.  **Autenticação:** O servidor envia seu certificado digital (e, opcionalmente, o cliente envia o seu).
        3.  **Troca de Chaves:** Cliente e servidor estabelecem uma chave secreta compartilhada (chave de sessão) usando criptografia de chave pública (ex: RSA) ou um protocolo de acordo de chaves (ex: Diffie-Hellman). O uso de Diffie-Hellman com chaves efêmeras (DHE/ECDHE) fornece **Forward Secrecy** (sigilo adiante), garantindo que a comprometimento da chave privada de longo prazo do servidor não comprometa as chaves de sessão de comunicações passadas.
        4.  A conexão segura é estabelecida e os dados da aplicação podem ser trocados de forma criptografada.
    *   **Record Protocol:** Após o handshake, os dados da aplicação são fragmentados (ou agrupados), opcionalmente comprimidos, autenticados com um MAC e criptografados usando a chave de sessão negociada, formando registros TLS que são então enviados pela camada de transporte (geralmente TCP).
    *   **Versões:**
        *   **SSL 1.0, 2.0, 3.0:** Versões mais antigas, com SSL 3.0 sendo considerado inseguro (vulnerável ao ataque POODLE).
        *   **TLS 1.0 (RFC 2246 - 1999):** Primeira versão do TLS, sucessor do SSL 3.0.
        *   **TLS 1.1 (RFC 4346 - 2006):** Melhorias de segurança (ex: proteção contra ataques de injeção de IV).
        *   **TLS 1.2 (RFC 5246 - 2008):** Adicionou suporte a cifras mais fortes (como AES-GCM) e algoritmos de hash mais seguros (SHA-256). Amplamente utilizado.
        *   **TLS 1.3 (RFC 8446 - 2018):** Versão mais recente, com melhorias significativas em segurança e desempenho. Removeu algoritmos obsoletos, simplificou o handshake (reduzindo a latência), e melhorou a privacidade (criptografando mais partes do handshake).
    *   **HTTPS (HTTP Secure):** É o uso do HTTP sobre TLS/SSL, utilizando a porta TCP 443 por padrão.

Este resumo visa cobrir os aspectos mais importantes dos protocolos SSH e TLS/SSL para o concurso de Perito em Informática, focando em suas funções, camadas de operação e características chave.
