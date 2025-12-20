import { supabase } from './supabase'

export async function recordWordAttempt(
    userId: string,
    word: string,
    wasCorrect: boolean,
    userAnswer: string,
    sessionId?: string
) {
    // record attempt
    const { error: attemptError } = await supabase
        .from('word_attempts')
        .insert({
            user_id: userId,
            word,
            was_correct: wasCorrect,
            user_answer: userAnswer,
            session_id: sessionId,
        })

    if (attemptError) throw attemptError

    // update or create progress record
    const { data: existing } = await supabase
        .from('user_word_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('word', word)
        .single()

    if (existing) {
        // update existing attempts
        await supabase
            .from('user_word_progress')
            .update({
                attempts: existing.attempts + 1,
                correct_attempts: existing.correct_attempts + (wasCorrect ? 1 : 0),
                last_practiced: new Date().toISOString(),
            })
            .eq('id', existing.id)
    } else {
        // create new attempt
        await supabase
            .from('user_word_progress')
            .insert({
                user_id: userId,
                word,
                attempts: 1,
                correct_attempts: wasCorrect ? 1 : 0,
                last_practiced: new Date().toISOString(),
            })
    }
}

export async function getUserWordProgress(userId: string) {
    const { data, error } = await supabase
        .from('user_word_progress')
        .select('*')
        .eq('user_id', userId)
        .order('last_practiced', { ascending: false })

    if (error) throw error
    return data
}

export async function getWordsToReview(userId: string, limit = 10) {
    // retrieve words with lowest success rate
    const { data, error } = await supabase
        .from('user_word_progress')
        .select('*')
        .eq('user_id', userId)
        .order('correct_attempts', { ascending : true })
        .limit(limit)

    if (error) throw error
    return data
}

export async function getRecentAttempts(userId: string, limit = 3) {
    const { data, error } = await supabase
        .from('word_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)
    
    if (error) throw error
    return data
}

export async function getAllWordsWithProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_word_progress')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  
  // Convert array to map for easy lookup
  const progressMap: Record<string, any> = {}
  data.forEach(item => {
    progressMap[item.word] = item
  })
  
  return progressMap
}

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