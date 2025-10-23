'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { CalendarView } from '@/components/features/calendar/calendar-view'

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <CalendarView />
    </DashboardLayout>
  )
}
