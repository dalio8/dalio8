# TCU Study - Sistema de Estudos para Concurso (PT-BR)

Uma aplicação web moderna e completa para estudos focados no concurso do **Tribunal de Contas da União (TCU)**, com questões no formato CEBRASPE (Certo ou Errado), sistema de revisão inteligente e flashcards interativos.

## 📋 Sobre o Projeto

TCU Study é uma plataforma desenvolvida com as melhores práticas de desenvolvimento web moderno (2024/2025), focando em:

- **Performance**: Core Web Vitals otimizados (LCP, FID/INP, CLS)
- **Acessibilidade**: Conformidade com WCAG (atributos ARIA, navegação por teclado)
- **Responsividade**: Design Mobile-First, compatível com todos os dispositivos
- **UX/UI**: Interface limpa, moderna e intuitiva

---

# TCU Study - Contest Study System (EN-US)

A modern and complete web application for studies focused on the **Tribunal de Contas da União (TCU)** contest, with questions in the CEBRASPE format (Right or Wrong), an intelligent review system, and interactive flashcards.

## 📋 About the Project

TCU Study is a platform developed with the best practices of modern web development (2024/2025), focusing on:

- **Performance**: Optimized Core Web Vitals (LCP, FID/INP, CLS)
- **Accessibility**: WCAG compliance (ARIA attributes, keyboard navigation)
- **Responsiveness**: Mobile-First design, compatible with all devices
- **UX/UI**: Clean, modern, and intuitive interface

## ✨ Features

### 📝 Interactive Questions
- Questions in the **Right/Wrong** format of the CEBRASPE board
- Immediate visual feedback after answering
- Detailed justifications for each question
- Fluid navigation between questions
- Real-time statistics system

### 📊 Review System
- Progress tracking by subject
- Detailed statistics (correct, incorrect, success rate)
- Study filter by specific subject
- Performance visualization with progress bars
- Complete history of answers

### 🗂️ Interactive Flashcards
- Cards with 3D flip effect
- Navigation between flashcards (previous/next/random)
- Summaries of the main concepts
- Organization by subject and topic

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - JavaScript library for interfaces
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **Zustand** - Lightweight and modern state management library
- **Persistence**: LocalStorage to maintain user progress

### Code Quality
- **ESLint** - Linting
- **TypeScript** - Type checking

## 📁 Project Structure

```
tcu-study-webapp/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx           # Main layout
│   ├── page.tsx             # Home page
│   ├── questoes/            # Questions page
│   ├── revisao/             # Review page
│   └── flashcards/          # Flashcards page
├── components/               # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ProgressBar.tsx
│   ├── Badge.tsx
│   ├── QuestaoCard.tsx
│   └── FlashcardComponent.tsx
├── lib/                      # Libraries and utilities
│   └── store.ts             # Zustand store
├── types/                    # TypeScript type definitions
│   └── index.ts
├── data/                     # Mock data
│   └── questoes-mockadas.ts
├── public/                   # Static files
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## 🚀 How to Run the Project

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dalio8/dalio8.git
cd dalio8
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open the browser at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 📚 Available Content

The system includes mock questions from the following subjects:

- **External Control** - TCU Competencies, Judgment of Accounts
- **Constitutional Law** - Constituent Power, Public Ministry
- **Financial and Budgetary Administration (AFO)** - LDO, LOA, PPA

Each question has:
- Complete statement
- Correct answer (Right/Wrong)
- Detailed justification
- Flashcard summary
- Metadata (subject, topic, board, year, difficulty)

## 🎨 Design System

The project uses a custom design system based on Tailwind CSS:

### Colors
- **Primary**: Blue (corporate/governmental tones)
- **Secondary**: Gray (neutral)
- **Success**: Green (positive feedback)
- **Error**: Red (negative feedback)
- **Warning**: Yellow (alerts)

### Reusable Components
- `Button` - Buttons with variants (primary, secondary, success, error)
- `Card` - Cards with hover effect and shadow
- `ProgressBar` - Progress bar with customizable colors
- `Badge` - Labels for categorization

## 🔐 Accessibility

The application follows WCAG guidelines:
- Appropriate ARIA attributes
- Visible focus states
- Keyboard navigation
- High contrast
- Adequate HTML semantics

## 📈 Performance

Optimizations implemented:
- Server-Side Rendering (SSR) with Next.js
- Automatic Code Splitting
- Lazy Loading of components
- Image optimization
- CSS/JS minification

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and is available under the MIT license.

## 📧 Contact

**Author**: @dalio8
- Email: dalio8@hotmail.com
- GitHub: [@dalio8](https://github.com/dalio8)

## 🔄 Next Improvements

- [ ] Add more questions (larger database)
- [ ] Implement authentication system
- [ ] Add dark mode
- [ ] Create evolution charts
- [ ] Implement comment system in questions
- [ ] Add results sharing
- [ ] Integration with external questions API

---

**Developed with ❤️ for TCU contest candidates**
