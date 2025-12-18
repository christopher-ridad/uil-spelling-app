'use client'

import Word2 from '../atoms/Word2'

interface AttemptData {
    id: string
    word: string
    was_correct: boolean
    created_at: string
}

interface WordListProps {
    words: AttemptData[]
}

export default function WordList({ words }: WordListProps) {
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        
        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins}m ago`
        
        const diffHours = Math.floor(diffMins / 60)
        if (diffHours < 24) return `${diffHours}h ago`
        
        const diffDays = Math.floor(diffHours / 24)
        return `${diffDays}d ago`
    }
    
    return (
        <section className="flex flex-col gap-5">
            {words.map((attempt) => (
                <Word2 key={attempt.id}
                       word={attempt.word}
                       date={formatTime(attempt.created_at)}
                       status={attempt.was_correct ? 'correct' : 'incorrect'}
                />
            ))}
        </section>
    )
}