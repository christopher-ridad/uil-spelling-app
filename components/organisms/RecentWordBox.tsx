'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getRecentAttempts } from '@/lib/wordProgress'
import WordList from '../molecules/WordList'

interface AttemptData {
    id: string
    word: string
    was_correct: boolean
    created_at: string
}

export default function RecentWordBox({}) {
    const { user } = useAuth()
    const [recentWords, setRecentWords] = useState<AttemptData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            loadRecentWords()
        }
    }, [user])

    const loadRecentWords = async () => {
        if (!user) return

        try {
            const attempts = await getRecentAttempts(user.id, 3)
            setRecentWords(attempts)
            setLoading(false)
        } catch (error) {
            console.error('Error loading recent words:', error)
            setLoading(false)
        }
    }

    if (loading) {
        return (
        <div className="space-y-6">
            <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity 📝</h3>
            <p className="text-white/70">Loading...</p>
            </section>
        </div>
        )
    }

    return (
        <div className="space-y-6">
            <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity 📝</h3>
                <div className="space-y-3">
                    {recentWords.length === 0 ? (
                        <p className="text-white/70 text-center py-4">
                            No words practiced yet. Start practicing!
                        </p>
                    ) : (
                        <WordList words={recentWords} />
                    )}
                </div>
            </section>
        </div>
    )
}