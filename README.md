# TCU Study - Sistema de Estudos para Concurso

Uma aplicação web moderna e completa para estudos focados no concurso do **Tribunal de Contas da União (TCU)**, com questões no formato CEBRASPE (Certo ou Errado), sistema de revisão inteligente e flashcards interativos.

## 📋 Sobre o Projeto

TCU Study é uma plataforma desenvolvida com as melhores práticas de desenvolvimento web moderno (2024/2025), focando em:

- **Performance**: Core Web Vitals otimizados (LCP, FID/INP, CLS)
- **Acessibilidade**: Conformidade com WCAG (atributos ARIA, navegação por teclado)
- **Responsividade**: Design Mobile-First, compatível com todos os dispositivos
- **UX/UI**: Interface limpa, moderna e intuitiva

## ✨ Funcionalidades

### 📝 Questões Interativas
- Questões no formato **Certo/Errado** da banca CEBRASPE
- Feedback visual imediato após responder
- Justificativas detalhadas para cada questão
- Navegação fluida entre questões
- Sistema de estatísticas em tempo real

### 📊 Sistema de Revisão
- Acompanhamento de progresso por matéria
- Estatísticas detalhadas (acertos, erros, taxa de sucesso)
- Filtro de estudos por matéria específica
- Visualização de desempenho com barras de progresso
- Histórico completo de respostas

### 🗂️ Flashcards Interativos
- Cards com efeito 3D de virar (flip)
- Navegação entre flashcards (anterior/próximo/aleatório)
- Resumos dos conceitos principais
- Organização por matéria e tópico

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first

### Gerenciamento de Estado
- **Zustand** - Biblioteca de gerenciamento de estado leve e moderna
- **Persistência**: LocalStorage para manter progresso do usuário

### Qualidade de Código
- **ESLint** - Linting
- **TypeScript** - Type checking

## 📁 Estrutura do Projeto

```
tcu-study-webapp/
├── app/                      # App Router do Next.js
│   ├── globals.css          # Estilos globais e Tailwind
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página inicial
│   ├── questoes/            # Página de questões
│   ├── revisao/             # Página de revisão
│   └── flashcards/          # Página de flashcards
├── components/               # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ProgressBar.tsx
│   ├── Badge.tsx
│   ├── QuestaoCard.tsx
│   └── FlashcardComponent.tsx
├── lib/                      # Bibliotecas e utilitários
│   └── store.ts             # Store Zustand
├── types/                    # Definições de tipos TypeScript
│   └── index.ts
├── data/                     # Dados mockados
│   └── questoes-mockadas.ts
├── public/                   # Arquivos estáticos
├── next.config.js           # Configuração do Next.js
├── tailwind.config.js       # Configuração do Tailwind
├── tsconfig.json            # Configuração do TypeScript
└── package.json             # Dependências do projeto
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/dalio8/dalio8.git
cd dalio8
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra o navegador em [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

## 📚 Conteúdo Disponível

O sistema inclui questões mockadas das seguintes matérias:

- **Controle Externo** - Competências do TCU, Julgamento de Contas
- **Direito Constitucional** - Poder Constituinte, Ministério Público
- **Administração Financeira e Orçamentária (AFO)** - LDO, LOA, PPA

Cada questão possui:
- Enunciado completo
- Resposta correta (Certo/Errado)
- Justificativa detalhada
- Resumo para flashcard
- Metadados (matéria, tópico, banca, ano, dificuldade)

## 🎨 Design System

O projeto utiliza um design system customizado baseado em Tailwind CSS:

### Cores
- **Primary**: Azul (tons corporativos/governamentais)
- **Secondary**: Cinza (neutro)
- **Success**: Verde (feedback positivo)
- **Error**: Vermelho (feedback negativo)
- **Warning**: Amarelo (alertas)

### Componentes Reutilizáveis
- `Button` - Botões com variantes (primary, secondary, success, error)
- `Card` - Cards com efeito hover e sombra
- `ProgressBar` - Barra de progresso com cores personalizáveis
- `Badge` - Etiquetas para categorização

## 🔐 Acessibilidade

A aplicação segue as diretrizes WCAG:
- Atributos ARIA apropriados
- Estados de foco visíveis
- Navegação por teclado
- Alto contraste
- Semântica HTML adequada

## 📈 Performance

Otimizações implementadas:
- Server-Side Rendering (SSR) com Next.js
- Code Splitting automático
- Lazy Loading de componentes
- Otimização de imagens
- Minificação CSS/JS

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 📧 Contato

**Autor**: @dalio8
- Email: dalio8@hotmail.com
- GitHub: [@dalio8](https://github.com/dalio8)

## 🔄 Próximas Melhorias

- [ ] Adicionar mais questões (banco de dados maior)
- [ ] Implementar sistema de autenticação
- [ ] Adicionar modo escuro
- [ ] Criar gráficos de evolução
- [ ] Implementar sistema de comentários nas questões
- [ ] Adicionar compartilhamento de resultados
- [ ] Integração com API externa de questões

---

**Desenvolvido com ❤️ para candidatos ao concurso do TCU**
