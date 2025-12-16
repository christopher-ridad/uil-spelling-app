'use client'

import BookOpenIcon from './BookOpenIcon'

interface StatsInfoProps {
    title: string
    stats: string
    subStats: string
}

export default function StatsInfo({ title, stats, subStats }: StatsInfoProps) {
    return (
        <article className="flex flex-col gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 p-2 rounded-lg">
                <BookOpenIcon />
            </div>
            <p className="text-sm text-white/90">
                {title}
            </p>
            <p className="text-4xl font-bold">
                    {stats}
            </p>
            <p className="text-sm text-white/80 mt-2">
                {subStats}
            </p>
        </article>
    )
}