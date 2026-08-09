'use client'

import useSWR from 'swr'
import { useAuth } from '@/shared/contexts/AuthContext'
import WelcomeBox from '@/features/dashboard/components/WelcomeBox'
import StatsCardGrid from '@/features/dashboard/components/StatsCardGrid'
import PracticeModeBox from '@/features/dashboard/components/PracticeModeBox'
import RecentWordBox from '@/features/dashboard/components/RecentWordBox'
import QuickActionGrid from '@/features/dashboard/components/QuickActionGrid'
import ScrollReveal from '@/shared/components/ScrollReveal'
import WordBackground from '@/features/dashboard/components/WordBackground'
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
      <div className="relative">
        <WordBackground />
        <div className="relative z-10">
          <ScrollReveal className="px-6 pt-8">
            <WelcomeBox userName={user?.email?.split('@')[0] ?? 'Guest'} streak={stats.streak}/>
          </ScrollReveal>
          <ScrollReveal className="px-6">
            <StatsCardGrid
              totalWordsPracticed={stats.totalWordsPracticed}
              overallAccuracy={stats.overallAccuracy}
              streak={stats.streak}
            />
          </ScrollReveal>
          <ScrollReveal className="px-6 pb-8">
            <QuickActionGrid />
          </ScrollReveal>
          <ScrollReveal className="px-6">
            <PracticeModeBox />
          </ScrollReveal>
          <ScrollReveal className="px-6 py-8">
            <RecentWordBox />
          </ScrollReveal>
        </div>
      </div>
    )
}
