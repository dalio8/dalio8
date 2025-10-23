'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { formatTime } from '@/lib/utils'

type TimerMode = 'work' | 'shortBreak' | 'longBreak'

export function PomodoroTimer() {
  const { settings } = useStore()
  const { pomodoroSettings } = settings

  const [mode, setMode] = useState<TimerMode>('work')
  const [timeLeft, setTimeLeft] = useState(pomodoroSettings.workDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalTime = mode === 'work'
    ? pomodoroSettings.workDuration
    : mode === 'shortBreak'
    ? pomodoroSettings.shortBreakDuration
    : pomodoroSettings.longBreakDuration

  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)

    // Play notification sound if enabled
    if (pomodoroSettings.soundEnabled) {
      playNotificationSound()
    }

    // Show notification if enabled
    if (pomodoroSettings.notificationsEnabled && 'Notification' in window) {
      new Notification('Pomodoro Complete!', {
        body: mode === 'work'
          ? 'Time for a break!'
          : 'Back to work!',
      })
    }

    // Auto-start next session if enabled
    if (mode === 'work') {
      const newSessions = sessionsCompleted + 1
      setSessionsCompleted(newSessions)

      const nextMode = newSessions % pomodoroSettings.sessionsUntilLongBreak === 0
        ? 'longBreak'
        : 'shortBreak'

      setMode(nextMode)
      setTimeLeft(nextMode === 'longBreak'
        ? pomodoroSettings.longBreakDuration
        : pomodoroSettings.shortBreakDuration
      )

      if (pomodoroSettings.autoStartBreaks) {
        setIsRunning(true)
      }
    } else {
      setMode('work')
      setTimeLeft(pomodoroSettings.workDuration)

      if (pomodoroSettings.autoStartWork) {
        setIsRunning(true)
      }
    }
  }

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3')
    audio.play().catch(() => {
      // Fallback to system beep if audio file not found
      console.log('Notification sound played')
    })
  }

  const handleStart = () => {
    // Request notification permission
    if (pomodoroSettings.notificationsEnabled && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(totalTime)
  }

  const handleSkip = () => {
    setIsRunning(false)
    handleTimerComplete()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === 'work' ? '🍅 Focus Time' : mode === 'shortBreak' ? '☕ Short Break' : '🌟 Long Break'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="relative">
          <div className="text-7xl font-bold text-center mb-4 font-mono">
            {formatTime(timeLeft)}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 justify-center">
          <Button
            variant={mode === 'work' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode('work')
              setTimeLeft(pomodoroSettings.workDuration)
              setIsRunning(false)
            }}
          >
            Work
          </Button>
          <Button
            variant={mode === 'shortBreak' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode('shortBreak')
              setTimeLeft(pomodoroSettings.shortBreakDuration)
              setIsRunning(false)
            }}
          >
            Short Break
          </Button>
          <Button
            variant={mode === 'longBreak' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode('longBreak')
              setTimeLeft(pomodoroSettings.longBreakDuration)
              setIsRunning(false)
            }}
          >
            Long Break
          </Button>
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {!isRunning ? (
            <Button size="lg" onClick={handleStart} className="w-32">
              <Play className="h-5 w-5 mr-2" />
              Start
            </Button>
          ) : (
            <Button size="lg" onClick={handlePause} className="w-32" variant="secondary">
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={handleReset}>
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" onClick={handleSkip}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Session Counter */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Sessions completed: {sessionsCompleted}</p>
          <p className="mt-1">
            {pomodoroSettings.sessionsUntilLongBreak - (sessionsCompleted % pomodoroSettings.sessionsUntilLongBreak)} sessions until long break
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
