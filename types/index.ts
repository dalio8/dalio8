// Task Management Types
export type TaskStatus = 'todo' | 'in-progress' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: Date
  tags: string[]
  estimatedTime?: number // in minutes
  notes?: string // markdown support
  recurring?: RecurringConfig
  parentId?: string // for nested subtasks
  subtasks: Task[]
  order: number
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  pomodoroCount: number
  timeSpent: number // in seconds
}

export interface RecurringConfig {
  enabled: boolean
  frequency: 'daily' | 'weekly' | 'monthly'
  interval: number // every N days/weeks/months
  endDate?: Date
}

// Gamification Types
export interface UserProfile {
  id: string
  username: string
  avatarUrl?: string
  level: number
  xp: number
  totalXP: number
  achievements: Achievement[]
  streakCurrent: number
  streakBest: number
  lastActivityDate?: Date
  createdAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  progress: number
  target: number
  category: 'tasks' | 'pomodoro' | 'streak' | 'flashcards' | 'special'
}

export interface Streak {
  current: number
  best: number
  lastActivityDate: Date
  history: Date[]
}

// Pomodoro Types
export interface PomodoroSession {
  id: string
  taskId?: string
  startTime: Date
  endTime?: Date
  duration: number // in seconds (default 1500 for 25 min)
  breakDuration: number // in seconds (default 300 for 5 min)
  completed: boolean
  interrupted: boolean
}

export interface PomodoroSettings {
  workDuration: number // in seconds
  shortBreakDuration: number
  longBreakDuration: number
  sessionsUntilLongBreak: number
  autoStartBreaks: boolean
  autoStartWork: boolean
  soundEnabled: boolean
  notificationsEnabled: boolean
}

export interface PomodoroStats {
  totalSessions: number
  completedSessions: number
  totalTimeSpent: number // in seconds
  todaySessions: number
  weekSessions: number
  monthSessions: number
  taskBreakdown: {
    taskId: string
    taskTitle: string
    sessions: number
    timeSpent: number
  }[]
}

// Flashcard Types
export interface Flashcard {
  id: string
  deckId: string
  question: string // markdown support
  answer: string // markdown support
  tags: string[]
  createdAt: Date
  lastReviewedAt?: Date
  nextReviewDate: Date
  easinessFactor: number // SM-2 algorithm
  interval: number // days
  repetitions: number
  difficulty: number // 0-5
}

export interface FlashcardDeck {
  id: string
  name: string
  description: string
  tags: string[]
  cards: Flashcard[]
  createdAt: Date
  updatedAt: Date
  stats: {
    totalCards: number
    masteredCards: number
    learningCards: number
    newCards: number
  }
}

export interface StudySession {
  id: string
  deckId: string
  startTime: Date
  endTime?: Date
  cardsReviewed: number
  cardsCorrect: number
  cardsIncorrect: number
}

// Mindmap Types
export interface MindmapNode {
  id: string
  content: string // markdown support
  x: number
  y: number
  color?: string
  children: MindmapNode[]
  collapsed: boolean
  linkedTaskId?: string
}

export interface Mindmap {
  id: string
  name: string
  description: string
  rootNode: MindmapNode
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

// Filter and Search Types
export interface TaskFilters {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  tags?: string[]
  dateRange?: {
    start?: Date
    end?: Date
  }
  searchQuery?: string
  hasSubtasks?: boolean
  isOverdue?: boolean
}

export interface SortOptions {
  field: 'dueDate' | 'priority' | 'createdAt' | 'title' | 'order'
  direction: 'asc' | 'desc'
}

// View Types
export type ViewType = 'list' | 'kanban' | 'calendar' | 'focus' | 'analytics'

// Settings Types
export interface AppSettings {
  id: string
  theme: 'light' | 'dark' | 'system'
  accentColor: string
  compactMode: boolean
  showCompletedTasks: boolean
  defaultTaskPriority: TaskPriority
  enableNotifications: boolean
  enableSounds: boolean
  keyboardShortcutsEnabled: boolean
  pomodoroSettings: PomodoroSettings
}

// Analytics Types
export interface Analytics {
  tasksCompleted: number
  tasksCreated: number
  productivityScore: number
  averageCompletionTime: number
  completionRate: number
  pomodoroStats: PomodoroStats
  xpEarned: number
  streakData: {
    date: Date
    tasksCompleted: number
    pomodorosCompleted: number
  }[]
  categoryBreakdown: {
    category: string
    count: number
  }[]
}

// Export/Import Types
export interface ExportData {
  version: string
  exportDate: Date
  tasks: Task[]
  profile: UserProfile
  flashcardDecks: FlashcardDeck[]
  mindmaps: Mindmap[]
  pomodoroSessions: PomodoroSession[]
  settings: AppSettings
}
