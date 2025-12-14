'use client'

interface PartOfSpeechProps {
    partOfSpeech: string
}

export default function PartOfSpeech({ partOfSpeech }: PartOfSpeechProps) {
    return (
        <p className="text-sm text-gray-500 italic">
                {partOfSpeech}
        </p>
    )
}