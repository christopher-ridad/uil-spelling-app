'use client'

import { Search } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string
  onChange: (value: string) => void
  shown: number
  total: number
}

export default function WordSearchBar({ searchTerm, onChange, shown, total }: SearchBarProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 mb-6 shadow-lg">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      <div className="mt-4 text-white/80 text-sm">
        Showing {shown} of {total} words
      </div>
    </div>
  )
}
