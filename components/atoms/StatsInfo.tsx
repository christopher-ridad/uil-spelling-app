'use client'

import BookOpenIcon from './BookOpenIcon'

interface StatsInfoProps {
    title: string
    stats: number
    subStats: string
    isAccuracy: boolean
}

export default function StatsInfo({ title, stats, subStats, isAccuracy }: StatsInfoProps) {
    return (
        <article className="flex flex-col gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 p-2 rounded-lg">
                <BookOpenIcon />
            </div>
            <h3 className="text-xs uppercase tracking-wide text-white/60">
                {title}
            </h3>
            <p className="text-4xl font-semibold leading-none text-white">
                {stats}
                {isAccuracy && (
                    <span>
                        %
                    </span>
                )}
            </p>
            <p className="text-sm text-white/70">
                {subStats}
            </p>
        </article>
    )
}