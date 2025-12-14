'use client'

import { Trophy } from  'lucide-react'

interface Score {
    color: string
    correct: number
    total: number
}

export default function ScoreDisplay({ color, correct, total }: Score) {
    return (
        <figure className={`score-display ${color}`}>
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">
                {correct}/{total}
            </span>
        </figure>
    )
}

