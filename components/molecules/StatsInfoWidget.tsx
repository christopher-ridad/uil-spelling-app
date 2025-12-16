'use client'

import StatsInfo from '../atoms/StatsInfo'

interface StatsInfoWidget {
    fromColor: string
    toColor: string
    title: string
    stats: string
    subStats: string
}

export default function StatsInfoWidget({ fromColor, toColor, title, stats, subStats }: StatsInfoWidget ) {
    return (
        <div className={`bg-gradient-to-br ${fromColor} ${toColor} rounded-xl p-6 shadow-lg text-white`}>
            <StatsInfo title={title} stats={stats} subStats={subStats}/>
        </div>
    )
}