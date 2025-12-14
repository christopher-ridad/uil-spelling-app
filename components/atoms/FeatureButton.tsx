'use client'

import Link from 'next/link'

interface FeatureButtonProps {
    color: string
    hoverColor: string
    buttonText: string
    href: string
}

export default function FeatureButton({ color, hoverColor, buttonText, href }: FeatureButtonProps) {
    return (
        <Link href={href}>
            <button className={`px-32 py-12 rounded-2xl text-white text-xl border-none cursor-pointer transition-all duration-300 ease-in-out ${color} ${hoverColor}`}>
                {buttonText}
            </button>
        </Link>
    ) 
}