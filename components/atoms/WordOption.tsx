'use client'

interface WordOptionProps {
    color: string
    colorHover: string
    word: string
    isCorrect?: boolean
}

export default function WordOption({ color, colorHover, word, isCorrect=false}: WordOptionProps) {
    return (
        <article className={`p-4 rounded-lg text-white text-center text-lg ${color} ${colorHover}`}>
            {word}
        </article>
    )
}