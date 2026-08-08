'use client'

import { Volume2 } from 'lucide-react'

interface AudioButtonProps {
    color: string
    colorHover: string
    word: string
}

export default function AudioButton({ color, colorHover, word }: AudioButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevents the click from bubbling up to parent
        const speech = new SpeechSynthesisUtterance(word) // speak the word
        speech.lang = 'en-US'
        window.speechSynthesis.speak(speech)
    }
    
    return (
        <button 
            onClick={handleClick}
            className={`${color} ${colorHover} mx-auto my-6 cursor-pointer text-white rounded-full w-24 h-24 flex items-center justify-center`}
        > 
            <Volume2 className="w-12 h-12" />
        </button>
    )
}