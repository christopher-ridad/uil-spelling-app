'use client'

import { useState } from 'react'
import Definition from '../Definition'
import Word from '../Word'
import PartOfSpeech from '../PartOfSpeech'
import Example from '../Example'
import NextArrow from '../NextArrow'


interface WordCardBackProps {
    word: string
    definition: string
    example?: string
    partOfSpeech?: string
    color: string
    colorHover: string
    colorText: string
    colorBorder: string
    colorBorder2: string
    colorLight: string
    onNext: () => void
}

export default function WordCardBack({ 
    word, 
    definition, 
    example, 
    partOfSpeech, 
    color, 
    colorHover, 
    colorText, 
    colorBorder, 
    colorBorder2, 
    colorLight, 
    onNext 
}: WordCardBackProps) {

    const handleNext = () => {
        onNext();
    }

    return (
        <section className={`${colorLight} ${colorBorder} border-2 rounded-lg p-8 shadow-lg relative`}>
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

            <NextArrow onClick={handleNext} visible={true} color={color} colorHover={colorHover}/>
        </section>
    );
}