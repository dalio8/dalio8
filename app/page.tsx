'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TaskList } from '@/components/features/tasks/task-list'
import { PomodoroTimer } from '@/components/features/pomodoro/pomodoro-timer'
import { useStore } from '@/store/useStore'
import { Trophy, Flame, Target, TrendingUp } from 'lucide-react'

export default function Home() {
  const { profile, tasks } = useStore()

  const todayTasks = tasks.filter(t => !t.parentId && t.status !== 'completed').length
  const completedTasks = tasks.filter(t => !t.parentId && t.status === 'completed').length
  const inProgressTasks = tasks.filter(t => !t.parentId && t.status === 'in-progress').length

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {profile?.username || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayTasks}</div>
              <p className="text-xs text-muted-foreground">
                {inProgressTasks} in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                Total completed tasks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.level || 1}</div>
              <p className="text-xs text-muted-foreground">
                {profile?.xp || 0} XP earned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.streakCurrent || 0}</div>
              <p className="text-xs text-muted-foreground">
                Best: {profile?.streakBest || 0} days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList />
              </CardContent>
            </Card>
          </div>

          {/* Pomodoro Timer - Takes 1 column */}
          <div className="space-y-4">
            <PomodoroTimer />

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Achievements</span>
                  <span className="font-semibold">{profile?.achievements.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total XP</span>
                  <span className="font-semibold">{profile?.totalXP || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold">
                    {tasks.length > 0
                      ? Math.round((completedTasks / tasks.length) * 100)
                      : 0}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
