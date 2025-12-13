'use client'

interface FeatureButtonProps {
    color: string
    onClick?: () => void
    buttonText: string
}

export default function FeatureButton({ color, onClick, buttonText }: FeatureButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`feature-button ${color}`}
        >
            {buttonText}
        </button>
    )
}