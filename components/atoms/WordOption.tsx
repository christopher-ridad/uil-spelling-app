'use client'

interface WordOptionProps {
    color: string
    colorHover: string
    word: string
    isCorrect?: boolean
}

export default function WordOption({ color, colorHover, word, isCorrect=false}: WordOptionProps) {
    return (
        <button className={`p-4 rounded-lg text-white text-center text-lg ${color} ${colorHover} cursor-pointer transition-all hover:scale-105 hover:shadow-2xl group`}>
            {word}
        </button>
    )
}