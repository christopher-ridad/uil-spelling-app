'use client'

import { Filter } from 'lucide-react'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface FilterProps {
  value: string
  onChange: (letter: string) => void
}

export default function AlphabetFilter({ value, onChange }: FilterProps) {
  return (
    <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 mb-6 shadow-lg">
      <article className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-white" />
        <span className="text-white font-semibold">Filter by letter:</span>
      </article>

      <article className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange('all')}
          className={`px-3 py-2 rounded-lg font-semibold transition-all ${
            value === 'all'
              ? 'bg-white text-purple-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
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
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {letter}
          </button>
        ))}
      </article>
    </section>
  )
}
