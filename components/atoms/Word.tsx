'use client'

interface WordDisplayProps {
    word: string
    color: string
}

export default function WordDisplay({ word , color }: WordDisplayProps) {
    return (
        <h2 className={`text-3xl font-bold ${color} mb-2 font-mono`}>
            {word}
        </h2>
        
    )
}

