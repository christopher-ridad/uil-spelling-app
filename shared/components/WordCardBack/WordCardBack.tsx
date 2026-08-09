'use client'

import Definition from '../Definition'
import Word from '../Word'
import PartOfSpeech from '../PartOfSpeech'
import Example from '../Example'
import NextArrow from '../NextArrow'
import { ColorScheme } from '@/shared/utils/colors'

interface WordCardBackProps {
    word: string
    definition: string
    example?: string
    partOfSpeech?: string
    colors: ColorScheme
    onNext: () => void
}

export default function WordCardBack({
    word,
    definition,
    example,
    partOfSpeech,
    colors,
    onNext
}: WordCardBackProps) {

    const handleNext = () => {
        onNext();
    }

    return (
        <section className={`${colors.bgLight} ${colors.bgBorder} border-2 rounded-lg p-8 shadow-lg relative`}>
            {/* Word + part of speech */}
            <article className="mb-6">
                <Word word={word} color={colors.bgText}/>
                {partOfSpeech && (
                    <PartOfSpeech partOfSpeech={partOfSpeech} />
                )}
            </article>

            {/* Definition */}
            <Definition definition={definition}/>

            {/* Example (if provided) */}
            {example && (
                <Example example={example} colorBorder={colors.bgBorder2}/>
            )}

            <NextArrow onClick={handleNext} visible={true} color={colors.bg} colorHover={colors.bgHover}/>
        </section>
    );
}