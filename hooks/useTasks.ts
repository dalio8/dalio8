'use client'

import { useEffect, useState } from 'react'
import { Task, TaskStatus, TaskPriority } from '@/types'
import { tasksDB } from '@/lib/db'
import { useStore } from '@/store/useStore'
import { calculateXP } from '@/lib/utils'

export function useTasks() {
  const { tasks, setTasks, addTask: addTaskToStore, updateTask: updateTaskInStore, deleteTask: deleteTaskFromStore, addXP } = useStore()
  const [loading, setLoading] = useState(true)

  // Load tasks from IndexedDB on mount
  useEffect(() => {
    async function loadTasks() {
      try {
        const loadedTasks = await tasksDB.getAll()
        setTasks(loadedTasks)
      } catch (error) {
        console.error('Failed to load tasks:', error)
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
  }, [setTasks])

  const createTask = async (taskData: {
    title: string
    description: string
    priority: TaskPriority
    status: TaskStatus
    tags: string[]
    dueDate?: Date
    estimatedTime?: number
    notes?: string
    recurring?: Task['recurring']
    parentId?: string
  }) => {
    const newTask: Task = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
      tags: taskData.tags,
      dueDate: taskData.dueDate,
      estimatedTime: taskData.estimatedTime,
      notes: taskData.notes,
      recurring: taskData.recurring,
      parentId: taskData.parentId,
      id: crypto.randomUUID(),
      subtasks: [],
      order: tasks.length,
      pomodoroCount: 0,
      timeSpent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await tasksDB.add(newTask)
    addTaskToStore(newTask)
    return newTask
  }

  const updateTask = async (task: Task) => {
    const updatedTask = {
      ...task,
      updatedAt: new Date(),
    }

    // Check if task was just completed to award XP
    const oldTask = tasks.find(t => t.id === task.id)
    if (oldTask && oldTask.status !== 'completed' && task.status === 'completed') {
      const xp = calculateXP(task.priority, task.subtasks.length > 0)
      addXP(xp)
      updatedTask.completedAt = new Date()
    }

    await tasksDB.update(updatedTask)
    updateTaskInStore(updatedTask)
  }

  const deleteTask = async (id: string) => {
    await tasksDB.delete(id)
    deleteTaskFromStore(id)
  }

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    const statusCycle: Record<TaskStatus, TaskStatus> = {
      'todo': 'in-progress',
      'in-progress': 'completed',
      'completed': 'todo',
    }

    const newStatus = statusCycle[task.status]
    await updateTask({ ...task, status: newStatus })
  }

  const addSubtask = async (parentId: string, subtaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks' | 'order' | 'pomodoroCount' | 'timeSpent' | 'parentId'>) => {
    const parent = tasks.find(t => t.id === parentId)
    if (!parent) return

    const subtask: Task = {
      ...subtaskData,
      id: crypto.randomUUID(),
      parentId,
      subtasks: [],
      order: parent.subtasks.length,
      pomodoroCount: 0,
      timeSpent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedParent = {
      ...parent,
      subtasks: [...parent.subtasks, subtask],
      updatedAt: new Date(),
    }

    await tasksDB.update(updatedParent)
    updateTaskInStore(updatedParent)
  }

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    addSubtask,
  }
}
