'use client'

import CardHeader from '@/shared/components/CardHeader'
import WordCardBack from '@/shared/components/WordCardBack'
import { ColorScheme } from '@/shared/utils/colors'

interface VocabCardProps {
    headerText: string
    score_correct: number
    score_total: number
    word: string
    definition: string
    partOfSpeech: string
    example: string
    colors: ColorScheme
    onNext: () => void
}

export default function VocabCard({
    headerText,
    word,
    definition,
    partOfSpeech,
    example,
    colors,
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
                colors={colors}
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
                colors={colors}
                onNext={handleNext}
            />
        </section>
    )
}