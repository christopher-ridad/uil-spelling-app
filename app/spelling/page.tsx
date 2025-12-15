'use client'

import { useState, useEffect } from 'react'
import { COLORS } from '../../lib/colors'
import { FlippableSpellingCard } from '../../components'

interface WordData {
    word: string
    definition: string | null
    partOfSpeech: string | null
    example: string | null
    source?: string
}

export default function SpellingPage() {
    const [currentWord, setCurrentWord] = useState<WordData | null>(null)
    const [loading, setLoading] = useState(true)

    const loadRandomWord = () => {
        setLoading(true)
        fetch('/api/words?random=true')
        .then(res => res.json())
        .then(data => {
            console.log('Loaded word:', data)
            setCurrentWord(data)
            setLoading(false)
        })
        .catch(err => {
            console.error('Error loading word:', err)
            setLoading(false)
        })
    }

    useEffect(() => {
        loadRandomWord()
    }, [])
  
    // will fix this later
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500">
            <FlippableSpellingCard
                color={COLORS.blue.bg}
                colorDark={COLORS.blue.bgDark}
                colorHover={COLORS.blue.bgHover}
                colorFocus={COLORS.blue.bgFocus}
                colorText={COLORS.blue.bgText}
                colorBorder={COLORS.blue.bgBorder}
                colorBorder2={COLORS.blue.bgBorder2}
                colorLight={COLORS.blue.bgLight}
                headerText="Spelling Practice"
                score_correct={0}
                score_total={1}
                word={currentWord.word}
                definition={currentWord.definition}
                example="Examples will come later."
                partOfSpeech="noun"
            />
        </main>
    )
}