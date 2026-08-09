'use client'

interface WordCardProps {
  word: string
  index: number
  attempts?: number
  correct_attempts?: number
  accuracy?: number
}

export default function WordCard({
  word,
  index,
  attempts,
  correct_attempts,
  accuracy
 }: WordCardProps) {

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-sm text-gray-400 font-mono">#{index}</span>
          <p className="text-lg font-semibold text-gray-900 font-mono">
            {word}
          </p>

          {attempts && (
            <div className="mt-2 space-y-1">
              <span className="text-xs text-gray-600">
                {correct_attempts}/{attempts} correct
              </span>
            </div>
          )}
        </div>

      {/* show accuracy */}
      {accuracy !== undefined ? (
          <div className="ml-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              accuracy >= 80
                ? 'bg-green-100'
                : accuracy >= 60
                ? 'bg-yellow-100'
                : 'bg-red-100'
            }`}>
              <span className={`font-bold text-sm ${
                accuracy >= 80
                  ? 'text-green-700'
                  : accuracy >= 60
                  ? 'text-yellow-700'
                  : 'text-red-700'
              }`}>
                {accuracy}%
              </span>
            </div>
          </div>
        ) : (
          <div className="ml-4">
            <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-gray-300 border-dashed flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center leading-tight">
                N/A
              </span>
            </div>
          </div>
        )}
        </div>
    </article>
  )
}
