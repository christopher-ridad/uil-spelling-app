'use client'

interface FeatureButtonProps {
    color: string
    onClick?: () => void
    children: React.ReactNode
}

export default function FeatureButton({ color, onClick, children }: FeatureButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`feature-button ${color}`}
        >
            {children}
        </button>
    )
}