'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  BarChart3,
  Timer,
  Brain,
  GitBranch,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: ListTodo },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Kanban', href: '/kanban', icon: Target },
  { name: 'Focus Mode', href: '/focus', icon: Timer },
  { name: 'Flashcards', href: '/flashcards', icon: Brain },
  { name: 'Mindmaps', href: '/mindmaps', icon: GitBranch },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, setSidebarCollapsed, profile } = useStore()
  const { theme, setTheme } = useTheme()

  const currentLevel = profile?.level || 1
  const currentXP = profile?.xp || 0
  const xpForNextLevel = Math.pow(currentLevel, 2) * 100
  const xpProgress = (currentXP / xpForNextLevel) * 100

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-card transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header with toggle */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!sidebarCollapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TodoMaster
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="ml-auto"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User Profile & XP */}
      {!sidebarCollapsed && profile && (
        <div className="border-b p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg">
              {profile.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{profile.username || 'User'}</p>
              <p className="text-sm text-muted-foreground">Level {currentLevel}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentXP} XP</span>
              <span>{xpForNextLevel} XP</span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    sidebarCollapsed && 'justify-center'
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer with theme toggle and settings */}
      <div className="border-t p-2 space-y-1">
        <Button
          variant="ghost"
          size={sidebarCollapsed ? 'icon' : 'default'}
          className={cn('w-full', sidebarCollapsed && 'justify-center')}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          {!sidebarCollapsed && <span className="ml-3">Toggle Theme</span>}
        </Button>
        <Link href="/settings">
          <Button
            variant="ghost"
            size={sidebarCollapsed ? 'icon' : 'default'}
            className={cn('w-full', sidebarCollapsed && 'justify-center')}
          >
            <Settings className="h-5 w-5" />
            {!sidebarCollapsed && <span className="ml-3">Settings</span>}
          </Button>
        </Link>
      </div>
    </aside>
  )
}
