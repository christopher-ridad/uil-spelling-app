import { WordToReview } from '@/features/review/types'

interface WordsToReviewTableProps {
    words: WordToReview[]
}

export default function WordsToReviewTable({ words }: WordsToReviewTableProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                    Words to Review
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Word</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Attempts</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Correct</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Accuracy</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Priority</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {words.map((wordData) => (
                            <tr key={wordData.word} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-lg font-mono font-semibold text-gray-900">
                                        {wordData.word}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {wordData.attempts}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {wordData.correct_attempts}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    wordData.accuracy >= 60
                                                        ? 'bg-yellow-500'
                                                        : wordData.accuracy >= 40
                                                        ? 'bg-orange-500'
                                                        : 'bg-red-500'
                                                }`}
                                                style={{ width: `${wordData.accuracy}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 w-12">
                                            {wordData.accuracy}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {wordData.accuracy < 30 ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                            🔥 High
                                        </span>
                                    ) : wordData.accuracy < 50 ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                                            ⚠️ Medium
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                            ⚡ Low
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
