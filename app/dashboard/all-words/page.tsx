'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { WordSearchBar, AlphabetFilter, WordGrid, EmptyState } from '@/components'

interface WordData {
  word: string
  attempts?: number
  accuracy?: number
}

export default function AllWordsPage() {
  const { user } = useAuth()
  const [allWords, setAllWords] = useState<WordData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLetter, setFilterLetter] = useState('all')

  useEffect(() => {
    if (!user) return

    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/words')
        const { words } = await res.json()

        setAllWords(
          words.map((w: any) => ({
            word: typeof w === 'string' ? w : w.word,
          }))
        )
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  const filteredWords = useMemo(() => {
    const s = searchTerm.toLowerCase()
    const letter = filterLetter.toLowerCase()

    return allWords.filter((w) => {
      const word = w.word.toLowerCase()
      return (
        word.includes(s) &&
        (filterLetter === 'all' || word.startsWith(letter))
      )
    })
  }, [allWords, searchTerm, filterLetter])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
        <p className="text-2xl text-white">Loading words...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
        <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg mb-6">
            <article className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">
                    UIL Word List
                </h1>
                <p className="text-white/80">
                    All 1,500 competition words • Practice and track your progress
                </p>
            </article>
        </section>

        <WordSearchBar
          searchTerm={searchTerm}
          onChange={setSearchTerm}
          shown={filteredWords.length}
          total={allWords.length}
        />

        <AlphabetFilter value={filterLetter} onChange={setFilterLetter} />

        {filteredWords.length === 0 ? (
          <EmptyState />
        ) : (
          <WordGrid words={filteredWords} />
        )}
      </div>
    </div>
  )
}
