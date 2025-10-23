'use client'

import { useState } from 'react'
import { Task, TaskPriority, TaskStatus } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

type TaskFormData = {
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  tags: string[]
  dueDate?: Date
  estimatedTime?: number
}

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  onSave: (task: TaskFormData) => void
}

export function TaskDialog({ open, onOpenChange, task, onSave }: TaskDialogProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium' as TaskPriority,
    status: task?.status || 'todo' as TaskStatus,
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    tags: task?.tags?.join(', ') || '',
    estimatedTime: task?.estimatedTime?.toString() || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const taskData: TaskFormData = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }

    if (formData.dueDate) {
      taskData.dueDate = new Date(formData.dueDate)
    }

    if (formData.estimatedTime) {
      taskData.estimatedTime = parseInt(formData.estimatedTime)
    }

    onSave(taskData)

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      tags: '',
      estimatedTime: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedTime">Est. Time (min)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                  placeholder="25"
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="work, important, quick"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
