'use client'

import WordOption from '../WordOption'

interface WordOptionListProps {
    color: string
    colorHover: string
    options: string[]
}

export default function WordOptionList({ color, colorHover, options }: WordOptionListProps) {
    return (
        <section className="flex flex-col gap-4">
            <WordOption color={color} colorHover={colorHover} word={options[0]}/>
            <WordOption color={color} colorHover={colorHover} word={options[1]}/>
            <WordOption color={color} colorHover={colorHover} word={options[2]}/>
            <WordOption color={color} colorHover={colorHover} word={options[3]}/>
            <WordOption color={color} colorHover={colorHover} word={options[4]}/>
        </section>
    )
}