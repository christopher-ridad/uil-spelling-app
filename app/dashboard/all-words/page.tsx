'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { WordSearchBar, AlphabetFilter, WordGrid, EmptyState} from '@/components'
import { getAllWordsWithProgress } from '@/lib/wordProgress'

interface WordData {
  word: string
  attempts?: number
  correct_attempts?: number
  accuracy?: number
}

export default function AllWordsPage() {
  const { user } = useAuth()
  const [allWords, setAllWords] = useState<string[]>([])
  const [progressMap, setProgressMap] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLetter, setFilterLetter] = useState('all')

  useEffect(() => {
    loadData()
  }, [user])

  const loadData = async () => {
      try {
        // load all 1500 words
        const wordsResponse = await fetch('/api/words')
        const { words } = await wordsResponse.json()
        const wordList = words.map((w: any) => typeof w === 'string' ? w : w.word)
        setAllWords(wordList)

        // load user's progress if logged in
        if (user) {
          const progress = await getAllWordsWithProgress(user.id)
          setProgressMap(progress)
        }

        setLoading(false)

      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      } 
    }

  const filteredWords = allWords.filter(w => {
    const matchesSearch = w.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLetter = filterLetter === 'all' || 
      w.toLowerCase().startsWith(filterLetter.toLowerCase())
    return matchesSearch && matchesLetter
  })


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
          <WordGrid words={filteredWords} progressMap={progressMap} allWords={allWords} />
        )}
      </div>
    </div>
  )
}
