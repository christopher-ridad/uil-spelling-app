'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/shared/utils/supabase'

interface AuthContextType {
    user: User | null
    loading: boolean
    signUp: (email: string, password: string) => ReturnType<typeof supabase.auth.signUp>
    signIn: (email: string, password: string) => ReturnType<typeof supabase.auth.signInWithPassword>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const value = {
        user,
        loading,
        signUp: (email: string, password: string) => {
            return supabase.auth.signUp({ email, password })
        },
        signIn: (email: string, password: string) => {
            return supabase.auth.signInWithPassword({ email, password })
        },
        signOut: async () => {
            await supabase.auth.signOut()
        }
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used with an AuthProvider')
    }
    return context
}