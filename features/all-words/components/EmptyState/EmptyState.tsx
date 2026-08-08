'use client'

export default function EmptyState() {
  return (
    <article className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-12 text-center">
      <p className="text-white text-xl">No words found</p>
      <p className="text-white/60 mt-2">Try a different search or filter</p>
    </article>
  )
}
