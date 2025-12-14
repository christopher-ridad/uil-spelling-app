'use client'

interface SpellingInputProps {
    colorFocus: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export default function SpellingInput({
    colorFocus,
    value,
    onChange,
    placeholder = "Type your spelling here..."
}: SpellingInputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-lg ${colorFocus} focus:outline-none text-center font-mono tracking-wider disabled:bg-gray-100`}
        >
        </input>
    )
}