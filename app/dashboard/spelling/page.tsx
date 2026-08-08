'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useAuth } from '@/shared/contexts/AuthContext'
import { recordWordAttempt } from '@/shared/services/recordWordAttempt'
import { useRouter } from 'next/navigation'
import { COLORS } from '@/shared/utils/colors'
import FlippableSpellingCard from '@/features/spelling/components/FlippableSpellingCard'

interface WordData {
    word: string
    definition: string
    partOfSpeech: string
    example: string
    source?: string
}

async function fetchRandomWord(): Promise<WordData> {
    const res = await fetch('/api/words?random=true')
    return res.json()
}

export default function SpellingPage() {
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const [key, setKey] = useState(0)

    const { data: currentWord, isLoading, mutate } = useSWR(
        user ? 'random-word' : null,
        fetchRandomWord,
        { onError: (err) => console.error('Fetch error:', err) }
    )

    const loading = user ? isLoading : true

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
        }
    }, [user, authLoading, router])

    const handleNext = async () => {
        await mutate()
        setKey(prev => prev + 1)
    }

    const handleSubmit = async (isCorrect: boolean, userAnswer: string) => {
        if (user && currentWord) {
            try {
                await recordWordAttempt(
                    user.id,
                    currentWord.word,
                    isCorrect,
                    userAnswer
                )
            } catch (error) {
                console.error('Error saving progress:', error)
            }
        }
    }

    if (authLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500">
                <p className="text-white text-2xl">Loading...</p>
            </div>
        )
    }

    if (loading || !currentWord) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500">
                <p className="text-white text-2xl">Loading word...</p>
            </div>
        )
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500">
            <FlippableSpellingCard
                key={key}
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
                onNext={handleNext}
                onSubmit={handleSubmit}
            />
        </main>
    )
}
