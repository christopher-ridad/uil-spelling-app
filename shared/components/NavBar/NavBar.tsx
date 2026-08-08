'use client'

import { useAuth } from '@/shared/contexts/AuthContext'
import BookOpenIcon from '../BookOpenIcon'
import { Calendar, Trophy } from 'lucide-react'

export default function NavBar() {
    const { user } = useAuth()
    const displayName = user?.email?.split('@')[0] ?? 'Guest'
    const initials = displayName.slice(0, 2).toUpperCase()

    return (
        <nav className="flex justify-between bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 shadow-lg">
            <span className="flex items-center gap-3">
                <figure className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <BookOpenIcon />
                </figure>
                <h1 className="text-xl font-bold text-white">
                    UIL Spelling
                </h1>
            </span>
            <span className="flex items-center gap-4">
                <button className="text-white/80 hover:text-white transition-colors">
                    <Calendar className="w-6 h-6" />
                </button>
                <button className="text-white/80 hover:text-white transition-colors">
                    <Trophy className="w-6 h-6" />
                </button>
                <span className="flex items-center gap-3">
                    <span className="text-right">
                        <p className="text-sm font-semibold text-white">
                            {displayName}
                        </p>
                    </span>
                    <figure className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white/50">
                        {initials}
                    </figure>
                </span>
            </span>
        </nav>
    )
}
