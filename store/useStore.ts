import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Task,
  UserProfile,
  FlashcardDeck,
  Mindmap,
  PomodoroSession,
  AppSettings,
  TaskFilters,
  ViewType,
} from '@/types'

interface AppState {
  // Tasks
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void

  // User Profile & Gamification
  profile: UserProfile | null
  setProfile: (profile: UserProfile) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  addXP: (amount: number) => void

  // Flashcards
  flashcardDecks: FlashcardDeck[]
  setFlashcardDecks: (decks: FlashcardDeck[]) => void
  addFlashcardDeck: (deck: FlashcardDeck) => void
  updateFlashcardDeck: (deck: FlashcardDeck) => void
  deleteFlashcardDeck: (id: string) => void

  // Mindmaps
  mindmaps: Mindmap[]
  setMindmaps: (mindmaps: Mindmap[]) => void
  addMindmap: (mindmap: Mindmap) => void
  updateMindmap: (mindmap: Mindmap) => void
  deleteMindmap: (id: string) => void

  // Pomodoro
  pomodoroSessions: PomodoroSession[]
  setPomodoroSessions: (sessions: PomodoroSession[]) => void
  addPomodoroSession: (session: PomodoroSession) => void
  currentPomodoroTaskId: string | null
  setCurrentPomodoroTaskId: (taskId: string | null) => void

  // Settings
  settings: AppSettings
  updateSettings: (updates: Partial<AppSettings>) => void

  // UI State
  currentView: ViewType
  setCurrentView: (view: ViewType) => void
  taskFilters: TaskFilters
  setTaskFilters: (filters: TaskFilters) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  focusModeEnabled: boolean
  setFocusModeEnabled: (enabled: boolean) => void
  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void
}

const defaultSettings: AppSettings = {
  id: 'default-settings',
  theme: 'system',
  accentColor: '#3b82f6',
  compactMode: false,
  showCompletedTasks: true,
  defaultTaskPriority: 'medium',
  enableNotifications: true,
  enableSounds: true,
  keyboardShortcutsEnabled: true,
  pomodoroSettings: {
    workDuration: 1500, // 25 minutes
    shortBreakDuration: 300, // 5 minutes
    longBreakDuration: 900, // 15 minutes
    sessionsUntilLongBreak: 4,
    autoStartBreaks: false,
    autoStartWork: false,
    soundEnabled: true,
    notificationsEnabled: true,
  },
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Tasks
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      // User Profile
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
      addXP: (amount) =>
        set((state) => {
          if (!state.profile) return state
          const newXP = state.profile.xp + amount
          const newTotalXP = state.profile.totalXP + amount
          const newLevel = Math.floor(Math.sqrt(newTotalXP / 100)) + 1
          return {
            profile: {
              ...state.profile,
              xp: newXP,
              totalXP: newTotalXP,
              level: newLevel,
            },
          }
        }),

      // Flashcards
      flashcardDecks: [],
      setFlashcardDecks: (decks) => set({ flashcardDecks: decks }),
      addFlashcardDeck: (deck) =>
        set((state) => ({ flashcardDecks: [...state.flashcardDecks, deck] })),
      updateFlashcardDeck: (deck) =>
        set((state) => ({
          flashcardDecks: state.flashcardDecks.map((d) => (d.id === deck.id ? deck : d)),
        })),
      deleteFlashcardDeck: (id) =>
        set((state) => ({
          flashcardDecks: state.flashcardDecks.filter((d) => d.id !== id),
        })),

      // Mindmaps
      mindmaps: [],
      setMindmaps: (mindmaps) => set({ mindmaps }),
      addMindmap: (mindmap) =>
        set((state) => ({ mindmaps: [...state.mindmaps, mindmap] })),
      updateMindmap: (mindmap) =>
        set((state) => ({
          mindmaps: state.mindmaps.map((m) => (m.id === mindmap.id ? mindmap : m)),
        })),
      deleteMindmap: (id) =>
        set((state) => ({
          mindmaps: state.mindmaps.filter((m) => m.id !== id),
        })),

      // Pomodoro
      pomodoroSessions: [],
      setPomodoroSessions: (sessions) => set({ pomodoroSessions: sessions }),
      addPomodoroSession: (session) =>
        set((state) => ({
          pomodoroSessions: [...state.pomodoroSessions, session],
        })),
      currentPomodoroTaskId: null,
      setCurrentPomodoroTaskId: (taskId) => set({ currentPomodoroTaskId: taskId }),

      // Settings
      settings: defaultSettings,
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),

      // UI State
      currentView: 'list',
      setCurrentView: (view) => set({ currentView: view }),
      taskFilters: {},
      setTaskFilters: (filters) => set({ taskFilters: filters }),
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      focusModeEnabled: false,
      setFocusModeEnabled: (enabled) => set({ focusModeEnabled: enabled }),
      selectedTaskId: null,
      setSelectedTaskId: (id) => set({ selectedTaskId: id }),
    }),
    {
      name: 'todo-app-storage',
      partialize: (state) => ({
        settings: state.settings,
        currentView: state.currentView,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
