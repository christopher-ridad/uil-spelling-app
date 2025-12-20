'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { NavBar, WelcomeBox, StatsCardGrid, PracticeModeBox, RecentWordBox, QuickActionGrid } from '@/components'
import { getDashboardStats } from '@/lib/wordProgress'

interface Attempt {
  id: string
  word: string
  was_correct: boolean
  created_at: string
}

interface DashboardStats {
  totalWordsPracticed: number
  totalAttempts: number
  overallAccuracy: number
  streak: number
}

export default function Page() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalWordsPracticed: 0,
    totalAttempts: 0,
    overallAccuracy: 0,
    streak: 0
  })
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadStats()
    }
  }, [user])

  const loadStats = async () => {
    if (!user) return
  
    try {
      const data = await getDashboardStats(user.id)
      setStats(data)
      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
        <NavBar />
        <div className="px-6 pt-8">
          <WelcomeBox userName={"Chris"} streak={5}/>
        </div>
        <div className="px-6">
          <StatsCardGrid 
            totalWordsPracticed={stats.totalWordsPracticed}
            overallAccuracy={stats.overallAccuracy}
            streak={stats.streak}
          />
        </div>
        <div className="px-6 pb-8">
          <QuickActionGrid />
        </div>        
        <div className="px-6">
          <PracticeModeBox />
        </div>
        <div className="px-6 py-8">
          <RecentWordBox />
        </div> 
      </div>
    )
}