'use client'

import Link from 'next/link'
import BookOpenIcon from './BookOpenIcon'
import { ChevronRight } from 'lucide-react'

interface FeatureButtonProps {
    fromColor: string
    toColor: string
    buttonText: string
    subText: string
    href: string
}

export default function PracticeMode({ fromColor, toColor, buttonText, subText, href }: FeatureButtonProps) {
    return (
        <Link href={href}>
            <button className={`flex flex-col items-start bg-gradient-to-br ${fromColor} ${toColor} rounded-xl p-6 w-full hover:shadow-2xl cursor-pointer transition-all hover:scale-105 group`}>
                <BookOpenIcon />
                <h4 className="font-bold text-white mb-1 "> {buttonText} </h4>
                <p className="text-sm text-white/80"> {subText} </p>
                <ChevronRight className="w-5 h-5 text-white mt-2 group-hover:translate-x-1 transition-transform"/>
            </button>
        </Link>
    ) 
}