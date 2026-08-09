'use client'

import CardHeader from '@/shared/components/CardHeader'
import WordCardBack from '@/shared/components/WordCardBack'

interface VocabCardProps {
    headerText: string
    score_correct: number
    score_total: number
    word: string
    definition: string
    partOfSpeech: string
    example: string
    color: string
    colorDark: string
    colorHover: string
    colorText: string
    colorBorder: string
    colorBorder2: string
    colorLight: string
    onNext: () => void
}

export default function VocabCard({
    headerText,
    word,
    definition,
    partOfSpeech,
    example,
    color,
    colorDark,
    colorHover,
    colorText,
    colorBorder,
    colorBorder2,
    colorLight,
    score_correct,
    score_total,
    onNext
}: VocabCardProps) {

    const handleNext = () => {
        onNext()
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
        </section>
    )
}