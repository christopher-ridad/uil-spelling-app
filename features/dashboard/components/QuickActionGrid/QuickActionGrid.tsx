'use client'

import QuickActions from '../QuickActions'

export default function QuickActionGrid () {
    return (
        <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-white/70 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
            </h3>
            <QuickActions />
        </div>
    )
}