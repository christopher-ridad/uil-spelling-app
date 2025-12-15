'use client'

import { useState } from 'react'
import WordOptionList from '../molecules/WordOptionList'
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

export default function MisspellCardFront({ color, colorDark, colorHover, colorFocus, headerText="UIL Spelling Test", score_correct, score_total }: WordCardFrontProps) {
    const [userInput, setUserInput] = useState('');
    //const [score, setScore] = useState({ correct: 12, total: 15 });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <section className="max-w-2xl w-full">
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
                    
                    {/* Word Options */}
                    <WordOptionList color={color} colorHover={colorHover} options={["ate", "eat", "tea", "eta", "ola"]}/>
                    
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
        </section>
    );
}