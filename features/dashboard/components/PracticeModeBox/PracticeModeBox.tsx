'use client'

import PracticeModeGrid from '../PracticeModeGrid'

export default function PracticeModeBox({}) {
    return (
        <section className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Practice Modes
            </h3>
            <PracticeModeGrid />
        </section>
    )
}