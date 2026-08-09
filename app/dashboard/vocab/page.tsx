'use client'

import { useState } from 'react'
import { COLORS } from '@/shared/utils/colors'
import VocabCard from '@/features/vocab/components/VocabCard'

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
        <main className="flex-1 flex items-center justify-center p-6">
            <section className="max-w-2xl w-full px-4">
                <VocabCard 
                    key={currentWordIndex}
                    headerText={"Vocab Practice"}
                    word={currentWord.word}
                    definition={currentWord.definition}
                    partOfSpeech={currentWord.partOfSpeech}
                    example={currentWord.example}
                    colors={COLORS.indigo}
                    score_correct={0}
                    score_total={1}
                    onNext={handleNext}
                />
            </section>
        </main>
    )
}