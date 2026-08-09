import Link from 'next/link'

interface PracticeCTAProps {
    wordsCount: number
}

export default function PracticeCTA({ wordsCount }: PracticeCTAProps) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 shadow-lg mb-6 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold mb-2">
                        Ready to improve?
                    </h3>
                    <p className="text-white/90">
                        Practice these {wordsCount} words to boost your accuracy
                    </p>
                </div>
                <Link
                    href="/dashboard/review/practice"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
                >
                    Start Review Session
                </Link>
            </div>
        </div>
    )
}
