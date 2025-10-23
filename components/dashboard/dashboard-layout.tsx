'use client'

import { useEffect } from 'react'
import { Sidebar } from './sidebar'
import { useStore } from '@/store/useStore'
import { initDB, profileDB } from '@/lib/db'
import { UserProfile } from '@/types'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, setProfile } = useStore()

  // Initialize database and load user profile
  useEffect(() => {
    async function initialize() {
      await initDB()

      // Load or create user profile
      const profiles = await profileDB.getAll()
      if (profiles.length === 0) {
        // Create default profile
        const defaultProfile: UserProfile = {
          id: crypto.randomUUID(),
          username: 'User',
          level: 1,
          xp: 0,
          totalXP: 0,
          achievements: [],
          streakCurrent: 0,
          streakBest: 0,
          createdAt: new Date(),
        }
        await profileDB.add(defaultProfile)
        setProfile(defaultProfile)
      } else {
        setProfile(profiles[0])
      }
    }

    initialize()
  }, [setProfile])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
