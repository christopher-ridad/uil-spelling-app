'use client'

import { useState } from 'react'
import { COLORS } from '../../lib/colors'
import { VocabCard } from '../../components'

export default function VocabPage() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
        const words = [
            { word: 'example', definition: '...', partOfSpeech: 'noun', example: '...' },
            { word: 'practice', definition: '...', partOfSpeech: 'noun', example: '...' },
            // ... more words
        ];
    
        const handleNext = () => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length); // Move to next word, loop back to start
        };
    
        const currentWord = words[currentWordIndex];

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 to-red-300">
            <section className="max-w-2xl w-full px-4">
                <VocabCard 
                    key={currentWordIndex}
                    headerText={"Vocab Practice"}
                    word={currentWord.word}
                    definition={currentWord.definition}
                    partOfSpeech={currentWord.partOfSpeech}
                    example={currentWord.example}
                    color={COLORS.red.bg}
                    colorDark={COLORS.red.bgDark}
                    colorHover={COLORS.red.bgHover}
                    colorText={COLORS.red.bgText}
                    colorBorder={COLORS.red.bgBorder}
                    colorBorder2={COLORS.red.bgBorder2}
                    colorLight={COLORS.red.bgLight}
                    score_correct={0}
                    score_total={1}
                    onNext={handleNext}
                />
            </section>
        </main>
    )
}