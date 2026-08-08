import { supabase } from '@/shared/utils/supabase'

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
