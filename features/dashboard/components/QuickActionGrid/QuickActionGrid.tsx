'use client'

import QuickActions from '../QuickActions'

export default function QuickActionGrid () {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
                Quick Actions
            </h3>
            <QuickActions />
        </div>
    )
}