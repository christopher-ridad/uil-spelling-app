'use client'

import { Volume2 } from 'lucide-react'

export default function AudioButton() {
    return (
        <button className="bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center"> 
            <Volume2 className="w-12 h-12" />
        </button>
    )
}