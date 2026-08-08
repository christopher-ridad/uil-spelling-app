'use client'

interface DefinitionProps{
    definition: string
}

export default function Definition({ definition }: DefinitionProps) {
    return (
        <article className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Definition
            </h3>
            <p className="text-gray-800 text-lg leading-relaxed">
                {definition}
            </p>
        </article>
    )
}
            