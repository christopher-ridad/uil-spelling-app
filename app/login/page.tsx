// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/contexts/AuthContext'
import { COLORS } from '@/shared/utils/colors'
import AuthForm, { AuthFormValues } from '@/shared/components/AuthForm'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleLogin = async ({ email, password }: AuthFormValues) => {
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <AuthForm
      title="Login"
      error={error}
      loading={loading}
      submitLabel="Login"
      loadingLabel="Logging in..."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerHref="/signup"
      gradientClassName={`${COLORS.blue.bgCanvasFrom} ${COLORS.blue.bgCanvasTo}`}
      onSubmit={handleLogin}
    />
  )
}
