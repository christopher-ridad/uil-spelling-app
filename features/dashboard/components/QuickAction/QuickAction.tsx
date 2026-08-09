'use client'

import BookOpenIcon from '@/shared/components/BookOpenIcon'
import { COLORS, ColorScheme } from '@/shared/utils/colors'

interface QuickActionProps {
    label: string
    helperText: string
    onClick?: () => void
    colors?: ColorScheme
}

export default function QuickAction ({
    label,
    helperText,
    onClick,
    colors = COLORS.blue
}: QuickActionProps) {

    return (
        <button onClick={onClick}
                className={`flex flex-col items-start bg-gradient-to-br ${colors.bgTransitionFrom} ${colors.bgTransitionTo} rounded-xl
                p-6 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 group`}
        >
            <BookOpenIcon />
            <h4 className="font-bold text-white mb-1">
                {label}
            </h4>

            <p className="text-sm text-white/80">
                {helperText}
            </p>

        </button>
    )
}