'use client'

import { useState, FormEvent } from 'react'

export interface AuthFormValues {
    email: string
    password: string
    confirmPassword?: string
}

interface AuthFormProps {
    title: string
    error: string
    loading: boolean
    submitLabel: string
    loadingLabel: string
    showConfirmPassword?: boolean
    footerText: string
    footerLinkText: string
    footerHref: string
    gradientClassName: string
    onSubmit: (values: AuthFormValues) => void
}

export default function AuthForm({
    title,
    error,
    loading,
    submitLabel,
    loadingLabel,
    showConfirmPassword = false,
    footerText,
    footerLinkText,
    footerHref,
    gradientClassName,
    onSubmit
}: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(showConfirmPassword ? { email, password, confirmPassword } : { email, password })
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br ${gradientClassName} flex items-center justify-center p-4`}>
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {showConfirmPassword && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400"
                    >
                        {loading ? loadingLabel : submitLabel}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    {footerText}{' '}
                    <a href={footerHref} className="text-blue-600 hover:text-blue-700 font-semibold">
                        {footerLinkText}
                    </a>
                </p>
            </div>
        </div>
    )
}
