# Detalhamento dos Subtópicos de "11. Sistema Operacional Linux" (Edital Perito Criminal Federal – Área 3)

Este tópico aborda aspectos específicos do sistema operacional Linux, um sistema do tipo Unix de código aberto amplamente utilizado em servidores, desktops, dispositivos embarcados e móveis (Android é baseado no kernel Linux). Para um perito em informática forense, o conhecimento do Linux é crucial para analisar sistemas comprometidos, investigar atividades de rede, recuperar dados e entender a configuração e o funcionamento de diversos serviços.

---

## 11.1 Características do sistema operacional Linux.

*   **Explicação:** O Linux refere-se, estritamente falando, ao **kernel (núcleo)** do sistema operacional, criado por Linus Torvalds. No entanto, é comumente usado para descrever sistemas operacionais completos que utilizam o kernel Linux em conjunto com software do projeto GNU e outros componentes, formando as **distribuições Linux** (ex: Ubuntu, Debian, Fedora, CentOS, Arch Linux).
    *   **Características Principais:**
        *   **Código Aberto (Open Source):** O código-fonte do kernel Linux e de muitos dos seus componentes é livremente disponível, modificável e distribuível, sob licenças como a GPL (GNU General Public License - Licença Pública Geral GNU). Isso promove transparência, colaboração e customização.
        *   **Multiusuário (Multi-user):** Permite que múltiplos usuários acessem o sistema simultaneamente, cada um com seu próprio ambiente, arquivos e permissões.
        *   **Multitarefa (Multitasking):** Permite que múltiplos processos (programas em execução) rodem concorrentemente, compartilhando os recursos da UCP (Unidade Central de Processamento) através de técnicas de escalonamento. O Linux usa multitarefa preemptiva, onde o kernel pode interromper um processo para dar tempo de UCP a outro.
        *   **Portabilidade:** O kernel Linux foi portado para uma vasta gama de arquiteturas de hardware, desde sistemas embarcados e dispositivos móveis até supercomputadores.
        *   **Segurança Robusta:** Possui mecanismos de segurança incorporados, como permissões de arquivo, controle de acesso, e recursos como SELinux (Security-Enhanced Linux) e AppArmor para controle de acesso mandatório.
        *   **Sistema de Arquivos Hierárquico (Hierarchical File System):** Organiza arquivos e diretórios em uma única estrutura de árvore invertida, começando pelo diretório raiz (`/`). Tudo no Linux é tratado como um arquivo ou um processo.
        *   **Interface de Linha de Comando (CLI - Command-Line Interface) Poderosa:** O shell (ver item 11.4) oferece uma interface de texto robusta para interagir com o sistema, permitindo automação e gerenciamento avançado. Interfaces gráficas (GUIs - Graphical User Interfaces) também estão disponíveis (ex: GNOME, KDE).
        *   **Modularidade:** O kernel Linux é modular, permitindo que funcionalidades (como drivers de dispositivo e suporte a sistemas de arquivos) sejam carregadas e descarregadas dinamicamente como módulos do kernel (`.ko` - kernel objects).
        *   **Redes:** Suporte nativo e robusto ao protocolo TCP/IP e a uma vasta gama de protocolos e serviços de rede.
        *   **Estabilidade e Confiabilidade:** Conhecido por sua estabilidade, especialmente em servidores.
*   **Relevância Forense:**
    *   **Onipresença em Servidores:** Muitos servidores web, de banco de dados, de e-mail e outras infraestruturas críticas rodam Linux, tornando-o um alvo comum e um ambiente frequente em investigações.
    *   **Dispositivos Embarcados e IoT:** O Linux é amplamente usado em dispositivos como roteadores, DVRs, câmeras IP e dispositivos de Internet das Coisas (IoT - Internet of Things), que podem ser fontes de evidência ou vetores de ataque.
    *   **Análise de Malware para Linux:** Embora menos prevalente que para Windows, existe malware específico para Linux (vírus, worms, rootkits, ransomware, miners de criptomoeda).
    *   **Acesso a Código-Fonte:** A natureza de código aberto pode, em alguns casos, auxiliar na compreensão do funcionamento interno de componentes do sistema, embora a análise forense geralmente se concentre em binários e artefatos de execução.
    *   **Customização:** A flexibilidade do Linux significa que as configurações e os locais de artefatos podem variar significativamente entre diferentes distribuições ou sistemas customizados, exigindo adaptabilidade do perito.

---

## 11.2 Gerenciamento de usuários e permissões de acesso.

*   **Explicação:** Refere-se a como o Linux controla quem pode acessar o sistema e quais operações cada usuário pode realizar em arquivos e diretórios.
    *   **Contas de Usuário:**
        *   **Usuário Root (Superusuário):** O usuário com todos os privilégios no sistema (UID 0 - User Identifier ou Identificador de Usuário 0). Tem acesso irrestrito a todos os arquivos e comandos.
        *   **Usuários Comuns:** Contas para usuários regulares, com privilégios limitados para proteger o sistema contra alterações acidentais ou maliciosas.
        *   **Contas de Serviço/Sistema:** Usadas por daemons (processos de segundo plano) e serviços do sistema, geralmente com privilégios restritos e sem capacidade de login interativo.
        *   **Informações de Contas:**
            *   `/etc/passwd`: Arquivo que armazena informações sobre as contas de usuário (nome de usuário, UID, GID (Group Identifier ou Identificador de Grupo) primário, diretório home, shell padrão). As senhas (ou hashes de senha) não são mais armazenadas diretamente neste arquivo em sistemas modernos.
            *   `/etc/shadow`: Arquivo que armazena os hashes de senha dos usuários e informações sobre o envelhecimento da senha. Apenas o usuário root tem permissão de leitura.
            *   `/etc/group`: Arquivo que define os grupos de usuários e seus membros.
    *   **Grupos de Usuários:**
        *   Permitem agrupar usuários para facilitar o gerenciamento de permissões. Cada usuário pertence a um grupo primário e pode pertencer a múltiplos grupos secundários.
    *   **Permissões de Arquivo e Diretório (Modelo Tradicional Unix):**
        *   **Três Tipos de Permissões:**
            *   **Leitura (r - read):** Para arquivos, permite visualizar o conteúdo. Para diretórios, permite listar o conteúdo do diretório.
            *   **Escrita (w - write):** Para arquivos, permite modificar o conteúdo. Para diretórios, permite criar, deletar ou renomear arquivos dentro do diretório (requer também permissão de execução no diretório).
            *   **Execução (x - execute):** Para arquivos, permite executá-los (se forem programas ou scripts). Para diretórios, permite entrar (acessar) o diretório e acessar seus subdiretórios e arquivos (requer também permissão de leitura no diretório para listar seu conteúdo).
        *   **Três Categorias de Propriedade:**
            *   **Dono (Owner/User - u):** O usuário que criou o arquivo/diretório.
            *   **Grupo (Group - g):** O grupo ao qual o arquivo/diretório pertence.
            *   **Outros (Others - o):** Todos os outros usuários que não são o dono e não pertencem ao grupo.
        *   **Representação:**
            *   **Simbólica:** `rwxrwxrwx` (três conjuntos de rwx para dono, grupo e outros). Um `-` indica ausência de permissão.
            *   **Numérica (Octal):** Cada permissão tem um valor (r=4, w=2, x=1). A soma dos valores para cada categoria (dono, grupo, outros) forma um número octal de três dígitos (ex: `rwxr-x--x` = 751).
        *   **Bits Especiais de Permissão:**
            *   **SUID (Set User ID - Definir Identificador de Usuário):** Se definido em um arquivo executável, o programa roda com os privilégios do dono do arquivo (frequentemente root), e não do usuário que o executou. Perigoso se mal utilizado.
            *   **SGID (Set Group ID - Definir Identificador de Grupo):** Se definido em um executável, roda com os privilégios do grupo do arquivo. Se definido em um diretório, novos arquivos/subdiretórios criados nele herdam o grupo do diretório pai.
            *   **Sticky Bit (Bit Pegajoso):** Se definido em um diretório, apenas o dono do arquivo, o dono do diretório ou o root podem deletar ou renomear arquivos dentro daquele diretório, mesmo que outros tenham permissão de escrita no diretório (ex: diretório `/tmp`).
    *   **Listas de Controle de Acesso (ACLs - Access Control Lists):**
        *   Mecanismo mais granular que estende as permissões tradicionais Unix, permitindo definir permissões para usuários e grupos específicos além do dono/grupo/outros. Nem sempre habilitadas por padrão em todos os sistemas de arquivos.
    *   **Comandos Relacionados:** `chmod` (alterar permissões), `chown` (alterar dono), `chgrp` (alterar grupo), `ls -l` (listar permissões), `umask` (definir permissões padrão para novos arquivos/diretórios).
    *   **`sudo` (superuser do - executar como superusuário):** Comando que permite a usuários autorizados (definidos no arquivo `/etc/sudoers`) executar comandos como root ou outro usuário.
*   **Relevância Forense:**
    *   **Identificação de Contas:** Analisar `/etc/passwd`, `/etc/shadow`, `/etc/group` para identificar usuários, hashes de senha (para tentativa de quebra offline), membros de grupos privilegiados.
    *   **Análise de Privilégios:** Determinar as permissões de contas suspeitas e se houve escalação de privilégios (ex: exploração de SUID ou `sudo`).
    *   **Rastreamento de Atividades:** Associar atividades (logs, modificações de arquivos) a UIDs e GIDs específicos.
    *   **Verificação de Permissões Inseguras:** Arquivos ou diretórios com permissões excessivamente permissivas (ex: `777`) podem indicar configurações inseguras ou ações de malware.
    *   **Backdoors e Persistência:** Contas de usuário ou modificações em `/etc/sudoers` podem ser usadas por atacantes para manter acesso.
    *   **Artefatos de Login:** Logs como `/var/log/auth.log` (ou `secure`), `/var/log/wtmp`, `/var/log/btmp`, e o comando `last` registram tentativas de login, logons bem-sucedidos e falhos.

---

## 11.3 Configuração, administração e logs de sistema e de serviços: proxy, correio eletrônico, servidor Web, servidor de arquivos.

*   **Explicação:** Este tópico abrange o conhecimento sobre como os principais serviços de rede são configurados e administrados em sistemas Linux, e, crucialmente, os arquivos de registro (logs) que eles geram.
    *   **Logs de Sistema Gerais:**
        *   **Localização Comum:** Diretório `/var/log/`.
        *   **`syslog` ou `rsyslog` ou `journald`:** Serviços responsáveis por coletar, processar e armazenar mensagens de log de diversas fontes do sistema e de aplicações.
            *   `/var/log/syslog` ou `/var/log/messages`: Log geral do sistema, contendo mensagens do kernel, de serviços e de aplicações. Um dos primeiros lugares a se olhar.
            *   `/var/log/auth.log` (Debian/Ubuntu) ou `/var/log/secure` (Red Hat/CentOS): Logs de autenticação (logins, `sudo`, SSH, etc.).
            *   `/var/log/kern.log`: Mensagens específicas do kernel.
            *   `/var/log/dmesg`: Mensagens do buffer de anel do kernel (geralmente sobre hardware e drivers durante a inicialização).
            *   **Journald (systemd):** Sistema de logging mais moderno usado por muitas distribuições. Armazena logs em formato binário estruturado, acessíveis com o comando `journalctl`. Pode encaminhar para `rsyslog`.
        *   **Outros Logs Importantes:**
            *   `/var/log/wtmp`: Registros de login e logout (binário, lido com `who` ou `last`).
            *   `/var/log/btmp`: Registros de tentativas de login falhas (binário, lido com `lastb`).
            *   `/var/log/faillog`: Registros de falhas de login por usuário (binário, lido com `faillog`).
            *   Logs de gerenciadores de pacotes (ex: `/var/log/apt/history.log` no Debian/Ubuntu, `/var/log/yum.log` ou `/var/log/dnf.log` no Fedora/CentOS) mostram instalações, atualizações e remoções de software.
            *   Logs de `cron` (`/var/log/cron` ou no syslog): Registram a execução de tarefas agendadas.
    *   **Serviços Específicos:**
        *   **Servidor Proxy:**
            *   **Software Comum:** Squid, Nginx (também como proxy reverso), HAProxy.
            *   **Arquivos de Configuração:** Geralmente em `/etc/squid/squid.conf`, `/etc/nginx/nginx.conf`, etc.
            *   **Logs:**
                *   `access.log`: Registra todas as requisições que passam pelo proxy (IP do cliente, data/hora, URL solicitada, código de status HTTP, tamanho da resposta, user agent). Extremamente valioso.
                *   `cache.log` ou `error.log`: Logs de operação e erros do proxy.
            *   **Relevância Forense:** Logs de proxy são fundamentais para rastrear a atividade de navegação na web de usuários internos, identificar acesso a sites maliciosos, exfiltração de dados via HTTP/HTTPS, e entender o tráfego de rede de uma organização.
        *   **Servidor de Correio Eletrônico (E-mail):**
            *   **Software Comum (MTAs - Mail Transfer Agents):** Postfix, Sendmail, Exim. (MDAs - Mail Delivery Agents como Dovecot, Courier para IMAP/POP3).
            *   **Arquivos de Configuração:** Geralmente em `/etc/postfix/`, `/etc/mail/`, `/etc/exim/`.
            *   **Logs:**
                *   `maillog` ou `mail.log` (geralmente em `/var/log/`): Registra todas as atividades de e-mail, incluindo recebimento de e-mails (remetente, destinatário, IP de origem, message ID), tentativas de envio, retransmissões, erros, conexões SMTP/IMAP/POP3.
            *   **Relevância Forense:** Essenciais para rastrear a origem e o destino de e-mails, investigar phishing, spam, comprometimento de contas de e-mail, e analisar cabeçalhos de e-mail para identificar o caminho percorrido pela mensagem.
        *   **Servidor Web:**
            *   **Software Comum:** Apache HTTP Server, Nginx, Lighttpd.
            *   **Arquivos de Configuração:** Geralmente em `/etc/apache2/` (ou `/etc/httpd/`), `/etc/nginx/`.
            *   **Logs:**
                *   `access.log` (ou `access_log`): Registra cada requisição HTTP/HTTPS recebida pelo servidor (IP do cliente, data/hora, método HTTP (GET, POST), URL solicitada, código de status, user agent, referer).
                *   `error.log` (ou `error_log`): Registra erros do servidor web, erros em scripts (PHP, Python, etc.), tentativas de acesso a arquivos inexistentes.
            *   **Relevância Forense:** Logs de acesso são cruciais para investigar ataques a aplicações web (SQL injection, XSS, LFI/RFI), identificar IPs de atacantes, URLs acessadas, e entender o comportamento de web shells ou outros malwares baseados na web. Logs de erro podem indicar tentativas de exploração.
        *   **Servidor de Arquivos:**
            *   **Software Comum:** Samba (para compartilhamento compatível com Windows - SMB/CIFS), NFS (Network File System - para ambientes Unix/Linux).
            *   **Arquivos de Configuração:** `/etc/samba/smb.conf` para Samba, `/etc/exports` para NFS.
            *   **Logs:**
                *   **Samba:** Logs geralmente em `/var/log/samba/` (ex: `log.smbd`, `log.nmbd`, logs por cliente). Podem registrar acessos a compartilhamentos, autenticações, transferências de arquivos. O nível de log é configurável.
                *   **NFS:** O logging pode ser menos detalhado e depender de configurações do sistema ou de logs do kernel relacionados a RPC.
                *   Logs de auditoria do sistema de arquivos no servidor (se habilitados com `auditd` ou similar) podem registrar acessos a arquivos.
            *   **Relevância Forense:** Investigar acesso não autorizado a arquivos, exfiltração de dados, ou a propagação de malware através de compartilhamentos de rede.
*   **Administração e Configuração Geral:**
    *   **Conhecimento de Comandos:** Comandos para iniciar, parar, verificar status de serviços (ex: `systemctl status <serviço>`, `service <serviço> status`).
    *   **Gerenciamento de Pacotes:** `apt` (Debian/Ubuntu), `yum`/`dnf` (Red Hat/Fedora/CentOS) para verificar softwares instalados, suas versões e origens.
    *   **Tarefas Agendadas (Cron):** Arquivos `crontab` (em `/var/spool/cron/` para usuários, `/etc/crontab` e `/etc/cron.*/` para sistema) podem ser usados por malware para persistência.
*   **Relevância Forense Geral:**
    *   **Coleta de Logs:** Saber onde os logs relevantes estão localizados e como coletá-los de forma segura é fundamental.
    *   **Análise e Correlação de Logs:** Combinar informações de diferentes logs (sistema, serviços, rede) para construir uma imagem completa de um incidente.
    *   **Timestamps:** A sincronização de tempo (usando NTP - Network Time Protocol) entre sistemas é crucial para a correlação precisa de logs. Diferenças de fuso horário devem ser consideradas.
    *   **Identificação de Configurações Inseguras:** Configurações padrão ou fracas em serviços podem ser exploradas por atacantes.
    *   **Preservação:** Logs podem ser voláteis ou ter políticas de rotação (sobrescrita). A coleta rápida e a preservação adequada são importantes.

---

## 11.4 Shell e comandos.

*   **Explicação:**
    *   **Shell (Interpretador de Comandos):** Um programa que fornece uma interface de linha de comando (CLI) para o usuário interagir com o sistema operacional Linux. Ele interpreta os comandos digitados pelo usuário e os executa.
        *   **Shells Comuns:**
            *   **Bash (Bourne Again SHell):** O shell padrão na maioria das distribuições Linux. Poderoso, com recursos de scripting, histórico de comandos, completação de tab, etc.
            *   **sh (Bourne Shell):** Shell mais antigo e simples, frequentemente um link simbólico para Bash ou Dash em sistemas modernos.
            *   **Dash (Debian Almquist Shell):** Shell mais leve, focado em conformidade com POSIX, usado como `/bin/sh` padrão em algumas distribuições (como Ubuntu) para scripts de inicialização mais rápidos.
            *   **Outros:** ksh (KornShell), zsh (Z Shell), csh (C Shell), tcsh.
    *   **Comandos Linux:** Programas executáveis (geralmente pequenos utilitários) que realizam tarefas específicas. São invocados digitando seu nome no shell, opcionalmente seguido por argumentos e opções.
        *   **Estrutura Típica:** `comando [opções] [argumentos]`
        *   **Comandos Internos (Built-in):** Comandos que são parte do próprio shell (ex: `cd`, `pwd`, `echo`, `exit` no Bash).
        *   **Comandos Externos:** Programas executáveis localizados no sistema de arquivos (ex: `ls`, `cp`, `mv`, `grep`, `find`). O shell procura por eles nos diretórios especificados na variável de ambiente `PATH`.
    *   **Principais Categorias de Comandos e Exemplos (Foco Forense):**
        *   **Navegação e Listagem de Arquivos:**
            *   `ls`: Listar conteúdo de diretórios (opções: `-l` para formato longo, `-a` para mostrar arquivos ocultos, `-R` recursivo, `-i` para inodes).
            *   `cd`: Mudar diretório atual.
            *   `pwd`: Mostrar diretório de trabalho atual.
            *   `file`: Determinar o tipo de um arquivo.
            *   `stat`: Mostrar informações detalhadas do sistema de arquivos sobre um arquivo ou diretório (incluindo timestamps MAC e inode).
        *   **Manipulação de Arquivos e Diretórios:**
            *   `cp`: Copiar arquivos/diretórios.
            *   `mv`: Mover ou renomear arquivos/diretórios.
            *   `rm`: Remover arquivos/diretórios (cuidado!).
            *   `mkdir`: Criar diretório.
            *   `rmdir`: Remover diretório vazio.
            *   `touch`: Criar arquivo vazio ou atualizar timestamps.
            *   `cat`, `more`, `less`, `head`, `tail`: Visualizar conteúdo de arquivos de texto.
        *   **Busca de Arquivos e Conteúdo:**
            *   `find`: Procurar por arquivos/diretórios com base em critérios (nome, tipo, tamanho, data, permissões).
            *   `grep`: Procurar por padrões (texto, expressões regulares) dentro de arquivos. (Opções: `-i` insensível a maiúsculas/minúsculas, `-r` ou `-R` recursivo, `-n` número da linha, `-v` inverter correspondência).
            *   `locate` / `updatedb`: Encontrar arquivos rapidamente usando um banco de dados predefinido (pode não estar atualizado).
        *   **Gerenciamento de Processos:**
            *   `ps`: Listar processos em execução (opções: `aux`, `ef`).
            *   `top` / `htop`: Monitorar processos e uso de recursos em tempo real.
            *   `kill`: Enviar sinais para processos (ex: terminar um processo).
            *   `pstree`: Mostrar processos em formato de árvore.
            *   `lsof`: Listar arquivos abertos por processos (incluindo conexões de rede).
        *   **Informações do Sistema e Hardware:**
            *   `uname -a`: Mostrar informações do kernel e do sistema.
            *   `df -h`: Mostrar uso do espaço em disco dos sistemas de arquivos.
            *   `du -sh <diretório>`: Mostrar tamanho total de um diretório.
            *   `free -m`: Mostrar uso de memória RAM e swap.
            *   `lshw`, `lspci`, `lsusb`: Listar informações de hardware.
            *   `dmesg`: Mostrar mensagens do buffer do kernel.
        *   **Rede:**
            *   `ifconfig` (legado) / `ip addr`: Mostrar/configurar interfaces de rede.
            *   `netstat -tulnp` / `ss -tulnp`: Mostrar conexões de rede, portas de escuta, processos associados.
            *   `route -n` / `ip route`: Mostrar tabela de roteamento.
            *   `ping`: Testar conectividade com um host.
            *   `traceroute` / `mtr`: Rastrear a rota para um host.
            *   `nslookup` / `dig`: Consultar servidores DNS.
        *   **Usuários e Permissões:**
            *   `who`, `w`: Mostrar usuários logados.
            *   `last`, `lastb`: Mostrar histórico de logins/falhas.
            *   `id`: Mostrar UID, GID e grupos de um usuário.
            *   `sudo -l`: Listar comandos que o usuário atual pode executar com `sudo`.
        *   **Arquivamento e Compressão:**
            *   `tar`: Criar/extrair arquivos `tar` (arquivos de múltiplos arquivos). (Opções: `-c` criar, `-x` extrair, `-v` verboso, `-f` arquivo, `-z` gzip, `-j` bzip2).
            *   `gzip`, `gunzip`, `bzip2`, `bunzip2`, `zip`, `unzip`.
        *   **Análise de Dados e Hashes:**
            *   `md5sum`, `sha1sum`, `sha256sum`: Calcular hashes de arquivos.
            *   `strings`: Extrair cadeias de caracteres imprimíveis de arquivos binários.
            *   `xxd` / `hexdump` / `od`: Visualizar arquivos em formato hexadecimal/octal.
        *   **Redirecionamento e Pipes:**
            *   `>`: Redirecionar saída para um arquivo (sobrescreve).
            *   `>>`: Redirecionar saída para um arquivo (anexa).
            *   `<`: Redirecionar entrada de um arquivo.
            *   `|` (pipe): Enviar a saída de um comando como entrada para outro. (Ex: `ls -l | grep "arquivo"`).
        *   **Histórico de Comandos:**
            *   `history`: Exibe o histórico de comandos digitados no shell.
            *   Arquivo `~/.bash_history` (ou similar para outros shells) armazena o histórico.
*   **Relevância Forense:**
    *   **Ferramenta Primária de Interação:** Em muitos cenários forenses (especialmente em servidores ou sistemas sem GUI, ou ao analisar imagens de disco montadas em um ambiente Linux), o shell e os comandos são as principais ferramentas para navegar, localizar, visualizar e extrair evidências.
    *   **Automatização de Tarefas:** Scripts de shell (Bash scripts) são usados para automatizar tarefas repetitivas de coleta e análise forense.
    *   **Análise de Atividades do Usuário:** O histórico de comandos (`.bash_history`) pode revelar quais comandos um usuário (ou invasor) executou.
    *   **Identificação de Malware e Processos Suspeitos:** Comandos como `ps`, `netstat`, `lsof` são usados para identificar processos maliciosos e suas conexões de rede.
    *   **Coleta de Dados Voláteis:** Muitos comandos são usados para coletar dados voláteis de um sistema em execução antes de desligá-lo.
    *   **Compreensão de Scripts Maliciosos:** Atacantes frequentemente usam scripts shell para automatizar partes de seus ataques ou para persistência.
    *   **"Viver da Terra" (Living off the Land):** Atacantes podem usar comandos e utilitários padrão do Linux para realizar suas atividades, em vez de trazer ferramentas externas, para evitar detecção. O perito precisa conhecer esses comandos para identificar seu uso malicioso.

---
