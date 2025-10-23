'use client'

import { Task } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Calendar, Tag, Clock, MoreVertical } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface KanbanCardProps {
  task: Task
}

const priorityColors: Record<Task['priority'], string> = {
  low: 'border-l-blue-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-red-500',
}

export function KanbanCard({ task }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'p-4 rounded-lg border-l-4 bg-card hover:bg-accent cursor-grab active:cursor-grabbing transition-colors',
        priorityColors[task.priority],
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm flex-1">{task.title}</h4>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 text-xs mb-3">
        <Badge variant="secondary">{task.priority}</Badge>

        {task.dueDate && (
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(task.dueDate), 'MMM d')}
          </Badge>
        )}

        {task.estimatedTime && (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {task.estimatedTime}m
          </Badge>
        )}
      </div>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="gap-1 text-xs">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{task.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {task.subtasks.length > 0 && (
        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          {task.subtasks.filter(st => st.status === 'completed').length} / {task.subtasks.length} subtasks
        </div>
      )}
    </div>
  )
}
