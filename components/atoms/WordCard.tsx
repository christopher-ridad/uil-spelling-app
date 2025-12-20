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
    <article className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg hover:bg-white/20 transition-all">
      <div className="flex items-start justify-between"> 
        <div className="flex-1">        
          <span className="text-sm text-white/60 font-mono">#{index}</span>
          <p className="text-lg font-semibold text-white font-mono">
            {word}
          </p>

          {attempts && (
            <div className="mt-2 space-y-1">
              <span className="text-xs text-white/80">
                {correct_attempts}/{attempts} correct
              </span>
            </div>
          )}
        </div>
      
      {/* show accuracy */}
      {accuracy !== undefined ? (
          <div className="ml-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
              accuracy >= 80 
                ? 'bg-green-400' 
                : accuracy >= 60 
                ? 'bg-yellow-400' 
                : 'bg-red-400'
            }`}>
              <span className="text-white font-bold text-sm">
                {accuracy}%
              </span>
            </div>
          </div>
        ) : (
          <div className="ml-4">
            <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/30 border-dashed flex items-center justify-center">
              <span className="text-white/50 text-xs text-center leading-tight">
                N/A
              </span>
            </div>
          </div>
        )}
        </div> 
    </article>
  )
}
