'use client'

import { useState } from 'react'
import Definition from '../atoms/Definition'
import Word from '../atoms/Word'
import PartOfSpeech from '../atoms/PartOfSpeech'
import Example from '../atoms/Example'


interface WordCardBackProps {
    word: string
    definition: string
    example?: string
    partOfSpeech?: string
}

export default function WordCardFront({ word, definition, example, partOfSpeech }: WordCardBackProps) {
    const [userInput, setUserInput] = useState('');
    //const [score, setScore] = useState({ correct: 12, total: 15 });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <main className="bg-blue-50 border-2 border-blue-300 rounded-lg p-8 shadow-lg">
            {/* Word + part of speech */}
            <article className="mb-6">
                <Word word={word}/>
                {partOfSpeech && (
                    <PartOfSpeech partOfSpeech={partOfSpeech} />
                )}
            </article>

            {/* Definition */}
            <Definition definition={definition}/>

            {/* Example (if provided) */}
            {example && (
                <Example example={example}/>
            )}
        </main>
    );
}