export type WordAttempt = {
    id: string
    user_id: string
    word: string
    was_correct: boolean
    user_answer: string
    session_id: string | null
    created_at: string
}
