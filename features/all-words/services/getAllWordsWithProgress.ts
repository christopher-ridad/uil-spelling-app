import { supabase } from '@/shared/utils/supabase'

interface WordProgress {
  attempts: number
  correct_attempts: number
  last_practiced: string
}

export async function getAllWordsWithProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_word_progress')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error

  // Convert array to map for easy lookup
  const progressMap: Record<string, WordProgress> = {}
  data.forEach(item => {
    progressMap[item.word] = item
  })

  return progressMap
}
