import { supabase } from '@/shared/utils/supabase'
import { WordAttempt } from '@/shared/models/WordAttempt'

export async function getRecentAttempts(userId: string, limit = 3): Promise<WordAttempt[]> {
    const { data, error } = await supabase
        .from('word_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) throw error
    return data
}
