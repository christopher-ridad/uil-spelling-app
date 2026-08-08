import { supabase } from '@/shared/utils/supabase'

export async function getDashboardStats(userId: string) {
  // get overall stats from user_word_progress
  const { data: progressData, error: progressError } = await supabase
    .from('user_word_progress')
    .select('*')
    .eq('user_id', userId)

  if (progressError) throw progressError

  // calc stats
  const totalWordsPracticed = progressData.length
  const totalAttempts = progressData.reduce((sum, word) => sum + word.attempts, 0)
  const totalCorrect = progressData.reduce((sum, word) => sum + word.correct_attempts, 0)
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  // calc streak (simple version - days practiced in a row)
  const { data: allAttempts } = await supabase
    .from('word_attempts')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  const streak = calculateStreak(allAttempts || [])

  return {
    totalWordsPracticed,
    totalAttempts,
    overallAccuracy,
    streak
  }
}

function calculateStreak(attempts: { created_at: string }[]): number {
  if (attempts.length === 0) return 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get unique practice days
  const practiceDays = new Set(
    attempts.map(a => {
      const date = new Date(a.created_at)
      date.setHours(0, 0, 0, 0)
      return date.getTime()
    })
  )

  const sortedDays = Array.from(practiceDays).sort((a, b) => b - a)

  let streak = 0
  let currentDay = today.getTime()

  // find longest streak going backwards in time
  for (const day of sortedDays) {
    if (day === currentDay || day === currentDay - 86400000) { // 86400000ms = 1 day
      streak++
      currentDay = day - 86400000
    } else {
      break
    }
  }

  return streak
}
