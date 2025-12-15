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
    colorText: string
    colorBorder: string
    colorBorder2: string
    colorLight: string
}

export default function WordCardFront({ word, definition, example, partOfSpeech, colorText, colorBorder, colorBorder2, colorLight }: WordCardBackProps) {
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <section className={`${colorLight} ${colorBorder} border-2 rounded-lg p-8 shadow-lg`}>
            {/* Word + part of speech */}
            <article className="mb-6">
                <Word word={word} color={colorText}/>
                {partOfSpeech && (
                    <PartOfSpeech partOfSpeech={partOfSpeech} />
                )}
            </article>

            {/* Definition */}
            <Definition definition={definition}/>

            {/* Example (if provided) */}
            {example && (
                <Example example={example} colorBorder={colorBorder2}/>
            )}
        </section>
    );
}