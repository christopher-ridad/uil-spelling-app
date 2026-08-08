'use client'

import useSWR from 'swr'
import { useAuth } from '@/shared/contexts/AuthContext'
import NavBar from '@/shared/components/NavBar'
import WelcomeBox from '@/features/dashboard/components/WelcomeBox'
import StatsCardGrid from '@/features/dashboard/components/StatsCardGrid'
import PracticeModeBox from '@/features/dashboard/components/PracticeModeBox'
import RecentWordBox from '@/features/dashboard/components/RecentWordBox'
import QuickActionGrid from '@/features/dashboard/components/QuickActionGrid'
import { getDashboardStats } from '@/features/dashboard/services/getDashboardStats'

interface DashboardStats {
  totalWordsPracticed: number
  totalAttempts: number
  overallAccuracy: number
  streak: number
}

const DEFAULT_STATS: DashboardStats = {
  totalWordsPracticed: 0,
  totalAttempts: 0,
  overallAccuracy: 0,
  streak: 0
}

export default function Page() {
  const { user } = useAuth()

  const { data: stats = DEFAULT_STATS, isLoading } = useSWR<DashboardStats>(
    user ? ['dashboard-stats', user.id] : null,
    () => getDashboardStats(user!.id),
    { onError: (error) => console.error('Error loading dashboard stats:', error) }
  )

  const loading = user ? isLoading : true

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
          <WelcomeBox userName={user?.email?.split('@')[0] ?? 'Guest'} streak={stats.streak}/>
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
