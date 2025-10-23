'use client'

import { useState } from 'react'
import { Task, TaskStatus } from '@/types'
import { useTasks } from '@/hooks/useTasks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, Tag, Clock } from 'lucide-react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { KanbanCard } from './kanban-card'
import { TaskDialog } from '../tasks/task-dialog'

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'completed', title: 'Completed', color: 'bg-green-500' },
]

const priorityColors: Record<Task['priority'], string> = {
  low: 'border-blue-500',
  medium: 'border-yellow-500',
  high: 'border-red-500',
}

export function KanbanBoard() {
  const { tasks, updateTask, createTask } = useTasks()
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<TaskStatus>('todo')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Filter root-level tasks (no parent)
  const rootTasks = tasks.filter(task => !task.parentId)

  // Group tasks by status
  const tasksByStatus: Record<TaskStatus, Task[]> = {
    'todo': rootTasks.filter(t => t.status === 'todo'),
    'in-progress': rootTasks.filter(t => t.status === 'in-progress'),
    'completed': rootTasks.filter(t => t.status === 'completed'),
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveTask(null)
      return
    }

    const taskId = active.id as string
    const task = tasks.find(t => t.id === taskId)

    if (!task) {
      setActiveTask(null)
      return
    }

    // Check if dropped over a column
    const overColumnId = over.id as TaskStatus
    if (columns.some(col => col.id === overColumnId)) {
      if (task.status !== overColumnId) {
        updateTask({ ...task, status: overColumnId })
      }
    }

    setActiveTask(null)
  }

  const handleCreateTask = (status: TaskStatus) => {
    setSelectedColumn(status)
    setShowTaskDialog(true)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Kanban Board</h1>
          <p className="text-muted-foreground">Organize tasks with drag-and-drop</p>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <Card key={column.id} className="flex flex-col max-h-[calc(100vh-250px)]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-3 h-3 rounded-full', column.color)} />
                    <CardTitle className="text-base">{column.title}</CardTitle>
                    <Badge variant="secondary" className="ml-auto">
                      {tasksByStatus[column.id].length}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pt-0">
                <SortableContext
                  id={column.id}
                  items={tasksByStatus[column.id].map(t => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3 mb-3">
                    {tasksByStatus[column.id].map(task => (
                      <KanbanCard key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>

                {/* Add Task Button */}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground"
                  onClick={() => handleCreateTask(column.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add task
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <div className={cn(
              'p-4 rounded-lg border-2 bg-card shadow-lg',
              priorityColors[activeTask.priority]
            )}>
              <h4 className="font-medium text-sm mb-2">{activeTask.title}</h4>
              {activeTask.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {activeTask.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="secondary">{activeTask.priority}</Badge>
                {activeTask.dueDate && (
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(activeTask.dueDate), 'MMM d')}
                  </Badge>
                )}
                {activeTask.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Create Task Dialog */}
      <TaskDialog
        open={showTaskDialog}
        onOpenChange={setShowTaskDialog}
        onSave={async (taskData) => {
          await createTask({
            ...taskData,
            status: selectedColumn,
          })
          setShowTaskDialog(false)
        }}
      />
    </div>
  )
}
