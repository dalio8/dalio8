'use client'

import { useState } from 'react'
import { Task, TaskPriority } from '@/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  Tag,
  MoreVertical,
  Trash2,
  Edit,
  PlayCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { useTasks } from '@/hooks/useTasks'
import { format } from 'date-fns'

interface TaskItemProps {
  task: Task
  depth?: number
}

const priorityColors: Record<TaskPriority, string> = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const priorityIcons: Record<TaskPriority, string> = {
  low: '⬇️',
  medium: '➡️',
  high: '⬆️',
}

export function TaskItem({ task, depth = 0 }: TaskItemProps) {
  const { toggleTaskStatus, deleteTask } = useTasks()
  const [expanded, setExpanded] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const hasSubtasks = task.subtasks && task.subtasks.length > 0
  const completedSubtasks = task.subtasks?.filter(st => st.status === 'completed').length || 0
  const totalSubtasks = task.subtasks?.length || 0

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed'

  return (
    <div className={cn('space-y-2', depth > 0 && 'ml-8')}>
      <Card className={cn(
        'p-4 transition-all hover:shadow-md',
        task.status === 'completed' && 'opacity-60'
      )}>
        <div className="flex items-start gap-3">
          {/* Expand/Collapse for subtasks */}
          {hasSubtasks ? (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Status checkbox */}
          <button
            onClick={() => toggleTaskStatus(task.id)}
            className="mt-1 transition-transform hover:scale-110"
          >
            {task.status === 'completed' ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : task.status === 'in-progress' ? (
              <Clock className="h-5 w-5 text-blue-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className={cn(
                'font-medium',
                task.status === 'completed' && 'line-through text-muted-foreground'
              )}>
                {task.title}
              </h4>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <PlayCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {task.description && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Priority */}
              <Badge variant="secondary" className={priorityColors[task.priority]}>
                {priorityIcons[task.priority]} {task.priority}
              </Badge>

              {/* Due date */}
              {task.dueDate && (
                <Badge variant={isOverdue ? 'destructive' : 'outline'} className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(task.dueDate), 'MMM d')}
                </Badge>
              )}

              {/* Tags */}
              {task.tags?.map(tag => (
                <Badge key={tag} variant="outline" className="gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}

              {/* Subtasks progress */}
              {hasSubtasks && (
                <Badge variant="secondary" className="gap-1">
                  {completedSubtasks}/{totalSubtasks} subtasks
                </Badge>
              )}

              {/* Pomodoro count */}
              {task.pomodoroCount > 0 && (
                <Badge variant="secondary" className="gap-1">
                  🍅 {task.pomodoroCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Subtasks */}
      {expanded && hasSubtasks && (
        <div className="space-y-2">
          {task.subtasks.map(subtask => (
            <TaskItem key={subtask.id} task={subtask} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
