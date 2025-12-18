'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { WordList } from '@/components'

interface AttemptData {
    id: string
    word: string
    was_correct: boolean
    created_at: string
}

export default function AllWordsPage() {
    const { user } = useAuth()
    const [allWords, setAllWords] = useState<AttemptData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [user])

    const loadData = async () => {
        try {
            setLoading(true)

            const wordsResponse = await fetch('/api/words')
            const { words } = await wordsResponse.json()

            const now = new Date().toISOString()

            const attempts: AttemptData[] = (words as Array<string | { word: string }>).map((w, idx) => {
                const word = typeof w === 'string' ? w : w.word

                return {
                id: `all-${idx}-${word}`,     // stable enough for this list
                word,
                was_correct: false,           // doesn’t matter if you don’t want status shown
                created_at: now               // or '' if you prefer
                }
            })

            setAllWords(attempts)
        } catch (error) {
        console.error('Error loading data:', error)
        } finally {
        setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl text-gray-600">Loading words...</p>
            </div>
        )
    } 
     return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
            <div className="space-y-6">
            <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">All Words</h3>
                <div className="space-y-3">
                    <WordList words={allWords}/>
                </div>
            </section>
        </div>
        </div>
    )
}