'use client'

import RecentWordList from '../molecules/RecentWordList'

export default function RecentWordBox({}) {
    return (
        <div className="space-y-6">
            <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity 📝</h3>
                <div className="space-y-3">
                    <RecentWordList />
                </div>
            </section>
        </div>
    )
}