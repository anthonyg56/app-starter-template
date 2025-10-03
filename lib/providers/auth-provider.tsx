"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { BetterAuthUser } from "../@types/auth"
import { signOut } from "@/lib/clients/auth-client"
import { AUTH_MESSAGES } from "../constants/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: BetterAuthUser | null,
  isLoading: boolean,
  error: string | null,
  setUser: (user: BetterAuthUser | null) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  clearError: () => void,
  reset: () => void,
  signOut: () => void,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  initialUser?: AuthContextType["user"]
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUserState] = useState<BetterAuthUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setErrorState] = useState<string | null>(null)

  const router = useRouter();
  const { toast } = useToast();

  // Memoized action functions
  const setUser = useCallback((user: BetterAuthUser | null) => {
    setUserState(user)
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const setError = useCallback((error: string | null) => {
    setErrorState(error)
  }, [])

  const clearError = useCallback(() => {
    setErrorState(null)
  }, [])

  const reset = useCallback(() => {
    setUserState(null)
    setIsLoading(false)
    setErrorState(null)
  }, [])

  const signOut = useCallback(async () => {
    try {
      await signOut();
      setUser(null)
      setIsLoading(false)
      setErrorState(null)
      toast({
        title: "Success",
        description: AUTH_MESSAGES.SUCCESS.SIGN_OUT,
      })
      router.push("/sign-in")
    } catch (error) {
      setErrorState(error as string)
    }

  }, []);

  // Initialize with initial user data if provided
  useEffect(() => {
    if (initialUser && !user) {
      setUser(initialUser)
    }
  }, [initialUser, user, setUser])

  // Handle hydration
  useEffect(() => {
    // This ensures the context is properly hydrated on the client side
    // You can add any additional initialization logic here
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    setUser,
    setLoading,
    setError,
    clearError,
    reset,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
