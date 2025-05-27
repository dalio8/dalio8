# Detalhamento dos Subtópicos de "7. Segurança da informação" (Edital Perito Criminal Federal – Área 3)

Este tópico aborda os princípios, normas, tecnologias e práticas relacionadas à proteção de sistemas de informação contra acesso não autorizado, uso, divulgação, alteração, interrupção ou destruição. Para um perito em informática forense, o conhecimento em segurança da informação é fundamental para entender como os sistemas são (ou deveriam ser) protegidos, como as falhas de segurança ocorrem, como os incidentes são investigados e como as evidências de comprometimento podem ser identificadas e analisadas.

---

## 7.1 Normas NBR ISO/IEC nº 27001:2022 e nº 27002:2022.

*   **Explicação:**
    *   A família ISO/IEC 27000 é um conjunto de padrões internacionais para a gestão da segurança da informação. As normas NBR são as versões brasileiras desses padrões, publicadas pela ABNT (Associação Brasileira de Normas Técnicas).
    *   **NBR ISO/IEC 27001:2022 (Tecnologia da informação — Técnicas de segurança — Sistemas de gestão da segurança da informação — Requisitos):**
        *   **Conceito:** Especifica os requisitos para estabelecer, implementar, manter e melhorar continuamente um **Sistema de Gestão da Segurança da Informação (SGSI)** dentro do contexto de uma organização. Um SGSI é uma abordagem sistemática para gerenciar informações sensíveis da empresa de forma que permaneçam seguras. Envolve pessoas, processos e sistemas de TI aplicando um processo de gerenciamento de riscos.
        *   **Estrutura:** Segue a Estrutura de Alto Nível (HLS - High-Level Structure) da ISO, o que facilita a integração com outros sistemas de gestão (como ISO 9001 para qualidade).
        *   **Requisitos:** Inclui requisitos para o contexto da organização, liderança, planejamento (abordagem de riscos e oportunidades, definição de objetivos de segurança da informação), suporte (recursos, competência, conscientização, comunicação, informação documentada), operação (planejamento e controle operacional, avaliação de riscos de segurança da informação, tratamento de riscos), avaliação de desempenho (monitoramento, medição, análise, avaliação, auditoria interna, análise crítica pela direção) e melhoria (não conformidade e ação corretiva, melhoria contínua).
        *   **Anexo A:** Fornece uma lista de referência de controles de segurança da informação (detalhados na ISO/IEC 27002) que podem ser selecionados como parte do processo de tratamento de riscos. A versão 2022 do Anexo A foi atualizada para se alinhar com os controles da ISO/IEC 27002:2022.
        *   **Certificação:** Organizações podem ser certificadas na ISO/IEC 27001 por um organismo de certificação credenciado, demonstrando que seu SGSI atende aos requisitos da norma.
    *   **NBR ISO/IEC 27002:2022 (Segurança da informação, segurança cibernética e proteção à privacidade — Controles de segurança da informação):**
        *   **Conceito:** Fornece um conjunto de referência de **controles genéricos de segurança da informação**, incluindo diretrizes de implementação. É um código de prática que serve como um guia para selecionar e implementar os controles listados no Anexo A da ISO/IEC 27001 (e para outras finalidades de gestão de segurança). Não é uma norma certificável por si só, mas apoia a certificação 27001.
        *   **Estrutura (Versão 2022):** A versão 2022 reorganizou os controles em quatro temas principais (em vez das 14 seções da versão anterior):
            *   **Controles Organizacionais (Organizational controls):** Ex: políticas de segurança, papéis e responsabilidades, gestão de ativos, segurança em projetos.
            *   **Controles de Pessoas (People controls):** Ex: triagem de pessoal, conscientização e treinamento, processo disciplinar, trabalho remoto.
            *   **Controles Físicos (Physical controls):** Ex: perímetro de segurança física, controle de acesso físico, segurança de escritórios e instalações, proteção contra ameaças ambientais, segurança de equipamentos.
            *   **Controles Tecnológicos (Technological controls):** Ex: autenticação, controle de acesso lógico, criptografia, segurança de redes, backup, logging, desenvolvimento seguro.
        *   **Atributos:** A versão 2022 introduziu atributos para cada controle (ex: tipo de controle (preventivo, detetive, corretivo), propriedades de segurança da informação (confidencialidade, integridade, disponibilidade), conceitos de cibersegurança (identificar, proteger, detectar, responder, recuperar), capacidades operacionais, domínios de segurança). Esses atributos permitem diferentes formas de categorizar e visualizar os controles.
*   **Relevância Forense:**
    *   **Contexto da Investigação:** Em investigações envolvendo empresas ou organizações, o conhecimento dessas normas pode ajudar o perito a entender o framework de segurança da informação que *deveria* estar implementado.
    *   **Identificação de Falhas:** Se uma organização certificada na ISO 27001 sofre um incidente, a análise pode verificar se os controles definidos no SGSI falharam ou não foram corretamente implementados.
    *   **Análise de Políticas e Procedimentos:** As normas exigem documentação. O perito pode solicitar e analisar políticas de segurança, avaliações de risco, declarações de aplicabilidade (SoA - Statement of Applicability), relatórios de auditoria interna, que podem fornecer contexto sobre o ambiente de segurança e as práticas da organização.
    *   **Avaliação de Controles:** O perito pode usar a ISO 27002 como referência para avaliar a adequação dos controles de segurança de uma organização investigada, mesmo que ela não seja certificada. Isso pode ajudar a identificar negligência ou falhas que contribuíram para o incidente.
    *   **Coleta de Evidências:** Saber quais controles são esperados (ex: logs, backups, trilhas de auditoria) pode direcionar a coleta de evidências. Por exemplo, a ISO 27002 recomenda controles de logging e monitoramento; se esses logs não existem ou são insuficientes, isso pode ser um achado relevante.

---

## 7.2 Desenvolvimento seguro de aplicações: SDL, CLASP e OWASP Top 10.

*   **Explicação:** Práticas e metodologias para incorporar a segurança em todo o ciclo de vida do desenvolvimento de software (SDLC - Software Development Life Cycle), desde a concepção até a implantação e manutenção, com o objetivo de reduzir vulnerabilidades e criar aplicações mais resilientes a ataques.
    *   **SDL (Security Development Lifecycle - Ciclo de Vida de Desenvolvimento de Segurança):**
        *   **Conceito:** Um processo abrangente de garantia de segurança proposto pela Microsoft (mas com princípios aplicáveis universalmente). Adiciona uma série de atividades e entregáveis focados em segurança em cada fase do ciclo de vida de desenvolvimento de software tradicional.
        *   **Fases Típicas e Atividades de Segurança:**
            *   **Treinamento:** Todos os envolvidos no desenvolvimento (desenvolvedores, testadores, gerentes de projeto) recebem treinamento em segurança.
            *   **Requisitos:** Definir requisitos de segurança e privacidade no início do projeto.
            *   **Design (Projeto):** Realizar modelagem de ameaças (threat modeling) para identificar potenciais ameaças, vulnerabilidades e contramedidas. Definir especificações de design seguro.
            *   **Implementação:** Usar ferramentas de desenvolvimento aprovadas, seguir guias de codificação segura, evitar funções e práticas inseguras, realizar análise estática de código (SAST).
            *   **Verificação:** Realizar testes de segurança dinâmicos (DAST - Dynamic Application Security Testing), testes de penetração, revisão de código focada em segurança. Verificar se os requisitos de segurança foram atendidos.
            *   **Lançamento (Release):** Criar um plano de resposta a incidentes. Realizar uma revisão final de segurança.
            *   **Resposta (Response):** Executar o plano de resposta a incidentes quando novas vulnerabilidades são descobertas após o lançamento.
        *   **Princípios:** Segurança desde o início (security by design), segurança por padrão (secure by default), defesa em profundidade.
    *   **CLASP (Comprehensive, Lightweight Application Security Process - Processo Abrangente e Leve de Segurança de Aplicações):**
        *   **Conceito:** Um processo de desenvolvimento de software seguro proposto pela OWASP (Open Web Application Security Project - Projeto Aberto de Segurança em Aplicações Web). É mais flexível e leve que o SDL, projetado para ser adaptado a diferentes metodologias de desenvolvimento.
        *   **Componentes Principais (Visões e Atividades):**
            *   **Visões de Alto Nível:** Conceitos sobre como a segurança deve ser integrada.
            *   **Atividades de Segurança:** Conjunto de atividades de segurança que podem ser aplicadas durante o SDLC. Exemplos: educar desenvolvedores sobre segurança, definir requisitos de segurança, realizar modelagem de ameaças, aplicar práticas de codificação segura, realizar revisões de código, testar a segurança da aplicação.
            *   **Recursos de Conhecimento:** Referências a boas práticas, vulnerabilidades comuns, etc.
        *   **Foco:** Integrar a segurança de forma incremental e adaptável.
    *   **OWASP Top 10:**
        *   **Conceito:** Um documento de conscientização padrão para desenvolvedores e segurança de aplicações web. Representa um amplo consenso sobre os riscos de segurança mais críticos para aplicações web. É atualizado periodicamente (ex: OWASP Top 10 2017, OWASP Top 10 2021).
        *   **Objetivo:** Ajudar as organizações a entenderem e priorizarem os esforços para mitigar as vulnerabilidades mais comuns e perigosas em aplicações web.
        *   **Exemplos de Categorias do OWASP Top 10 (as categorias exatas variam entre as versões):**
            *   **A01: Quebra de Controle de Acesso (Broken Access Control):** Falhas na aplicação de restrições sobre o que usuários autenticados podem fazer.
            *   **A02: Falhas Criptográficas (Cryptographic Failures):** Exposição de dados sensíveis devido a falhas na criptografia ou ausência dela.
            *   **A03: Injeção (Injection):** Falhas que permitem que dados não confiáveis sejam enviados a um interpretador como parte de um comando ou consulta (ex: SQL Injection, NoSQL Injection, OS Command Injection, LDAP Injection).
            *   **A04: Design Inseguro (Insecure Design):** Falhas relacionadas a defeitos de design e arquitetura, com foco em riscos associados a falhas de modelagem de ameaças, padrões de design seguro e princípios de referência.
            *   **A05: Configuração Incorreta de Segurança (Security Misconfiguration):** Erros de configuração, como permissões inadequadas, funcionalidades desnecessárias habilitadas, contas e senhas padrão.
            *   **A06: Componentes Vulneráveis e Desatualizados (Vulnerable and Outdated Components):** Uso de bibliotecas, frameworks e outros componentes de software com vulnerabilidades conhecidas.
            *   **A07: Falhas de Identificação e Autenticação (Identification and Authentication Failures):** Funções relacionadas à identidade, autenticação e gerenciamento de sessão do usuário implementadas incorretamente.
            *   **A08: Falhas de Integridade de Software e Dados (Software and Data Integrity Failures):** Código e infraestrutura que não protegem contra violações de integridade (ex: desserialização insegura, atualizações de software sem validação).
            *   **A09: Falhas de Registro e Monitoramento de Segurança (Security Logging and Monitoring Failures):** Registro e monitoramento insuficientes para detectar, responder e analisar incidentes.
            *   **A10: Falsificação de Solicitação do Lado do Servidor (Server-Side Request Forgery - SSRF):** Falhas que permitem que um invasor induza uma aplicação do lado do servidor a fazer requisições para um domínio inesperado.
*   **Relevância Forense:**
    *   **Análise de Causa Raiz:** Em uma investigação de comprometimento de uma aplicação, entender se práticas de desenvolvimento seguro foram seguidas (ou não) pode ajudar a determinar a causa raiz da vulnerabilidade explorada.
    *   **Identificação de Vulnerabilidades:** Se o código-fonte da aplicação estiver disponível, o conhecimento do OWASP Top 10 pode guiar o perito na busca por tipos comuns de vulnerabilidades que podem ter sido exploradas.
    *   **Contextualização de Ataques:** Saber que uma aplicação é vulnerável a, por exemplo, SQL Injection, ajuda a interpretar logs de servidor web ou banco de dados que mostram tentativas de exploração.
    *   **Recomendações:** Em relatórios periciais, o perito pode precisar apontar falhas no processo de desenvolvimento que levaram a um incidente e recomendar a adoção de práticas como SDL ou CLASP.
    *   **Análise de Malware Focado em Aplicações Web:** Malwares que exploram vulnerabilidades web (como web shells) podem ser melhor entendidos com o conhecimento das categorias do OWASP Top 10.

---

## 7.3 Segurança de contêineres: Docker, Kubernetes e runtime security.

*   **Explicação:** Contêineres (especialmente Docker) se tornaram uma forma popular de empacotar e implantar aplicações. Kubernetes é a principal plataforma de orquestração de contêineres. A segurança de contêineres envolve proteger a imagem do contêiner, o runtime do contêiner, o host do contêiner e a plataforma de orquestração.
    *   **Docker:**
        *   **Conceito:** Plataforma de software que permite criar, implantar e executar aplicações em contêineres. Os contêineres Docker compartilham o kernel do SO do host, mas executam em processos isolados.
        *   **Componentes:** Imagem Docker (template read-only com instruções para criar um contêiner), Contêiner Docker (instância executável de uma imagem), Dockerfile (script para construir imagens), Docker Hub/Registries (para armazenar e compartilhar imagens).
        *   **Riscos de Segurança Docker:** Imagens vulneráveis (contendo software desatualizado ou malicioso), configurações inseguras do contêiner (ex: rodar como root, expor portas desnecessárias), kernel do host compartilhado (vulnerabilidade no kernel afeta todos os contêineres), segredos mal gerenciados.
    *   **Kubernetes (K8s):**
        *   **Conceito:** Plataforma de orquestração de contêineres de código aberto para automatizar a implantação, o dimensionamento e o gerenciamento de aplicações em contêineres em um cluster de máquinas.
        *   **Componentes Principais:** Master Node (control plane: API Server, etcd, Scheduler, Controller Manager), Worker Nodes (kubelet, kube-proxy, container runtime).
        *   **Riscos de Segurança Kubernetes:** Configurações inseguras do cluster (ex: API Server exposto publicamente sem autenticação forte), segredos mal gerenciados, controle de acesso baseado em função (RBAC - Role-Based Access Control) mal configurado, vulnerabilidades na rede do cluster, imagens de contêiner inseguras.
    *   **Runtime Security (Segurança em Tempo de Execução) para Contêineres:**
        *   **Conceito:** Foca na detecção e prevenção de ameaças enquanto os contêineres estão em execução.
        *   **Técnicas:**
            *   **Monitoramento de Comportamento:** Observar chamadas de sistema, atividade de rede, acesso a arquivos dentro do contêiner para detectar anomalias ou comportamento malicioso.
            *   **Análise de Processos:** Identificar processos inesperados ou suspeitos rodando no contêiner.
            *   **Detecção de Intrusão (IDS/IPS) para Contêineres:** Ferramentas que monitoram o tráfego de rede de/para contêineres e a atividade interna.
            *   **Aplicação de Políticas de Segurança:** Usar ferramentas (ex: Falco, AppArmor, Seccomp) para restringir as capacidades do contêiner e o que ele pode fazer no sistema.
            *   **Scanner de Vulnerabilidades em Runtime:** Algumas ferramentas podem escanear a memória de contêineres em execução em busca de indicadores de comprometimento.
*   **Relevância Forense:**
    *   **Ambientes Complexos para Investigação:** Incidentes em ambientes de contêineres podem ser complexos de investigar devido à natureza dinâmica e distribuída.
    *   **Coleta de Evidências:**
        *   **Imagens de Contêiner:** Analisar camadas de imagens para identificar software vulnerável ou arquivos maliciosos.
        *   **Logs do Contêiner:** Logs gerados pela aplicação dentro do contêiner.
        *   **Logs do Runtime do Contêiner (ex: Docker daemon logs):** Eventos de criação, parada, início de contêineres.
        *   **Logs do Orquestrador (ex: Kubernetes API server logs, etcd logs, audit logs):** Ações de gerenciamento do cluster, implantações, alterações de configuração.
        *   **Logs do Host:** Logs do sistema operacional do nó hospedeiro.
        *   **Snapshots de Contêineres/Volumes:** Se disponíveis, podem preservar o estado.
    *   **Análise de Malware em Contêineres:** Malware pode ser projetado para rodar dentro de contêineres ou para escapar do contêiner e comprometer o host.
    *   **Movimentação Lateral:** Em um cluster Kubernetes comprometido, um invasor pode tentar se mover de um contêiner/pod para outro ou para o nó hospedeiro.
    *   **Ferramentas:** Ferramentas forenses estão começando a adicionar suporte específico para análise de contêineres e Kubernetes (ex: `docker diff`, `docker inspect`, ferramentas para analisar camadas de imagem, ferramentas de análise de logs de K8s).

---

## 7.4 Autenticação e Autorização: características, fundamentos e conceitos envolvidos.

*   **Explicação:**
    *   **Autenticação (Authentication - Quem é você?):** Processo de verificar a identidade de um usuário, processo ou dispositivo. Confirma que a entidade é quem ela afirma ser.
        *   **Fatores de Autenticação:**
            *   **Algo que você sabe:** Senha, PIN, frase secreta.
            *   **Algo que você tem:** Token de segurança físico (smart card, chave USB), celular (para receber OTPs - One-Time Passwords ou Senhas de Uso Único).
            *   **Algo que você é:** Biometria (impressão digital, reconhecimento facial, íris).
        *   **MFA (Multi-Factor Authentication - Autenticação Multifator):** Usa dois ou mais fatores diferentes (ver item 7.4.4).
    *   **Autorização (Authorization - O que você pode fazer?):** Processo de conceder ou negar permissões a uma entidade autenticada para acessar recursos específicos ou realizar ações específicas. Ocorre *após* a autenticação bem-sucedida.
        *   **Princípio do Menor Privilégio (Principle of Least Privilege):** Conceder apenas as permissões mínimas necessárias para que uma entidade realize suas tarefas legítimas.
        *   **Modelos de Controle de Acesso:**
            *   **DAC (Discretionary Access Control - Controle de Acesso Discricionário):** O proprietário de um recurso decide quem pode acessá-lo. (Ex: permissões de arquivo em Unix/Windows).
            *   **MAC (Mandatory Access Control - Controle de Acesso Obrigatório):** As decisões de acesso são baseadas em rótulos de segurança atribuídos a sujeitos (usuários/processos) e objetos (recursos), e em políticas definidas centralmente. (Ex: SELinux).
            *   **RBAC (Role-Based Access Control - Controle de Acesso Baseado em Função):** As permissões são associadas a funções, e os usuários são atribuídos a funções. Simplifica o gerenciamento de permissões.
            *   **ABAC (Attribute-Based Access Control - Controle de Acesso Baseado em Atributo):** As decisões de acesso são baseadas em atributos de sujeitos, objetos e do ambiente, e em políticas que combinam esses atributos.
*   **Relevância Forense:**
    *   **Investigação de Acesso Não Autorizado:** A análise de logs de autenticação é crucial para identificar tentativas de login falhas ou bem-sucedidas, origem dos acessos (IPs), horários, e se credenciais roubadas foram usadas.
    *   **Abuso de Privilégios:** Um usuário autenticado pode abusar de seus privilégios concedidos (autorização excessiva) ou explorar falhas na autorização para acessar dados ou funcionalidades indevidas.
    *   **Rastreamento de Atividades de Usuário:** Correlacionar logs de autenticação com logs de aplicação para rastrear as ações de um usuário específico após o login.
    *   **Análise de Configurações de Permissão:** Verificar se as permissões em arquivos, bancos de dados, ou sistemas de nuvem estavam configuradas corretamente ou se permitiam acesso indevido.
    *   **Falhas em Mecanismos de Autenticação/Autorização:** Muitas vulnerabilidades exploradas por malware ou atacantes residem em implementações fracas ou falhas desses mecanismos.

    ---
    #### 7.4.1 Single Sign-On (SSO), SAML, OAuth 2.0, OpenId Connect (OIDC).
    *   **Explicação:** Tecnologias que simplificam e federam a autenticação e autorização entre diferentes sistemas e aplicações.
        *   **Single Sign-On (SSO - Logon Único):** Permite que um usuário se autentique uma única vez e ganhe acesso a múltiplos sistemas ou aplicações relacionadas sem precisar se autenticar novamente em cada um deles.
            *   *Benefícios:* Conveniência para o usuário, gerenciamento centralizado de identidades.
            *   *Riscos:* Se a credencial SSO for comprometida, o acesso a todos os sistemas integrados pode ser perdido.
        *   **SAML (Security Assertion Markup Language - Linguagem de Marcação para Declaração de Segurança):** Padrão baseado em XML para trocar dados de autenticação e autorização entre diferentes domínios de segurança, tipicamente entre um Provedor de Identidade (IdP - Identity Provider) e um Provedor de Serviço (SP - Service Provider). Usado para implementar SSO federado na web.
            *   *Fluxo Básico:* Usuário tenta acessar um SP. SP redireciona para o IdP. Usuário se autentica no IdP. IdP envia uma "asserção SAML" (contendo informações de autenticação e atributos do usuário) de volta para o SP. SP confia na asserção e concede acesso.
        *   **OAuth 2.0 (Open Authorization - Autorização Aberta):** Framework de autorização que permite que aplicações de terceiros acessem recursos de um usuário em um servidor HTTP (servidor de recursos) em nome do usuário, mas sem expor as credenciais do usuário (senha) diretamente à aplicação de terceiro. Foca na **autorização delegada**.
            *   *Atores:* Dono do Recurso (usuário), Cliente (aplicação de terceiro), Servidor de Autorização, Servidor de Recursos.
            *   *Fluxos Comuns:* Authorization Code, Implicit, Resource Owner Password Credentials, Client Credentials.
            *   *Tokens:* Usa tokens de acesso (access tokens) que são emitidos pelo servidor de autorização para o cliente.
        *   **OpenID Connect (OIDC):** Camada de identidade construída sobre o OAuth 2.0. Permite que clientes verifiquem a identidade de um usuário final com base na autenticação realizada por um Provedor OpenID (OP - OpenID Provider), bem como obtenham informações básicas de perfil sobre o usuário final de maneira interoperável e semelhante a REST. Fornece um **ID Token** (um JSON Web Token - JWT) que contém informações de identidade do usuário.
            *   *Uso:* Implementar funcionalidades de "Login com Google/Facebook/etc.".
    *   **Relevância Forense:**
        *   **Logs de IdP/OP e SP:** Em investigações envolvendo SSO ou federação, os logs do Provedor de Identidade/Provedor OpenID e dos Provedores de Serviço são cruciais para rastrear logins, emissão de asserções/tokens e acessos a recursos.
        *   **Análise de Asserções SAML e Tokens (ID Tokens, Access Tokens):** Se capturados (ex: em tráfego de rede, logs, ou no dispositivo do usuário), podem revelar informações sobre o usuário, o IdP, o SP, as permissões concedidas e os timestamps. É preciso verificar a validade e a integridade desses artefatos.
        *   **Ataques a Protocolos de Federação:** Ataques como roubo de tokens, falsificação de asserções SAML, exploração de redirecionamentos inseguros.
        *   **Rastreamento de Atividades entre Domínios:** SSO e federação significam que a atividade de um usuário pode cruzar múltiplos domínios de segurança, exigindo a correlação de logs de diferentes sistemas.

    ---
    #### 7.4.2 Biometria comportamental, reconhecimento facial, análise de íris, voz, impressão digital.
    *   **Explicação:** Métodos de autenticação baseados nas características biológicas ou comportamentais únicas de um indivíduo ("algo que você é").
        *   **Biometria Fisiológica (baseada em características físicas):**
            *   **Reconhecimento Facial:** Analisa características faciais (distância entre olhos, formato do nariz, etc.) para identificar ou verificar uma pessoa.
            *   **Análise de Íris:** Examina os padrões únicos e complexos da íris do olho. Considerada uma das biometrias mais precisas.
            *   **Impressão Digital:** Analisa os padrões de vales e cristas nas pontas dos dedos. Amplamente utilizada.
            *   **Voz (Reconhecimento de Locutor):** Analisa as características acústicas únicas da voz de uma pessoa (frequência, tom, cadência). Pode ser afetada por ruído, saúde.
        *   **Biometria Comportamental:**
            *   **Conceito:** Analisa os padrões na forma como um indivíduo realiza certas ações ou interage com sistemas. Menos intrusiva, pode ser contínua.
            *   **Exemplos:** Dinâmica da digitação (velocidade, ritmo, pressão nas teclas), padrões de movimento do mouse, forma de andar (gait analysis), padrões de interação com tela sensível ao toque (touchscreen).
            *   **Uso:** Frequentemente usada como um fator adicional de autenticação ou para detecção de fraude (ex: se o padrão de digitação de uma senha muda subitamente).
    *   **Relevância Forense:**
        *   **Evidência de Acesso:** Se um sistema protegido por biometria foi acessado, isso pode indicar fortemente a presença da pessoa cuja biometria foi usada (a menos que o sistema biométrico tenha sido contornado).
        *   **Contorno de Sistemas Biométricos:** Investigar se um sistema biométrico foi enganado usando fotos (para reconhecimento facial), moldes de impressão digital, gravações de voz, ou se vulnerabilidades no software do sensor biométrico foram exploradas.
        *   **Logs de Sistemas Biométricos:** Podem registrar tentativas de autenticação (bem-sucedidas e falhas), os dados biométricos capturados (ou templates derivados), e timestamps.
        *   **Biometria Comportamental em Detecção de Fraude:** Logs de sistemas de detecção de fraude baseados em biometria comportamental podem indicar quando o comportamento de um usuário desviou do normal, sugerindo comprometimento de conta.
        *   **Privacidade e Proteção de Dados Biométricos:** Dados biométricos são extremamente sensíveis. Vazamentos ou uso indevido desses dados têm sérias implicações.

    ---
    #### 7.4.3 Protocolos de autenticação sem senha: FIDO2/WebAuthn.
    *   **Explicação:** Abordagens para autenticação que eliminam a necessidade de senhas tradicionais, visando maior segurança e usabilidade.
        *   **FIDO2 (Fast IDentity Online version 2):** Conjunto de padrões abertos que permite autenticação sem senha ou multifator forte. Consiste em:
            *   **WebAuthn (Web Authentication):** Padrão do W3C (World Wide Web Consortium) que define uma API JavaScript para que aplicações web possam usar autenticadores FIDO.
            *   **CTAP (Client to Authenticator Protocol):** Protocolo que permite que um cliente (como um navegador ou SO) se comunique com um autenticador FIDO externo (como uma chave de segurança USB, ou um autenticador embutido em um dispositivo móvel).
        *   **Como Funciona (Simplificado):**
            1.  **Registro:** O usuário registra um autenticador (ex: chave de segurança FIDO, sensor biométrico do dispositivo) com um serviço online (Relying Party). O autenticador gera um par de chaves criptográficas (pública e privada) específico para aquele serviço. A chave pública é enviada ao servidor do serviço. A chave privada permanece segura no autenticador e nunca sai dele.
            2.  **Autenticação:** Para se logar, o serviço envia um desafio (challenge) ao cliente. O cliente encaminha o desafio ao autenticador. O usuário desbloqueia o autenticador (ex: com PIN, biometria). O autenticador assina o desafio com a chave privada e retorna a assinatura ao cliente, que a envia ao servidor. O servidor verifica a assinatura usando a chave pública armazenada.
        *   **Vantagens:**
            *   **Resistência a Phishing:** As credenciais são vinculadas à origem (domínio do site), impedindo ataques de phishing onde o usuário é enganado a inserir credenciais em um site falso.
            *   **Sem Segredos Compartilhados no Servidor:** O servidor armazena apenas chaves públicas, não senhas ou segredos que podem ser roubados em massa.
            *   **Proteção contra Ataques Man-in-the-Middle (MitM):** A assinatura do desafio protege contra interceptação.
            *   **Pode ser Multifator:** O ato de possuir o autenticador (algo que você tem) e desbloqueá-lo (com PIN ou biometria - algo que você sabe/é) já constitui MFA.
    *   **Relevância Forense:**
        *   **Logs de Autenticação:** Servidores que usam FIDO2/WebAuthn ainda gerarão logs de tentativas de autenticação, incluindo identificadores de credencial (credID), informações sobre o autenticador usado (AAGUID - Authenticator Attestation GUID), e o resultado da verificação da assinatura.
        *   **Análise do Dispositivo do Usuário:** O navegador ou SO do usuário pode armazenar informações sobre os registros FIDO2 (Relying Parties com as quais o usuário registrou autenticadores).
        *   **Análise do Autenticador Físico (Chave de Segurança):** Embora a chave privada não deva ser extraível, a análise física da chave pode ser relevante em alguns casos (ex: para identificar o modelo, fabricante, ou se foi adulterada).
        *   **Novos Vetores de Ataque (Teóricos/Emergentes):** Embora FIDO2 seja muito seguro, pesquisadores exploram potenciais vulnerabilidades em implementações ou no próprio protocolo. Um perito pode precisar estar ciente desses desenvolvimentos.
        *   **Menos Senhas para Roubar:** A adoção de autenticação sem senha reduz o risco de comprometimento de senhas, o que pode mudar o foco das investigações de certos tipos de ataques.

    ---
    #### 7.4.4 Múltiplos Fatores de Autenticação (MFA).
    *   **Explicação:** Um método de controle de acesso de segurança que requer que os usuários forneçam **dois ou mais fatores de verificação distintos** para obter acesso a um recurso, como uma aplicação, conta online ou VPN. O objetivo é criar uma defesa em camadas e tornar mais difícil para uma pessoa não autorizada acessar um alvo, pois um único fator comprometido (como uma senha roubada) não será suficiente.
    *   **Combinação de Fatores:** Geralmente combina diferentes categorias de fatores:
        *   Algo que você sabe (ex: senha) + Algo que você tem (ex: token OTP de um aplicativo autenticador no celular).
        *   Algo que você tem (ex: cartão inteligente) + Algo que você é (ex: impressão digital para desbloquear o cartão).
        *   Algo que você sabe (ex: PIN) + Algo que você é (ex: reconhecimento facial).
    *   **Exemplos de Implementações MFA:**
        *   **Senhas de Uso Único (OTPs - One-Time Passwords):**
            *   **TOTP (Time-based OTP - OTP Baseado em Tempo):** Um código numérico que muda a cada_n_ segundos (ex: Google Authenticator, Authy).
            *   **HOTP (HMAC-based OTP - OTP Baseado em HMAC):** Um código que muda a cada uso (baseado em contador).
        *   **Push Notifications (Notificações Push):** Uma notificação é enviada para um dispositivo confiável (ex: smartphone) do usuário, que deve aprovar o login.
        *   **Chaves de Segurança Físicas (Hardware Tokens):** Como as chaves FIDO2 (USB, NFC, Bluetooth).
        *   **Biometria (como segundo fator).**
        *   **SMS ou Chamada de Voz com Código:** Menos seguro devido a riscos de SIM swap e interceptação de SMS, mas ainda usado.
    *   **Relevância Forense:**
        *   **Análise de Logs de MFA:** Logs de servidores de autenticação ou provedores de identidade podem mostrar quais fatores foram usados, se a autenticação MFA foi bem-sucedida ou falhou, e de qual IP/dispositivo a tentativa partiu.
        *   **Investigação de Contas Comprometidas:** Determinar se a MFA estava habilitada e, se sim, como ela foi contornada (ex: phishing do segundo fator, roubo de token de sessão após MFA, exploração de processos de recuperação de conta, SIM swapping para interceptar códigos SMS).
        *   **Avaliação de Postura de Segurança:** Em uma investigação de incidente, verificar se a MFA estava implementada para acessos críticos (administrativos, VPN, e-mail) é um ponto importante.
        *   **Ataques a MFA:** Embora a MFA aumente significativamente a segurança, ela não é infalível. Ataques como "MFA fatigue" (inundar o usuário com pedidos de aprovação push na esperança de um clique acidental) ou exploração de vulnerabilidades em um dos fatores.

---

## 7.5 Malware: virus, keylogger, trojan, spyware, backdoor, worms, rootkit, adware, fileless, ransomware.

*   **Explicação:** Software malicioso (malware) projetado para se infiltrar, danificar ou obter acesso não autorizado a um sistema de computador. (Este tópico se sobrepõe ao item 3.3, mas aqui o foco é mais na categorização e características gerais, enquanto o 3.3 foca na análise via engenharia reversa).
    *   **Vírus (Virus):** Código que se anexa a programas ou arquivos executáveis legítimos. Quando o hospedeiro é executado, o vírus também é executado, podendo se replicar para outros arquivos.
    *   **Registrador de Teclas (Keylogger):** Software que secretamente registra as teclas digitadas pelo usuário. Usado para roubar senhas, informações bancárias, etc.
    *   **Cavalo de Troia (Trojan Horse):** Malware disfarçado de software legítimo ou útil. Engana o usuário para instalá-lo. Pode ter diversas funcionalidades maliciosas (roubo de dados, backdoor, etc.).
    *   **Software Espião (Spyware):** Coleta secretamente informações sobre o usuário e suas atividades no computador (histórico de navegação, dados pessoais) e as envia para terceiros.
    *   **Porta dos Fundos (Backdoor):** Cria um método oculto para contornar os mecanismos normais de autenticação e obter acesso remoto a um sistema.
    *   **Verme (Worm):** Malware autônomo que se replica e se propaga através de redes (Internet, LANs), geralmente explorando vulnerabilidades de segurança em outros sistemas, sem a necessidade de um arquivo hospedeiro.
    *   **Rootkit:** Conjunto de ferramentas de software projetadas para obter acesso de nível de administrador (root) a um sistema e ocultar sua presença e a de outros malwares ou atividades maliciosas (ex: ocultar processos, arquivos, conexões de rede). Opera em baixo nível, muitas vezes no kernel.
    *   **Software de Publicidade (Adware):** Exibe anúncios indesejados no computador do usuário, muitas vezes na forma de pop-ups ou redirecionamentos de navegador. Pode coletar dados de navegação para direcionar anúncios.
    *   **Malware Sem Arquivo (Fileless Malware):** Tipo de malware que opera na memória do sistema (RAM) sem gravar arquivos executáveis no disco. Utiliza ferramentas e scripts legítimos do sistema operacional (como PowerShell, WMI - Windows Management Instrumentation) para executar suas atividades, tornando a detecção por antivírus baseados em assinatura mais difícil. Pode persistir através de modificações no registro ou tarefas agendadas.
    *   **Software de Sequestro (Ransomware):** Tipo de malware que criptografa os arquivos do usuário ou bloqueia o acesso ao sistema, exigindo o pagamento de um resgate (geralmente em criptomoedas) para restaurar o acesso.
*   **Relevância Forense:**
    *   **Identificação e Classificação:** O primeiro passo em uma análise de malware é identificar o tipo de ameaça para entender seus objetivos prováveis e métodos de operação.
    *   **Análise de Impacto:** Cada tipo de malware tem um impacto diferente (roubo de dados, negação de serviço, perda financeira, espionagem).
    *   **Técnicas de Detecção e Remoção:** Variam conforme o tipo de malware. Fileless malware e rootkits são particularmente difíceis de detectar e remover.
    *   **Coleta de IoCs:** Diferentes tipos de malware deixam diferentes indicadores de comprometimento.
    *   **Compreensão do Vetor de Ataque:** Como cada tipo de malware se propaga ou infecta sistemas (ex: e-mail de phishing para ransomware, vulnerabilidades para worms, engenharia social para trojans).

---

## 7.6 OSINT.

*   **Explicação:**
    *   **OSINT (Open Source Intelligence - Inteligência de Fontes Abertas):** Disciplina de coleta e análise de informações de fontes publicamente disponíveis (fontes abertas) para produzir inteligência acionável. Não envolve atividades clandestinas ou ilegais de coleta.
    *   **Fontes Abertas Incluem:**
        *   **Mídia:** Jornais, revistas, rádio, televisão, sites de notícias.
        *   **Internet:** Websites, blogs, fóruns, redes sociais (Twitter, Facebook, LinkedIn, Instagram, etc.), vídeos online (YouTube, Vimeo), repositórios de código (GitHub), informações de registro de domínio (WHOIS), dados de DNS, arquivos da Wayback Machine.
        *   **Dados Públicos Governamentais:** Relatórios, orçamentos, audiências públicas, dados de censo, mapas, dados de satélite.
        *   **Publicações Profissionais e Acadêmicas:** Artigos científicos, teses, anais de conferências, patentes.
        *   **Dados Comerciais:** Relatórios financeiros de empresas, dados de mercado, imagens de satélite comerciais.
        *   **Literatura Cinzenta:** Relatórios técnicos, pré-publicações, documentos de trabalho, newsletters.
    *   **Processo OSINT:** Envolve o planejamento da coleta, identificação de fontes relevantes, coleta dos dados, processamento e análise dos dados coletados, e disseminação da inteligência produzida.
*   **Relevância Forense:**
    *   **Investigação de Indivíduos e Organizações:** Coletar informações sobre suspeitos, vítimas ou empresas envolvidas em um caso (perfis em redes sociais, publicações, histórico profissional, conexões).
    *   **Contextualização de Incidentes:** Entender o contexto de um ataque cibernético, como informações sobre o ator da ameaça (se disponíveis publicamente), suas TTPs, ou discussões sobre vulnerabilidades exploradas.
    *   **Rastreamento de Ativos Digitais:** Encontrar informações sobre domínios, endereços IP, ou outros ativos online que possam estar ligados a atividades criminosas.
    *   **Análise de Malware:** Pesquisar hashes de malware, nomes de arquivos, endereços IP/domínios C2 em fontes OSINT (como VirusTotal, relatórios de segurança de empresas AV) para obter informações sobre campanhas de malware conhecidas.
    *   **Geolocalização:** Usar informações de redes sociais, fotos com metadados geográficos, ou outros dados públicos para tentar determinar a localização de um indivíduo ou evento.
    *   **Monitoramento de Ameaças:** Acompanhar discussões em fóruns da dark web (se acessíveis de forma legal e segura) ou canais públicos sobre novas ferramentas de hacking, vulnerabilidades ou venda de dados roubados.
    *   **Ferramentas OSINT:** Maltego, theHarvester, Shodan, Google Dorking, Recon-ng, e muitas outras ferramentas especializadas para coletar e analisar dados de fontes abertas.

---

## 7.7 Esteganografia.

*   **Explicação:**
    *   **Conceito:** A arte e ciência de ocultar informações secretas dentro de outros dados (chamados de meio de cobertura ou `cover media`) de forma que a presença da informação oculta não seja aparente. O objetivo é a comunicação secreta, onde a própria existência da mensagem é escondida. Difere da criptografia, que apenas torna a mensagem ilegível sem a chave, mas não esconde a existência da comunicação cifrada.
    *   **Meios de Cobertura Comuns:**
        *   **Imagens Digitais:** Alterar bits menos significativos (LSB - Least Significant Bit) dos pixels, manipular coeficientes DCT em JPEGs, usar paletas de cores.
        *   **Arquivos de Áudio:** Ocultar dados no LSB de amostras de áudio, em ruído de fundo, ou usando técnicas de espalhamento espectral.
        *   **Arquivos de Vídeo:** Combinação de técnicas de imagem e áudio, aproveitando a redundância temporal entre os quadros.
        *   **Texto:** Alterar espaçamento, usar caracteres Unicode invisíveis, ou codificar mensagens em padrões de palavras.
        *   **Protocolos de Rede:** Ocultar dados em campos não utilizados ou reservados de cabeçalhos de pacotes (ex: TCP/IP steganography).
        *   **Sistemas de Arquivos:** Ocultar dados em slack space, setores defeituosos marcados, ou metadados.
    *   **Técnicas Esteganográficas:**
        *   **Substituição LSB (Least Significant Bit):** Substitui o bit menos significativo de cada byte do meio de cobertura por um bit da mensagem secreta. Causa pouca distorção perceptível.
        *   **Técnicas de Domínio da Transformada:** Modificam coeficientes de transformadas (como DCT em JPEG, DWT em áudio/imagem).
        *   **Técnicas de Espalhamento Espectral (Spread Spectrum):** Espalha a mensagem secreta por uma ampla faixa de frequência.
    *   **Esteganálise (Steganalysis):** A arte e ciência de detectar a presença de informações ocultas por esteganografia. Pode envolver análise estatística do meio, busca por assinaturas de ferramentas esteganográficas, ou comparação com o arquivo de cobertura original (se disponível).
*   **Relevância Forense:**
    *   **Comunicação Criminosa Oculta:** Criminosos, terroristas e espiões podem usar esteganografia para se comunicar secretamente, exfiltrar dados roubados, ou distribuir malware.
    *   **Detecção Desafiadora:** Identificar o uso de esteganografia pode ser muito difícil, especialmente se técnicas sofisticadas forem usadas e o arquivo de cobertura original não estiver disponível para comparação.
    *   **Análise de Arquivos Suspeitos:** O perito pode precisar usar ferramentas de esteganálise para examinar arquivos de imagem, áudio, vídeo ou outros tipos de arquivos em busca de dados ocultos.
    *   **Ferramentas de Esteganografia/Esteganálise:** Steghide, OutGuess, StegSolve (para análise de LSB em imagens), e outras ferramentas especializadas.
    *   **Identificação de Software Esteganográfico:** A presença de ferramentas de esteganografia em um dispositivo suspeito é um indicador.
    *   **Contexto:** A suspeita de esteganografia geralmente surge de outros fatores na investigação, como o perfil do suspeito ou a natureza do crime.

---

## 7.8 Recuperação de dados.

*   **Explicação:** Processo de resgatar dados inacessíveis, perdidos, corrompidos, danificados ou formatados de dispositivos de armazenamento digital quando os dados não podem ser acessados normalmente através do sistema operacional ou da aplicação.
    *   **Cenários Comuns:** Exclusão acidental de arquivos, formatação de disco, corrupção do sistema de arquivos, falha de hardware (disco rígido, SSD, pen drive), dano físico ao dispositivo.
    *   **Níveis de Recuperação:**
        *   **Lógica:** Lidar com problemas no sistema de arquivos ou exclusão de arquivos onde o hardware está funcional.
        *   **Física:** Lidar com falhas mecânicas ou eletrônicas do dispositivo de armazenamento (ex: cabeça de leitura/gravação quebrada, motor do HD parado, dano na placa controladora). Requer ambiente especializado (sala limpa) e ferramentas.

    ---
    #### 7.8.1 Principais técnicas de recuperação de arquivos apagados em sistemas de arquivos.
    *   **Explicação:** Foco na recuperação lógica de arquivos que foram "deletados" pelo usuário ou sistema operacional, mas cujos dados ainda podem existir no meio de armazenamento.
        *   **Como a Exclusão Funciona (Geralmente):**
            *   Na maioria dos sistemas de arquivos (FAT, NTFS, EXT, etc.), quando um arquivo é deletado, os dados não são imediatamente apagados do disco. Em vez disso:
                *   A entrada do arquivo no diretório é marcada como deletada (ex: o primeiro caractere do nome do arquivo é alterado em FAT).
                *   Os blocos/clusters que continham os dados do arquivo são marcados como livres na estrutura de alocação do sistema de arquivos (ex: na FAT, no bitmap da MFT em NTFS, nos bitmaps de bloco/inode em EXT).
                *   Os metadados do arquivo (como o inode em EXT ou a entrada MFT em NTFS) podem ser marcados como não utilizados ou ter seus ponteiros para os blocos de dados zerados.
            *   Os dados permanecem fisicamente no disco até que os blocos/clusters sejam sobrescritos por novos dados.
        *   **Técnicas de Recuperação:**
            *   **Uso de Metadados Remanescentes:**
                *   **NTFS:** Procurar por entradas MFT marcadas como não utilizadas, mas que ainda contêm informações sobre o arquivo deletado (nome, tamanho, ponteiros para clusters). O atributo `$FILE_NAME` pode persistir mesmo que `$STANDARD_INFORMATION` seja reutilizado.
                *   **FAT/exFAT:** Procurar por entradas de diretório marcadas como deletadas e tentar seguir a cadeia de clusters na FAT (se não foi totalmente zerada).
                *   **EXT3/EXT4:** Procurar por inodes marcados como não utilizados. Os ponteiros diretos/indiretos/extents para os blocos de dados podem ter sido zerados, mas o journal pode ajudar.
            *   **Escavação de Dados (Data Carving ou File Carving):**
                *   **Conceito:** Técnica que busca por arquivos com base em seus cabeçalhos (headers) e rodapés (footers) conhecidos (assinaturas de arquivo), ou outras estruturas internas, diretamente nos dados brutos do disco (setor por setor), ignorando a estrutura do sistema de arquivos.
                *   **Utilidade:** Útil quando o sistema de arquivos está severamente corrompido, o disco foi formatado, ou para encontrar arquivos deletados cujos metadados foram completamente perdidos.
                *   **Desafios:** Lidar com fragmentação de arquivos (arquivos cujos blocos não estão contíguos no disco). A escavação pode recuperar apenas a primeira parte de um arquivo fragmentado ou pode juntar fragmentos incorretamente. Não recupera nomes de arquivo originais ou metadados do sistema de arquivos.
            *   **Análise do Registro Cronológico (Journal Analysis):**
                *   Em sistemas de arquivos com journaling (NTFS, EXT3/4, XFS), o journal registra transações do sistema de arquivos. Pode conter nomes de arquivos deletados, metadados ou até mesmo fragmentos de dados de arquivos que foram recentemente modificados ou deletados.
            *   **Análise de Espaço Não Alocado e Espaço Ocioso (Slack Space):**
                *   **Espaço Não Alocado:** Setores do disco que não estão atualmente alocados a nenhum arquivo ativo pelo sistema de arquivos. Podem conter dados de arquivos deletados.
                *   **Espaço Ocioso (Slack Space):** O espaço entre o final lógico de um arquivo e o final do último cluster/bloco alocado para esse arquivo. Também pode conter dados de arquivos anteriores que ocupavam aquele cluster.
            *   **Ferramentas Forenses:** Ferramentas como EnCase, FTK, Autopsy, The Sleuth Kit (TSK) possuem funcionalidades para identificar e recuperar arquivos deletados usando essas técnicas. Ferramentas de data carving dedicadas incluem PhotoRec, Foremost, Scalpel.
    *   **Relevância Forense:**
        *   A recuperação de arquivos deletados é uma das tarefas mais comuns e importantes na forense digital. Arquivos que o usuário pensou ter apagado permanentemente podem conter evidências cruciais.
        *   Entender as nuances de cada sistema de arquivos é vital para aplicar as técnicas de recuperação corretas e para interpretar os resultados (ex: saber que a recuperação do nome original do arquivo é mais provável em NTFS do que em data carving puro).
        *   A capacidade de realizar data carving é essencial quando se lida com mídias formatadas ou sistemas de arquivos desconhecidos/corrompidos.

    ---
    #### 7.8.2 Ambientes de nuvem: AWS, Azure e Google Cloud.
    *   **Explicação:** A recuperação de dados em ambientes de nuvem difere significativamente da recuperação em discos físicos locais, devido à abstração da infraestrutura, ao modelo de responsabilidade compartilhada e à dependência do Provedor de Serviços em Nuvem (CSP - Cloud Service Provider).
        *   **Foco da Recuperação na Nuvem:**
            *   **Snapshots e Backups Gerenciados pelo Provedor:** Muitos CSPs oferecem serviços de snapshot (cópias pontuais de volumes de armazenamento de VMs) e backup para diversos serviços (bancos de dados, armazenamento de objetos). A recuperação de dados frequentemente depende da existência e acessibilidade desses snapshots/backups.
                *   **AWS (Amazon Web Services):** EBS Snapshots (para volumes de instâncias EC2), RDS Backups (para bancos de dados relacionais), S3 Versioning e S3 Glacier (para armazenamento de objetos).
                *   **Azure (Microsoft Azure):** Azure Backup, VM Snapshots, Azure Blob Storage Versioning.
                *   **Google Cloud (GCP - Google Cloud Platform):** Persistent Disk Snapshots, Cloud SQL Backups, Cloud Storage Versioning.
            *   **Lixeiras (Recycle Bins) e Versionamento:** Alguns serviços de armazenamento em nuvem (como S3, Blob Storage) oferecem mecanismos de versionamento de objetos ou lixeiras, que permitem recuperar versões anteriores de arquivos ou arquivos deletados por um certo período.
            *   **Logs do Provedor:** Logs de auditoria da plataforma de nuvem (AWS CloudTrail, Azure Monitor, Google Cloud Audit Logs) podem registrar eventos de exclusão ou modificação de recursos, mas geralmente não contêm os dados em si. Eles podem ajudar a entender *o que* aconteceu e *quando*, mas não a recuperar os dados diretamente.
            *   **Responsabilidade do Cliente:** Em muitos casos (especialmente em IaaS), o cliente é responsável por configurar e gerenciar suas próprias políticas de backup e recuperação para os dados dentro de suas máquinas virtuais ou aplicações. Se o cliente não implementou backups, a recuperação pode ser impossível.
        *   **Desafios:**
            *   **Acesso Físico Impossível:** O perito não tem acesso físico aos discos onde os dados residem.
            *   **Dependência do CSP:** A recuperação muitas vezes requer o uso das ferramentas e APIs fornecidas pelo CSP, ou a solicitação de assistência ao CSP (sujeita a processos legais e políticas do provedor).
            *   **Complexidade da Infraestrutura:** A infraestrutura subjacente é complexa e abstraída.
            *   **Multilocação:** Os dados de múltiplos clientes podem residir no mesmo hardware físico, embora logicamente isolados.
            *   **Retenção de Dados:** As políticas de retenção de snapshots, backups e logs do CSP e do cliente variam. Dados podem ser permanentemente excluídos após certos períodos.
            *   **Jurisdição:** Onde os dados estão armazenados e quais leis se aplicam.
    *   **Relevância Forense:**
        *   **Fontes de Evidência:** Snapshots, backups, versionamento de objetos e logs de provedores são as principais fontes para recuperação de dados ou para entender o estado anterior de um sistema na nuvem.
        *   **Ordem Judicial:** O acesso a dados e logs do CSP geralmente requer uma ordem judicial válida.
        *   **Cooperação com o CSP:** A interação com o provedor de nuvem é frequentemente necessária.
        *   **Entendimento dos Serviços:** O perito precisa entender os diferentes serviços de armazenamento e backup oferecidos por cada grande provedor (AWS S3, EBS, RDS; Azure Blob Storage, Managed Disks, Azure SQL Database; Google Cloud Storage, Persistent Disk, Cloud SQL) e como a recuperação funciona para cada um.
        *   **Forense em "Nível de Cliente":** Se uma máquina virtual (IaaS) foi comprometida e dados foram deletados dentro do SO da VM, as técnicas de recuperação de sistema de arquivos (item 7.8.1) podem ser aplicadas a uma imagem ou snapshot do disco virtual dessa VM.
        *   **Análise de Logs de Plataforma:** Para determinar se a exclusão de dados foi acidental, maliciosa por um insider, ou resultado de um ataque externo, e se os mecanismos de recuperação foram ativados ou desativados.

---
