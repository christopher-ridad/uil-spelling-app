'use client'

export default function EmptyState() {
  return (
    <article className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-white/70 rounded-xl p-12 text-center shadow-sm">
      <p className="text-gray-900 text-xl">No words found</p>
      <p className="text-gray-400 mt-2">Try a different search or filter</p>
    </article>
  )
}
