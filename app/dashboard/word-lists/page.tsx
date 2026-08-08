'use client'

import { useEffect, useState } from 'react'
import { COLORS } from '@/shared/utils/colors'
import MisspellCardFront from '@/features/word-lists/components/MisspellCardFront'

export default function WordListPage() {
    const [randomWords, setRandomWords ] = useState<string[]>([])

    const loadRandomWord = async () => {
        try {
            const res = await fetch('/api/words?random=true')

            if (!res.ok) {
                throw new Error('Failed to fetch word')
            }
            
            // parse response as json
            const data = await res.json()

            return data.word
        } catch(err) {
            console.error('Error loading word:', err)
            return null
        }
    }
    
    const loadRandomWords = async () => {
        const loadedRandomWords = new Set<string>
        while (loadedRandomWords.size < 5) { 
            const randomWord = await loadRandomWord()
            loadedRandomWords.add(randomWord)
        }
        return [...loadedRandomWords]
    }

    useEffect(() => {
        const fetchWords = async () => {
            const words = await loadRandomWords()
            setRandomWords(words)
        }
        fetchWords()
    }, [])

    
    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-teal-300">
            <MisspellCardFront
                color={COLORS.green.bg}
                colorDark={COLORS.green.bgDark}
                colorHover={COLORS.green.bgHover}
                colorFocus={COLORS.green.bgFocus}
                headerText="Word Lists"
                word1={randomWords[0]}
                word2={randomWords[1]}
                word3={randomWords[2]}
                word4={randomWords[3]}
                word5={randomWords[4]}
                score_correct={12}
                score_total={15}
            />
        </main>
    )
}