'use client'

interface HeaderBoxProps{
    color: string
    headerText: string
}

export default function HeaderBox({ color, headerText }: HeaderBoxProps) {
    return (
        <header className={`header-box ${color}`}>
            {headerText}
        </header>
    )
}