'use client'

import { useState } from 'react'
import CardHeader from '@/shared/components/CardHeader'
import WordCardFront from '../WordCardFront'
import WordCardBack from '@/shared/components/WordCardBack'


interface FlippableSpellingCardProps {
    color: string
    colorDark: string
    colorHover: string
    colorFocus: string
    colorText: string
    colorBorder: string
    colorBorder2: string
    colorLight: string
    headerText: string
    score_correct: number
    score_total: number
    word: string
    definition: string
    partOfSpeech?: string
    example?: string
    onNext: () => void
    onSubmit: (isCorrect: boolean, userAnswer: string) => void
}

export default function FlippableSpellingCard({ 
    color, 
    colorDark, 
    colorHover, 
    colorFocus, 
    colorText,
    colorBorder,
    colorBorder2,
    colorLight,
    headerText, 
    score_correct, 
    score_total,
    word,
    definition,
    partOfSpeech,
    example,
    onNext,
    onSubmit
}: FlippableSpellingCardProps) {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExiting, setIsExiting ] = useState(false)

    const handleSubmit = (isCorrect: boolean, userAnswer: string) => {
        setHasSubmitted(true);
        void onSubmit(isCorrect, userAnswer)
    };

    const toggleFlip = () => {
        if (hasSubmitted) {
            setIsFlipped(!isFlipped);
        }
    };

    const handleNext = () => {
        setIsExiting(true)

        setTimeout(() => {
            setHasSubmitted(false)
            setIsFlipped(false)
            setIsExiting(false)
            if (onNext) {
                onNext()
            }
        }, 400)
    }

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
            
            {/* Flip Card Container */}
            <section className={`transition-all duration-400 ${
                isExiting
                    ? 'translate-x-[-100%] opacity-0'
                    : 'translate-x-0 opacity-100'
            }`}
                style={{ perspective: '1000px' }}>
                <article 
                    style={{
                        position: 'relative',
                        width: '100%',
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                >
                    {/* Front Side */}
                    <figure
                        style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                        onClick={hasSubmitted ? toggleFlip : undefined}
                    >
                        <WordCardFront 
                            color={color}
                            colorHover={colorHover}
                            colorFocus={colorFocus}
                            colorText={colorText}
                            word={word}
                            score_correct={score_correct}
                            score_total={score_total}
                            onSubmit={handleSubmit}
                            onNext={handleNext}
                        />
                        {hasSubmitted && (
                            <p className="text-center text-sm text-white mt-2">
                                👆 Click to see definition
                            </p>
                        )}
                    </figure>

                    {/* Back Side */}
                    <figure
                        style={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}
                        onClick={toggleFlip}
                    >
                        <WordCardBack 
                            word={word}
                            definition={definition}
                            partOfSpeech={partOfSpeech}
                            example={example}
                            color={color}
                            colorHover={colorHover}
                            colorText={colorText}
                            colorBorder={colorBorder}
                            colorBorder2={colorBorder2}
                            colorLight={colorLight}
                            onNext={handleNext}
                        />
                        <p className="text-center text-sm text-white mt-2">
                            👆 Click to see spelling
                        </p>
                    </figure>
                </article>
            </section>
        </section>
    );
}