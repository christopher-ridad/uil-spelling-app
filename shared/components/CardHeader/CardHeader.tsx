'use client'

import ScoreDisplay from '../ScoreDisplay'
import BookOpenIcon from '../BookOpenIcon'
import { ColorScheme } from '@/shared/utils/colors'

interface CardHeaderProps{
    colors: ColorScheme
    headerText: string
    correct: number
    total: number
}

export default function CardHeader({ colors, headerText, correct, total }: CardHeaderProps) {
    return (
        <header className={`max-w-[42rem] text-white rounded-lg p-6 mb-6 shadow-lg font-bold text-xl flex justify-between items-center ${colors.bg}`}>
            <span className="flex items-center justify-between gap-2">
                <BookOpenIcon />
                {headerText}
            </span>
            <ScoreDisplay color={colors.bgDark} correct={correct} total={total} />
        </header>
    )
}