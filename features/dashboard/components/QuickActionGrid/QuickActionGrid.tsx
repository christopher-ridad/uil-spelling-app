'use client'

import QuickActions from '../QuickActions'

export default function QuickActionGrid () {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
            </h3>
            <QuickActions />
        </div>
    )
}