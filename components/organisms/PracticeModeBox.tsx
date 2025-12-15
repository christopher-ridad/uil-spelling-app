'use client'

import PracticeModeGrid from '../molecules/PracticeModeGrid'

export default function PracticeModeBox({}) {
    return (
        <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
                Practice Modes
            </h3>
            <PracticeModeGrid />
        </section>
    )
}