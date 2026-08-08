'use client'

import { ChevronRight } from 'lucide-react'

interface NextArrowProps {
    onClick: () => void
    visible: boolean
    color: string
    colorHover: string
}

export default function NextArrow({ onClick, visible, color, colorHover }: NextArrowProps) {
    if (!visible) return null

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onClick()
    }

    return (
        <button 
            onClick={handleClick}
            className={`cursor-pointer absolute top-1/2 -right-24 transform -translate-y-1/2 hover:scale-110 ${color} ${colorHover} text-white rounded-full p-4 shadow-lg transition-all`}>
            <ChevronRight className="w-6 h-6"/>
        </button>
    )
}