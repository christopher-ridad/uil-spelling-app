'use client'

import WordCard from '../atoms/WordCard'

interface WordData {
  word: string
  attempts?: number
  accuracy?: number
}

export default function WordGrid({ words }: { words: WordData[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {words.map((w, i) => (
        <WordCard key={w.word} data={w} index={i + 1} />
      ))}
    </section>
  )
}
