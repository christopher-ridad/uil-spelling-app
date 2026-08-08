'use client'

import { ChevronRight } from 'lucide-react'
import BookOpenIcon from '@/shared/components/BookOpenIcon'

interface QuickActionProps {
    label: string
    helperText: string
    onClick?: () => void

}

export default function QuickAction ({
    label,
    helperText,
    onClick
}: QuickActionProps) {

    return (
        <button onClick={onClick} 
                className="flex flex-col items-start bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl
                p-6 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 group"
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