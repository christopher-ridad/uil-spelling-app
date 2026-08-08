import { supabase } from '@/shared/utils/supabase'

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
