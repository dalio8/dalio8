'use client'

import { useState } from 'react'
import { Task as TaskType } from '@/types'
import { TaskItem } from './task-item'
import { TaskDialog } from './task-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'

export function TaskList() {
  const { tasks, loading, createTask } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)

  // Filter root-level tasks (no parent)
  const rootTasks = tasks.filter(task => !task.parentId)

  // Apply search filter
  const filteredTasks = rootTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group by status
  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress')
  const completedTasks = filteredTasks.filter(t => t.status === 'completed')

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with search and add button */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setShowNewTaskDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Task groups */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'No tasks match your search.' : 'Create your first task to get started!'}
          </p>
          {!searchQuery && (
            <Button onClick={() => setShowNewTaskDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* To Do */}
          {todoTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-gray-400"></span>
                TO DO ({todoTasks.length})
              </h3>
              <div className="space-y-2">
                {todoTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* In Progress */}
          {inProgressTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                IN PROGRESS ({inProgressTasks.length})
              </h3>
              <div className="space-y-2">
                {inProgressTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                COMPLETED ({completedTasks.length})
              </h3>
              <div className="space-y-2">
                {completedTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* New Task Dialog */}
      <TaskDialog
        open={showNewTaskDialog}
        onOpenChange={setShowNewTaskDialog}
        onSave={async (taskData) => {
          await createTask(taskData)
          setShowNewTaskDialog(false)
        }}
      />
    </div>
  )
}
