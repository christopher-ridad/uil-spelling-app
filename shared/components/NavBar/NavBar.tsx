'use client'

import { useAuth } from '@/shared/contexts/AuthContext'
import BookOpenIcon from '../BookOpenIcon'
import { Calendar, Trophy } from 'lucide-react'

export default function NavBar() {
    const { user } = useAuth()
    const displayName = user?.email?.split('@')[0] ?? 'Guest'
    const initials = displayName.slice(0, 2).toUpperCase()

    return (
        <nav className="flex justify-between px-6 py-4 bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 shadow-lg">
            <span className="flex items-center gap-3">
                <figure className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <BookOpenIcon className="text-white" />
                </figure>
                <h1 className="text-xl font-bold text-white">
                    UIL Spelling
                </h1>
            </span>
            <span className="flex items-center gap-4">
                <button className="text-white/70 hover:text-white transition-colors">
                    <Calendar className="w-6 h-6" />
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                    <Trophy className="w-6 h-6" />
                </button>
                <span className="flex items-center gap-3">
                    <span className="text-right">
                        <p className="text-sm font-semibold text-white">
                            {displayName}
                        </p>
                    </span>
                    <figure className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white/50">
                        {initials}
                    </figure>
                </span>
            </span>
        </nav>
    )
}
