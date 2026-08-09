'use client'

interface WelcomeBox {
    userName: string
    streak: number
}

export default function WelcomeBox({ userName, streak }: WelcomeBox) {
    return (
        <section className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {userName}! 👋
            </h2>
            <p className="text-gray-600">
                You&apos;re on a {streak}-day streak. Keep it going! 🔥
            </p>
        </section>
    )
}