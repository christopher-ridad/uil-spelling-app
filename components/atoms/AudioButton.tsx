'use client'

import { Volume2 } from 'lucide-react'

interface AudioButtonProps {
    color: string
    colorHover: string
}

export default function AudioButton({ color, colorHover }: AudioButtonProps) {
    return (
        <button className={`${color} ${colorHover} mx-auto my-6 text-white rounded-full w-24 h-24 flex items-center justify-center`}> 
            <Volume2 className="w-12 h-12" />
        </button>
    )
}