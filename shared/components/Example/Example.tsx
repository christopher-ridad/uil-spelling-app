'use client'

interface ExampleProps {
    example: string
    colorBorder: string
}

export default function Example({ example, colorBorder }: ExampleProps) {
    return (
        <article className={`bg-white p-4 rounded-lg border-l-4 ${colorBorder}`}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Example Usage
            </h3>
            <p className="text-gray-700 italic">
                &quot;{example}&quot;
            </p>
        </article>
    )
}