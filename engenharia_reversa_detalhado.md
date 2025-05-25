# Detalhamento dos Subtópicos de "3. Engenharia reversa de software" (Edital Perito Criminal Federal – Área 3)

**Engenharia reversa de software** é o processo de analisar um sistema de software para identificar seus componentes, inter-relações e, frequentemente, para criar representações do sistema em um nível de abstração mais alto ou em outra forma. Parte-se do produto final (código executável) para entender seu design, funcionalidade, algoritmos e estruturas de dados.

**Relevância Forense Geral:** Essencial na análise de malware para entender seu comportamento, capacidades (roubo de dados, comunicação C2), propagação, vulnerabilidades exploradas e detecção/neutralização. Pode ser usada para analisar formatos de arquivo proprietários ou protocolos de comunicação desconhecidos.

---

## 3.1 Técnicas e ferramentas de descompilação de programas.

*   **Explicação:**
    *   **Descompilação:** Traduzir código executável (código de máquina ou bytecode) de volta para código-fonte de alto nível (ex: C, Java) legível por humanos. O objetivo é obter um código funcionalmente equivalente ao original, embora comentários e nomes de variáveis originais sejam geralmente perdidos.
    *   **Desafios:** Perda de informação na compilação, otimizações do compilador, linguagens/arquiteturas complexas, código indireto (saltos, chamadas). Descompiladores raramente produzem código perfeito.
    *   **Técnicas de Descompiladores:** Desmontagem (para Assembly), análise de fluxo de controle/dados, reconhecimento de padrões (bibliotecas, funções), análise de tipos, geração de código intermediário.
*   **Ferramentas Comuns:**
    *   **IDA Pro (com Hex-Rays Decompiler):** Padrão da indústria para desmontagem, com plugin poderoso para descompilação C/C++. (Comercial)
    *   **Ghidra:** Desenvolvida pela NSA, código aberto. Inclui desmontador e descompilador para várias arquiteturas (pseudo-C). (Gratuita)
    *   **Radare2 / Cutter:** Framework de linha de comando (Radare2) e GUI (Cutter) com capacidades de desmontagem e descompilação. (Código aberto)
    *   **Binary Ninja:** Ferramenta comercial com bom descompilador e interface moderna.
    *   **JEB Decompiler:** Foco em bytecode Android (Dalvik/ART) e outros formatos. (Comercial)
    *   **dnSpy / ILSpy:** Para descompilar assemblies .NET (C#, VB.NET) para C# ou IL. (Código aberto)
    *   **Jadx / JAD:** Para descompilar bytecode Java (.class, .jar, .apk) para Java.
*   **Relevância Forense:**
    *   **Análise de Malware:** Entender a lógica interna, algoritmos, comunicação, coleta de dados, evasão.
    *   **Compreensão de Funcionalidades:** Ir além da análise dinâmica, entendendo *como* o software funciona.
    *   **Análise de Formatos Proprietários:** Revelar estrutura de arquivos/protocolos customizados usados por malware.
    *   **Comparação de Código:** Identificar variantes de malware ou reutilização de código.

---

## 3.2 Debuggers (Depuradores).

*   **Explicação:** Ferramenta para executar um programa de forma controlada, monitorar seu estado interno e entender seu fluxo de execução passo a passo. Essencial para engenharia reversa e análise de malware.
    *   **Funcionalidades Principais:**
        *   **Pontos de Interrupção (Breakpoints):** Pausar execução em locais específicos (instrução, função, acesso à memória - watchpoints).
        *   **Execução Passo a Passo (Stepping):** `Step Over` (executa função e para após), `Step Into` (entra na função), `Step Out` (sai da função atual).
        *   **Inspeção de Memória e Registradores:** Visualizar/modificar conteúdo de registradores da CPU e memória.
        *   **Visualização da Pilha de Chamadas (Call Stack):** Sequência de chamadas de função.
    *   **Tipos:**
        *   **Nível de Código-Fonte:** Operam com código-fonte (Ex: GDB, PDB, debuggers de IDEs).
        *   **Nível de Assembly/Máquina:** Operam em código de máquina/Assembly. Essenciais quando não há código-fonte (Ex: OllyDbg, x64dbg, WinDbg, IDA Pro Debugger, Ghidra Debugger).
        *   **Debuggers de Kernel:** Para depurar SO ou drivers (Ex: WinDbg, KGDB).
*   **Ferramentas Comuns:**
    *   **GDB (GNU Debugger):** Para Linux/Unix, muitas linguagens.
    *   **OllyDbg (Windows 32-bit):** Popular para análise de binários Win32 (descontinuado, mas usado).
    *   **x64dbg (Windows 32/64-bit):** Sucessor moderno do OllyDbg, código aberto.
    *   **WinDbg (Windows):** Poderoso debugger da Microsoft (user e kernel mode).
    *   **IDA Pro Debugger / Ghidra Debugger:** Integrados às respectivas suítes.
*   **Relevância Forense:**
    *   **Análise Dinâmica de Malware:** Principal ferramenta. Permite observar comportamento passo a passo em ambiente controlado.
    *   **Entendimento de Algoritmos Complexos/Ofuscados:** Observar o que o código faz em tempo de execução.
    *   **Desvio de Técnicas Anti-Análise:** Contornar ou identificar técnicas anti-debugging/anti-VM.
    *   **Extração de Informações em Tempo de Execução:** Chaves de criptografia, strings decodificadas, endereços de C2.
    *   **Análise de Exploits:** Entender como vulnerabilidades são exploradas.

---

## 3.3 Análise de código malicioso: vírus, backdoors, keyloggers, worms e outros.

*   **Explicação:** Aplicação de técnicas de engenharia reversa (estática e dinâmica) para entender a natureza, propósito e impacto de diferentes categorias de malware.
    *   **Categorias Comuns:**
        *   **Vírus:** Anexa-se a hospedeiros, requer execução do hospedeiro para se propagar.
            *   *Análise:* Mecanismo de infecção, payload, propagação.
        *   **Backdoor:** Permite acesso remoto não autorizado e secreto, contornando autenticação.
            *   *Análise:* Ativação, funcionalidades remotas, comunicação.
        *   **Keylogger:** Captura e registra teclas digitadas (senhas, dados confidenciais).
            *   *Análise:* Método de captura, armazenamento/transmissão dos logs.
        *   **Worm:** Autônomo, replica-se e propaga-se por redes explorando vulnerabilidades.
            *   *Análise:* Vulnerabilidade explorada, scanning de rede, método de cópia, payload.
        *   **Outros:** **Trojan** (disfarçado de software legítimo), **Spyware** (coleta informações do usuário), **Adware** (anúncios indesejados), **Ransomware** (criptografa dados e exige resgate), **Rootkit** (acesso privilegiado e ocultação), **Botnet** (rede de computadores infectados controlados remotamente).
    *   **Processo Geral de Análise de Malware:**
        1.  **Preparação do Ambiente:** Sandbox segura e isolada (VMs, redes isoladas).
        2.  **Análise Estática Básica:** Sem executar (strings, formato do arquivo PE/ELF, imports/exports, assinaturas AV, detecção de packer).
        3.  **Análise Dinâmica Básica:** Executar em sandbox, monitorar comportamento (sistema de arquivos, registro, processos, tráfego de rede com ProcMon, Wireshark, Regshot).
        4.  **Análise Estática Avançada:** Desmontagem/descompilação.
        5.  **Análise Dinâmica Avançada:** Depuração passo a passo.
*   **Relevância Forense:**
    *   Atribuição (difícil), determinação do vetor de infecção, avaliação do impacto.
    *   Desenvolvimento de assinaturas de detecção, ferramentas de remoção.
    *   Coleta de Indicadores de Comprometimento (IoCs: hashes, IPs/domínios C2, chaves de registro).
    *   Entendimento de Táticas, Técnicas e Procedimentos (TTPs) de atores maliciosos.

---

## 3.4 Ofuscação de código.

*   **Explicação:** Técnicas para modificar um programa tornando seu código difícil de ser entendido e revertido por humanos ou ferramentas, sem alterar sua funcionalidade. Usada por malware para evadir detecção e dificultar análise.
    *   **Técnicas Comuns:**
        *   **Renomeação de Identificadores:** Nomes sem sentido para variáveis/funções.
        *   **Inserção de Código Morto/Lixo:** Código inútil para confundir.
        *   **Código Espaguete:** Fluxo de controle complexo com `goto`s.
        *   **Predicados Opacos:** Condições sempre V ou F, mas de forma não óbvia.
        *   **Criptografia/Codificação de Strings e Dados:** Decifrados apenas em tempo de execução.
        *   **Auto-Modificação de Código:** Altera suas próprias instruções em runtime.
        *   **Virtualização de Código:** Traduz código para bytecode customizado interpretado por uma VM embutida.
        *   **Empacotamento (Packing):** Ver item 3.5.
        *   **Flattening do Fluxo de Controle:** Transforma estrutura de controle em um grande loop com dispatcher.
*   **Relevância Forense:**
    *   Aumenta drasticamente a dificuldade e o tempo de análise de malware.
    *   Exige uso de depuradores para observar código desofuscado na memória, scripts para automatizar desofuscação, ou análise manual cuidadosa.
    *   Foco em comportamento (análise dinâmica) torna-se mais importante se a desofuscação estática for impraticável.

---

## 3.5 Compactadores de código executável.

*   **Explicação:** Utilitários (packers) que comprimem e/ou criptografam um executável (payload), adicionando um "stub" (rotina de descompactação/descriptografia). Quando executado, o stub desempacota o payload original na memória e o executa.
    *   **Objetivos:** Redução de tamanho (originalmente), proteção contra engenharia reversa (principal uso atual, especialmente por malware), evasão de AV.
    *   **Tipos:** Simples compactadores (UPX), Crypters (foco em criptografia), Protetores de Software (Themida, VMProtect - combinam packing, criptografia, anti-análise).
*   **Técnicas para Lidar com Packers:**
    *   **Identificação:** PEiD, Detect It Easy (DiE), Exeinfo PE.
    *   **Desempacotamento Manual:** Usar debugger para rodar o stub até o Original Entry Point (OEP) do payload na memória, e então fazer um dump.
    *   **Desempacotadores Específicos/Genéricos.**
*   **Relevância Forense:**
    *   Forma comum de ofuscação de malware. Desempacotar é frequentemente o primeiro passo.
    *   Dificulta análise estática do payload.
    *   Packers avançados usam técnicas anti-desempacotamento.
    *   Análise dinâmica (depuração) é chave para observar o código após o desempacotamento na memória.

---

## 3.6 Malware polimórfico.

*   **Explicação:** Malware que altera seu código (aparência) a cada nova infecção/execução, mantendo a funcionalidade. Visa evadir detecção por assinaturas.
    *   **Componentes:** Corpo do malware mutável (payload criptografado/ofuscado) e motor de mutação/rotina de descriptografia.
    *   **Técnicas do Motor de Mutação:** Criptografia com chaves variáveis, inserção de código lixo (NOPs), reordenação de instruções, substituição de instruções equivalentes.
    *   **Diferença de Metamórfico:** Polimórfico geralmente descriptografa um payload. Metamórfico reescreve seu próprio corpo completamente a cada vez, sem uma rotina de descriptografia fixa.
*   **Relevância Forense:**
    *   Evasão de assinaturas de AVs tradicionais.
    *   Análise estática é desafiadora; foco na rotina de descriptografia.
    *   Análise dinâmica (sandbox, debugger) é crucial para observar o payload real na memória.
    *   Antivírus usam heurística e análise comportamental para detectar.
    *   Extrair o payload descriptografado da memória durante a depuração é uma técnica chave.

---

## 3.7 Técnicas de sandboxing.

*   **Explicação:** Executar um programa (potencialmente malicioso) em um ambiente isolado e restrito (sandbox) para observar seu comportamento e interações com o sistema, limitando danos ao host.
    *   **Características:** Isolamento (de arquivos, processos, rede), monitoramento e log (chamadas de sistema, acesso a arquivos/registro, rede), controle, reversibilidade (snapshots).
    *   **Implementações:** Baseada em VMs, contêineres, sandboxes específicas de apps, sandboxes online (Any.Run, Hybrid Analysis), configurações manuais.
*   **Técnicas de Evasão de Sandbox (usadas por malware):**
    *   **Detecção de Ambiente Virtual/Sandbox:** Verifica artefatos de VM, falta de atividade do usuário, tempo de sistema.
    *   **Atraso na Execução (Time Bombs):** Ativa payload após um tempo ou condição, esperando o fim da análise.
    *   **Requerimento de Interação do Usuário.**
*   **Relevância Forense:**
    *   **Análise Comportamental Segura de Malware:** Principal técnica para análise dinâmica básica.
    *   **Coleta Rápida de IoCs.**
    *   **Triagem Inicial de Amostras.**
    *   **Limitações:** Malware evasivo pode não revelar comportamento completo. Não substitui análise profunda (estática/depuração).

---

## 3.8 Linguagem Assembly.

*   **Explicação:** Linguagem de programação de baixo nível que representa as instruções de código de máquina de um processador de forma legível por humanos (mnemônicos). Específica para cada arquitetura de processador (x86, ARM, etc.). Um **assembler (montador)** traduz Assembly para código de máquina; um **disassembler (desmontador)** faz o inverso.
    *   **Características:** Controle direto do hardware (registradores, memória), mnemônicos (`MOV`, `ADD`, `JMP`), operandos (registradores, memória, valores imediatos), dependente da arquitetura.
    *   **Conceitos Importantes:**
        *   **Registradores:** Unidades de armazenamento rápido na CPU (EAX, EBX, EIP/Instruction Pointer, ESP/Stack Pointer).
        *   **Pilha (Stack):** Área de memória para endereços de retorno, argumentos de função, variáveis locais (`PUSH`, `POP`).
        *   **Modos de Endereçamento:** Como operandos são especificados.
        *   **Flags:** Indicam resultado de operações (Zero Flag, Carry Flag), usadas em saltos condicionais.
        *   **Chamadas de Sistema (System Calls):** Como requisitar serviços do SO.
*   **Relevância Forense:**
    *   **Análise de Malware em Baixo Nível:** Essencial quando não há código-fonte. É a representação mais próxima do que o malware realmente faz.
    *   **Compreensão de Exploits:** Manipulação de registradores, pilha, fluxo de execução para executar shellcode.
    *   **Análise de Código Ofuscado/Empacotado:** Mesmo se descompilador falhar, Assembly (com depuração) pode revelar a lógica. Stubs de packers são analisados em Assembly.
    *   **Identificação de Funcionalidades Específicas:** Procurar por sequências de instruções Assembly (chamadas de API, etc.).
    *   **Complemento à Descompilação:** Esclarecer ambiguidades ou entender a saída do descompilador.
    *   **Ferramentas:** Desmontadores (IDA Pro, Ghidra, Radare2, objdump), Debuggers (OllyDbg, x64dbg, GDB, WinDbg).

---
