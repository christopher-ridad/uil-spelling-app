'use client'

import { Volume2 } from 'lucide-react'

interface AudioButtonProps {
    color: string
}

export default function AudioButton({ color }: AudioButtonProps) {
    return (
        <button className={`${color} text-white rounded-full w-24 h-24 flex items-center justify-center`}> 
            <Volume2 className="w-12 h-12" />
        </button>
    )
}