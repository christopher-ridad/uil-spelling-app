'use client'

import { COLORS } from '@/shared/utils/colors'
import StatsCard from '../StatsCard'

interface StatsCardGridProps {
    totalWordsPracticed: number
    overallAccuracy: number
    streak: number
}

export default function StatsCardGrid({ totalWordsPracticed, overallAccuracy, streak }: StatsCardGridProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatsCard
                fromColor={COLORS.blue.bgTransitionFrom}
                toColor={COLORS.blue.bgTransitionTo2 ?? COLORS.blue.bgTransitionTo}
                title="Words Practiced"
                stats={totalWordsPracticed}
                subStats="out of 1,500"
                isAccuracy={false}
            />
            <StatsCard
                fromColor={COLORS.green.bgTransitionFrom}
                toColor={COLORS.green.bgTransitionTo2 ?? COLORS.green.bgTransitionTo}
                title="Accuracy"
                stats={overallAccuracy}
                subStats="across all words"
                isAccuracy={true}
            />
            <StatsCard
                fromColor={COLORS.orange.bgTransitionFrom}
                toColor={COLORS.orange.bgTransitionTo}
                title="Practice Streak"
                stats={streak}
                subStats={`${streak == 1 ? 'day' : 'days'} in a row 🔥`}
                isAccuracy={false}
            />
        </section>
    )
}