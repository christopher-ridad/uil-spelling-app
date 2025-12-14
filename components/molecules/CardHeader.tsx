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
        <header className={`card-header ${headerColor}`}>
            <span className="flex items-center justify-between gap-2">
                <BookOpenIcon />
                {headerText}
            </span>
            <ScoreDisplay color={scoreDisplayColor} correct={correct} total={total} />                
        </header>
    )
}