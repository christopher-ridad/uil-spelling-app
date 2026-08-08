'use client'

interface WelcomeBox {
    userName: string
    streak: number
}

export default function WelcomeBox({ userName, streak }: WelcomeBox) {
    return (
        <section className="mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back, {userName}! 👋
            </h2>
            <p className="text-white/90">
                You&apos;re on a {streak}-day streak. Keep it going! 🔥
            </p>
        </section>
    )
}