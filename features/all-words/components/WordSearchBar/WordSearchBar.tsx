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
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-white/70 rounded-xl p-4 mb-6 shadow-sm">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="mt-4 text-gray-600 text-sm">
        Showing {shown} of {total} words
      </div>
    </div>
  )
}
