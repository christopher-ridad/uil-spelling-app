import { supabase } from '@/shared/utils/supabase'

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
