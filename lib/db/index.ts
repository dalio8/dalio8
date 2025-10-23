import { openDB, DBSchema, IDBPDatabase } from 'idb'
import {
  Task,
  UserProfile,
  FlashcardDeck,
  Mindmap,
  PomodoroSession,
  AppSettings,
} from '@/types'

// Database schema definition
interface TodoAppDB extends DBSchema {
  tasks: {
    key: string
    value: Task
    indexes: { 'by-status': string; 'by-priority': string; 'by-due-date': Date }
  }
  profile: {
    key: string
    value: UserProfile
  }
  flashcardDecks: {
    key: string
    value: FlashcardDeck
  }
  mindmaps: {
    key: string
    value: Mindmap
  }
  pomodoroSessions: {
    key: string
    value: PomodoroSession
    indexes: { 'by-task': string; 'by-date': Date }
  }
  settings: {
    key: string
    value: AppSettings
  }
}

const DB_NAME = 'todo-app-db'
const DB_VERSION = 1

let dbInstance: IDBPDatabase<TodoAppDB> | null = null

// Initialize database
export async function initDB(): Promise<IDBPDatabase<TodoAppDB>> {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<TodoAppDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Tasks store
      if (!db.objectStoreNames.contains('tasks')) {
        const taskStore = db.createObjectStore('tasks', { keyPath: 'id' })
        taskStore.createIndex('by-status', 'status')
        taskStore.createIndex('by-priority', 'priority')
        taskStore.createIndex('by-due-date', 'dueDate')
      }

      // Profile store
      if (!db.objectStoreNames.contains('profile')) {
        db.createObjectStore('profile', { keyPath: 'id' })
      }

      // Flashcard decks store
      if (!db.objectStoreNames.contains('flashcardDecks')) {
        db.createObjectStore('flashcardDecks', { keyPath: 'id' })
      }

      // Mindmaps store
      if (!db.objectStoreNames.contains('mindmaps')) {
        db.createObjectStore('mindmaps', { keyPath: 'id' })
      }

      // Pomodoro sessions store
      if (!db.objectStoreNames.contains('pomodoroSessions')) {
        const pomodoroStore = db.createObjectStore('pomodoroSessions', { keyPath: 'id' })
        pomodoroStore.createIndex('by-task', 'taskId')
        pomodoroStore.createIndex('by-date', 'startTime')
      }

      // Settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'id' })
      }
    },
  })

  return dbInstance
}

// Generic CRUD operations
export class DBService<T extends { id: string }> {
  constructor(private storeName: keyof TodoAppDB) {}

  async getAll(): Promise<T[]> {
    const db = await initDB()
    return db.getAll(this.storeName as any) as Promise<T[]>
  }

  async getById(id: string): Promise<T | undefined> {
    const db = await initDB()
    return db.get(this.storeName as any, id) as Promise<T | undefined>
  }

  async add(item: T): Promise<string> {
    const db = await initDB()
    await db.add(this.storeName as any, item as any)
    return item.id
  }

  async update(item: T): Promise<void> {
    const db = await initDB()
    await db.put(this.storeName as any, item as any)
  }

  async delete(id: string): Promise<void> {
    const db = await initDB()
    await db.delete(this.storeName as any, id)
  }

  async clear(): Promise<void> {
    const db = await initDB()
    await db.clear(this.storeName as any)
  }
}

// Specific service instances
export const tasksDB = new DBService<Task>('tasks')
export const profileDB = new DBService<UserProfile>('profile')
export const flashcardDecksDB = new DBService<FlashcardDeck>('flashcardDecks')
export const mindmapsDB = new DBService<Mindmap>('mindmaps')
export const pomodoroSessionsDB = new DBService<PomodoroSession>('pomodoroSessions')
export const settingsDB = new DBService<AppSettings>('settings')

// Specialized query methods
export async function getTasksByStatus(status: string): Promise<Task[]> {
  const db = await initDB()
  return db.getAllFromIndex('tasks', 'by-status', status)
}

export async function getTasksByPriority(priority: string): Promise<Task[]> {
  const db = await initDB()
  return db.getAllFromIndex('tasks', 'by-priority', priority)
}

export async function getPomodoroSessionsByTask(taskId: string): Promise<PomodoroSession[]> {
  const db = await initDB()
  return db.getAllFromIndex('pomodoroSessions', 'by-task', taskId)
}

export async function exportAllData() {
  const [tasks, profiles, decks, mindmaps, sessions, settings] = await Promise.all([
    tasksDB.getAll(),
    profileDB.getAll(),
    flashcardDecksDB.getAll(),
    mindmapsDB.getAll(),
    pomodoroSessionsDB.getAll(),
    settingsDB.getAll(),
  ])

  return {
    version: '1.0',
    exportDate: new Date(),
    tasks,
    profile: profiles[0],
    flashcardDecks: decks,
    mindmaps,
    pomodoroSessions: sessions,
    settings: settings[0],
  }
}

export async function importAllData(data: any) {
  // Clear existing data
  await tasksDB.clear()
  await profileDB.clear()
  await flashcardDecksDB.clear()
  await mindmapsDB.clear()
  await pomodoroSessionsDB.clear()
  await settingsDB.clear()

  // Import new data
  if (data.tasks) {
    for (const task of data.tasks) {
      await tasksDB.add(task)
    }
  }

  if (data.profile) {
    await profileDB.add(data.profile)
  }

  if (data.flashcardDecks) {
    for (const deck of data.flashcardDecks) {
      await flashcardDecksDB.add(deck)
    }
  }

  if (data.mindmaps) {
    for (const mindmap of data.mindmaps) {
      await mindmapsDB.add(mindmap)
    }
  }

  if (data.pomodoroSessions) {
    for (const session of data.pomodoroSessions) {
      await pomodoroSessionsDB.add(session)
    }
  }

  if (data.settings) {
    await settingsDB.add(data.settings)
  }
}
