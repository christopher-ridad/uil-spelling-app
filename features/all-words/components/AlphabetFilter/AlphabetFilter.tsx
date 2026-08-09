'use client'

import { Filter } from 'lucide-react'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface FilterProps {
  value: string
  onChange: (letter: string) => void
}

export default function AlphabetFilter({ value, onChange }: FilterProps) {
  return (
    <section className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-white/70 rounded-xl p-4 mb-6 shadow-sm">
      <article className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-gray-700" />
        <span className="text-gray-900 font-semibold">Filter by letter:</span>
      </article>

      <article className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange('all')}
          className={`px-3 py-2 rounded-lg font-semibold transition-all ${
            value === 'all'
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>

        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => onChange(letter)}
            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
              value === letter
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {letter}
          </button>
        ))}
      </article>
    </section>
  )
}
