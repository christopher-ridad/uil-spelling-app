'use client'

import { COLORS } from '../../lib/colors'
import StatsInfoWidget from '../molecules/StatsInfoWidget'

export default function StatsWidgetGrid({}) {
    return (
        <section className="grid grid-cols-1 md:gridcols-4 gap-4 mb-8">
            <StatsInfoWidget
                fromColor={COLORS.blue.bgTransitionFrom}
                toColor={COLORS.blue.bgTranisitionTo2}
                title="Words Practiced"
                stats="247"
                subStats="+12 this week 📈"
            />
            <StatsInfoWidget
                fromColor={COLORS.green.bgTransitionFrom}
                toColor={COLORS.green.bgTransitionTo2}
                title="Accuracy"
                stats="87%"
                subStats="+5% from last week ⬆️"
            />
            <StatsInfoWidget
                fromColor={COLORS.orange.bgTransitionFrom}
                toColor={COLORS.orange.bgTransitionTo}
                title="Current Streak"
                stats="12"
                subStats="+12 this week 🔥"
            />
            <StatsInfoWidget
                fromColor={COLORS.pink.bgTransitionFrom}
                toColor={COLORS.pink.bgTransitionTo}
                title="Level"
                stats="Advanced"
                subStats="78% to Expert ⭐"
            />
        </section>
    )
}