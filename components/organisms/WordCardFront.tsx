'use client'

import { useState } from 'react'
import AudioButton from '../atoms/AudioButton'
import Word from '../atoms/Word'
import FeedbackMessage from '../atoms/FeedbackMessage'
import SubmitAnswerButton from '../atoms/SubmitAnswerButton'
import NextArrow from '../atoms/NextArrow'
import SpellingInput from '../molecules/SpellingInput'

interface WordCardFrontProps {
    color: string
    colorHover: string
    colorFocus: string
    colorText: string
    word: string
    score_correct: number
    score_total: number
    onNext: () => void
    onSubmit: (isCorrect: boolean, userAnswer: string) => void
}

export default function WordCardFront({ 
    color, 
    colorHover, 
    colorFocus, 
    colorText, 
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
                    <AudioButton color={color} colorHover={colorHover} word={word} />
                    
                    {feedback ? (
                        <Word color={colorText} word={word} />
                    ) : (
                        <p className="text-xl text-black mb-2">
                            Word #{1}
                        </p>
                    )}


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
                <NextArrow onClick={handleNext} visible={hasSubmitted} color={color} colorHover={colorHover}/>
            </section>
        </section>
    );
}