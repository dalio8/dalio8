# Advanced Todo App - TodoMaster

> A modern, feature-rich todo web application built with Next.js 14+, TypeScript, Tailwind CSS, and shadcn/ui components.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)

## Overview

TodoMaster combines powerful task management with gamification, Pomodoro timer, flashcards, and mindmaps to supercharge your productivity. Built with modern web technologies, it offers offline support, beautiful UI, and intelligent features to help you stay organized and motivated.

## Key Features

### Task Management
- **Hierarchical Tasks**: Unlimited nested subtasks
- **Rich Properties**: Title, description, priority, due dates, tags, time estimates
- **Smart Filtering**: Search and filter by status, priority, tags, dates
- **Multiple Views**: List, Kanban board, calendar, focus mode
- **Drag & Drop**: Easy task reordering
- **Markdown Support**: Rich text notes

### Gamification
- **XP & Levels**: Earn points for completing tasks (10-50 XP based on priority)
- **Achievements**: Unlock badges for milestones and streaks
- **Streak Tracking**: Daily and weekly activity tracking
- **Progress Charts**: Visualize your productivity
- **Level System**: Grow from Level 1 to infinity

### Pomodoro Timer
- **Customizable Durations**: Default 25/5 min work/break cycles
- **Task Integration**: Start timer directly from any task
- **Auto Time Tracking**: Automatic time logging per task
- **Statistics**: Track total pomodoros, time per task, trends
- **Notifications**: Sound and browser alerts

### Flashcards
- **Spaced Repetition**: SM-2 algorithm for optimal learning
- **Markdown Support**: Rich formatting for cards
- **Deck Management**: Organize by topic/subject
- **Study Modes**: Regular, shuffle, review modes
- **Progress Tracking**: Master level per deck

### Mindmaps
- **Visual Thinking**: Node-based mind mapping
- **Collapsible Branches**: Organize complex ideas
- **Task Integration**: Convert between tasks and nodes
- **Export Options**: Save as image or markdown

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (oklch colors)
- **UI Components**: shadcn/ui
- **State**: Zustand
- **Database**: IndexedDB (client-side)
- **Animations**: Framer Motion
- **PWA**: Offline support, app manifest

## Getting Started

### Prerequisites
- Node.js 18.0+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/dalio8/dalio8.git
cd dalio8

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                      # Next.js app directory
├── components/
│   ├── dashboard/           # Layout components
│   ├── features/            # Feature modules
│   │   ├── tasks/
│   │   ├── pomodoro/
│   │   ├── flashcards/
│   │   └── mindmap/
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
├── lib/
│   ├── db/                 # IndexedDB wrapper
│   └── utils.ts            # Utilities
├── store/                   # Zustand state
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## Usage

### Creating Tasks
1. Click "New Task" button
2. Fill in details (title required)
3. Set priority, due date, tags as needed
4. Click "Create Task"

### Using Pomodoro
1. Click timer icon on any task
2. Click "Start" to begin 25-min focus session
3. Take breaks when prompted
4. Track your productivity!

### Gamification
- Complete tasks to earn XP
- Level up as you earn more XP
- Unlock achievements for milestones
- Build daily streaks for bonus motivation

## Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Task Management | ✅ Complete | Full CRUD with subtasks, priorities, tags |
| Pomodoro Timer | ✅ Complete | Customizable work/break cycles |
| Gamification | ✅ Complete | XP, levels, achievements, streaks |
| Dashboard | ✅ Complete | Stats cards, quick actions |
| Dark/Light Mode | ✅ Complete | System-aware theme switching |
| Data Persistence | ✅ Complete | IndexedDB for offline storage |
| PWA Support | ✅ Complete | Install as app, offline mode |
| Flashcards | 🚧 Planned | Spaced repetition learning |
| Mindmaps | 🚧 Planned | Visual mind mapping |
| Calendar View | 🚧 Planned | Monthly/weekly task calendar |
| Kanban Board | 🚧 Planned | Drag-drop task board |
| Analytics | 🚧 Planned | Advanced productivity insights |

## Keyboard Shortcuts

- `Ctrl/Cmd + K` - Quick search
- `N` - New task
- `Escape` - Close dialogs

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/Amazing`)
3. Commit changes (`git commit -m 'Add Amazing'`)
4. Push to branch (`git push origin feature/Amazing`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Roadmap

- [ ] Multi-user authentication
- [ ] Cloud sync
- [ ] Mobile apps
- [ ] AI task suggestions
- [ ] Calendar integrations
- [ ] Team collaboration

---

**Built with ❤️ using Next.js and TypeScript**
