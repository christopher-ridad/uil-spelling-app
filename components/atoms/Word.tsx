'use client'

interface WordDisplayProps {
    word: string
}

export default function WordDisplay({ word }: WordDisplayProps) {
    return (
        <h2 className="text-3xl font-bold text-blue-600 mb-2 font-mono">
            {word}
        </h2>
        
    )
}

