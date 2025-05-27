# Detalhamento dos Subtópicos de "10. Sistema Operacional Windows" (Edital Perito Criminal Federal – Área 3)

Este tópico aborda aspectos específicos do sistema operacional Windows, incluindo suas versões mais recentes para desktops e servidores, gerenciamento de usuários, logs de eventos e o Registro do Windows. Para um perito em informática forense, um conhecimento profundo do Windows é indispensável, pois é o sistema operacional mais comum em desktops e muitos servidores, sendo frequentemente o foco de investigações digitais.

---

## 10.1 Sistemas Windows: 10/11, Server 2019/2022.

*   **Explicação:** Este subtópico refere-se às versões mais recentes e relevantes do sistema operacional Microsoft Windows, tanto para estações de trabalho (desktops/laptops) quanto para servidores. O conhecimento sobre suas características, arquitetura e artefatos específicos é crucial.
    *   **Windows 10/11 (Versões Cliente/Desktop):**
        *   **Características Comuns:** Interface gráfica moderna (Fluent Design no Windows 11), Microsoft Store (loja de aplicativos), navegador Microsoft Edge, assistente virtual Cortana, Windows Hello (autenticação biométrica/PIN), Windows Defender (antivírus integrado), BitLocker (criptografia de disco), PowerShell (poderoso shell de linha de comando e linguagem de script), Subsistema Windows para Linux (WSL).
        *   **Windows 10:** Lançado em 2015, com múltiplas atualizações de funcionalidades (ex: Anniversary Update, Creators Update). Foco em "Windows como um Serviço".
        *   **Windows 11:** Lançado em 2021, sucessor do Windows 10. Requisitos de hardware mais rigorosos (TPM 2.0, Secure Boot). Design visual renovado (menu Iniciar centralizado, cantos arredondados), melhorias em multitarefa (Snap Layouts), integração com Microsoft Teams, suporte a aplicativos Android (via Amazon Appstore).
        *   **Relevância Forense (10/11):**
            *   **Artefatos Comuns:** Perfil de usuário (`C:\Users\<username>`), incluindo pastas como Documentos, Downloads, Desktop, AppData (com configurações de aplicativos, histórico de navegador, etc.).
            *   **Registro do Windows:** (Ver item 10.4) Fonte rica de informações sobre configurações do sistema, atividades do usuário, dispositivos conectados.
            *   **Logs de Eventos:** (Ver item 10.3) Registram atividades do sistema, segurança, aplicativos.
            *   **Pontos de Restauração do Sistema e Cópias de Sombra de Volume (Volume Shadow Copies):** Podem conter versões anteriores de arquivos e do Registro.
            *   **Lixeira (Recycle Bin):** Arquivos "deletados".
            *   **Prefetch e Superfetch/SysMain:** Arquivos que indicam quais aplicações foram executadas.
            *   **Shellbags:** Registram preferências de visualização de pastas do usuário no Explorer.
            *   **LNK files (atalhos) e Jump Lists:** Indicam acesso a arquivos e aplicativos.
            *   **Histórico de Atividades (Timeline no Windows 10):** Pode registrar atividades do usuário em aplicativos.
            *   **BitLocker:** Se habilitado, a análise do disco requer a chave de recuperação ou senha.
    *   **Windows Server 2019/2022 (Versões para Servidor):**
        *   **Características Comuns:** Baseados no mesmo núcleo (kernel) das versões desktop correspondentes (Windows 10 para Server 2019, e base similar ao Windows 11 para Server 2022, embora o Server 2022 tenha sido lançado antes do Windows 11 e seja baseado no núcleo "Iron"). Foco em estabilidade, segurança, gerenciamento de rede e serviços de infraestrutura.
        *   **Funções (Roles) e Recursos (Features):** Permitem que o servidor seja configurado para tarefas específicas, como Controlador de Domínio (Active Directory Domain Services), Servidor de Arquivos, Servidor Web (IIS), Servidor DHCP, Servidor DNS, Hyper-V (virtualização).
        *   **Windows Server 2019:** Melhorias em segurança (Windows Defender ATP, Shielded VMs), nuvem híbrida (integração com Azure), infraestrutura hiperconvergente (Storage Spaces Direct).
        *   **Windows Server 2022:** Foco em segurança multicamadas (Secured-core server), conectividade híbrida com Azure Arc, melhorias na plataforma de contêineres Windows.
        *   **Opções de Instalação:**
            *   **Server Core:** Instalação mínima sem GUI, gerenciada por linha de comando (PowerShell, Sconfig) ou remotamente. Menor superfície de ataque.
            *   **Server com Experiência Desktop (Desktop Experience):** Instalação completa com a GUI tradicional.
        *   **Relevância Forense (Server 2019/2022):**
            *   **Logs de Funções Específicas:**
                *   **Active Directory (AD):** Logs de eventos de segurança em Controladores de Domínio são cruciais para investigar alterações de contas, logins, modificações de grupo (ex: eventos de criação de usuário, adição a grupos privilegiados, falhas de logon). Artefatos do AD incluem o banco de dados `NTDS.DIT`.
                *   **Servidor Web (IIS):** Logs de acesso (`u_exYYMMDD.log`) registram requisições HTTP/HTTPS, IPs de origem, URLs acessadas, user agents.
                *   **Servidor DNS:** Logs de consultas DNS (se habilitados).
                *   **Servidor DHCP:** Logs de concessão de endereços IP.
            *   **Logs de Eventos do Windows:** (Ver item 10.3) Similar aos desktops, mas com eventos adicionais relacionados às funções do servidor.
            *   **Registro do Windows:** (Ver item 10.4) Contém configurações específicas do servidor.
            *   **Análise de Configurações de Segurança:** Permissões de compartilhamento de arquivos, políticas de grupo (Group Policies), configurações de firewall do Windows.
            *   **Máquinas Virtuais (Hyper-V):** Se o servidor for um host Hyper-V, a análise pode envolver as VMs hospedadas (seus discos virtuais VHDX/VHD e configurações).
*   **Relevância Forense Geral:**
    *   A maioria das investigações envolverá sistemas Windows. O perito deve estar familiarizado com a estrutura de diretórios, locais comuns de artefatos, e as diferenças entre versões cliente e servidor.
    *   Entender as funcionalidades específicas de cada versão ajuda a saber onde procurar por evidências relevantes para o caso.

---

## 10.2 Gerenciamento de usuários e permissões de acesso.

*   **Explicação:** Refere-se a como o Windows controla quem pode acessar o sistema e quais ações esses usuários podem realizar em arquivos, pastas e outros recursos.
    *   **Contas de Usuário:**
        *   **Tipos de Contas Locais:**
            *   **Administrador (Administrator):** Conta com privilégios máximos no sistema local. Por padrão, a conta "Administrador" interna é desabilitada em instalações recentes, mas a primeira conta de usuário criada durante a instalação geralmente recebe privilégios administrativos.
            *   **Usuário Padrão (Standard User):** Possui privilégios limitados, não podendo fazer alterações que afetem todo o sistema ou outros usuários (ex: instalar a maioria dos softwares, alterar configurações do sistema).
            *   **Convidado (Guest):** Conta com privilégios muito limitados, geralmente desabilitada por padrão.
        *   **Contas de Domínio (em ambientes com Active Directory):**
            *   As contas são gerenciadas centralmente no Controlador de Domínio. Os usuários podem fazer logon em qualquer máquina que faça parte do domínio (sujeito a permissões).
            *   **Exemplos:** Usuários de domínio, Administradores de Domínio (Domain Admins - altamente privilegiados em todo o domínio), Administradores Corporativos (Enterprise Admins - privilégios em toda a floresta AD).
        *   **Identificadores de Segurança (SIDs - Security Identifiers):** Valores únicos de tamanho variável que identificam uma entidade de segurança (usuário, grupo, computador) no Windows.
            *   **Formato:** `S-R-I-S1-S2-...-Sn` (ex: `S-1-5-21-xxxx-yyyy-zzzz-1001`).
            *   O SID da conta "Administrador" local sempre termina com `-500`. O SID da conta "Convidado" local sempre termina com `-501`.
    *   **Grupos de Usuários:**
        *   Coleções de contas de usuário que facilitam o gerenciamento de permissões. As permissões podem ser atribuídas a um grupo, e todos os membros do grupo herdam essas permissões.
        *   **Grupos Locais Embutidos:** Administradores, Usuários, Convidados, Usuários Avançados (Power Users - legado), Operadores de Backup, etc.
        *   **Grupos de Domínio (Active Directory):** Grupos Globais, Grupos Locais de Domínio, Grupos Universais.
    *   **Permissões de Acesso (Sistema de Arquivos NTFS):**
        *   **ACLs (Access Control Lists - Listas de Controle de Acesso):** Associadas a cada arquivo e pasta em volumes NTFS. Uma ACL é composta por múltiplas **ACEs (Access Control Entries - Entradas de Controle de Acesso)**.
        *   **ACEs:** Cada ACE especifica um SID (de um usuário ou grupo) e as permissões (Permitir ou Negar) que esse SID tem sobre o objeto.
        *   **Tipos de Permissões NTFS:** Controle Total, Modificar, Ler e Executar, Listar Conteúdo da Pasta, Ler, Gravar. Permissões especiais (avançadas) oferecem controle mais granular.
        *   **Herança de Permissões:** Por padrão, arquivos e subpastas herdam permissões da pasta pai, mas a herança pode ser desabilitada ou modificada.
        *   **Propriedade (Ownership):** Cada arquivo e pasta tem um proprietário (geralmente quem o criou), que tem controle implícito sobre as permissões do objeto.
    *   **Outras Permissões:**
        *   **Permissões de Compartilhamento (Share Permissions):** Controlam o acesso a pastas compartilhadas na rede. São mais simples que as permissões NTFS (Controle Total, Alterar, Ler). Quando um recurso é acessado pela rede, as permissões NTFS e as de compartilhamento são combinadas, e a permissão mais restritiva prevalece.
        *   **Permissões do Registro:** ACLs também são usadas para proteger chaves do Registro.
        *   **Direitos de Usuário (User Rights):** Definem privilégios no nível do sistema (ex: "Fazer logon localmente", "Alterar a hora do sistema", "Fazer backup de arquivos e diretórios"). Gerenciados através de Políticas de Grupo (Group Policy) ou Política de Segurança Local.
    *   **UAC (User Account Control - Controle de Conta de Usuário):**
        *   Recurso de segurança que ajuda a prevenir alterações não autorizadas no computador. Solicita confirmação ou credenciais administrativas antes de permitir ações que exijam privilégios elevados, mesmo para usuários administradores (princípio do token dividido).
*   **Relevância Forense:**
    *   **Identificação de Contas:** Determinar quais contas de usuário existem no sistema (locais e, se aplicável, de domínio que logaram na máquina), quando foram criadas, último logon, se estão ativas ou desabilitadas. Informações encontradas no SAM (Security Account Manager - Gerenciador de Contas de Segurança) (para contas locais) e no Active Directory.
    *   **Análise de Privilégios:** Verificar os privilégios de uma conta suspeita (é administrador? pertence a quais grupos?) para entender o que ela poderia fazer no sistema.
    *   **Rastreamento de Atividades:** Vincular atividades (logs de eventos, acesso a arquivos) a contas de usuário específicas.
    *   **Investigação de Acesso Não Autorizado:** Analisar permissões em arquivos e pastas comprometidos para ver como o acesso foi obtido ou se as permissões foram alteradas por um invasor.
    *   **Escalação de Privilégios:** Investigar como um atacante pode ter elevado seus privilégios de um usuário padrão para administrador.
    *   **Criação de Contas Suspeitas:** Identificar contas criadas por malware ou invasores para manter persistência.
    *   **SIDs:** Úteis para rastrear usuários/grupos mesmo que os nomes sejam alterados. SIDs de contas deletadas podem permanecer em ACLs de arquivos.

---

## 10.3 Log de eventos do Windows.

*   **Explicação:** O serviço de Log de Eventos do Windows registra informações sobre eventos significativos de hardware e software que ocorrem no sistema. Esses logs são uma fonte primária de informação para solucionar problemas, monitorar a segurança e investigar incidentes.
    *   **Localização Padrão:** Os arquivos de log de eventos (`.evtx`) são armazenados em `C:\Windows\System32\winevt\Logs\`.
    *   **Visualizador de Eventos (Event Viewer):** Ferramenta gráfica do Windows para visualizar e gerenciar os logs.
    *   **Principais Categorias de Logs (Windows Vista e posteriores):**
        *   **Logs do Windows (Windows Logs):**
            *   **Aplicativo (Application):** Eventos registrados por aplicativos ou programas. Desenvolvedores de software decidem quais eventos seus aplicativos registram aqui.
                *   *Exemplos:* Erros de aplicativo, eventos de bancos de dados (SQL Server), etc.
            *   **Segurança (Security):** Contém eventos relacionados à segurança, como tentativas de logon (bem-sucedidas e falhas), acesso a objetos (se a auditoria estiver habilitada), alterações em políticas de segurança, uso de privilégios. **Crucial para forense.**
                *   *Exemplos de IDs de Evento (Event IDs) importantes:*
                    *   `4624`: Logon bem-sucedido.
                    *   `4625`: Falha de logon.
                    *   `4634`: Logoff.
                    *   `4672`: Logon com privilégios especiais (administrativos).
                    *   `4720`: Criação de conta de usuário.
                    *   `4726`: Exclusão de conta de usuário.
                    *   `4688`: Novo processo foi criado (se a auditoria de processo estiver habilitada).
            *   **Instalação (Setup):** Eventos relacionados à instalação e configuração do Windows e de atualizações.
            *   **Sistema (System):** Eventos registrados por componentes do sistema operacional Windows (ex: drivers, serviços do sistema). Contém informações sobre inicialização e desligamento do sistema, erros de hardware, falhas de serviço.
                *   *Exemplos de IDs de Evento importantes:*
                    *   `6005`: O serviço de Log de Eventos foi iniciado (indica inicialização do sistema).
                    *   `6006`: O serviço de Log de Eventos foi parado (indica desligamento do sistema).
                    *   `7036`: Um serviço entrou em estado de execução ou parado.
            *   **Eventos Encaminhados (Forwarded Events):** Eventos coletados de outros computadores (configuração de coleta de logs).
        *   **Logs de Aplicativos e Serviços (Applications and Services Logs):** Logs mais específicos de aplicativos individuais e serviços da Microsoft e de terceiros. Podem ser muito detalhados.
            *   *Exemplos:* Logs do Microsoft Office, PowerShell, Windows Defender, BitLocker, logs de drivers específicos.
    *   **Informações em Cada Evento:** Data e hora, ID do evento, nível (Informação, Aviso, Erro, Crítico), origem (software que registrou o evento), nome do usuário (se aplicável), nome do computador, descrição detalhada do evento (pode incluir IPs, nomes de arquivo, etc.).
    *   **Políticas de Auditoria:** A quantidade e o tipo de informação registrada nos logs de segurança dependem das políticas de auditoria configuradas no sistema (via Política de Grupo Local ou de Domínio). Por padrão, nem todos os eventos de segurança úteis são auditados.
*   **Relevância Forense:**
    *   **Trilha de Auditoria Fundamental:** Os logs de eventos são uma das fontes mais importantes para reconstruir as atividades que ocorreram em um sistema Windows.
    *   **Investigação de Logons:** Identificar quem logou, quando, de onde (IP de origem para logons de rede), e o tipo de logon (interativo, rede, serviço).
    *   **Rastreamento de Execução de Programas:** O evento 4688 (criação de processo), se habilitado, pode mostrar quais programas foram executados, por quem e quando. (Logs de PowerShell e outros logs de aplicação também são úteis aqui).
    *   **Detecção de Atividades Maliciosas:** Eventos de falha de logon repetidas, criação de contas suspeitas, parada de serviços de segurança, erros de sistema incomuns.
    *   **Linha do Tempo de Eventos:** Correlacionar eventos de diferentes logs para construir uma linha do tempo detalhada de um incidente.
    *   **Identificação de Alterações no Sistema:** Eventos de instalação de software, alterações em serviços, modificações de políticas.
    *   **Desafios:**
        *   **Sobrescrita de Logs:** Logs podem ser configurados para sobrescrever eventos antigos quando atingem um tamanho máximo, podendo levar à perda de informações históricas.
        *   **Adulteração/Exclusão de Logs:** Atacantes avançados podem tentar limpar ou modificar os logs de eventos para ocultar seus rastros (embora isso possa, por si só, deixar outros artefatos ou ser detectado).
        *   **Volume de Dados:** Em sistemas movimentados, os logs podem ser muito volumosos, exigindo ferramentas para filtrar e analisar eficientemente.
        *   **Configuração de Auditoria:** Se a auditoria não estiver configurada adequadamente, eventos cruciais podem não ser registrados.

---

## 10.4 Registro do Windows.

*   **Explicação:**
    *   **Conceito:** Um banco de dados hierárquico que armazena informações de configuração de baixo nível para o sistema operacional Microsoft Windows e para muitos dos aplicativos que rodam no Windows. Contém configurações de hardware, software, perfis de usuário, tipos de arquivo, e muito mais.
    *   **Estrutura:** Organizado em uma estrutura de árvore lógica:
        *   **Colmeias (Hives):** Arquivos físicos no disco que contêm partes do Registro. São carregados na memória quando o sistema é iniciado ou quando um usuário faz logon.
            *   **Principais Arquivos de Colmeia e Localização (variam um pouco entre versões do Windows):**
                *   `SAM`: `C:\Windows\System32\config\SAM` (contém informações de contas de usuário locais e grupos, incluindo hashes de senha).
                *   `SECURITY`: `C:\Windows\System32\config\SECURITY` (contém políticas de segurança do sistema local).
                *   `SOFTWARE`: `C:\Windows\System32\config\SOFTWARE` (contém configurações de software e do sistema operacional aplicáveis a todos os usuários).
                *   `SYSTEM`: `C:\Windows\System32\config\SYSTEM` (contém informações sobre a configuração de hardware do sistema, drivers, serviços e inicialização do Windows).
                *   `DEFAULT`: `C:\Windows\System32\config\DEFAULT` (modelo para o perfil de novo usuário).
                *   `NTUSER.DAT`: Localizado no diretório de perfil de cada usuário (`C:\Users\<username>\NTUSER.DAT`). Contém as configurações específicas do perfil desse usuário (HKCU).
                *   `UsrClass.dat`: Localizado em `%USERPROFILE%\AppData\Local\Microsoft\Windows\UsrClass.dat`. Contém informações de registro de classe COM específicas do usuário.
            *   **Arquivos de Log de Transação da Colmeia:** Arquivos `.LOG1`, `.LOG2` no mesmo diretório das colmeias, usados para garantir a integridade das colmeias em caso de falha durante uma escrita.
        *   **Chaves (Keys):** Contêineres no Registro, análogos a pastas em um sistema de arquivos. Podem conter outras chaves (subchaves) e valores.
        *   **Valores (Values):** Pares nome-dado dentro das chaves, análogos a arquivos. Cada valor tem um nome, um tipo de dado e os próprios dados.
            *   **Tipos de Dados Comuns:** `REG_SZ` (string), `REG_EXPAND_SZ` (string expansível com variáveis de ambiente), `REG_BINARY` (dados binários), `REG_DWORD` (inteiro de 32 bits), `REG_QWORD` (inteiro de 64 bits), `REG_MULTI_SZ` (múltiplas strings).
        *   **Raízes do Registro (Root Keys ou Predefined Keys):** Pontos de entrada lógicos para a hierarquia do Registro, visíveis no Editor do Registro (Regedit). São visualizações de colmeias ou combinações delas.
            *   `HKEY_CLASSES_ROOT` (HKCR): Informações sobre associações de arquivos e registros de objetos COM.
            *   `HKEY_CURRENT_USER` (HKCU): Perfil do usuário atualmente logado (um link para a seção do usuário dentro de `HKEY_USERS`).
            *   `HKEY_LOCAL_MACHINE` (HKLM): Configurações específicas da máquina (hardware, software do sistema). As colmeias SAM, SECURITY, SOFTWARE e SYSTEM são montadas aqui.
            *   `HKEY_USERS` (HKU): Contém o `NTUSER.DAT` de todos os perfis de usuário carregados, bem como o perfil padrão.
            *   `HKEY_CURRENT_CONFIG` (HKCC): Informações sobre o perfil de hardware atual usado na inicialização do sistema.
    *   **Editor do Registro (Regedit.exe):** Ferramenta do Windows para visualizar e modificar o Registro.
*   **Relevância Forense:**
    *   **Fonte Crítica de Evidências:** O Registro do Windows é uma das fontes mais ricas de artefatos forenses em um sistema Windows. Contém um vasto histórico de atividades do sistema e do usuário.
    *   **Informações sobre Usuários:**
        *   `SAM`: Nomes de usuário, SIDs, último logon, último logon com falha, contagem de logons, informações de política de senha, e **hashes de senha** (LM hash - legado e fraco, NTLM hash).
        *   `NTUSER.DAT`: Configurações específicas do usuário, lista de programas executados recentemente (MRU - Most Recently Used), histórico de pesquisa, dispositivos USB conectados pelo usuário (via subchaves de Enum\USBSTOR), programas configurados para iniciar com o usuário.
    *   **Informações sobre Software:**
        *   Programas instalados (`SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`).
        *   Programas configurados para iniciar automaticamente com o sistema (`SOFTWARE\Microsoft\Windows\CurrentVersion\Run`, `RunOnce`, etc., tanto em HKLM quanto em HKCU).
        *   Histórico de execução de aplicativos (ex: `AppCompatCache` ou `ShimCache` na colmeia SYSTEM, `UserAssist` em NTUSER.DAT).
    *   **Informações sobre Hardware e Dispositivos:**
        *   Dispositivos USB conectados (`SYSTEM\CurrentControlSet\Enum\USBSTOR`): Contém Vendor ID, Product ID, e em alguns casos, número de série do dispositivo, e timestamps de primeira/última conexão.
        *   Configurações de rede (`SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces`).
    *   **Informações de Atividade do Sistema:**
        *   Hora do último desligamento (`SYSTEM\CurrentControlSet\Control\Windows\ShutdownTime`).
        *   Fuso horário do sistema (`SYSTEM\CurrentControlSet\Control\TimeZoneInformation`).
    *   **Persistência de Malware:** Muitos malwares modificam o Registro para garantir sua execução automática na inicialização do sistema (ex: chaves Run, serviços, drivers).
    *   **Recuperação de Chaves do Registro:**
        *   **Análise Offline:** Analisar os arquivos de colmeia de uma imagem forense usando ferramentas como Registry Explorer, RegRipper, Autopsy.
        *   **Análise Online (Live):** Acessar o Registro do sistema em execução (com cautela para não alterar evidências).
        *   **Logs de Transação (.LOG1, .LOG2):** Podem conter alterações recentes no Registro que ainda não foram consolidadas nas colmeias principais, potencialmente revelando atividades que ocorreram pouco antes do sistema ser desligado ou da imagem ser feita.
        *   **Cópias de Sombra de Volume:** Podem conter versões anteriores dos arquivos de colmeia.
    *   **Desafios:** O tamanho e a complexidade do Registro podem ser intimidadores. A interpretação de certas chaves e valores requer conhecimento especializado. Malwares podem tentar ocultar suas entradas no Registro ou usar técnicas de ofuscação.

---
