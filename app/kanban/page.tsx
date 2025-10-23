'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { KanbanBoard } from '@/components/features/kanban/kanban-board'

export default function KanbanPage() {
  return (
    <DashboardLayout>
      <KanbanBoard />
    </DashboardLayout>
  )
}
