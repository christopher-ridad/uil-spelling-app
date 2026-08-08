import { supabase } from '@/shared/utils/supabase'

export async function getUserWordProgress(userId: string) {
    const { data, error } = await supabase
        .from('user_word_progress')
        .select('*')
        .eq('user_id', userId)
        .order('last_practiced', { ascending: false })

    if (error) throw error
    return data
}
