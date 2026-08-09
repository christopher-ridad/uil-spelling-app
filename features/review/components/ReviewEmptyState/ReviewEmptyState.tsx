import Link from 'next/link'

interface ReviewEmptyStateProps {
    minAccuracy: number
}

export default function ReviewEmptyState({ minAccuracy }: ReviewEmptyStateProps) {
    return (
        <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-white/70 rounded-xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Great job! No words to review
            </h2>
            <p className="text-gray-600 mb-6">
                All your practiced words have {minAccuracy}% accuracy or higher!
            </p>
            <Link
                href="/dashboard/spelling"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
                Practice More Words
            </Link>
        </div>
    )
}
