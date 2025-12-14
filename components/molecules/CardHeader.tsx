'use client'

import ScoreDisplay from '../atoms/ScoreDisplay'
import BookOpenIcon from '../atoms/BookOpenIcon'

interface CardHeaderProps{
    headerColor: string
    scoreDisplayColor: string
    headerText: string
    correct: number
    total: number
}

export default function CardHeader({ headerColor, scoreDisplayColor, headerText, correct, total }: CardHeaderProps) {
    return (
        <header className={`max-w-[42rem] text-white rounded-lg p-6 mb-6 shadow-lg font-bold text-xl flex justify-between items-center ${headerColor}`}>
            <span className="flex items-center justify-between gap-2">
                <BookOpenIcon />
                {headerText}
            </span>
            <ScoreDisplay color={scoreDisplayColor} correct={correct} total={total} />                
        </header>
    )
}