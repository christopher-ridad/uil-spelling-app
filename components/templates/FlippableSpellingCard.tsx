'use client'

import { useState } from 'react'
import CardHeader from '../molecules/CardHeader'
import WordCardFront from '../organisms/WordCardFront'
import WordCardBack from '../organisms/WordCardBack'


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
    example
}: FlippableSpellingCardProps) {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleSubmit = () => {
        setHasSubmitted(true);
    };

    const toggleFlip = () => {
        if (hasSubmitted) {
            setIsFlipped(!isFlipped);
        }
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
            
            {/* Flip Card Container */}
            <section style={{ perspective: '1000px' }}>
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