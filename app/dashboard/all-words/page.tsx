'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { useAuth } from '@/shared/contexts/AuthContext'
import WordSearchBar from '@/features/all-words/components/WordSearchBar'
import AlphabetFilter from '@/features/all-words/components/AlphabetFilter'
import WordGrid from '@/features/all-words/components/WordGrid'
import EmptyState from '@/features/all-words/components/EmptyState'
import { getAllWordsWithProgress } from '@/features/all-words/services/getAllWordsWithProgress'

async function fetchAllWords(): Promise<string[]> {
  const res = await fetch('/api/words')
  const { words } = await res.json()
  return words.map((w: unknown) => typeof w === 'string' ? w : (w as { word: string }).word)
}

export default function AllWordsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLetter, setFilterLetter] = useState('all')

  const { data: allWords = [], isLoading: wordsLoading } = useSWR('all-words', fetchAllWords, {
    onError: (error) => console.error('Error loading words:', error)
  })

  // load user's progress if logged in
  const { data: progressMap = {}, isLoading: progressLoading } = useSWR(
    user ? ['all-words-progress', user.id] : null,
    () => getAllWordsWithProgress(user!.id),
    { onError: (error) => console.error('Error loading progress:', error) }
  )

  const loading = wordsLoading || (user ? progressLoading : false)

  const filteredWords = allWords.filter(w => {
    const matchesSearch = w.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLetter = filterLetter === 'all' ||
      w.toLowerCase().startsWith(filterLetter.toLowerCase())
    return matchesSearch && matchesLetter
  })


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-600">Loading words...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <section className="bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 border border-white/70 rounded-xl p-8 shadow-sm mb-6">
            <article className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    UIL Word List
                </h1>
                <p className="text-gray-600">
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
