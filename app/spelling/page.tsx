'use client'

import { useState, useEffect } from 'react'
import { COLORS } from '../../lib/colors'
import { FlippableSpellingCard } from '../../components'

export default function SpellingPage() {
    const [currentWord, setCurrentWord] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // fetch words on mount
        fetch('/api/words')
        .then(res => res.json())
        .then(data => {
            // pick a random word
            const randomWord = data.words[Math.floor(Math.random() * data.words.length)]
            setCurrentWord(randomWord)
            setLoading(false)
        })
        .catch(err => {
            console.error('Error:', err)
            setLoading(false)
        })
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
                word={currentWord}
                definition="Definitions coming soon."
                example="Examples will come later."
                partOfSpeech="noun"
            />
        </main>
    )
}