import { supabase } from '@/shared/utils/supabase'
import { WordToReview } from '@/features/review/types'

export async function getWordsToReview(userId: string, limit = 10): Promise<WordToReview[]> {
    const { data, error } = await supabase
        .from('user_word_progress')
        .select('*')
        .eq('user_id', userId)
        .gt('attempts', 0)

    if (error) throw error

    // rank by accuracy (not raw correct_attempts, which favors frequently-attempted words)
    return data
        .map(row => ({
            ...row,
            accuracy: Math.round((row.correct_attempts / row.attempts) * 100)
        }))
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, limit)
}
