import { WordProgressRow } from './WordProgressRow'
import { WordAttempt } from './WordAttempt'

export type Database = {
    public: {
        Tables: {
            user_word_progress: {
                Row: WordProgressRow
                Insert: Omit<WordProgressRow, 'id'> & { id?: string }
                Update: Partial<Omit<WordProgressRow, 'id'>>
                Relationships: []
            }
            word_attempts: {
                Row: WordAttempt
                Insert: Omit<WordAttempt, 'id' | 'created_at'> & { id?: string; created_at?: string }
                Update: Partial<Omit<WordAttempt, 'id'>>
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
    }
}
