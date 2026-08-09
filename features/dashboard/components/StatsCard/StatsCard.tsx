'use client'

import StatsInfo from '../StatsInfo'

interface StatsCardProps {
    fromColor: string
    toColor: string
    title: string
    stats: number
    subStats: string
    isAccuracy: boolean
}

export default function StatsCard({ fromColor, toColor, title, stats, subStats, isAccuracy }: StatsCardProps ) {
    return (
        <div className={`bg-gradient-to-br ${fromColor} ${toColor} rounded-xl p-6 shadow-lg text-white transition-all duration-200 hover:shadow-xl hover:scale-105`}>
            <StatsInfo title={title} stats={stats} subStats={subStats} isAccuracy={isAccuracy}/>
        </div>
    )
}