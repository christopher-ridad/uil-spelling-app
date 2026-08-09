'use client'

import { BookOpen } from 'lucide-react'

interface BookOpenIconProps {
    className?: string
}

export default function BookOpenIcon({ className = 'text-white' }: BookOpenIconProps) {
    return (
        <BookOpen className={`w-8 h-8 ${className}`} />
    )
}