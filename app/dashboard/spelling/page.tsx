'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { recordWordAttempt } from '@/lib/wordProgress'
import { useRouter } from 'next/navigation'
import { COLORS } from '../../../lib/colors'
import { FlippableSpellingCard } from '../../../components'

interface WordData {
    word: string
    definition: string
    partOfSpeech: string
    example: string
    source?: string
}

export default function SpellingPage() {
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const [currentWord, setCurrentWord] = useState<WordData | null>(null)
    const [loading, setLoading] = useState(true)
    const [key, setKey] = useState(0)

    // Load random word
    const loadRandomWord = () => {
        console.log('loadRandomWord called')
        setLoading(true)
        
        console.log('Fetching from /api/words?random=true')
        
        fetch('/api/words?random=true')
            .then(res => {
                console.log('Response status:', res.status)
                return res.json()
            })
            .then(data => {
                console.log('Data received:', data)
                setCurrentWord(data)
                setKey(prev => prev + 1)
                setLoading(false)
            })
            .catch(err => {
                console.error('Fetch error:', err)
                setLoading(false)
            })
    }

    // Load word when user is available
    useEffect(() => {
        console.log('useEffect running, user:', user)
        if (user) {
            loadRandomWord()
        }
    }, [user])

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
        }
    }, [user, authLoading, router])

    const handleNext = () => {
        loadRandomWord()   
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
                console.log('Progress saved!')
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