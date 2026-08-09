'use client'

import useSWR from 'swr'
import { useAuth } from '@/shared/contexts/AuthContext'
import { getRecentAttempts } from '@/features/dashboard/services/getRecentAttempts'
import WordList from '../WordList'

interface AttemptData {
    id: string
    word: string
    was_correct: boolean
    created_at: string
}

export default function RecentWordBox({}) {
    const { user } = useAuth()

    const { data: recentWords = [], isLoading } = useSWR<AttemptData[]>(
        user ? ['recent-attempts', user.id] : null,
        () => getRecentAttempts(user!.id, 3),
        { onError: (error) => console.error('Error loading recent words:', error) }
    )

    const loading = user ? isLoading : true

    if (loading) {
        return (
        <div className="space-y-6">
            <section className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-white/70 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity 📝</h3>
            <p className="text-gray-500">Loading...</p>
            </section>
        </div>
        )
    }

    return (
        <div className="space-y-6">
            <section className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-white/70 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity 📝</h3>
                <div className="space-y-3">
                    {recentWords.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
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
