'use client'

import WordCard from '../WordCard'
import { WordProgressRow } from '@/shared/models/WordProgressRow'

interface WordGridProps {
  words: string[]
  progressMap: Record<string, WordProgressRow>
  allWords: string[]
}

export default function WordGrid({ words, progressMap, allWords }: WordGridProps) {
  const getWordData = (word: string) => {
    const progress = progressMap[word]
    if (!progress) {
      return { 
        word,
        attempts: undefined,
        correct_attempts: undefined,
        accuracy: undefined
      }
    }

    const accuracy = Math.round((progress.correct_attempts / progress.attempts) * 100)
    return {
      word,
      attempts: progress.attempts,
      correct_attempts: progress.correct_attempts,
      accuracy
    }
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {words.map((word, index) => {
        const wordData = getWordData(word)
        const originalIndex = allWords.indexOf(word) + 1

        return (
          <WordCard 
            key={index}
            word={word}
            index={originalIndex}
            attempts={wordData.attempts}
            correct_attempts={wordData.correct_attempts}
            accuracy={wordData.accuracy}
          />
        )
      })}
    </section>
  )
}
