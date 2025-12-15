'use client'

interface FeedbackMessageProps {
    feedback: 'correct' | 'incorrect' | null
}

export default function FeedbackMessage({ feedback }: FeedbackMessageProps) {
    if (!feedback) return null

    return (
        <article className={`text-center font-semibold text-lg pt-4 ${
            feedback == 'correct'
            ? 'text-green-600'
            : 'text-red-600'
        }`}>
            {feedback == 'correct' ? 'Correct!' : 'Incorrect!'}
        </article>
    )
}