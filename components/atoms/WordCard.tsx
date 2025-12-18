'use client'

interface WordData {
  word: string
  attempts?: number
  accuracy?: number
}

interface WordCardProps {
  data: WordData
  index: number
}

// work on word accuracy

export default function WordCard({ data, index }: WordCardProps) {
  return (
    <article className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg hover:bg-white/20 transition-all">
      <span className="text-sm text-white/60 font-mono">#{index}</span>
      <p className="text-lg font-semibold text-white font-mono">
        {data.word}
      </p>

      {data.attempts && (
        <div className="mt-3 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {data.accuracy}%
          </span>
        </div>
      )}
    </article>
  )
}
