'use client'

export default function EmptyState() {
  return (
    <article className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-xl p-12 text-center shadow-sm">
      <p className="text-gray-900 text-xl">No words found</p>
      <p className="text-gray-400 mt-2">Try a different search or filter</p>
    </article>
  )
}
