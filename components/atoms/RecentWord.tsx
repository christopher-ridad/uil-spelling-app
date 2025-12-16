'use client'

interface RecentWordProps {
    word: string
    date: string
    correct: boolean
}

export default function RecentWord({ word, date, correct }: RecentWordProps) {
    return (
        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <article>
                <p className="font-semibold text-white font-mono">{word}</p>
                <p className="text-xs text-white/70">{date}</p>
            </article>
            <article className={`w-8 h-8 rounded-full flex items-center justify-center
            ${correct ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}
            shadow-lg`}>
                {correct ? '✓' : '✗'}
            </article>
        </div>   
    )
}