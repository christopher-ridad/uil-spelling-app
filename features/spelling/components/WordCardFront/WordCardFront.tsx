'use client'

import { useState } from 'react'
import AudioButton from '../AudioButton'
import Word from '@/shared/components/Word'
import FeedbackMessage from '../FeedbackMessage'
import SubmitAnswerButton from '@/shared/components/SubmitAnswerButton'
import NextArrow from '@/shared/components/NextArrow'
import SpellingInput from '@/shared/components/SpellingInput'
import { ColorScheme } from '@/shared/utils/colors'

interface WordCardFrontProps {
    colors: ColorScheme
    word: string
    score_correct: number
    score_total: number
    onNext: () => void
    onSubmit: (isCorrect: boolean, userAnswer: string) => void
}

export default function WordCardFront({
    colors,
    word,
    onNext,
    onSubmit
}: WordCardFrontProps) {
    
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleSubmit = () => {
        const trimmed = userAnswer.trim()
        if (!trimmed) return

        const isCorrect = trimmed == word

        setFeedback(isCorrect ? 'correct' : 'incorrect')
        setHasSubmitted(true)
        onSubmit(isCorrect, trimmed)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !hasSubmitted) {
            handleSubmit()
        }
    }

    const handleNext = () => {
        setUserAnswer('')
        setFeedback(null)
        setHasSubmitted(false)
        onNext()
    }

    return (
        <section className="max-w-2xl mx-auto relative">
            {/* Main Card */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-4">
                <article className="text-center mb-8">
                    <p className="text-black mb-4">Listen to the word and spell it correctly</p>
                    
                    {/* Audio Button */}
                    <AudioButton color={colors.bg} colorHover={colors.bgHover} word={word} />

                    {feedback ? (
                        <Word color={colors.bgText} word={word} />
                    ) : (
                        <p className="text-xl text-black mb-2">
                            Word #{1}
                        </p>
                    )}


                    <FeedbackMessage feedback={feedback} />
                </article>

                {/* Input Area */}
                <SpellingInput
                colorFocus={colors.bgFocus}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                />

                {/* Submit Button */}
                <SubmitAnswerButton
                    color={colors.bg}
                    hoverColor={colors.bgHover}
                    buttonText="Submit Answer"
                    onClick={handleSubmit}
                />
                <NextArrow onClick={handleNext} visible={hasSubmitted} color={colors.bg} colorHover={colors.bgHover}/>
            </section>
        </section>
    );
}