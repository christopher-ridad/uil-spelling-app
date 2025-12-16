'use client'

import { Volume2 } from 'lucide-react'

interface AudioButtonProps {
    color: string
    colorHover: string
    word: string
}

export default function AudioButton({ color, colorHover, word }: AudioButtonProps) {
    // function to handle speaking the word when button is clicked
    const speakWord = () => {
        const speech = new SpeechSynthesisUtterance(word)
        speech.lang = 'en-US'
        window.speechSynthesis.speak(speech)
    }
    
    return (
        <button 
            onClick={speakWord}
            className={`${color} ${colorHover} mx-auto my-6 cursor-pointer text-white rounded-full w-24 h-24 flex items-center justify-center`}
        > 
            <Volume2 className="w-12 h-12" />
        </button>
    )
}