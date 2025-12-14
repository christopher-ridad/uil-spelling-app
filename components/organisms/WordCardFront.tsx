'use client'

import { useState } from 'react'
import AudioButton from '../atoms/AudioButton'
import SubmitAnswerButton from '../atoms/SubmitAnswerButton'
import CardHeader from '../molecules/CardHeader'
import SpellingInput from '../molecules/SpellingInput'

interface WordCardFrontProps {
    color: string
    colorDark: string
    colorHover: string
    colorFocus: string
    headerText?: string
    score_correct: number
    score_total: number
}

export default function WordCardFront({ color, colorDark, colorHover, colorFocus, headerText="UIL Spelling Test", score_correct, score_total }: WordCardFrontProps) {
    const [userInput, setUserInput] = useState('');
    //const [score, setScore] = useState({ correct: 12, total: 15 });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <main className="max-w-2xl mx-auto">
            {/* Header */}
            <CardHeader 
                headerColor={color}
                scoreDisplayColor={colorDark}
                headerText={headerText}
                correct={score_correct}
                total={score_total}
            />
            {/* Main Card */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-4">
                <article className="text-center mb-8">
                    <p className="text-gray-600 mb-4">Listen to the word and spell it correctly</p>
                    
                    {/* Audio Button */}
                    <AudioButton color={color} colorHover={colorHover} />
                    
                    <p className="text-sm text-gray-500 mb-2">Word #{score_total}</p>
                </article>

                {/* Input Area */}
                <SpellingInput
                colorFocus={colorFocus}
                value={userInput}
                onChange={handleInputChange}
                />

                {/* Submit Button */}
                <SubmitAnswerButton
                    color={color}
                    hoverColor={colorHover}
                    buttonText="Submit Answer"
                />
            </section>
        </main>
    );
}