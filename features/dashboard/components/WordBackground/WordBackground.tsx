'use client'

import { useMemo } from 'react'
import useSWR from 'swr'

async function fetchAllWords(): Promise<string[]> {
    const res = await fetch('/api/words')
    const { words } = await res.json()
    return words.map((w: unknown) => typeof w === 'string' ? w : (w as { word: string }).word)
}

interface ScatteredWord {
    word: string
    top: string
    left: string
    rotate: number
    sizeClass: string
}

const SIZE_CLASSES = ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl']
const WORD_COUNT = 14

export default function WordBackground() {
    const { data: allWords } = useSWR('all-words', fetchAllWords)

    const scattered = useMemo<ScatteredWord[]>(() => {
        if (!allWords || allWords.length === 0) return []

        const shuffled = [...allWords].sort(() => Math.random() - 0.5).slice(0, WORD_COUNT)
        return shuffled.map(word => ({
            word,
            top: `${Math.random() * 92}%`,
            left: `${Math.random() * 92}%`,
            rotate: Math.random() * 30 - 15,
            sizeClass: SIZE_CLASSES[Math.floor(Math.random() * SIZE_CLASSES.length)]
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allWords?.length])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
            {scattered.map((item, i) => (
                <span
                    key={i}
                    className={`absolute font-mono font-bold text-blue-900/5 ${item.sizeClass}`}
                    style={{ top: item.top, left: item.left, transform: `rotate(${item.rotate}deg)` }}
                >
                    {item.word}
                </span>
            ))}
        </div>
    )
}
