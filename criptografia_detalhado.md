# Detalhamento dos Subtópicos de "9. Criptografia" (Edital Perito Criminal Federal – Área 3)

A criptografia é a ciência e arte de escrever mensagens em forma cifrada ou em código, de modo que apenas o destinatário pretendido possa lê-las. É fundamental para a segurança da informação, garantindo confidencialidade, integridade, autenticidade e não repúdio. Para um perito em informática forense, o conhecimento de criptografia é essencial para analisar dados protegidos, entender mecanismos de segurança, investigar o uso de criptografia por criminosos e, em alguns casos, tentar contornar ou quebrar cifras fracas.

---

## 9.1 Sistemas criptográficos simétricos e assimétricos.

*   **Explicação:** São as duas categorias principais de algoritmos de criptografia baseadas no tipo de chave(s) usada(s) para cifrar e decifrar dados.
    *   **Criptografia Simétrica (ou de Chave Secreta/Chave Única):**
        *   **Conceito:** Utiliza a **mesma chave** tanto para o processo de cifragem (criptografia) quanto para o de decifragem (decriptografia). O remetente e o destinatário devem compartilhar essa chave secreta previamente.
        *   **Características:**
            *   **Velocidade:** Geralmente são muito rápidos e eficientes, adequados para cifrar grandes volumes de dados.
            *   **Desafio:** A distribuição segura da chave secreta entre as partes é o principal desafio. Se a chave for interceptada, a segurança é comprometida.
            *   **Força:** A segurança depende do tamanho da chave e da robustez do algoritmo.
        *   **Tipos de Cifras Simétricas:**
            *   **Cifras de Fluxo (Stream Ciphers):** Cifram os dados bit a bit ou byte a byte (ex: RC4).
            *   **Cifras de Bloco (Block Ciphers):** Cifram os dados em blocos de tamanho fixo (ex: AES, DES, 3DES, Blowfish, Twofish, IDEA). Requerem modos de operação para lidar com dados maiores que o tamanho do bloco (ver item 9.3).
        *   **Exemplos de Algoritmos:** AES, DES, 3DES, RC4, Blowfish, Twofish, IDEA.
    *   **Criptografia Assimétrica (ou de Chave Pública/Chave Dupla):**
        *   **Conceito:** Utiliza um **par de chaves matematicamente relacionadas**: uma chave pública e uma chave privada.
            *   A **chave pública** pode ser livremente distribuída e é usada para cifrar os dados ou para verificar uma assinatura digital.
            *   A **chave privada** deve ser mantida em segredo pelo seu proprietário e é usada para decifrar os dados (cifrados com a chave pública correspondente) ou para criar uma assinatura digital.
        *   **Características:**
            *   **Distribuição de Chaves:** Resolve o problema da distribuição segura de chaves da criptografia simétrica, pois a chave pública não precisa ser secreta.
            *   **Velocidade:** Geralmente são muito mais lentos que os algoritmos simétricos, tornando-os inadequados para cifrar grandes volumes de dados diretamente.
            *   **Uso Comum:**
                *   **Troca de Chaves Simétricas (Key Exchange):** Usada para estabelecer de forma segura uma chave simétrica compartilhada, que será então usada para cifrar a comunicação principal (ex: no SSL/TLS, Diffie-Hellman).
                *   **Assinaturas Digitais:** Para garantir autenticidade, integridade e não repúdio (ver item 9.2).
                *   **Cifragem de Pequenas Quantidades de Dados:** Como chaves de sessão ou mensagens curtas.
        *   **Exemplos de Algoritmos:** RSA, ECC (Criptografia de Curvas Elípticas), Diffie-Hellman (para troca de chaves), DSA (Digital Signature Algorithm - Algoritmo de Assinatura Digital).
*   **Relevância Forense:**
    *   **Análise de Dados Cifrados:** Identificar se os dados apreendidos estão cifrados e, se possível, o tipo de criptografia (simétrica ou assimétrica) é um passo inicial.
    *   **Criptografia Simétrica:** Se arquivos ou discos inteiros estão cifrados com algoritmos simétricos (ex: BitLocker, TrueCrypt/VeraCrypt usando AES), o acesso à chave secreta (geralmente derivada de uma senha ou frase secreta) é necessário para decifrar os dados. Ataques de força bruta contra a senha podem ser tentados se a chave não for conhecida.
    *   **Criptografia Assimétrica:**
        *   **Comunicação Segura:** Malware pode usar criptografia assimétrica para proteger sua comunicação com servidores C2 (ex: cifrando chaves simétricas de sessão com a chave pública do C2).
        *   **Ransomware:** Frequentemente usa um esquema híbrido: uma chave simétrica aleatória é gerada para cifrar os arquivos da vítima rapidamente; essa chave simétrica é então cifrada com a chave pública do atacante e armazenada no sistema da vítima (ou enviada ao atacante). A vítima precisa pagar para obter a chave privada do atacante para decifrar a chave simétrica e, consequentemente, seus arquivos.
        *   **Assinaturas Digitais:** Verificar a autenticidade de e-mails, documentos ou software.
    *   **Extração de Chaves:** Em análises de memória RAM (live forensics) ou hibernação, pode ser possível encontrar chaves de criptografia simétricas ou privadas em claro.

---

## 9.2 Certificação digital.

*   **Explicação:**
    *   **Conceito:** Um mecanismo que utiliza criptografia assimétrica para vincular uma chave pública a uma identidade (de uma pessoa, organização ou servidor). O objetivo é prover autenticidade, permitindo que terceiros verifiquem que uma chave pública realmente pertence à entidade que alega ser sua proprietária.
    *   **Certificado Digital (X.509):** É um documento eletrônico assinado digitalmente por uma Autoridade Certificadora (AC - Certification Authority) confiável. Contém:
        *   A chave pública da entidade.
        *   Informações de identificação da entidade (nome, e-mail, organização, etc.).
        *   Nome da Autoridade Certificadora emissora.
        *   Período de validade do certificado.
        *   Número de série único do certificado.
        *   Assinatura digital da AC (criada com a chave privada da AC).
    *   **Autoridade Certificadora (AC - CA):** Entidade confiável responsável por emitir, gerenciar, revogar e renovar certificados digitais. A confiança na AC é fundamental para a validade do sistema.
    *   **Infraestrutura de Chaves Públicas (ICP ou PKI - Public Key Infrastructure):** Conjunto de hardware, software, políticas, padrões, processos e pessoas necessários para criar, gerenciar, distribuir, usar, armazenar e revogar certificados digitais e chaves públicas.
        *   **Componentes de uma PKI:** ACs, ARs (Autoridades de Registro - validam a identidade antes da emissão do certificado), repositórios de certificados, listas de certificados revogados (LCRs ou CRLs - Certificate Revocation Lists), protocolo OCSP (Online Certificate Status Protocol - para verificar o status de um certificado em tempo real).
        *   **ICP-Brasil:** A infraestrutura oficial de chaves públicas do Brasil, que viabiliza a emissão de certificados digitais com validade jurídica para diversas aplicações (NF-e, e-CPF, e-CNPJ).
    *   **Cadeia de Certificação (ou Caminho de Certificação):** Uma hierarquia de certificados onde um certificado é assinado pela AC de nível superior, que por sua vez pode ter seu certificado assinado por uma AC ainda mais alta, até chegar a uma AC Raiz (Root CA) autoassinada e amplamente confiável (cujos certificados públicos são distribuídos com navegadores e sistemas operacionais).
    *   **Uso Principal:**
        *   **SSL/TLS:** Para autenticar servidores web (HTTPS) e, opcionalmente, clientes.
        *   **Assinaturas Digitais:** Para garantir autenticidade, integridade e não repúdio de documentos e e-mails.
        *   **Criptografia de E-mail (S/MIME, PGP):** Para cifrar e assinar e-mails.
        *   **Autenticação de Software:** Para verificar a origem e integridade de códigos executáveis.
*   **Relevância Forense:**
    *   **Verificação de Autenticidade:** Analisar certificados digitais usados em comunicações HTTPS, e-mails assinados (S/MIME) ou software assinado para verificar a identidade do servidor, remetente ou desenvolvedor.
    *   **Certificados Fraudulentos ou Comprometidos:** Investigar o uso de certificados falsos, autoassinados suspeitos, ou certificados emitidos por ACs comprometidas, que podem ser usados em ataques MitM, phishing ou para distribuir malware assinado.
    *   **Análise de Tráfego SSL/TLS:** Mesmo que o conteúdo seja criptografado, o certificado do servidor é trocado em texto claro durante o handshake TLS, permitindo identificar o servidor ao qual o cliente está se conectando (a menos que técnicas como ESNI/ECH sejam usadas).
    *   **Logs de ACs e Repositórios:** Em investigações maiores, pode ser necessário obter informações de ACs sobre a emissão ou revogação de certificados.
    *   **Malware e Certificados:** Alguns malwares usam certificados roubados para assinar seus executáveis e parecerem legítimos, ou instalam certificados raiz falsos para interceptar tráfego HTTPS.

---

## 9.3 Modos de operação de cifras.

*   **Explicação:** Cifras de bloco simétricas (como AES, DES) operam em blocos de dados de tamanho fixo (ex: 128 bits para AES). Para cifrar mensagens maiores que o tamanho do bloco, são necessários **modos de operação**. Eles especificam como aplicar repetidamente a operação de cifragem de um único bloco para transformar com segurança sequências de blocos.
    *   **Principais Modos de Operação:**
        *   **ECB (Electronic Codebook - Livro de Códigos Eletrônico):**
            *   **Funcionamento:** Cada bloco de texto claro é cifrado independentemente com a mesma chave.
            *   **Características:** Simples, permite processamento paralelo.
            *   **Desvantagens:** **Não é semanticamente seguro.** Blocos de texto claro idênticos resultam em blocos de texto cifrado idênticos, o que revela padrões nos dados (ex: uma imagem cifrada em ECB ainda pode mostrar o contorno da imagem original). Não deve ser usado para a maioria das aplicações.
        *   **CBC (Cipher Block Chaining - Encadeamento de Blocos de Cifra):**
            *   **Funcionamento:** Cada bloco de texto claro é combinado (XOR) com o bloco de texto cifrado anterior antes de ser cifrado. Para o primeiro bloco, um **Vetor de Inicialização (IV - Initialization Vector)** aleatório e único é usado.
            *   **Características:** A cifragem de cada bloco depende do anterior, propagando erros (um erro em um bloco cifrado afeta a decifragem dele e do próximo). A decifragem pode ser paralela. Requer um IV que não precisa ser secreto, mas deve ser único para cada mensagem cifrada com a mesma chave.
            *   **Segurança:** Mais seguro que ECB, pois blocos de texto claro idênticos resultam em blocos de texto cifrado diferentes.
        *   **CFB (Cipher Feedback - Realimentação de Cifra):**
            *   **Funcionamento:** Permite que uma cifra de bloco seja usada como uma cifra de fluxo. O bloco de texto cifrado anterior (ou o IV para o primeiro bloco) é cifrado, e o resultado é combinado (XOR) com o bloco de texto claro para produzir o bloco de texto cifrado atual. Pode operar em segmentos menores que o tamanho do bloco da cifra.
            *   **Características:** A decifragem também usa a operação de cifragem do algoritmo de bloco. Erros de transmissão em um bloco cifrado afetam a decifragem dele e dos próximos blocos até que o buffer de realimentação seja preenchido com dados corretos.
        *   **OFB (Output Feedback - Realimentação de Saída):**
            *   **Funcionamento:** Também permite que uma cifra de bloco seja usada como uma cifra de fluxo. Gera um fluxo de chave (keystream) cifrando repetidamente um IV. O fluxo de chave é então combinado (XOR) com o texto claro para produzir o texto cifrado (similar ao RC4).
            *   **Características:** A operação de cifragem do algoritmo de bloco é usada tanto para cifrar quanto para decifrar. Erros de transmissão em um bit do texto cifrado afetam apenas o bit correspondente do texto claro decifrado (não se propagam). O IV deve ser único.
        *   **CTR (Counter Mode - Modo Contador):**
            *   **Funcionamento:** Também transforma uma cifra de bloco em uma cifra de fluxo. Gera um fluxo de chave cifrando os valores sucessivos de um "contador" (que geralmente começa com um nonce - número usado uma única vez - e é incrementado para cada bloco). O fluxo de chave é combinado (XOR) com o texto claro.
            *   **Características:** Permite cifragem e decifragem paralelas. Acesso aleatório aos blocos de texto cifrado. O contador (nonce + valor do contador) deve ser único para cada bloco cifrado com a mesma chave.
        *   **GCM (Galois/Counter Mode):**
            *   **Funcionamento:** Um modo de operação autenticado (AEAD - Authenticated Encryption with Associated Data). Fornece tanto confidencialidade (usando o modo CTR) quanto autenticidade e integridade dos dados (usando um código de autenticação de mensagem baseado em polinômios sobre um corpo de Galois - GMAC).
            *   **Características:** Altamente eficiente e seguro. Amplamente usado (ex: TLS 1.2+, IPsec, SSH).
        *   **Outros Modos:** CCM (Counter with CBC-MAC), XTS-AES (para criptografia de disco).
*   **Relevância Forense:**
    *   **Identificação do Modo de Operação:** Ao analisar dados cifrados, se o algoritmo simétrico for conhecido (ex: AES), identificar o modo de operação é crucial para tentar qualquer forma de análise ou ataque.
    *   **Análise de IVs/Nonces:** IVs e nonces são geralmente transmitidos em texto claro junto com o texto cifrado. Se um IV/nonce for reutilizado com a mesma chave em modos como CBC, CFB, OFB ou CTR, isso pode levar a sérias vulnerabilidades de segurança (ex: permitir a quebra da cifra).
    *   **Ataques a Modos de Operação:** Alguns modos têm vulnerabilidades específicas se usados incorretamente (ex: ataque de preenchimento (padding oracle attack) em CBC se a implementação do preenchimento e o tratamento de erros não forem cuidadosos).
    *   **ECB em Dados Cifrados:** Se um arquivo grande cifrado exibe padrões repetitivos, isso é um forte indicador do uso do modo ECB, o que sugere uma implementação criptográfica fraca.
    *   **Modos Autenticados (GCM, CCM):** A falha na verificação da tag de autenticação indica que os dados foram alterados ou não são autênticos.

---

## 9.4 Algoritmos RSA, AES, ECC, IDEA, Twofish, Blowfish, 3DES e RC4.

*   **Explicação:** Detalhes sobre algoritmos criptográficos específicos.
    *   **RSA (Rivest-Shamir-Adleman):**
        *   **Tipo:** Assimétrico (chave pública).
        *   **Uso:** Cifragem, assinaturas digitais, troca de chaves.
        *   **Funcionamento:** Baseado na dificuldade matemática de fatorar números inteiros grandes (o produto de dois grandes números primos).
        *   **Chaves:** Chave pública (n, e) e chave privada (n, d), onde n = p*q (p, q são primos grandes).
        *   **Tamanho da Chave Comum:** 1024 (legado, vulnerável), 2048, 3072, 4096 bits.
        *   **Relevância Forense:** Amplamente usado em SSL/TLS, PGP, assinaturas de software. A quebra do RSA (com chaves de tamanho adequado) é computacionalmente inviável com a tecnologia atual (exceto por falhas de implementação ou chaves fracas).
    *   **AES (Advanced Encryption Standard - Padrão de Criptografia Avançado):**
        *   **Tipo:** Simétrico (cifra de bloco).
        *   **Uso:** Cifragem de dados em massa. Padrão do governo dos EUA e amplamente adotado mundialmente.
        *   **Funcionamento:** Baseado na rede de substituição-permutação (SPN). Opera em blocos de 128 bits.
        *   **Chaves:** Tamanhos de 128, 192 ou 256 bits. O número de rodadas (rounds) de processamento depende do tamanho da chave (10, 12 ou 14 rodadas).
        *   **Relevância Forense:** Usado em criptografia de disco (BitLocker, FileVault), WPA2/3, TLS, compressão de arquivos (7-Zip, WinRAR). Considerado muito seguro se implementado corretamente e com chaves fortes.
    *   **ECC (Elliptic Curve Cryptography - Criptografia de Curvas Elípticas):**
        *   **Tipo:** Assimétrico (chave pública).
        *   **Uso:** Alternativa ao RSA, oferecendo segurança comparável com chaves significativamente menores. Usado para cifragem, assinaturas digitais (ECDSA), troca de chaves (ECDH).
        *   **Funcionamento:** Baseado na dificuldade matemática de encontrar o logaritmo discreto de um ponto aleatório de curva elíptica em relação a um ponto base publicamente conhecido (Elliptic Curve Discrete Logarithm Problem - ECDLP).
        *   **Tamanho da Chave Comum:** Chaves ECC de 256 bits oferecem segurança comparável a RSA de 3072 bits.
        *   **Relevância Forense:** Usado em TLS, assinaturas digitais, criptomoedas (Bitcoin, Ethereum usam ECDSA com a curva secp256k1).
    *   **IDEA (International Data Encryption Algorithm - Algoritmo Internacional de Criptografia de Dados):**
        *   **Tipo:** Simétrico (cifra de bloco).
        *   **Uso:** Usado no PGP (Pretty Good Privacy).
        *   **Funcionamento:** Opera em blocos de 64 bits, com chave de 128 bits.
        *   **Relevância Forense:** Menos comum que AES hoje, mas pode ser encontrado em implementações PGP mais antigas.
    *   **Twofish:**
        *   **Tipo:** Simétrico (cifra de bloco).
        *   **Uso:** Foi um dos finalistas do concurso AES. Livre de patentes e não licenciado.
        *   **Funcionamento:** Opera em blocos de 128 bits, com chaves de tamanho variável (128, 192 ou 256 bits). Usa uma rede de Feistel.
        *   **Relevância Forense:** Pode ser encontrado em software de criptografia de código aberto.
    *   **Blowfish:**
        *   **Tipo:** Simétrico (cifra de bloco).
        *   **Uso:** Projetado por Bruce Schneier. Rápido e livre de patentes.
        *   **Funcionamento:** Opera em blocos de 64 bits, com chaves de tamanho variável (32 a 448 bits). Usa uma rede de Feistel.
        *   **Relevância Forense:** Usado em diversas aplicações de software (ex: gerenciadores de senha, utilitários de criptografia). O tamanho de bloco de 64 bits é considerado pequeno para alguns padrões modernos (pode ser vulnerável a ataques de aniversário se muitos dados forem cifrados com a mesma chave).
    *   **3DES (Triple DES - DES Triplo):**
        *   **Tipo:** Simétrico (cifra de bloco).
        *   **Uso:** Criado para aumentar a segurança do DES (Data Encryption Standard - Padrão de Criptografia de Dados), que tinha uma chave de 56 bits e se tornou vulnerável a ataques de força bruta.
        *   **Funcionamento:** Aplica o algoritmo DES três vezes a cada bloco de dados, com duas ou três chaves diferentes (EDE: Encrypt-Decrypt-Encrypt). Tamanho de bloco de 64 bits.
        *   **Relevância Forense:** Ainda usado em alguns sistemas legados (especialmente no setor financeiro), mas está sendo substituído pelo AES devido à sua lentidão e tamanho de bloco pequeno.
    *   **RC4 (Rivest Cipher 4):**
        *   **Tipo:** Simétrico (cifra de fluxo).
        *   **Uso:** Foi amplamente usado em protocolos como SSL/TLS e WEP.
        *   **Funcionamento:** Gera um fluxo de bits pseudoaleatório (keystream) que é combinado (XOR) com o texto claro.
        *   **Status:** Considerado inseguro e quebrado. Possui várias vulnerabilidades conhecidas (ex: biases no keystream, vulnerabilidade a ataques de "plaintext recovery" se nonces não forem usados corretamente ou se a mesma chave for usada muitas vezes). **Não deve ser usado em novas aplicações.**
        *   **Relevância Forense:** Encontrar tráfego cifrado com RC4 (ex: em logs de TLS mais antigos ou WEP) indica uma conexão fraca que pode ter sido comprometida ou pode ser mais fácil de quebrar se informações adicionais estiverem disponíveis.

---

## 9.5 Protocolo Diffie–Hellman.

*   **Explicação:**
    *   **Conceito:** Um método de **troca de chaves criptográficas** que permite que duas partes, que não têm conhecimento prévio uma da outra, estabeleçam conjuntamente uma chave secreta compartilhada sobre um canal de comunicação inseguro. Foi um dos primeiros exemplos práticos de criptografia de chave pública.
    *   **Funcionamento (Simplificado):**
        1.  Alice e Bob concordam publicamente em dois números: um grande número primo `p` e um gerador `g` (base).
        2.  Alice escolhe um número secreto privado `a`, calcula `A = g^a mod p` e envia `A` para Bob.
        3.  Bob escolhe um número secreto privado `b`, calcula `B = g^b mod p` e envia `B` para Alice.
        4.  Alice calcula a chave secreta compartilhada `s = B^a mod p = (g^b)^a mod p = g^(ba) mod p`.
        5.  Bob calcula a chave secreta compartilhada `s = A^b mod p = (g^a)^b mod p = g^(ab) mod p`.
        *   Ambos chegam à mesma chave secreta `s` (pois `g^(ba) mod p = g^(ab) mod p`), que pode então ser usada para criptografia simétrica.
        *   Um observador que intercepta `p`, `g`, `A` e `B` não consegue calcular `s` facilmente devido à dificuldade do Problema do Logaritmo Discreto (DLP - Discrete Logarithm Problem).
    *   **Variantes:**
        *   **ECDH (Elliptic Curve Diffie-Hellman):** Usa curvas elípticas em vez de exponenciação modular. Oferece a mesma segurança com chaves menores.
    *   **Segurança:** Vulnerável a ataques Man-in-the-Middle (MitM) se não houver autenticação das partes (ou seja, se Alice e Bob não puderem verificar se estão realmente falando um com o outro e não com um interceptador). Por isso, Diffie-Hellman é frequentemente usado em conjunto com assinaturas digitais (como no TLS) para autenticar a troca de chaves.
*   **Relevância Forense:**
    *   **Análise de Protocolos de Rede Seguros:** Diffie-Hellman (ou ECDH) é um componente fundamental em muitos protocolos de segurança, como TLS/SSL, IPsec, SSH, para estabelecer chaves de sessão simétricas.
    *   **Tráfego de Rede Capturado:** Durante o handshake de um protocolo como TLS, os parâmetros Diffie-Hellman (como `A` e `B` do exemplo acima) são trocados em texto claro. Embora isso não revele diretamente a chave secreta compartilhada (devido ao DLP), pode fornecer informações sobre a negociação da sessão.
    *   **Ataques Man-in-the-Middle:** Se um ataque MitM contra uma troca de chaves Diffie-Hellman for suspeito, o perito pode procurar por evidências de certificados falsos, manipulação de parâmetros DH, ou tráfego sendo redirecionado através de um proxy malicioso.
    *   **Logjam Attack:** Uma vulnerabilidade onde um atacante MitM pode forçar uma conexão TLS a usar parâmetros Diffie-Hellman de exportação mais fracos (ex: 512 bits), que podem ser quebrados com recursos computacionais significativos, permitindo a descriptografia da sessão.

---

## 9.6 Hashes criptográficos: algoritmos MD5, SHA-1, SHA-2, SHA-3, colisões.

*   **Explicação:**
    *   **Função Hash Criptográfica:** Um algoritmo matemático que mapeia dados de tamanho arbitrário (a "mensagem") para uma cadeia de bits de tamanho fixo (o "hash", "message digest" ou "digest").
    *   **Propriedades Desejáveis:**
        1.  **Determinística:** A mesma mensagem sempre resulta no mesmo hash.
        2.  **Eficiência de Cálculo:** Fácil de calcular o hash para qualquer mensagem.
        3.  **Resistência à Pré-imagem (One-way):** Computacionalmente inviável encontrar a mensagem original a partir de seu hash.
        4.  **Resistência à Segunda Pré-imagem (Weak Collision Resistance):** Dado uma mensagem M1, é computacionalmente inviável encontrar outra mensagem M2 tal que hash(M1) = hash(M2).
        5.  **Resistência à Colisão (Strong Collision Resistance):** Computacionalmente inviável encontrar duas mensagens distintas M1 e M2 tais que hash(M1) = hash(M2).
    *   **Colisões:** Ocorrem quando duas entradas diferentes produzem o mesmo valor de hash. Como o espaço de entrada é infinito e o espaço de saída (hashes) é finito, colisões são inevitáveis (Princípio da Casa dos Pombos). No entanto, para uma função hash criptográfica, deve ser computacionalmente difícil *encontrar* essas colisões. Se colisões podem ser encontradas facilmente, a função hash é considerada quebrada para certos usos (como assinaturas digitais).
    *   **Algoritmos Comuns:**
        *   **MD5 (Message Digest 5):**
            *   **Tamanho do Hash:** 128 bits.
            *   **Status:** Considerado inseguro e quebrado devido à descoberta de colisões práticas. **Não deve ser usado para fins de segurança** (como assinaturas digitais ou integridade de software). Ainda pode ser usado para verificação de integridade não crítica ou como checksum.
        *   **SHA-1 (Secure Hash Algorithm 1):**
            *   **Tamanho do Hash:** 160 bits.
            *   **Status:** Também considerado inseguro e quebrado. Colisões foram demonstradas. **Não deve ser usado para fins de segurança.** Está sendo depreciado em muitas aplicações.
        *   **SHA-2 (Secure Hash Algorithm 2):**
            *   **Família de Funções:** Inclui SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, SHA-512/256. O número indica o tamanho do hash em bits.
            *   **Status:** Atualmente considerado seguro. SHA-256 é amplamente utilizado.
        *   **SHA-3 (Secure Hash Algorithm 3):**
            *   **Conceito:** Desenvolvido através de uma competição pública do NIST como um padrão alternativo e mais recente, com um design interno diferente do SHA-1 e SHA-2 (baseado na construção de "esponja" - sponge construction, usando o algoritmo Keccak).
            *   **Tamanhos de Hash:** SHA3-224, SHA3-256, SHA3-384, SHA3-512.
            *   **Status:** Considerado seguro.
    *   **Uso de Hashes:**
        *   **Verificação de Integridade de Arquivos:** Comparar o hash de um arquivo baixado com o hash original fornecido para garantir que não foi corrompido ou adulterado.
        *   **Armazenamento de Senhas:** Armazenar hashes de senhas (com salt) em vez das senhas em texto claro.
        *   **Assinaturas Digitais:** O hash da mensagem é assinado com a chave privada do remetente, em vez da mensagem inteira.
        *   **Identificação de Malware:** Hashes de arquivos maliciosos são usados como assinaturas.
        *   **Blockchain:** Hashes são usados para encadear blocos e garantir a integridade da cadeia.
        *   **Tabelas Hash:** Estrutura de dados para busca rápida.
*   **Relevância Forense:**
    *   **Identificação de Arquivos Conhecidos:** Comparar hashes de arquivos encontrados em um sistema com bancos de dados de hashes de arquivos conhecidos (bons ou maus).
        *   **NSRL (National Software Reference Library - Biblioteca Nacional de Referência de Software):** Contém hashes de arquivos de sistema operacional e aplicativos conhecidos, para excluí-los da análise (reduzir o volume de dados a serem examinados).
        *   **Bancos de Dados de Malware (VirusTotal, etc.):** Contêm hashes de malwares conhecidos.
    *   **Verificação de Integridade de Evidências Digitais:** Calcular hashes de imagens forenses de discos ou arquivos individuais no momento da aquisição e verificar esses hashes posteriormente para garantir que a evidência não foi alterada. É um pilar da cadeia de custódia digital.
    *   **Análise de Colisões:** Embora encontrar colisões para SHA-256 seja atualmente inviável, o conhecimento sobre ataques de colisão contra MD5 e SHA-1 é importante. Se um sistema depende de MD5/SHA-1 para integridade crítica, ele pode ser vulnerável.
    *   **Quebra de Senhas:** Hashes de senhas extraídos de sistemas podem ser submetidos a ataques de força bruta ou dicionário (usando ferramentas como Hashcat, John the Ripper) para tentar descobrir a senha original.
    *   **Análise de Blockchain:** Hashes são fundamentais para a estrutura e segurança do blockchain.

---

## 9.7 Técnicas: força bruta, criptoanálise, canal lateral, ataques de texto conhecido/escolhido, Man-in-the-Middle (MITM).

*   **Explicação:** Métodos usados para tentar quebrar sistemas criptográficos ou obter informações protegidas.
    *   **Força Bruta (Brute-force Attack):**
        *   **Conceito:** Tentar todas as chaves ou senhas possíveis até que a correta seja encontrada.
        *   **Viabilidade:** Depende do tamanho do espaço de chaves/senhas e do poder computacional disponível. Para chaves criptográficas modernas (ex: AES-128), a força bruta é computacionalmente inviável. Para senhas fracas, pode ser eficaz.
        *   **Relevância Forense:** Usado em tentativas de quebra de senhas de arquivos, discos criptografados, ou contas de usuário.
    *   **Criptoanálise (Cryptanalysis):**
        *   **Conceito:** A arte e ciência de analisar e quebrar sistemas criptográficos. Envolve o estudo de algoritmos criptográficos para encontrar fraquezas ou falhas que permitam decifrar o texto cifrado sem conhecer a chave, ou deduzir a chave.
        *   **Tipos de Criptoanálise:**
            *   **Linear e Diferencial:** Técnicas matemáticas avançadas usadas contra cifras de bloco.
            *   **Estatística:** Analisar frequências de caracteres ou padrões no texto cifrado (mais eficaz contra cifras clássicas).
            *   **Baseada em Falhas de Implementação:** Explorar erros na forma como um algoritmo criptográfico é implementado em software ou hardware.
        *   **Relevância Forense:** Embora a quebra de algoritmos modernos fortes seja geralmente tarefa de pesquisadores especializados, o perito deve entender os princípios. Falhas de implementação ou uso de algoritmos fracos/quebrados podem permitir a descriptografia de evidências.
    *   **Ataque de Canal Lateral (Side-Channel Attack):**
        *   **Conceito:** Ataque que explora informações obtidas da implementação física de um sistema criptográfico, em vez de atacar diretamente a força teórica do algoritmo.
        *   **Informações Exploradas:** Tempo de execução de operações criptográficas, consumo de energia, emanações eletromagnéticas, som, ou até mesmo erros induzidos.
        *   **Exemplos:** Análise de tempo (timing analysis), análise de consumo de energia (power analysis - SPA/DPA), análise de falhas (fault analysis), análise acústica.
        *   **Relevância Forense:** Mais relevante para hardware de segurança especializado (smart cards, HSMs) ou dispositivos embarcados. Pode ser usado para extrair chaves criptográficas desses dispositivos se o acesso físico for possível.
    *   **Ataques de Texto Conhecido/Escolhido:** Tipos de ataques criptanalíticos que dependem do conhecimento (ou capacidade de obter) pares de texto claro e texto cifrado correspondente.
        *   **Ataque de Texto Claro Conhecido (Known-Plaintext Attack - KPA):** O atacante tem acesso a um ou mais pares de texto claro e seu correspondente texto cifrado (cifrado com a chave desconhecida). O objetivo é deduzir a chave ou um método para decifrar outras mensagens.
        *   **Ataque de Texto Claro Escolhido (Chosen-Plaintext Attack - CPA):** O atacante pode escolher textos claros arbitrários para serem cifrados com a chave desconhecida e obtém os textos cifrados correspondentes. Mais poderoso que KPA.
        *   **Ataque de Texto Cifrado Escolhido (Chosen-Ciphertext Attack - CCA):** O atacante pode escolher textos cifrados arbitrários para serem decifrados com a chave desconhecida e obtém os textos claros correspondentes. Ainda mais poderoso.
        *   **Relevância Forense:** Se o perito conseguir obter pares de texto claro/cifrado (ex: de arquivos conhecidos que foram cifrados, ou se puder induzir um sistema a cifrar dados específicos), isso pode, teoricamente, ajudar em ataques contra cifras mais fracas ou implementações falhas. A robustez de algoritmos modernos é geralmente testada contra esses tipos de ataques.
    *   **Ataque Man-in-the-Middle (MITM - Homem no Meio):**
        *   **Conceito:** Um atacante se posiciona secretamente entre duas partes que estão se comunicando, interceptando e, possivelmente, alterando as mensagens trocadas. As partes acreditam que estão se comunicando diretamente uma com a outra.
        *   **Como Funciona:** O atacante pode interceptar a chave pública durante uma troca de chaves (como Diffie-Hellman sem autenticação ou em um handshake SSL/TLS com certificado falso) e substituir pelas suas próprias chaves, estabelecendo sessões seguras separadas com cada parte, permitindo-lhe ler e modificar todo o tráfego.
        *   **Técnicas para Estabelecer Posição MitM:** ARP spoofing (em LAN), DNS spoofing, criação de hotspots Wi-Fi falsos, comprometimento de roteadores.
        *   **Relevância Forense:** Investigar se uma comunicação foi interceptada por um ataque MitM. Análise de tráfego de rede, logs de DNS/ARP, configurações de dispositivos de rede, e a validade de certificados SSL/TLS são cruciais.

---

## 9.8 Protocolo Signal.

*   **Explicação:**
    *   **Conceito:** Protocolo criptográfico de código aberto, projetado para fornecer criptografia de ponta a ponta (E2EE - End-to-End Encryption) para mensagens instantâneas e chamadas de voz/vídeo. Desenvolvido pela Open Whisper Systems (agora Signal Foundation).
    *   **Características Principais:**
        *   **Criptografia de Ponta a Ponta:** As mensagens são cifradas no dispositivo do remetente e só podem ser decifradas no dispositivo do destinatário. O servidor que retransmite as mensagens não tem acesso ao conteúdo em texto claro.
        *   **Perfect Forward Secrecy (PFS - Sigilo Perfeito Adiante):** Se uma chave de sessão de longo prazo for comprometida no futuro, as chaves de sessão passadas (e, portanto, as mensagens antigas) não são comprometidas. Isso é alcançado gerando chaves de sessão efêmeras para cada conversa ou período.
        *   **Future Secrecy (ou Post-Compromise Security):** Se a chave privada de longo prazo de um usuário for comprometida, as mensagens futuras ainda estarão seguras após um certo período, pois as chaves de sessão são renegociadas e não dependem apenas da chave de longo prazo comprometida.
        *   **Algoritmos Usados (Combinação):**
            *   **Extended Triple Diffie-Hellman (X3DH) Handshake:** Para estabelecer uma chave secreta compartilhada inicial de forma assíncrona.
            *   **Double Ratchet Algorithm (Algoritmo de Catraca Dupla):** Usado após o estabelecimento da sessão para gerenciar chaves de sessão contínuas e fornecer PFS e future secrecy. Combina uma catraca baseada em Diffie-Hellman (para chaves públicas) e uma catraca baseada em função de derivação de chave (KDF - Key Derivation Function) com hashes (para chaves simétricas).
            *   **Criptografia Simétrica:** AES (geralmente em modo CBC ou CTR com HMAC para autenticação, ou AES-GCM) para cifrar as mensagens reais.
            *   **Funções Hash:** SHA-256 ou mais fortes.
    *   **Aplicações:** Usado no aplicativo de mensagens Signal, e também adotado (ou adaptado) por outros aplicativos de mensagens populares como WhatsApp, Facebook Messenger (conversas secretas), Google Messages (para RCS com E2EE).
*   **Relevância Forense:**
    *   **Desafios na Interceptação de Conteúdo:** Devido à E2EE, a interceptação do tráfego de rede de mensagens protegidas pelo Protocolo Signal geralmente não revela o conteúdo das mensagens, apenas metadados (quem está falando com quem, quando, e o volume de dados, se não houver outras proteções de metadados).
    *   **Foco na Análise do Dispositivo (Endpoint Forensics):** A evidência principal (mensagens em texto claro, chaves) reside nos dispositivos dos participantes da comunicação (smartphones, computadores). A perícia em dispositivos móveis ou computadores torna-se crucial.
        *   Se o dispositivo estiver desbloqueado e acessível, o banco de dados local do aplicativo de mensagens (ex: Signal, WhatsApp) pode conter as mensagens decifradas.
        *   Chaves criptográficas podem estar armazenadas na memória do dispositivo ou em arquivos protegidos.
    *   **Backups:** Backups de dispositivos ou aplicativos (se não forem criptografados ou se a chave do backup for conhecida) podem conter mensagens.
    *   **Metadados do Servidor:** Embora os servidores Signal (ou de apps que usam o protocolo) não tenham acesso ao conteúdo das mensagens, eles podem ter metadados limitados sobre as contas dos usuários, datas de registro, últimos IPs de conexão (dependendo das políticas de retenção e da lei).
    *   **Engenharia Reversa de Aplicativos:** Para entender como o protocolo é implementado e onde as chaves ou mensagens podem ser armazenadas localmente.
    *   **Importância da Compreensão do Protocolo:** Saber como o Signal funciona ajuda o perito a entender que tipo de evidência é realisticamente obtenível e onde procurá-la (principalmente nos endpoints).

---

## 9.9 Blockchain.

*   **Explicação:**
    *   **Conceito:** Uma estrutura de dados distribuída e descentralizada que consiste em uma cadeia crescente de blocos. Cada bloco contém um lote de transações (ou outros dados), um hash criptográfico do bloco anterior (encadeando-o ao bloco anterior) e um timestamp. É a tecnologia fundamental por trás da maioria das criptomoedas.
    *   **Características Principais:**
        *   **Descentralização:** Geralmente mantida por uma rede peer-to-peer de nós. Não há uma autoridade central controlando o blockchain.
        *   **Imutabilidade:** Uma vez que um bloco é adicionado à cadeia, é extremamente difícil (computacionalmente caro) alterá-lo ou removê-lo, devido ao encadeamento por hashes. Qualquer alteração em um bloco invalidaria os hashes de todos os blocos subsequentes.
        *   **Transparência (em blockchains públicos):** Todas as transações (embora geralmente pseudoanônimas) são visíveis para qualquer pessoa que examine o blockchain.
        *   **Segurança Criptográfica:** Usa hashes para encadear blocos e garantir a integridade. Transações são frequentemente assinadas digitalmente.
        *   **Mecanismos de Consenso:** Algoritmos usados pelos nós da rede para concordar sobre a validade de novas transações e quais blocos devem ser adicionados à cadeia (ex: Proof-of-Work - PoW, Proof-of-Stake - PoS).
    *   **Componentes de um Bloco (Típico):**
        *   **Dados:** Transações (ou outros dados) incluídas no bloco.
        *   **Hash do Bloco Anterior:** Liga o bloco atual ao bloco anterior na cadeia.
        *   **Timestamp:** Quando o bloco foi criado.
        *   **Nonce (em PoW):** Um número usado uma vez, ajustado pelos mineradores para encontrar um hash de bloco válido.
        *   **Hash do Bloco Atual (Merkle Root para transações):** Um hash que representa o conteúdo do bloco atual.
    *   **Tipos de Blockchain:**
        *   **Público (Public/Permissionless):** Qualquer um pode participar, visualizar transações e (em alguns casos) minerar/validar blocos (ex: Bitcoin, Ethereum).
        *   **Privado (Private/Permissioned):** O acesso é restrito a participantes autorizados. Controlado por uma única organização ou um consórcio.
        *   **De Consórcio (Consortium):** Controlado por um grupo de organizações, em vez de uma única.
*   **Relevância Forense:**
    *   **Rastreamento de Transações de Criptomoedas (ver item 9.10):** Blockchains públicos permitem o rastreamento do fluxo de criptomoedas entre endereços. Ferramentas de análise de blockchain (exploradores de blocos, software especializado) são usadas para isso.
    *   **Identificação de Endereços e Carteiras:** Embora as transações sejam pseudoanônimas (ligadas a endereços, não a identidades reais diretamente), a análise de blockchain combinada com OSINT ou outras evidências pode ajudar a vincular endereços a indivíduos ou entidades.
    *   **Prova de Existência/Timestamping:** A imutabilidade e os timestamps em um blockchain podem ser usados para provar que um determinado dado existia em um determinado momento (ex: hashing de um documento e registrando o hash no blockchain).
    *   **Análise de Contratos Inteligentes (Smart Contracts):** Em blockchains como Ethereum, contratos inteligentes (programas autoexecutáveis que rodam no blockchain) podem estar envolvidos em atividades fraudulentas ou ilegais. Sua análise requer conhecimento de linguagens como Solidity.
    *   **Evidência em Blockchains Privados/De Consórcio:** A obtenção de dados de blockchains privados pode exigir cooperação da(s) organização(ões) que os controlam ou ordens judiciais.
    *   **Malware e Blockchain:** Alguns malwares podem usar blockchains para armazenamento de dados de C2, ou para receber pagamentos de ransomware.

---

## 9.10 Criptomoedas.

*   **Explicação:**
    *   **Conceito:** Moedas digitais ou virtuais que usam criptografia para segurança. São descentralizadas (geralmente baseadas em tecnologia blockchain) e operam independentemente de bancos centrais ou autoridades governamentais.
    *   **Características Comuns:**
        *   **Descentralização:** Baseadas em redes peer-to-peer.
        *   **Criptografia:** Usam técnicas criptográficas para transações seguras e para controlar a criação de novas unidades.
        *   **Blockchain (ou tecnologia similar de livro-razão distribuído):** A maioria usa um blockchain para registrar todas as transações de forma transparente e imutável.
        *   **Pseudo-anonimato:** As transações são associadas a endereços criptográficos, não diretamente a identidades de pessoas. No entanto, o anonimato pode ser quebrado se um endereço for vinculado a uma identidade real.
        *   **Mineração (Mining) ou Staking:** Processos pelos quais novas moedas são criadas e/ou transações são validadas e adicionadas ao blockchain (dependendo do mecanismo de consenso, como PoW ou PoS).
    *   **Exemplos Populares:** Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Monero (XMR), Ripple (XRP).
    *   **Carteiras de Criptomoedas (Wallets):** Software ou hardware que armazena as chaves privadas necessárias para acessar e gastar as criptomoedas associadas a um endereço no blockchain.
        *   **Tipos:** Desktop wallets, mobile wallets, web wallets (online), hardware wallets (dispositivos físicos), paper wallets.
*   **Relevância Forense:**
    *   **Uso em Atividades Ilícitas:** Criptomoedas são frequentemente usadas em atividades criminosas devido ao seu pseudo-anonimato e facilidade de transação global:
        *   Pagamento de ransomware.
        *   Compra/venda de bens e serviços ilegais na dark web.
        *   Lavagem de dinheiro.
        *   Financiamento do terrorismo.
    *   **Rastreamento de Transações:**
        *   **Análise de Blockchain:** Embora as transações sejam pseudoanônimas, o fluxo de fundos entre endereços em blockchains públicos (como Bitcoin e Ethereum) pode ser rastreado usando exploradores de blocos e ferramentas de análise de blockchain (ex: Chainalysis, Elliptic, Crystal Blockchain).
        *   **Técnicas de Deanonimização:** Tentar vincular endereços de criptomoedas a identidades reais através de:
            *   Análise de clusters (agrupamento de endereços que provavelmente pertencem à mesma entidade).
            *   Informações de exchanges (corretoras de criptomoedas, que geralmente exigem KYC - Know Your Customer ou Conheça Seu Cliente).
            *   OSINT e vazamentos de dados.
            *   Análise de metadados de transações.
    *   **Apreensão e Análise de Carteiras:**
        *   Localizar e acessar carteiras de criptomoedas em dispositivos apreendidos (computadores, smartphones).
        *   Extrair chaves privadas de software wallets ou tentar quebrar senhas de carteiras.
        *   Análise de hardware wallets (mais difícil, pois são projetadas para proteger as chaves privadas).
    *   **Análise de Exchanges:** Obter registros de transações de exchanges (com ordem judicial) para identificar quem comprou/vendeu criptomoedas ou para quais endereços foram enviadas.
    *   **Privacidade de Moedas (Privacy Coins):** Criptomoedas como Monero (XMR) ou Zcash (ZEC) usam técnicas criptográficas avançadas (ex: ring signatures, stealth addresses, zk-SNARKs) para ocultar o remetente, o destinatário e/ou o valor das transações, tornando o rastreamento muito mais difícil ou impossível.
    *   **Misturadores (Mixers ou Tumblers):** Serviços que misturam fundos de criptomoedas de múltiplos usuários para dificultar o rastreamento da origem dos fundos.
    *   **A Evolução da Legislação e Regulamentação:** A área de criptomoedas está em constante mudança, com novas leis e regulamentos sendo desenvolvidos para lidar com seu uso.

---
