import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function calculateXP(priority: 'low' | 'medium' | 'high', hasSubtasks: boolean): number {
  const baseXP = {
    low: 10,
    medium: 25,
    high: 50,
  }

  const xp = baseXP[priority]
  return hasSubtasks ? Math.floor(xp * 1.5) : xp
}

export function calculateLevel(xp: number): number {
  // Level formula: level = floor(sqrt(xp / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function getXPForNextLevel(currentLevel: number): number {
  // XP needed for next level
  return Math.pow(currentLevel, 2) * 100
}
