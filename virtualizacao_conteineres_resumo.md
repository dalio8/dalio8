# Virtualização e Contêineres para Concursos (Perito em Informática - CEBRASPE)

## 1. Virtualização

Virtualização é o processo de criar uma representação baseada em software (virtual) de algo físico, como servidores, armazenamento, redes ou aplicações. Isso permite que múltiplos sistemas operacionais e aplicações rodem de forma isolada em um único hardware físico.

**Conceitos Chave:**

*   **Máquina Virtual (VM - Virtual Machine):** É uma emulação completa de um sistema computacional (hardware, sistema operacional e aplicações). Cada VM opera de forma independente e isolada das outras VMs no mesmo hardware físico.
*   **Host:** O sistema físico (hardware) onde o software de virtualização é executado.
*   **Guest:** O sistema operacional e as aplicações que rodam dentro de uma VM.
*   **Hipervisor (Hypervisor) ou Monitor de Máquina Virtual (VMM - Virtual Machine Monitor):** É o software ou firmware que cria, executa e gerencia as máquinas virtuais. Ele é responsável por alocar os recursos do hardware físico (CPU, memória, disco, rede) para as VMs.

**Tipos de Hipervisores:**

1.  **Hipervisor Tipo 1 (Bare-Metal):**
    *   **Conceito:** Executado diretamente sobre o hardware do host, como se fosse o próprio sistema operacional. Não há um SO hospedeiro tradicional entre o hardware e o hipervisor.
    *   **Características:**
        *   Acesso direto aos recursos de hardware.
        *   Geralmente oferece melhor desempenho, escalabilidade e robustez.
        *   Mais comum em ambientes de servidor e data centers.
    *   **Exemplos:**
        *   **KVM (Kernel-based Virtual Machine):** Solução de virtualização para Linux que transforma o kernel do Linux em um hipervisor. Permite que o Linux execute VMs nativamente. É uma tecnologia de virtualização completa para arquiteturas x86 que contêm extensões de virtualização (Intel VT ou AMD-V).
        *   VMware ESXi
        *   Microsoft Hyper-V (quando instalado em sua forma "server core" ou como Hyper-V Server)
        *   Xen
        *   Nutanix AHV

2.  **Hipervisor Tipo 2 (Hosted):**
    *   **Conceito:** Executado como uma aplicação sobre um sistema operacional hospedeiro convencional (ex: Windows, macOS, Linux). As VMs rodam sobre o hipervisor, que por sua vez roda sobre o SO do host.
    *   **Características:**
        *   Mais fácil de instalar e gerenciar, pois utiliza a interface e os drivers do SO hospedeiro.
        *   O acesso ao hardware é mediado pelo SO hospedeiro, o que pode introduzir alguma sobrecarga de desempenho em comparação com o Tipo 1.
        *   Comum em desktops e para desenvolvimento/teste.
    *   **Exemplos:**
        *   Oracle VM VirtualBox
        *   VMware Workstation/Fusion/Player
        *   QEMU (pode operar como Tipo 2 ou ser usado em conjunto com KVM para virtualização assistida por hardware)
        *   Parallels Desktop

**Vantagens da Virtualização:**

*   **Consolidação de Servidores:** Reduz o número de servidores físicos, economizando espaço, energia e custos de hardware.
*   **Isolamento:** VMs são isoladas umas das outras; uma falha em uma VM não afeta as outras.
*   **Flexibilidade e Agilidade:** Facilidade para criar, mover, copiar e provisionar novas VMs.
*   **Testes e Desenvolvimento:** Permite criar ambientes de teste isolados sem impactar sistemas de produção.
*   **Recuperação de Desastres (Disaster Recovery):** VMs podem ser facilmente replicadas e restauradas em outros hosts.
*   **Execução de Sistemas Legados:** Permite rodar sistemas operacionais e aplicações antigas em hardware moderno.

## 2. Contêineres

Contêineres representam uma forma de **virtualização em nível de sistema operacional**. Em vez de virtualizar o hardware (como nas VMs), os contêineres virtualizam o próprio sistema operacional, permitindo que múltiplas aplicações isoladas rodem sobre um único kernel do SO hospedeiro.

**Conceitos Chave:**

*   **Isolamento de Processos:** Cada contêiner possui seu próprio ambiente de execução isolado (processos, sistema de arquivos, rede), mas todos compartilham o mesmo kernel do sistema operacional do host.
*   **Leveza:** Contêineres não incluem um sistema operacional completo. Eles contêm apenas a aplicação e suas dependências (bibliotecas, binários). Isso os torna muito menores e mais rápidos para iniciar do que VMs.
*   **Portabilidade:** Uma imagem de contêiner pode ser executada de forma consistente em qualquer ambiente que suporte a tecnologia de contêinerização (desenvolvimento, teste, produção, nuvem).

**Diferenças entre Contêineres e Máquinas Virtuais (VMs):**

| Característica        | Contêineres                                       | Máquinas Virtuais (VMs)                          |
| :-------------------- | :------------------------------------------------ | :----------------------------------------------- |
| **Virtualização**     | No nível do Sistema Operacional                   | No nível do Hardware                             |
| **Isolamento**        | Processos isolados, kernel compartilhado          | Isolamento completo (kernel próprio por VM)      |
| **Recursos**          | Compartilham o kernel do SO do host               | Cada VM tem seu próprio SO e kernel              |
| **Tamanho**           | Leves (geralmente MBs)                            | Pesadas (geralmente GBs)                         |
| **Tempo de Inicialização** | Rápido (segundos ou menos)                      | Lento (minutos)                                  |
| **Overhead**          | Baixo                                             | Alto (devido à execução de um SO completo)       |
| **Densidade**         | Maior número de contêineres por host              | Menor número de VMs por host                     |
| **Portabilidade**     | Alta entre hosts com o mesmo tipo de SO           | Alta entre diferentes hardwares (com hipervisor) |
| **Caso de Uso Típico** | Aplicações, microsserviços, desenvolvimento/teste | Executar SOs diferentes, isolamento de segurança forte |

### 2.1. Docker

Docker é uma plataforma aberta para desenvolver, empacotar, distribuir e executar aplicações dentro de contêineres. Ele automatiza a implantação de aplicações como contêineres portáteis e autossuficientes.

**Arquitetura do Docker:**

Docker utiliza uma arquitetura cliente-servidor:

1.  **Docker Daemon (`dockerd`):**
    *   É um processo persistente que gerencia os objetos Docker (imagens, contêineres, redes, volumes).
    *   Escuta as requisições da API Docker e as processa.
    *   Pode se comunicar com outros daemons para gerenciar serviços Docker.

2.  **Docker Client (`docker`):**
    *   A principal interface de linha de comando (CLI) para interagir com o Docker.
    *   Envia comandos para o `dockerd` via API REST (por sockets UNIX ou interface de rede).
    *   Pode se comunicar com um ou mais daemons.

3.  **Docker Registries (Registros):**
    *   Armazenam imagens Docker.
    *   **Docker Hub:** Um registro público padrão usado pelo Docker para buscar imagens (e onde usuários podem enviar suas próprias imagens públicas ou privadas).
    *   **Registros Privados:** Podem ser configurados para armazenar imagens internamente em uma organização.
    *   Comandos como `docker pull` baixam imagens de um registro, e `docker push` envia imagens para um registro.

4.  **Docker Desktop:**
    *   Uma aplicação para Mac, Windows ou Linux que facilita a construção e o compartilhamento de aplicações containerizadas e microsserviços.
    *   Inclui o Docker Daemon, Docker Client, Docker Compose, Kubernetes (opcional), etc.

**Objetos Docker Principais:**

*   **Imagem Docker (Image):**
    *   Um template somente leitura com instruções para criar um contêiner Docker.
    *   É construída a partir de um **Dockerfile**.
    *   Consiste em camadas (layers) empilhadas. Cada instrução no Dockerfile cria uma nova camada.
    *   Imagens podem ser baseadas em outras imagens (imagens base), com customizações adicionais.
    *   São leves, pequenas e rápidas devido ao sistema de camadas e ao compartilhamento de camadas.

*   **Contêiner Docker (Container):**
    *   Uma instância executável de uma imagem Docker.
    *   É um ambiente isolado que executa uma aplicação.
    *   Pode ser criado, iniciado, parado, movido e excluído.
    *   Por padrão, é bem isolado de outros contêineres e da máquina hospedeira.
    *   As alterações feitas dentro de um contêiner (no seu sistema de arquivos em tempo de execução) são perdidas quando o contêiner é removido, a menos que armazenadas em volumes persistentes.

*   **Dockerfile:**
    *   Um arquivo de texto que contém uma sequência de instruções (comandos) para construir uma imagem Docker automaticamente.
    *   **Instruções Comuns:**
        *   `FROM`: Especifica a imagem base a partir da qual construir.
        *   `RUN`: Executa comandos na camada da imagem (ex: instalar pacotes).
        *   `COPY`: Copia arquivos e diretórios do contexto de build para o sistema de arquivos da imagem.
        *   `ADD`: Similar ao `COPY`, mas com funcionalidades adicionais como descompactação de TARs locais e download de URLs.
        *   `CMD`: Define o comando padrão a ser executado quando um contêiner é iniciado a partir da imagem. Pode ser sobrescrito ao iniciar o contêiner.
        *   `ENTRYPOINT`: Configura um contêiner para ser executado como um executável. Os argumentos passados para `docker run` são anexados ao `ENTRYPOINT`.
        *   `WORKDIR`: Define o diretório de trabalho para as instruções `RUN`, `CMD`, `ENTRYPOINT`, `COPY` e `ADD`.
        *   `ENV`: Define variáveis de ambiente.
        *   `EXPOSE`: Informa quais portas de rede o contêiner escuta em tempo de execução (não publica a porta automaticamente).
        *   `VOLUME`: Cria um ponto de montagem para volumes persistentes.
        *   `USER`: Define o nome de usuário (ou UID) para executar as instruções `RUN`, `CMD` e `ENTRYPOINT`.
        *   `ARG`: Define variáveis que podem ser passadas durante o build da imagem.
        *   `LABEL`: Adiciona metadados à imagem.
        *   `ONBUILD`: Especifica instruções que serão executadas quando a imagem for usada como base para outra imagem.
        *   `HEALTHCHECK`: Define como verificar se um contêiner está saudável.

*   **Docker Hub:**
    *   Um serviço de registro hospedado na nuvem pela Docker Inc.
    *   Permite encontrar e compartilhar imagens de contêineres com a comunidade ou de forma privada.
    *   É o registro padrão para comandos Docker como `pull` e `push`.

**Tecnologia Subjacente (Principalmente no Linux):**

*   **Namespaces (Espaços de Nomes):** Fornecem isolamento para recursos do sistema como PIDs (processos), NET (rede), MNT (pontos de montagem), UTS (hostname), IPC (comunicação entre processos) e USER (usuários). Cada contêiner tem seu próprio conjunto de namespaces.
*   **Control Groups (cgroups):** Limitam e isolam o uso de recursos (CPU, memória, E/S de disco) por um conjunto de processos (contêiner).
*   **Union File Systems (UnionFS):** Permitem que sistemas de arquivos de diferentes camadas sejam sobrepostos, formando um único sistema de arquivos coeso para o contêiner. Isso é o que torna as imagens Docker leves e eficientes.

### 2.2. Kubernetes (K8s)

Kubernetes é uma plataforma de orquestração de contêineres de código aberto, originalmente desenvolvida pelo Google. Ele automatiza a implantação, o escalonamento e o gerenciamento de aplicações em contêineres.

**Função Principal: Orquestração de Contêineres**

A orquestração envolve o gerenciamento do ciclo de vida de contêineres em um cluster de máquinas, incluindo:

*   **Provisionamento e Implantação:** Definir e implantar aplicações em contêineres.
*   **Escalonamento:** Aumentar ou diminuir o número de instâncias de contêineres conforme a demanda.
*   **Balanceamento de Carga:** Distribuir o tráfego de rede entre múltiplas instâncias de um contêiner.
*   **Autocorreção (Self-healing):** Reiniciar contêineres que falham, substituir contêineres em nós problemáticos.
*   **Descoberta de Serviços:** Permitir que contêineres se encontrem e se comuniquem.
*   **Gerenciamento de Configuração e Segredos:** Gerenciar informações de configuração e dados sensíveis.
*   **Atualizações e Rollbacks:** Gerenciar atualizações de aplicações de forma controlada e permitir reversões.

**Conceitos Básicos do Kubernetes:**

*   **Cluster:** Um conjunto de máquinas (nós) que executam aplicações em contêineres gerenciadas pelo Kubernetes. Um cluster consiste em um Control Plane (mestre) e um ou mais Nós (workers).
    *   **Control Plane:** Gerencia o estado do cluster (escalonamento, atualizações, etc.). Componentes incluem:
        *   `kube-apiserver`: Expõe a API do Kubernetes.
        *   `etcd`: Banco de dados chave-valor consistente e altamente disponível usado como armazenamento de backend para todos os dados do cluster.
        *   `kube-scheduler`: Observa novos Pods sem nó atribuído e seleciona um nó para eles executarem.
        *   `kube-controller-manager`: Executa os processos de controle.
    *   **Nó (Node / Worker Node):** Máquina (física ou virtual) onde os contêineres são efetivamente executados. Componentes incluem:
        *   `kubelet`: Agente que garante que os contêineres descritos nos PodSpecs estejam rodando e saudáveis.
        *   `kube-proxy`: Mantém as regras de rede nos nós, permitindo a comunicação de rede para os Pods.
        *   **Container Runtime:** O software que executa os contêineres (ex: Docker, containerd, CRI-O).

*   **Pod:**
    *   A menor e mais simples unidade de implantação no Kubernetes.
    *   Representa uma única instância de um processo em execução no cluster.
    *   Pode conter um ou mais contêineres (ex: uma aplicação principal e um contêiner "sidecar" para logging ou monitoramento) que compartilham recursos de rede (endereço IP) e armazenamento (volumes).
    *   Pods são efêmeros; se um nó falha, os pods nesse nó são perdidos.

*   **Service (Serviço):**
    *   Define uma abstração lógica para acessar um conjunto de Pods que executam a mesma aplicação.
    *   Fornece um endereço IP estável e uma entrada DNS para um conjunto de Pods, mesmo que os Pods subjacentes sejam criados ou destruídos.
    *   Permite o balanceamento de carga entre os Pods.
    *   **Tipos de Service:** ClusterIP (interno), NodePort (expõe em uma porta estática em cada nó), LoadBalancer (usa um balanceador de carga da nuvem), ExternalName.

*   **Deployment (Implantação):**
    *   Objeto de nível superior que gerencia a implantação e o escalonamento de aplicações stateless (sem estado).
    *   Define o estado desejado para um conjunto de Pods (ex: número de réplicas, imagem do contêiner a ser usada).
    *   Permite atualizações graduais (rolling updates) e rollbacks para versões anteriores da aplicação.
    *   Usa ReplicaSets para garantir que o número desejado de Pods esteja sempre em execução.

*   **Namespace (Espaço de Nomes):**
    *   Mecanismo para dividir os recursos de um cluster em múltiplos ambientes virtuais isolados.
    *   Usado para organizar recursos, evitar conflitos de nomes e aplicar políticas de recursos e segurança a subconjuntos de usuários ou projetos.
    *   Recursos dentro de um namespace devem ter nomes únicos, mas o mesmo nome pode ser usado em namespaces diferentes.

*   **ConfigMap e Secret:**
    *   **ConfigMap:** Usado para armazenar dados de configuração não sensíveis em pares chave-valor, que podem ser consumidos por Pods como variáveis de ambiente, argumentos de linha de comando ou arquivos de configuração em um volume.
    *   **Secret:** Similar ao ConfigMap, mas projetado para armazenar dados sensíveis, como senhas, tokens OAuth e chaves SSH. Os dados são armazenados de forma codificada (base64, não criptografada por padrão no etcd, a menos que a criptografia em repouso seja habilitada).

**Vantagens do Kubernetes:**

*   **Alta Disponibilidade e Tolerância a Falhas.**
*   **Escalabilidade Horizontal Automática.**
*   **Portabilidade entre diferentes ambientes (nuvem, on-premises).**
*   **Gerenciamento eficiente de recursos.**
*   **Ecossistema vasto e comunidade ativa.**

A combinação de Docker para criar e gerenciar contêineres individuais e Kubernetes para orquestrar esses contêineres em escala é uma prática comum em arquiteturas de microsserviços e implantações de aplicações modernas.
