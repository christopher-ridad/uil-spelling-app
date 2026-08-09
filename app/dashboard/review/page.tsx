'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { useAuth } from '@/shared/contexts/AuthContext'
import { getWordsToReview } from '@/features/review/services/getWordsToReview'
import { RotateCcw } from 'lucide-react'
import AccuracyFilter from '@/features/review/components/AccuracyFilter'
import ReviewEmptyState from '@/features/review/components/ReviewEmptyState'
import PracticeCTA from '@/features/review/components/PracticeCTA'
import WordsToReviewTable from '@/features/review/components/WordsToReviewTable'
import { WordToReview } from '@/features/review/types'

export default function ReviewPage() {
    const { user } = useAuth()
    const [minAccuracy, setMinAccuracy] = useState(50)

    const { data: wordsToReview = [], isLoading } = useSWR<WordToReview[]>(
        user ? ['words-to-review', user.id] : null,
        () => getWordsToReview(user!.id),
        { onError: (error) => console.error('Error loading words to review:', error) }
    )

    const loading = user ? isLoading : true

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-2xl text-gray-600">Loading words to review...</p>
            </div>
        )
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <RotateCcw className="w-10 h-10 text-red-600" />
                    <h1 className="text-4xl font-bold text-gray-900">
                        Review Mistakes
                    </h1>
                </div>
                <p className="text-gray-600">
                    Practice words you&apos;re struggling with to improve your accuracy
                </p>
            </div>

            <AccuracyFilter
                minAccuracy={minAccuracy}
                onChange={setMinAccuracy}
                wordsCount={wordsToReview.length}
            />

            {wordsToReview.length === 0 ? (
                <ReviewEmptyState minAccuracy={minAccuracy} />
            ) : (
                <>
                    <PracticeCTA wordsCount={wordsToReview.length} />
                    <WordsToReviewTable words={wordsToReview} />
                </>
            )}
        </div>
    )
}
