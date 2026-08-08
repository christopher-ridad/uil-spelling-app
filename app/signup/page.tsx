// app/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/contexts/AuthContext'
import AuthForm, { AuthFormValues } from '@/shared/components/AuthForm'

export default function SignupPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSignup = async ({ email, password, confirmPassword }: AuthFormValues) => {
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      alert('Check your email to confirm your account!')
      router.push('/login')
    }
  }

  return (
    <AuthForm
      title="Sign Up"
      error={error}
      loading={loading}
      submitLabel="Sign Up"
      loadingLabel="Creating account..."
      showConfirmPassword
      footerText="Already have an account?"
      footerLinkText="Login"
      footerHref="/login"
      gradientClassName="from-blue-600 to-cyan-500"
      onSubmit={handleSignup}
    />
  )
}
