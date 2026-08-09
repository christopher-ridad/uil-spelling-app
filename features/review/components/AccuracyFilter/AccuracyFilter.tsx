'use client'

interface AccuracyFilterProps {
    minAccuracy: number
    onChange: (threshold: number) => void
    wordsCount: number
}

export default function AccuracyFilter({ minAccuracy, onChange, wordsCount }: AccuracyFilterProps) {
    return (
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-sm mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Show words with accuracy below:
            </label>
            <div className="flex gap-2">
                {[50, 60, 70, 80, 90].map(threshold => (
                    <button
                        key={threshold}
                        onClick={() => onChange(threshold)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            minAccuracy === threshold
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {threshold}%
                    </button>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
                Found {wordsCount} words below {minAccuracy}% accuracy
            </p>
        </div>
    )
}
