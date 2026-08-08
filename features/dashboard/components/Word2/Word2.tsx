'use client'

interface Word2Props {
    word: string
    date: string
    status: Status
}

type Status = 'correct' | 'incorrect'

export default function Word2({ word, date, status }: Word2Props) {
    return (
        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <article>
                <p className="font-semibold text-white font-mono">{word}</p>
                <p className="text-xs text-white/70">{date}</p>
            </article>

            <article className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg
                ${status === 'correct' ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}
                `}>
                    {status === 'correct' ? '✓' : '✗'}
            </article>
            
        </div>   
    )
}