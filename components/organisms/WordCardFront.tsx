'use client'

import { useState } from 'react'
import AudioButton from '../atoms/AudioButton'
import FeedbackMessage from '../atoms/FeedbackMessage'
import SubmitAnswerButton from '../atoms/SubmitAnswerButton'
import SpellingInput from '../molecules/SpellingInput'

interface WordCardFrontProps {
    color: string
    colorHover: string
    colorFocus: string
    word: string
    score_correct: number
    score_total: number
    onSubmit: () => void
}

export default function WordCardFront({ color, colorHover, colorFocus, word, onSubmit }: WordCardFrontProps) {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleSubmit = () => {
        if (!userAnswer.trim()) return

        const isCorrect = userAnswer.trim() == word

        setFeedback(isCorrect ? 'correct' : 'incorrect')
        setHasSubmitted(true)
        onSubmit()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !hasSubmitted) {
            handleSubmit()
        }
    }

    return (
        <section className="max-w-2xl mx-auto">
            {/* Main Card */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-4">
                <article className="text-center mb-8">
                    <p className="text-black mb-4">Listen to the word and spell it correctly</p>
                    
                    {/* Audio Button */}
                    <AudioButton color={color} colorHover={colorHover} word={word} />
                    
                    <p className="text-sm text-black mb-2">Word #{1}</p>

                    <FeedbackMessage feedback={feedback} />
                </article>

                {/* Input Area */}
                <SpellingInput
                colorFocus={colorFocus}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                />

                {/* Submit Button */}
                <SubmitAnswerButton
                    color={color}
                    hoverColor={colorHover}
                    buttonText="Submit Answer"
                    onClick={handleSubmit}
                />
            </section>
        </section>
    );
}