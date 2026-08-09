'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '@/shared/contexts/AuthContext'
import BookOpenIcon from '../BookOpenIcon'
import { Calendar, Trophy } from 'lucide-react'
import { getRouteColors } from '@/shared/utils/routeColors'

export default function NavBar() {
    const { user } = useAuth()
    const pathname = usePathname()
    const colors = getRouteColors(pathname)
    const displayName = user?.email?.split('@')[0] ?? 'Guest'
    const initials = displayName.slice(0, 2).toUpperCase()

    const barClass = colors ? `${colors.bg} shadow-lg` : 'bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 border-b border-white/70'
    const textClass = colors ? 'text-white' : 'text-gray-900'
    const mutedTextClass = colors ? 'text-white/80' : 'text-gray-500'
    const hoverTextClass = colors ? 'hover:text-white' : 'hover:text-gray-900'
    const iconChipClass = colors ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-900/10'
    const iconColorClass = colors ? 'text-white' : 'text-gray-700'

    return (
        <nav className={`flex justify-between px-6 py-4 ${barClass}`}>
            <span className="flex items-center gap-3">
                <figure className={`${iconChipClass} rounded-lg p-2`}>
                    <BookOpenIcon className={iconColorClass} />
                </figure>
                <h1 className={`text-xl font-bold ${textClass}`}>
                    UIL Spelling
                </h1>
            </span>
            <span className="flex items-center gap-4">
                <button className={`${mutedTextClass} ${hoverTextClass} transition-colors`}>
                    <Calendar className="w-6 h-6" />
                </button>
                <button className={`${mutedTextClass} ${hoverTextClass} transition-colors`}>
                    <Trophy className="w-6 h-6" />
                </button>
                <span className="flex items-center gap-3">
                    <span className="text-right">
                        <p className={`text-sm font-semibold ${textClass}`}>
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
