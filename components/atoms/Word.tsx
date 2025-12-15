'use client'

interface WordProps {
    word: string
    color: string
}

export default function Word({ word , color }: WordProps) {
    return (
        <h2 className={`text-3xl font-bold ${color} mb-2 font-mono`}>
            {word}
        </h2>
        
    )
}

